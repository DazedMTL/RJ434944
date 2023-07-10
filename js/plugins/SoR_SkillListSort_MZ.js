//=============================================================================
// SoR_SkillListSort_MZ.js
// SoR License (C) 2020 蒼竜, REQUIRED User Registration on Dragon Cave
// http://dragonflare.blue/dcave/license.php
// ----------------------------------------------------------------------------
// Latest version v1.11 (2021/12/14)
//=============================================================================
/*:ja
@plugindesc ＜スキルリストソート＞ v1.11
@author 蒼竜
@target MZ
@orderBefore SoR_SkillRearrangeByPlayers_MZ
@url https://dragonflare.blue/dcave/
@help ゲーム中にスキル一覧を表示する場面において、
指定したスキルリストを指定のルールに基づいた順で表示します。

プレイヤーがゲーム中にソートする機能ではなく、
開発者がRPGツクールの仕様を無視した独自の規則によって
ゲーム内のスキルリストの表示順を指定するためのUIプラグインです。

プラグインパラメータの設定を通して、
表示順決定の規則を構成していく形式となります。
詳細はpdfドキュメントを読んでください。

※ 109.「プレイヤー操作スキル整列」と併用可能
@param -----全般-----
@param Reorder_Types
@desc 独自整列規則を適用するスキルタイプ (データベース参照)
@type number[]
@default []
@param DTYPE_Priority
@desc ダメージ(Damage)タイプによる優先順位，高数値ほど高優先順位 (データベース参照)
@type number[]
@default []
@param ETYPE_Priority
@desc 属性(Element)タイプによる優先順位，高数値ほど高優先順位 (データベース参照)
@type number[]
@default []

@param Target_Priority
@desc 敵用、味方用スキルの表示優先度
@type select
@option 味方用スキル優先
@value 0
@option 敵用スキル優先
@value 1
@default 0

@param -----ルール構成-----
@param Comparison_Order
@desc 整列規則構成 (比較処理適用順)，これの最後にデータベースID比較が実行される
@type select[]
@option ダメージタイプ
@value 0
@option 対象
@value 1
@option 属性
@value 2
@option 指定タグ
@value 3
@default ["0","1","3","2"]
*/
/*:
@plugindesc <Reordering in Skill Lists> v1.11
@author Soryu
@target MZ
@url https://dragonflare.blue/dcave/index_e.php
@orderBefore SoR_SkillRearrangeByPlayers_MZ
@help In the skill list scene which shows skills which 
specified actor have acquired in the game, the order of listing skills
for designated skill types is fixed by original comparison rules.

This plugin does NOT provide the feature for players to sort the skill in the game,
but for developers to designate the rule of listing skills as game UI design.

The listing order is desginated by configuration of plugin parameters.
Read the pdf document to construct your own rule for your games.

!! This plugin is compatible with 109. "Skill Rearrangement by Players".
@param -----General-----
@param Reorder_Types
@desc Skill type which the reordering rule are applied (IDs associated with the list in database)
@type number[]
@default []
@param DTYPE_Priority
@desc Priority list for each Damage type
@type number[]
@default []
@param ETYPE_Priority
@desc Priority list for each Element type
@type number[]
@default []

@param Target_Priority
@desc Priority of skill targets (enemies and allies)
@type select
@option Skills for allies come earlier.
@value 0
@option Skills for enemies come earlier.
@value 1
@default 0

@param ---Reordering Rule---
@param Comparison_Order
@desc Configuration of skill listing rule (comparison application order). After them, skill ID comparison in database is processed.
@type select[]
@option Damage Type
@value 0
@option Targets
@value 1
@option Element Type
@value 2
@option Designated Priority Tag
@value 3
@default ["0","1","3","2"]
*/
(function () {
    const pluginName = "SoR_SkillListSort_MZ";
    const Param = PluginManager.parameters(pluginName);

    const ReorderTypes = convertJsonParam(Param['Reorder_Types']) || [];
    const DTYPEPrior = convertJsonParam(Param['DTYPE_Priority']) || [];
    const ETYPEPrior = convertJsonParam(Param['ETYPE_Priority']) || [];
    const Target_Priority = Number(Param['Target_Priority']) || 0;
    const TTYPEPrior = [1 - 2 * Target_Priority, -1 + 2 * Target_Priority];
    const ComparisonOrder = convertJsonParam(Param['Comparison_Order']) || [];

    function convertJsonParam(param) {
        if (param == undefined) return [];
        let arr = [];
        JSON.parse(param).map(function (param) {
            arr.push(Number(param));
        });
        return arr;
    }

    const CompStack = [];
    for (x of ComparisonOrder) {
        switch (x) {
            case 0:
                CompStack.push(compType);
                break;
            case 1:
                CompStack.push(compTargets);
                break;
            case 2:
                CompStack.push(compElement);
                break;
            case 3:
                CompStack.push(compSpecified);
                break;
        }
    }
    CompStack.push(compItemID);
    let stack_i = 0;

    ///////////////////////////////////////////////////////////////////////////////
    const SoR_SLS_WSL_makeItemList = Window_SkillList.prototype.makeItemList;
    Window_SkillList.prototype.makeItemList = function () {
        SoR_SLS_WSL_makeItemList.call(this);
        this.applySLSortRearrangement();
    }

    Window_SkillList.prototype.applySLSortRearrangement = function () {
        if (this._actor) {
            if (typeof this._actor._skillorder === "undefined") this._actor.SkilllistValidation();
            const x = this._actor._skillorder[this._stypeId];
            if (x === undefined) return;

            for (const n of this._data) n.prior = x[n.id];
            this._data.sort(function (a, b) { return a.prior < b.prior ? -1 : 1; });
        }
    }


    ///////////////////////////////////////////////////////////////////////////////
    function compType(a, b) {
        const t_a = a.damage.type;
        const t_b = b.damage.type;
        stack_i = CompStack.indexOf(compType) + 1;

        if (DTYPEPrior[t_a] > DTYPEPrior[t_b]) return -1;
        else if (DTYPEPrior[t_a] < DTYPEPrior[t_b]) return 1;
        else return CompStack[stack_i](a, b);
    }

    function compTargets(a, b) {
        const ForOpponent = [1, 2, 3, 4, 5, 6, 14];
        const t_a = ForOpponent.includes(a.scope);
        const t_b = ForOpponent.includes(b.scope);
        stack_i = CompStack.indexOf(compTargets) + 1;

        if (t_a && !t_b) return TTYPEPrior[0];
        else if (!t_a && t_b) return TTYPEPrior[1];
        else return CompStack[stack_i](a, b);
    }

    function compElement(a, b) {
        const t_a = a.damage.type == 0 ? undefined : a.damage.elementId;
        const t_b = b.damage.type == 0 ? undefined : b.damage.elementId;
        stack_i = CompStack.indexOf(compElement) + 1;

        if (!t_a || !t_b) return CompStack[stack_i](a, b);
        else if (ETYPEPrior[t_a] > ETYPEPrior[t_b]) return -1;
        else if (ETYPEPrior[t_a] < ETYPEPrior[t_b]) return 1;
        else return CompStack[stack_i](a, b);
    }

    function compSpecified(a, b) {
        const t_a = a.meta.SortPriority ? JSON.parse(a.meta.SortPriority) : a.meta.SortPriority;
        const t_b = b.meta.SortPriority ? JSON.parse(b.meta.SortPriority) : b.meta.SortPriority;
        stack_i = CompStack.indexOf(compSpecified) + 1;

        if (t_a && !t_b) {
            if (t_a > 0) return -1;
            else if (t_a < 0) return 1;
            else return CompStack[stack_i](a, b);
        }
        else if (!t_a && t_b) {
            if (t_b > 0) return 1;
            else if (t_b < 0) return -1;
            else return CompStack[stack_i](a, b);
        }
        else if (t_a && t_b) {
            if (t_a > t_b) return -1;
            else if (t_a < t_b) return 1;
            else return CompStack[stack_i](a, b);
        }
        else return CompStack[stack_i](a, b);
    }


    function compItemID(a, b) {
        if (a.id < b.id) return -1;
        else if (a.id > b.id) return 1;
    }
    ///////////////////////////////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////////////////////////////
    // v1.10 ... new reordering system
    ///////////////////////////////////////////////////////////////////////////////
    const SoR_SLS_GA_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        SoR_SLS_GA_setup.call(this, actorId);
        this.SkilllistValidation();
    }

    Game_Actor.prototype.initialize_SkilllistOrder = function () {
        this._skillorder = {};
        this._skillorder_modified = false;
    }

    const SoR_SRBP_SS_create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function () {
        SoR_SRBP_SS_create.call(this);
        this.listValidation();
    }

    Scene_Skill.prototype.listValidation = function () {
        $gameParty.SkilllistValidation_all();
    }

    Game_Party.prototype.SkilllistValidation_all = function () {
        for (const x of this.allMembers()) {
            x.SkilllistValidation();
        }
    }

    Game_Actor.prototype.SkilllistValidation = function () {
        if (typeof this._skillorder === "undefined" || Object.keys(this._skillorder).length == 0) this.initialize_SkilllistOrder();
        if (!this._skillorder_modified) this.initialize_SkilllistOrder();

        const types = this.skillTypes();
        const skls = this.skills();

        for (const x of types) {
            const id = Number(x);
            if (!(id in this._skillorder)) this._skillorder[id] = {};

            const typeskls = skls.filter(skill => skill.stypeId == x);
            const skls_sorted = this.SkillList_Reorder(typeskls);

            for (const x of skls_sorted) {
                const id = x.id;
                const type = x.stypeId;
                if (!(id in this._skillorder[type])) this._skillorder[type][id] = Object.keys(this._skillorder[type]).length;
            }
        }
    }

    Game_Actor.prototype.SkillList_Reorder = function (list) {
        if (list.length > 0 && !ReorderTypes.includes(list[0].stypeId)) return list;
        list.sort(CompStack[0]);
        return list;
    }


})();