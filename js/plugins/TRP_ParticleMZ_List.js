/*: @target MZ
 * @base TRP_ParticleMZ
 * @plugindesc 自作パーティクル設定の一覧
 * @help
 * darkness_s_full <character> ＠2022/9/8
 * diamonddust_w_full <weather> ＠2023/5/21
 * diamonddust_w_full_sub <character> ＠2023/5/21
 * dust_w_full <character> ＠2022/8/31
 * flash_s_full <character> ＠2022/8/31
 * light_black_w1_full <character> ＠2022/9/9
 * light_leak_s2_full <character> ＠2022/8/31
 * light_leak_s2_full_color <character> ＠2022/8/31
 * petal_w_full <character> ＠2022/8/31
 * rain_fog_w_full <character> ＠2022/8/31
 * snow_w2_full <character> ＠2022/10/3
 * sparks_w2_full <character> ＠2022/8/31
 * stardust_w_full <character> ＠2022/8/31
 * test <character> ＠2022/8/31
 * tree_leaves_fall <character> ＠2022/8/31
 *
 *
 * 【パーティクルグループ】
 * test <character> ＠---
 *
 *
 * @command set_character
 * @text set/表示 > キャラ対象(14)
 * @desc パーティクル表示
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
 * @option darkness_s_full <character> ＠2022/9/8
 * @value darkness_s_full
 * @option diamonddust_w_full_sub <character> ＠2023/5/21
 * @value diamonddust_w_full_sub
 * @option dust_w_full <character> ＠2022/8/31
 * @value dust_w_full
 * @option flash_s_full <character> ＠2022/8/31
 * @value flash_s_full
 * @option light_black_w1_full <character> ＠2022/9/9
 * @value light_black_w1_full
 * @option light_leak_s2_full <character> ＠2022/8/31
 * @value light_leak_s2_full
 * @option light_leak_s2_full_color <character> ＠2022/8/31
 * @value light_leak_s2_full_color
 * @option petal_w_full <character> ＠2022/8/31
 * @value petal_w_full
 * @option rain_fog_w_full <character> ＠2022/8/31
 * @value rain_fog_w_full
 * @option snow_w2_full <character> ＠2022/10/3
 * @value snow_w2_full
 * @option sparks_w2_full <character> ＠2022/8/31
 * @value sparks_w2_full
 * @option stardust_w_full <character> ＠2022/8/31
 * @value stardust_w_full
 * @option test <character> ＠2022/8/31
 * @value test
 * @option tree_leaves_fall <character> ＠2022/8/31
 * @value tree_leaves_fall
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
 * @command set_screen
 * @text set/表示 > スクリーン/天候/リージョン(1)
 * @desc パーティクル表示
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default this
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option diamonddust_w_full <weather> ＠2023/5/21
 * @value diamonddust_w_full
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
 * @text group/グループ > キャラ対象(1)
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
 * @option test <character> ＠---
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
 *
 *
 * @requiredAssets img/particles/particle7
 * @requiredAssets img/particles/cloud2s
 * @requiredAssets img/particles/shine_thin3
 * @requiredAssets img/particles/dust1g
 * @requiredAssets img/particles/dust2g
 * @requiredAssets img/particles/dust4g
 * @requiredAssets img/particles/dust3g
 * @requiredAssets img/particles/flare
 * @requiredAssets img/particles/particle1
 * @requiredAssets img/particles/petal1
 * @requiredAssets img/particles/smoke2
 * @requiredAssets img/particles/snow2
 * @requiredAssets img/particles/snow5g
 * @requiredAssets img/particles/particle8
 * @requiredAssets img/particles/leaf1
 * @requiredAssets img/particles/__ANIM_30FPS_AC4N017_ShadowFlame_28
 */
if (PluginManager._parameters) PluginManager._parameters.trp_particlemz_list = {
	animImages: ["_ANIM_30FPS_AC4N017_ShadowFlame_28"]
};