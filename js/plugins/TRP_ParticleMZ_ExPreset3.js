//=============================================================================
// TRP_ParticleMZ_ExPreset3.js
//=============================================================================
/*:
 * @target MZ
 * @base TRP_ParticleMZ
 * @plugindesc パーティクルプリセットデータ
 * @help
 * fw_base <character> ＠花火~打ち上げ用
 *
 *
 * 【パーティクルグループ】
 * fw_change <character> ＠花火~色変化[橙]
 * fw_dual <character> ＠花火~２色[橙]
 * fw_kiku <character> ＠花火~菊(大)[橙]
 * fw_kikus <character> ＠花火~菊(小)[橙]
 * fw_simple <character> ＠花火~シンプル[橙]
 * fw_twin <character> ＠花火~V字噴出[橙]
 * fw_twinkle <character> ＠花火~キラキラ[橙]
 *
 * @command play_character
 * @text play/１回再生 > キャラ対象(1)
 * @desc パーティクルを１回だけ再生
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default weather
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option fw_base <character> ＠花火~打ち上げ用
 * @value fw_base
 *
 * @arg z
 * @text Z値
 * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 *
 *
 * @command group_character
 * @text group/グループ > キャラ対象(9)
 * @desc グループ呼び出し
 * @arg id
 * @text グループ管理ID
 * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。
 * @default def
 * @arg target
 * @text 対象
 * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効
 * @default this
 * @arg name
 * @text 《グループ設定名》
 * @desc 呼び出すグループの設定名
 * @type select
 * @default 《呼び出す設定を選択》
 * @option attack <character> ＠2021/4/4
 * @value attack
 * @option fireworks <character> ＠2021/4/6
 * @value fireworks
 * @option fountain <character> ＠2021/4/9
 * @value fountain
 * @option fw_kikus <character> ＠2021/7/19
 * @value fw_kikus
 * @option monster <character> ＠2021/4/6
 * @value monster
 * @option monster2 <character> ＠2021/4/6
 * @value monster2
 * @option prominence <character> ＠2021/4/12
 * @value prominence
 * @option subTest <character> ＠2021/4/9
 * @value subTest
 * @option test <character> ＠2021/7/19
 * @value test
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名。省略で「group:グループID」
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 * @command group_screen
 * @text group/グループ > スクリーン/天候/リージョン(6)
 * @desc グループ呼び出し
 * @arg id
 * @text グループ管理ID
 * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。
 * @default def
 * @arg target
 * @text 対象
 * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効
 * @default this
 * @arg name
 * @text 《グループ設定名》
 * @desc 呼び出すグループの設定名
 * @type select
 * @default 《呼び出す設定を選択》
 * @option cyber_chara_w <weather> ＠2021/4/19
 * @value cyber_chara_w
 * @option digital_01_w <weather> ＠2021/4/20
 * @value digital_01_w
 * @option firefly <region> ＠2021/4/7
 * @value firefly
 * @option matrix <weather> ＠2021/4/8
 * @value matrix
 * @option narration_fire_s <weather> ＠2021/4/19
 * @value narration_fire_s
 * @option wind <weather> ＠2021/4/9
 * @value wind
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名。省略で「group:グループID」
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 * @command group_others
 * @text group/グループ > その他(1)
 * @desc グループ呼び出し
 * @arg id
 * @text グループ管理ID
 * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。
 * @default def
 * @arg target
 * @text 対象
 * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効
 * @default this
 * @arg name
 * @text 《グループ設定名》
 * @desc 呼び出すグループの設定名
 * @type select
 * @default 《呼び出す設定を選択》
 * @option fw_twin <---> ＠---
 * @value fw_twin
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名。省略で「group:グループID」
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 * @command group_hidden
 * @text group/グループ > 非表示(/h)(1)
 * @desc グループ呼び出し
 * @arg id
 * @text グループ管理ID
 * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。
 * @default def
 * @arg target
 * @text 対象
 * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効
 * @default this
 * @arg name
 * @text 《グループ設定名》
 * @desc 呼び出すグループの設定名
 * @type select
 * @default 《呼び出す設定を選択》
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名。省略で「group:グループID」
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 *
 * @command group_character
 * @text group/グループ > キャラ対象(7)
 * @desc グループ呼び出し
 * @arg id
 * @text グループ管理ID
 * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。
 * @default def
 * @arg target
 * @text 対象
 * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効
 * @default this
 * @arg name
 * @text 《グループ設定名》
 * @desc 呼び出すグループの設定名
 * @type select
 * @default 《呼び出す設定を選択》
 * @option fw_change <character> ＠花火~色変化[橙]
 * @value fw_change
 * @option fw_dual <character> ＠花火~２色[橙]
 * @value fw_dual
 * @option fw_kiku <character> ＠花火~菊(大)[橙]
 * @value fw_kiku
 * @option fw_kikus <character> ＠花火~菊(小)[橙]
 * @value fw_kikus
 * @option fw_simple <character> ＠花火~シンプル[橙]
 * @value fw_simple
 * @option fw_twin <character> ＠花火~V字噴出[橙]
 * @value fw_twin
 * @option fw_twinkle <character> ＠花火~キラキラ[橙]
 * @value fw_twinkle
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名。省略で「group:グループID」
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 * @command group_hidden
 * @text group/グループ > 非表示(/h)(35)
 * @desc グループ呼び出し
 * @arg id
 * @text グループ管理ID
 * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。
 * @default def
 * @arg target
 * @text 対象
 * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効
 * @default this
 * @arg name
 * @text 《グループ設定名》
 * @desc 呼び出すグループの設定名
 * @type select
 * @default 《呼び出す設定を選択》
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名。省略で「group:グループID」
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @requiredAssets img/particles/flare
 * @requiredAssets img/particles/particle9
 * @requiredAssets img/particles/particle8
 * @requiredAssets img/particles/flame1g
 */
//PRAGMA_END: exPreset3Header



var $dataTrpParticleGroupsPreset = $dataTrpParticleGroupsPreset || {};

(() => {
    $dataTrpParticlePreset["fw_base"] = [4, [[0, 1, 0.7, 1, 1, 0]], [[0, 0.15, 1, 0.1], 1], [[0, 1000, 0.5, 200, 0.8, 100, 1, 0], 1], [[0, "#f8cda8", 1, "#9f9f9f"]], 0, [0, 0], null, [-90, -90], [0, 0], 10, 0, 0, [1.3, 1.3], 1, 0.01, 1, 5, 0.011, 10000, [0, 0], 4, [0, 312], [0, 0, 0.015, 1, 0, 0, 0], 0, 0, "particle7", 0,
        "花火~打ち上げ用[橙]"];
    // $dataTrpParticlePreset["fw_base_yellow"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#fffa76",1,"#fffdcd"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
    //     "花火~打ち上げ用[黄]"];
    // $dataTrpParticlePreset["fw_base_green"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#a1ff76",1,"#daface"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
    //     "花火~打ち上げ用[緑]"];
    // $dataTrpParticlePreset["fw_base_blue"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#276aff",1,"#c2eaff"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
    //     "花火~打ち上げ用[青]"];
    // $dataTrpParticlePreset["fw_base_purple"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#b169ff",1,"#e7cdff"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
    //     "花火~打ち上げ用[紫]"];
    // $dataTrpParticlePreset["fw_base_red"] = [4,[[0,0.8,0.7,0.8,1,0]],[[0,0.15,1,0.15],0.5],[[0,1000,0.5,200,0.8,100,1,0],1],[[0,"#ff4444",1,"#ffc2c2"]],0,[0,0],null,[-90,-90],[0,0],0,0,0,[1.3,1.3],1,0.01,1,5,0.011,10000,[0,0],4,[0,312],[0,0,0.015,1,0,0,0],0,0,"particle9",0,
    //     "花火~打ち上げ用[赤]"];


    //fw_twinkle
    $dataTrpParticlePreset["_auto:0:fw_twinkle/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#c29474", 1, "#e4c7ad"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_twinkle_yellow/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#f7fd85", 1, "#fffdc2"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""];
    $dataTrpParticlePreset["_auto:0:fw_twinkle_green/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#a2ddaa", 1, "#e2f8d4"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_twinkle_blue/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#8eaefd", 1, "#b1bffd"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_twinkle_purple/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#ab9dfa", 1, "#ecddfa"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_twinkle_red/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#dda2b4", 1, "#f8d4d4"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twinkle/h"] = [4, [[0, 0, 0.1, 1, 0.2, 0, 0.3, 1, 0.4, 0, 0.5, 1, 0.6, 0, 0.7, 1, 1, 0]], [[0, 0.1, 0.7, 0.1, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#f8cf66", 1, "#ffffff"]], 0, [0, 20], null, [0, 360], [0, 0], 0, 0, 0, [1, 2], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""];
    $dataTrpParticlePreset["_sub:0:fw_twinkle_yellow/h"] = [4, [[0, 0, 0.1, 1, 0.2, 0, 0.3, 1, 0.4, 0, 0.5, 1, 0.6, 0, 0.7, 1, 1, 0]], [[0, 0.1, 0.7, 0.1, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#ecf866", 1, "#ffffff"]], 0, [0, 20], null, [0, 360], [0, 0], 0, 0, 0, [1, 2], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""];
    $dataTrpParticlePreset["_sub:0:fw_twinkle_green/h"] = [4, [[0, 0, 0.1, 1, 0.2, 0, 0.3, 1, 0.4, 0, 0.5, 1, 0.6, 0, 0.7, 1, 1, 0]], [[0, 0.1, 0.7, 0.1, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#66f879", 1, "#ffffff"]], 0, [0, 20], null, [0, 360], [0, 0], 0, 0, 0, [1, 2], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twinkle_blue/h"] = [4, [[0, 0, 0.1, 1, 0.2, 0, 0.3, 1, 0.4, 0, 0.5, 1, 0.6, 0, 0.7, 1, 1, 0]], [[0, 0.1, 0.7, 0.1, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#6692f8", 1, "#ffffff"]], 0, [0, 20], null, [0, 360], [0, 0], 0, 0, 0, [1, 2], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twinkle_purple/h"] = [4, [[0, 0, 0.1, 1, 0.2, 0, 0.3, 1, 0.4, 0, 0.5, 1, 0.6, 0, 0.7, 1, 1, 0]], [[0, 0.1, 0.7, 0.1, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#8866f8", 1, "#ffffff"]], 0, [0, 20], null, [0, 360], [0, 0], 0, 0, 0, [1, 2], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twinkle_red/h"] = [4, [[0, 0, 0.1, 1, 0.2, 0, 0.3, 1, 0.4, 0, 0.5, 1, 0.6, 0, 0.7, 1, 1, 0]], [[0, 0.1, 0.7, 0.1, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#f47878", 1, "#ffffff"]], 0, [0, 20], null, [0, 360], [0, 0], 0, 0, 0, [1, 2], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticleGroupsPreset["fw_twinkle"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.9 -1 3 0 0"], "targetType": 0,
        "comment": "花火~キラキラ[橙]"
    };
    $dataTrpParticleGroupsPreset["fw_twinkle_yellow/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.9 -1 3 0 0"], "targetType": 0,
        "comment": "花火~キラキラ[黄]"
    };
    $dataTrpParticleGroupsPreset["fw_twinkle_green/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.9 -1 3 0 0"], "targetType": 0,
        "comment": "花火~キラキラ[緑]"
    };
    $dataTrpParticleGroupsPreset["fw_twinkle_blue/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.9 -1 3 0 0"], "targetType": 0,
        "comment": "花火~キラキラ[青]"
    };
    $dataTrpParticleGroupsPreset["fw_twinkle_purple/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.9 -1 3 0 0"], "targetType": 0,
        "comment": "花火~キラキラ[紫]"
    };
    $dataTrpParticleGroupsPreset["fw_twinkle_red/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.9 -1 3 0 0"], "targetType": 0,
        "comment": "花火~キラキラ[赤]"
    };


    //fw_kiku
    $dataTrpParticlePreset["_auto:0:fw_kiku/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2, 0.15, 1.5, 0.5, 0.2, 1, 0], 1], [[0, 1500, 0.1, 100, 1, 10], 0.8], [[0, "#ffffff", 1, "#ff8e3e"]], 1, [0, 2], null, [-240, 60], [50, -50], 0, 0, 0, [1, 2.5], 1, 0.001, 1, 1, 0.04, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kiku_yellow/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2, 0.15, 1.5, 0.5, 0.2, 1, 0], 1], [[0, 1500, 0.1, 100, 1, 10], 0.8], [[0, "#ffffff", 1, "#ffcf3e"]], 1, [0, 2], null, [-240, 60], [50, -50], 0, 0, 0, [1, 2.5], 1, 0.001, 1, 1, 0.04, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kiku_green/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2, 0.15, 1.5, 0.5, 0.2, 1, 0], 1], [[0, 1500, 0.1, 100, 1, 10], 0.8], [[0, "#ffffff", 1, "#77ad4a"]], 1, [0, 2], null, [-240, 60], [50, -50], 0, 0, 0, [1, 2.5], 1, 0.001, 1, 1, 0.04, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kiku_blue/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2, 0.15, 1.5, 0.5, 0.2, 1, 0], 1], [[0, 1500, 0.1, 100, 1, 10], 0.8], [[0, "#ffffff", 1, "#4a68ad"]], 1, [0, 2], null, [-240, 60], [50, -50], 0, 0, 0, [1, 2.5], 1, 0.001, 1, 1, 0.04, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kiku_purple/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2, 0.15, 1.5, 0.5, 0.2, 1, 0], 1], [[0, 1500, 0.1, 100, 1, 10], 0.8], [[0, "#ffffff", 1, "#7a4aad"]], 1, [0, 2], null, [-240, 60], [50, -50], 0, 0, 0, [1, 2.5], 1, 0.001, 1, 1, 0.04, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kiku_red/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2, 0.15, 1.5, 0.5, 0.2, 1, 0], 1], [[0, 1500, 0.1, 100, 1, 10], 0.8], [[0, "#ffffff", 1, "#ed5942"]], 1, [0, 2], null, [-240, 60], [50, -50], 0, 0, 0, [1, 2.5], 1, 0.001, 1, 1, 0.04, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kiku/h"] = [4, [[0, 1, 1, 0]], [[0, 0.3, 0.5, 0.2, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#f6857f", 1, "#ffffff"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [2.5, 3], 1, 0.06, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kiku_yellow/h"] = [4, [[0, 1, 1, 0]], [[0, 0.3, 0.5, 0.2, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#f6e27f", 1, "#ffffff"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [2.5, 3], 1, 0.06, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kiku_green/h"] = [4, [[0, 1, 1, 0]], [[0, 0.3, 0.5, 0.2, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#99ca87", 1, "#ffffff"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [2.5, 3], 1, 0.06, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kiku_blue/h"] = [4, [[0, 1, 1, 0]], [[0, 0.3, 0.5, 0.2, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#5081b8", 1, "#ffffff"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [2.5, 3], 1, 0.06, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kiku_purple/h"] = [4, [[0, 1, 1, 0]], [[0, 0.3, 0.5, 0.2, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#7e5bb2", 1, "#ffffff"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [2.5, 3], 1, 0.06, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kiku_red/h"] = [4, [[0, 1, 1, 0]], [[0, 0.3, 0.5, 0.2, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#b25b78", 1, "#ffffff"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [2.5, 3], 1, 0.06, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticleGroupsPreset["fw_kiku"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"], "targetType": 0,
        "comment": "花火~菊(大)[橙]"
    };
    $dataTrpParticleGroupsPreset["fw_kiku_yellow/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"], "targetType": 0,
        "comment": "花火~菊(大)[黄]"
    };
    $dataTrpParticleGroupsPreset["fw_kiku_green/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"], "targetType": 0,
        "comment": "花火~菊(大)[緑]"
    };
    $dataTrpParticleGroupsPreset["fw_kiku_blue/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"], "targetType": 0,
        "comment": "花火~菊(大)[青]"
    };
    $dataTrpParticleGroupsPreset["fw_kiku_purple/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"], "targetType": 0,
        "comment": "花火~菊(大)[紫]"
    };
    $dataTrpParticleGroupsPreset["fw_kiku_red/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.06 0.5 0.05 1 0"], "targetType": 0,
        "comment": "花火~菊(大)[赤]"
    };


    //fw_dual
    $dataTrpParticlePreset["_auto:0:fw_dual/h"] = [4, [[0, 1, 0.11, 1, 0.7, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.3, 1, 0], 1], [[0, 1300, 0.15, 30, 1, 1], 0.5], [[0, "#ddb585", 1, "#ffaf3e"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.05, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 0], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_dual_yellow/h"] = [4, [[0, 1, 0.11, 1, 0.7, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.3, 1, 0], 1], [[0, 1300, 0.15, 30, 1, 1], 0.5], [[0, "#dddd85", 1, "#ffcf3e"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.05, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 0], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_dual_green/h"] = [4, [[0, 1, 0.11, 1, 0.7, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.3, 1, 0], 1], [[0, 1300, 0.15, 30, 1, 1], 0.5], [[0, "#5fa963", 1, "#54bf67"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.05, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 0], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_dual_blue/h"] = [4, [[0, 1, 0.11, 1, 0.7, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.3, 1, 0], 1], [[0, 1300, 0.15, 30, 1, 1], 0.5], [[0, "#5c7bc6", 1, "#243ff6"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.05, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 0], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_dual_purple/h"] = [4, [[0, 1, 0.11, 1, 0.7, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.3, 1, 0], 1], [[0, 1300, 0.15, 30, 1, 1], 0.5], [[0, "#6a5adf", 1, "#4e24f6"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.05, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 0], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_dual_red/h"] = [4, [[0, 1, 0.11, 1, 0.7, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.3, 1, 0], 1], [[0, 1300, 0.15, 30, 1, 1], 0.5], [[0, "#eb8c8c", 1, "#f66060"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.05, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 0], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:1:fw_dual/h"] = [4, [[0, 1, 0.11, 1, 0.5, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.25, 1, 0], 1], [[0, 700, 0.13, 20, 1, 10], 0.2], [[0, "#94b976", 1, "#70c847"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.035, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 20], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:1:fw_dual_yellow/h"] = [4, [[0, 1, 0.11, 1, 0.5, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.25, 1, 0], 1], [[0, 700, 0.13, 20, 1, 10], 0.2], [[0, "#76b9a4", 1, "#4785c8"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.035, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 20], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:1:fw_dual_green/h"] = [4, [[0, 1, 0.11, 1, 0.5, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.25, 1, 0], 1], [[0, 700, 0.13, 20, 1, 10], 0.2], [[0, "#7696b9", 1, "#4b47c8"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.035, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 20], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:1:fw_dual_blue/h"] = [4, [[0, 1, 0.11, 1, 0.5, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.25, 1, 0], 1], [[0, 700, 0.13, 20, 1, 10], 0.2], [[0, "#ae67cd", 1, "#9b47c8"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.035, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 20], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:1:fw_dual_purple/h"] = [4, [[0, 1, 0.11, 1, 0.5, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.25, 1, 0], 1], [[0, 700, 0.13, 20, 1, 10], 0.2], [[0, "#cd8967", 1, "#c88e47"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.035, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 20], 0, 0, "particle9", 0, ""]
    $dataTrpParticlePreset["_auto:1:fw_dual_red/h"] = [4, [[0, 1, 0.11, 1, 0.5, 1, 1, 0]], [[0, 1.2, 0.15, 0.6, 0.7, 0.25, 1, 0], 1], [[0, 700, 0.13, 20, 1, 10], 0.2], [[0, "#cdb967", 1, "#c8b347"]], 1, [0, 0], null, [0, 0], [50, -50], 0, 0, 0, [2, 2], 1, 0.001, 1, 2, 0.035, 10000, [0, 0], 3, [0, -300], [0, 0, 0, 20], 0, 0, "particle9", 0, ""]
    $dataTrpParticleGroupsPreset["fw_dual"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "play _auto:1 target def back"], "targetType": 0,
        "comment": "花火~２色[橙]"
    };
    $dataTrpParticleGroupsPreset["fw_dual_yellow/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "play _auto:1 target def back"], "targetType": 0,
        "comment": "花火~２色[黄]"
    };
    $dataTrpParticleGroupsPreset["fw_dual_green/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "play _auto:1 target def back"], "targetType": 0,
        "comment": "花火~２色[緑]"
    };
    $dataTrpParticleGroupsPreset["fw_dual_blue/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "play _auto:1 target def back"], "targetType": 0,
        "comment": "花火~２色[青]"
    };
    $dataTrpParticleGroupsPreset["fw_dual_purple/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "play _auto:1 target def back"], "targetType": 0,
        "comment": "花火~２色[紫]"
    };
    $dataTrpParticleGroupsPreset["fw_dual_red/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "play _auto:1 target def back"], "targetType": 0,
        "comment": "花火~２色[赤]"
    };


    //fw_simple
    $dataTrpParticlePreset["_auto:0:fw_simple/h"] = [4, [[0, 0, 0.11, 1, 0.4, 1, 1, 0]], [[0, 0.15, 0.15, 0.15, 0.8, 0.08, 1, 0], 0.8], [[0, 1500, 0.12, 200, 0.2, 50, 1, 1], 0.1], [[0, "#fbbb9b", 1, "#f4a84a"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1.4, 1.6], 1, 0.001, 1, 10, 0.011, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_simple_yellow/h"] = [4, [[0, 0, 0.11, 1, 0.4, 1, 1, 0]], [[0, 0.15, 0.15, 0.15, 0.8, 0.08, 1, 0], 0.8], [[0, 1500, 0.12, 200, 0.2, 50, 1, 1], 0.1], [[0, "#fbe09b", 1, "#f4ca4a"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1.4, 1.6], 1, 0.001, 1, 10, 0.011, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_simple_green/h"] = [4, [[0, 0, 0.11, 1, 0.4, 1, 1, 0]], [[0, 0.15, 0.15, 0.15, 0.8, 0.08, 1, 0], 0.8], [[0, 1500, 0.12, 200, 0.2, 50, 1, 1], 0.1], [[0, "#6dad78", 1, "#41cb5f"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1.4, 1.6], 1, 0.001, 1, 10, 0.011, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_simple_blue/h"] = [4, [[0, 0, 0.11, 1, 0.4, 1, 1, 0]], [[0, 0.15, 0.15, 0.15, 0.8, 0.08, 1, 0], 0.8], [[0, 1500, 0.12, 200, 0.2, 50, 1, 1], 0.1], [[0, "#3d7df3", 1, "#5e84eb"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1.4, 1.6], 1, 0.001, 1, 10, 0.011, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_simple_purple/h"] = [4, [[0, 0, 0.11, 1, 0.4, 1, 1, 0]], [[0, 0.15, 0.15, 0.15, 0.8, 0.08, 1, 0], 0.8], [[0, 1500, 0.12, 200, 0.2, 50, 1, 1], 0.1], [[0, "#996bfa", 1, "#8764fa"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1.4, 1.6], 1, 0.001, 1, 10, 0.011, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_simple_red/h"] = [4, [[0, 0, 0.11, 1, 0.4, 1, 1, 0]], [[0, 0.15, 0.15, 0.15, 0.8, 0.08, 1, 0], 0.8], [[0, 1500, 0.12, 200, 0.2, 50, 1, 1], 0.1], [[0, "#ed9494", 1, "#fa6464"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1.4, 1.6], 1, 0.001, 1, 10, 0.011, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticleGroupsPreset["fw_simple"] = {
        "repeat": -1, "list": ["play _auto:0 target def back"], "targetType": 0,
        "comment": "花火~シンプル[橙]"
    };
    $dataTrpParticleGroupsPreset["fw_simple_yellow/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back"], "targetType": 0,
        "comment": "花火~シンプル[黄]"
    };
    $dataTrpParticleGroupsPreset["fw_simple_green/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back"], "targetType": 0,
        "comment": "花火~シンプル[緑]"
    };
    $dataTrpParticleGroupsPreset["fw_simple_blue/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back"], "targetType": 0,
        "comment": "花火~シンプル[青]"
    };
    $dataTrpParticleGroupsPreset["fw_simple_purple/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back"], "targetType": 0,
        "comment": "花火~シンプル[紫]"
    };
    $dataTrpParticleGroupsPreset["fw_simple_red/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back"], "targetType": 0,
        "comment": "花火~シンプル[赤]"
    };


    //fw_change
    $dataTrpParticlePreset["_auto:0:fw_change/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#fa9b46", 1, "#f1de90"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_change_yellow/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#fad646", 1, "#f1e690"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_change_green/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#5da632", 1, "#c7f190"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_change_blue/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#3acdfa", 1, "#3062ed"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_change_purple/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#903afa", 1, "#3059ed"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_change_red/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#fda5a5", 1, "#fa4e2a"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, -300], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_change/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0, 0.11, 0.15, 0.2, 0.12, 0.8, 0.05, 1, 0], 1], [[0, 10, 1, 0], 0.1], [[0, "#97d6c7", 1, "#398fa9"]], 1, [0, 2], null, [0, 0], [50, -50], 0, 0, 0, [1.5, 1.5], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_change_yellow/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0, 0.11, 0.15, 0.2, 0.12, 0.8, 0.05, 1, 0], 1], [[0, 10, 1, 0], 0.1], [[0, "#9798d6", 1, "#2b4ee6"]], 1, [0, 2], null, [0, 0], [50, -50], 0, 0, 0, [1.5, 1.5], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_change_green/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0, 0.11, 0.15, 0.2, 0.12, 0.8, 0.05, 1, 0], 1], [[0, 10, 1, 0], 0.1], [[0, "#b397d6", 1, "#662be6"]], 1, [0, 2], null, [0, 0], [50, -50], 0, 0, 0, [1.5, 1.5], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_change_blue/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0, 0.11, 0.15, 0.2, 0.12, 0.8, 0.05, 1, 0], 1], [[0, 10, 1, 0], 0.1], [[0, "#edb3b3", 1, "#d1236c"]], 1, [0, 2], null, [0, 0], [50, -50], 0, 0, 0, [1.5, 1.5], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_change_purple/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0, 0.11, 0.15, 0.2, 0.12, 0.8, 0.05, 1, 0], 1], [[0, 10, 1, 0], 0.1], [[0, "#edceb3", 1, "#d17a23"]], 1, [0, 2], null, [0, 0], [50, -50], 0, 0, 0, [1.5, 1.5], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_change_red/h"] = [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0, 0.11, 0.15, 0.2, 0.12, 0.8, 0.05, 1, 0], 1], [[0, 10, 1, 0], 0.1], [[0, "#e0edb3", 1, "#69d123"]], 1, [0, 2], null, [0, 0], [50, -50], 0, 0, 0, [1.5, 1.5], 1, 0.1, 1, 1, 0.11, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""]
    $dataTrpParticleGroupsPreset["fw_change"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"], "targetType": 0,
        "comment": "花火~色変化[橙]"
    };
    $dataTrpParticleGroupsPreset["fw_change_yellow/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"], "targetType": 0,
        "comment": "花火~色変化[黄]"
    };
    $dataTrpParticleGroupsPreset["fw_change_green/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"], "targetType": 0,
        "comment": "花火~色変化[緑]"
    };
    $dataTrpParticleGroupsPreset["fw_change_blue/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"], "targetType": 0,
        "comment": "花火~色変化[青]"
    };
    $dataTrpParticleGroupsPreset["fw_change_purple/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"], "targetType": 0,
        "comment": "花火~色変化[紫]"
    };
    $dataTrpParticleGroupsPreset["fw_change_red/h"] = {
        "repeat": -1, "list": ["play _auto:0 target def back", "sub set _auto:0 _sub:0 0.8 -1 1 1 0 def back"], "targetType": 0,
        "comment": "花火~色変化[赤]"
    };

    //fw_kikus
    $dataTrpParticlePreset["_auto:0:fw_kikus/h"] = [4, [[0, 1, 0.6, 1, 1, 0]], [[0, 1.5, 0.11, 1.2, 0.6, 0.3, 1, 0], 1], [[0, 700, 0.11, 150, 0.6, 40, 1, 0], 0.85], [[0, "#ffffff", 1, "#ff683e"]], 1, [0, 5], null, [-225, 45], [50, -50], 10, 0, 0, [0.9, 1.3], 1, 0.001, 1, 1, 0.012, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kikus_yellow/h"] = [4, [[0, 1, 0.6, 1, 1, 0]], [[0, 1.5, 0.11, 1.2, 0.6, 0.3, 1, 0], 1], [[0, 700, 0.11, 150, 0.6, 40, 1, 0], 0.85], [[0, "#ffffff", 1, "#ffcf3e"]], 1, [0, 5], null, [-225, 45], [50, -50], 10, 0, 0, [0.9, 1.3], 1, 0.001, 1, 1, 0.012, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kikus_green/h"] = [4, [[0, 1, 0.6, 1, 1, 0]], [[0, 1.5, 0.11, 1.2, 0.6, 0.3, 1, 0], 1], [[0, 700, 0.11, 150, 0.6, 40, 1, 0], 0.85], [[0, "#ffffff", 1, "#92cb91"]], 1, [0, 5], null, [-225, 45], [50, -50], 10, 0, 0, [0.9, 1.3], 1, 0.001, 1, 1, 0.012, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kikus_blue/h"] = [4, [[0, 1, 0.6, 1, 1, 0]], [[0, 1.5, 0.11, 1.2, 0.6, 0.3, 1, 0], 1], [[0, 700, 0.11, 150, 0.6, 40, 1, 0], 0.85], [[0, "#bccff4", 1, "#5580d4"]], 1, [0, 5], null, [-225, 45], [50, -50], 10, 0, 0, [0.9, 1.3], 1, 0.001, 1, 1, 0.012, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kikus_purple/h"] = [4, [[0, 1, 0.6, 1, 1, 0]], [[0, 1.5, 0.11, 1.2, 0.6, 0.3, 1, 0], 1], [[0, 700, 0.11, 150, 0.6, 40, 1, 0], 0.85], [[0, "#ccbcf4", 1, "#6855d4"]], 1, [0, 5], null, [-225, 45], [50, -50], 10, 0, 0, [0.9, 1.3], 1, 0.001, 1, 1, 0.012, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_kikus_red/h"] = [4, [[0, 1, 0.6, 1, 1, 0]], [[0, 1.5, 0.11, 1.2, 0.6, 0.3, 1, 0], 1], [[0, 700, 0.11, 150, 0.6, 40, 1, 0], 0.85], [[0, "#f4d1bc", 1, "#d4559b"]], 1, [0, 5], null, [-225, 45], [50, -50], 10, 0, 0, [0.9, 1.3], 1, 0.001, 1, 1, 0.012, 10000, [0, 0], 0, [0, -300], null, 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kikus/h"] = [4, [[0, 1, 1, 0]], [[0, 0.25, 0.5, 0.25, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#f6857f", 1, "#ffffff"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [1.9, 2.3], 1, 0.04, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kikus_yellow/h"] = [4, [[0, 1, 1, 0]], [[0, 0.25, 0.5, 0.25, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#b1a15d", 1, "#ddc96b"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [1.9, 2.3], 1, 0.04, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kikus_green/h"] = [4, [[0, 1, 1, 0]], [[0, 0.25, 0.5, 0.25, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#88cf8b", 1, "#5cbf76"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [1.9, 2.3], 1, 0.04, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kikus_blue/h"] = [4, [[0, 1, 1, 0]], [[0, 0.25, 0.5, 0.25, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#2848bf", 1, "#8589d8"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [1.9, 2.3], 1, 0.04, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kikus_purple/h"] = [4, [[0, 1, 1, 0]], [[0, 0.25, 0.5, 0.25, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#6e4ddd", 1, "#9885d8"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [1.9, 2.3], 1, 0.04, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_kikus_red/h"] = [4, [[0, 1, 1, 0]], [[0, 0.25, 0.5, 0.25, 1, 0], 1], [[0, 0, 1, 0], 1], [[0, "#ea7d7d", 1, "#dfa5c7"]], 0, [0, 0], null, [0, 0], [0, 0], 10, 0, 0, [1.9, 2.3], 1, 0.04, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticleGroupsPreset["fw_kikus"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0.05 0.65 0 1 0"], "targetType": 0,
        "comment": "花火~菊(小)[橙]"
    };
    $dataTrpParticleGroupsPreset["fw_kikus_yellow/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0.05 0.65 0 1 0"], "targetType": 0,
        "comment": "花火~菊(小)[黄]"
    };
    $dataTrpParticleGroupsPreset["fw_kikus_green/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0.05 0.65 0 1 0"], "targetType": 0,
        "comment": "花火~菊(小)[緑]"
    };
    $dataTrpParticleGroupsPreset["fw_kikus_blue/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0.05 0.65 0 1 0"], "targetType": 0,
        "comment": "花火~菊(小)[青]"
    };
    $dataTrpParticleGroupsPreset["fw_kikus_purple/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0.05 0.65 0 1 0"], "targetType": 0,
        "comment": "花火~菊(小)[紫]"
    };
    $dataTrpParticleGroupsPreset["fw_kikus_red/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0.05 0.65 0 1 0"], "targetType": 0,
        "comment": "花火~菊(小)[赤]"
    };

    //fw_twin
    $dataTrpParticlePreset["_auto:0:fw_twin/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2.5, 0.15, 1, 0.5, 0.1, 1, 0], 1], [[0, 2000, 0.2, 450, 0.5, 100, 1, 10], 0.9], [[0, "#ff9989", 1, "#ffe2ca"]], 0, [0, 0], null, [-120, -110], [50, -50], 0, 0, 0, [1.3, 1.5], 1, 0.01, 1, 2, 0.011, 10000, [0, 0], 4, [0, 0], [20, -100, 0, 0, 0, 0, 0], 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_twin_yellow/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2.5, 0.15, 1, 0.5, 0.1, 1, 0], 1], [[0, 2000, 0.2, 450, 0.5, 100, 1, 10], 0.9], [[0, "#f8dd73", 1, "#ffe2ca"]], 0, [0, 0], null, [-120, -110], [50, -50], 0, 0, 0, [1.3, 1.5], 1, 0.01, 1, 2, 0.011, 10000, [0, 0], 4, [0, 0], [20, -100, 0, 0, 0, 0, 0], 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_twin_green/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2.5, 0.15, 1, 0.5, 0.1, 1, 0], 1], [[0, 2000, 0.2, 450, 0.5, 100, 1, 10], 0.9], [[0, "#48ef49", 1, "#ceffca"]], 0, [0, 0], null, [-120, -110], [50, -50], 0, 0, 0, [1.3, 1.5], 1, 0.01, 1, 2, 0.011, 10000, [0, 0], 4, [0, 0], [20, -100, 0, 0, 0, 0, 0], 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_twin_blue/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2.5, 0.15, 1, 0.5, 0.1, 1, 0], 1], [[0, 2000, 0.2, 450, 0.5, 100, 1, 10], 0.9], [[0, "#739bf8", 1, "#cae5ff"]], 0, [0, 0], null, [-120, -110], [50, -50], 0, 0, 0, [1.3, 1.5], 1, 0.01, 1, 2, 0.011, 10000, [0, 0], 4, [0, 0], [20, -100, 0, 0, 0, 0, 0], 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_twin_purple/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2.5, 0.15, 1, 0.5, 0.1, 1, 0], 1], [[0, 2000, 0.2, 450, 0.5, 100, 1, 10], 0.9], [[0, "#8548ef", 1, "#ddcaff"]], 0, [0, 0], null, [-120, -110], [50, -50], 0, 0, 0, [1.3, 1.5], 1, 0.01, 1, 2, 0.011, 10000, [0, 0], 4, [0, 0], [20, -100, 0, 0, 0, 0, 0], 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_auto:0:fw_twin_red/h"] = [4, [[0, 2, 0.11, 1, 0.5, 1, 1, 0]], [[0, 2.5, 0.15, 1, 0.5, 0.1, 1, 0], 1], [[0, 2000, 0.2, 450, 0.5, 100, 1, 10], 0.9], [[0, "#f69a9a", 1, "#ffcae5"]], 0, [0, 0], null, [-120, -110], [50, -50], 0, 0, 0, [1.3, 1.5], 1, 0.01, 1, 2, 0.011, 10000, [0, 0], 4, [0, 0], [20, -100, 0, 0, 0, 0, 0], 0, 0, "particle8", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twin/h"] = [4, [[0, 1, 1, 0]], [[0, 0.2, 0.5, 0.2, 1, 0], 1], [[0, 30, 1, 0], 1], [[0, "#f6857f", 1, "#ffffff"]], 0, [0, 4], null, [0, 0], [0, 0], 10, 0, 0, [0.8, 1], 1, 0.005, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twin_yellow/h"] = [4, [[0, 1, 1, 0]], [[0, 0.2, 0.5, 0.2, 1, 0], 1], [[0, 30, 1, 0], 1], [[0, "#edb350", 1, "#f3d4a0"]], 0, [0, 4], null, [0, 0], [0, 0], 10, 0, 0, [0.8, 1], 1, 0.005, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twin_green/h"] = [4, [[0, 1, 1, 0]], [[0, 0.2, 0.5, 0.2, 1, 0], 1], [[0, 30, 1, 0], 1], [[0, "#62ed50", 1, "#a8e8b1"]], 0, [0, 4], null, [0, 0], [0, 0], 10, 0, 0, [0.8, 1], 1, 0.005, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twin_blue/h"] = [4, [[0, 1, 1, 0]], [[0, 0.2, 0.5, 0.2, 1, 0], 1], [[0, 30, 1, 0], 1], [[0, "#4c5ffb", 1, "#c8cffb"]], 0, [0, 4], null, [0, 0], [0, 0], 10, 0, 0, [0.8, 1], 1, 0.005, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twin_purple/h"] = [4, [[0, 1, 1, 0]], [[0, 0.2, 0.5, 0.2, 1, 0], 1], [[0, 30, 1, 0], 1], [[0, "#7e4cfb", 1, "#d0c8fb"]], 0, [0, 4], null, [0, 0], [0, 0], 10, 0, 0, [0.8, 1], 1, 0.005, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticlePreset["_sub:0:fw_twin_red/h"] = [4, [[0, 1, 1, 0]], [[0, 0.2, 0.5, 0.2, 1, 0], 1], [[0, 30, 1, 0], 1], [[0, "#ff5999", 1, "#ff9b9b"]], 0, [0, 4], null, [0, 0], [0, 0], 10, 0, 0, [0.8, 1], 1, 0.005, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flame1g", 0, ""]
    $dataTrpParticleGroupsPreset["fw_twin"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0 0.5 0 1 0"], "targetType": 0,
        "comment": "花火~V字噴出[橙]"
    };
    $dataTrpParticleGroupsPreset["fw_twin_yellow/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0 0.5 0 1 0"], "targetType": 0,
        "comment": "花火~V字噴出[黄]"
    };
    $dataTrpParticleGroupsPreset["fw_twin_green/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0 0.5 0 1 0"], "targetType": 0,
        "comment": "花火~V字噴出[緑]"
    };
    $dataTrpParticleGroupsPreset["fw_twin_blue/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0 0.5 0 1 0"], "targetType": 0,
        "comment": "花火~V字噴出[青]"
    };
    $dataTrpParticleGroupsPreset["fw_twin_purple/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0 0.5 0 1 0"], "targetType": 0,
        "comment": "花火~V字噴出[紫]"
    };
    $dataTrpParticleGroupsPreset["fw_twin_red/h"] = {
        "repeat": -1, "list": ["set _auto:0 target def back", "sub set _auto:0 _sub:0 0 0.5 0 1 0"], "targetType": 0,
        "comment": "花火~V字噴出[赤]"
    };



    //PRAGMA: registerPreset3Command
    /* register command
    ===================================*/
    if (!Utils.isOptionValid('test')) return;

    var pluginName = 'TRP_ParticleMZ_ExPreset3';
    PluginManager.registerCommand(pluginName, 'register', function (args) {
        var database = $dataTrpParticlePreset;
        var keys = Object.keys(database);
        keys.sort();
        var length = keys.length;

        file = '';
        file += '//=============================================================================\n';
        file += '// TRP_ParticlePresetMZ.js\n';
        file += '//=============================================================================\n';
        file += '/' + '*:\n';
        file += ' * @target MZ\n';
        file += ' * @base TRP_ParticleMZ\n';
        file += ' * @plugindesc パーティクルプリセットデータ\n';
        file += ' * @help\n';

        var images = [];
        var idx = 0;
        for (var i = 0; i < length; i = (i + 1) | 0) {
            var key = keys[i];
            var data = database[key];

            var isHidden = Game_Particle.isIdHidden(key)

            if (Array.isArray(data)) {
                data = Game_Particle.decompressConfigDataFromArray(data);
            }
            var imageStr = data.image;
            var targetType = data.targetType;
            var comment = data.comment;
            if (!isHidden) {
                if (idx++ > 0) {
                    file += '\n';
                }
                file += ' * ' + ParticleEditor.helpFileListText(key, targetType, comment);
            }

            if (imageStr) {
                imageStr.split(',').forEach(function (image) {
                    if (image.indexOf('tile:') === 0) return;
                    if (image.indexOf('ANIM:') === 0) {

                    } else if (!images.contains(image)) {
                        images.push(image);
                    }
                });
            }
        }

        file += '\n *\n *\n * 【パーティクルグループ】\n';
        var database = $dataTrpParticleGroupsPreset;
        var keys = Object.keys(database);
        keys.sort();
        var length = keys.length;
        var idx = 0;
        for (var i = 0; i < length; i = (i + 1) | 0) {
            var key = keys[i];
            if (Game_Particle.isIdHidden(key)) {
                continue;
            }
            var data = database[key];
            if (idx++ > 0) {
                file += '\n';
            }
            var targetType = data.targetType;
            var comment = data.comment;
            file += ' * ' + ParticleEditor.helpFileListText(key, targetType, comment);
        }
        file += '\n *';
        file += ParticleEditor.prototype.helpPluginCommandTexts.call(this, $dataTrpParticlePreset);
        file += '\n *\n *';
        file += ParticleGroupEditor.prototype._helpPluginCommandTexts.call(this, $dataTrpParticleGroupsPreset);
        file += '\n *';
        var length = images.length;
        for (var i = 0; i < length; i = (i + 1) | 0) {
            file += '\n * @requiredAssets img/particles/' + images[i];
        }
        file += '\n *' + '/';


        /* read preset file
        ===================================*/
        var helpTexts = file;
        var filePath = 'js/plugins/TRP_ParticleMZ_Preset.js';

        var fs = require('fs');
        var path = require('path');
        var base = path.dirname(process.mainModule.filename);
        filePath = path.join(base, filePath);

        var file = fs.readFileSync(filePath, { encoding: "utf8" });

        var index = file.indexOf('*' + '/');
        file = helpTexts + file.substring(index + 2);

        fs.writeFileSync(filePath, file);

        $gameMessage.add('\x1b>' + pluginName + 'の収録データの呼び出しコマンドを')
        $gameMessage.add('\x1b>TRP_ParticleMZ_Presetに登録しました。');
    });
    //PRAGMA_END: registerPreset3Command

})();