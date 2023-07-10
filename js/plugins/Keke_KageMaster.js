//=============================================================================
//  Keke_KageMaster - 影マスター
// バージョン: 3.1
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc リアルな影を手軽に自在につけられるよ
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * 
 * 
 * @param プレイヤー影タイプ
 * @desc  - プレイヤーの影の形。本体準拠の形をした real と、シンプルな円形の circle、影を表示しない none の三種類 初期値 real
 * @type select
 * @option real
 * @option circle
 * @option none
 * @default real
 * 
 * @param キャラ影タイプ
 * @desc  - キャラクターの影の形。本体準拠の形をした real と、シンプルな円形の circle、影を表示しない none の三種類 初期値 real
 * @type select
 * @option real
 * @option circle
 * @option none
 * @default real
 * 
 * @param オブジェクト影タイプ
 * @desc  - オブジェクトの影の形。 オブジェクトとは頭文字が ! の画像ファイルをもつイベントのこと 初期値 real
 * @type select
 * @option real
 * @option circle
 * @option none
 * @default real
 * 
 * @param 乗り物影タイプ
 * @desc  - 乗り物の影の形。初期値 real
 * @type select
 * @option real
 * @option circle
 * @option none
 * @default real
 * 
 * @param アクター影タイプ
 * @desc  - アクターの影の形。本体準拠の形をした real と、シンプルな円形の circle、影を表示しない none の三種類 初期値 real
 * @type select
 * @option real
 * @option circle
 * @option none
 * @default real
 * 
 * @param エネミー影タイプ
 * @desc  - アクターの影の形。本体準拠の形をした real と、シンプルな円形の circle、影を表示しない none の三種類 初期値 real
 * @type select
 * @option real
 * @option circle
 * @option none
 * @default real
 * 
 * @param マップ/影の位置(リアル)
 * @desc リアル形時の影の位置。1番目の数値がX軸で、2番目がY軸
 。数値が高いほど右下にいく - 初期値 [20, -25]
 * @default [20, -25]
 * 
 * @param マップ/影の位置(円形)
 * @desc 円形時の影の位置。1番目の数値がX軸で、2番目がY軸
 。数値が高いほど右下にいく - 初期値 [0, -5]
 * @default [0, -5]
 * 
 * @param マップ/影サイズ(リアル)
 * @desc リアル形時の影の大きさ。1番目の数値がX軸で、2番目がY軸 - 初期値 [110, 50]
 * @default [110, 50]
 * 
 * @param マップ/影サイズ(円形)
 * @desc 円形時の影の大きさ。1番目の数値がX軸で、2番目がY軸 - 初期値 [85, 30]
 * @default [85, 30]
 * 
 * @param マップ/影の角度
 * @desc 影の傾き角。数値を増やすほど右回りに回転していく - 初期値 0
 * @default 0
 * 
 * @param バトル/影の位置(リアル)
 * @desc リアル形時の影の位置。1番目の数値がX軸で、2番目がY軸
 。数値が高いほど右下にいく - 初期値 [20, -25]
 * @default [20, -25]
 * 
 * @param バトル/影の位置(円形)
 * @desc 円形時の影の位置。1番目の数値がX軸で、2番目がY軸
 。数値が高いほど右下にいく - 初期値 [0, -5]
 * @default [0, -5]
 * 
 * @param バトル/影サイズ(リアル)
 * @desc リアル形時の影の大きさ。1番目の数値がX軸で、2番目がY軸 - 初期値 [110, 50]
 * @default [110, 50]
 * 
 * @param バトル/影サイズ(円形)
 * @desc 円形時の影の大きさ。1番目の数値がX軸で、2番目がY軸 - 初期値 [85, 30]
 * @default [85, 30]
 * 
 * @param バトル/影の角度
 * @desc 影の傾き角。数値を増やすほど右回りに回転していく - 初期値 0
 * @default 0
 * 
 * @param 影の不透明度
 * @desc 影の濃さ。高いほど濃い - 初期値 128
 * @default 128
 * 
 * @param 影のぼかし度(リアル)
 * @desc リアル形時の影のぼかしの強さ。ブラウザプレイでは1以上にすると影が出ないので注意 - 初期値 0
 * @default 0
 * 
 * @param 影のぼかし度(円形)
 * @desc 円形時の影のぼかしの強さ。 - 初期値 15
 * @default 15
 * 
 * @param 影のジャンプ縮小度
 * @desc 影がジャンプ時どれくらい小さくなるか。数値が高いほど小さくなる - 初期値 7
 * @default 7
 * 
 * @param 影の向き反転
 * @desc 影を向きによって反転させるか - 初期値 false
 * @type boolean
 * @default false
 * 
 * @param アクター死亡時影消す
 * @desc アクターが戦闘不能になったとき影を消すか - 初期値 false
 * @type boolean
 * @default false
 * 
 * @param エネミー死亡時影消す
 * @desc エネミーが戦闘不能になったとき影を消すか - 初期値 false
 * @type boolean
 * @default false
 * 
 * 
 * 
 * @help
 * 
 *【注意】
 * このプラグインには『ベーシックパック』ver.1.5以上が必要だよ
 * まだ入れてないなら、このURLからダウンロードしてね
 * http://kekeelabo.com/?i=3
 * 
 * 
 * リアルな影を手軽に自在につけられるよ
 * マップ・バトル両対応
 * 豪華なリアル形から、シンプルな円形までなんでもござれー
 * 見た目の立体感を素敵にグレードアップするよ
 * しかも面倒な手間いらずのお手軽仕様だよ
 * 
 * おもな機能は以下の通りだよ
 * 
 * 
 * ・特に指示は出さなくても自動的に影を表示
 * 
 * ・本体が透明の場合は表示しない
 * 
 * ・本体のサイズに応じ、自動的に影の大きさが変わる
 *
 * ・また、影は本体に合わせて動く。本体が倒れれば、影も倒れる
 * 
 * ・つまり特に手間をかけずとも、リアルな影を表示して
 * ゲームの見た目をグレードアップできる
 * 
 * ・自動表示はグローバル設定に従って行われる
 * グローバル設定をカスタマイズすることで、より好みの形にしていける
 * 設定はプラグインパラメータで行う
 * 
 * ・カテゴリーごとに、影を表示するかしないか選べる
 * カテゴリーはプレイヤー、キャラ、オブジェクト、乗り物、
 * アクター、エネミーの6種類
 * 
 * ・カテゴリーごとに影の形を選べる
 * ・本体と同じ形の『リアル形』と、『円形』の2種類
 * 
 * ・影の位置・サイズ・角度・不透明度・ぼかし度を自由に調整できる
 * 
 * ・本体がジャンプすると、高く飛ぶほどに影が小さくなる
 * 小さくなる度合いは好きに調整できる
 * 
 * ・基本的に影の位置は固定だが、向きによって反転させるようにもできる
 * 左を向いてる時は右に、右を向いてる時は左に表示させ、
 * 常に影が本体の後ろにある感じにするなど
 * 
 * ・プラグインコマンドで、マップ上の全ての影を消したり出したりできる
 * ここは影があると不自然だなという場面に
 * 
 * ・プラグインコマンドで、マップ上の影を全て反転させることができる
 * 太陽の位置が変わり、影の向きも変わったというような表現に
 * 
 * ・基本的には自動で一括表示するのを想定しているが、
 * 各対象ごとに細かく影の設定をすることも可能
 * 設定のしかたは以下
 * 
 * 
 * 
 * ▼ メモ欄での影設定 ▼
 * 
 * 影設定したい対象が
 * イベントの場合 → イベントのメモ欄に
 * アクターの場合 → アクターのメモ欄に
 * エネミーの場合 → エネミーのメモ欄に
 * マップキャラ全ての場合は → マップのメモ欄に
 * これをコピペし、パラメータをいじる
 * <kage:real|0:0|*0:0|&0>
 * 
 各パラメータの意味は後述
 * 
 * まだ、設定したい対象がアクターのホコグラの場合は
 * <kageH:real|0:0|*0:0|&0>
 * 
 * kageH の H はホコグラの略
 * 
 * ◉パラメータの説明
 * 
 * type|px:py|*sx:sy|&angle
 *
 * 【type - 影の形】
 * real にすると本体準拠のリアル形に、circle だと円形になる
 * 0か空欄にするとグローバル設定に合わせる
 * noneにすると影を消去する
 * 
 * 【px:py - 影のx位置:y位置】
 * この数値分だけ影の位置がズレる。単位は本体サイズに対する百分率
 * px100なら右方向に本体横幅分ズレる
 * 0か空欄にするとグローバル設定に合わせる
 * 
 * 【sx:sy - 影のxサイズ:yサイズ】
 * この数値分だけ影が伸び縮みする。単位は本体サイズに対する百分率
 * sx200なら横方向に2倍に伸びる
 * 0か空欄にするとグローバル設定に合わせる
 * 
 * 【angle - 影の角度】
 * 単位は360度式角度。90なら右に90度回転する
 * 
 * 
 * 
 * ▼ プラグインコマンドでの影設定 ▼
 * 
 * これをプラグインコマンドにコピペし、パラメータをいじる
 * kage self real|0:0|*0:0|&0
 * 
 * パラメータの意味はメモ欄のときと同じ
 * self の部分で対象を指定する。指定のしかたは以下
 * 
 * ◉対象指定のしかた
 * 
 * 指定のしかたは2通りある
 * 
 * 【イベントIDでの指定】
 * 数字を入れると、そのIDのイベントが対象になる
 * -1 を入れるとプレイヤーが対象になり、
 * 0 を入れるとコマンドを実行しているイベント自身が対象になる
 * 
 * 【名前での指定】
 * 数字以外の文字を入れると、名前にその文字が含まれるイベント全てが対象になる
 * play を入れるとプレイヤーが対象になり、
 * self を入れるとコマンドを実行しているイベント自身が対象になる
 * all を入れるとマップ上のイベント全てが対象になる
 * all の場合、影タイプnoneのイベントは対象外になる
 * 
 * 
 * ◉影の可視切り替え
 * 
 * マップ上の全ての影の可視状態を切り替えたいときは
 * kage visible
 * 
 * 見えている影は消え、消えている影は現れる
 * 
 * 全ての影を見える状態にしたいときは
 * kage visible 1
 * 
 * 全ての影を見えない状態にしたいときは
 * kage visible 0
 * 
 * 
 * ◉マップでの影のx総反転
 * 
 * マップ上の全ての影を横軸反転したいときは
 * kage xReverse
 * 
 * 全ての影を横軸反転状態にしたいときは
 * kage xReverse 1
 * 
 * 全ての影を横軸反転解除したいときは
 * kage xReverse 0
 * 
 * 
 * ◉マップでの影のy総反転
 * 
 * マップ上の全ての影を縦軸反転したいときは
 * kage yReverse
 * 
 * 全ての影を縦軸反転状態にしたいときは
 * kage yReverse 1
 * 
 * 全ての影を縦軸反転解除したいときは
 * kage yReverse 0
 * 
 * 
 * 
 * ▼ 各種補足 ▼
 * 
 * ・影設定パラメータは0か空欄にすると、グローバル設定が適用される
 * 
 * ・影設定パラメータの各項目は省略できる
 * たとえば none だけでもよい。それだけで影が表示されなくなる
 * 
 * ・サイドビューの場合、エネミーの影の位置は自動的に反転する仕様
 * 
 * ・アクターや飛行機など、デフォルトの影が存在するモノは、
 * 影タイプを none にするとデフォルトの影が表示される
 * 
 * ・リアル影のぼかしはブラウザプレイでは非対応
 * ぼかし度1以上にすると影が出ないので注意
 * 
 * 
 * ※影が出ない場合はぼかし度を0にしてみてね
 * MVのバージョンが古い場合、ぼかしに対応してないことがあるので
 * 
 * 
 * 
 * ◉ 利用規約 ◉
 *  MITライセンスのもと、好きに使ってくれて大丈夫
 * ただし作者は何も責任を負わないよ
 * 著作権は『ケケー』にあるよ
 */



(function () {

    //--  定数  --//

    KEKE_KAGE_NAME = 'kage';
    KEKE_KAGE_REG = /(\w*)\|?\+?(-?\d*\.?\d*):?(-?\d*\.?\d*)\|?\*?(-?\d*\.?\d*):?(-?\d*\.?\d*)\|?&?(-?\d*)/;



    //--  パラメータ受け取り  --//

    var parameters = PluginManager.parameters('Keke_KageMaster');
    var keke_playerKageType = parameters['プレイヤー影タイプ'];
    var keke_charaKageType = parameters['キャラ影タイプ'];
    var keke_objectKageType = parameters['オブジェクト影タイプ'];
    var keke_vehicleKageType = parameters['乗り物影タイプ'];
    var keke_actorKageType = parameters['アクター影タイプ'];
    var keke_enemyKageType = parameters['エネミー影タイプ'];
    var keke_mapKagePosReal = eval(parameters['マップ/影の位置(リアル)']);
    var keke_mapKagePosCircle = eval(parameters['マップ/影の位置(円形)']);
    var keke_mapKageSizeReal = eval(parameters['マップ/影サイズ(リアル)']);
    var keke_mapKageSizeCircle = eval(parameters['マップ/影サイズ(円形)']);
    var keke_mapKageAngle = Number(parameters['マップ/影の角度']);
    var keke_battleKagePosReal = eval(parameters['バトル/影の位置(リアル)']);
    var keke_battleKagePosCircle = eval(parameters['バトル/影の位置(円形)']);
    var keke_battleKageSizeReal = eval(parameters['バトル/影サイズ(リアル)']);
    var keke_battleKageSizeCircle = eval(parameters['バトル/影サイズ(円形)']);
    var keke_battleKageAngle = Number(parameters['バトル/影の角度']);
    var keke_kageOpacity = Number(parameters['影の不透明度']);
    var keke_kageBlurReal = Number(parameters['影のぼかし度(リアル)']);
    var keke_kageBlurCircle = Number(parameters['影のぼかし度(円形)']);
    var keke_kageJumpSmall = Number(parameters['影のジャンプ縮小度']);
    var keke_kageReverseByMuki = eval(parameters['影の向き反転']);
    var keke_actorDeadNoKageM = eval(parameters['アクター死亡時影消す']);
    var keke_enemyDeadNoKageM = eval(parameters['エネミー死亡時影消す']);
    var keke_tilesetKageType = 'none';



    //--  プラグインコマンド  --//

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === KEKE_KAGE_NAME) {
            if (args[0] == 'xReverse') {
                if (args[1] == null) {
                    $gameSystem._kageXReverse *= -1;
                } else if (Number(args[1])) {
                    $gameSystem._kageXReverse = 1;
                } else {
                    $gameSystem._kageXReverse = 0;
                }
            } else if (args[0] == 'yReverse') {
                if (args[1] == null) {
                    $gameSystem._kageYReverse *= -1;
                } else if (Number(args[1])) {
                    $gameSystem._kageYReverse = 1;
                } else {
                    $gameSystem._kageYReverse = 0;
                }
            } else if (args[0] == 'visible') {
                if (args[1] == null) {
                    $gameSystem._kageVisible = Math.abs($gameSystem._kageVisible - 1);
                } else if (Number(args[1])) {
                    $gameSystem._kageVisible = 0;
                } else {
                    $gameSystem._kageVisible = 1;
                }
            } else {
                var targets = this.eventNameToId(args[0]);
                var note = args[1];
                var all = args[0] == 'all' ? true : false;
                targets.forEach(function (target) {
                    target = target == -1 ? $gamePlayer : $gameMap.event(target);
                    target._kageM.changeParam(note, true, all);
                }, this);
            }
        }
    };



    //--  共通開始  --//

    var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function () {
        _Game_CharacterBase_initMembers.call(this)
        this._bunshins = [];    // ベーシック
        this._anotherMoveX = [0];
        this._anotherMoveY = [0];
    };

    var _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function () {
        _Game_Player_initMembers.call(this);
        this._eventId = 0;    // ベーシック
    };

    var _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function (character) {
        _Sprite_Character_initialize.call(this, character);
        this._bsId = this._character._bsIdSet || 0;    // ベーシック
        this.remakeKageM();
    };

    var _Sprite_Battler_initialize = Sprite_Battler.prototype.initialize;
    Sprite_Battler.prototype.initialize = function (battler) {
        _Sprite_Battler_initialize.call(this, battler);
        this.remakeKageM();
    };



    //--  共通更新  --//

    var _SpriteCharacter_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        _SpriteCharacter_update.call(this);
        if (this._bsId == 0) {    // ベーシック
            this.getBitmapSize();
        }
        this.makeKageM();
        this.deleteKageM();
        this.updateKageM();
    };

    var _Sprite_Battler_update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function () {
        _Sprite_Battler_update.call(this);
        if (this._battler) {
            this.makeKageM();
            this.deleteKageM();
            this.updateKageM();
        }
    };



    //--  ベーシックパック  --//

    // スクリーン座標への変換
    Game_CharacterBase.prototype.convertScreenX = function (x) {
        var tw = $gameMap.tileWidth();
        var scrolledX = $gameMap.adjustX(x)
        return Math.round(scrolledX * tw + tw / 2);
    };

    Game_CharacterBase.prototype.convertScreenY = function (y) {
        var th = $gameMap.tileHeight();
        var scrolledY = $gameMap.adjustY(y)
        return Math.round(scrolledY * th + th - this.shiftY() - this.jumpHeight());
    };

    // 角度を度数に変更
    Game_Temp.prototype.angleToDegree = function (angle) {
        angle *= (180 / Math.PI);
        if (angle < 0) { angle += 360; };
        return angle;
    };

    // 角度をπに変更
    Game_Temp.prototype.angleToRadian = function (angle) {
        angle *= (Math.PI / 180);
        return angle;
    };

    //--  イベント名をイベントIDに変換する  --//
    Game_Interpreter.prototype.eventNameToId = function (name) {
        if (!name) { return []; }
        if (name == 'play' || name == '-1') {
            return [-1];
        } else if (name == 'self' || name == '0') {
            return [this._eventId];
        } else if (name.match(/^\d+$/)) {
            return [name];
        } else if (name == 'all') {
            var result = [];
            $gameMap.events().forEach(function (event) {
                if (!event) { return; }
                result.push(event._eventId);
            }, this);
            return result.length ? result : [];
        } else {
            result = [];
            var eventName = '';
            $gameMap.events().forEach(function (event) {
                if (!event) { return; }
                eventName = event._name;
                if (eventName.includes(name)) {
                    result.push(event._eventId);
                }
            }, this);
            return result.length ? result : [];
        }
    };

    // ビットマップサイズの取得(キャラクター)
    Sprite_Character.prototype.getBitmapSize = function () {
        if (!this.bitmap) { return; }
        var chara = this._character;
        if (!chara._bitmapK) { chara._bitmapK = {}; }
        var bitmapK = chara._bitmapK;
        bitmapK.width = this.bitmap.width;
        bitmapK.height = this.bitmap.height;
        if (!this._characterName.match(/^!?_/)) {
            if (this._characterName.match(/^!?\$/)) {
                bitmapK.width /= 3;
                bitmapK.height /= 4;
            } else {
                bitmapK.width /= 12;
                bitmapK.height /= 8;
            }
        }
        bitmapK.widthOri = bitmapK.width;
        bitmapK.heightOri = bitmapK.height;
        bitmapK.width *= this.scale.x;
        bitmapK.height *= this.scale.y;
    };

    // ビットマップサイズの取得(バトラー)
    var _Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
    Sprite_Actor.prototype.updateBitmap = function () {
        _Sprite_Actor_updateBitmap.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var actor = this._actor;
            if (!actor._bitmapK) { actor._bitmapK = {}; }
            var bitmapK = actor._bitmapK;
            bitmapK.width = bitmap.width;
            bitmapK.height = bitmap.height;
            if (actor._battlerName.match(/^__/)) {
                bitmapK.width /= 5;
            } else if (actor._battlerName.match(/^_/)) {

            } else {
                bitmapK.width /= 9;
                bitmapK.height /= 6;
            }
            bitmapK.widthOri = bitmapK.width;
            bitmapK.heightOri = bitmapK.height;
            bitmapK.width *= this.scale.x;
            bitmapK.height *= this.scale.y;
        }
    };

    var _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function () {
        _Sprite_Enemy_updateBitmap.call(this);
        if (this.bitmap) {
            var enemy = this._enemy;
            if (!enemy._bitmapK) { enemy._bitmapK = {}; }
            var bitmapK = enemy._bitmapK;
            bitmapK.width = this.bitmap.width;
            bitmapK.height = this.bitmap.height;
            bitmapK.widthOri = bitmapK.width;
            bitmapK.heightOri = bitmapK.height;
            bitmapK.width *= this.scale.x;
            bitmapK.height *= this.scale.y;
        }
    };

    // バラスプライトの取得
    Game_Temp.prototype.searchBaraSprite = function (subject) {
        var baras = [];
        if (subject._isCharacter) {
            var eventId = subject._eventId
            var baras = $gameTemp._baraSprites ? $gameTemp._baraSprites[eventId] || [] : [];
            baras = baras[0] || [];
        } else if (subject._isBattler) {
            var battlerId = subject._actorId ? subject._actorId : subject.index();
            var baraBank = subject._actorId ? $gameTemp._baraSpritesActor || [] : $gameTemp._baraSpritesEnemy || [];
            var baras = baraBank[battlerId] || []
        }
        return baras;
    };




    //--  マップ影パラムの取得  --//

    var _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        _Game_Map_setup.call(this, mapId);
        var kageM = new Game_KageMaster();
        var meta = $dataMap.meta[KEKE_KAGE_NAME];
        this._kageMParam = kageM.getParam(meta);
    };



    //-- 影マスタークラス  --//

    function Game_KageMaster() {
        this.initialize.apply(this, arguments);
    };

    window[Game_KageMaster.name] = Game_KageMaster;

    // 開始処理
    Game_KageMaster.prototype.initialize = function (subje) {
        if (!subje) { return; }
        this._subje = subje;
        this._isCharacter = subje._direction;
        this._isBattler = subje._status;
        this._type = 'none';
        this._posX = 0;
        this._posY = 0;
        this._sizeX = 0;
        this._sizeY = 0;
        this._angle = 0;
        this._commands = [];

        // グローバル値の読み込み
        var mapParam = $gameMap._kageMParam;
        if (mapParam) {
            this._mapType = mapParam['type'];
        }

        // 位置(リアル)
        if (mapParam && ((mapParam['posX'] || mapParam['posY']) && mapParam['type'] == 'real')) {
            this._posRealG = [mapParam['posX'] || keke_mapKagePosReal[0] / 100, mapParam['posY'] || keke_mapKagePosReal[1] / 100]
        } else {
            this._posRealG = this._isBattler ? keke_battleKagePosReal : keke_mapKagePosReal;
            this._posRealG = [this._posRealG[0] / 100, this._posRealG[1] / 100];
        }
        // 位置(円形)
        if (mapParam && ((mapParam['posX'] || mapParam['posY']) && mapParam['type'] == 'circle')) {
            this._posCircleG = [mapParam['posX'] || keke_mapKagePosCircle[0] / 100, mapParam['posY'] || keke_mapKagePosCircle[1] / 100]
        } else {
            this._posCircleG = this._isBattler ? keke_battleKagePosCircle : keke_mapKagePosCircle;
            this._posCircleG = [this._posCircleG[0] / 100, this._posCircleG[1] / 100];
        }

        // サイズ(リアル)
        if (mapParam && ((mapParam['sizeX'] || mapParam['sizeY']) && mapParam['type'] == 'real')) {
            this._sizeRealG = [mapParam['sizeX'] || keke_mapKageSizeReal[0] / 100, mapParam['sizeY'] || keke_mapKageSizeReal[1] / 100]
        } else {
            this._sizeRealG = this._isBattler ? keke_battleKageSizeReal : keke_mapKageSizeReal;
            this._sizeRealG = [this._sizeRealG[0] / 100, this._sizeRealG[1] / 100];
        }
        // サイズ(円形)
        if (mapParam && ((mapParam['sizeX'] || mapParam['sizeY']) && mapParam['type'] == 'circle')) {
            this._sizeCircleG = [mapParam['sizeX'] || keke_mapKageSizeCircle[0] / 100, mapParam['sizeY'] || keke_mapKageSizeCircle[1] / 100]
        } else {
            this._sizeCircleG = this._isBattler ? keke_battleKageSizeCircle : keke_mapKageSizeCircle;
            this._sizeCircleG = [this._sizeCircleG[0] / 100, this._sizeCircleG[1] / 100];
        }

        // 角度
        if (mapParam && mapParam['angle']) {
            this._angleG = mapParam['angle'];
        } else {
            this._angleG = $gameParty.inBattle ? keke_battleKageAngle : keke_mapKageAngle
        }
        this.refresh();
    };

    // リフレッシュ
    Game_KageMaster.prototype.refresh = function () {
        var subje = this._subje;

        // タイプ判定
        if (subje._followers || subje._memberIndex) { this._type = keke_playerKageType; } else
            if (subje._characterName && subje._characterName.match(/^!/)) { this._type = keke_objectKageType; } else
                if (subje._isObjectCharacter) { this._type = keke_tilesetKageType; } else
                    if (subje._type) { this._type = keke_vehicleKageType; } else
                        if (subje._isBattler) { this._type = subje._enemyId ? keke_enemyKageType : keke_actorKageType; } else { this._type = keke_charaKageType; }
        if (this._type != 'none' && this._mapType) { this._type = this._mapType; }
        this.setParam();

        // リーダー
        if (subje._followers) {
            if ($gameParty.leader()) {
                var meta = $gameParty.leader().actor().meta[KEKE_KAGE_NAME + 'H'];
            }
            if (meta) {
                this.changeParam(meta);
            }
        }

        // フォロワー
        if (subje._memberIndex) {
            var index = subje._memberIndex;
            if ($gameParty.members() && $gameParty.members()[index]) {
                var meta = $gameParty.members()[index].actor().meta['kageH'];
            }
            if (meta) {
                this.changeParam(meta);
            }
        }

        // イベント
        if (subje._eventId) {
            var id = subje._eventId;
            var meta = $dataMap.events[id].meta[KEKE_KAGE_NAME];
            if (meta) {
                this.changeParam(meta);
            }
        }

        // バトラー
        if (subje._isBattler) {
            var battler = subje._enemyId ? subje.enemy() : subje.actor();
            var meta = battler.meta[KEKE_KAGE_NAME];
            if (meta) {
                this.changeParam(meta);
            }
        }

        if (this._type != 'none') {
            this.arise();
        }
    };

    // 影パラムの取得
    Game_KageMaster.prototype.getParam = function (note) {
        var param = {};
        if (!note) { return {}; }
        var match = note.match(KEKE_KAGE_REG);
        if (match) {
            if (match[1]) { param['type'] = match[1]; }
            if (match[2]) { param['posX'] = Number(match[2]) / 100; }
            if (match[3]) { param['posY'] = Number(match[3]) / 100; }
            if (match[4]) { param['sizeX'] = Number(match[4]) / 100; }
            if (match[5]) { param['sizeY'] = Number(match[5]) / 100; }
            if (match[6]) { param['angle'] = Number(match[6]); }
        }
        return param;
    };

    // 影パラムのセット
    Game_KageMaster.prototype.setParam = function () {
        if (!this._posX) { this._posX = this._type == 'circle' ? this._posCircleG[0] : this._posRealG[0]; }
        if (!this._posY) { this._posY = this._type == 'circle' ? this._posCircleG[1] : this._posRealG[1]; }
        if (!this._sizeX) { this._sizeX = this._type == 'circle' ? this._sizeCircleG[0] : this._sizeRealG[0]; }
        if (!this._sizeY) { this._sizeY = this._type == 'circle' ? this._sizeCircleG[1] : this._sizeRealG[1]; }
        if (!this._angle) { this._angle = this._angleG; }

        // ぼかしなし判定
        this._solid = (this._type == 'real' && keke_kageBlurReal == 0) || (this._type == 'circle' && keke_kageBlurCircle == 0)
    };

    // 影パラムの変更
    Game_KageMaster.prototype.changeParam = function (note, force, all) {
        if (all && this._type == 'none') { return; }
        var param = this.getParam(note);
        if (param['type']) { this._type = param['type']; }
        if (param['posX'] || force) { this._posX = param['posX']; } else { this._posX = this._type == 'circle' ? this._posCircleG[0] : this._posRealG[0]; }
        if (param['posY'] || force) { this._posY = param['posY']; } else { this._posY = this._type == 'circle' ? this._posCircleG[1] : this._posRealG[1]; }
        if (param['sizeX'] || force) { this._sizeX = param['sizeX']; } else { this._sizeX = this._type == 'circle' ? this._sizeCircleG[0] : this._sizeRealG[0]; }
        if (param['sizeY'] || force) { this._sizeY = param['sizeY']; } else { this._sizeY = this._type == 'circle' ? this._sizeCircleG[1] : this._sizeRealG[1]; }
        if (param['angle'] || force) { this._angle = param['angle']; } else { this._angle = this._angleG; }

        // ぼかしなし判定
        this.setParam();

        // 影出現
        if (force && this._type != 'none') {
            this.arise();
        }
    };

    // 影の発生
    Game_KageMaster.prototype.arise = function () {
        if (this._kageType == 'none') { return; }
        var bunshins = this._subje._bunshins || [];
        if (!this._commands) { this._commands = []; }
        for (i = 0; i < bunshins.length + 1; i++) {
            this._commands[i] = 'make';
        }
    };

    // 影の消去
    Game_KageMaster.prototype.clear = function () {
        var bunshins = this._subje._bunshins || [];
        for (i = 0; i < bunshins.length + 1; i++) {
            this._commands[i] = 'del';
        }
        if (this._followers) {
            this._followers.forEach(function (follower) {
                if (!follower) { return; }
                follower._kageM.clear();
            }, this);
        }
    };

    Game_KageMaster.prototype.saveFrame = function (frame) {
        this._frameWidth = frame.width;
        this._frameHeight = frame.height;
    };



    //-- 影・キャラクター  --//

    // 影の開始(キャラクター)
    Game_CharacterBase.prototype.initKageM = function () {
        this._kageM = new Game_KageMaster(this);
    };

    // 影スプライトの作成(キャラクター)
    Sprite_Character.prototype.makeKageM = function () {
        if (!this._character._kageM) { this._character.initKageM(); }
        if (this._character._kageM._commands[this._bsId] != 'make') { return; }
        if (!SceneManager._scene._spriteset) { return; }
        if (!this._character._bitmapK || !this._character._bitmapK.width) { return; }
        var kage = this._character._kageM;
        kage._commands[this._bsId] = 'del';
        this.deleteKageM();
        var tilemap = SceneManager._scene._spriteset._tilemap;
        var sprite = new Sprite_KageMaster(this, this._character);
        this._kageMSprite = sprite;
        tilemap.addChildAt(sprite, 2);
        kage._commands[this._bsId] = 'comp';
    };

    // 影スプライトの再作成(キャラクター)
    Sprite_Character.prototype.remakeKageM = function () {
        if (this._bsId > 0) { return; }
        if (!this._character._kageM) { return; }
        var kage = this._character._kageM;
        kage._commands.forEach(function (state, i) {
            if (state == 'comp') {
                kage._commands[i] = 'make';
            }
        }, this);
    };

    // 影スプライトの消去(キャラクター)
    Sprite_Character.prototype.deleteKageM = function () {
        if (this._character._kageM._commands[this._bsId] != 'del') { return; }
        if (!this._kageMSprite) { return; }
        var tilemap = SceneManager._scene._spriteset._tilemap;
        tilemap.removeChild(this._kageMSprite);
        this._kageMSprite = null;
        this._character._kageM._commands[this._bsId] = 0;
    };

    // 影スプライトの更新(キャラクター)
    Sprite_Character.prototype.updateKageM = function () {
        if (!SceneManager._scene._spriteset) { return; }
        if (this._kageMSprite) { this._kageMSprite.update(); }
    };

    // 影スプライトの再描画(キャラクター)
    Sprite_Character.prototype.redrawKageM = function (realOnly) {
        if (!this._character._kageM) { this._character.initKageM(); }
        if (realOnly && this._character._kageM._type != 'real') { return; }
        if (!this._kageMSprite) { return; }
        var kage = this._character._kageM;
        kage.arise();
    };

    var _Sprite_Character_updateBitmap = Sprite_Character.prototype.updateBitmap;
    Sprite_Character.prototype.updateBitmap = function () {
        if (this.isImageChanged()) {
            this.redrawKageM();
        }
        _Sprite_Character_updateBitmap.call(this);
    };

    var _Sprite_Character_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
    Sprite_Character.prototype.updateCharacterFrame = function () {
        var preFrameX = this._frame.x;
        var preFrameY = this._frame.y;
        var preFrameWidth = this._frame.width;
        var preFrameHeight = this._frame.height;
        _Sprite_Character_updateCharacterFrame.call(this);
        if (this._frame.x != preFrameX) {
            this.redrawKageM(true);
        }
    };

    // 飛行機影の不透明度
    var _Game_Vehicle_shadowOpacity = Game_Vehicle.prototype.shadowOpacity;
    Game_Vehicle.prototype.shadowOpacity = function () {
        var result = _Game_Vehicle_shadowOpacity.call(this);
        if (this._kageType != 'none') { result = 0; }
        return result;
    };



    //-- 影・バトラー  --//

    // 影の開始(バトラー)
    Game_BattlerBase.prototype.initKageM = function () {
        this._kageM = new Game_KageMaster(this);
    };


    // 影スプライトの作成(バトラー)
    Sprite_Battler.prototype.makeKageM = function () {
        if (!this._battler._kageM) { this._battler.initKageM(); }
        if (this._battler._kageM._commands[0] != 'make') { return; }
        if (!SceneManager._scene._spriteset) { return; }
        if (!this._battler._bitmapK || !this._battler._bitmapK.width) { return; }
        var kage = this._battler._kageM;
        kage._commands[0] = 'del';
        this.deleteKageM();
        var battleField = SceneManager._scene._spriteset._battleField;
        var sprite = new Sprite_KageMaster(this, this._battler);
        this._kageMSprite = sprite;
        battleField.addChildAt(sprite, 2);
        kage._commands[0] = 'comp';
    };

    // 影スプライトの再作成(バトラー)
    Sprite_Battler.prototype.remakeKageM = function () {
        if (!this._battler) { return; }
        if (!this._battler._kageM) { return; }
        var kage = this._battler._kageM;
        if (kage._commands[0] == 'comp') {
            kage._commands[0] = 'make';
        }
    };

    // 影スプライトの消去(バトラー)
    Sprite_Battler.prototype.deleteKageM = function () {
        if (this._battler._kageM._commands[0] != 'del') { return; }
        if (!this._kageMSprite) { return; }
        var battleField = SceneManager._scene._spriteset._battleField;
        battleField.removeChild(this._kageMSprite);
        this._kageMSprite = null;
        this._battler._kageM._commands[0] = 0;
    };

    // 影スプライトの更新(バトラー)
    Sprite_Battler.prototype.updateKageM = function () {
        if (!SceneManager._scene._BattleFIeld) { return; }
        if (this._kageMSprite) { this._kageMSprite.update(); }
    };

    // 影スプライトの再描画(バトラー)
    Sprite_Battler.prototype.redrawKageM = function (realOnly) {
        if (!this._battler._kageM) { this._battler.initKageM(); }
        if (realOnly && this._battler._kageM._type != 'real') { return; }
        if (!this._kageMSprite) { return; }
        var kage = this._battler._kageM;
        kage.arise();
    };

    var _Sprite_Battler_updateBitmap = Sprite_Battler.prototype.updateBitmap;
    Sprite_Battler.prototype.updateBitmap = function () {
        var preBattlerName = this._battlerName;
        _Sprite_Battler_updateBitmap.call(this);
        if (this._battlerName != preBattlerName) {
            this.redrawKageM();
        }
    };

    var _Sprite_Actor_updateFrame = Sprite_Actor.prototype.updateFrame;
    Sprite_Actor.prototype.updateFrame = function () {
        var main = this._mainSprite;
        var preFrameX = main._frame.x;
        var preFrameY = main._frame.y;
        var preFrameWidth = main._frame.width;
        var preFrameHeight = main._frame.height;
        _Sprite_Actor_updateFrame.call(this);
        if (main._frame.x != preFrameX) {
            this.redrawKageM(true);
        }
    };

    // 従来のアクター影を消去(再定義)
    var _Sprite_Actor_updateShadow = Sprite_Actor.prototype.updateShadow;
    Sprite_Actor.prototype.updateShadow = function () {
        _Sprite_Actor_updateShadow.call(this);
        if (this._kageMSprite) { this._shadowSprite.visible = false; }
    };

    // 戦闘終了時に影マスタークラスを消去
    var _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        _Scene_Battle_terminate.call(this);
        $gameParty.members().forEach(function (actor) {
            actor._kageM = null;
        }, this);
    };



    //--  影マスタースプライト  --//

    function Sprite_KageMaster() {
        this.initialize.apply(this, arguments);
    };

    Sprite_KageMaster.prototype = Object.create(Sprite.prototype);
    Sprite_KageMaster.prototype.constructor = Sprite_KageMaster;

    // 影スプライトの初期化
    Sprite_KageMaster.prototype.initialize = function (oriSprite, subje) {
        Sprite.prototype.initialize.call(this);
        this._oriSprite = oriSprite;
        this._subje = subje;
        this._kage = subje._kageM;
        this._bsId = oriSprite._bsId;
        if (this._kage._isCharacter) { this._isCharacter = true; } else { this._isBattler = true; }
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.z = 1;
        this.createBitmap();
        this.update();
    };

    // 影スプライトの描画
    Sprite_KageMaster.prototype.createBitmap = function () {
        var subje = this._subje;
        var kage = this._kage;
        name = this._isCharacter ? subje._characterName : subje._battlerName;
        if (!name) { return; }

        // ▼ マップ ▼//
        // 共通　　　─影スプライトの描画
        // リアル形　　　─影スプライトの描画
        // 円形　　　─影スプライトの描画

        // 共通　　　─影スプライトの描画
        var width = Math.abs(this._subje._bitmapK.widthOri);
        var height = Math.abs(this._subje._bitmapK.heightOri);
        var aWidth = width * 3.0;
        var aHeight = height * 3.0;
        var radius = width / 2
        this.bitmap = new Bitmap(aWidth, aHeight);
        var context = this.bitmap._context;
        context.shadowColor = `rgba(0, 0, 0)`;
        var gWidth = 0;
        var realSolid = kage._type == 'real' && keke_kageBlurReal == 0;
        var circleSolid = kage._type == 'circle' && keke_kageBlurCircle == 0
        if (!kage._solid) {
            gWidth = Graphics.width * 2;
            context.shadowOffsetX = gWidth;
            context.shadowOffsetY = 0;
            context.shadowBlur = kage._type == 'real' ? keke_kageBlurReal : keke_kageBlurCircle;
        }

        // リアル形　　　─影スプライトの描画
        if (kage._type == 'real') {
            var ori = subje._actorId ? this._oriSprite._mainSprite : this._oriSprite;
            var x = (aWidth - width) / 2 - gWidth;
            var y = (aHeight - height) / 2;
            var frameWidth = ori._frame.width;
            var frameHeight = ori._frame.height;
            if (this._isCharacter && ori._bushDepth > 0) {
                frameWidth = ori.patternWidth();
                frameHeight = ori.patternHeight();
                frameHeight -= ori._bushDepth;
                height -= ori._bushDepth;
            }
            this.bitmap.bltImage(ori.bitmap, ori._frame.x, ori._frame.y, frameWidth, frameHeight, x, y, width, height);
            if (kage._solid) {
                this.setColorTone([-255, -255, -255, 0]);
            }

            // 円形　　　─影スプライトの描画
        } else if (kage._type == 'circle') {

            var color1 = 'rgba(0, 0, 0, 0.5)';
            var color2 = 'rgba(0, 0, 0, 1.0)';
            var grad = context.createLinearGradient(width / 2, 0, width / 2, height);
            grad.addColorStop(0, color1);
            grad.addColorStop(1, color2);
            context.save();
            context.strokeStyle = color1;
            context.fillStyle = grad;
            context.beginPath();

            context.arc(aWidth * 0.5 - gWidth, aHeight * 0.5, radius, 0, Math.PI * 2, false);
            context.fill();

            context.restore();
            this.bitmap._setDirty();
        }
    };

    // 影スプライトの更新
    Sprite_KageMaster.prototype.update = function () {
        var subje = this._subje;
        var kage = this._kage;
        var oriSprite = this._oriSprite;
        var bsId = this._bsId;
        var baras = $gameTemp.searchBaraSprite(subje);

        // ▼ マップ ▼//
        // 位置　　　─影スプライトの更新
        // 不透明度　　　─影スプライトの更新
        // 見えるか　　　─影スプライトの更新
        // スケール　　　─影スプライトの更新
        // 角度　　　─影スプライトの更新

        // 位置　　　─影スプライトの更新
        var xReverse = 1;
        xReverse *= keke_kageReverseByMuki && (subje._direction == 6 || subje._direction == 8) ? -1 : 1;
        xReverse *= subje._bitmapK.width < 0 ? -1 : 1;
        xReverse *= $gameParty.inBattle() && $gameSystem.isSideView() && subje._enemyId ? -1 : 1;
        xReverse *= $gameSystem._kageXReverse || 1;
        var kagePosX = kage._posX * xReverse;
        var kagePosY = kage._posY * ($gameSystem._kageYReverse || 1);
        // 位置(マップ)　　　─影スプライトの更新
        if (this._isCharacter) {
            if (bsId == 0) {
                var x = subje._realX;
                var y = subje._realY;
            } else {
                x = subje._bsX[bsId];
                y = subje._bsY[bsId];
            }
            if (bsId > 0 && subje._modeMultiEffect) {
                x -= subje._anotherMoveX[0];
                y -= subje._anotherMoveY[0];
            }
            if (subje._memberIndex > 0 && $gamePlayer._modeMultiEffect) {
                x -= $gamePlayer._anotherMoveX[0];
                y -= $gamePlayer._anotherMoveY[0];
            }
            if (baras[0]) {
                x += baras[0]._gMoverX / $gameMap.tileWidth();
                y += baras[0]._gMoverY / $gameMap.tileHeight();
            }
            if (subje.jumpHeight()) {
                y += subje.jumpHeight() / $gameMap.tileHeight();
            };
            this.x = subje.convertScreenX(x) + kagePosX * subje._bitmapK.width;
            this.y = subje.convertScreenY(y) + kagePosY * subje._bitmapK.height;
            if (!this._isCharacter) {
                this.y += subje.shiftY();
            }
            // 位置(バトル)　　　─影スプライトの更新
        } else {
            this.x = oriSprite.x + kagePosX * subje._bitmapK.width;
            this.y = oriSprite.y + kagePosY * subje._bitmapK.height;
            if (oriSprite._kekeActAir) {
                this.y -= oriSprite._kekeActAir;
            }
            // DynamicMotion対応
            if (oriSprite._airY || oriSprite._rollAdjustY) {
                this.y -= oriSprite.rollAirY() * 1.0
            }
        }

        // 不透明度　　　─影スプライトの更新
        if (baras[0]) {
            var maxOpa = 0;
            baras.forEach(function (bara) {
                if (bara && bara.opacity > maxOpa) { maxOpa = bara.opacity; }
            }, this);
            this.opacity = Math.min(maxOpa * (keke_kageOpacity / 255), keke_kageOpacity);
            // MOG_CollapseEffects 対応
        } else if (this._oriSprite._spriteCol) {
            this.opacity = Math.min(oriSprite._spriteCol[0].opacity, keke_kageOpacity);
        } else {
            var opacity = this._oriSprite._mainSprite ? this._oriSprite._mainSprite.opacity : this._oriSprite.opacity;
            this.opacity = opacity * (keke_kageOpacity / 255);
        }
        if ((subje._actorId && keke_actorDeadNoKageM && subje.isDead()) || (subje._enemyId && keke_enemyDeadNoKageM && subje.isDead())) {
            this.opacity = 0;
        }

        // 見えるか　　　─影スプライトの更新
        this.visible = (oriSprite.visible) && !$gameSystem._kageVisible;

        // スケール　　　─影スプライトの更新
        var scaleX = baras[0] ? baras[0].scale.x : oriSprite.scale.x;
        var scaleY = baras[0] ? baras[0].scale.y : oriSprite.scale.y;
        if (this._isCharacter) {
            if (subje._memberIndex) { var subje = $gamePlayer } else { subje = subje; }
            var another = subje._freeM ? subje._freeM.anotherY[0] : 0;
            var jumpY = another - subje.jumpHeight() / $gameMap.tileHeight();
            var scaleRate = jumpY < 0 ? 1 - (-jumpY / 10) : 1;
        } else {
            var jumpY = 0;
            jumpY += oriSprite._jumpHeight || 0;
            if (baras[0]) { jumpY += baras[0].gMoverY < 0 ? baras[0]._gMoverY : 0; }
            // BattlerGraphicExtend 対応
            if (subje._altitude) {
                jumpY += subje.getAltitude() * 2;
            }
            jumpY /= $gameMap.tileHeight();

            scaleRate = jumpY < 0 ? 1 - (-jumpY / 10) : 1;
        }
        this.scale.x = scaleX * scaleRate * kage._sizeX;
        this.scale.y = scaleY * scaleRate * kage._sizeY * ($gameSystem._kageYReverse || 1);

        // 角度　　　─影スプライトの更新
        this.rotation = $gameTemp.angleToRadian($gameTemp.angleToDegree(oriSprite.rotation) + kage._angle);
    }

    // 影スプライトのクリア
    Sprite_KageMaster.prototype.clear = function () {
        if (this._isCharacter) {
            var tilemap = SceneManager._scene._spriteset._tilemap;
            tilemap.removeChild(this);
        } else {
            var battleField = SceneManager._scene._spriteset._battleField;
            battleField.removeChild(this);
        }
    };

}());