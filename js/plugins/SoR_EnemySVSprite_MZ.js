//=============================================================================
// SoR_EnemySVSprite_MZ.js
// SoR License (C) 2020 蒼竜, REQUIRED User Registration on Dragon Cave
// http://dragonflare.blue/dcave/license.php
// ---------------------------------------------------------------------------
// Latest version v1.12 (2021/11/22)
//=============================================================================
/*:ja
@plugindesc ＜SVアクター適用エネミー＞ v1.12
@author 蒼竜
@target MZ
@url https://dragonflare.blue/dcave/
@help サイドビュー戦闘において、タグで指定したエネミーに対して
アクター(味方)と同様にサイドビューアクター(SVActor)画像を適用します。
SV化したエネミーは、ほぼアクターと同様の挙動となります。

砂川赳氏のD-Motion系(NRP_DynamicMotionMZ.js, 最終確認v1.151)と
両立します。双方のスクリプトを最新の状態に保つことで，SV化したエネミーにも
設定したモーションを実行させることができます。

-----------------------------------------------------------
基本用法
-----------------------------------------------------------
エネミーのメモ欄に次の形式でタグを挿入する。
<SVBattler: [X]>
[X] には./img/svactor/下に
置いてある適用したいSVアクター画像名(拡張子不要)を指定する

<SVWeaponType: [X]>
システム2"[SV]攻撃モーション" の[X]番の武器モーションを適用する
*/
/*:
@plugindesc <Application SV_Actor Sprites to Enemies> v1.12
@author Soryu
@target MZ
@url https://dragonflare.blue/dcave/index_e.php
@help In the side-view battle, enemies given a designated 
tag in the note area are represented in the battle scene 
by using SVActor image as actors. Enemies represented by 
this plugin behave almost the same as actors during battles.

This plugin is compatible with NRP_DynamicMotionMZ.js 
by Takeshi Sunagawa (Last confirmed with v1.151). 
Remember to keep the script always up-to-date for use.

------------------------------------------------------------
 How to use (Fundamental usage)
------------------------------------------------------------
Write a tag as following to substitute svactor images for 
usual enemy sprites. 
<SVBattler: [X]>
, where [X] is file name of svactor image located ./img/svactor/.

Also following tag is effective to set a weapon motion for SVEnemy.
<SVWeaponType: [X]>
, where [X] is X-th weapon motion designated in the RMMZ editor.
*/

(function () {
    const pluginName = "SoR_EnemySVSprite_MZ";
    const Param = PluginManager.parameters(pluginName);

    const IsDMotion = PluginManager._scripts.includes("NRP_DynamicMotionMZ");
    if (IsDMotion) {
        const parameters = PluginManager.parameters("NRP_DynamicMotionMZ");

        var pSetStartMotion = parameters["setStartMotion"];
        var pSetStepForward = parameters["setStepForward"];
        var pJumpShadow = toBoolean(parameters["jumpShadow"]);
        var pShortTagName = parameters["shortTagName"];
        var pShortSettingTagName = parameters["shortSettingTagName"];
        var pDefaultDuration = toNumber(parameters["defaultDuration"], 12);
        var pDefaultEnemyMotionDuration = toNumber(parameters["defaultEnemyMotionDuration"], 12);
        var pImmortalState = toNumber(parameters["immortalState"]);
        var pUsePriority = toBoolean(parameters["usePriority"], true);
        var pBattlerZ = toNumber(parameters["battlerZ"], 3);
        var pOpponentSideZ = toNumber(parameters["opponentSideZ"]);
        function toBoolean(str) {
            if (str == true) {
                return true;
            }
            return (str == "true") ? true : false;
        }
        function toNumber(str, def) {
            return isNaN(str) ? def : +(str || def);
        }
    }

    Sprite_Enemy.MOTIONS = {
        walk: { index: 0, loop: true },
        wait: { index: 1, loop: true },
        chant: { index: 2, loop: true },
        guard: { index: 3, loop: true },
        damage: { index: 4, loop: false },
        evade: { index: 5, loop: false },
        thrust: { index: 6, loop: false },
        swing: { index: 7, loop: false },
        missile: { index: 8, loop: false },
        skill: { index: 9, loop: false },
        spell: { index: 10, loop: false },
        item: { index: 11, loop: false },
        escape: { index: 12, loop: true },
        victory: { index: 13, loop: true },
        dying: { index: 14, loop: true },
        abnormal: { index: 15, loop: true },
        sleep: { index: 16, loop: true },
        dead: { index: 17, loop: true }
    }


    Game_Temp.prototype.CorrectEnemySV = function (tid, param, v1, v2) {
        const btm = $gameTroop.members();
        if (btm.length > tid) return;
        const target = btm[tid - 1]._sprite();
        if (!target.IsSVBattler()) return;

        switch (param) {
            case "scale":
                if (!v2) v2 = v1;
                target.def_ScaleX = v1;
                target.def_ScaleY = v2;
                break;
            case "sscale":
                if (!v2) v2 = v1;
                this.def_SScaleX = v1;
                this.def_SScaleY = v2;
                break;
            case "wscale":
                if (!v2) v2 = v1;
                this.def_WeaponScaleX = v1;
                this.def_WeaponScaleY = v2;
                break;
            case "weapon":
                if (v1 && v2) {
                    this.def_WeaponPaddX = v1;
                    this.def_WeaponPaddY = v2;
                }
                break;
            case "center":
                if (v1 && v2) {
                    this.def_CenterPaddX = v1;
                    this.def_CenterPaddY = v2;
                }
                break;
            default:
                break;
        }
    }


    const SoR_ESVS_SE_initialize = Sprite_Enemy.prototype.initialize;
    Sprite_Enemy.prototype.initialize = function (battler) {
        SoR_ESVS_SE_initialize.call(this, battler);

        if (battler.enemy().meta.SVBattler) {
            if (!this.regist_btl && !battler) this.regist_btl = battler;
            if (battler && this.regist_btl != battler) {
                this.GetSVBattlerData(battler);
                const nm = ChoiceSVSprite(battler.enemy().note);
                this.initSVEnemy(nm);
                this.regist_btl = battler;
            }

            if (IsDMotion) this._actor = this._enemy; //DMotion v1.151
        }

    }



    Sprite_Enemy.prototype.GetSVBattlerData = function (battler) {
        const metas = battler.enemy().meta;

        const scale = metas.SV_scale ? Number(metas.SV_scale) : 1.0;
        const Wscale = metas.SV_WeaponScale ? Number(metas.SV_WeaponScale) : 1.0;

        this.def_ScaleX = metas.SV_scaleX ? Number(metas.SV_scaleX) : scale;
        this.def_ScaleY = metas.SV_scaleY ? Number(metas.SV_scaleY) : scale;
        this.def_SScaleX = metas.SV_ShadowScaleX ? Number(metas.SV_ShadowScaleX) : scale;
        this.def_SScaleY = metas.SV_ShadowScaleY ? Number(metas.SV_ShadowScaleY) : scale;
        this.def_WeaponScaleX = metas.SV_WeaponScaleX ? Number(metas.SV_WeaponScaleX) : Wscale;
        this.def_WeaponScaleY = metas.SV_WeaponScaleY ? Number(metas.SV_WeaponScaleY) : Wscale;
        this.def_WeaponPaddX = metas.SV_weaponPaddX ? Number(metas.SV_weaponPaddX) : 0;
        this.def_WeaponPaddY = metas.SV_weaponPaddY ? Number(metas.SV_weaponPaddY) : 0;
        this.def_CenterPaddX = metas.SV_centerPaddX ? Number(metas.SV_centerPaddX) : 0;
        this.def_CenterPaddY = metas.SV_centerPaddY ? Number(metas.SV_centerPaddY) : 0;
    }


    Sprite_Enemy.prototype.initSVEnemy = function (name) {
        this._useSVBattler = true;
        this._SVBattlername = name.trim();
        this._battlerName = "";
        this._motion = null;
        this._motionCount = 0;
        this._pattern = 0;

        this._currentMotionIdx = null;
        this._currentMcount = null;
        this._currentPattern = null;
        this._bmpW = null;
        this._bmpH = null;

        this.createShadowSprite();
        this.createWeaponSprite();
        this.createMainSprite();
        this.createStateSprite();
    }

    const SoR_ESBS_GP_requestMotionRefresh = Game_Party.prototype.requestMotionRefresh;
    Game_Party.prototype.requestMotionRefresh = function () {
        SoR_ESBS_GP_requestMotionRefresh.call(this);
        $gameTroop.requestMotionRefresh();
    }

    Game_Troop.prototype.requestMotionRefresh = function () {
        for (const en of this.members()) {
            if (en._sprite().IsSVBattler()) en.requestMotionRefresh();
        }
    }

    Sprite_Enemy.prototype.IsSVBattler = function () {
        return !this._useSVBattler ? false : this._useSVBattler;
    }

    Sprite_Enemy.prototype.createMainSprite = function () {
        this._mainSprite = new Sprite();
        this._mainSprite.anchor.x = 0.5 + this.def_CenterPaddX;
        this._mainSprite.anchor.y = 1 + this.def_CenterPaddY;
        this.addChild(this._mainSprite);
    }

    Sprite_Enemy.prototype.mainSprite = function () {
        if (this.IsSVBattler()) return this._mainSprite;
        return Sprite_Battler.prototype.mainSprite.call(this);
    }

    Sprite_Enemy.prototype.createShadowSprite = function () {
        this._shadowSprite = new Sprite();
        this._shadowSprite.bitmap = ImageManager.loadSystem("Shadow2");
        this._shadowSprite.anchor.x = 0.5;
        this._shadowSprite.anchor.y = 0.5;
        this._shadowSprite.scale.x = this.def_SScaleX;
        this._shadowSprite.scale.y = this.def_SScaleY;
        this._shadowSprite.y = -2;
        this.addChild(this._shadowSprite);
    }

    Sprite_Enemy.prototype.createWeaponSprite = function () {
        this._weaponSprite = new Sprite_Weapon();
        this.addChild(this._weaponSprite);
    }

    Sprite_Enemy.prototype.createStateSprite = function () {
        this._stateSprite = new Sprite_StateOverlay();
        this.addChild(this._stateSprite);
    }


    const SoR_ESVS_SE_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function () {

        if (this.IsSVBattler()) {
            Sprite_Battler.prototype.update.call(this);
            if (this._enemy) {
                this.updateEffect();
                this.updateStateSpriteSV();
                this.updateShadow();
                this.updateMotion();
            }
        }
        else SoR_ESVS_SE_update.call(this);
    }

    Sprite_Enemy.prototype.updateStateSpriteSV = function () {
        if (!this._mainSprite.bitmap) return;// is not ready
        this._stateIconSprite.y = -Math.round((this._mainSprite.bitmap.height / 6 + 40) * 0.9); //# of sv sheets
        if (this._stateIconSprite.y < 20 - this.y) {
            this._stateIconSprite.y = 20 - this.y;
        }
    }

    Sprite_Enemy.prototype.updateShadow = function () {
        this._shadowSprite.visible = !!this._enemy;
    }

    Sprite_Enemy.prototype.updateMain = function () {
        Sprite_Battler.prototype.updateMain.call(this);
        if (this._enemy.isSpriteVisible() && !this.isMoving()) {
            this.updateTargetPosition();
        }
    }

    const SoR_ESVS_SE_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
    Sprite_Enemy.prototype.loadBitmap = function (name) {
        if ($gameSystem.isSideView() && this.IsSVBattler()) {
            this._mainSprite.bitmap = ImageManager.loadSvActor(name);
            this._mainSprite.bitmap.addLoadListener(function () {
                this.bitmap = new Bitmap(this._mainSprite.bitmap.width / 9, this._mainSprite.bitmap.height / 6);
            }.bind(this));
        }
        else SoR_ESVS_SE_loadBitmap.call(this, name);
    }

    Sprite_Enemy.prototype.setupMotion = function () {
        if (this._enemy.isMotionRequested()) {
            this.startMotion(this._enemy.motionType());
            this._enemy.clearMotion();
        }
    }

    Sprite_Enemy.prototype.setupWeaponAnimation = function () {
        if (this._enemy.isWeaponAnimationRequested()) {
            this._weaponSprite.setup(this._enemy.weapons());
            this._weaponSprite.reverseWeaponSprite();
            this._enemy.clearWeaponAnimation();
        }
    }

    Sprite_Enemy.prototype.startMotion = function (motionType) {
        const newMotion = Sprite_Enemy.MOTIONS[motionType];
        if (this._motion !== newMotion) {
            this._motion = newMotion;
            this._motionCount = 0;
            this._pattern = 0;
        }

        if (IsDMotion) this.startMotion_DM(motionType);
    }


    Sprite_Enemy.prototype.updateTargetPosition = function () {
        if (this.shouldStepForward()) {
            this.stepForward();
        } else if (!this.inHomePosition()) {
            this.stepBack();
        }
    }

    Sprite_Enemy.prototype.shouldStepForward = function () {
        return /*this._enemy.isInputting() || */this._enemy.isActing();
    }

    const SoR_ESVS_SE_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function () {

        if (this.IsSVBattler()) {
            Sprite_Battler.prototype.updateBitmap.call(this);
            //const name = this._actor.battlerName();
            const name = this._SVBattlername;
            const hue = this._enemy.battlerHue();
            if (this._battlerName != name || this._battlerHue != hue || this._mainSprite.scale.x != -this.def_ScaleX || this._mainSprite.scale.y != this.def_ScaleY) {
                this._battlerName = name;
                this.loadBitmap(name);
                //this._mainSprite.scale.x = -1.0;
                this._mainSprite.scale.x = -this.def_ScaleX;
                this._mainSprite.scale.y = this.def_ScaleY;
                this._shadowSprite.scale.x = this.def_SScaleX;
                this._shadowSprite.scale.y = this.def_SScaleY;
                //this._mainSprite.bitmap = ImageManager.loadSvActor(name);
                this.setHue(hue);
                //this.initVisibility();
            }
        }
        else SoR_ESVS_SE_updateBitmap.call(this);

    }


    const SoR_ESVS_SE_updateFrame = Sprite_Enemy.prototype.updateFrame;
    Sprite_Enemy.prototype.updateFrame = function () {
        if (this.IsSVBattler()) {
            Sprite_Battler.prototype.updateFrame.call(this);
            const bitmap = this._mainSprite.bitmap;
            if (bitmap) {

                const motionIndex = this._motion ? this._motion.index : 0;
                const pattern = this._pattern < 3 ? this._pattern : 1;

                if (this._bmpW != bitmap.width || this._bmpH != bitmap.height || this._currentMotionIdx != motionIndex || this._currentPattern != pattern) {//v1.11
                    this._currentMotionIdx = motionIndex;
                    this._currentPattern = pattern;
                    this._bmpW = bitmap.width / 9;
                    this._bmpH = bitmap.height / 6;

                    const cw = this._bmpW;
                    const ch = this._bmpH;
                    const cx = Math.floor(this._currentMotionIdx / 6) * 3 + this._currentPattern;
                    const cy = this._currentMotionIdx % 6;
                    this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
                    if (this._effectType === "bossCollapse") this._mainSprite.setFrame(cx * cw, cy * ch, cw, this._effectDuration);
                    //else this.setFrame(0, 0, cw, ch);
                }
            }
        }
        else SoR_ESVS_SE_updateFrame.call(this);
    }

    const SoR_ESVS_SE_updateMove = Sprite_Enemy.prototype.updateMove;
    Sprite_Enemy.prototype.updateMove = function () {
        if (this.IsSVBattler()) {
            const bitmap = this._mainSprite.bitmap;
            if (!bitmap || bitmap.isReady()) {
                Sprite_Battler.prototype.updateMove.call(this);
            }
        }
        else SoR_ESVS_SE_updateMove.call(this);
    }

    Sprite_Enemy.prototype.updateMotion = function () {
        if (!this.IsSVBattler()) return;

        this.setupMotion();
        this.setupWeaponAnimation();
        if (this._enemy.isMotionRefreshRequested()) {
            this.refreshMotion();
            this._enemy.clearMotion();
        }
        this.updateMotionCount();
    }

    Sprite_Enemy.prototype.updateMotionCount = function () {
        if (!this.IsSVBattler()) return;
        if (IsDMotion) {
            if (!this.updateMotionCount_DM()) return;
        }

        if (this._motion && ++this._motionCount >= this.motionSpeed()) {
            if (this._motion.loop) {
                this._pattern = (this._pattern + 1) % 4;
            } else if (this._pattern < 2) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    }

    Sprite_Enemy.prototype.motionSpeed = function () {
        if (!this.IsSVBattler()) return;

        return 12;
    }

    Sprite_Enemy.prototype.refreshMotion = function () {
        if (!this.IsSVBattler()) return;

        if (IsDMotion) this.refreshMotion_DM();
        const actor = this._enemy;
        if (actor) {
            const stateMotion = actor.stateMotionIndex();
            if (/*actor.isInputting() ||*/ actor.isActing()) {
                this.startMotion("walk");
            } else if (stateMotion === 3) {
                this.startMotion("dead");
            } else if (stateMotion === 2) {
                this.startMotion("sleep");
            } else if (actor.isChanting()) {
                this.startMotion("chant");
            } else if (actor.isGuard() || actor.isGuardWaiting()) {
                this.startMotion("guard");
            } else if (stateMotion === 1) {
                this.startMotion("abnormal");
            } else if (actor.isDying()) {
                this.startMotion("dying");
            } else if (actor.isUndecided()) {
                this.startMotion("walk");
            } else {
                this.startMotion("wait");
            }
        }
    }


    Sprite_Enemy.prototype.stepForward = function () {
        //this.startMove(48, 0, 12);
    }

    Sprite_Enemy.prototype.stepBack = function () {
        //this.startMove(0, 0, 12);
    }

    Sprite_Enemy.prototype.retreat = function () {
        this.startMove(-300, 0, 30);
    }

    Sprite_Enemy.prototype.onMoveEnd = function () {
        if (IsDMotion) this.onMoveEnd_DM();
        else {
            Sprite_Battler.prototype.onMoveEnd.call(this);
            if (!BattleManager.isBattleEnd()) this.refreshMotion();
        }
    }


    Sprite_Enemy.prototype.damageOffsetX = function () {
        return Sprite_Battler.prototype.damageOffsetX.call(this);
    }

    Sprite_Enemy.prototype.damageOffsetY = function () {
        return Sprite_Battler.prototype.damageOffsetY.call(this) - 8;
    }





    /////////////////////////////////////////////////////////////////////
    const SoR_ESVS_GE_performActionStart = Game_Enemy.prototype.performActionStart;
    Game_Enemy.prototype.performActionStart = function (action) {
        if (this._sprite().IsSVBattler()) Game_Battler.prototype.performActionStart.call(this, action);
        else SoR_ESVS_GE_performActionStart.call(this, ...arguments);
    }

    const SoR_ESVS_GE_performAction = Game_Enemy.prototype.performAction;
    Game_Enemy.prototype.performAction = function (action) {
        if (IsDMotion) this.performAction_DM(action);

        if (this._sprite().IsSVBattler()) {
            Game_Battler.prototype.performAction.call(this, action);
            if (action.isAttack()) {
                this.performAttack();
            } else if (action.isGuard()) {
                this.requestMotion("guard");
            } else if (action.isMagicSkill()) {
                this.requestMotion("spell");
            } else if (action.isSkill()) {
                this.requestMotion("skill");
            } else if (action.isItem()) {
                this.requestMotion("item");
            }
        }
        else SoR_ESVS_GE_performAction.call(this, action);
    }

    const SoR_ESVS_GE_performDamage = Game_Enemy.prototype.performDamage;
    Game_Enemy.prototype.performDamage = function () {
        if (this._sprite().IsSVBattler()) {
            Game_Battler.prototype.performDamage.call(this);
            if (this.isSpriteVisible()) {
                this.requestMotion("damage");
            }
            SoundManager.playEnemyDamage();
        }
        else SoR_ESVS_GE_performDamage.call(this);
    }


    Game_Enemy.prototype.performAttack = function () {
        //const weapons = this.weapons();
        const wtypeId = this.weapons();// weapons[0] ? weapons[0].wtypeId : 0;
        const attackMotion = $dataSystem.attackMotions[wtypeId];
        if (attackMotion) {
            if (attackMotion.type === 0) {
                this.requestMotion("thrust");
            } else if (attackMotion.type === 1) {
                this.requestMotion("swing");
            } else if (attackMotion.type === 2) {
                this.requestMotion("missile");
            }
            this.startWeaponAnimation(attackMotion.weaponImageId);
        }
    }

    Game_Enemy.prototype.weapons = function () {
        if (this.enemy().meta.SVWeaponType) {
            return parseInt(this.enemy().meta.SVWeaponType.trim());
        }
        else return 0;
    }



    const SoR_ESVS_GE_performEvasion = Game_Enemy.prototype.performEvasion;
    Game_Enemy.prototype.performEvasion = function () {
        if (this._sprite().IsSVBattler()) {
            Game_Battler.prototype.performEvasion.call(this);
            this.requestMotion("evade");
        }
        else SoR_ESVS_GE_performEvasion.call(this);
    }

    const SoR_ESVS_GE_performMagicEvasion = Game_Enemy.prototype.performMagicEvasion;
    Game_Enemy.prototype.performMagicEvasion = function () {
        if (this._sprite().IsSVBattler()) {
            Game_Battler.prototype.performMagicEvasion.call(this);
            this.requestMotion("evade");
        }
        else SoR_ESVS_GE_performMagicEvasion.call(this);
    }

    const SoR_ESVS_GE_performCounter = Game_Enemy.prototype.performCounter;
    Game_Enemy.prototype.performCounter = function () {
        if (this._sprite().IsSVBattler()) {
            Game_Battler.prototype.performCounter.call(this);
            this.performAttack();
        }
        else SoR_ESVS_GE_performCounter.call(this);
    }


    /*
    Sprite_Enemy.prototype.performVictory = function() {
        this.setActionState("done");
        if (this.canMove()) {
            this.requestMotion("victory");
        }
    };
    */
    Game_Party.prototype.performEscape = function () {
        for (const actor of this.members()) {
            actor.performEscape();
        }
    }

    const SoR_ESVS_GB_performEscape = Game_Battler.prototype.performEscape;
    Game_Battler.prototype.performEscape = function () {
        if (this._sprite().IsSVBattler()) {
            this.performEscape();
        }
        else SoR_ESVS_GB_performEscape.call(this);
    }

    const SoR_ESVS_GB_escape = Game_Battler.prototype.escape;
    Game_Battler.prototype.escape = function () {
        if (!this.isActor()) this._sprite().retreat();
        SoR_ESVS_GB_escape.call(this);
    };
    Sprite_Weapon.prototype.reverseWeaponSprite = function () {
        this.x = 16 + this.parent.def_WeaponPaddX;
        this.y = this.parent.def_WeaponPaddY;

        this.scale.x = -this.parent.def_WeaponScaleX;
        this.scale.y = this.parent.def_WeaponScaleY;
        //this.scale.x = -1.0;
    }

    //////////////////////////////////////////////////////////////
    //map: battler object -> battler sprite
    Game_Battler.prototype._sprite = function () {
        return BattleManager._spriteset.findTargetSprite(this);
    }



    //////////////////////////////////////////////////////////////
    function ChoiceSVSprite(note) {
        const notes = note.split(/[\r\n]+/);
        const n_note = notes.length;

        const rot = [];
        let av = 0;
        for (let n = 0; n < n_note; n++) {
            const line = notes[n];
            if (line.match(/<(?:SVBattler):[ ]*([^\n\t,]*)[ ]*,?[ ]*(.\d+)?>/i)) {
                if (!RegExp.$2) return RegExp.$1;
                else {
                    rot.push({ nm: RegExp.$1, pro: parseInt(RegExp.$2) });
                    av += parseInt(RegExp.$2)
                }
            }
        }

        const rnd = Math.random() * av;
        const lr = rot.length
        av = 0;
        for (let i = 0; i < lr; i++) {
            if (av <= rnd && rnd < av + rot[i].pro) return rot[i].nm;
            av += rot[i].pro;
        }
    }










    ///////////////////////////////////////////////////////////////////////////////
    // Support to keep compatibility with NRP_DynamicMotionMZ by Takeshi Sunagawa
    ///////////////////////////////////////////////////////////////////////////////

    if (IsDMotion) {
        // Co-working with NRP_DynamicMotionMZ.js
        //const SoR_ESVS_DMBM_getDefaultMotionDuration = BaseMotion.prototype.getDefaultMotionDuration;
        let SoR_ESVS_DMBM_getDefaultMotionDuration = BaseMotion.prototype.getDefaultMotionDuration;
        BaseMotion.prototype.getDefaultMotionDuration = function (a, motion) {
            var motionDuration;

            if (a && a._enemy && a._enemy._sprite().IsSVBattler()) {
                let tmp = a._motion;
                if (motion == "attack") {
                    const wtypeId = a._enemy.weapons();
                    var attackMotion = $dataSystem.attackMotions[wtypeId];
                    if (attackMotion) {
                        if (attackMotion.type === 0) {
                            a._motion = Sprite_Enemy.MOTIONS["thrust"];
                        } else if (attackMotion.type === 1) {
                            a._motion = Sprite_Enemy.MOTIONS["swing"];
                        } else if (attackMotion.type === 2) {
                            a._motion = Sprite_Enemy.MOTIONS["missile"];
                        }
                    }
                } else {
                    a._motion = this.motion;
                }
                motionDuration = a.motionSpeed();
                a._motion = tmp;

            }
            else return SoR_ESVS_DMBM_getDefaultMotionDuration.call(this, ...arguments);

            return motionDuration;
        };





        //IsDMotion
        Sprite_Enemy.prototype.startMotion_DM = function (motionType) {
            if (this._motionStartPattern) this._pattern = this._motionStartPattern;
        }

        Sprite_Enemy.prototype.updateMotionCount_DM = function () {
            if (this._motionDuration != undefined || this._motionPattern != undefined) {
                const dm = this.dynamicMotion;
                const t = this.getDynamicMotionTime();
                const et = this.getDynamicMotionEndTime();

                var motionSpeed;
                if (this._motionDuration != undefined) {
                    motionSpeed = this._motionDuration;
                } else {
                    motionSpeed = this.motionSpeed();
                }
                if (this._motion && ++this._motionCount >= motionSpeed) {
                    if (this._motionPattern != undefined) {
                        this._pattern = eval(this._motionPattern);
                        if (this._pattern < 0) {
                            this.refreshMotion();
                        }
                    } else if (this._motion.loop) {
                        this._pattern = (this._pattern + 1) % 4;
                    } else if (this._pattern < 2) {
                        this._pattern++;
                    } else {
                        this.refreshMotion();
                    }
                    this._motionCount = 0;
                }
                return false;//
            }
            return true;//
        }


        Sprite_Enemy.prototype.refreshMotion_DM = function () {
            this._motionDuration = undefined;
            this._motionPattern = undefined;
            this._motionStartPattern = undefined;

            if (this._weaponSprite.bitmap) {
                this._weaponSprite._weaponImageId = 0;
                this._weaponSprite.updateFrame();
            }
        }

        Sprite_Enemy.prototype.onMoveEnd_DM = function () {
            Sprite_Battler.prototype.onMoveEnd.call(this);
            if (!BattleManager.isBattleEnd()) {
                if (this._motion
                    && !this._motion.loop
                    && this._pattern >= 0 && this._pattern <= 2) {
                    return;
                }
                this.refreshMotion();
            }
        }

        Game_Enemy.prototype.performAction_DM = function (action) {
            Game_Actor.prototype.performAction.call(this, action);
        }

        //Overwritten (v1.151)
        Sprite.prototype.startDynamicSvMotion = function (dynamicMotion) {
            const bm = dynamicMotion.baseMotion;
            const dm = dynamicMotion;

            // modified here (by Soryu)
            if ($gameParty.inBattle()) {
                if (this._enemy && !this._enemy._sprite().IsSVBattler()) return;
            }
            else {
                if (!dm.motion || !this._enemy) return;
            }


            const a = dm.referenceSubject;
            const subject = bm.getReferenceSubject();
            const b = dm.referenceTarget;
            const repeat = dm.repeat;
            const r = dm.r;

            this._motionCount = 0;
            this._pattern = 0;

            this._motionDuration = dm.motionDuration;
            this._motionPattern = dm.motionPattern;
            if (dm.motionStartPattern != undefined) {
                this._motionStartPattern = eval(dm.motionStartPattern);
            }
            if (dm.motion == "attack") {
                var weaponId;
                if (dm.weaponId) {
                    weaponId = eval(dm.weaponId);
                }
                var weaponType;
                if (dm.weaponType) {
                    weaponType = eval(dm.weaponType);
                }
                this._battler.performAttackDynamicMotion(weaponId, weaponType);
            } else {
                if (this._weaponSprite) {
                    this._weaponSprite._weaponImageId = 0;
                    this._weaponSprite.updateFrame();
                }
                this.startMotion(dm.motion);
            }
        }

        Game_Enemy.prototype.performAttackDynamicMotion = function (weaponId, weaponType) {
            var wtypeId;
            if (weaponType != undefined) {
                wtypeId = weaponType;
            } else {
                var weapons;
                if (weaponId != undefined) {
                    weapons = [$dataWeapons[weaponId]];
                } else {
                    weapons = this.weapons();
                }
                wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
            }


            var attackMotion = $dataSystem.attackMotions[wtypeId];
            if (attackMotion) {
                if (attackMotion.type === 0) {
                    this.requestMotion('thrust');
                } else if (attackMotion.type === 1) {
                    this.requestMotion('swing');
                } else if (attackMotion.type === 2) {
                    this.requestMotion('missile');
                }
                this.startWeaponAnimation(attackMotion.weaponImageId);
            }
        }

    }//if(IsDMotion)

})();