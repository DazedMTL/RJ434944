//=============================================================================
//  Keke_TotalDamage - 合計ダメージ
// バージョン: 1.0.0
//=============================================================================
// Copyright (c) 2022 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 合計ダメージとヒット数を表示する
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.1.0.0】
 * バトラー毎に合計ダメージとヒット数を表示する
 * フォント設定や表示位置、サイズなど見やすいように自由に設定可能
 * 
 * ※使用フォントを変更する場合は、
 * 　プラグイン『Keke_CommonData』であらかじめ登録しておくことが必要
 *
 * ● 利用規約 ●
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 * 
 * 
 * 
 * Show total damage and number of hits per battler
 * Font settings, display position, size, etc. can be freely set for easy viewing
 *
 * ※ To change the font used,
 * It is necessary to register in advance with the plug-in "Keke_CommonData"
 *
 * ● Terms of Use ●
 * Feel free to use it under the MIT license.
 * 
 * 
 *
 * @param フォント設定
 * 
 * @param フォント
 * @parent フォント設定
 * @desc 使用するフォント。『Keke_CommonData』でフォント登録した名を書く
 * @default 
 * 
 * @param 文字サイズ
 * @parent フォント設定
 * @desc テキストの文字サイズ。空欄なら標準サイズ。+1 で標準サイズ + 1、-1 で標準サイズ - 1
 * @default 36
 * 
 * @param 縁取り幅
 * @parent フォント設定
 * @desc テキストの縁取り幅。5 なら 5ピクセル
 * @default 9
 * 
 * @param 文字色設定
 * 
 * @param HPダメージ
 * @parent 文字色設定
 * @desc HPダメージの文字色設定
 * @type struct<eachCfg>
 * @default {"文字色":"255, 255, 255, 1","縁取り色":"0, 0, 0, 1","無効":""}
 * 
 * @param HP回復
 * @parent 文字色設定
 * @desc HP回復の文字色設定
 * @type struct<eachCfg>
 * @default {"文字色":"180, 255, 180, 1","縁取り色":"0, 0, 0, 1","無効":""}
 * 
 * @param MPダメージ
 * @parent 文字色設定
 * @desc MPダメージの文字色設定
 * @type struct<eachCfg>
 * @default {"文字色":"255, 255, 150, 1","縁取り色":"0, 0, 0, 1","無効":""}
 * 
 * @param MP回復
 * @parent 文字色設定
 * @desc MP回復の文字色設定
 * @type struct<eachCfg>
 * @default {"文字色":"130, 180, 255, 1","縁取り色":"0, 0, 0, 1","無効":""}
 * 
 * @param 表示設定1
 * 
 * @param 表示時間
 * @parent 表示設定1
 * @desc 合計ダメージの表示時間。50 なら 50フレーム
 * @default 120
 *
 * @param 表示位置-味方
 * @parent 表示設定1
 * @desc 味方の合計ダメージの表示位置設定
 * @type struct<posCfg>
 * @default {"表示位置":"下","ずらしX":"0","ずらしY":"0","ダメージポップ-ずらしX":"0","ダメージポップ-ずらしY":"-30"}
 * 
 * @param 表示位置-敵
 * @parent 表示設定1
 * @desc 敵の合計ダメージの表示位置設定
 * @type struct<posCfg>
 * @default {"表示位置":"下","ずらしX":"0","ずらしY":"0","ダメージポップ-ずらしX":"0","ダメージポップ-ずらしY":"-22"}
 * 
 * @param 表示設定2
 * 
 * @param 出現アニメ
 * @parent 表示設定2
 * @desc 出現アニメの設定
 * @type struct<appearAnime>
 * @default {"アニメ時間":"15","移動X":"","移動Y":"","スケール":"3","フェードイン":"","無効":""}
 * 
 * @param ヒット数
 * @parent 表示設定2
 * @desc ヒット数の表示設定
 * @type struct<hit>
 * @default {"位置":"","表示方向":"左","ずらしX":"0","ずらしY":"0","フォント設定":"","フォント":"","文字サイズ":"26","縁取り幅":"7","文字色":"255, 255, 0, 1","縁取り色":"0, 0, 0, 1","ラべル":"","ヒット数ラベル":"Hit","文字色-ラベル":"0, 255, 192, 1","縁取り色-ラベル":"0, 0, 0, 1","ラベル幅":"25","無効":""}
 * 
 * @param ミス回避
 * @parent 表示設定2
 * @desc ミス・回避の設定
 * @type struct<missEva>
 * @default {"テキスト-ミス":"ミス！","テキスト-回避":"回避！","フォント":"","文字サイズ":"30","縁取り幅":"9","文字色":"255, 255, 255, 1","縁取り色":"0, 0, 0, 1","無効":""}
 * 
 * @param その他
 * 
 * @param ダメージポップ無効
 * @parent その他
 * @desc 標準のダメージポップを表示しない
 * @type boolean
 * @default false
 */



//==================================================
/*~struct~eachCfg:
//==================================================
 * @param 文字色
 * @desc テキストの文字色。赤, 緑, 青, 濃度。色0〜255、濃度0〜1
 * @default 
 *
 * @param 縁取り色
 * @desc テキストの縁取り色。赤, 緑, 青, 濃度。色0〜255、濃度0〜1
 * @default 
 * 
 * @param 無効
 * @desc 合計ダメージを表示しない
 * @type boolean
 * @default
 */



//==================================================
/*~struct~posCfg:
//==================================================
 * @param 表示方向
 * @desc 合計ダメージの表示方向。下or中央or上
 * @type select
 * @option 上
 * @option 中央
 * @option 下
 * @default 
 * 
 * @param ずらしX
 * @desc 合計ダメージのX位置ずらし。5 なら 5ピクセル 右へ
 * @default 0
 * 
 * @param ずらしY
 * @desc 合計ダメージのY位置ずらし。5 なら 5ピクセル 下へ
 * @default 0
 * 
 * @param ダメージポップ-ずらしX
 * @desc 標準のダメージポップのX位置ずらし。5 なら 5ピクセル 右へ
 * @default 0
 * 
 * @param ダメージポップ-ずらしY
 * @desc 標準のダメージポップのY位置ずらし。5 なら 5ピクセル 下へ
 * @default 0
 */



//==================================================
/*~struct~appearAnime:
//==================================================
 * @param アニメ時間
 * @desc アニメの実行時間。5 なら 5フレーム
 * @default 
 * 
 * @param 移動X
 * @desc X移動量。5 なら 5ピクセル分 右へ移動
 * @default
 * 
 * @param 移動Y
 * @desc Y移動量。5 なら 5ピクセル分 跳ねる
 * @default
 * 
 * @param スケール
 * @desc 拡縮アニメ。5 なら サイズ5倍→1倍、0.5 なら サイズ0.5倍→1倍
 * @default 
 * 
 * @param フェードイン
 * @desc 不透明度アニメ。50 なら 不透明度50→255
 * @default
 * 
 * @param 無効
 * @desc 出現アニメを実行しない
 * @type boolean
 * @default
 */


//==================================================
/*~struct~hit:
//==================================================
 * @param 位置
 *
 * @param 表示方向
 * @parent 位置
 * @desc ヒット数の表示方向。合計ダメージの上or下or左or右
 * @type select
 * @option 上
 * @option 下
 * @option 左
 * @option 右
 * @default 左
 * 
 * @param ずらしX
 * @parent 位置
 * @desc ヒット数のX位置ずらし。5 なら 5ピクセル 右へ
 * @default 
 * 
 * @param ずらしY
 * @parent 位置
 * @desc ヒット数のY位置ずらし。5 なら 5ピクセル 下へ
 * @default 
 * 
 * @param フォント設定
 * 
 * @param フォント
 * @parent フォント設定
 * @desc 使用するフォント。『Keke_CommonData』でフォント登録した名を書く
 * @default 
 * 
 * @param 文字サイズ
 * @parent フォント設定
 * @desc ヒット数の文字サイズ。空欄なら標準サイズ。+1 で標準サイズ + 1、-1 で標準サイズ - 1
 * @default 
 * 
 * @param 縁取り幅
 * @parent フォント設定
 * @desc ヒット数の縁取り幅。5 なら 5ピクセル
 * @default 
 * 
 * @param 文字色
 * @parent フォント設定
 * @desc ヒット数の文字色。赤, 緑, 青, 濃度。色0〜255、濃度0〜1
 * @default 
 *
 * @param 縁取り色
 * @parent フォント設定
 * @desc ヒット数の縁取り色。赤, 緑, 青, 濃度。色0〜255、濃度0〜1
 * @default 
 * 
 * @param ラべル
 * 
 * @param ヒット数ラベル
 * @parent ラべル
 * @desc ヒット数の表示ラベル
 * @default 
 * 
 * @param 文字色-ラベル
 * @parent ラべル
 * @desc ラベルの文字色。赤, 緑, 青, 濃度。色0〜255、濃度0〜1
 * @default 
 *
 * @param 縁取り色-ラベル
 * @parent ラべル
 * @desc ラベルの縁取り色。赤, 緑, 青, 濃度。色0〜255、濃度0〜1
 * @default 
 * 
 * @param ラベル幅
 * @parent ラべル
 * @desc ラベルの横幅。空欄ならラベル内容から幅を測定
 * @default 
 * 
 * @param 無効
 * @desc ヒット数を表示しない
 * @type boolean
 * @default
 */



//==================================================
/*~struct~missEva:
//==================================================
 * @param テキスト-ミス
 * @desc ミスの表示テキスト
 * @default 
 * 
 * @param テキスト-回避
 * @desc 回避の表示テキスト
 * @default 
 * 
 * @param フォント
 * @desc 使用するフォント。『Keke_CommonData』でフォント登録した名を書く
 * @default 
 * 
 * @param 文字サイズ
 * @desc ヒット数の文字サイズ。空欄なら標準サイズ。+1 で標準サイズ + 1、-1 で標準サイズ - 1
 * @default 
 * 
 * @param 縁取り幅
 * @desc ヒット数の縁取り幅。5 なら 5ピクセル
 * @default 
 * 
 * @param 文字色
 * @desc ヒット数の文字色。赤, 緑, 青, 濃度。色0〜255、濃度0〜1
 * @default 
 *
 * @param 縁取り色
 * @desc ヒット数の縁取り色。赤, 緑, 青, 濃度。色0〜255、濃度0〜1
 * @default 
 * 
 * @param 無効
 * @desc ヒット数を表示しない
 * @type boolean
 * @default
 */



(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];



    //==================================================
    //--  スプライト追加 /ベーシック
    //==================================================

    //- 破棄付きスプライト
    function SpriteKeTtdm() {
        this.initialize(...arguments);
    }

    SpriteKeTtdm.prototype = Object.create(Sprite.prototype);
    SpriteKeTtdm.prototype.constructor = SpriteKeTtdm;

    SpriteKeTtdm.prototype.destroy = function () {
        if (this.bitmap && !this.bitmap._url) { this.bitmap.destroy(); }
        Sprite.prototype.destroy.call(this);
    };



    //==================================================
    //--  文字列オート変換 /ベーシック
    //==================================================

    // 文字列のハッシュ化
    function strToHash(str) {
        if (!str || !str.length) { return {}; }
        let hash = {};
        const strs = JSON.parse(str);
        let val = null;
        let val2 = null;
        for (let key in strs) {
            val = strs[key];
            if (!key || !val) { continue; }
            val2 = strToAuto(val, key);
            hash[key] = val2;
        }
        return hash;
    };


    // 文字列のリスト化
    function strToList(str) {
        if (!str || !str.length) { return []; }
        let array = JSON.parse(str);
        return array.map((val, i) => {
            return strToAuto(val);
        });
    };


    // 文字列の自動処理
    function strToAuto(val, key = "") {
        let val2 = null;
        let match = null;
        let end = false;
        if (!end) {
            if (val[0] == "{") {
                val2 = strToHash(val);
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "[") {
                val2 = strToList(val);
                end = true;
            }
        }
        if (!end) { val = val + ","; }
        if (!end) {
            match = val.match(/^\s*(-?\d+,\s*-?\d+,\s*-?\d+,?\s*-?\d*\.?\d*)\s*,$/);
            if (match && !val.match(/[^\d\.\-,\s]/)) {
                if (key.match(/(カラー|色|塗り)/) && !key.includes("トーン") && !key.includes("ブレンド") && !key.includes("配色") && !key.includes("着色") && !key.includes("フラッシュ") && !key.includes("チェンジ") && !key.includes("選択")) {
                    val2 = "rgba(" + match[1] + ")";
                } else {
                    val2 = JSON.parse("[" + match[1] + "]");
                }
                end = true;
            }
        }
        if (!end) {
            match = val.match(/(-?\d+\.?\d*),\s*/g);
            if (match && match.length >= 2 && !val.match(/[^\d\.\-,\s]/)) {
                val2 = JSON.parse("[" + match.reduce((r, s) => r + s).replace(/,$/, "") + "]");
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(true|false)\s*,/);
            if (match) {
                val2 = match[1] == "true" ? true : false;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(-?\d+\.?\d*)\s*,/);
            if (match && !val.match(/[^\d\.\-,\s]/)) {
                val2 = Number(match[1]); end = true;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^.+,\n?.+/);
            if (match) {
                val2 = val.replace(/\s/g, "").split(",").filter(v => v);
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "\"") { val = val.slice(1); }
            val2 = val.slice(0, -1);
        }
        return val2;
    };



    //==================================================
    //--  パラメータ受け取り
    //==================================================

    //- 真偽化
    function toBoolean(str) {
        if (!str) { return false; }
        const str2 = str.toString().toLowerCase();
        if (str2 == "true" || str2 == "on") { return true; }
        if (str2 == "false" || str2 == "off") { return false; }
        return Number(str);
    };

    const parameters = PluginManager.parameters(pluginName);

    //- フォント設定
    const keke_fontFace = parameters["フォント"];
    const keke_fontSize = parameters["文字サイズ"];
    const keke_outWidth = Number(parameters["縁取り幅"]);

    //- 文字色設定
    const keke_eachCfg = {};
    keke_eachCfg.hpDamage = strToHash(parameters["HPダメージ"]);
    keke_eachCfg.hpHeal = strToHash(parameters["HP回復"]);
    keke_eachCfg.mpDamage = strToHash(parameters["MPダメージ"]);
    keke_eachCfg.mpHeal = strToHash(parameters["MP回復"]);

    //- 表示設定1
    const keke_viewTime = Number(parameters["表示時間"]);
    keke_posCfgFrd = strToHash(parameters["表示位置-味方"]);
    keke_posCfgOpp = strToHash(parameters["表示位置-敵"]);

    //- 表示設定2
    keke_appearAnime = strToHash(parameters["出現アニメ"]);
    keke_hitCfg = strToHash(parameters["ヒット数"]);
    keke_missEva = strToHash(parameters["ミス回避"]);

    //- その他
    keke_noDamagePop = toBoolean(parameters["ダメージポップ無効"]);
    keke_adaptFrontView = toBoolean(parameters["フロントビュー対応"]);



    //==================================================
    //--  共通更新
    //==================================================

    //- スプライトバトラー・ダメージポップの更新
    const _Sprite_Battler_updateDamagePopup = Sprite_Battler.prototype.updateDamagePopup;
    Sprite_Battler.prototype.updateDamagePopup = function () {
        _Sprite_Battler_updateDamagePopup.apply(this);
        // 合計ダメージの更新
        updateTotalDamage(this);
    };



    //==================================================
    //--  共通終了
    //==================================================

    //- スプライトの破棄
    function destroySprite(sprite) {
        if (!sprite) { return; }
        sprite.children.forEach(s => destroySprite(s));
        if (sprite.bitmap && !sprite.bitmap._url) { sprite.bitmap.destroy(); }
        if (sprite._texture) { sprite.destroy(); }
    };



    //==================================================
    //--  共通処理
    //==================================================

    //- フルアニメステータスASIの取得
    function getFullAnimeStatusAsi(battler) {
        if ($gameSystem.isSideView()) { return null; }
        if (!$gameTemp._fullAnimeStatusKe) { return null; }
        const asi = $gameTemp.getFullAnimeStatusAsiKe(battler);
        if (!asi || !asi.faceBaseSprite) { return null; }
        return asi;
    };



    //==================================================
    //--  合計ダメージの測定
    //==================================================

    //- 合計ダメージの測定 呼び出し(コア追加)
    const _Game_Battler_startDamagePopup = Game_Battler.prototype.startDamagePopup;
    Game_Battler.prototype.startDamagePopup = function () {
        // 合計ダメージの測定
        measureTotalDamage(this);
        // 標準のダメージポップの無効
        if (keke_noDamagePop) { return; }
        _Game_Battler_startDamagePopup.apply(this);
    };


    //- 合計ダメージの測定
    function measureTotalDamage(battler) {
        const result = battler.result();
        // 合計ダメージ変数を初期化
        if (!battler._totalDamagesKe) { battler._totalDamagesKe = { hp: 0, mp: 0, order: false, start: true, hit: 0, showText: null }; }
        // ダメージ量を取得
        const total = battler._totalDamagesKe;
        if (result.missed || result.evaded) {
            if (result.missed) { total.missed = true; }
            if (result.evaded) { total.evaded = true; }
            total.order = true;
        } else if (result.hpDamage) {
            total.hp += result.hpDamage;
            total.hit++;
            total.order = true;
        } else if (battler.isAlive() && result.mpDamage !== 0) {
            total.mp += result.mpDamage;
            total.hit++;
            total.order = true;
        }
    };



    //==================================================
    //--  合計ダメージの進行処理
    //==================================================

    //- バトルマネージャー・スタートアクション(コア追加)
    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function () {
        // 合計ダメージの初期化
        initTotalDamage();
        _BattleManager_startAction.apply(this);
    };


    //- 合計ダメージの初期化
    function initTotalDamage() {
        const members = [...$gameParty.members(), ...$gameTroop.members()];
        members.forEach(battler => {
            if (battler._popWaitingKe) { return; }
            battler._totalDamagesKe = null;
        });
    };



    //==================================================
    //--  合計ダメージの更新
    //==================================================

    // 合計ダメージの更新
    function updateTotalDamage(battlerSprite) {
        // 合計ダメージスプライトの開始
        startTotalDamageSprite(battlerSprite);
        // 合計ダメージスプライトの更新
        updateTotalDamageSprite(battlerSprite)
    };


    // 合計ダメージスプライトの更新
    function updateTotalDamageSprite(battlerSprite) {
        const tdSprite = battlerSprite._totalDamageSpriteKe;
        if (!tdSprite) { return; }
        // 合計ダメージの位置更新
        updateTotalDamagePos(tdSprite, battlerSprite);
        // 合計ダメージアニメの更新
        updateTotalDamageAnime(tdSprite);
        // 合計ダメージスプライトの消去
        if (delTotalDamageSprite(tdSprite)) {
            battlerSprite._totalDamageSpriteKe = null;
        };
    };



    //==================================================
    //--  合計ダメージの形成
    //==================================================

    // 合計ダメージスプライトの開始
    function startTotalDamageSprite(battlerSprite) {
        const total = battlerSprite._battler._totalDamagesKe;
        if (!total || !total.order) { return; }
        if (total.hp) {
            // 合計ダメージスプライトの形成
            createTotalDamageSprite(battlerSprite, total.hp, total.hit, "hp", total.start);
        } else if (total.mp) {
            // 合計ダメージスプライトの形成
            createTotalDamageSprite(battlerSprite, total.mp, total.hit, "mp", total.start);
        } else if (total.missed || total.evaded) {
            // ミス回避の作成
            makeMissEva(battlerSprite, total);
        }
        total.order = false;
        total.start = false;
    };


    //- ミス回避の作成
    function makeMissEva(battlerSprite, total) {
        const cfg = keke_missEva;
        if (cfg["無効"]) { return; }
        const text = total.missed ? cfg["テキスト-ミス"] : cfg["テキスト-回避"];
        // テキストの形成
        createText(battlerSprite, text, cfg, total.start);
    };


    //- テキストの形成
    function createText(battlerSprite, text, cfg, isStart) {
        // フォント設定を取得
        const fontSize = getFontSize(cfg["文字サイズ"] || keke_fontSize);
        const fontSizeRate = getFontSizeRate(cfg["フォント"] || keke_fontFace);
        const ow = cfg["縁取り幅"] || keke_outWidth || 9;
        // サイズを取得
        const width = strWidth(text, fontSize, fontSizeRate);
        const height = fontSize;
        // ビットマップ形成
        const bitmap = new Bitmap(width + ow * 2, height + ow * 2);
        // フォント設定の適用
        applyFontCfg(bitmap, cfg);
        // テキストを描画
        bitmap.drawText(text, ow / 2, ow / 2, width, height, fontSize);
        // スプライトの形成2
        createSprite2(bitmap, {}, isStart, battlerSprite);
    };


    //- 合計ダメージスプライトの形成
    function createTotalDamageSprite(battlerSprite, value, hitNum, type, isStart) {
        // フォント設定を取得
        const fontSize = getFontSize(keke_fontSize);
        const fontSizeRate = getFontSizeRate(keke_fontFace);
        const ow = keke_outWidth || 9;
        // 個別設定を取得
        const word = type + (value < 0 ? "Heal" : "Damage");
        const cfg = keke_eachCfg[word];
        if (cfg["無効"]) { return; }
        // サイズを取得
        const valueStr = value.toString().replace("-", "");;
        const width = strWidth(valueStr, fontSize, fontSizeRate);
        const height = fontSize;
        // 描画の前準備
        const d = prepareDraw({}, hitNum, width, height, ow);
        // ビットマップ形成
        const bitmap = new Bitmap(d.bitmapW, d.bitmapH);
        // フォント設定の適用
        applyFontCfg(bitmap, cfg);
        // ダメージ数を描画
        bitmap.drawText(valueStr, d.damageX, d.damageY, d.damageW, d.damageH, fontSize);
        // ヒット数の描画
        drawHitNum(bitmap, d);
        // スプライトの形成2
        createSprite2(bitmap, d, isStart, battlerSprite);
    };


    //- スプライトの形成2
    function createSprite2(bitmap, d, isStart, battlerSprite) {
        // スプライトがあったらビットマップを差し替えて終了
        const tdSprite = battlerSprite._totalDamageSpriteKe;
        if (tdSprite) {
            tdSprite.bitmap.destroy();
            tdSprite.bitmap = bitmap;
            // スプライトの形成3
            createSprite3(tdSprite, d, isStart);
            return;
        };
        // スプライト形成
        const sprite = new SpriteKeTtdm(bitmap);
        // チルド
        SceneManager._scene._windowLayer.addChild(sprite);
        // 変数セット
        battlerSprite._totalDamageSpriteKe = sprite;
        // アンカー
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        // スプライトの形成3
        createSprite3(sprite, d, isStart, battlerSprite);
    };


    //- スプライトの形成3
    function createSprite3(sprite, d, isStart, battlerSprite) {
        // 表示時間
        sprite._showTimeKe = keke_viewTime;
        // ダメージを中央化
        sprite._damageCenterXKe = d.damageCenterX ? d.damageCenterX : 0;
        // 出現アニメの開始
        if (isStart) { startAppearAnime(sprite); }
        // 位置更新フラグ
        sprite._updatesPosKe = true;
        // フロントアクター位置
        if (battlerSprite && isFrontViewAdapt(battlerSprite)) {
            const statusWindow = SceneManager._scene._statusWindow;
            const rect = statusWindow.faceRect(0);
            sprite._frontActorYKe = rect.height;
        }
    };


    //- 描画の前準備
    function prepareDraw(bitmap, hitNum, width, height, ow) {
        const d = {};
        d.cfg = keke_hitCfg;
        if (d.cfg["無効"]) { return { height: 0, ow: 0 }; }
        // フォント設定の適用
        let f = applyFontCfg(bitmap, d.cfg);
        // テキストを取得
        d.hitStr = hitNum.toString() + "";
        d.label = d.cfg["ヒット数ラベル"] || "";
        d.allText = d.hitStr + d.label;
        // フォント設定を取得
        let fontSize = f.fontSize
        const fontSizeRate = getFontSizeRate(d["フォント"] || keke_fontFace);
        const hitOw = f.outW
        // 表示方向を取得
        const hitDire = d.cfg["表示方向"];
        // ずらしを取得
        const hitOffsetX = d.cfg["ずらしX"] || 0;
        const hitOffsetY = d.cfg["ずらしY"] || 0;
        // サイズを取得
        const hitH = fontSize;
        const hitNumW = strWidth(d.hitStr, fontSize, fontSizeRate);
        const hitLabelW = d.cfg["ラベル幅"] || strWidth(d.label, fontSize, fontSizeRate);
        const hitW = hitNumW + hitLabelW + hitOw / 2 + 2;
        // 表示方向ごとに位置サイズデータを取得
        if (hitDire == "上") {
            d.bitmapW = Math.max(width + ow * 2, hitW + hitOw * 2.5 + hitOffsetX);
            d.bitmapH = height + ow * 2 + hitH + hitOffsetY;
            d.hitX = ow / 2 + hitOffsetX;
            d.hitY = ow / 2 + hitOffsetY;
            d.damageX = ow / 2;
            d.damageY = d.hitY + hitH + ow / 2;
            d.damageW = width;
            d.damageH = height;
        } else if (hitDire == "下") {
            d.bitmapW = Math.max(width + ow * 2, hitW + hitOw * 2.5 + hitOffsetX);
            d.bitmapH = height + ow * 2 + hitH + hitOffsetY;
            d.damageX = ow / 2;
            d.damageY = ow / 2;
            d.damageW = width;
            d.damageH = height;
            d.hitX = ow / 2 + hitOffsetX;
            d.hitY = d.damageY + d.damageH + ow / 2 + hitOffsetY;
        } else if (hitDire == "左") {
            d.bitmapW = width + ow * 2 + hitW + hitOffsetX;
            d.bitmapH = Math.max(height + ow * 2, hitH + hitOw * 2 + hitOffsetY);
            d.hitX = hitOw / 2 + hitOffsetX;
            d.hitY = ow + hitOffsetY;
            d.damageX = d.hitX + hitW + 2;
            d.damageY = ow / 2;
            d.damageW = width;
            d.damageH = height;
            d.damageCenterX = -hitW / 2;
        } else if (hitDire == "右") {
            d.bitmapW = width + ow * 2 + hitW + hitOffsetX;
            d.bitmapH = Math.max(height + ow * 2, hitH + hitOw * 2 + hitOffsetY);
            d.damageX = ow / 2;
            d.damageY = ow / 2;
            d.damageW = width;
            d.damageH = height;
            d.hitX = d.damageX + d.damageW + hitOw / 2 + hitOffsetX;
            d.hitY = ow + hitOffsetY;
            d.damageCenterX = hitW / 2;
        }
        d.hitW = hitW;
        d.hitH = hitH;
        d.hitNumW = hitNumW;
        d.hitLabelW = hitLabelW;
        d.hitOw = hitOw;
        return d;
    };


    //- ヒット数の描画
    function drawHitNum(bitmap, d) {
        if (!d.allText) { return; }
        // フォント設定の適用-ラベル
        applyFontCfg(bitmap, d.cfg, "-ラベル");
        // ラベルの描画
        bitmap.drawText(d.label, d.hitX + d.hitNumW + 2, d.hitY, d.hitLabelW, d.hitH);
        // フォント設定の適用
        applyFontCfg(bitmap, d.cfg);
        // ヒット数の描画
        bitmap.drawText(d.hitStr, d.hitX, d.hitY, d.hitNumW, d.hitH);
    };



    //==================================================
    //--  合計ダメージの位置・移動
    //==================================================

    //- 合計ダメージの位置更新
    function updateTotalDamagePos(sprite, battlerSprite) {
        // 位置更新フラグがオフならリターン
        //if (!sprite._updatesPosKe || !sprite._frame.width) { return; }
        if (!sprite._frame.width) { return; }
        // フルアニメステータスASIの取得
        const asi = getFullAnimeStatusAsi(battlerSprite._battler);
        // 位置設定を取得
        const posCfg = battlerSprite._enemy ? keke_posCfgOpp : keke_posCfgFrd;
        const pos = posCfg["表示方向"] == "上" ? 1 : posCfg["表示方向"] == "中央" ? 0.5 : 0;
        const offsetX = (posCfg["ずらしX"] || 0) + (sprite._movedXKe || 0);
        const offsetY = (posCfg["ずらしY"] || 0) + (sprite._movedYKe || 0);
        // サイドビューアクターのX補正
        const svActorOffsetX = $gameSystem.isSideView() && battlerSprite._actor ? -32 : 0;
        // 表示方向下の時のY補正
        const underOffsetY = pos == 0 && battlerSprite._frame.height ? -sprite._frame.height / 2 : 0;
        // フルアニメ時の位置
        if (asi) {
            const faceBaseSprite = asi.faceBaseSprite;
            // 位置
            sprite.x = faceBaseSprite.x + offsetX + (sprite._damageCenterXKe || 0) - (faceBaseSprite._tempMovedXKeFast || 0);
            sprite.y = faceBaseSprite.y - asi.faceH * pos + offsetY + (sprite._frontActorYKe || 0) - (faceBaseSprite._tempMovedYKeFast || 0);;
            // 通常時の位置
        } else {
            // 位置
            sprite.x = battlerSprite.x + offsetX + (sprite._damageCenterXKe || 0) + svActorOffsetX
            sprite.y = battlerSprite.y - battlerSprite._frame.height * battlerSprite.scale.y * pos + offsetY + (sprite._frontActorYKe || 0) + underOffsetY;
        }
        // 画面外に出さない
        noOutScreen(sprite, sprite._frame.width || 0, sprite._frame.height);
        // 位置設定済みフラグ
        //sprite._updatesPosKe = false;
    };


    //- 画面外に出さない
    function noOutScreen(sprite, w, h) {
        const overL = sprite.x - w / 2;
        const overR = sprite.x + w / 2 - Graphics.width;
        const overU = sprite.y - h / 2;
        const overD = sprite.y + h / 2 - Graphics.height;
        if (overL < 0) { sprite.x -= overL; } else
            if (overR > 0) { sprite.x -= overR; }
        if (overU < 0) { sprite.y -= overU; } else
            if (overD > 0) { sprite.y -= overD; }
    };


    //- 標準ダメージポップのずらし
    const _Sprite_Battler_damageOffsetX = Sprite_Battler.prototype.damageOffsetX;
    Sprite_Battler.prototype.damageOffsetX = function () {
        let result = _Sprite_Battler_damageOffsetX.apply(this);
        const posCfg = this._enemy ? keke_posCfgOpp : keke_posCfgFrd;
        result += posCfg["ダメージポップ-ずらしX"] || 0;
        return result;
    };

    const _Sprite_Battler_damageOffsetY = Sprite_Battler.prototype.damageOffsetY;
    Sprite_Battler.prototype.damageOffsetY = function () {
        let result = _Sprite_Battler_damageOffsetY.apply(this);
        const posCfg = this._enemy ? keke_posCfgOpp : keke_posCfgFrd;
        result += posCfg["ダメージポップ-ずらしY"] || 0;
        return result;
    };


    //- フロントビュー対応か
    function isFrontViewAdapt(sprite) {
        const statusWindow = SceneManager._scene._statusWindow;
        return !$gameSystem.isSideView() && sprite._actor && (statusWindow && statusWindow.visible);
    };



    //==================================================
    //--  合計ダメージアニメ
    //==================================================

    //- 出現アニメの開始
    function startAppearAnime(sprite) {
        const drift = {};
        // パラメータ
        const d = keke_appearAnime || {};
        if (d["無効"]) { return; }
        const timeMax = d["アニメ時間"] || 0;
        if (!timeMax) { return; }
        const moveX = d["移動X"];
        const moveY = d["移動Y"];;
        const scale = d["スケール"];
        const opacity = d["フェードイン"];
        const easing = "EO";
        // アニメ時間
        drift.timeMax = timeMax;
        drift.duration = timeMax;
        // 移動X
        if (moveX != null && moveX) {
            drift.posXs = makeDrift([{ val: 0, easing: easing }], -moveX, timeMax, "移動X");
            sprite._movedXKe = -moveX;
        }
        // 移動Y
        if (moveY != null && moveY) {
            drift.posYs = makeDrift([{ val: -moveY, easing: "TN" }], 0, timeMax, "移動Y");
            sprite._movedYKe = 0;
        }
        // スケール
        if (scale != null && scale != 1) {
            // スケールX
            drift.scaleXs = makeDrift([{ val: 1, easing: easing }], scale, timeMax, "スケールX");
            sprite.scale.x = scale;
            // スケールY
            drift.scaleYs = makeDrift([{ val: 1, easing: easing }], scale, timeMax, "スケールY");
            sprite.scale.y = scale;
        }
        // 不透明度
        if (opacity != null && opacity != 255) {
            drift.opacities = makeDrift([{ val: 255, easing: easing }], opacity, timeMax, "不透明度");
            sprite.opacity = opacity;
        }
        // 変数セット
        sprite._driftKe = drift;
    };


    //- 変動の作成
    function makeDrift(datas, current, time, word) {
        if (!datas || !datas.length) { return; }
        if (word == "回転角") { current %= 360; }
        let ds = [];
        // データの数だけ処理
        datas.forEach(data => {
            if (data.val == null) { return; }
            const d = {};
            d.num = data.num || 1;
            d.datas = data.datas || ["", ""];
            const extra = data.extra || "";
            d.break = extra.includes("B");
            d.jump = extra.includes("J");
            d.direction = extra.includes("D");
            d.isCos = extra.includes("C");
            d.isRandom = d.datas[1].includes("~");
            d.easing = data.easing || "E";
            d.easingRate = data.easingRate || 1;
            d.timeMax = time / d.num;
            d.duration = d.timeMax;
            d.start = roundDecimal(current, 1000000);
            d.target = Number(data.val);
            d.vol = d.target - d.start;
            d.current = d.start;
            d.end = 0;
            // 終点
            if (d.easing == "TN" || d.easing == "RD") {
                d.end = d.start;
            } else {
                d.end = d.target;
            }
            ds.push(d);
        });
        return ds;
    };


    //- 合計ダメージアニメの更新
    function updateTotalDamageAnime(sprite) {
        if (!sprite._driftKe) { return; }
        const drift = sprite._driftKe;
        // 位置X
        if (drift.posXs && drift.posXs.length) {
            let moveXs = updateDrift(drift.posXs, "位置X");
            moveXs.forEach(v => sprite._movedXKe += v);
        }
        // 位置Y
        if (drift.posYs && drift.posYs.length) {
            let moveYs = updateDrift(drift.posYs, "位置Y");
            moveYs.forEach(v => sprite._movedYKe += v);
        }
        // スケールX
        if (drift.scaleXs && drift.scaleXs.length) {
            let scaleXs = updateDrift(drift.scaleXs, "スケールX");
            scaleXs.forEach(v => sprite.scale.x += v);
        }
        // スケールY
        if (drift.scaleYs && drift.scaleYs.length) {
            let scaleYs = updateDrift(drift.scaleYs, "スケールY");
            scaleYs.forEach(v => sprite.scale.y += v);
        }
        // 不透明度
        if (drift.opacities && drift.opacities.length) {
            let opacities = updateDrift(drift.opacities, "不透明度");
            opacities.forEach(v => sprite.opacity += v);
        }
        // カウントを減らす
        drift.duration--;
        // 終了
        if (!drift.duration) {
            sprite._driftKe = null;
        }
    };


    //- 変動の更新
    function updateDrift(ds, word) {
        let rs = []
        // データの数だけ処理
        ds.forEach(d => {
            // カウントを減らす
            d.duration--;
            let r = 0;
            next = applyEasing(d.current, d.start, d.target, d.duration, d.timeMax, d.easing, d.easingRate);
            r = next - d.current;
            d.current = next;
            // 終了
            if (d.duration <= 0) {
                // 終了値に合わせる
                r += roundDecimal(d.end - next, 1000000);
                d.num--;
                d.duration = d.timeMax;
            }
            if (r) { rs.push(r); }
        });
        return rs;
    };



    //==================================================
    //--  合計ダメージの消去
    //==================================================

    // 合計ダメージスプライトの消去
    function delTotalDamageSprite(sprite) {
        if (!sprite || !sprite._showTimeKe) { return; }
        let del = false;
        sprite._showTimeKe--;
        if (!sprite._showTimeKe) {
            destroySprite(sprite);
            del = true;
        }
        return del;
    };



    //==================================================
    //--  フォント
    //==================================================

    //- フォント設定の適用
    function applyFontCfg(bitmap, cfg, word = "") {
        bitmap.fontFace = cfg["フォント"] || keke_fontFace || $gameSystem.numberFontFace();
        bitmap.fontSize = getFontSize(cfg["文字サイズ"] || keke_fontSize);
        bitmap.textColor = cfg["文字色" + word] || "rgba(255, 255, 255, 1)";
        bitmap.outlineWidth = cfg["縁取り幅"] || keke_outWidth || 10;
        bitmap.outlineColor = cfg["縁取り色" + word] || "rgba(0, 0, 0, 1)";
        return { fontFace: bitmap.fontFace, fontSize: bitmap.fontSize, outW: bitmap.outlineWidth };
    };


    //- フォントサイズの取得
    function getFontSize(size) {
        const mainSize = $gameSystem.mainFontSize();
        if (!size) { return mainSize; }
        const sizeStr = size.toString();
        if (sizeStr.includes("+")) {
            const plus = Number(sizeStr.replace("+", ""));
            size = mainSize + plus;
        } else if (sizeStr.includes("-")) {
            const minus = Number(sizeStr.replace("-", ""));
            size = mainSize - minus;
        }
        return Number(size);
    };


    //- フォントサイズ率の取得
    function getFontSizeRate(fontName) {
        if (!fontName) { return { width: 1, half: 1 }; }
        let widthSize = 1;
        let halfSize = 1;
        // フォントリスト展開
        for (const data of $gameTemp._fontListKe) {
            // 名前が適合したら取得
            if (data["フォント名"] == fontName) {
                widthSize = data["横幅サイズ"] || 1;
                halfSize = data["半角サイズ"] || 1;
                break;
            }
        }
        return { width: widthSize, half: halfSize };
    };


    //- 文字列幅
    function strWidth(str, fontSize, sizeRate = {}) {
        return strBytes(str, 0.5, sizeRate.half || 1) * fontSize * (sizeRate.width || 1);
    };


    //- 文字列バイト数
    function strBytes(str, rate = 1, halfSize = 1) {
        let byte = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
                byte += 1 * (rate * halfSize);
            } else {
                byte += 2 * rate;
            }
        }
        return byte;
    };



    //==================================================
    //--  イージング
    //==================================================

    //- イージングの適用
    function applyEasing(current, start, target, duration, timeMax, easing, easingRate = 1) {
        // イージングの処理
        if (easing.match(/ei|eo|e/i)) {
            return processEasing(current, target, duration + 1, timeMax, easing, easingRate);
        }
        // カービング
        if (easing.match(/tn|cg|fk|cf|rd|bk/i)) {
            return processCurving(current, start, target, duration + 1, timeMax, easing, easingRate);
        }
    };


    //- イージングの処理
    function processEasing(current, target, duration, timeMax, easing, easingRate = 1) {
        const lt = calcEasing((timeMax - duration) / timeMax, easing, easingRate);
        const t = calcEasing((timeMax - duration + 1) / timeMax, easing, easingRate);
        const start = (current - target * lt) / (1 - lt);
        return start + (target - start) * t;
    };


    //- イージングの計算
    function calcEasing(t, easing, easingRate = 1) {
        const exponent = 2 * easingRate;
        switch (easing.toUpperCase()) {
            case "EI":
                return easeIn(t, exponent);
            case "EO":
                return easeOut(t, exponent);
            case "E":
                return easeInOut(t, exponent);
            default:
                return t;
        }
    };


    //- 各イージング処理
    function easeIn(t, exponent) {
        return Math.pow(t, exponent) || 0.001;
    };

    function easeOut(t, exponent) {
        ;
        return 1 - (Math.pow(1 - t, exponent) || 0.001);
    };

    function easeInOut(t, exponent) {
        if (t < 0.5) {
            return easeIn(t * 2, exponent) / 2;
        } else {
            return easeOut(t * 2 - 1, exponent) / 2 + 0.5;
        }
    };


    //- カービングの処理
    function processCurving(current, start, target, duration, timeMax, easing, easingRate = 1) {
        // 0 の時の処理
        if (duration <= 0) { return easing.match(/tn|rd|bk/i) ? start : target; }
        let result = 0;
        // ターン
        if (easing.toUpperCase() == "TN") {
            result = processTurn(current, start, target, duration, timeMax, easingRate);
            // チャージ
        } else if (easing.toUpperCase() == "CG") {
            result = processCharge(current, start, target, duration, timeMax, easingRate);
            // フック
        } else if (easing.toUpperCase() == "FK") {
            result = processFook(current, start, target, duration, timeMax, easingRate);
            // チャージフック
        } else if (easing.toUpperCase() == "CF") {
            result = processChargeFook(current, start, target, duration, timeMax, easingRate);
            // ラウンド
        } else if (easing.toUpperCase() == "RD") {
            result = processRound(current, start, target, duration, timeMax, easingRate);
            // バック
        } else if (easing.toUpperCase() == "BK") {
            result = processBack(current, start, target, duration, timeMax, easingRate);
        }
        return result;
    };


    //- ターンの処理
    function processTurn(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax / 2);
        const d2 = timeMax - d1;
        if (duration > d2) {
            result = processEasing(current, target, duration - d2, d1, "eo", easingRate);
        } else {
            result = processEasing(current, start, duration, d2, "ei", easingRate);
        }
        return result;
    };


    //- チャージの処理
    function processCharge(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax / 3);
        const d2 = timeMax - d1;
        if (duration > d2) {
            result = processEasing(current, start + (start - target) * easingRate, duration - d2, d1, "e");
        } else {
            result = processEasing(current, target, duration, d2, "e");
        }
        return result;
    };


    //- フックの処理
    function processFook(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax * 2 / 3);
        const d2 = timeMax - d1;
        if (duration > d2) {
            result = processEasing(current, target + (target - start) * easingRate, duration - d2, d1, "e");
        } else {
            result = processEasing(current, target, duration, d2, "e");
        }
        return result;
    };


    //- チャージフックの処理
    function processChargeFook(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax / 4);
        const d3 = Math.round(timeMax / 4);
        const d2 = timeMax - d1 - d3;
        if (duration > (d2 + d3)) {
            result = processEasing(current, start + (start - target) * easingRate, duration - d2 - d3, d1, "e");
        } else if (duration > d3) {
            result = processEasing(current, target + (target - start) * easingRate, duration - d3, d2, "e");
        } else {
            result = processEasing(current, target, duration, d3, "e");
        }
        return result;
    };


    //- ラウンドの処理
    function processRound(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = Math.round(timeMax / 4);
        const d2 = Math.round(timeMax / 2);
        const d3 = timeMax - d1 - d2;
        if (duration > (d2 + d3)) {
            result = processEasing(current, target, duration - d2 - d3, d1, "eo");
        } else if (duration > d3) {
            result = processEasing(current, start + (start - target) * easingRate, duration - d3, d2, "e");
        } else {
            result = processEasing(current, start, duration, d3, "ei");
        }
        return result;
    };


    //- バックの処理
    function processBack(current, start, target, duration, timeMax, easingRate) {
        let result = 0;
        const d1 = 1;
        const d2 = timeMax - d1;
        if (duration > d2) {
            result = processEasing(current, target, duration - d2, d1, "e", easingRate);
        } else {
            result = processEasing(current, start, duration, d2, "e", easingRate);
        }
        return result;
    };


    //- 小数点を丸める
    function roundDecimal(val, rate) {
        const newVal = Math.floor(val * rate) / rate
        return newVal;
    };

})();