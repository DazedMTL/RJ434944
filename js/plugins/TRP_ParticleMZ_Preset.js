//=============================================================================
// TRP_ParticlePreset.js
//=============================================================================
/*:ja
 * @target MZ
 * @base TRP_ParticleMZ
 * @plugindesc パーティクルプリセットデータ
 * @help
 * 【更新履歴】
 * 1.26 2022/09/04 漂う光系プリセット32種追加
 * 1.07 2022/01/09 iOSでの動作不具合修正
 * 1.06 2021/06/01 コマンドのデフォルト値変更
 * 1.00 2021/04/10 初版。
 *
 * aura_bp <対象:character> ＠キャラ:青白い粒子と集中線拡散
 * aura_bp2 <対象:character> ＠キャラ:青白いサークル拡大
 * aura_static_b <対象:character> ＠キャラ:もやもやのオーラ
 * black_particle_w <対象:weather> ＠天候:黒いパーティクル
 * blizard_w <対象:weather> ＠天候:吹雪
 * bubble_c <対象:character> ＠キャラ:キャラを包む泡。attach推奨
 * bubble_cp <対象:character> ＠キャラ:穴から吹き出す泡
 * bubble_w <対象:weather> ＠天候:水中の泡
 * charm_bw <対象:weather> ＠天候:画面全体ハート
 * click <対象:click> ＠click:マウスクリック/タップ用1
 * click2 <対象:click> ＠click:マウスクリック/タップ用2
 * cloud_shadow_w <対象:screen> ＠天候:雲の影
 * cloud_w <対象:screen> ＠天候:雲
 * dark_hole_r <対象:region> ＠リージョン:穴からキラキラ吹き上げる光
 * dark_hole_r_2 <対象:region> ＠リージョン:穴から吹き上げる線形の光
 * dark_hole_r_3 <対象:region> ＠リージョン:穴の中のもやもや
 * darkness_s <対象:screen> ＠スクリーン:暗闇の視界制限
 * diamonddust_w <対象:weather> ＠天候:キラキラ漂うダイヤモンドダスト
 * diamonddust_w2 <対象:weather> ＠天候:キラキラ漂うダイヤモンドダスト2
 * drag <対象:character> ＠drag:マウスドラッグ用
 * dust_walk <対象:walk> ＠歩行:土煙
 * explode_cp_1 <対象:character> ＠キャラ:爆発前のサークル収束
 * explode_cp_2 <対象:character> ＠キャラ:爆発の炎
 * explode_cp_3 <対象:character> ＠キャラ:爆発時のサークル発散
 * explode_cp_4 <対象:character> ＠キャラ:爆発後のチカチカする円
 * fire_c <対象:character> ＠キャラ:大きな炎
 * fire_pillar_c <対象:character> ＠キャラ:行き止まり用の炎の柱
 * fireworks_c <対象:character> ＠キャラ:打ち上げ花火
 * fireworks_dragon_c <対象:character> ＠キャラ:噴出タイプの花火
 * fish_w <対象:weather> ＠天候:水中の影
 * flare_s <対象:screen> ＠スクリーン:太陽光のフレア
 * flash_s <対象:screen> ＠スクリーン:太陽光のフラッシュ
 * flower_walk <対象:walk> ＠歩行:歩いた跡に花(タイル使用)
 * fog_shadow_w <対象:screen> ＠天候:モヤの影
 * fog_w <対象:weather> ＠天候:薄いフォグ
 * fog_w2 <対象:screen> ＠天候:濃いめのモヤ
 * fuss_c <対象:character> ＠キャラ:乱闘中っぽいアニメ調の煙
 * fuss_startdash <対象:startdash> ＠スタートダッシュ:アニメ調の煙
 * fuss_walk <対象:walk> ＠歩行:アニメ調の煙
 * grass_walk <対象:walk> ＠歩行:飛び散る草
 * illumination_w <対象:weather> ＠天候:カラフルなイルミネーション
 * kira_blue_c <対象:character> ＠キャラ:青いキラキラエフェクト
 * light_float_cp <対象:character> ＠キャラ:光柱が頭上に向かって消える
 * light_floor_r <対象:region> ＠リージョン:キラキラ点滅する小さな光粒
 * light_leak_s <対象:screen> ＠スクリーン:淡いライトリーク
 * light_leak_s2 <対象:screen> ＠スクリーン:青&緑のライトリーク
 * light_pillar_r <対象:region> ＠リージョン:空エリアの光の柱
 * light_pillar_w <対象:weather> ＠天候:上部からの光柱。横スク用マップ用
 * light_r <対象:region> ＠region:テスト用1
 * magic_circle_c <対象:character> ＠キャラ:魔法陣の幾何学エフェクト
 * magma_r <対象:region> ＠リージョン:マグマの床
 * mahoujin_c <対象:character> ＠キャラ:魔法陣上のキラキラ光粒
 * mahoujin_c2 <対象:character> ＠キャラ:魔法陣上の光線演出
 * monster_c <対象:character> ＠キャラ:中央から光球が発生して上に
 * monster_cp <対象:character> ＠キャラ:パーティクルが収束
 * monster_cp2 <対象:character> ＠キャラ:集中線が発散。
 * orb_c <対象:character> ＠キャラ:オーブの波動
 * orb_cp <対象:character> ＠キャラ:青白いキラキラ光粒が発散
 * particle <対象:character> ＠テスト用
 * particle_w <対象:weather> ＠天候:ゆらゆら上昇する光粒
 * petal_w <対象:weather> ＠天候:桜の花びら
 * poison_r <対象:region> ＠リージョン:毒の沼
 * rain_fog_w <対象:weather> ＠天候:雨天時のモヤ
 * rain_w <対象:weather> ＠天候:しとしと雨
 * rain_w2 <対象:weather> ＠天候:強めの雨
 * rain_w3 <対象:weather> ＠天候:本降りの雨
 * ripple_r <対象:region> ＠リージョン:水たまりの波紋
 * ripple_walk <対象:walk> ＠歩行:水の波紋
 * smoke_c <対象:character> ＠キャラ:焚き火の煙
 * smoke_c2 <対象:character> ＠キャラ:fire用の大きな煙
 * snow_w <対象:weather> ＠天候:うっすらと降る雪
 * snow_w2 <対象:weather> ＠天候:雪の結晶
 * sparks_c <対象:character> ＠キャラ:焚き火の火の粉
 * sparks_w <対象:weather> ＠天候:薄っすらと舞い上がる火の粉
 * splash_walk <対象:walk> ＠歩行:水しぶき
 * statue_orb_c <対象:character> ＠キャラ:石像のオーブから出る光粒
 * thunder_w <対象:weather> ＠天候:ピカッと一瞬光る稲妻
 * thunder_w2 <対象:weather> ＠天候:黄色の稲妻
 * warp_red_c <対象:character> ＠キャラ:赤魔法陣ワープの集中線
 * warp_red_cp <対象:character> ＠キャラ:ワープ直後の幾何学エフェクト
 *
 *
 * 【パーティクルグループ】
 * commet <対象:weather> ＠星空と彗星
 * firefly <対象:region> ＠蛍
 * fireworks <対象:character> ＠打ち上げ花火
 * light_green_w1 <対象:weather> ＠天候:漂う光<緑/森_1>
 * light_green_w2 <対象:weather> ＠天候:漂う光<緑/森_2>
 * light_green_w3 <対象:weather> ＠天候:漂う光<緑/森_3>
 * light_black_w1 <対象:weather> ＠天候:漂う光<黒/闇_1>
 * light_black_w2 <対象:weather> ＠天候:漂う光<黒/闇_2>
 * light_black_w3 <対象:weather> ＠天候:漂う光<黒/闇_3>
 * light_ash_w1 <対象:weather> ＠天候:漂う光<灰_1>
 * light_ash_w2 <対象:weather> ＠天候:漂う光<灰_2>
 * light_ice_w1 <対象:weather> ＠天候:漂う光<氷_1>
 * light_ice_w2 <対象:weather> ＠天候:漂う光<氷_2>
 * light_ice_w3 <対象:weather> ＠天候:漂う光<氷_3>
 * light_red_w1 <対象:weather> ＠天候:漂う光<赤/炎_1>
 * light_red_w2 <対象:weather> ＠天候:漂う光<赤/炎_2>
 * light_red_w3 <対象:weather> ＠天候:漂う光<赤/炎_3>
 * light_blue_w1 <対象:weather> ＠天候:漂う光<青/水_1>
 * light_blue_w2 <対象:weather> ＠天候:漂う光<青/水_2>
 * light_blue_w3 <対象:weather> ＠天候:漂う光<青/水_3>
 * light_white_w1 <対象:weather> ＠天候:漂う光<白/光_1>
 * light_white_w2 <対象:weather> ＠天候:漂う光<白/光_2>
 * light_white_w3 <対象:weather> ＠天候:漂う光<白/光_3>
 * light_purple_w1 <対象:weather> ＠天候:漂う光<紫/魔_1>
 * light_purple_w2 <対象:weather> ＠天候:漂う光<紫/魔_2>
 * light_purple_w3 <対象:weather> ＠天候:漂う光<紫/魔_3>
 * light_gold_w1 <対象:weather> ＠天候:漂う光<金_1>
 * light_gold_w2 <対象:weather> ＠天候:漂う光<金_2>
 * light_gold_w3 <対象:weather> ＠天候:漂う光<金_3>
 * light_monochrome_w1 <対象:weather> ＠天候:漂う光<白黒/陰陽_1>
 * light_monochrome_w2 <対象:weather> ＠天候:漂う光<白黒/陰陽_2>
 * light_monochrome_w3 <対象:weather> ＠天候:漂う光<白黒/陰陽_3>
 * light_rainbow_w1 <対象:weather> ＠天候:漂う光<虹_1>
 * light_rainbow_w2 <対象:weather> ＠天候:漂う光<虹_2>
 * light_rainbow_w3 <対象:weather> ＠天候:漂う光<虹_3>
 *
 * @command set_character
 * @text set/表示 > キャラ対象(23)
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
 * @option aura_static_b <character> ＠キャラ:もやもやのオーラ
 * @value aura_static_b
 * @option bubble_c <character> ＠キャラ:キャラを包む泡。attach推奨
 * @value bubble_c
 * @option dust_walk <walk> ＠歩行:土煙
 * @value dust_walk
 * @option fire_c <character> ＠キャラ:大きな炎
 * @value fire_c
 * @option fire_pillar_c <character> ＠キャラ:行き止まり用の炎の柱
 * @value fire_pillar_c
 * @option fireworks_dragon_c <character> ＠キャラ:噴出タイプの花火
 * @value fireworks_dragon_c
 * @option flower_walk <walk> ＠歩行:歩いた跡に花(タイル使用)
 * @value flower_walk
 * @option fuss_walk <walk> ＠歩行:アニメ調の煙
 * @value fuss_walk
 * @option grass_walk <walk> ＠歩行:飛び散る草
 * @value grass_walk
 * @option kira_blue_c <character> ＠キャラ:青いキラキラエフェクト
 * @value kira_blue_c
 * @option magic_circle_c <character> ＠キャラ:魔法陣の幾何学エフェクト
 * @value magic_circle_c
 * @option mahoujin_c <character> ＠キャラ:魔法陣上のキラキラ光粒
 * @value mahoujin_c
 * @option mahoujin_c2 <character> ＠キャラ:魔法陣上の光線演出
 * @value mahoujin_c2
 * @option monster_c <character> ＠キャラ:中央から光球が発生して上に
 * @value monster_c
 * @option orb_c <character> ＠キャラ:オーブの波動
 * @value orb_c
 * @option particle <character> ＠テスト用
 * @value particle
 * @option ripple_walk <walk> ＠歩行:水の波紋
 * @value ripple_walk
 * @option smoke_c <character> ＠キャラ:焚き火の煙
 * @value smoke_c
 * @option smoke_c2 <character> ＠キャラ:fire用の大きな煙
 * @value smoke_c2
 * @option sparks_c <character> ＠キャラ:焚き火の火の粉
 * @value sparks_c
 * @option splash_walk <walk> ＠歩行:水しぶき
 * @value splash_walk
 * @option statue_orb_c <character> ＠キャラ:石像のオーブから出る光粒
 * @value statue_orb_c
 * @option warp_red_c <character> ＠キャラ:赤魔法陣ワープの集中線
 * @value warp_red_c
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
 * @text set/表示 > スクリーン/天候/リージョン(39)
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
 * @option black_particle_w <weather> ＠天候:黒いパーティクル
 * @value black_particle_w
 * @option blizard_w <weather> ＠天候:吹雪
 * @value blizard_w
 * @option bubble_w <weather> ＠天候:水中の泡
 * @value bubble_w
 * @option charm_bw <weather> ＠天候:画面全体ハート
 * @value charm_bw
 * @option cloud_shadow_w <screen> ＠天候:雲の影
 * @value cloud_shadow_w
 * @option cloud_w <screen> ＠天候:雲
 * @value cloud_w
 * @option dark_hole_r <region> ＠リージョン:穴からキラキラ吹き上げる光
 * @value dark_hole_r
 * @option dark_hole_r_2 <region> ＠リージョン:穴から吹き上げる線形の光
 * @value dark_hole_r_2
 * @option dark_hole_r_3 <region> ＠リージョン:穴の中のもやもや
 * @value dark_hole_r_3
 * @option darkness_s <screen> ＠スクリーン:暗闇の視界制限
 * @value darkness_s
 * @option diamonddust_w <weather> ＠天候:キラキラ漂うダイヤモンドダスト
 * @value diamonddust_w
 * @option diamonddust_w2 <weather> ＠天候:キラキラ漂うダイヤモンドダスト2
 * @value diamonddust_w2
 * @option fish_w <weather> ＠天候:水中の影
 * @value fish_w
 * @option flare_s <screen> ＠スクリーン:太陽光のフレア
 * @value flare_s
 * @option flash_s <screen> ＠スクリーン:太陽光のフラッシュ
 * @value flash_s
 * @option fog_shadow_w <screen> ＠天候:モヤの影
 * @value fog_shadow_w
 * @option fog_w <weather> ＠天候:薄いフォグ
 * @value fog_w
 * @option fog_w2 <screen> ＠天候:濃いめのモヤ
 * @value fog_w2
 * @option illumination_w <weather> ＠天候:カラフルなイルミネーション
 * @value illumination_w
 * @option light_floor_r <region> ＠リージョン:キラキラ点滅する小さな光粒
 * @value light_floor_r
 * @option light_leak_s <screen> ＠スクリーン:淡いライトリーク
 * @value light_leak_s
 * @option light_leak_s2 <screen> ＠スクリーン:青&緑のライトリーク
 * @value light_leak_s2
 * @option light_pillar_r <region> ＠リージョン:空エリアの光の柱
 * @value light_pillar_r
 * @option light_pillar_w <weather> ＠天候:上部からの光柱。横スク用マップ用
 * @value light_pillar_w
 * @option light_r <region> ＠region:テスト用1
 * @value light_r
 * @option magma_r <region> ＠リージョン:マグマの床
 * @value magma_r
 * @option particle_w <weather> ＠天候:ゆらゆら上昇する光粒
 * @value particle_w
 * @option petal_w <weather> ＠天候:桜の花びら
 * @value petal_w
 * @option poison_r <region> ＠リージョン:毒の沼
 * @value poison_r
 * @option rain_fog_w <weather> ＠天候:雨天時のモヤ
 * @value rain_fog_w
 * @option rain_w <weather> ＠天候:しとしと雨
 * @value rain_w
 * @option rain_w2 <weather> ＠天候:強めの雨
 * @value rain_w2
 * @option rain_w3 <weather> ＠天候:本降りの雨
 * @value rain_w3
 * @option ripple_r <region> ＠リージョン:水たまりの波紋
 * @value ripple_r
 * @option snow_w <weather> ＠天候:うっすらと降る雪
 * @value snow_w
 * @option snow_w2 <weather> ＠天候:雪の結晶
 * @value snow_w2
 * @option sparks_w <weather> ＠天候:薄っすらと舞い上がる火の粉
 * @value sparks_w
 * @option thunder_w <weather> ＠天候:ピカッと一瞬光る稲妻
 * @value thunder_w
 * @option thunder_w2 <weather> ＠天候:黄色の稲妻
 * @value thunder_w2
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
 * @command set_hidden
 * @text set/表示 > 非表示(/h)(7)
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
 * @command play_character
 * @text play/１回再生 > キャラ対象(16)
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
 * @default this
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option aura_bp <character> ＠キャラ:青白い粒子と集中線拡散
 * @value aura_bp
 * @option aura_bp2 <character> ＠キャラ:青白いサークル拡大
 * @value aura_bp2
 * @option bubble_cp <character> ＠キャラ:穴から吹き出す泡
 * @value bubble_cp
 * @option drag <character> ＠drag:マウスドラッグ用
 * @value drag
 * @option explode_cp_1 <character> ＠キャラ:爆発前のサークル収束
 * @value explode_cp_1
 * @option explode_cp_2 <character> ＠キャラ:爆発の炎
 * @value explode_cp_2
 * @option explode_cp_3 <character> ＠キャラ:爆発時のサークル発散
 * @value explode_cp_3
 * @option explode_cp_4 <character> ＠キャラ:爆発後のチカチカする円
 * @value explode_cp_4
 * @option fireworks_c <character> ＠キャラ:打ち上げ花火
 * @value fireworks_c
 * @option fuss_c <character> ＠キャラ:乱闘中っぽいアニメ調の煙
 * @value fuss_c
 * @option fuss_startdash <startdash> ＠スタートダッシュ:アニメ調の煙
 * @value fuss_startdash
 * @option light_float_cp <character> ＠キャラ:光柱が頭上に向かって消える
 * @value light_float_cp
 * @option monster_cp <character> ＠キャラ:パーティクルが収束
 * @value monster_cp
 * @option monster_cp2 <character> ＠キャラ:集中線が発散。
 * @value monster_cp2
 * @option orb_cp <character> ＠キャラ:青白いキラキラ光粒が発散
 * @value orb_cp
 * @option warp_red_cp <character> ＠キャラ:ワープ直後の幾何学エフェクト
 * @value warp_red_cp
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
 * @command play_system
 * @text play/１回再生 > マウス/タップ(2)
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
 * @default this
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
 * @option click <click> ＠click:マウスクリック/タップ用1
 * @value click
 * @option click2 <click> ＠click:マウスクリック/タップ用2
 * @value click2
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
 * @command play_hidden
 * @text play/１回再生 > 非表示(/h)(2)
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
 * @default this
 *
 * @arg name
 * @text 《データ名》
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default 《呼び出す設定を選択》
 * @type select
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
 * @option fireworks <character> ＠打ち上げ花火
 * @value fireworks
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
 * @text group/グループ > スクリーン/天候/リージョン34
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
 * @option commet <weather> ＠星空と彗星
 * @value commet
 * @option firefly <region> ＠蛍
 * @value firefly
 * @option light_green_w1 <weather> ＠天候:漂う光<緑/森_1>
 * @value light_green_w1
 * @option light_green_w2 <weather> ＠天候:漂う光<緑/森_2>
 * @value light_green_w2
 * @option light_green_w3 <weather> ＠天候:漂う光<緑/森_3>
 * @value light_green_w3
 * @option light_black_w1 <weather> ＠天候:漂う光<黒/闇_1>
 * @value light_black_w1
 * @option light_black_w2 <weather> ＠天候:漂う光<黒/闇_2>
 * @value light_black_w2
 * @option light_black_w3 <weather> ＠天候:漂う光<黒/闇_3>
 * @value light_black_w3
 * @option light_ash_w1 <weather> ＠天候:漂う光<灰_1>
 * @value light_ash_w1
 * @option light_ash_w2 <weather> ＠天候:漂う光<灰_2>
 * @value light_ash_w2
 * @option light_ice_w1 <weather> ＠天候:漂う光<氷_1>
 * @value light_ice_w1
 * @option light_ice_w2 <weather> ＠天候:漂う光<氷_2>
 * @value light_ice_w2
 * @option light_ice_w3 <weather> ＠天候:漂う光<氷_3>
 * @value light_ice_w3
 * @option light_red_w1 <weather> ＠天候:漂う光<赤/炎_1>
 * @value light_red_w1
 * @option light_red_w2 <weather> ＠天候:漂う光<赤/炎_2>
 * @value light_red_w2
 * @option light_red_w3 <weather> ＠天候:漂う光<赤/炎_3>
 * @value light_red_w3
 * @option light_blue_w1 <weather> ＠天候:漂う光<青/水_1>
 * @value light_blue_w1
 * @option light_blue_w2 <weather> ＠天候:漂う光<青/水_2>
 * @value light_blue_w2
 * @option light_blue_w3 <weather> ＠天候:漂う光<青/水_3>
 * @value light_blue_w3
 * @option light_white_w1 <weather> ＠天候:漂う光<白/光_1>
 * @value light_white_w1
 * @option light_white_w2 <weather> ＠天候:漂う光<白/光_2>
 * @value light_white_w2
 * @option light_white_w3 <weather> ＠天候:漂う光<白/光_3>
 * @value light_white_w3
 * @option light_purple_w1 <weather> ＠天候:漂う光<紫/魔_1>
 * @value light_purple_w1
 * @option light_purple_w2 <weather> ＠天候:漂う光<紫/魔_2>
 * @value light_purple_w2
 * @option light_purple_w3 <weather> ＠天候:漂う光<紫/魔_3>
 * @value light_purple_w3
 * @option light_gold_w1 <weather> ＠天候:漂う光<金_1>
 * @value light_gold_w1
 * @option light_gold_w2 <weather> ＠天候:漂う光<金_2>
 * @value light_gold_w2
 * @option light_gold_w3 <weather> ＠天候:漂う光<金_3>
 * @value light_gold_w3
 * @option light_monochrome_w1 <weather> ＠天候:漂う光<白黒/陰陽_1>
 * @value light_monochrome_w1
 * @option light_monochrome_w2 <weather> ＠天候:漂う光<白黒/陰陽_2>
 * @value light_monochrome_w2
 * @option light_monochrome_w3 <weather> ＠天候:漂う光<白黒/陰陽_3>
 * @value light_monochrome_w3
 * @option light_rainbow_w1 <weather> ＠天候:漂う光<虹_1>
 * @value light_rainbow_w1
 * @option light_rainbow_w2 <weather> ＠天候:漂う光<虹_2>
 * @value light_rainbow_w2
 * @option light_rainbow_w3 <weather> ＠天候:漂う光<虹_3>
 * @value light_rainbow_w3
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
 * @requiredAssets img/particles/dust4
 * @requiredAssets img/particles/dust2
 * @requiredAssets img/particles/dust3
 * @requiredAssets img/particles/dust1
 * @requiredAssets img/particles/dust4g
 * @requiredAssets img/particles/dust2g
 * @requiredAssets img/particles/dust1g
 * @requiredAssets img/particles/dust3g
 * @requiredAssets img/particles/particle7
 * @requiredAssets img/particles/particle9
 * @requiredAssets img/particles/particle8
 * @requiredAssets img/particles/particle1
 * @requiredAssets img/particles/leaf1g
 * @requiredAssets img/particles/shine2
 * @requiredAssets img/particles/shine_thin1g
 * @requiredAssets img/particles/shine_thin3
 * @requiredAssets img/particles/flare
 * @requiredAssets img/particles/line_ray2
 * @requiredAssets img/particles/particle5
 * @requiredAssets img/particles/line_oval1
 * @requiredAssets img/particles/shine3
 * @requiredAssets img/particles/line_oval3
 * @requiredAssets img/particles/snow_particle2g
 * @requiredAssets img/particles/circle3g
 * @requiredAssets img/particles/cloud3
 * @requiredAssets img/particles/snow_particle2
 * @requiredAssets img/particles/snow_particle1
 * @requiredAssets img/particles/bubble1
 * @requiredAssets img/particles/heart4g
 * @requiredAssets img/particles/circle
 * @requiredAssets img/particles/cloud2
 * @requiredAssets img/particles/cloud1
 * @requiredAssets img/particles/smoke2
 * @requiredAssets img/particles/cloud2s
 * @requiredAssets img/particles/particle2
 * @requiredAssets img/particles/smog1
 * @requiredAssets img/particles/circle2
 * @requiredAssets img/particles/smog2
 * @requiredAssets img/particles/smoke1
 * @requiredAssets img/particles/flame1g
 * @requiredAssets img/particles/fish1
 * @requiredAssets img/particles/flare2
 * @requiredAssets img/particles/cartoon_fuss2
 * @requiredAssets img/particles/cartoon_fuss1
 * @requiredAssets img/particles/flame1
 * @requiredAssets img/particles/particle4
 * @requiredAssets img/particles/hexagon_line3
 * @requiredAssets img/particles/hexagon1
 * @requiredAssets img/particles/line2
 * @requiredAssets img/particles/line_oval2
 * @requiredAssets img/particles/ripple1g
 * @requiredAssets img/particles/petal1
 * @requiredAssets img/particles/line_rain2
 * @requiredAssets img/particles/line_rain1
 * @requiredAssets img/particles/ripple2
 * @requiredAssets img/particles/snow2
 * @requiredAssets img/particles/snow5g
 * @requiredAssets img/particles/thunder1
 * @requiredAssets img/particles/thunder2
 * @requiredAssets img/particles/square_line1
 */
//=============================================================================
//PRAGMA: englishHeader
/*:
 * @target MZ
 * @base TRP_ParticleMZ
 * @plugindesc Particle Preset Data
 * @help
 * [Update History]
 * 1.08 2022/09/04 Addition of preset data for drifting light
 * 1.07 2022/03/20 First Edition.
 *
 * aura_bp <subject:character> character:Omnidirectional Light Diffusion
 * aura_bp2 <subject:character> character:Pale Blue Circle Aura
 * aura_static_b <subject:character> character:Foggy Aura
 * black_particle_w <subject:weather> weather:Black Particles
 * blizard_w <subject:weather> weather:Blizzard
 * bubble_c <subject:character> character:Circular Aura[attach]recommended
 * bubble_cp <subject:character> character:Bubble Burst
 * bubble_w<subject:weather> weather:Underwater bubbles
 * charm_bw <subject:weather> weather:Heart
 * click <subject:click> click:Mouse click/Tap 1
 * click2 <subject:click> click:Mouse click/Tap 2
 * cloud_shadow_w <subject:screen> weather:Cloud shadow
 * cloud_w <subject:screen> weather:Cloud
 * dark_hole_r <subject:region> region:Light that glitters up from hole
 * dark_hole_r_2 <subject:region> region:Linear light glowing up from hole
 * dark_hole_r_3 <subject:region> region:Haze in the hole
 * darkness_s <subject:screen> screen:Vision Restriction with Darkness
 * diamonddust_w <subject:weather> weather:Diamond dust twinkle
 * diamonddust_w2 <subject:weather> weather:Diamond dust twinkle2
 * drag <subject:character> drag:Mouse drag
 * dust_walk <subject:walk> walk:Cloud of Dust
 * explode_cp_1 <subject:character> character:Convergence before explosion
 * explode_cp_2 <subject:character> character:Flame of Explosion
 * explode_cp_3 <subject:character> character:Dissipation at explosion
 * explode_cp_4 <subject:character> character:Flickering after explosion
 * fire_c <subject:character> character:Big Flame
 * fire_pillar_c <subject:character> character:Fire Pillar
 * fireworks_c <subject:character> character:Firework
 * fireworks_dragon_c <subject:character> character:Firework2
 * fish_w <subject:weather> weather:Fish shadow
 * flare_s <subject:screen> screen:Solar Flare
 * flash_s <subject:screen> screen:Solar Flash
 * flower_walk <subject:walk> walk:Flower Footsteps(using tiles)
 * fog_shadow_w <subject:screen> weather:Shadow of Fog
 * fog_w <subject:weather> weather:Fog
 * fog_w2 <subject:screen> weather:Thick Fog
 * fuss_c <subject:character> character:Cartoon Smoke during brawl
 * fuss_startdash <subject:startdash> startdash:Cartoon Smoke(Puff)
 * fuss_walk <subject:walk> walk:Cartoon Smoke
 * grass_walk >subject:walk> walk:Scattering Grass
 * illumination_w <subject:weather> weather:Christmas Lights
 * kira_blue_c <subject:character> character:Sparkle
 * light_float_cp <subject:character> character:Overhead Light Pillar
 * light_floor_r <subject:region> region:Sparkly Particles
 * light_leak_s <subject:screen> screen:Pale Light
 * light_leak_s2 <subject:screen> screen:Blue&Green Pale Light
 * light_pillar_r <subject:region> region:Pillar of light in the sky area
 * light_pillar_w <subject:weather> weather:Light pillar. For side-scroll maps.
 * light_r <subject:region> region:Test1
 * magic_circle_c <subject:character> character:Geometric effect on magic circle
 * magma_r <subject:region> region:Magma Ground
 * mahoujin_c <subject:character> character:Glitter on magic circle
 * mahoujin_c2 <subject:character> character:Ray of light on magic circle
 * monster_c <subject:character> character:Balls of light flying upwards
 * monster_cp <subject:character> character:Particle convergence
 * monster_cp2 <subject:character> character:Radiating Lines
 * orb_c <subject:character> character:Orb Vibration Effect
 * orb_cp <subject:character> character:Bursting Sparkles
 * particle <subject:character> test
 * particle_w <subject:weather> weather:Light particles swaying and rising
 * petal_w <subject:weather> weather:Cherry Blossom
 * poison_r <subject:region> region:Poisonous Swamp
 * rain_fog_w <subject:weather> weather:Haze Rain
 * rain_w <subject:weather> weather:Rain
 * rain_w2 <subject:weather> weather:Heavy Rain
 * rain_w3 <subject:weather> weather:Downpour
 * ripple_r <subject:region> region:Puddle Ripples
 * ripple_walk <subject:walk> walk:Water Ripples
 * smoke_c <sbujecet:character> character:Bonfire Smoke
 * smoke_c2 <subject:character> character:Large Smoke for [fire]
 * snow_w <subject:weather> weather:Snow Flurry
 * snow_w2 <subject:weather> weather:Snow Crystal
 * sparks_c <subject:character> character:Bonfire Sparks
 * sparks_w <subject:weather> weather:Sparks
 * splash_walk <subject:walk> walk:Water Splash
 * statue_orb_c <subject:character> character:Light particles from stone statue's orb
 * thunder_w <subject:weather> weather:Thunder(Purple)
 * thunder_w2 <subject:weather> weather:Thunder(Yellow)
 * warp_red_c <subject:character> character:Magic circle teleportation effect
 * warp_red_cp <subject:character> character:Geometric effect after teleportation
 *
 * [Particle Group]
 * commet <subject:weather> Starry sky and Comet
 * firefly <subject:region> Firefly
 * fireworks <subject:character> Fireworks
 * light_green_w1 <subject:weather> Drifting light:Green 1
 * light_green_w2 <subject:weather> Drifting light:Green 2
 * light_green_w3 <subject:weather> Drifting light:Green 3
 * light_black_w1 <subject:weather> Drifting light:Black 1
 * light_black_w2 <subject:weather> Drifting light:Black 2
 * light_black_w3 <subject:weather> Drifting light:Black 3
 * light_ash_w1 <subject:weather> Drifting light:Ash 1
 * light_ash_w2 <subject:weather> Drifting light:Ash 2
 * light_ice_w1 <subject:weather> Drifting light:Ice 1
 * light_ice_w2 <subject:weather> Drifting light:Ice 2
 * light_ice_w3 <subject:weather> Drifting light:Ice 3
 * light_red_w1 <subject:weather> Drifting light:Red 1
 * light_red_w2 <subject:weather> Drifting light:Red 2
 * light_red_w3 <subject:weather> Drifting light:Red 3
 * light_blue_w1 <subject:weather> Drifting light:Blue 1
 * light_blue_w2 <subject:weather> Drifting light:Blue 2
 * light_blue_w3 <subject:weather> Drifting light:Blue 3
 * light_white_w1 <subject:weather> Drifting light:White 1
 * light_white_w2 <subject:weather> Drifting light:White 2
 * light_white_w3 <subject:weather> Drifting light:White 3
 * light_purple_w1 <subject:weather> Drifting light:Purple 1
 * light_purple_w2 <subject:weather> Drifting light:Purple 2
 * light_purple_w3 <subject:weather> Drifting light:Purple 3
 * light_gold_w1 <subject:weather> Drifting light:Gold 1
 * light_gold_w2 <subject:weather> Drifting light:Gold 2
 * light_gold_w3 <subject:weather> Drifting light:Gold 3
 * light_monochrome_w1 <subject:weather> Drifting light:B&W 1
 * light_monochrome_w2 <subject:weather> Drifting light:B&W 2
 * light_monochrome_w3 <subject:weather> Drifting light:B&W 3
 * light_rainbow_w1 <subject:weather> Drifting light:Rainbow 1
 * light_rainbow_w2 <subject:weather> Drifting light:Rainbow 2
 * light_rainbow_w3 <subject:weather> Drifting light:Rainbow 3
 *
 * @command set_character
 * @text set/Display > character subject(23)
 * @desc Display Particles
 *
 * @arg id
 * @text ManagementID
 * @The ManagementID must be unique. [def]for setting name.[-EID] adds -EID at the end of setting name. 
 * @default def
 *
 * @arg target
 * @text Target
 * @desc [this] specifies an event. Such as "event:eventID" "player" "weather"
 * @default this
 *
 * @arg name
 * @text <<Data Name>>
 * @desc When set to def, the managementID is used as the data name.  (When displaying the same data name with the same priority multiple times, the managementID should be separated.)
 * @default <<Select a setting to open>>
 * @type select
 * @option aura_static_b <character> Hazy Aura
 * @value aura_static_b
 * @option bubble_c <character> Circular Aura[attach]recommended
 * @value bubble_c
 * @option dust_walk <walk> Cloud of Dust
 * @value dust_walk
 * @option fire_c <character> Big Flame
 * @value fire_c
 * @option fire_pillar_c <character> Fire Pillar
 * @value fire_pillar_c
 * @option fireworks_dragon_c <character> Firework2
 * @value fireworks_dragon_c
 * @option flower_walk <walk> Flower Footsteps(using tiles)
 * @value flower_walk
 * @option fuss_walk <walk> Cartoon Smoke
 * @value fuss_walk
 * @option grass_walk <walk> Scattering Grass
 * @value grass_walk
 * @option kira_blue_c <character> Sparkle
 * @value kira_blue_c
 * @option magic_circle_c <character> Geometric effect on magic circle
 * @value magic_circle_c
 * @option mahoujin_c <character> Glitter on magic circle
 * @value mahoujin_c
 * @option mahoujin_c2 <character> Ray of light on magic circle
 * @value mahoujin_c2
 * @option monster_c <character> Balls of light flying upwards
 * @value monster_c
 * @option orb_c <character> Orb Vibration Effect
 * @value orb_c
 * @option particle <character>  * @value particle
 * @option ripple_walk <walk> Water Ripples
 * @value ripple_walk
 * @option smoke_c <character> Bonfire Smoke
 * @value smoke_c
 * @option smoke_c2 <character> Large Smoke for [fire]
 * @value smoke_c2
 * @option sparks_c <character> Bonfire Sparks
 * @value sparks_c
 * @option splash_walk <walk> Water Splash
 * @value splash_walk
 * @option statue_orb_c <character> Light particles from stone statue's orb
 * @value statue_orb_c
 * @option warp_red_c <character> Magic circle teleportation effect
 * @value warp_red_c
 *
 * @arg z
 * @text Z Value
 * @desc Order of overlapping, such as above, below, screen, spriteset. Value can be specified.
 * @default def
 *
 * @arg tag
 * @text Management tag
 * @desc Tag name for management.
 *
 * @arg edit
 * @text Edit mode
 * @desc Opens editor when turned ON. (Only available during playtest)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _Delay
 * @desc If set to 1 or more, the command will be executed after the specified frame.
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command set_screen
 * @text set/Display > screen/weather/region(39)
 * @desc Display Particles
 *
 * @arg id
 * @text ManagementID
 * @desc The ManagementID must be unique. [def]for setting name.[-EID] adds -EID at the end of setting name. 
 * @default def
 *
 * @arg target
 * @text Target
 * @desc [this] specifies an event. Such as "event:eventID" "player" "weather"
 * @default weather
 *
 * @arg name
 * @text <<Data Name>>
 * @desc When set to def, the managementID is used as the data name.  (When displaying the same data name with the same priority multiple times, the managementID should be separated.)
 * @default <<Select a setting to open>>
 * @type select
 * @option black_particle_w <weather> ＠weather:Black Particles
 * @value black_particle_w
 * @option blizard_w <weather> ＠weather:Blizzard
 * @value blizard_w
 * @option bubble_w<weather> ＠weather:Underwater bubbles
 * @value bubble_w
 * @option charm_bw <weather> ＠weather:Heart
 * @value charm_bw
 * @option cloud_shadow_w <screen> ＠weather:Cloud shadow
 * @value cloud_shadow_w
 * @option cloud_w <screen> ＠weather:Cloud
 * @value cloud_w
 * @option dark_hole_r <region> ＠region:Light that glitters up from hole
 * @value dark_hole_r
 * @option dark_hole_r_2 <region> ＠region:Linear light glowing up from hole
 * @value dark_hole_r_2
 * @option dark_hole_r_3 <region> ＠region:Haze in the hole
 * @value dark_hole_r_3
 * @option darkness_s <screen> ＠screen:Vision Restriction with Darkness
 * @value darkness_s
 * @option diamonddust_w <weather> ＠weather:Diamond dust twinkle
 * @value diamonddust_w
 * @option diamonddust_w2 <weather> ＠weather:Diamond dust twinkle2
 * @value diamonddust_w2
 * @option fish_w <weather> ＠weather:Fish shadow
 * @value fish_w
 * @option flare_s <screen> ＠screen:Solar Flare
 * @value flare_s
 * @option flash_s <screen> ＠screen:Solar Flash
 * @value flash_s
 * @option fog_shadow_w <screen> ＠weather:Shadow of Fog
 * @value fog_shadow_w
 * @option fog_w <weather> ＠weather:Fog
 * @value fog_w
 * @option fog_w2 <screen> ＠weather:Thick Fog
 * @value fog_w2
 * @option illumination_w <weather> ＠weather:Christmas Lights
 * @value illumination_w
 * @option light_floor_r <region> ＠region:Sparkly Particles
 * @value light_floor_r
 * @option light_leak_s <screen> ＠screen:Pale Light
 * @value light_leak_s
 * @option light_leak_s2 <screen> ＠screen:Blue&Green Pale Light
 * @value light_leak_s2
 * @option light_pillar_r <region> ＠region:Pillar of light in the sky area
 * @value light_pillar_r
 * @option light_pillar_w <weather> ＠weather:Light pillar. For side-scroll maps.
 * @value light_pillar_w
 * @option light_r <region> ＠region:Test1
 * @value light_r
 * @option magma_r <region> ＠region:Lava Ground
 * @value magma_r
 * @option particle_w <weather> ＠weather:Light particles swaying and rising
 * @value particle_w
 * @option petal_w <weather> ＠weather:Cherry Blossom
 * @value petal_w
 * @option poison_r <region> ＠region:Poisonous Swamp
 * @value poison_r
 * @option rain_fog_w <weather> ＠weather:Haze Rain
 * @value rain_fog_w
 * @option rain_w <weather> ＠weather:Rain
 * @value rain_w
 * @option rain_w2 <weather> ＠weather:Heavy Rain
 * @value rain_w2
 * @option rain_w3 <weather> ＠weather:Downpour
 * @value rain_w3
 * @option ripple_r <region> ＠region:Puddle Ripples
 * @value ripple_r
 * @option snow_w <weather> ＠weather:Snow Flurry
 * @value snow_w
 * @option snow_w2 <weather> ＠weather:Snow Crystal
 * @value snow_w2
 * @option sparks_w <weather> ＠weather:Sparks
 * @value sparks_w
 * @option thunder_w <weather> ＠weather:Thunder(Purple)
 * @value thunder_w
 * @option thunder_w2 <weather> ＠weather:Thunder(Yellow)
 * @value thunder_w2
 *
 * @arg z
 * @text Z Value
 * @desc Order of overlapping, such as above, below, screen, spriteset. Value can be specified.
 * @default def
 *
 * @arg tag
 * @text Management tag
 * @desc Tag name for management.
 *
 * @arg edit
 * @text Edit mode
 * @desc Opens editor when turned ON. (Only available during playtest)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _Delay
 * @desc If set to 1 or more, the command will be executed after the specified frame.
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command set_hidden
 * @text set/Display > Hide(/h)(7)
 * @desc Display Particles
 *
 * @arg id
 * @text ManagementID
 * @desc The ManagementID must be unique. [def]for setting name.[-EID] adds -EID at the end of setting name. 
 * @default def
 *
 * @arg target
 * @text Target
 * @desc [this] specifies an event. Such as "event:eventID" "player" "weather".
 * @default this
 *
 * @arg name
 * @text <<Data Name>>
 * @desc When set to def, the managementID is used as the data name.(When displaying the same data name with the same priority multiple times, the managementID should be separated.)
 * @default <<Select a setting to open>>
 * @type select
 *
 * @arg z
 * @text Z Value
 * @desc Order of overlapping, such as above, below, screen, spriteset. Value can be specified.
 * @default def
 *
 * @arg tag
 * @text Management tag
 * @desc Tag name for management.
 *
 * @arg edit
 * @text Edit mode
 * @desc Opens editor when turned ON. (Only available during playtest)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _Delay
 * @desc If set to 1 or more, the command will be executed after the specified frame.
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command play_character
 * @text play/replay once > character subject(16)
 * @desc Replay particle once
 *
 * @arg id
 * @text ManagementID
 * @desc The ManagementID must be unique. [def]for setting name.[-EID] adds -EID at the end of setting name.
 * @default def
 *
 * @arg target
 * @text Target
 * @desc [this] specifies an event. Such as "event:eventID" "player" "weather".
 * @default this
 *
 * @arg name
 * @text <<Data Name>>
 * @desc When set to def, the managementID is used as the data name.(When displaying the same data name with the same priority multiple times, the managementID should be separated.)
 * @default <<Select a setting to open>>
 * @type select
 * @option aura_bp <character> @character:Omnidirectional Light Diffusion
 * @value aura_bp
 * @option aura_bp2 <character> @character:Pale Blue Circle Aura
 * @value aura_bp2
 * @option bubble_cp <character> @character:Bubble Burst
 * @value bubble_cp
 * @option drag <character> @drag:Mouse drag
 * @value drag
 * @option explode_cp_1 <character> @character:Convergence before explosion
 * @value explode_cp_1
 * @option explode_cp_2 <character> @character:Flame of Explosion
 * @value explode_cp_2
 * @option explode_cp_3 <character> @character:Dissipation at explosion
 * @value explode_cp_3
 * @option explode_cp_4 <character> @character:Flickering after explosion
 * @value explode_cp_4
 * @option fireworks_c <character> @character:Firework
 * @value fireworks_c
 * @option fuss_c <character> @character:Cartoon Smoke during brawl
 * @value fuss_c
 * @option fuss_startdash <startdash> @startdash:Cartoon Smoke(Puff)
 * @value fuss_startdash
 * @option light_float_cp <character> @character:Overhead Light Pillar
 * @value light_float_cp
 * @option monster_cp <character> @character:Particle convergence
 * @value monster_cp
 * @option monster_cp2 <character> @character:Radiating Lines
 * @value monster_cp2
 * @option orb_cp <character> @character:Bursting Sparkles
 * @value orb_cp
 * @option warp_red_cp <character> @character:Geometric effect after teleportation
 * @value warp_red_cp
 *
 * @arg z
 * @text Z value
 * @desc Order of overlapping, such as above, below, screen, spriteset. Value can be specified.
 * @default def
 *
 * @arg tag
 * @text Management tag
 * @desc Tag name for management.
 *
 * @arg edit
 * @text Edit mode
 * @desc Opens editor when turned ON. (Only available during playtest)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _Delay
 * @desc If set to 1 or more, the command will be executed after the specified frame.
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command play_system
 * @text play/replay once > mouse/tap(2)
 * @desc Replay particle once
 *
 * @arg id
 * @text ManagementID
 * @desc The ManagementID must be unique. [def]for setting name.[-EID] adds -EID at the end of setting name.
 * @default def
 *
 * @arg target
 * @text Target
 * @desc [this] specifies an event. Such as "event:eventID" "player" "weather".
 * @default this
 *
 * @arg name
 * @text <<Data Name>>
 * @desc When set to def, the managementID is used as the data name.(When displaying the same data name with the same priority multiple times, the managementID should be separated.)
 * @default <<Select a setting to open>>
 * @type select
 * @option click <click> @click:click/tap1
 * @value click
 * @option click2 <click> @click:click/tap2
 * @value click2
 *
 * @arg z
 * @text Z value
 * @desc Order of overlapping, such as above, below, screen, spriteset. Value can be specified.
 * @default def
 *
 * @arg tag
 * @text Management tag
 * @desc Tag name for management.
 *
 * @arg edit
 * @text Edit mode
 * @desc Opens editor when turned ON. (Only available during playtest)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _Delay
 * @desc If set to 1 or more, the command will be executed after the specified frame.
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command play_hidden
 * @text play/replay once > Hide(/h)(2)
 * @desc Replay particle once
 *
 * @arg id
 * @text ManagementID
 * @desc The ManagementID must be unique. [def]for setting name.[-EID] adds -EID at the end of setting name.
 * @default def
 *
 * @arg target
 * @text Target
 * @desc [this] specifies an event. Such as "event:eventID" "player" "weather".
 * @default this
 *
 * @arg name
 * @text <<Data Name>>
 * @desc When set to def, the managementID is used as the data name.(When displaying the same data name with the same priority multiple times, the managementID should be separated.)
 * @default <<Select a setting to open>>
 * @type select
 *
 * @arg z
 * @text Z value
 * @desc Order of overlapping, such as above, below, screen, spriteset. Value can be specified.
 * @default def
 *
 * @arg tag
 * @text Management tag
 * @desc Tag name for management.
 *
 * @arg edit
 * @text Edit mode
 * @desc Opens editor when turned ON. (Only available during playtest)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _Delay
 * @desc If set to 1 or more, the command will be executed after the specified frame.
 * @default 0
 * @type number
 * @min 0
 *
 *
 *
 *
 * @command group_character
 * @text group/group > character subject(1)
 * @desc Open Group
 * @arg id
 * @text Group ManagementID
 * @desc The Group ManagementID must be unique. [def]for setting name.[-EID] adds -EID at the end of setting name.
 * @default def
 * @arg target
 * @text Target
 * @desc Target such as this,player,weather.
 * @default this
 * @arg name
 * @text <<Group Setting Name>>
 * @desc Setting name of the group to open
 * @type select
 * @default <<Select a setting to open>>
 * @option fireworks <character> @Firework
 * @value fireworks
 * @arg tag
 * @text Management Tag
 * @desc Tag name for management. Shorten with [group:groupID]
 * @arg edit
 * @text Edit Mode
 * @desc Opens editor when turned ON. (Only available during playtest)
 * @default false
 * @type boolean
 * @arg delay
 * @text _Delay
 * @desc If set to 1 or more, the command will be executed after the specified frame.
 * @default 0
 * @type number
 * @min 0
 * @command group_screen
 * @text group/group > screen/weather/region(34)
 * @desc Open Group
 * @arg id
 * @text Group ManagementID
 * @desc The Group ManagementID must be unique. [def]for setting name.[-EID] adds -EID at the end of setting name.
 * @default def
 * @arg target
 * @text Target
 * @desc Target such as this,player,weather.
 * @default this
 * @arg name
 * @text <<Group Setting Name>>
 * @desc Setting name of the group to open
 * @type select
 * @default <<Select a setting to open>>
 * @option commet <weather> @Starry sky and Comet
 * @value commet
 * @option firefly <region> @Firefly
 * @value firefly
 * @option light_green_w1 <weather> Drifting light:Green 1
 * @value light_green_w1
 * @option light_green_w2 <weather> Drifting light:Green 2
 * @value light_green_w2
 * @option light_green_w3 <weather> Drifting light:Green 3
 * @value light_green_w3
 * @option light_black_w1 <weather> Drifting light:Black 1
 * @value light_black_w1
 * @option light_black_w2 <weather> Drifting light:Black 2
 * @value light_black_w2
 * @option light_black_w3 <weather> Drifting light:Black 3
 * @value light_black_w3
 * @option light_ash_w1 <weather> Drifting light:Ash 1
 * @value light_ash_w1
 * @option light_ash_w2 <weather> Drifting light:Ash 2
 * @value light_ash_w2
 * @option light_ice_w1 <weather> Drifting light:Ice 1
 * @value light_ice_w1
 * @option light_ice_w2 <weather> Drifting light:Ice 2
 * @value light_ice_w2
 * @option light_ice_w3 <weather> Drifting light:Ice 3
 * @value light_ice_w3
 * @option light_red_w1 <weather> Drifting light:Red 1
 * @value light_red_w1
 * @option light_red_w2 <weather> Drifting light:Red 2
 * @value light_red_w2
 * @option light_red_w3 <weather> Drifting light:Red 3
 * @value light_red_w3
 * @option light_blue_w1 <weather> Drifting light:Blue 1
 * @value light_blue_w1
 * @option light_blue_w2 <weather> Drifting light:Blue 2
 * @value light_blue_w2
 * @option light_blue_w3 <weather> Drifting light:Blue 3
 * @value light_blue_w3
 * @option light_white_w1 <weather> Drifting light:White 1
 * @value light_white_w1
 * @option light_white_w2 <weather> Drifting light:White 2
 * @value light_white_w2
 * @option light_white_w3 <weather> Drifting light:White 3
 * @value light_white_w3
 * @option light_purple_w1 <weather> Drifting light:Purple 1
 * @value light_purple_w1
 * @option light_purple_w2 <weather> Drifting light:Purple 2
 * @value light_purple_w2
 * @option light_purple_w3 <weather> Drifting light:Purple 3
 * @value light_purple_w3
 * @option light_gold_w1 <weather> Drifting light:Gold 1
 * @value light_gold_w1
 * @option light_gold_w2 <weather> Drifting light:Gold 2
 * @value light_gold_w2
 * @option light_gold_w3 <weather> Drifting light:Gold 3
 * @value light_gold_w3
 * @option light_monochrome_w1 <weather> Drifting light:B&W 1
 * @value light_monochrome_w1
 * @option light_monochrome_w2 <weather> Drifting light:B&W 2
 * @value light_monochrome_w2
 * @option light_monochrome_w3 <weather> Drifting light:B&W 3
 * @value light_monochrome_w3
 * @option light_rainbow_w1 <weather> Drifting light:Rainbow 1
 * @value light_rainbow_w1
 * @option light_rainbow_w2 <weather> Drifting light:Rainbow 2
 * @value light_rainbow_w2
 * @option light_rainbow_w3 <weather> Drifting light:Rainbow 3
 * @value light_rainbow_w3
 * @arg tag
 * @text Management tag
 * @desc Tag name for management. Shorten with [group:groupID]
 * @arg edit
 * @text Edite mode
 * @desc Opens editor when turned ON. (Only available during playtest)
 * @default false
 * @type boolean
 * @arg delay
 * @text _Delay
 * @desc If set to 1 or more, the command will be executed after the specified frame.
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @requiredAssets img/particles/dust4
 * @requiredAssets img/particles/dust2
 * @requiredAssets img/particles/dust3
 * @requiredAssets img/particles/dust1
 * @requiredAssets img/particles/dust4g
 * @requiredAssets img/particles/dust2g
 * @requiredAssets img/particles/dust1g
 * @requiredAssets img/particles/dust3g
 * @requiredAssets img/particles/particle7
 * @requiredAssets img/particles/particle9
 * @requiredAssets img/particles/particle8
 * @requiredAssets img/particles/particle1
 * @requiredAssets img/particles/leaf1g
 * @requiredAssets img/particles/shine2
 * @requiredAssets img/particles/shine_thin1g
 * @requiredAssets img/particles/shine_thin3
 * @requiredAssets img/particles/flare
 * @requiredAssets img/particles/line_ray2
 * @requiredAssets img/particles/particle5
 * @requiredAssets img/particles/line_oval1
 * @requiredAssets img/particles/shine3
 * @requiredAssets img/particles/line_oval3
 * @requiredAssets img/particles/snow_particle2g
 * @requiredAssets img/particles/circle3g
 * @requiredAssets img/particles/cloud3
 * @requiredAssets img/particles/snow_particle2
 * @requiredAssets img/particles/snow_particle1
 * @requiredAssets img/particles/bubble1
 * @requiredAssets img/particles/heart4g
 * @requiredAssets img/particles/circle
 * @requiredAssets img/particles/cloud2
 * @requiredAssets img/particles/cloud1
 * @requiredAssets img/particles/smoke2
 * @requiredAssets img/particles/cloud2s
 * @requiredAssets img/particles/particle2
 * @requiredAssets img/particles/smog1
 * @requiredAssets img/particles/circle2
 * @requiredAssets img/particles/smog2
 * @requiredAssets img/particles/smoke1
 * @requiredAssets img/particles/flame1g
 * @requiredAssets img/particles/fish1
 * @requiredAssets img/particles/flare2
 * @requiredAssets img/particles/cartoon_fuss2
 * @requiredAssets img/particles/cartoon_fuss1
 * @requiredAssets img/particles/flame1
 * @requiredAssets img/particles/particle4
 * @requiredAssets img/particles/hexagon_line3
 * @requiredAssets img/particles/hexagon1
 * @requiredAssets img/particles/line2
 * @requiredAssets img/particles/line_oval2
 * @requiredAssets img/particles/ripple1g
 * @requiredAssets img/particles/petal1
 * @requiredAssets img/particles/line_rain2
 * @requiredAssets img/particles/line_rain1
 * @requiredAssets img/particles/ripple2
 * @requiredAssets img/particles/snow2
 * @requiredAssets img/particles/snow5g
 * @requiredAssets img/particles/thunder1
 * @requiredAssets img/particles/thunder2
 * @requiredAssets img/particles/square_line1
 */
//=============================================================================
//PRAGMA_END: englishHeader

var $dataTrpParticlePreset, $dataTrpParticleGroupsPreset;


var TRP_Localize = TRP_Localize || function () { };
var TRP_LocalizeString = TRP_LocalizeString || function (...args) { this._value = null; this._args = args };
(() => {
	if (TRP_Localize.localize) return;
	TRP_LocalizeString.prototype = new String();
	TRP_LocalizeString.prototype.toString = TRP_LocalizeString.prototype.valueOf = TRP_LocalizeString.prototype.toJSON = function () {
		if (this._value === null) {
			this._value = TRP_Localize.localize(...this._args);
			for (let i = 0; i < this._value.length; i = (i + 1) | 0) {
				this[i] = this._value[i];
			}
		}
		return this._value.toString();
	};
	TRP_Localize.localize = function (symbol, original, id) {
		if (!$gameSystem) return new TRP_LocalizeString(symbol, original, id);

		if ($gameSystem && $gameSystem.isJapanese()) return original;
		return this.DATA[symbol][id] || this.DATA.duplication[original] || original;
	};
	TRP_Localize.noLocalize = function (original, id, translated) {
		if ($gameSystem && $gameSystem.isJapanese()) return original;
		return translated || original;
	};
	//PRAGMA: localizeData
	TRP_Localize.DATA = {
		"duplication": { "<中間値設定可能>": "<Median value is configurable>", "左端が開始時(時間0)、右端が終了時(時間1)の値": "Left value=start time (time 0); Right value=end time (time 1).", "@時間(0~1) + Enterで中間値を設定可能": "@time(0~1)+ Enter to set the median value", "delete(Macはfn+delete)で中間値の削除": "Delete median value with delete (fn + delete on Mac)", "中間値編集中にshift+@時間(0~1)+Enterで時間変更": "Change time with Shift+@time(0~1)+Enter while editing median value", "例)@0.5 + Enterで中間地点での値を設定開始": "E.g.) Start setting the value at the median point with @0.5+Enter", "　 0.5*0.1=0.05から0.5の間の": "", "<※発生方法はいずれか１つのみ指定が有効>": "<Only one of the generation methods can be specified>", "パーティクル数:": "Number of particles:", "↑↓キー、マウスホイールでスクロール": "Use Up, Down keys/mouse wheel to scroll", "決定キー、リスト外クリックで選択終了": "Press Enter/click outside the list to end selection", "長押しクリックで複数<=>単体選択切り替え": "Press & hold to switch between multiple and single selections", "←→キー、カテゴリー切り替え": "Use Left/Right keys to switch Category", "パーティクル表示コマンドの対象が設定されてません。": "The subject for the particle display command is not set.", },
		"parMa": { "4": "Particle setting data with the setting name:%1 does not exist.", "6": "", "7": "The subject scene has not been registered. (subject:%1)", "8": "There is an error in the particle's subject value.", "11": "Particles with management ID:% 1 are not playing.", "12": "The subject type is invalid.", "13": "", "14": "Maximum amount is restricted!", },
		"parEd": { "0": "[Alpha/Opacity]", "1": "Range of Value:0~1", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "[Scale/Magnification]", "9": "1x", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "[Minimum Scale Magnification]", "17": "The minimum scale magnification when generating particles", "18": "E.g.) If the scale is 0.5 when the starting magnification is set to 0.1", "19": "Particles with random scale (0.5*0.1=between 0.05 to 0.5) are generated", "20": "　", "21": "[Speed/Velocity]", "22": "Particle velocity. The starting value should not be 0.", "23": "", "24": "", "25": "", "26": "", "27": "", "28": "", "29": "[Minimum Speed Rate]", "30": "Minimum speed for when specifying the range of particle generation", "31": "E.g.) When the starting speed is set to 0.5 and the particle generation speed is set to 0.", "32": "Particles with random speed (0.5*0.1=between 0.05 to 0.5) are generated", "33": "　", "34": "[Color]", "35": "Select color with the color picker on the upper left", "36": "Reset to white with Backspace (delete on Mac)", "37": "", "38": "", "39": "", "40": "", "41": "", "42": "", "43": "[Color Mode]", "44": "0=Color changes over time", "45": "Change the particle color distribution with value other than 0", "46": "[Acceleration]", "47": "When acceleration is enabled, the image orientation is fixed in the moving direction", "48": "[Particle Emittance Angle]", "49": "The angle at which the particles are emitted. (Image orientation is linked)", "50": "0 for Right, 90 for Down, 180 for Left, 270(-90) for Up", "51": "[Image Rotation Speed]", "52": "The minimum and maximum values for image rotation speed.", "53": "No impact on movement.", "54": "[Image Display Settings]", "55": "Image orientation/reverse settings. No impact on movement.", "56": "angle:0~360 rotates only the image, -1 rotates to a random angle", "57": "mirror: 0 for no adjustment, 1 for reversal, 2 for random.", "58": "[Particle Life Time]", "59": "The number of seconds it takes for individual particles to vanish", "60": "[Frequency]", "61": "Particle generation frequency", "62": "When value is set to 0.01, particles will be generated every 0.01 seconds, 100 times per second", "63": "[Occurrence Probability]", "64": "Particle generation probability at each generation timing.", "65": "[Number of particles produced at once]", "66": "Number of particles produced simultaneously at each particle generation.", "67": "Simultaneously generated particles have fixed lifetime", "68": "[Emitter Life]", "69": "-1 for infinite. When set to a value greater than 0, ends in the specified time", "70": "[Limitation on max number of particles displayed]", "71": "Limiting value for the max number of particles produced by this emitter", "72": "[Fluctuation]", "73": "Setting for angle fluctuation.", "74": "max:Maximum value for the fluctuation in each frame", "75": "sensitivity:specify with 0~1. The smaller the more gently it swings; the larger it is, the more wildly it swings.", "76": "[Point (particle generation)]", "77": "Generates from a specified point.", "78": "", "79": "[Rect (particle generation)]", "80": "Randomly generated from within the rectangle.", "81": "Adjust upper left point with x,y; adjust width, height with {width, height}", "82": "", "83": "[Circle (particle generation)]", "84": "Randomly generated from within the circle", "85": "Adjust center point with x, y; specify radius with {radius}", "86": "", "87": "[Ring (particle generation)]", "88": "Randomly generated from within the ring.", "89": "Adjust center point with x,y; outer radius with {radius}", "90": "Specify inner radius with {minR}", "91": "", "92": "[Burst (particle generation)]", "93": "Generate regularly with {particlesPerWave}", "94": "ps:Difference in emission angle (particleSpacing)", "95": "sa:Start angle. Particles are emitted radially when ps*sa=360 (startAngle)", "96": "dt:Difference in emission time(deltaTime)", "97": "rt:0=Ignore start angle(startRotation)", "98": "└ 1=Prioritize start angle, 2=Add start angle(rotationType)", "99": "r:radius(radius)", "100": "dr:difference in radius per lap (deltaRadius) ", "101": "dx:difference of x (deltaX)", "102": "dy:difference of y (deltaY)", "103": "", "104": "[Sub-emitter Setting]", "105": "st:emission start timing(0~1)", "106": "et:emission end timing(0~1)", "107": "spd:Inertia influence degree. 0=no influence, 1=100% influence", "108": "iAngle:1=Start angle based on inertial direction", "109": "iScale:1=Inherit main particle magnification", "110": "[Blend mode/Image composition method]", "111": "ManagementID[% 1] is not played", "113": "Save&End", "114": "Save", "115": "Select Image", "116": "Select Tile", "117": "Select Animation", "118": "Preset", "119": "Load", "120": "End", "121": "", "122": "List of self-made particle settings", "142": "", "143": "", "144": "", "145": "Selection is available from only one tile set", "146": "", "147": "Use Left/Right keys to switch tile sets", "148": "", "149": "", "150": "Selection is available from only one animation image", "151": "", "152": "Use Left/Right keys to switch images", "153": "Search for the first letter using keyboard", "154": "", "155": "", "156": "Press Shift to switch to monotone", "157": "(Monotone will be reflected after closing the picker)", "158": "Character subject", "162": "Hide(/h)", "163": "Load the preset settings.", "164": "", "165": "", "166": "", "167": "《Filter=play》", "168": "《Filter=none》", "169": "《Filter=set》", "171": "(Today)-", "172": "(Yesterday)-", "173": "days ago)-", "174": "Copy the saved data settings.", "175": "Use mouse wheel to scroll", "176": "", "177": "", "178": "The subject is the subject that was chosen at the time of editing (for reference).", "179": "Delete data with delete key (fn + delete for mac)", "180": "(Data deletion will be confirmed when the data is saved)", "181": "Use Up/Down keys to select data", "123": "\n * @text set/display", "124": "\n * @desc Displays particles", "125": "\n * @text play/replay once > character subject", "126": "\n * @desc Replay particle once", "127": "\n * @text ManagementID", "128": "\n * @desc The ManagementID must be unique. (Adding -EID at the end replaces EID with the eventID)", "129": "\n * @arg target", "130": '\n * @desc [this] specifies an event. Such as "event:eventID" "player" "weather"', "131": "\n * @text Data name", "132": "\n * @desc When set to def, the managementID is used as the data name.(When displaying the same data name multiple times, separate the managementIDs.)", "133": "\n * @default <<Select a setting to open>>", "134": "\n * @text Z value", "135": "\n * @desc Order of overlapping, such as above, below, screen, spriteset. Value can be specified.", "136": "\n * @text Management tag", "137": "\n * @desc Tag name for management", "138": "\n * @text _Edit mode", "139": "\n * @desc Opens editor when turned ON. (Only available during playtest)", "140": "\n * @text _Delay", "141": "\n * @desc If set to 1 or more, the command will be executed after the specified frame.", },
		"parGr": { "0": "Group setting data with setting name: %1 does not exist.", "2": "", },
		"parGe": { "0": "[Command repetition setting]", "1": "-1:No repetition", "2": "0 or more:Number of wait frames until it repeats", "3": "ctrl/cmd+C:copy entire group", "4": "[Commands]", "5": "Input command without {particle}", "6": "Enter:Reflect command", "7": "Shift + Left(Right):Go to the beginning (end)of the line", "8": "alt/opt + Left(Right):Go to previous (next) item", "9": "alt/opt + Up(Down):Insert command above (below)", "10": "alt/opt + E (S|P):to switch edit(set, play)", "11": "Shift+alt/opt+P:Change setting name from preset", "12": "Shift+alt/opt+L:Change setting name from saved data", "14": "\n * @text group/group > character subject", "15": "\n * @desc Open Group", "16": "\n * @text Group ManagementID", "17": "\n * @desc The Group ManagementID must be unique. [def]for setting name.[-EID] adds -EID at the end of setting name.", "18": "\n * @text Target", "19": "\n * @desc Target such as this,player,weather.", "20": "\n * @text <<Group Setting Name>>", "21": "\n * @desc Setting name of the group to open", "22": "\n * @default <<Select a setting to open>>", "23": "\n * @text Management tag", "24": "\n * @desc Tag name for management. Shorten with [group:groupID]", "25": "\n * @text Edit mode", "26": "\n * @desc Opens editor when turned ON. (Only available during playtest)", "40": "\n * @text _Delay", "41": "\n * @desc If set to 1 or more, the command will be executed after the specified frame.", },
		"preWa": { "0": "This map is a sample map for additional presets.", "1": "Please retry after installing the plug-in if you have [TRP_ParticleMZ_ExPreset2.js].", },
		"parPr": { "41": "character:Omnidirectional Light Diffusion", "42": "character:Pale Blue Circle Aura", "78": "character:Foggy Aura", "80": "weather:Black Particles", "25": "weather:Blizzard", "5": "character:Circular Aura[attach]recommended", "4": "character:Bubble Burst", "3": "weather:Underwater bubbles", "79": "weather:Heart", "0": "click:Mouse click/Tap 1", "1": "click:Mouse click/Tap 2", "67": "weather:Cloud shadow", "66": "weather:Cloud", "33": "region:Light that glitters up from hole", "34": "region:Linear light glowing up from hole", "35": "region:Haze in the hole", "37": "screen:Vision Restriction with Darkness", "28": "weather:Diamond dust twinkle", "29": "weather:Diamond dust twinkle2", "2": "drag:Mouse drag", "56": "walk:Cloud of Dust", "17": "character:Convergence before explosion", "18": "character:Flame of Explosion", "19": "character:Dissipation at explosion", "20": "character:Flickering after explosion", "15": "character:Big Flame", "53": "character:Fire Pillar", "21": "character:Firework", "22": "character:Firework2", "8": "weather:Fish shadow", "63": "screen:Solar Flare", "62": "screen:Solar Flash", "58": "walk:Flower Footsteps(using tiles)", "65": "weather:Shadow of Fog", "7": "weather:Fog", "64": "weather:Thick Fog", "61": "character:Cartoon Smoke during brawl", "54": "startdash:Cartoon Smoke(Puff)", "55": "walk:Cartoon Smoke", "57": "walk:Scattering Grass", "30": "weather:Christmas Lights", "32": "character:Sparkle", "48": "character:Overhead Light Pillar", "44": "region:Sparkly Particles", "24": "screen:Pale Light", "31": "screen:Blue&Green Pale Light", "43": "region:Pillar of light in the sky area", "6": "weather:Light pillar. For side-scroll maps.", "82": "region:Test1", "50": "character:Geometric effect on magic circle", "11": "region:Magma Ground", "9": "character:Glitter on magic circle", "10": "character:Ray of light on magic circle", "40": "character:Balls of light flying upwards", "38": "character:Particle convergence", "39": "character:Radiating Lines", "46": "character:Orb Vibration Effect", "47": "character:Bursting Sparkles", "81": "test", "45": "weather:Light particles swaying and rising", "75": "weather:Cherry Blossom", "36": "region:Poisonous Swamp", "72": "weather:Haze Rain", "68": "weather:Rain", "69": "weather:Heavy Rain", "70": "weather:Downpour", "71": "region:Puddle Ripples", "60": "walk:Water Ripples", "14": "character:Bonfire Smoke", "16": "character:Large Smoke for [fire]", "26": "weather:Snow Flurry", "27": "weather:Snow Crystal", "13": "character:Bonfire Sparks", "12": "weather:Sparks", "59": "walk:Water Splash", "49": "character:Light particles from stone statue's orb", "73": "weather:Thunder(Purple)", "74": "weather:Thunder(Yellow)", "51": "character:Magic circle teleportation effect", "52": "character:Geometric effect after teleportation", "83": "Starry sky and Comet", "84": "Firefly", "85": "Fireworks", },
	};
	//PRAGMA_END: localizeData
})();

(() => {
	'use strict';

	$dataTrpParticlePreset = {};



	var LC = TRP_Localize.localize.bind(TRP_Localize, 'parPr');
	var NLC = TRP_Localize.noLocalize;
	$dataTrpParticlePreset = {
		//システム用
		click: [[[0, 1, 0.85, 0.5, 1, 0], 0, 0], [[0, 1.5, 0.5, 1, 1, 0], 0.5, 0, 0], [[0, 200, 1, 200], 0.5, 0, 0], [[0, "#0031ff", 0.25, "#eaff00", 0.5, "#00ff04", 0.75, "#7b00ff", 1, "#ff0000"], 0, 0], 1, [0, 300], 0, [0, 360], [0, 0], 0, 0, [0.4, 0.6], 1, 0.001, 1, 1, 0.01, 1000, [0, 0], 0, [0, 0], null, null, 0, 0, "particle1", 12,
		LC("click:マウスクリック/タップ用1", 0)],
		click2: [[[0, 0.2, 1, 0], 0, 0], [[0, 0, 0.25, 0.75, 1, 1.5], 1, 0, 0], [[0, 0, 1, 0], 1, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [0, 360], [0, 0], 0, 0, [0.35, 0.35], null, 0.001, 1, 1, 0.0011, 10000, [0, 0], 0, [0, 0], null, null, 0, 0, "circle", 12,
		LC("click:マウスクリック/タップ用2", 1)],
		drag: [[[0, 1, 1, 1], 0, 0], [[0, 1, 0.85, 0.5, 1, 0], 0.999, 0, 0], [[0, 0, 1, 0], 1, 0, 0], [[0, "#96abff", 1, "#172eff"], 0, 0], 0, [0, 0], 0, [0, 360], [0, 0], 0, 0, [0.3, 0.3], 1, 0.0005, 1, 0, 0.0011, 10000, [0, 0], 0, [0, 0], null, null, 0, 0, "particle2", 13,
		LC("drag:マウスドラッグ用", 2)],

		//水中マップ
		bubble_w: [[[0, 0, 0.2, 0.6, 0.95, 0.6, 1, 0], 0, 0], [[0, 0, 0.2, 0.3, 0.95, 0.7, 1, 0.8], 0.4, 0, 0], [[0, 1, 0.2, 50, 1, 50], 0.5, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [-90, -90], [0, 0], 0, 0, [1, 3], null, 0.2, 1, 0, -1, 10000, [0, 0], 1, [0, 0], [-408, -312, 816, 624], null, 0, 0, "bubble1", 6,
		LC("天候:水中の泡", 3)],
		bubble_cp: [[[0, 0, 0.2, 0.6, 0.9, 0.6, 1, 0], 0, 0], [[0, 0, 0.2, 0.2, 0.9, 0.2, 1, 0.3], 0.1, 0, 0], [[0, 1, 0.2, 100, 1, 100], 0.5, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [-90, -90], [0, 0], 0, 0, [1, 3], null, 0.05, 1, 0, 1, 10000, [0, 0], 1, [0, 0], [-24, 0, 48, 0], null, 0, 0, "bubble1", 0,
		LC("キャラ:穴から吹き出す泡", 4)],
		bubble_c: [[[0, 0, 0.5, 0.7, 1, 0], 0, 0], [[0, 1, 1, 1.3], 1, 0, 0], [[0, 1, 1, 1], 1, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [-90, -90], [0, 0], 0, 0, [1, 1], null, 0.5, 1, 0, -1, 10000, [0, 0], 2, [0, 0], null, [0, -26, 3, 0], 0, 0, "bubble1", 3,
		LC("キャラ:キャラを包む泡。attach推奨", 5)],
		light_pillar_w: [[[0, 0.5, 1, 0.51], 0, 0], [[0, 4, 1, 4.01], 2, 0, 0], [[0, 1, 1, 1], 1, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [90, 90], [0, 0], 0, 0, [99999, 99999], 1, 0.001, 1, 1, -1, 12, [0, 0], 1, [0, 0], [-616, -500, 1232, 300], null, 0, 0, "line_oval1", 6,
		LC("天候:上部からの光柱。横スク用マップ用", 6)],
		fog_w: [[[0, 0, 0.05, 0.05, 0.9, 0.05, 1, 0], 0, 0], [[0, 4, 0.5, 4, 1, 4], 0.3, 0, 0], [[0, 70, 1, 70], 0.3, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 1, [0, 0], 0, [0, 0], [0, 0], 0, 0, [30, 30], 1, 0.3, 1, 0, -1, 10000, [0, 0], 1, [0, 0], [-508, -312, 0, 624], null, 0, 0, "cloud3,cloud2,cloud1", 6,
		LC("天候:薄いフォグ", 7)],
		fish_w: [[[0, 0, 0.1, 0.4, 0.9, 0.4, 1, 0], 0, 0], [[0, 1.01, 1, 1], 0.3, 0, 0], [[0, 130, 0.2, 180, 0.4, 60, 0.6, 120, 0.8, 180, 1, 60], 0.5, 0, 0], [[0, "#000000", 1, "#000000"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 0, [10, 10], 2, 1, 1, 0, -1, 10000, [1, 0.01], 1, [0, 0], [-500, -312, 50, 624], null, 0, 0, "fish1", 6,
		LC("天候:水中の影", 8)],
		mahoujin_c: [[[0, 0, 0.1, 1, 0.2, 0, 0.3, 1, 0.4, 0, 0.5, 1, 0.6, 0, 0.7, 0, 0.8, 1, 0.9, 0, 1, 0], 0, 0], [[0, 0, 0.2, 0.2, 0.5, 0.2, 1, 0], 0.5, 0, 0], [[0, 1, 1, 1], 1, 0, 0], [[0, "#56ff89", 0.5, "#52fffc", 1, "#b3ff25"], 0, 0], 1, [0, -100], 0, [0, 0], [0, 0], 0, 0, [1, 1], 1, 0.03, 1, 0, -1, 10000, [0, 0], 3, [0, 0], null, [0, -18, 40, 0], 0, 0, "particle2", 0,
		LC("キャラ:魔法陣上のキラキラ光粒", 9)],
		mahoujin_c2: [[[0, 0, 0.5, 1, 1, 0], 0, 0], [[0, 0, 0.2, 1, 0.5, 1, 1, 0], 0.8, 0, 0], [[0, 1, 1, 1], 1, 0, 0], [[0, "#ff3287", 1, "#566dff"], 0, 0], 0, [0, -150], 0, [0, 0], [0, 0], 0, 0, [1, 1], 1, 0.04, 1, 0, -1, 10000, [0, 0], 3, [0, 0], null, [0, -60, 64, 0], 0, 0, "line2,line_oval2", 0,
		LC("キャラ:魔法陣上の光線演出", 10)],

		//火山マップ
		magma_r: [[[0, 1, 1, 0], 0, 0], [[0, 0, 0.2, 1.5, 0.8, 1.5, 1, 0], 0.5, 0, 0], [[0, 0, 1, 0], 1, 0, 0], [[0, "#ff3007", 0.5, "#ff5959", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [0, 360], [0, 0], 0, 0, [1, 1], 1, 0.1, 1, 0, -1, 1000, [0, 0], 0, [0, 0], null, null, 0, 0, "particle4", 7,
		LC("リージョン:マグマの床", 11)],
		sparks_w: [[[0, 1, 0.5, 1, 1, 0], 0, 0], [[0, 0, 0.1, 0.15, 0.5, 0.15, 1, 0], 0.5, 0, 0], [[0, 120, 1, 50], 0.3, 0, 0], [[0, "#ff2c00", 1, "#ffbfb1"], 0, 0], 0, [0, 0], 0, [-90, -90], [0, 0], 0, 2, [0.8, 1.5], 1, 0.1, 1, 0, -1, 10000, [3, 0.1], 1, [0, 0], [-408, -224, 816, 524], null, 0, 0, "flame1", 6,
		LC("天候:薄っすらと舞い上がる火の粉", 12)],
		sparks_c: [[[0, 1, 0.5, 1, 1, 0], 0, 0], [[0, 0, 0.5, 0.3, 1, 0], 0.5, 0, 0], [[0, 1, 1, 1], 0.5, 0, 0], [[0, "#ff5500", 1, "#ff8d54"], 0, 0], 0, [0, -100], 0, [-90, -90], [0, 0], 0, 2, [1, 1], 1, 0.1, 1, 0, -1, 10000, [0, 0], 1, [0, 0], [-18, -36, 36, 24], null, 0, 0, "flame1", 0,
		LC("キャラ:焚き火の火の粉", 13)],
		smoke_c: [[[0, 0, 0.5, 0.8, 1, 0], 0, 0], [[0, 1, 1, 0.8], 1, 0, 0], [[0, 1, 1, 100], 0.5, 0, 0], [[0, "#7b7b7b", 0.5, "#525252", 1, "#525252"], 0, 0], 0, [0, 0], 0, [-90, -90], [0, 0], 0, 0, [1.5, 2], 0, 0.3, 1, 0, -1, 10000, [0, 0], 0, [0, -64], null, null, 0, 0, "smoke1,smoke2", 0,
		LC("キャラ:焚き火の煙", 14)],
		fire_c: [[[0, 0, 0.2, 1, 0.5, 1, 1, 0], 0, 0], [[0, 0, 0.2, 1, 0.5, 1, 1, 0], 0, 0, 0], [[0, 1, 0.2, 250, 1, 150], 0.5, 0, 0], [[0, "#ff2e2e", 1, "#ffb92e"], 0, 0], 0, [0, 0], 0, [-90, -90], [0, 0], 0, 0, [1, 1], 1, 0.005, 0.5, 1, -1, 10000, [0, 0], 1, [0, 0], [-48, 12, 96, 0], null, 0, 0, "smog2,smoke2,smoke1", 0,
		LC("キャラ:大きな炎", 15)],
		smoke_c2: [[[0, 0, 0.5, 0.5, 1, 0], 0, 0], [[0, 0, 0.5, 3, 1, 1], 0.5, 0, 0], [[0, 1, 0.2, 250, 1, 150], 0.5, 0, 0], [[0, "#ffffff", 1, "#7b7b7b"], 0, 0], 1, [0, 0], 0, [-90, -90], [0, 0], 0, 0, [1, 1], 4, 0.01, 0.5, 1, -1, 10000, [0, 0], 2, [0, 0], null, [0, -36, 80, 0], 0, 0, "smoke2,smoke1,smog1", 0,
		LC("キャラ:fire用の大きな煙", 16)],
		explode_cp_1: [[[0, 0, 0.2, 0.5, 1, 0.5], 0, 0], [[0, 5, 0.4, 1, 1, 0], 1, 0, 0], [[0, 1, 0.3, 1, 1, 1], 1, 0, 0], [[0, "#ffffff", 1, "#ff7749"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 0, [0.24, 0.24], null, 0.01, 1, 1, 0.011, 1, [0, 0], 0, [0, -24], null, null, 0, 0, "circle2", 0,
		LC("キャラ:爆発前のサークル収束", 17)],
		explode_cp_2: [[[0, 1, 0.2, 1, 0.7, 1, 1, 0], 0, 0], [[0, 1, 0.15, 6, 0.3, 1, 0.45, 8, 0.6, 1, 0.8, 10, 1, 12], 0.1, 0, 0], [[0, 500, 0.3, 100, 1, 0], 0.3, 0, 0], [[0, "#ff7f7f", 1, "#ff7f30"], 0, 0], 0, [0, 0], 0, [0, 360], [0, 0], 0, 0, [0.3, 1], 1, 0.001, 1, 1, 0.03, 10000, [0, 0], 0, [0, -24], null, null, 0, 0, "smog1", 0,
		LC("キャラ:爆発の炎", 18)],

		explode_cp_3: [[[0, 0.6, 0.2, 0.4, 1, 0], 0, 0], [[0, 0, 0.18, 4, 1, 4.5], 1, 0, 0], [[0, 1, 0.3, 1, 1, 1], 1, 0, 0], [[0, "#ffffff", 1, "#ff7749"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 0, [1, 1], null, 0.04, 1, 0.05, 1, 1, [0, 0], 0, [0, -24], null, null, 0, 0, "circle2", 0,
		LC("キャラ:爆発時のサークル発散", 19)],
		explode_cp_4: [[[0, 0, 0.1, 0.8, 0.3, 0.8, 0.4, 0, 0.5, 0.8, 0.7, 0.8, 0.8, 0, 0.9, 0.8, 1, 0], 0, 0], [[0, 0.6, 1, 0.3], 0.3, 0, 0], [[0, 1, 1, 1], 1, 0, 0], [[0, "#ff7824", 0.5, "#ffffff", 1, "#ff1515"], 0, 0], 1, [0, 0], 0, [0, 360], [0, 0], 0, 0, [0.3, 0.7], 1, 0.005, 0.8, 1, 0.25, 100, [0, 0], 3, [0, 0], null, [0, -24, 130, 0], 0, 0, "circle2", 0,
		LC("キャラ:爆発後のチカチカする円", 20)],

		//花火マップ
		fireworks_c: [[[0, 0, 0.11, 1, 0.5, 1, 1, 0], 0, 0], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8, 0, 0], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1, 0, 0], [[0, "#ff8d8d", 0.4, "#ffffff", 1, "#ffa83e"], 0, 0], 1, [0, 0], 0, [0, 360], [50, -50], 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 0, [0, 0], null, null, 0, 0, "flare", 0,
		LC("キャラ:打ち上げ花火", 21)],
		fireworks_dragon_c: [[[0, 1, 0.8, 1, 1, 0], 0, 0], [[0, 0.2, 1, 0], 0.8, 0, 0], [[0, 800, 0.3, 200, 1, 0], 0.5, 0, 0], [[0, "#ff8d8d", 0.4, "#ffffff", 1, "#ffa83e"], 0, 0], 1, [0, 100], 0, [-75, -105], [50, -50], 0, 0, [0.7, 1], 1, 0.01, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, null, 0, 0, "smog2", 0,
		LC("キャラ:噴出タイプの花火", 22)],
		// fireworks_niagala_c:[[[0,1,0.8,1,1,0],0,0],[[0,0.3,0.8,0.15,1,0],0.8,0,0],[[0,10,1,350],1,0,0],[[0,"#ff8d8d",0.4,"#ffffff",1,"#ffa83e"],0,0],1,[0,0],0,[90,90],[50,-50],0,0,[0.7,1],1,0.003,1,1,-1,10000,[0,0],1,[0,0],[-120,-45,230,0],null,0,0,"smog2",0,
		// 	LC("キャラ:滝タイプの花火",23)],
		light_leak_s: [[[0, 0, 0.5, 0.1, 1, 0], 0, 0], [[0, 20, 1, 20], 0.2, 0, 0], [[0, 15, 1, 14], 0.5, 0, 0], [[0, "#00ff0c", 0.5, "#fff500", 1, "#ff5f5f"], 0, 0], 1, [0, 0], 0, [0, 0], [0, 0], 0, 0, [3, 5], 1, 0.15, 0.5, 0, -1, 10000, [2, 0.02], 1, [0, 0], [-408, -312, 816, 624], null, 0, 0, "particle4", 5,
		LC("スクリーン:淡いライトリーク", 24)],

		//雪マップ
		blizard_w: [[[0, 1, 0.8, 1, 1, 0], 0, 0], [[0, 0.41, 1, 0.4], 0.3, 0, 0], [[0, 2000, 1, 2000], 0.5, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [15, 30], [0, 0], 0, 0, [0.13, 0.13], 1, 0.001, 1, 5, -1, 10000, [0, 0], 1, [0, 0], [-408, -412, 916, 624], null, 0, 0, "snow_particle2,snow_particle1", 6,
		LC("天候:吹雪", 25)],
		snow_w: [[[0, 0, 0.2, 1, 1, 0], 0, 0], [[0, 0.2, 1, 0.2], 0.5, 0, 0], [[0, 100, 1, 100], 1, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [90, 90], [-100, 100], 0, 0, [20, 30], 1, 0.1, 1, 0, -1, 10000, [1, 0.01], 1, [0, 0], [-408, -440, 916, 40], null, 0, 0, "snow_particle1", 6,
		LC("天候:うっすらと降る雪", 26)],
		snow_w2: [[[0, 0, 0.3, 0.6, 1, 0], 0, 0], [[0, 0.31, 1, 0.3], 0.1, 0, 0], [[0, 50, 1, 50], 0.75, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [90, 90], [-50, 50], 0, 0, [5, 10], 1, 0.1, 1, 0, -1, 10000, [2, 0.01], 1, [0, 0], [-408, -412, 916, 624], null, 0, 0, "snow2,snow5g", 6,
		LC("天候:雪の結晶", 27)],
		diamonddust_w: [[[0, 0, 0.5, 1, 1, 0], 0, 0], [[0, 0.8, 1, 0.81], 0.2, 0, 0], [[0, 15, 1, 14], 0.5, 0, 0], [[0, "#b2f7ff", 1, "#d6ffe1"], 0, 0], 1, [0, 0], 0, [0, 360], [-120, 120], 0, 0, [1.2, 1.8], 1, 0.1, 1, 0, -1, 10000, [2, 0.02], 1, [0, 0], [-408, -312, 816, 624], null, 0, 0, "shine_thin3", 6,
		LC("天候:キラキラ漂うダイヤモンドダスト", 28)],
		diamonddust_w2: [[[0, 0, 0.5, 1, 1, 0], 0, 0], [[0, 0.6, 1, 0.61], 0.3, 0, 0], [[0, 15, 1, 14], 0.5, 0, 0], [[0, "#92ff7b", 1, "#89d7ff"], 0, 0], 1, [0, 0], 0, [0, 360], [-120, 120], 0, 0, [1, 1.5], 1, 0.03, 1, 0, -1, 10000, [2, 0.02], 1, [0, 0], [-408, -312, 816, 624], null, 0, 0, "shine_thin3", 6,
		LC("天候:キラキラ漂うダイヤモンドダスト2", 29)],
		illumination_w: [[[0, 0, 0.5, 1, 1, 0], 0, 0], [[0, 0.8, 1, 0.81], 0.2, 0, 0], [[0, 15, 1, 14], 0.5, 0, 0], [[0, "#e0ff14", 0.25, "#3c00ff", 0.5, "#ff4d00", 0.75, "#00bbff", 1, "#00ff45"], 0, 0], 1, [0, 0], 0, [0, 360], [-120, 120], 0, 0, [1.2, 1.8], 1, 0.03, 1, 0, -1, 10000, [2, 0.02], 1, [0, 0], [-408, -312, 816, 624], null, 0, 0, "shine_thin3,particle4,flare2", 6,
		LC("天候:カラフルなイルミネーション", 30)],
		light_leak_s2: [[[0, 0, 0.5, 0.3, 1, 0], 0, 0], [[0, 1, 1, 1], 0.3, 0, 0], [[0, 15, 1, 14], 0.5, 0, 0], [[0, "#92ff7b", 1, "#89d7ff"], 0, 0], 1, [0, 0], 0, [0, 360], [-120, 120], 0, 0, [2, 4], 1, 0.4, 1, 0, -1, 10000, [2, 0.02], 1, [0, 0], [-408, -312, 816, 624], null, 0, 0, "flare", 5,
		LC("スクリーン:青&緑のライトリーク", 31)],
		kira_blue_c: [[[0, 1, 0.5, 1, 1, 0], 0, 0], [[0, 1, 0.5, 1, 1, 0], 0.2, 0, 0], [[0, 60, 1, 0], 0.2, 0, 0], [[0, "#e0e6ff", 1, "#a3ffc8"], 0, 0], 0, [0, 0], 0, [-90, -90], [-90, 90], 0, 0, [0.5, 1], 1, 0.5, 1, 3, -1, 10000, [0, 0], 1, [0, 0], [-24, 0, 48, -48], null, 0, 0, "shine_thin3", 0,
		LC("キャラ:青いキラキラエフェクト", 32)],

		//闇マップ
		dark_hole_r: [[[0, 1, 0.1, 1, 0.15, 0, 0.2, 1, 0.4, 1, 0.45, 0, 0.5, 1, 0.8, 1, 0.84, 0, 0.88, 1, 0.92, 0, 0.96, 1, 1, 0], 0, 0], [[0, 0.35, 0.5, 0.25, 1, 0], 0.2, 0, 0], [[0, 200, 1, 100], 0.3, 0, 0], [[0, "#1a6dad", 1, "#a3ffc8"], 0, 0], 0, [0, 0], 0, [-90, -90], [0, 0], 0, 0, [0.5, 1.5], 0, 0.3, 1, 0, -1, 10000, [3, 0.01], 0, [0, 0], null, null, 0, 0, "shine2", 7,
		LC("リージョン:穴からキラキラ吹き上げる光", 33)],
		dark_hole_r_2: [[[0, 1, 0.5, 1, 1, 0], 0, 0], [[0, 1, 0.5, 1, 1, 0], 0.3, 0, 0], [[0, 200, 1, 100], 1, 0, 0], [[0, "#073f74", 1, "#78f4e1"], 0, 0], 0, [0, 0], 0, [-90, -90], [0, 0], 0, 0, [0.8, 0.8], 1, 0.1, 1, 0, -1, 10000, [0, 0], 0, [0, 0], null, null, 0, 0, "line_oval3", 7,
		LC("リージョン:穴から吹き上げる線形の光", 34)],
		dark_hole_r_3: [[[0, 0, 0.5, 0.3, 1, 0], 0, 0], [[0, 0, 0.5, 2, 1, 3], 0.5, 0, 0], [[0, 1, 1, 1], 1, 0, 0], [[0, "#00acff", 1, "#b70eff"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 2, [0.5, 1.5], 3, 0.5, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, null, 0, 0, "smoke2", 7,
		LC("リージョン:穴の中のもやもや", 35)],
		poison_r: [3, [[0, 0, 0.5, 0.5, 1, 0]], [[0, 0, 0.8, 0.4, 1, 0.5], 0.25], [[0, 1, 1, 1], 1], [[0, "#57005f", 1, "#69005d"]], 0, [0, 0], null, [-90, -90], [0, 0], 0, 0, [0.6, 1.2], 2, 0.5, 0.5, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "circle2", 7,
			LC("リージョン:毒の沼", 36)],
		darkness_s: [3, [[0, 0, 0.5, 0.8, 1, 0]], [[0, 8, 0.5, 8, 1, 8], 0.5], [[0, 1, 1, 1], 1], [[0, "#000000", 1, "#000000"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, [2, 2], 2, 0.04, 1, 1, -1, 10000, [0, 0], 3, [0, 0], [0, 0, 450, 400], 0, 0, "smoke2,cloud2s", 5,
			LC("スクリーン:暗闇の視界制限", 37)],
		monster_cp: [3, [[0, 0, 0.1, 1, 0.9, 1, 1, 0]], [[0, 5, 1, 0.3], 0.3], [[0, -220, 1, -220], 1], [[0, "#3714ff", 1, "#0022ff"]], 0, [0, 0], null, [0, 0], [0, 0], 0, 0, [0.3, 0.8], 1, 0.01, 1, 2, 0.4, 10000, [0, 0], 3, [0, 0], [0, -24, 100, 80], 0, 0, "particle4", 0,
			LC("キャラ:パーティクルが収束", 38)],
		monster_cp2: [3, [[0, 0, 0.3, 1, 1, 0]], [[0, 2.5, 0.3, 1, 1, 0.5], 0.8], [[0, 1200, 0.2, 200, 1, 0], 0.8], [[0, "#7b00ff", 1, "#c99bff"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, [0.4, 0.8], 1, 0.01, 1, 3, 0.1, 10000, [0, 0], 0, [0, -24], null, 0, 0, "line_oval2", 0,
			LC("キャラ:集中線が発散。", 39)],
		monster_c: [3, [[0, 0, 0.2, 1, 0.8, 1, 1, 0]], [[0, 0.75, 1, 0], 0.5], [[0, 120, 1, 121], 0.5], [[0, "#da9fff", 1, "#ec6dff"]], 0, [0, -30], null, [30, -210], [0, 0], 0, 0, [1, 1.5], 1, 0.1, 1, 1, -1, 10000, [0, 0], 0, [0, -12], null, 0, 0, "particle2", 0,
			LC("キャラ:中央から光球が発生して上に", 40)],

		//天界,
		light_pillar_r: [3, [[0, 0, 0.3, 0.5, 0.7, 0.5, 1, 0]], [[0, 3, 1, 3], 0.4], [[0, 1, 1, 0], 1], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [90, 90], [0, 0], 0, 0, [5, 5], 1, 1, 0.02, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "line_oval3", 7,
			LC("リージョン:空エリアの光の柱", 43)],
		light_floor_r: [3, [[0, 0, 0.5, 1, 0.55, 0, 0.6, 1, 0.65, 0, 0.7, 1, 0.75, 0, 0.8, 1, 0.85, 0, 0.9, 1, 0.95, 0, 1, 0]], [[0, 0, 0.5, 0.2, 1, 0], 0.5], [[0, 20, 1, 20], 0.5], [[0, "#ffea00", 1, "#ffea00"]], 0, [0, -50], null, [-90, -90], [-120, 120], 0, 0, [1, 2], 1, 1, 1, 1, -1, 10000, [0, 0], 2, [0, 0], [0, -12, 32, 0], 0, 0, "shine3", 7,
			LC("リージョン:キラキラ点滅する小さな光粒", 44)],
		particle_w: [3, [[0, 0, 0.5, 1, 1, 0]], [[0, 0.6, 1, 0.6], 0.2], [[0, 40, 1, 40], 0.2], [[0, "#ffc2c2", 1, "#fffdb9"]], 1, [0, -10], null, [-90, -90], [0, 0], 0, 0, [1.5, 4], 1, 0.1, 1, 1, -1, 10000, [5, 0.2], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8,particle5", 6,
			LC("天候:ゆらゆら上昇する光粒", 45)],
		orb_c: [3, [[0, 0.5, 1, 0]], [[0, 0, 0.1, 2, 1, 3.5], 0.8], [[0, 1, 1, 1], 1], [[0, "#00d0ff", 1, "#a6eeff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, [0.6, 0.6], 1, 0.1, 1, 1, -1, 10000, [0, 0], 0, [0, -24], null, 0, 0, "ripple1g", 0,
			LC("キャラ:オーブの波動", 46)],
		orb_cp: [3, [[0, 1, 1, 0]], [[0, 0, 0.1, 1, 1, 0], 0.8], [[0, 800, 0.1, 200, 1, 1], 0.5], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, [0.5, 0.7], 1, 0.005, 1, 1, 0.1, 10000, [0, 0], 0, [0, -26], null, 0, 0, "shine3", 0,
			LC("キャラ:青白いキラキラ光粒が発散", 47)],
		light_float_cp: [3, [[0, 1, 1, 0]], [[0, 3, 1, 0], 0.2], [[0, 500, 1, 1], 0.5], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [-90, -90], [0, 0], 0, 0, [0.4, 0.8], 1, 0.003, 1, 1, 0.15, 10000, [0, 0], 1, [0, 0], [-18, -150, 36, 0], 0, 0, "line_oval3", 0,
			LC("キャラ:光柱が頭上に向かって消える", 48)],
		statue_orb_c: [3, [[0, 0, 0.5, 1, 1, 0]], [[0, 0.5, 1, 0], 0.5], [[0, 1, 1, 80], 0.5], [[0, "#ffff00", 1, "#460000"]], 0, [0, 0], null, [-180, 0], [0, 0], 0, 0, [1, 1], 1, 0.1, 1, 1, -1, 10000, [0, 0], 0, [0, -22], null, 0, 0, "cloud2", 0,
			LC("キャラ:石像のオーブから出る光粒", 49)],
		magic_circle_c: [3, [[0, 0, 0.5, 1, 1, 0]], [[0, 0.25, 1, 0], 0.5], [[0, 50, 1, 50], 0.5], [[0, "#ff0707", 1, "#ffcdcd"]], 0, [0, -30], null, [-90, -90], [-120, 120], 0, 0, [0.5, 1.5], 2, 0.05, 1, 1, -1, 10000, [0, 0], 2, [0, 0], [0, -24, 24, 0], 0, 0, "hexagon_line3,hexagon1", 0,
			LC("キャラ:魔法陣の幾何学エフェクト", 50)],
		warp_red_c: [3, [[0, 0, 0.5, 1, 1, 0]], [[0, 0, 0.5, 1.5, 1, 0], 0.5], [[0, 10, 1, 150], 1], [[0, "#ff3030", 1, "#ff1d1d"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, [0.5, 1], 2, 0.03, 1, 1, -1, 10000, [0, 0], 0, [0, -24], null, 0, 0, "line_oval3,line_oval2", 0,
			LC("キャラ:赤魔法陣ワープの集中線", 51)],
		warp_red_cp: [3, [[0, 0, 0.5, 1, 1, 0]], [[0, 0.5, 0.5, 0.2, 1, 0], 0.5], [[0, 1000, 0.2, 200, 1, 0], 0.5], [[0, "#9100ff", 1, "#ff0000"]], 1, [0, 0], null, [-90, -90], [-360, 360], 0, 0, [0.5, 1], 2, 0.01, 1, 1, 0.3, 10000, [0, 0], 2, [0, -24], [0, 12, 36, 0], 0, 0, "square_line1", 0,
			LC("キャラ:ワープ直後の幾何学エフェクト", 52)],

		fire_pillar_c: [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 0, 0.2, 0.6, 1, 0], 0.7], [[0, 150, 1, 50], 1], [[0, "#ff824d", 1, "#ff7d46"]], 0, [0, 0], null, [-90, -90], [0, 0], 0, 2, 0, [1, 1.5], 1, 0.05, 1, 2, -1, 10000, [0, 0], 4, [-12, 18], [0, 0, 0, 1, 0, 24, 0], 0, 0, "flame1g", 0,
			LC("キャラ:行き止まり用の炎の柱", 53)],


		//歩行
		fuss_startdash: [[[0, 0, 0.1, 0.8, 0.5, 0.5, 1, 0], 0, 0], [[0, 0, 0.2, 0.5, 0.9, 0.5, 1, 0.12], 0.5, 0, 0], [[0, 500, 0.2, 50, 1, 0], 0.5, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [-60, -120], [-100, 100], 0, 0, [0.6, 1.2], 4, 0.01, 1, 3, 0.05, 60, [0, 0], 0, [0, 0], null, null, 0, 0, "cartoon_fuss1", 2,
		LC("スタートダッシュ:アニメ調の煙", 54)],
		fuss_walk: [[[0, 0, 0.1, 0.8, 0.5, 0.5, 1, 0], 0, 0], [[0, 0, 0.3, 0.5, 0.9, 0.5, 1, 0.12], 0.5, 0, 0], [[0, 150, 1, 0], 0.5, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [-60, -120], [0, 0], 0, 0, [0.5, 1], 4, 0.1, 1, 3, -1, 60, [0, 0], 0, [0, 0], null, null, 0, 0, "cartoon_fuss2", 1,
		LC("歩行:アニメ調の煙", 55)],
		dust_walk: [[[0, 0, 0.1, 0.3, 1, 0], 0, 0], [[0, 0, 0.05, 1.5, 1, 2], 0.5, 0, 0], [[0, 100, 1, 0], 0.5, 0, 0], [[0, "#a4724c", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [-150, -30], [0, 0], 0, 0, [0.7, 1.2], 0, 0.08, 0.7, 1, -1, 60, [0, 0], 2, [0, 0], null, [0, -6, 12, 0], 0, 0, "smog1", 1,
		LC("歩行:土煙", 56)],
		grass_walk: [[[0, 0, 0.1, 0.8, 0.5, 0.5, 1, 0], 0, 0], [[0, 0, 0.3, 0.2, 0.9, 0.2, 1, 0.12], 0.5, 0, 0], [[0, 200, 1, 200], 0.8, 0, 0], [[0, "#005b11", 1, "#005b11"], 0, 0], 0, [0, 300], 0, [-30, -150], [-100, 200], 1, 2, [0.4, 0.6], 0, 0.25, 1, 4, -1, 60, [0, 0], 0, [0, 0], null, null, 0, 0, "flame1", 1,
		LC("歩行:飛び散る草", 57)],
		flower_walk: [[[0, 0, 0.005, 1, 0.5, 1, 1, 0], 0, 0], [[0, 0, 0.005, 1, 0.5, 1, 1, 1], 0.5, 0, 0], [[0, 0, 1, 0], 0, 0, 0], [[0, "#ffffff", 0.5, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 0, [0.5, 1.5], 0, 0.025, 1, 1, -1, 1000, [0, 0], 2, [0, 0], null, [0, 0, 24, 0], 0, 0, "tile:Outside_B:73,tile:Outside_B:74,tile:Outside_B:75", 1,
		LC("歩行:歩いた跡に花(タイル使用)", 58)],
		splash_walk: [[[0, 0, 0.1, 0.8, 0.7, 0.5, 1, 0], 0, 0], [[0, 0, 0.3, 0.25, 0.9, 0.25, 1, 0], 0.3, 0, 0], [[0, 350, 1, 0], 0.5, 0, 0], [[0, "#0047ff", 1, "#ffffff"], 0, 0], 0, [0, 100], 0, [-30, -150], [0, 0], 0, 0, [0.4, 0.5], 1, 0.25, 1, 4, -1, 60, [0, 0], 0, [0, 0], null, null, 0, 0, "snow_particle2", 1,
		LC("歩行:水しぶき", 59)],
		ripple_walk: [[[0, 0, 0.1, 0.5, 1, 0], 0, 0], [[0, 0, 0.1, 1, 1, 2], 0.4, 0, 0], [[0, 0, 1, 0], 0.5, 0, 0], [[0, "#c2cdff", 1, "#d4e6ff"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 0, [0.5, 1], 1, 0.08, 0.7, 1, -1, 60, [0, 0], 2, [0, 0], null, [0, -4, 6, 0], 0, 0, "ripple2", 1,
		LC("歩行:水の波紋", 60)],
		fuss_c: [[[0, 0, 0.1, 0.8, 0.5, 0.5, 1, 0], 0, 0], [[0, 0, 0.3, 1, 1, 2], 0.1, 0, 0], [[0, 150, 1, 0], 0.5, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [-60, -120], [0, 0], 0, 0, [0.5, 1], 4, 0.03, 1, 3, 0.5, 30, [0, 0], 1, [0, 0], [-36, 0, 72, 0], null, 0, 0, "cartoon_fuss2", 0,
		LC("キャラ:乱闘中っぽいアニメ調の煙", 61)],

		//天候
		flash_s: [[[0, 0, 0.2, 0.25, 1, 0], 0, 0], [[0, 6, 1, 6], 0.9, 0, 0], [[0, 1, 1, 1], 1, 0, 0], [[0, "#ffe8ad", 1, "#ffe8ad"], 0, 0], 1, [0, 0], 0, [0, 360], [0, 0], 0, 0, [1, 1], 1, 0.2, 0.25, 0, -1, 10000, [0, 0], 0, [-500, -550], null, null, 0, 0, "flare", 5,
		LC("スクリーン:太陽光のフラッシュ", 62)],
		flare_s: [[[0, 0, 0.2, 1, 0.8, 1, 1, 0], 0, 0], [[0, 6, 1, 6], 0.9, 0, 0], [[0, 1, 1, 1], 1, 0, 0], [[0, "#ffb050", 1, "#ffffff"], 0, 0], 1, [0, 0], 0, [0, 360], [0, 0], 0, 0, [1, 1], 1, 0.2, 1, 0, -1, 10000, [0, 0], 0, [-500, -550], null, null, 0, 0, "flare2", 5,
		LC("スクリーン:太陽光のフレア", 63)],
		fog_w2: [[[0, 0, 0.05, 0.1, 0.9, 0.1, 1, 0], 0, 0], [[0, 4, 0.5, 4, 1, 4], 0.3, 0, 0], [[0, 70, 1, 70], 0.3, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 1, [0, 0], 0, [0, 0], [0, 0], 0, 0, [30, 30], 1, 0.3, 1, 0, -1, 10000, [0, 0], 1, [0, 0], [-616, -312, 0, 624], null, 0, 0, "cloud3,cloud2,cloud1", 5,
		LC("天候:濃いめのモヤ", 64)],
		fog_shadow_w: [[[0, 0, 0.05, 0.05, 0.9, 0.05, 1, 0], 0, 0], [[0, 5, 0.5, 5, 1, 5], 0.25, 0, 0], [[0, 70, 1, 70], 0.3, 0, 0], [[0, "#000000", 1, "#000000"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 0, [30, 30], 2, 0.3, 1, 0, -1, 10000, [0, 0], 1, [0, 0], [-616, -312, 0, 624], null, 0, 0, "cloud3,cloud2,cloud1", 5,
		LC("天候:モヤの影", 65)],
		cloud_w: [[[0, 0, 0.05, 0.75, 0.9, 0.75, 1, 0], 0, 0], [[0, 10, 0.5, 10, 1, 10], 0.3, 0, 0], [[0, 70, 1, 70], 0.3, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 0, [60, 60], 0, 3, 0.5, 0, -1, 10000, [0, 0], 1, [0, 0], [-616, -312, 0, 624], null, 0, 0, "cloud3,cloud2,cloud1", 5,
		LC("天候:雲", 66)],
		cloud_shadow_w: [[[0, 0, 0.05, 0.2, 0.9, 0.2, 1, 0], 0, 0], [[0, 7, 0.5, 7, 1, 7], 0.3, 0, 0], [[0, 25, 1, 25], 0.3, 0, 0], [[0, "#000000", 1, "#000000"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 0, [70, 70], 0, 3, 0.5, 0, -1, 10000, [0, 0], 1, [0, 0], [-616, -312, 0, 624], null, 0, 0, "cloud3,cloud2,cloud1", 5,
		LC("天候:雲の影", 67)],
		rain_w: [[[0, 0, 0.2, 0.6, 1, 0], 0, 0], [[0, 0.3, 1, 0.3], 0.5, 0, 0], [[0, 300, 1, 300], 0.5, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [90, 90], [0, 0], 0, 0, [0.3, 0.5], 1, 0.008, 1, 0, -1, 10000, [0, 0], 1, [0, 0], [-408, -412, 916, 624], null, 0, 0, "line_rain2", 6,
		LC("天候:しとしと雨", 68)],
		rain_w2: [[[0, 0, 0.2, 0.8, 0.8, 0.5, 1, 0], 0, 0], [[0, 0.84, 1, 0.85], 0.5, 0, 0], [[0, 800, 1, 800], 0.75, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [112.5, 112.5], [0, 0], 0, 0, [0.3, 0.4], 0, 0.008, 1, 0, -1, 10000, [0, 0], 1, [0, 0], [-408, -412, 916, 624], null, 0, 0, "line_rain1", 6,
		LC("天候:強めの雨", 69)],
		rain_w3: [[[0, 0, 0.2, 0.8, 0.8, 0.5, 1, 0], 0, 0], [[0, 1.1, 1, 1], 2.5, 0, 0], [[0, 1500, 1, 1500], 0.75, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [112.5, 112.5], [0, 0], 0, 0, [0.15, 0.25], 1, 0.003, 1, 0, -1, 10000, [0, 0], 1, [0, 0], [-408, -412, 916, 624], null, 0, 0, "line2", 6,
		LC("天候:本降りの雨", 70)],
		ripple_r: [[[0, 0.5, 0.5, 0.5, 1, 0], 0, 0], [[0, 0, 0.5, 0.6, 1, 1], 0.5, 0, 0], [[0, 0, 1, 0], 1, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [0, 0], [0, 0], 0, 2, [0.6, 1], 1, 1, 0.5, 0, -1, 10000, [0, 0], 1, [0, 0], [-408, -312, 816, 624], null, 0, 0, "ripple2", 7,
		LC("リージョン:水たまりの波紋", 71)],
		rain_fog_w: [[[0, 0, 0.5, 0.2, 1, 0], 0, 0], [[0, 0.5, 1, 1], 1.5, 0, 0], [[0, 50, 0.2, 20, 1, 15], 0.5, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [-90, -90], [0, 0], 0, 2, [1, 2], 1, 0.08, 0.5, 0, -1, 10000, [0, 0], 1, [0, 0], [-408, -312, 816, 624], null, 0, 0, "smoke2", 6,
		LC("天候:雨天時のモヤ", 72)],
		thunder_w: [[[0, 1, 0.2, 1, 1, 0], 0, 0], [[0, 11, 0.2, 11, 1, 11], 0.2, 0, 0], [[0, 1, 1, 1], 0.5, 0, 0], [[0, "#ffff20", 0.05, "#3300ff", 1, "#c800ff"], 0, 0], 0, [0, 0], 0, [85, 95], [0, 0], 0, 2, [0.5, 1], 1, 0.06, 0.2, 0, -1, 10000, [0, 0.02], 1, [0, 0], [-408, -412, 816, 200], null, 0, 0, "thunder1,thunder2", 6,
		LC("天候:ピカッと一瞬光る稲妻", 73)],
		thunder_w2: [[[0, 1, 0.2, 1, 1, 0], 0, 0], [[0, 11, 0.2, 11, 1, 11], 0.2, 0, 0], [[0, 1, 1, 1], 0.5, 0, 0], [[0, "#ffff20", 1, "#ffff20"], 0, 0], 0, [0, 0], 0, [85, 95], [0, 0], 0, 2, [0.5, 1], 1, 0.06, 0.2, 0, -1, 10000, [0, 0.02], 1, [0, 0], [-408, -412, 816, 200], null, 0, 0, "thunder1,thunder2", 6,
		LC("天候:黄色の稲妻", 74)],
		petal_w: [3, [[0, 0, 0.2, 0.8, 0.8, 0.8, 1, 0]], [[0, 0.25, 1, 0.25], 0.75], [[0, 200, 0.5, 100, 1, 200], 0.5], [[0, "#fabfff", 1, "#fce1ff"]], 1, [0, 0], null, [0, 0], [-180, 180], -1, 0, [2, 4], 4, 0.05, 1, 1, -1, 10000, [5, 0.2], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "petal1", 6,
			LC("天候:桜の花びら", 75)],

		//戦闘
		aura_bp: [3, [[0, 1, 0.7, 1, 1, 0]], [[0, 2, 0.15, 0.8, 0.7, 0.8, 1, 0], 0.5], [[0, 1500, 0.15, 50, 0.7, 50, 1, 100], 0.2], [[0, "#8dfffd", 1, "#ffffff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, [1, 1], 1, 0.0015, 1, 1, 0.1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "snow_particle2g,line_oval3", 8,
			LC("戦闘キャラ:青白い光の粒＆集中線発散", 41)],
		aura_bp2: [3, [[0, 1, 0.2, 1, 1, 0]], [[0, 0, 0.18, 4, 1, 4.5], 1], [[0, 1, 0.3, 1, 1, 1], 1], [[0, "#ffffff", 1, "#49d5ff"]], 0, [0, 0], null, [0, 0], [0, 0], 0, 0, [1, 1], 1, 0.04, 1, 0.05, 1, 1, [0, 0], 0, [0, 0], null, 0, 0, "circle3g", 8,
			LC("戦闘キャラ:青白いサークル拡大", 42)],
		aura_static_b: [3, [[0, 0, 0.5, 1, 1, 0]], [[0, 0, 1, 0.5], 0.3], [[0, 60, 1, 10], 1], [[0, "#0592ff", 1, "#0592ff"]], 0, [0, -10], null, [0, 360], [-90, 90], -1, 2, [1, 1], 1, 0.01, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "cloud3", 0,
			LC("キャラ:もやもやのオーラ", 78)],
		charm_bw: [3, [[0, 0, 0.3, 1, 1, 0]], [[0, 0, 0.3, 0.4, 1, 0.6], 0.5], [[0, 100, 1, 1], 0], [[0, "#dd00ff", 1, "#ffffff"]], 0, [0, 0], null, [-120, -60], [-90, 90], -1, 0, [1.5, 2.5], 0, 0.1, 1, 1, -1, 1000, [0, 0], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "heart4g", 6,
			LC("天候:画面全体ハート", 79)],
		black_particle_w: [3, [[0, 0, 0.5, 1, 1, 0]], [[0, 0.6, 1, 0.6], 0.2], [[0, 40, 1, 40], 0.2], [[0, "#670088", 1, "#670088"]], 1, [0, -10], null, [-90, -90], [0, 0], 0, 0, [1.5, 4], 2, 0.1, 1, 1, -1, 10000, [5, 0.2], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8,particle5", 6,
			LC("天候:黒いパーティクル", 80)],

		//テスト用
		particle: [[[0, 0, 0.5, 1, 1, 0], 0, 0], [[0, 0, 0.5, 1, 1, 0], 0.5, 0, 0], [[0, 300, 1, 100], 1, 0, 0], [[0, "#ffffff", 1, "#ffffff"], 0, 0], 0, [0, 0], 0, [0, 360], [0, 0], 0, 0, [1, 1], 1, 0.01, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, null, 0, 0, "particle1", 0, LC("テスト用", 81)],
		light_r: [[[0, 1, 0.5, 1, 1, 0], 0, 0], [[0, 0, 0.5, 1, 1, 0], 0.2, 0, 0], [[0, 10, 1, 100], 0.5, 0, 0], [[0, "#14ff1f", 1, "#ffef9d"], 0, 0], 1, [0, 0], 0, [-90, -90], [0, 0], 0, 0, [1, 2], 0, 0.2, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, null, 0, 0, "particle4", 7, LC("リージョン:テスト用1", 82)],





		//サブ用
		"commet/h": [4, [[0, 0.8, 1, 0]], [[0, 0.4, 1, 0.4], 0.8], [[0, 200, 0.9, 200, 1, 400], 0.25], [[0, "#fffedf", 1, "#feffef"]], 0, [0, 0], null, [140, 140], [-300, 0], 0, 0, 0, [1.5, 2], 1, 0.5, 0.6, 1, -1, 10000, [0, 0], 1, [0, 0], [-404, -308, 808, 200], 0, 0, "shine2", 0, ""],
		"_sub:0:commet/h": [4, [[0, 1, 1, 0]], [[0, 0.2, 1, 0.2], 0.5], [[0, 0, 1, 0], 0.5], [[0, "#ffe2c4", 1, "#ffffff"]], 0, [0, 0], null, [170, 190], [150, 150], 0, 0, 0, [0.5, 0.8], 1, 0.03, 0.2, 5, -1, 10000, [0, 0], 2, [0, 0], [0, 0, 10, 0], 0, 0, "particle9", 0, ""],
		"_sub:1:commet/h": [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 1.2, 1, 0], 0.5], [[0, 100, 1, 1], 1], [[0, "#f8aaaa", 1, "#ffffff"]], 0, [0, 0], null, [180, 180], [0, 0], 0, 0, 0, [1, 1], 1, 0.1, 1, 1, -1, 10000, [0, 0], 2, [0, 0], [0, 0, 7, 0], 0, 0, "line_oval3", 0, ""],
		"starry_sky/h": [4, [[0, 0, 0.2, 1, 0.25, 0.7, 0.3, 1, 0.35, 0.7, 0.4, 1, 0.45, 0.7, 0.5, 1, 0.55, 0.7, 0.6, 1, 0.65, 0.7, 0.7, 1, 0.75, 0.7, 0.8, 1, 0.85, 0.5, 0.9, 0.65, 1, 0]], [[0, 0.2, 1, 0.2], 0.3], [[0, 0, 1, 0], 1], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [4, 6], 1, 0.05, 1, 1, -1, 10000, [0, 0], 1, [0, 0], [-404, -308, 808, 500], 0, 0, "particle9,particle8,particle7", 0, ""],
		"firefly/h": [4, [[0, 0, 0.2, 1, 0.4, 0.5, 0.5, 1, 0.6, 0.5, 0.8, 1, 1, 0]], [[0, 0.3, 1, 0.3], 0.35], [[0, 50, 1, 50], 0.3], [[0, "#a4fb7b", 1, "#a4fb7b"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [3, 6], 1, 30, 0.5, 1, -1, 10000, [5, 0.3], 1, [0, 0], [0, 0, 0, 0], 0, 0, "particle8", 0, ""],
		"_sub:0:firefly/h": [4, [[0, 1, 1, 0]], [[0, 0.05, 1, 0.05], 0.5], [[0, 10, 1, 0], 1], [[0, "#b3ff86", 1, "#ffffff"]], 0, [0, 0], null, [180, 180], [0, 0], 0, 0, 0, [1.5, 2], 1, 0.15, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "line_ray2,particle7", 0, ""],
		"fireworks_shot/h": [4, [[0, 1, 0.8, 1, 1, 0]], [[0, 0.15, 1, 0.15], 0.5], [[0, 800, 0.5, 300, 0.8, 100, 1, 0], 0.7], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [-90, -90], [0, 0], 0, 0, 0, [1, 1], 1, 0.5, 0.5, 1, -1, 10000, [0, 0], 1, [0, 0], [-312, 0, 624, 0], 0, 0, "particle9", 0, ""],
		"_sub:0:fireworks/h": [4, [[0, 0, 0.11, 1, 0.5, 1, 1, 0]], [[0, 0.1, 0.15, 0.1, 0.8, 0.05, 1, 0], 0.8], [[0, 1200, 0.1, 200, 0.2, 50, 1, 1], 0.1], [[0, "#ff8d8d", 0.4, "#ffffff", 1, "#ffa83e"]], 1, [0, 0], null, [0, 360], [50, -50], 0, 0, 0, [2, 2], 1, 0.1, 1, 200, 0.11, 10000, [0, 0], 1, [0, 0], [0, 0, 0, 0], 0, 0, "flare", 0, ""],
		"_sub:1:fireworks/h": [4, [[0, 0.2, 1, 0]], [[0, 0.5, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#ffd6c1", 1, "#ffffff"]], 0, [0, 0], null, [175, 185], [0, 0], 0, 0, 0, [0.4, 0.6], 1, 0.01, 1, 1, 0.9, 10000, [1, 0.01], 0, [0, 0], null, 0, 0, "particle9", 0, ""],


		//漂う光(サブ)
		"_auto:0:light_green_w1/h": [4, [[0, 0, 0.33, 1, 0.5, 0.5, 0.67, 1, 1, 0]], [[0, 0, 0.25, 0.25, 1, 0.25], 0.5], [[0, 1, 0.2, 25, 1, 25], 0.2], [[0, "#85ff76", 1, "#76ffe6"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 4], 1, 0.2, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle9", 6, ""],
		"_auto:0:light_green_w2/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0.5, 1, 0.5], 0.5], [[0, 30, 1, 30], 0.2], [[0, "#85ff76", 1, "#85ff76"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 3], 1, 0.2, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_green_w2/h": [4, [[0, 0, 0.5, 0.15, 1, 0]], [[0, 1, 1, 1], 0.5], [[0, 0, 1, 0], 1], [[0, "#b7ff8d", 1, "#b7ff8d"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 2], 1, 0.25, 0.2, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""],
		"_auto:0:light_green_w3/h": [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 0, 0.5, 0.5, 1, 0], 0.1], [[0, 20, 1, 20], 0.5], [[0, "#7bffae", 1, "#ccff7b"]], 1, [0, -25], null, [-60, -120], [0, 0], 0, 0, 0, [2, 4], 1, 0.2, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle9", 6, ""],
		"_sub:0:light_green_w3/h": [4, [[0, 1, 1, 0]], [[0, 0, 0.2, 0.4, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#a2fff1", 1, "#9dff9f"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1.5, 2], 1, 0.1, 0.25, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "particle9", 0, ""],

		"_auto:0:light_black_w1/h": [4, [[0, 0, 0.25, 0.9, 0.75, 0.9, 1, 0]], [[0, 0, 0.25, 0.2, 1, 0.2], 0.5], [[0, 30, 1, 30], 0.2], [[0, "#2542bf", 1, "#9125bf"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 3], 2, 0.07, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle7", 6, ""],
		"_auto:0:light_black_w2/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0.5, 1, 0.7], 0.5], [[0, 40, 1, 40], 0.3], [[0, "#491cb8", 1, "#143c88"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 3], 2, 0.2, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle9", 6, ""],
		"_sub:0:light_black_w2/h": [4, [[0, 1, 1, 0]], [[0, 0.5, 1, 0], 0.4], [[0, 40, 1, 10], 0.2], [[0, "#6c52ff", 1, "#6c52ff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1], 2, 0.05, 0.25, 1, -1, 10000, [10, 0.05], 0, [0, 0], null, 0, 0, "particle9", 0, ""],
		"_auto:0:light_black_w3/h": [4, [[0, 0, 0.25, 0.9, 0.75, 0.9, 1, 0]], [[0, 0, 0.25, 0.2, 1, 0.2], 0.5], [[0, 60, 1, 60], 0.1], [[0, "#2542bf", 1, "#9125bf"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 3], 2, 0.125, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle7", 6, ""],
		"_sub:0:light_black_w3/h": [4, [[0, 1, 1, 0]], [[0, 0, 0.2, 0.4, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#781eff", 1, "#2b2fff"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 2.5], 2, 0.1, 0.25, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "particle9", 0, ""],
		"_sub:1:light_black_w3/h": [4, [[0, 0, 0.1, 0.1, 1, 0]], [[0, 0.7, 1, 0.7], 0.1], [[0, 0, 1, 0], 1], [[0, "#3630df", 1, "#131162"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1], 2, 0.2, 0.15, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""],

		"_auto:0:light_ash_w1/h": [4, [[0, 0, 0.25, 0.9, 0.5, 0.8, 0.75, 0.9, 1, 0]], [[0, 0.35, 1, 0.35], 0.3], [[0, 20, 1, 20], 0.2], [[0, "#d4d4d4", 1, "#8d8d8d"]], 1, [0, 0], null, [0, 360], [90, -90], 0, 0, 0, [4, 6], 0, 0.05, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "dust4,dust2,dust3,dust1", 6, ""],
		"_auto:0:light_ash_w2/h": [4, [[0, 0, 0.25, 0.9, 0.5, 0.8, 0.75, 0.9, 1, 0]], [[0, 0.35, 1, 0.35], 0.3], [[0, 20, 1, 20], 0.2], [[0, "#ff9e8d", 1, "#ffc988"]], 1, [0, 0], null, [0, 360], [90, -90], 0, 0, 0, [4, 6], 1, 0.2, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "dust4g,dust2g,dust1g,dust3g", 6, ""],
		"_sub:0:light_ash_w2/h": [4, [[0, 0, 0.2, 0.15, 1, 0]], [[0, 0.4, 1, 0.4], 0], [[0, 1, 1, 1], 1], [[0, "#ff9940", 1, "#ff6f6f"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 2], 1, 0.5, 0.5, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""],

		"_auto:0:light_ice_w1/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0.35, 1, 0.35], 0.2], [[0, 20, 1, 20], 0.2], [[0, "#8be1ff", 1, "#b9bcff"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [3, 6], 1, 0.2, 1, 1, -1, 10000, [5, 0.02], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_auto:0:light_ice_w2/h": [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 1, 1, 1], 0.5], [[0, 30, 1, 30], 0.2], [[0, "#76ffea", 1, "#c1e1ff"]], 0, [0, 0], null, [-90, -90], [90, -90], 0, 0, 0, [1.5, 3], 1, 0.35, 1, 1, -1, 10000, [5, 0.01], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "dust1g", 6, ""],
		"_sub:0:light_ice_w2/h": [4, [[0, 0.15, 1, 0]], [[0, 0.7, 1, 0.7], 0.15], [[0, 0, 1, 0], 1], [[0, "#72e5ff", 1, "#6b97ff"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1], 1, 0.2, 0.5, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""],
		"_auto:0:light_ice_w3/h": [4, [[0, 0, 1, 0]], [[0, 0, 1, 0], 0.5], [[0, 80, 1, 80], 0.3], [[0, "#add5ff", 1, "#76a6ff"]], 0, [0, 0], null, [-100, -80], [0, 0], 0, 0, 0, [2, 3], 1, 0.25, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "shine2,shine_thin1g,shine_thin3,particle9", 6, ""],
		"_sub:0:light_ice_w3/h": [4, [[0, 0, 0.19, 0, 0.2, 1, 0.49, 1, 0.5, 0, 0.51, 1, 0.69, 1, 1, 0]], [[0, 0.5, 0.1, 0.4, 1, 0], 0.2], [[0, 0, 1, 0], 1], [[0, "#8bfffd", 1, "#7291ff"]], 1, [0, 0], null, [0, 360], [90, -90], 0, 0, 0, [0.5, 1], 1, 0.2, 0.5, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "shine_thin3,shine3,shine_thin1g", 0, ""],
		"_sub:1:light_ice_w3/h": [4, [[0, 0, 0.2, 1, 1, 0]], [[0, 0.5, 1, 0], 0.2], [[0, 10, 1, 10], 1], [[0, "#8bfffd", 1, "#7291ff"]], 1, [0, 0], null, [0, 360], [90, -90], 0, 0, 0, [1, 2], 1, 0.1, 0.5, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "particle9", 0, ""],

		"_auto:0:light_red_w1/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0.5, 1, 0.5], 0.5], [[0, 30, 1, 30], 0.2], [[0, "#ffb9af", 1, "#ff1b1b"]], 1, [0, -5], null, [-90, -90], [0, 0], 0, 0, 0, [2, 3], 1, 0.04, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "dust4g,dust3g,dust1g,dust2g", 6, ""],
		"_auto:0:light_red_w2/h": [4, [[0, 0, 1, 0]], [[0, 0, 1, 0], 0.5], [[0, 50, 1, 50], 0.2], [[0, "#ffffff", 1, "#ffffff"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [0.1, 0.1], 1, 0.07, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle9", 6, ""],
		"_sub:0:light_red_w2/h": [4, [[0, 0, 0.1, 1, 1, 0]], [[0, 0.5, 0.5, 0.4, 1, 0], 0.5], [[0, 300, 0.15, 50, 1, 0], 0.2], [[0, "#ff9e3e", 1, "#ffd5d1"]], 0, [0, -20], null, [0, 360], [0, 0], 0, 0, 0, [0.5, 1], 1, 0.01, 0.5, 10, 0.011, 10000, [0, 0], 0, [0, 0], null, 0, 0, "dust2g,dust4g,dust1g,dust3g", 0, ""],
		"_auto:0:light_red_w3/h": [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 0, 0.1, 1, 0.5, 1, 1, 0], 0.1], [[0, 50, 0.5, 100, 1, 50], 0.5], [[0, "#ffa77b", 1, "#ffb27b"]], 1, [0, -1], null, [0, 360], [0, 0], 0, 0, 0, [2, 3], 1, 0.35, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle9", 6, ""],
		"_sub:0:light_red_w3/h": [4, [[0, 0, 0.2, 1, 1, 0]], [[0, 0.5, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#ff8e77", 1, "#ff9756"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [0.5, 1.5], 1, 0.035, 0.5, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "particle9", 0, ""],

		"_auto:0:light_blue_w1/h": [4, [[0, 0, 0.25, 1, 0.5, 0.75, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0.4, 1, 0.4], 0.2], [[0, 30, 1, 30], 0.2], [[0, "#76daff", 1, "#769bff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [3, 4], 1, 0.2, 1, 1, -1, 10000, [3, 0.02], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_blue_w1/h": [4, [[0, 0, 0.5, 0.25, 1, 0]], [[0, 1.2, 1, 1.2], 0.5], [[0, 0, 1, 0], 1], [[0, "#76fffc", 1, "#76a6ff"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 2], 1, 0.5, 0.25, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""],
		"_auto:0:light_blue_w2/h": [4, [[0, 1, 0.5, 1, 1, 1]], [[0, 0, 0.5, 0.4, 1, 0], 0.5], [[0, 75, 1, 75], 0.5], [[0, "#80fffc", 1, "#80fffc"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 3.5], 1, 0.3, 0.5, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle9", 6, ""],
		"_sub:0:light_blue_w2/h": [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 0.3, 1, 0], 0.1], [[0, 75, 1, 0], 1], [[0, "#96ddff", 1, "#a0a0ff"]], 1, [0, 10], null, [0, 360], [0, 0], 0, 0, 0, [0.5, 1], 1, 0.15, 1, 3, -1, 10000, [0, 0], 3, [0, 0], [0, 0, 0, 0], 0, 0, "particle9", 0, ""],
		"_auto:0:light_blue_w3/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0.5, 1, 0.5], 0.2], [[0, 50, 1, 50], 0.2], [[0, "#7b9dfb", 1, "#77d4ff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 3], 1, 0.4, 0.6, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_blue_w3/h": [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 2, 0.2, 1, 1, 0], 0], [[0, 10, 1, 10], 1], [[0, "#4ce6f1", 1, "#527cef"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1.5], 1, 0.1, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "particle5", 0, ""],

		"_auto:0:light_white_w1/h": [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 0, 0.25, 0.4, 0.75, 0.4, 1, 0], 0.5], [[0, 10, 1, 10], 0.2], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [3, 5], 1, 0.15, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_auto:0:light_white_w2/h": [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 0.3, 1, 0.3], 0], [[0, 70, 1, 70], 0.25], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, -10], null, [-120, -60], [0, 0], 0, 0, 0, [3, 4], 1, 0.5, 1, 1, -1, 10000, [0, 0], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_white_w2/h": [4, [[0, 0, 0.2, 1, 1, 0]], [[0, 0.5, 1, 0.5], 0], [[0, 10, 1, 10], 0], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [-90, -90], [0, 0], 0, 0, 0, [3, 4], 1, 0.1, 0.25, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "particle9", 0, ""],
		"_auto:0:light_white_w3/h": [4, [[0, 0, 0.5, 1, 1, 0]], [[0, 0.5, 1, 0.5], 0], [[0, 20, 1, 20], 1], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [-90, -90], [0, 0], 0, 0, 0, [2, 3], 1, 0.1, 1, 1, -1, 10000, [1, 0.01], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle9", 6, ""],

		"_auto:0:light_purple_w1/h": [4, [[0, 0, 0.25, 1, 0.75, 1, 1, 0]], [[0, 0.3, 1, 0.3], 0.1], [[0, 40, 1, 40], 0.2], [[0, "#c5bdff", 1, "#ae8dff"]], 1, [0, 0], null, [-90, -90], [0, 0], 0, 0, 0, [3, 5], 1, 0.1, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -250, 816, 600], 0, 0, "particle9", 6, ""],
		"_auto:0:light_purple_w2/h": [4, [[0, 0, 0.5, 0, 1, 0]], [[0, 0, 0.5, 0, 1, 0], 0.5], [[0, 600, 0.2, 360, 1, 300], 0.3], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [-90, -90], [0, 0], 0, 0, 0, [2, 2.5], 1, 0.5, 0.5, 1, -1, 10000, [5, 0.1], 1, [0, 0], [-408, 0, 816, 500], 0, 0, "particle1", 6, ""],
		"_sub:0:light_purple_w2/h": [4, [[0, 0, 0.25, 1, 0.5, 0, 0.75, 1, 1, 0]], [[0, 0.3, 1, 0], 1], [[0, 5, 1, 5], 1], [[0, "#24fffb", 1, "#ac27ff"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 2.5], 1, 0.04, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "particle8", 0, ""],
		"_auto:0:light_purple_w3/h": [4, [[0, 0, 0.5, 0, 1, 0]], [[0, 0, 0.5, 0, 1, 0], 0.5], [[0, 800, 0.2, 500, 1, 400], 0.5], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [-90, -90], [0, 0], 0, 0, 0, [2, 2.5], 1, 0.5, 0.5, 1, -1, 10000, [5, 0.1], 1, [0, 0], [-408, 0, 816, 500], 0, 0, "particle1", 6, ""],
		"_sub:0:light_purple_w3/h": [4, [[0, 0, 0.5, 0.7, 1, 0]], [[0, 0.2, 1, 0.2], 0.5], [[0, 0, 1, 0], 1], [[0, "#69b7ff", 1, "#ac27ff"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1.5], 1, 0.03, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""],

		"_auto:0:light_gold_w1/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0.45, 1, 0.45], 0.3], [[0, 50, 1, 50], 0.2], [[0, "#fff849", 1, "#fffdbd"]], 1, [20, -15], null, [0, 360], [50, -50], 0, 0, 0, [2, 3], 1, 0.1, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "dust2g,dust4g,dust3g,dust1g", 0, ""],
		"_auto:0:light_gold_w2/h": [4, [[0, 1, 1, 1]], [[0, 0, 1, 0], 0.5], [[0, 500, 1, 500], 1], [[0, "#ffffff", 1, "#ffffff"]], 0, [150, -250], null, [20, 35], [0, 0], 0, 0, 0, [1.5, 1.5], 1, 0.7, 0.7, 1, -1, 1000, [10, 0.03], 1, [0, 0], [-450, -350, 100, 400], 0, 0, "particle1", 6, ""],
		"_sub:0:light_gold_w2/h": [4, [[0, 0.1, 1, 0]], [[0, 0.5, 1, 0.3], 1], [[0, 0, 1, 0], 1], [[0, "#f6ff8d", 1, "#f9ff8d"]], 0, [0, 0], null, [0, 0], [0, 0], 0, 0, 0, [0.4, 0.6], 1, 0.0075, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "line_oval1", 0, ""],
		"_sub:1:light_gold_w2/h": [4, [[0, 0, 0.5, 0.1, 1, 0]], [[0, 1.5, 1, 0], 0.75], [[0, 0, 1, 0], 0], [[0, "#fff4a0", 1, "#ffe737"]], 1, [0, -10], null, [-60, -120], [0, 0], 0, 0, 0, [0.5, 0.5], 1, 0.1, 0.5, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""],
		"_auto:0:light_gold_w3/h": [4, [[0, 0.8, 0.8, 0.8, 1, 0]], [[0, 0.2, 1, 0.1], 0.1], [[0, 250, 0.5, 125, 1, 250], 0.3], [[0, "#ffeea8", 1, "#ffeba6"]], 1, [1, -0.5], null, [30, 30], [-240, 240], -1, 0, 0, [4.5, 9], 1, 0.075, 1, 1, -1, 10000, [5, 0.2], 1, [0, 0], [-500, -450, 0, 650], 0, 0, "leaf1g", 6, ""],

		"_auto:0:light_monochrome_w1/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0.1, 1, 0.1], 0], [[0, 25, 1, 25], 0.2], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 4], 0, 0.125, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_auto:1:light_monochrome_w1/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0.1, 1, 0.1], 0], [[0, 25, 1, 25], 0.2], [[0, "#000000", 1, "#000000"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [2, 4], 0, 0.125, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_auto:0:light_monochrome_w2/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0, 1, 0], 0.5], [[0, 250, 1, 250], 0.3], [[0, "#ffffff", 1, "#ffffff"]], 1, ["0", 0], null, [0, 360], [0, 0], 0, 0, 0, [0.3, 0.5], 1, 0.3, 0.5, 1, -1, 10000, [20, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_monochrome_w2/h": [4, [[0, 0, 0.2, 0.5, 1, 0]], [[0, 0.2, 0.2, 0.13, 1, 0], 0.1], [[0, 0, 1, 0], 0.2], [[0, "#ffffff", 1, "#ffffff"]], 1, [0, -20], null, [0, 360], [0, 0], 0, 0, 0, [0.3, 1], 0, 0.003, 0.5, 1, -1, 10000, [10, 0.05], 0, [0, 0], null, 0, 0, "particle5", 0, ""],
		"_auto:0:light_monochrome_w2/h": [4, [[0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0]], [[0, 0, 0.25, 0, 1, 0], 0.5], [[0, 250, 1, 250], 0.3], [[0, "#ffffff", 1, "#ffffff"]], 1, ["0", 0], null, [0, 360], [0, 0], 0, 0, 0, [0.3, 0.5], 1, 0.3, 0.5, 1, -1, 10000, [20, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:1:light_monochrome_w2/h": [4, [[0, 0, 0.2, 0.5, 1, 0]], [[0, 0.2, 0.2, 0.13, 1, 0], 0.1], [[0, 0, 1, 0], 0.2], [[0, "#000000", 1, "#000000"]], 1, [0, -20], null, [0, 360], [0, 0], 0, 0, 0, [0.3, 1], 0, 0.003, 0.5, 1, -1, 10000, [10, 0.05], 0, [0, 0], null, 0, 0, "particle5", 0, ""],
		"_auto:0:light_monochrome_w3/h": [4, [[0, 0, 0.25, 1, 0.75, 1, 1, 0]], [[0, 0.3, 1, 0.3], 0.5], [[0, 30, 1, 30], 0.2], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [8, 16], 1, 2, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_monochrome_w3/h": [4, [[0, 0, 0.5, 0.2, 1, 0]], [[0, 0, 0.5, 1, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#ffffff", 1, "#ffffff"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1], 1, 0.3, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""],
		"_auto:1:light_monochrome_w3/h": [4, [[0, 0, 0.25, 1, 0.75, 1, 1, 0]], [[0, 0.3, 1, 0.3], 0.5], [[0, 30, 1, 30], 0.2], [[0, "#000000", 1, "#000000"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [8, 16], 2, 2, 1, 1, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:1:light_monochrome_w3/h": [4, [[0, 0, 0.5, 0.2, 1, 0]], [[0, 0, 0.5, 1, 1, 0], 0.5], [[0, 0, 1, 0], 1], [[0, "#000000", 1, "#000000"]], 0, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1], 2, 0.3, 1, 1, -1, 10000, [0, 0], 0, [0, 0], null, 0, 0, "flare", 0, ""],

		"_auto:0:light_rainbow_w1/h": [4, [[0, 0, 0.2, 1, 0.8, 1, 1, 0]], [[0, 0.2, 1, 0.2], 0.2], [[0, 20, 1, 20], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1], 1, 1, 1, 25, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_auto:0:light_rainbow_w2/h": [4, [[0, 0, 1, 0]], [[0, 0.2, 1, 0.2], 0.2], [[0, 100, 1, 100], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, ["180", "180"], [0, 0], 0, 0, 0, [1, 1], 1, 2, 1, 10, -1, 10000, [0, 0], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_rainbow_w2/h": [4, [[0, 0, 0.2, 1, 0.8, 1, 1, 0]], [[0, 0.2, 1, 0.2], 0.2], [[0, 0, 1, 0], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [0.2, 0.2], 1, 0.1, 1, 1, -1, 10000, [10, 0.05], 0, [0, 0], null, 0, 0, "particle9", 0, ""],
		"_auto:0:light_rainbow_w2/h": [4, [[0, 0, 1, 0]], [[0, 0.2, 1, 0.2], 0.2], [[0, 100, 1, 100], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, ["180", "180"], [0, 0], 0, 0, 0, [1, 1], 1, 2, 1, 10, -1, 10000, [0, 0], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_rainbow_w2/h": [4, [[0, 0, 0.2, 1, 0.8, 1, 1, 0]], [[0, 0.2, 1, 0.2], 0.2], [[0, 0, 1, 0], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [0.2, 0.2], 1, 0.1, 1, 1, -1, 10000, [10, 0.05], 0, [0, 0], null, 0, 0, "particle9", 0, ""],
		"_auto:0:light_rainbow_w2/h": [4, [[0, 0, 1, 0]], [[0, 0.2, 1, 0.2], 0.2], [[0, 100, 1, 100], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, ["180", "180"], [0, 0], 0, 0, 0, [1, 1], 1, 2, 1, 10, -1, 10000, [0, 0], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_rainbow_w2/h": [4, [[0, 0, 0.2, 1, 0.8, 1, 1, 0]], [[0, 0.2, 1, 0.2], 0.2], [[0, 0, 1, 0], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [0.2, 0.2], 1, 0.1, 1, 1, -1, 10000, [10, 0.05], 0, [0, 0], null, 0, 0, "particle9", 0, ""],
		"_auto:0:light_rainbow_w2/h": [4, [[0, 0, 1, 0]], [[0, 0.2, 1, 0.2], 0.2], [[0, 100, 1, 100], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, ["180", "180"], [0, 0], 0, 0, 0, [1, 1], 1, 2, 1, 10, -1, 10000, [0, 0], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle8", 6, ""],
		"_sub:0:light_rainbow_w2/h": [4, [[0, 0, 0.2, 1, 0.8, 1, 1, 0]], [[0, 0.2, 1, 0.2], 0.2], [[0, 0, 1, 0], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [0.2, 0.2], 1, 0.1, 1, 1, -1, 10000, [10, 0.05], 0, [0, 0], null, 0, 0, "particle9", 0, ""],
		"_auto:0:light_rainbow_w3/h": [4, [[0, 0, 0.2, 0.5, 0.8, 0.5, 1, 0]], [[0, 0.5, 1, 0.5], 0.2], [[0, 30, 1, 30], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1], 1, 1, 1, 10, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "particle9", 6, ""],
		"_auto:1:light_rainbow_w3/h": [4, [[0, 0, 0.2, 0.2, 0.8, 0.2, 1, 0]], [[0, 1, 1, 1], 1], [[0, 0, 1, 0], 0.2], [[0, "#a6ff9b", 0.2, "#4d65ff", 0.25, "#ffd044", 0.4, "#ff76e4", 0.5, "#76ffda", 0.75, "#a876ff", 1, "#ff76dd"]], 1, [0, 0], null, [0, 360], [0, 0], 0, 0, 0, [1, 1], 1, 1, 1, 5, -1, 10000, [10, 0.05], 1, [0, 0], [-408, -312, 816, 624], 0, 0, "flare", 6, ""],


	};


	$dataTrpParticleGroupsPreset = {
		"commet": { "repeat": -1, "list": ["set starry_sky/h screen def back", "exceed starry_sky/h 1", "set commet/h weather def back", "sub set commet/h _sub:0 0 -1 0.1 1", "sub set commet/h _sub:1 0 -1 0.2 1"], "targetType": 6, "comment": LC("星空と彗星", 83) },
		"firefly": { "repeat": -1, "list": ["set firefly/h target", "sub set firefly/h _sub:0 0 -1 0.3 1"], "targetType": 7, "comment": LC("蛍", 84) },
		"fireworks": { "repeat": -1, "list": ["set fireworks_shot/h this def back", "sub set fireworks_shot/h _sub:0 1 -1 0 0", "sub set fireworks_shot/h _sub:1 0 0.75 0.5 1"], "targetType": 0, "comment": LC("打ち上げ花火", 85) },


		//漂う光
		"light_green_w1": {
			"repeat": -1, "list": ["play _auto:0 target", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<緑/森_1>", 0, "Drifting light:Green 1")
		},
		"light_green_w2": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0 0.5 0 0 0", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<緑/森_2>", 0, "Drifting light:Green 2")
		},
		"light_green_w3": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0.1 0.9 0.2 0 0", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<緑/森_3>", 0, "Drifting light:Green 3")
		},

		"light_black_w1": {
			"repeat": -1, "list": ["play _auto:0 target", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<黒/闇_1>", 0, "Drifting light:Black 1")
		},
		"light_black_w2": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0.15 0.85 0.1 0 0", "loop _auto:0:light_green_w1/h"], "targetType": 6,
			"comment": NLC("天候:漂う光<黒/闇_2>", 0, "Drifting light:Black 2")
		},
		"light_black_w3": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0 -1 0.1 0 0", "sub play _auto:0 _sub:1 0 -1 0.15 0 0", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<黒/闇_3>", 0, "Drifting light:Black 3")
		},

		"light_ash_w1": {
			"repeat": -1, "list": ["play _auto:0 target", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<灰_1>", 0, "Drifting light:Ash 1")
		},
		"light_ash_w2": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0.1 0.8 1 0 1"], "targetType": 6,
			"comment": NLC("天候:漂う光<灰_2>", 0, "Drifting light:Ash 2")
		},

		"light_ice_w1": {
			"repeat": -1, "list": ["play _auto:0 target def", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<氷_1>", 0, "Drifting light:Ice 1")
		},
		"light_ice_w2": {
			"repeat": -1, "list": ["play _auto:0 target def", "sub play _auto:0 _sub:0 0.15 0.85 0 0 0"], "targetType": 6,
			"comment": NLC("天候:漂う光<氷_2>", 0, "Drifting light:Ice 2")
		},
		"light_ice_w3": {
			"repeat": -1, "list": ["play _auto:0 target def", "sub play _auto:0 _sub:0 0.1 -1 0 0 0", "sub play _auto:0 _sub:1 0 -1 0.1 0 0", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<氷_3>", 0, "Drifting light:Ice 3")
		},

		"light_red_w1": {
			"repeat": -1, "list": ["play _auto:0 target", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<赤/炎_1>", 0, "Drifting light:Red 1")
		},
		"light_red_w2": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0 -1 0 0 0", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<赤/炎_>", 0, "Drifting light:Red 2")
		},
		"light_red_w3": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0.1 0.6 0.2 0 0", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<赤/炎_1>", 0, "Drifting light:Red 3")
		},

		"light_blue_w1": {
			"repeat": -1, "list": ["play _auto:0 target def", "sub play _auto:0 _sub:0 0.25 0.75 1 0 1", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<青/水_1>", 0, "Drifting light:Blue 1")
		},
		"light_blue_w2": {
			"repeat": -1, "list": ["play _auto:0 target def", "sub play _auto:0 _sub:0 0.2 0.8 0.1 0 0", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<青/水_2>", 0, "Drifting light:Blue 2")
		},
		"light_blue_w3": {
			"repeat": -1, "list": ["play _auto:0 target def", "sub play _auto:0 _sub:0 0 -1 0 0 1"], "targetType": 6,
			"comment": NLC("天候:漂う光<青/水_3>", 0, "Drifting light:Blue 3")
		},

		"light_white_w1": {
			"repeat": -1, "list": ["play _auto:0 target", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<白/光_1>", 0, "Drifting light:White 1")
		},
		"light_white_w2": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0 -1 0.1 0 0", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<白/光_2>", 0, "Drifting light:White 2")
		},
		"light_white_w3": {
			"repeat": -1, "list": ["play _auto:0 target", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<白/光_3>", 0, "Drifting light:White 3")
		},

		"light_purple_w1": {
			"repeat": -1, "list": ["play _auto:0 target", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<紫/魔_1>", 0, "Drifting light:Purple 1")
		},
		"light_purple_w2": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0 -1 0.1 0 0", "loop _auto:0 50 50"], "targetType": 6,
			"comment": NLC("天候:漂う光<紫/魔_2>", 0, "Drifting light:Purple 2")
		},
		"light_purple_w3": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0 -1 0 0 0", "loop _auto:0 50 50"], "targetType": 6,
			"comment": NLC("天候:漂う光<紫/魔_3>", 0, "Drifting light:Purple 3")
		},

		"light_gold_w1": {
			"repeat": -1, "list": ["play _auto:0 targete", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<金_1>", 0, "Drifting light:Gold 1")
		},
		"light_gold_w2": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0 -1 0 1 1", "sub play _auto:0 _sub:1 0 0.8 0.1 0 0", "loop _auto:0 0 3"], "targetType": 6,
			"comment": NLC("天候:漂う光<金_2>", 0, "Drifting light:Gold 2")
		},
		"light_gold_w3": {
			"repeat": -1, "list": ["play _auto:0 target", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<金_3>", 0, "Drifting light:Gold 3")
		},

		"light_monochrome_w1": {
			"repeat": -1, "list": ["play _auto:0 target", "play _auto:1 target", "loop _auto:0", "loop _auto:1"], "targetType": 6,
			"comment": NLC("天候:漂う光<白黒/陰陽_1>", 0, "Drifting light:B&W 1")
		},
		"light_monochrome_w2": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0 -1 0.05 0 0", "play _auto:1 target _auto:0", "sub play _auto:1 _sub:1 0 -1 0 0 1", "loop _auto:0", "loop _auto:1"], "targetType": 6,
			"comment": NLC("天候:漂う光<白黒/陰陽_2>", 0, "Drifting light:B&W 2")
		},
		"light_monochrome_w3": {
			"repeat": -1, "list": ["play _auto:0 target", "sub play _auto:0 _sub:0 0 -1 0 0 1", "play _auto:1 target", "sub play _auto:1 _sub:1 0 -1 0 0 1", "loop _auto:0", "loop _auto:1"], "targetType": 6,
			"comment": NLC("天候:漂う光<白黒/陰陽_3>", 0, "Drifting light:B&W 3")
		},

		"light_rainbow_w1": {
			"repeat": -1, "list": ["play _auto:0 target def spriteset", "loop _auto:0"], "targetType": 6,
			"comment": NLC("天候:漂う光<虹_1>", 0, "Drifting light:Rainbow 1")
		},
		"light_rainbow_w2": {
			"repeat": -1, "list": ["play _auto:0 target def spriteset", "sub play _auto:0 _sub:0 0 0.9 0 0 0", "loop _auto:0", "play _auto:1 target _auto:0 spriteset", "update _auto:1 startRotation 180 180", "sub play _auto:1 _sub:0 0 0.9 0 0 0", "loop _auto:1", "wait 60", "play _auto:2 target _auto:0 spriteset", "update _auto:2 startRotation 90 90", "sub play _auto:2 _sub:0 0 0.9 0 0 0", "loop _auto:2", "play _auto:3 target _auto:0 spriteset", "update _auto:3 startRotation -90 -90", "sub play _auto:3 _sub:0 0 0.9 0 0 0", "loop _auto:3", "wait 60"], "targetType": 6,
			"comment": NLC("天候:漂う光<虹_2>", 0, "Drifting light:Rainbow 2")
		},
		"light_rainbow_w3": {
			"repeat": -1, "list": ["play _auto:0 target def spriteset", "play _auto:1 target def spriteset", "loop _auto:0", "loop _auto:1"], "targetType": 6,
			"comment": NLC("天候:漂う光<虹_3>", 0, "Drifting light:Rainbow 3")
		},
	};


})();
