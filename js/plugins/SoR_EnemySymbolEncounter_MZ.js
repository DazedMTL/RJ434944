//=============================================================================
// SoR_EnemySymbolEncounter_MZ.js
// SoR License (C) 2020 蒼竜, REQUIRED User Registration on Dragon Cave
// http://dragonflare.blue/dcave/license.php
// ---------------------------------------------------------------------------
// Latest version v1.72 (2022/12/13)
//=============================================================================
/*:ja
@plugindesc ＜シンボルエンカウント総合＞ v1.72
@author 蒼竜
@target MZ
@url https://dragonflare.blue/dcave/
@help シンボルエンカウント方式のゲームデザインを実現するために
一般のコンシューマゲームのような挙動をモチーフに
次のような一通りの仕組みを単独プラグインで実装します。
- 接敵時の状態に応じた先制攻撃、不意打ちの判定
- 敵シンボルの経路探索および追跡
- 戦闘後の処理(プレイヤーの無敵時間,敵シンボルの復帰)

敵シンボルとするイベントを作成し、メモ欄に
<EnemySymbol>
と記述すると、このプラグインの効能を受けます。
シンボルごとの細かな挙動指定は、各イベント内における
イベントコマンドの「注釈」を用いて行います。

上のタグを記述するだけですぐに最低限の動作が可能ですが、
各製作者のゲームデザインにより沿った挙動をさせるには
様々なカスタマイズ(設定)が必要となります。
詳細な設定方法・応用例はpdfドキュメントを熟読して下さい。

@param -----一般設定-----
@param AutoDisable_DefaultEncounter
@desc true: 通常エンカウント方式の無効化設定をスクリプトが代行します (default: false)
@type boolean
@default false
@param FollowerAttack
@type select
@option 隊列歩行なし／先頭キャラクター以外エンカウント判定なし＆シンボルのフォロワーすり抜けなし
@value 0
@option 先頭キャラクター以外にもエンカウント(接触)判定を付ける
@value 1
@option 先頭キャラクター以外エンカウント判定なし＆シンボルのフォロワーすり抜けあり
@value 2
@option 先頭キャラクター以外エンカウント判定なし＆シンボルのフォロワーすり抜けなし＆フォロワー検知あり
@value 3
@option 先頭キャラクター以外にもエンカウント(接触)判定を付ける＆フォロワー検知あり
@value 4
@option 先頭キャラクター以外エンカウント判定なし＆シンボルのフォロワーすり抜けあり＆フォロワー検知あり
@value 5
@default 0
@desc 「隊列歩行」使用時の、フォロワー考慮に関する敵シンボル挙動設定。隊列歩行を使わない場合はそのままで可
@param InvincibleTime_AfterBattle
@desc 戦闘後の無敵(発見されない、接触しない)フレーム時間 (default: 300)
@default 300
@type number
@decimal
@param EnemySearchRange_scale
@desc 敵シンボル移動経路探索量倍率 (default: 2.0)
@default 2.0
@type number
@decimals 2
@param SymbolKeepOut_RegionID
@desc 敵シンボル通行不可リージョンID, -1で無効 (default: -1)
@default -1
@type number
@min -1

@param -リンクエンカウント-
@param Enable_SymbolLink
@desc true: エンカウント時に付近にシンボルが複数存在した場合、まとめて戦闘を行います。要68.「トループ増援システム」
@type boolean
@default false
@param SymbolInvolvementRange
@desc 敵シンボルをリンクエンカウントに巻き込む範囲。プレイヤー中心の半径 (default: 3)
@type number
@default 3
@min 1 
@param MaximumSymbolInvolvement
@desc リンクエンカウントに巻き込む周辺敵シンボルの最大数。0で制限なし
@type number
@default 0
@min 0

@param -ゲーム演出-
@param BalloonID_PlayerDetected
@desc プレイヤーを発見した時にシンボル頭上に表示するふきだしアイコン, -1で無効 (default: 1)
@default 1
@type number
@min -1
@param SE_PlayerDetected
@desc プレイヤーを発見した時に再生される効果音, 無指定で再生しない
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}
@dir audio/se/
@param BalloonID_PlayerFled
@desc プレイヤーを見失った時にシンボル頭上に表示するふきだしアイコン, -1で無効 (default: 6)
@default 6
@type number
@min -1
@param SE_PlayerFled
@desc プレイヤーを見失った時に再生される効果音, 無指定で再生しない
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}
@dir audio/se/
@param BalloonID_Evacuate
@desc プレイヤーを発見して，逃走する時にシンボル頭上に表示するふきだしアイコン, -1で無効 (default: 6)
@default 6
@type number
@min -1
@param SE_Evacuate
@desc プレイヤーを発見て，逃走する時に再生される効果音, 無指定で再生しない
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}
@dir audio/se/
@param BattleBGM_surprised
@desc 不意打ち状態で戦闘突入時の戦闘BGM, 無指定で変更なし
@dir audio/bgm/
@type struct<BGMDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}
@param -エンカウント発生後表現-
@param InvincibleStyle_Flash
@desc シンボルエンカウント発生後のプレイヤー無敵時間における表示方法(点滅) (default: true)
@type boolean
@default true
@param InvincibleStyle_Opaque
@desc シンボルエンカウント発生後のプレイヤー無敵時間における表示方法(透明) (default: false)
@type boolean
@default false
@param InvincibleStyle_Blend
@desc シンボルエンカウント発生後のプレイヤー無敵時間における表示方法(合成方法変更) (default: 0)
@type select
@option 通常
@value 0
@option 加算
@value 1
@option 乗算
@value 2
@option スクリーン
@value 3
@default 0
*/
/*:
@plugindesc <Symbol Encoutner System> v1.71
@author Soryu
@target MZ
@url https://dragonflare.blue/dcave/index_e.php
@help This introduces essencial and a highly functional suite 
of symbol encounter system which are inspired by existing console RPGs.

Indispensable features for symbol encoutner system such as 
- Preemptive/surprised encoutner based on the direction of players 
  and enemy symbol when they collide
- Route Search and Chase (Optimal or less-smart) for enemy symbols
- Invincible time for the player after battles with enemy symbols
  are implemented on your game with one plugin.

Fundamentaly, you just make an event and write a tag as 
<EnemySymbol> 
in the note to work as an enemy symbol.															  
We can specify the behavior of symbols in detail by writing command in "Comment" command. 
@param ---General---
@param AutoDisable_DefaultEncounter
@desc Set true so that the script disables regular encotner. (default: false)
@type boolean
@default false
@param FollowerAttack
@type select
@option No followers./No encounter except for the leader & Symbols does not pass through followers.
@value 0
@option Encoutner is occurred for all party characters touching to symbols.
@value 1
@option No encounter except for the leader & Symbols can pass through followers.
@value 2
@option No encounter except for the leader & Symbols does not pass through followers & Followers are also detected.
@value 3
@option Encoutner is occurred for all party characters & Followers are also detected.
@value 4
@option No encounter except for the leader & Symbols can pass through followers & Followers are also detected.
@value 5
@default 0
@desc Configuration for symbols in terms of collision with a party with followers.
@param InvincibleTime_AfterBattle
@desc Invincible (never detected and start battles) time (frame) after battle (default: 300)
@default 300
@type number
@param EnemySearchRange_scale
@desc Constant for route search length of enemy symbols (default: 2.0)
@default 2.0
@type number
@decimals 2
@param SymbolKeepOut_RegionID
@desc Region ID which Enemy symbols cannot pass, -1 to disable (default: -1)
@default -1
@type number
@min -1

@param -Link Encoutner-
@param Enable_SymbolLink
@desc If true, battles can involve enemies of multiple symbols around the player. Require 68. SoR_TroopWaveReinforcement_MZ.js
@type boolean
@default false
@param SymbolInvolvementRange
@desc The range, a radius, of enemy symbol involvement for link encounter assuming its center is the player position (default: 3)
@default 3
@min 1
@type number
@param MaximumSymbolInvolvement
@desc Maximum number of enemy symbols can be involved to a link encounter, set 0 for no limit.
@type number
@default 0
@min 0

@param -Screen Direction-
@param BalloonID_PlayerDetected
@desc Balloon icon appeared above the symbol when it detects player, -1 to disable (default: 1)
@default 1
@type number
@min -1
@param SE_PlayerDetected
@desc SE played when the symbol detects player, nothing specified to disable
@dir audio/se/
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}
@param BalloonID_PlayerFled
@desc Balloon icon appeared above the symbol when it loses player, -1 to disable (default: 6)
@default 6
@type number
@min -1
@param SE_PlayerFled
@desc SE played when the symbol loses player, nothing specified to disable 
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}
@dir audio/se/
@param BalloonID_Evacuate
@desc Balloon icon appeared above the symbol which is about to escape, -1 to disable (default: 6)
@default 6
@type number
@min -1
@param SE_Evacuate
@desc SE played when the symbol being about to escape, nothing specified to disable
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}
@dir audio/se/
@type file
@param BattleBGM_surprised
@desc Change battle BGM when players are surprised, nothing specified to disable
@dir audio/bgm/
@type struct<BGMDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param ---Effect After Encoutner---
@param InvincibleStyle_Flash
@desc Drawing style of player during invincible time after symbol encoutners (flash)(default: true)
@type boolean
@default true
@param InvincibleStyle_Opaque
@desc Drawing style of player during invincible time after symbol encoutners (opaque)(default: false)
@type boolean
@default false
@param InvincibleStyle_Blend
@desc Drawing style of player during invincible time after symbol encoutners (blend)(default: 0)
@type select
@option Normal
@value 0
@option Add
@value 1
@option Multiply
@value 2
@option Screen
@value 3
@default 0
*/
/*~struct~BGMDATA:
@type string
@param name
@dir audio/bgm/
@type file
@desc BGM
@param volume
@desc 音量 [0...100]
@type number
@default 100
@min 0
@max 100
@param pitch
@desc ピッチ [50...150]
@type number
@default 100
@min 50
@max 150
@param pan
@desc パン(位相) [-50...50]
@type number
@default 0
@min -50
@max 50
*/
/*~struct~BGMDATAE:
@type string
@param name
@dir audio/bgm/
@type file
@desc BGM
@param volume
@desc Volume of BGM [0...100]
@type number
@default 100
@min 0
@max 100
@param pitch
@desc Pitch of BGM [50...150]
@type number
@default 100
@min 50
@max 150
@param pan
@desc Pan of BGM [-50...50]
@type number
@default 0
@min -50
@max 50
*/
/*~struct~SEDATA:
@type string
@param name
@dir audio/se/
@type file
@desc 効果音
@param volume
@desc 音量 [0...100]
@type number
@default 100
@min 0
@max 100
@param pitch
@desc ピッチ [50...150]
@type number
@default 100
@min 50
@max 150
@param pan
@desc パン(位相) [-50...50]
@type number
@default 0
@min -50
@max 50
*/
/*~struct~SEDATAE:
@type string
@param name
@dir audio/se/
@type file
@desc SE File
@param volume
@desc Voulme [0...100]
@type number
@default 100
@min 0
@max 100
@param pitch
@desc Pitch [50...150]
@type number
@default 100
@min 50
@max 150
@param pan
@desc Pan [-50...50]
@type number
@default 0
@min -50
@max 50
*/
(function () {
	const Param = PluginManager.parameters('SoR_EnemySymbolEncounter_MZ');

	const AutoDisable_DefaultEncounter = Boolean(Param['AutoDisable_DefaultEncounter'] === 'true') || false;
	const FollowerAttack = Number(Param['FollowerAttack']) || 0;
	const InvinsibleDuration_AB = Number(Param['InvincibleTime_AfterBattle']) || 300;
	const SearchRange_scale = Number(Param['EnemySearchRange_scale']) || 2.0;
	const SymbolKeepOut_RegionID = Number(Param['SymbolKeepOut_RegionID']) || -1;
	const BalloonID_PlayerDetected = Number(Param['BalloonID_PlayerDetected']) || 1;
	const BalloonID_PlayerFled = Number(Param['BalloonID_PlayerFled']) || 6;

	const SE_PlayerDetected = convertJsonSE(Param['SE_PlayerDetected']) || '';
	const SE_PlayerFled = convertJsonSE(Param['SE_PlayerFled']) || '';
	const BattleBGM_surprised = convertJsonSE(Param['BattleBGM_surprised']) || '';

	const InvincibleStyle_Flash = Boolean(Param['InvincibleStyle_Flash'] === 'true') || false;
	const InvincibleStyle_Opaque = Boolean(Param['InvincibleStyle_Opaque'] === 'true') || false;
	const InvincibleStyle_Blend = Number(Param['InvincibleStyle_Blend']) || 0;
	//v1.30
	const BalloonID_Evacuate = Number(Param['BalloonID_Evacuate']) || 6;
	const SE_Evacuate = convertJsonSE(Param['SE_Evacuate']) || '';

	function convertJsonSE(param) {
		const obj = JSON.parse(param);
		obj.volume = Number(obj.volume);
		obj.pan = Number(obj.pan);
		obj.pitch = Number(obj.pitch);
		return obj;
	}

	//v1.70
	const isTWR = PluginManager._scripts.includes("SoR_TroopWaveReinforcement_MZ") ? true : false;
	const Enable_SymbolLink = Boolean(Param['Enable_SymbolLink'] === 'true') || false;
	const isActive_SymbolLink = isTWR && Enable_SymbolLink;
	const SymbolInvolvementRange = Number(Param['SymbolInvolvementRange']) || 5;
	const MaximumSymbolInvolvement = Number(Param['MaximumSymbolInvolvement']) || 5;


	//////////////////////////////////////////////////////////////////////////
	//
	// Encount Manager
	//
	//////////////////////////////////////////////////////////////////////////
	const SoR_ESE_BM_onEncounter = BattleManager.onEncounter;
	BattleManager.onEncounter = function () {
		SoR_ESE_BM_onEncounter.call(this);
		this._preemptive = $gameTemp.encflag == 2 ? true : false;
		this._surprise = $gameTemp.encflag == 1 ? true : false;
	}

	const SoR_ESE_GE_lock = Game_Event.prototype.lock;
	Game_Event.prototype.lock = function () {
		const ens = this.event().meta.EnemySymbol;
		if (ens) {
			if (this._locked) return;
			this._prelockDirection = this.direction();
			$gameTemp.isEncounteredonMap = ens;
			this.EncountDir();

			if (isActive_SymbolLink == true) BattleManager.searchSEInvolvement(this._eventId); //v1.70
			$gameTemp.JustEncounterID = this._eventId;
			this._locked = true;
		}
		else SoR_ESE_GE_lock.call(this);
	}

	Game_Event.prototype.EncountDir = function () {
		let player = $gamePlayer;
		if ($gameTemp.collisionFollower != null) player = $gameTemp.collisionFollower

		const p = { x: player.x, y: player.y, dir: player._direction };
		const e = { x: this.x, y: this.y, dir: this._direction };
		$gameTemp.encflag = 0;
		if (p.dir == e.dir) {
			AlignSymbolWithDirection(p, e);
			if (e.x > p.x) $gameTemp.encflag = 2;
			else $gameTemp.encflag = 1;
		}
	}

	function AlignSymbolWithDirection(p, e) {
		e.x -= p.x;
		e.y -= p.y;
		p.x -= p.x;
		p.y -= p.y;
		while (p.dir != 6) {
			//Cyclic subgroup generated by 2 \in Group(Z_{10}-{0},*)	
			p.dir = (p.dir * 2) % 10;
			e.dir = (e.dir * 2) % 10;
			//rot90
			const tmp = -e.y;
			e.y = e.x;
			e.x = tmp;
		}
	}


	const SoR_ESE_SB_terminate = Scene_Battle.prototype.terminate;
	Scene_Battle.prototype.terminate = function () {
		SoR_ESE_SB_terminate.call(this);

		if ($gameTemp.isEncounteredonMap) {
			$gamePlayer.SetupInvinsibleEffectsAfterSE();
			$gameTemp.isEncounteredonMap = false;
			$gameTemp.JustAfterEncounter = true;
			$gameTemp.Encounter_BattleEndSwitch = true;
			if ($gameTemp.encflag == 1 && BattleBGM_surprised.name != '') {//surprised bgm
				$gameSystem.setBattleBgm($gameTemp.defaultBattleBGM);
			}
		}
		$gameTemp.encflag = 0;
		$gameTemp.collisionFollower = null;
	}

	const SoR_ESE_SM_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function () {
		SoR_ESE_SM_update.call(this);
		this.updateCharacterForSymbolEnc();
	}

	Spriteset_Map.prototype.updateCharacterForSymbolEnc = function () {
		if ($gameSystem.SoRSE_InvincibleExcept()) {
			//invinsible time after battles
			if ($gameTemp.invincibleAfterEnc >= 0) $gamePlayer.UpdateInvinsibleEffectsAfterSE();
			else if ($gameTemp.invincibleAfterEnc != -1) $gamePlayer.FinishInvinsibleEffectsAfterSE();
		}
	}

	const SoR_ESE_GP_clearTransferInfo = Game_Player.prototype.clearTransferInfo;
	Game_Player.prototype.clearTransferInfo = function () {
		SoR_ESE_GP_clearTransferInfo.call(this);
		this.FinishInvinsibleEffectsAfterSE();
	}



	const SoR_ESE_GE_start = Game_Event.prototype.start;
	Game_Event.prototype.start = function () {
		if (this.event().meta.EnemySymbol) {
			const ES = this._SoRES;

			if (VehicleCheck(0) == false) return;// boat vs enemy on the ground ???
			if ($gameTemp.invincibleAfterEnc != -1) return;
			else { //For after event(battle)
				if (ES.Isreturn_afterwait) {
					ES.IsDetectPlayer = false;
					ES.IsChasePlayer = false;
					ES.IsFleePlayer = true;
					ES.waitAC_count = ES.wait_afterchase;
					ES.IsStayAfterFlee = true;
				}
				else this.checkAllchaseFlags();
				this.setMoveSpeed(ES.default_speed);
			}

		}

		SoR_ESE_GE_start.call(this);
	}

	function VehicleCheck(v) {
		if (v == 0) {
			if ($gamePlayer.isInVehicle()) return false;
			else return true;
		}
		return true;
	}


	const SoR_ESE_GI_command301 = Game_Interpreter.prototype.command301;
	Game_Interpreter.prototype.command301 = function (params) {

		if ($gameTemp.isEncounteredonMap == true && !$gameParty.inBattle()) {
			let troopId;
			if (params[0] === 0) troopId = params[1]; // Direct designation
			else if (params[0] === 1) troopId = $gameVariables.value(params[1]); // Designation with a variable
			else troopId = $gamePlayer.makeEncounterTroopId(); // Same as Random Encounters

			if ($dataTroops[troopId]) {
				BattleManager.setup(troopId, params[2], params[3]);
				BattleManager.onEncounter();
				if ($gameTemp.encflag == 1 && BattleBGM_surprised.name != '') {//surprised bgm
					$gameTemp.defaultBattleBGM = $gameSystem._battleBgm;
					$gameSystem.setBattleBgm(BattleBGM_surprised);
				}

				BattleManager.setEventCallback(function (n) {
					this._branch[this._indent] = n;
				}.bind(this));
				$gamePlayer.makeEncounterCount();
				SceneManager.push(Scene_Battle);
			}
			return true;
		}

		return SoR_ESE_GI_command301.call(this, ...arguments); //return for the interpreter
	}



	//v1.70
	BattleManager.searchSEInvolvement = function (mainEId) {
		if ($gameParty.inBattle()) return;
		if ($dataMap.meta.SoR_NoLinkEncounter == true) return;

		const seEVs = $gameMap.events().filter(event => !!event._SoRES && event.findProperPageIndex() >= 0 && calcDist(event, $gamePlayer) <= SymbolInvolvementRange);

		let n_involved = 0;
		$gameTemp.SoRSE_involvedEIDs = [];
		for (const ev of seEVs) {
			if (MaximumSymbolInvolvement > 0 && n_involved >= MaximumSymbolInvolvement) break;
			if (ev._eventId == mainEId) continue;


			if (ev._SoRES.can_linkSymbols == true && BresenhamTest(ev)) {
				const p_idx = ev.findProperPageIndex();
				const nL = ev.event().pages[p_idx].list.length;

				let isfound = false;
				for (let i = 0; i < nL; i++) {
					if (ev.event().pages[p_idx].list[i].code == 301) {
						const com = ev.event().pages[p_idx].list[i].parameters;
						if (typeof $gameTemp.TroopWaves === "undefined") $gameTemp.TroopWaves = [];
						$gameTemp.TroopWaves.push(com[1]);
						n_involved++;
						isfound = true;
					}
					else if (isfound == true && Math.floor(ev.event().pages[p_idx].list[i].code / 100) != 3) {
						$gameTemp.SoRSE_involvedEIDs.push({ evId: ev._eventId, idx: i + 1 });
						break;
					}
				}
			}
		}

		//if not mainEId
		//if With EnemySymbol tag
		//if Can pass bresenham test
		//if canSymbolInvolved_SE
		//-> involve (call troopWaveReinforcement)		
		// record EventID involved
	}

	function BresenhamTest(e) {
		const p = $gamePlayer;
		if (e.x - p.x != 0) return Bresenham(e, p, true);
		return Bresenham90(e, p, true);
	}

	const SoR_ESE_GI_currentCommand = Game_Interpreter.prototype.currentCommand;
	Game_Interpreter.prototype.currentCommand = function () {
		if ($gameTemp.Encounter_BattleEndSwitch == true) {
			//trigger involved symbol events
			const data = {
				code: 911,
				indent: 0,
				parameters: []
			};
			return data;
		}

		return SoR_ESE_GI_currentCommand.call(this);
	}

	Game_Interpreter.prototype.command911 = function (params) {
		$gameTemp.Encounter_BattleEndSwitch = false;
		this._index--;
		if (typeof $gameTemp.SoRSE_involvedEIDs === "undefined") return true;

		const Events = $gameMap.events();
		for (const cand of $gameTemp.SoRSE_involvedEIDs) {
			const fidx = Events.findIndex(x => x._eventId == cand.evId);
			if (fidx == -1) continue;

			const ev = Events[fidx];
			ev.start();

			const elist = ev.list().slice(cand.idx + 1);
			if (ev._interpreter == null) ev._interpreter = new Game_Interpreter();
			ev._interpreter.setup(elist, ev._eventId);
		}

		return true;
	}

	/*
	
Game_Map.prototype.setupStartingMapEvent = function() {
	for (const event of this.events()) {
		if (event.isStarting()) {
			event.clearStartingFlag();
			this._interpreter.setup(event.list(), event.eventId());
			return true;
		}
	}
	return false;
};*/

	//////////////////////////////////////////////////////////////////////////
	//
	// Process Invinsible Effect for player Afeter Symbol Encounter
	//
	//////////////////////////////////////////////////////////////////////////

	Game_Player.prototype.SetupInvinsibleEffectsAfterSE = function () {
		$gameTemp.invincibleAfterEnc = InvinsibleDuration_AB;
		if (InvincibleStyle_Opaque) $gamePlayer.setOpacity(127);
		if (InvincibleStyle_Blend != 0) $gamePlayer.setBlendMode(InvincibleStyle_Blend);
		$gameTemp._flash_count = 0;
	}

	Game_Player.prototype.UpdateInvinsibleEffectsAfterSE = function () {
		$gameTemp.invincibleAfterEnc--;

		if (InvincibleStyle_Flash) {
			let flash;
			if ($gameTemp.invincibleAfterEnc >= InvinsibleDuration_AB * 0.5) flash = 12;
			else if ($gameTemp.invincibleAfterEnc >= InvinsibleDuration_AB * 0.25) flash = 9;
			else if ($gameTemp.invincibleAfterEnc >= InvinsibleDuration_AB * 0.1) flash = 7;
			else flash = 5;

			$gameTemp._flash_count = ($gameTemp._flash_count + 1) % flash;
			if ($gameTemp._flash_count <= 1) $gamePlayer.SetInvinsibleAfterSymbolEnc(true);
			else $gamePlayer.SetInvinsibleAfterSymbolEnc(false);

			if ($gameTemp.invincibleAfterEnc == 0) $gamePlayer.FinishInvinsibleEffectsAfterSE(false);
		}
		if (InvincibleStyle_Opaque && $gameTemp.invincibleAfterEnc == 0) $gamePlayer.FinishInvinsibleEffectsAfterSE(false);
	}

	Game_Player.prototype.FinishInvinsibleEffectsAfterSE = function () {
		$gameTemp.invincibleAfterEnc = -1;
		$gameTemp._flash_count = 0;
		$gamePlayer.SetInvinsibleAfterSymbolEnc(false);
	}

	Game_Player.prototype.SetInvinsibleAfterSymbolEnc = function (val) {
		if (InvincibleStyle_Opaque) $gamePlayer.setOpacity(255);
		if (InvincibleStyle_Blend != 0) $gamePlayer.setBlendMode(0);
		if (InvincibleStyle_Flash) {
			const v = val === true ? (InvincibleStyle_Opaque === true ? 127 : 0) : 255;
			$gamePlayer.setOpacity(v);
		}
	}

	//////////////////////////////////////////////////////////////////////////
	//
	// Player Observer on Map Scene (by enemy events)
	//
	//////////////////////////////////////////////////////////////////////////

	const SoR_ESE_GE_setupPage = Game_Event.prototype.setupPage;
	Game_Event.prototype.setupPage = function () {
		SoR_ESE_GE_setupPage.call(this);
		this.InitEnemySymbolBehavior();
	}

	Game_Event.prototype.InitEnemySymbolBehavior = function () {
		if (!this.event().meta.EnemySymbol) return;
		const entag = this.event().meta.EnemySymbol;

		let seinv_tag = null;
		if (typeof entag === "string" || entag instanceof String) seinv_tag = entag.trim();
		else seinv_tag = entag;

		this._SoRES = {
			Is_symbolIgnore: false,
			can_linkSymbols: seinv_tag == "NotInvolved" ? false : true,
			trails: [],
			trails_n: 0,
			see_distance: 5,
			see_angle: 30 * Math.PI / 180 + 0.00001,
			serach_state: null,
			default_speed: this._moveSpeed,
			chase_speed: 4,
			chase_duration: 40,
			Dir8moveChase: false,
			waitAC_count: 180,
			bushrate: 0.2,
			IsDetectBalloon: false,
			IsDetectPlayer: false,
			IsChasePlayer: false,
			IsFleePlayer: false,
			Isreturn_afterwait: false,
			IsReturnOriginalPos: false,
			detectedAlertDuration: 10,
			detectedAlert_count: 0,
			wait_afterchase: 150,
			updateRoute_interval: 5,
			Ischase_onVehicle: false,
			call_CommonEventID: [0, 0, 0, 0, 0],
			call_ScriptsInPhases: [null, null, null, null, null],
			SpontaneousEvacuate: false,
			bullmove: false,
			_bullcounter: 0,
			_bullaxis: -1,
			leapmove: false,
			leapanim: 0,
			leapduration: 180,
			EvacCond: "true",
			//Breakable Map Objects
			_BMOattacked: false,
			_BMOcanstan: true,
			_BMOstanned: false,
			_BMOstanwait: 0
		}

		this.default_x = this.x;
		this.default_y = this.y;

		const p_idx = this.findProperPageIndex();
		if (p_idx >= 0) {//do not process for invalid page (no unconditional pages)
			const nL = this.event().pages[p_idx].list.length;
			for (let i = 0; i < nL; i++) {
				if (this.event().pages[p_idx].list[i].code == 108 || this.event().pages[p_idx].list[i].code == 408) {
					const com = this.event().pages[p_idx].list[i].parameters;
					this.SetSymbolTags(com[0]);
				}
			}
		}
	}


	Game_Event.prototype.canSymbolInvolved_SE = function () {
		if (!this._SoRES) return false;
		return this._SoRES.can_linkSymbols;
	}


	Game_Event.prototype.SetSymbolTags = function (com) {
		const ES = this._SoRES;
		if (com.match(/(?:distance):[ ]*(.*)/i)) ES.see_distance = parseInt(RegExp.$1);
		else if (com.match(/(?:angle):[ ]*(.*)/i)) ES.see_angle = parseInt(RegExp.$1) * Math.PI / 180 + 0.00001;
		else if (com.match(/(?:speed):[ ]*(.*)/i)) ES.chase_speed = Number(RegExp.$1) != NaN ? Number(RegExp.$1) : ES.chase_speed;
		else if (com.match(/(?:duration):[ ]*(.*)/i)) ES.chase_duration = parseInt(RegExp.$1);
		else if (com.match(/(?:wait):[ ]*(.*)/i)) ES.wait_afterchase = parseInt(RegExp.$1);
		else if (com.match(/(?:return)[ ]*/i)) ES.Isreturn_afterwait = true;
		else if (com.match(/(?:ignore)/i)) ES.Is_symbolIgnore = true;
		else if (com.match(/(?:bush_rate):[ ]*(.*)/i)) ES.bushrate = parseFloat(RegExp.$1);
		else if (com.match(/(?:alert_time):[ ]*(.*)/i)) ES.detectedAlertDuration = parseInt(RegExp.$1);
		else if (com.match(/(?:route_search):[ ]*(.*)/i)) ES.updateRoute_interval = parseInt(RegExp.$1);
		else if (com.match(/(?:chase_vehicle)[ ]*/i)) ES.Ischase_onVehicle = true;
		else if (com.match(/(?:script5):[ ]*(.*)/i)) ES.call_ScriptsInPhases[4] = String(RegExp.$1).trim();
		else if (com.match(/(?:script4):[ ]*(.*)/i)) ES.call_ScriptsInPhases[3] = String(RegExp.$1).trim();
		else if (com.match(/(?:script3):[ ]*(.*)/i)) ES.call_ScriptsInPhases[2] = String(RegExp.$1).trim();
		else if (com.match(/(?:script2):[ ]*(.*)/i)) ES.call_ScriptsInPhases[1] = String(RegExp.$1).trim();
		else if (com.match(/(?:script):[ ]*(.*)/i)) ES.call_ScriptsInPhases[0] = String(RegExp.$1).trim();
		else if (com.match(/(?:common_event5):[ ]*(.*)/i)) ES.call_CommonEventID[4] = parseInt(RegExp.$1);
		else if (com.match(/(?:common_event4):[ ]*(.*)/i)) ES.call_CommonEventID[3] = parseInt(RegExp.$1);
		else if (com.match(/(?:common_event3):[ ]*(.*)/i)) ES.call_CommonEventID[2] = parseInt(RegExp.$1);
		else if (com.match(/(?:common_event2):[ ]*(.*)/i)) ES.call_CommonEventID[1] = parseInt(RegExp.$1);
		else if (com.match(/(?:common_event):[ ]*(.*)/i)) ES.call_CommonEventID[0] = parseInt(RegExp.$1);
		else if (com.match(/(?:evacuate):[ ]*(.*)/i)) { ES.SpontaneousEvacuate = true; ES.EvacCond = String(RegExp.$1).trim(); }
		else if (com.match(/(?:evacuate)[ ]*/i)) { ES.SpontaneousEvacuate = true; }
		else if (com.match(/(?:8dir)[ ]*/i)) { ES.Dir8moveChase = true; }
		else if (com.match(/(?:bull)[ ]*/i)) { ES.bullmove = true; }
		else if (com.match(/(?:leap):[ ]*(.*)/i)) { ES.leapmove = true; ES.leapanim = parseInt(RegExp.$1); }
	}


	const SoR_ESE_GE_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
	Game_Event.prototype.updateSelfMovement = function () {
		if (this.event().meta.EnemySymbol) {
			const ES = this._SoRES;
			if (this.reactBMO_checkStanned()) return;
			else if (!ES.Is_symbolIgnore && ES.serach_state != null) {
				if (this._erased || this.findProperPageIndex() == -1) return;
				if ($gameMap.isEventTriggered()) return;
				const state_bin = this.checkAllchaseFlags();

				const state = ES.serach_state;
				if (ES.IsChasePlayer) {
					if (ES.SpontaneousEvacuate && SoR_Eval(ES.EvacCond)) this.EvacuateFromPlayer(state);
					else if (ES.bullmove) this.BullPlayerChaser(state);
					else if (ES.leapmove && state.dist > 3) this.LeapPlayerChaser(state);
					else this.PlayerChaser(state);
				}
				else if (ES.IsFleePlayer) this.FleePlayer();
				else if (ES.IsReturnOriginalPos) this.ReturnOrigPoint(state.dist);
				if (state_bin != 0b00000) return;
			}
		}

		SoR_ESE_GE_updateSelfMovement.call(this);
	}


	const SoR_ESE_GE_update = Game_Event.prototype.update;
	Game_Event.prototype.update = function () {
		SoR_ESE_GE_update.call(this);
		if (this.event().meta.EnemySymbol) this.updateSEprocess();
	}


	Game_Event.prototype.updateSEprocess = function () {
		const ES = this._SoRES;
		if ($gameTemp.JustAfterEncounter && $gameTemp.JustEncounterID == this._eventId) {//just after a battle
			if (ES.call_CommonEventID[3] != 0) $gameTemp.reserveCommonEvent(ES.call_CommonEventID[3]);
			if (ES.call_ScriptsInPhases[3] != null) this.SoR_ExecScript(ES.call_ScriptsInPhases[3]);
			$gameTemp.JustAfterEncounter = false;
			$gameTemp.JustEncounterID = -1;
		}

		if (this._erased || this.findProperPageIndex() == -1) return;

		if (ES.Is_symbolIgnore || this.isVehicleChase()) {
			this.clearAllchaseFlags();
			return;
		}

		if ($gameTemp.invincibleAfterEnc > -1) {
			if (ES.IsChasePlayer) {
				ES.IsChasePlayer = false;
				ES.IsFleePlayer = true;
			}
			ES.IsDetectPlayer = false;
		}
		else if ($gameTemp.invincibleAfterEnc == -1 && !this.isMoving()) {
			const state = this.serachPlayer();
			ES.serach_state = state;
			if (state.flag) ES.IsDetectPlayer = true;
			if (ES.IsDetectPlayer && !ES.IsChasePlayer && !ES.IsFleePlayer) this.DetectedPlayer();
		}
	}


	Game_Event.prototype.isVehicleChase = function () {
		const ES = this._SoRES;
		let flag = $gamePlayer.isInVehicle();
		if (ES.Ischase_onVehicle) flag = false;
		return flag;
	}

	Game_Event.prototype.checkAllchaseFlags = function () {
		const ES = this._SoRES;
		let ret = 0b00000;

		if (ES.IsDetectPlayer) ret += 0b000001;
		if (ES.IsDetectBalloon) ret += 0b000010;
		if (ES.IsChasePlayer) ret += 0b000100;
		if (ES.IsFleePlayer) ret += 0b001000;
		if (ES.IsStayAfterFlee) ret += 0b010000;
		if (ES.IsReturnOriginalPos) ret += 0b100000;
		return ret;
	}

	Game_Event.prototype.clearAllchaseFlags = function () {
		const ES = this._SoRES;
		ES.IsDetectPlayer = false;
		ES.IsDetectBalloon = false;
		ES.IsChasePlayer = false;
		ES.IsFleePlayer = false;
		ES.IsStayAfterFlee = false;
		ES.IsReturnOriginalPos = false;

		this.setMoveSpeed(ES.default_speed);
	}


	/////////////////////////////////////////////////////////////////
	Game_Event.prototype.reactBMO_checkStanned = function () {
		const ES = this._SoRES;
		if (!PluginManager._scripts.includes("SoR_BreakableMapObjects_MZ")) return false;
		if (!ES._BMOattacked) return false;

		if (ES._BMOstanned) {
			if (!this._balloonPlaying) $gameTemp.requestBalloon(this, 13);
		}

		ES._BMOstanwait--;

		if (ES._BMOstanwait > 0) return true;
		else if (ES._BMOattacked) {
			ES._BMOstanwait = 0;
			ES._BMOattacked = false;
			ES._BMOstanned = false;
			ES.IsDetectPlayer = true; // start to chase
			return false;
		}

		return false;
	}
	/////////////////////////////////////////////////////////////////






	//v1.31
	/////////////////////////////////////////////////////////////////////////
	const SoR_ESE_GP_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
	Game_Player.prototype.triggerButtonAction = function () {
		$gameTemp._ESE_triggerFromOK = true;//////
		return SoR_ESE_GP_triggerButtonAction.call(this);
	}

	const SoR_ESE_GP_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
	Game_Player.prototype.triggerTouchAction = function () {
		$gameTemp._ESE_triggerFromOK = false;
		return SoR_ESE_GP_triggerTouchAction.call(this);
	}

	const SoR_ESE_GP_startMapEvent = Game_Player.prototype.startMapEvent;
	Game_Player.prototype.startMapEvent = function (x, y, triggers, normal) {
		//avoid encounter with symbol on the ground while in the sky
		const cands = $gameMap.GetEventsXY_SoRESE(x, y);
		for (const ev of cands) {
			if (ev.event().meta.EnemySymbol) {
				if ($gamePlayer.isInAirship()) return;
				if ($gameTemp._ESE_triggerFromOK === true) return;
			}
		}
		SoR_ESE_GP_startMapEvent.call(this, x, y, triggers, normal);
	}
	/////////////////////////////////////////////////////////////////////////

	Game_Event.prototype.serachPlayer = function () {
		const ES = this._SoRES;
		let flag = false;
		const p = { x: $gamePlayer.x, y: $gamePlayer.y, dir: $gamePlayer._direction };
		const e = { x: this.x, y: this.y, dir: this._direction };

		const bush_rate = $gameMap.isBush(p.x, p.y) == true ? ES.bushrate : 1;
		const dist = calcDist(e, p);
		if (dist <= Math.ceil(ES.see_distance * bush_rate)) {
			const ang = calcAngle(e, p);
			if (ang >= -ES.see_angle && ang <= ES.see_angle) {
				if (e.x - p.x != 0) flag = Bresenham(e, p);
				else flag = Bresenham90(e, p);
			}
		}

		if (FollowerAttack >= 3) {// walking with followers
			const flws = this.AdditionalSerachForFollowers(e);
			flag = flag || flws.flag;
			if (flws.flag) dist = flws.dist;
		}

		return { dist: dist, flag: flag };
	}

	// for only followers
	Game_Event.prototype.AdditionalSerachForFollowers = function (e) {
		const ES = this._SoRES;
		const flw = $gamePlayer._followers.visibleFollowers();

		let flag = false;
		let dist = 0;
		const n_flw = flw.length;
		for (let i = 0; i < n_flw; i++) {
			let p = { x: flw[i].x, y: flw[i].y, dir: flw[i]._direction };
			const bush_rate = $gameMap.isBush(p.x, p.y) == true ? ES.bushrate : 1;
			dist = calcDist(e, p);
			if (dist <= Math.ceil(ES.see_distance * bush_rate)) {
				const ang = calcAngle(e, p);
				if (ang >= -ES.see_angle && ang <= ES.see_angle) {
					if (e.x - p.x != 0) flag = flag || Bresenham(e, p);
					else flag = flag || Bresenham90(e, p);
				}
			}
		}

		return { dist: dist, flag: flag };
	}


	function Bresenham(a1, a2, ignore) {
		let flag = true;
		const dy = Math.abs(a2.y - a1.y);
		const dx = Math.abs(a2.x - a1.x);
		let err = dx - dy;

		const inc_x = a2.x > a1.x ? 1 : -1;
		const inc_y = a2.y > a1.y ? 1 : -1;

		let cx = a1.x;
		let cy = a1.y;

		const dir_x = dx > 0 ? 6 : 4;
		const dir_y = dy > 0 ? 2 : 8;

		while (1) {
			if (!$gameMap.isPassable(cx, cy, dir_x) || !$gameMap.isPassable(cx, cy, dir_y) || $gameMap.regionId(cx, cy) == SymbolKeepOut_RegionID) {
				flag = false;
				break;
			}
			if (cx == a2.x && cy == a2.y) break;

			if (!(cx == a1.x && cy == a1.y) && !(cx == a2.x && cy == a2.y) && !isUnPassableEvent(cx, cy, ignore)) {
				flag = false;
				break;
			}

			const e2 = err * 2;
			if (e2 > -dy) {
				err -= dy;
				cx += inc_x;
			}
			if (e2 < dx) {
				err += dx;
				cy += inc_y;
			}
		}

		return flag;
	}

	function Bresenham90(a1, a2, ignore) {
		let flag = true;
		const incre = a2.y > a1.y ? 1 : -1;
		const cx = a1.x;
		for (let cy = a1.y; ; cy += incre) {
			if (!$gameMap.isPassable(cx, cy, a1.dir) || $gameMap.regionId(cx, cy) == SymbolKeepOut_RegionID) {
				flag = false;
				break;
			}
			if (!(cx == a1.x && cy == a1.y) && !(cx == a2.x && cy == a2.y) && !isUnPassableEvent(cx, cy, ignore)) {
				flag = false;
				break;
			}
			if (cy == a2.y) break;

		}
		return flag;
	}

	function isUnPassableEvent(x, y, ignore) {
		if (ignore == true) return true;//to ignore character events for bresenham

		let flag = true;
		$gameMap.GetEventsXY_SoRESE(x, y).forEach(function (event) {
			if (event.isNormalPriority() === true) {
				flag = false;
			}
		});

		return flag;
	}

	Game_Event.prototype.DetectedPlayer = function () {
		const ES = this._SoRES;
		if (!ES.IsDetectBalloon) {
			if (!ES.IsReturnOriginalPos) {
				this.default_x = this.x;
				this.default_y = this.y;
			}

			ES.detectedAlert_count = ES.detectedAlertDuration;
			ES.IsDetectBalloon = true;
			ES.IsStayAfterFlee = false;
			ES.IsReturnOriginalPos = false;

			//balloon
			if (this.SpontaneousEvacuate && SoR_Eval(ES.EvacCond)) {//evacuate
				if (BalloonID_Evacuate != -1) $gameTemp.requestBalloon(this, BalloonID_Evacuate);
				if (SE_Evacuate.name != '') AudioManager.playSe(SE_Evacuate);
			}
			else {//regular
				if (BalloonID_PlayerDetected != -1) $gameTemp.requestBalloon(this, BalloonID_PlayerDetected);
				if (SE_PlayerDetected.name != '') AudioManager.playSe(SE_PlayerDetected);
			}
			//common ev
			if (ES.call_CommonEventID[0] != 0) $gameTemp.reserveCommonEvent(ES.call_CommonEventID[0]);
			if (ES.call_ScriptsInPhases[0] != null) this.SoR_ExecScript(ES.call_ScriptsInPhases[0]);
		}

		ES.detectedAlert_count--;

		if (ES.detectedAlert_count < 0) {
			ES.IsDetectBalloon = false;
			this.InitPlayerChase();
		}
	}


	Game_Event.prototype.InitPlayerChase = function () {
		const ES = this._SoRES;
		this.setMoveSpeed(ES.chase_speed);
		ES.IsChasePlayer = true;
		ES.chase_time = ES.chase_duration;
		ES.trails = [];
		if (ES.call_CommonEventID[1] != 0) $gameTemp.reserveCommonEvent(ES.call_CommonEventID[1]);
		if (ES.call_ScriptsInPhases[1] != null) this.SoR_ExecScript(ES.call_ScriptsInPhases[1]);

		if (!ES.SpontaneousEvacuate || !SoR_Eval(ES.EvacCond)) {
			if (ES.bullmove) {
				this.setMoveSpeed(1);
				this.setDirectionFix(true);
				ES._bullaxis = -1;
				ES._bullcounter = 0;
			}
			else if (ES.leapmove) {
				ES.leapduration = 180;
			}
		}
	}


	Game_Event.prototype.PlayerChaser = function (state) {
		const ES = this._SoRES;
		const d = state.dist
		let isChaseFeasible = true;
		if (ES.chase_time >= 0) {
			//make route
			if ((ES.trails.length == 0 || ES.trails_n >= ES.updateRoute_interval)) {
				ES.trails = this.AstarDir($gamePlayer.x, $gamePlayer.y, ES.see_distance * ($gameMap.isBush($gamePlayer.x, $gamePlayer.y) == true ? ES.bushrate : 1));///d
				ES.trails_n = 0;
			}
			if (ES.trails.length >= 1) {// trail the player
				const direction = this.MakeDir(ES.trails[0]);
				ES.trails_n++;
				ES.trails.shift();
				if (ES.Dir8moveChase && ES.trails.length >= 1) {
					const pattern = [8, 12, 32, 48];
					const dir2 = this.MakeDir2(direction, ES.trails[0]);
					if (d >= 2 && pattern.some(x => x == direction * dir2)) {////8dir
						if (direction == 4 || direction == 6) this.moveDiagonally(direction, dir2);
						else this.moveDiagonally(dir2, direction);
						ES.trails_n++;
						ES.trails.shift();
					}
					else if (direction > 0) this.moveStraight(direction);
				}
				else if (direction > 0) this.moveStraight(direction);
			}
			else isChaseFeasible = false; // player missing
			ES.chase_time--;
		}

		if (ES.chase_time < 0 && isChaseFeasible && d <= ES.see_distance / 3) ES.chase_time = 10;
		if (ES.chase_time < 0 || !isChaseFeasible) {
			ES.IsDetectPlayer = false;
			ES.IsChasePlayer = false;
			ES.IsFleePlayer = true;
		}
	}


	Game_Event.prototype.BullPlayerChaser = function (state) {
		const ES = this._SoRES;
		const d = state.dist
		let isChaseFeasible = true;
		if (ES._bullcounter < 90) {//charge
			ES._bullaxis = Math.abs($gamePlayer.x - this.x) <= Math.abs($gamePlayer.y - this.y) ? $gamePlayer.x > this.x ? 1 : 2 : $gamePlayer.y > this.y ? -1 : -2;
			const destx = ES._bullaxis > 0 ? $gamePlayer.x : this.x;// xe=xp
			const desty = ES._bullaxis < 0 ? $gamePlayer.y : this.y;// ye=yp
			//make route
			if ((ES.trails.length == 0 || ES.trails_n >= ES.updateRoute_interval)) {
				ES.trails = this.AstarDir(destx, desty, 10);///d
				ES.trails_n = 0;
			}
			if (ES.trails.length >= 1) {// trail the player
				const direction = this.MakeDir(ES.trails[0]);
				ES.trails_n++;
				ES.trails.shift();
				if (ES.Dir8moveChase && ES.trails.length >= 1) {
					const pattern = [8, 12, 32, 48];
					const dir2 = this.MakeDir2(direction, ES.trails[0]);
					if (pattern.some(x => x == direction * dir2)) {////8dir
						if (direction == 4 || direction == 6) this.moveDiagonally(direction, dir2);
						else this.moveDiagonally(dir2, direction);
						ES.trails_n++;
						ES.trails.shift();
					}
					else if (direction > 0) this.moveStraight(direction);
				}
				else if (direction > 0) this.moveStraight(direction);
			}
			else ES._bullcounter++; // go bull fast
			ES._bullcounter++;

			if (ES._bullcounter >= 90) {
				ES.trails = [];
			}
		}
		else if (ES.chase_time >= 0) {//bull
			//make route
			this.setDirectionFix(false);
			this.setMoveSpeed(ES.chase_speed);
			const destx = ES._bullaxis < 0 ? $gamePlayer.x + ($gamePlayer.x > this.x ? 0 : -0) : this.x;
			const desty = ES._bullaxis > 0 ? $gamePlayer.y + ($gamePlayer.y > this.y ? 0 : -0) : this.y;

			if ((ES.trails.length == 0 || ES.trails_n >= ES.updateRoute_interval)) {
				ES.trails = this.AstarDir(destx, desty, 10);///d
				ES.trails_n = 0;
			}
			if (ES.trails.length >= 1) {// trail the player
				const direction = this.MakeDir(ES.trails[0]);
				ES.trails_n++;
				ES.trails.shift();
				if (ES.Dir8moveChase && ES.trails.length >= 1) {
					const pattern = [8, 12, 32, 48];
					const dir2 = this.MakeDir2(direction, ES.trails[0]);
					if (pattern.some(x => x == direction * dir2)) {////8dir
						if (direction == 4 || direction == 6) this.moveDiagonally(direction, dir2);
						else this.moveDiagonally(dir2, direction);
						ES.trails_n++;
						ES.trails.shift();
					}
					else if (direction > 0) this.moveStraight(direction);
				}
				else if (direction > 0) this.moveStraight(direction);
			}
			else isChaseFeasible = false; // player missing
			ES.chase_time--;
		}


		if (ES.chase_time < 0) {
			ES.IsDetectPlayer = false;
			ES.IsChasePlayer = false;
			ES.IsStayAfterFlee = false;
			ES.IsFleePlayer = true;

			if (ES.Isreturn_afterwait) {
				ES.IsReturnOriginalPos = true;
				ES.trails = [];
				ES.trails_n = 0;
			}
		}
	}


	Game_Event.prototype.LeapPlayerChaser = function (state) {
		const ES = this._SoRES;
		const d = state.dist
		let isChaseFeasible = true;

		//leapduration
		ES.leapduration--;
		if (ES.chase_time >= 0) {
			//make route
			if ((ES.trails.length == 0 || ES.trails_n >= ES.updateRoute_interval)) {
				ES.trails = this.AstarDir($gamePlayer.x, $gamePlayer.y, ES.see_distance);///d
				if (ES.trails.length >= 3) ES.trails.pop();
				ES.trails_n = 0;
			}
			if (ES.trails.length >= 1) {// trail the player
				if (ES.leapduration <= 0) {//wait leap
					let testx = this._x;
					let testy = this._y;

					$gameTemp.requestAnimation([this], ES.leapanim);
					while (ES.trails.length >= 1) {
						const direction = this.MakeDirTest(ES.trails[0], testx, testy);
						ES.trails_n++;
						ES.trails.shift();
						if (ES.Dir8moveChase && ES.trails.length >= 1) {
							const pattern = [8, 12, 32, 48];
							const dir2 = this.MakeDir2Test(direction, ES.trails[0], testx, testy);
							if (pattern.some(x => x == direction * dir2)) {////8dir
								if (direction == 4 || direction == 6) {
									const test = this.moveDiagonalTest(direction, dir2, testx, testy);
									testx = test.x; testy = test.y;
								}
								else {
									const test = this.moveDiagonalTest(dir2, direction, testx, testy);
									testx = test.x; testy = test.y;
								}
								ES.trails_n++;
								ES.trails.shift();
							}
							else if (direction > 0) {
								const test = this.moveStraightTest(direction, testx, testy);
								testx = test.x; testy = test.y;
							}
						}
						else if (direction > 0) {
							const test = this.moveStraightTest(direction, testx, testy);
							testx = test.x; testy = test.y;
						}
					}
					this.setPosition(testx, testy);
					ES.leapduration = 180;
				}
			}
			else isChaseFeasible = false; // player missing
			if (ES.leapduration <= 0) ES.chase_time--;
		}

		if (ES.chase_time < 0 && isChaseFeasible && d <= ES.see_distance / 3) ES.chase_time = 10;
		if (ES.chase_time < 0 || !isChaseFeasible) {
			ES.IsDetectPlayer = false;
			ES.IsChasePlayer = false;
			ES.IsFleePlayer = true;
		}
	}

	Game_Event.prototype.EvacuateFromPlayer = function (state) {
		const ES = this._SoRES;
		const d = state.dist
		let isChaseFeasible = true;
		if (ES.chase_time >= 0) {
			//make route
			if ((ES.trails.length == 0 || ES.trails_n >= ES.updateRoute_interval)) {
				ES.trails = this.calcEvacuateDestination();
				ES.trails_n = 0;
			}
			if (ES.trails.length >= 1) {// trail the player
				const direction = this.MakeDir(ES.trails[0]);
				ES.trails_n++;
				ES.trails.shift();
				if (ES.Dir8moveChase && ES.trails.length >= 1) {
					const pattern = [8, 12, 32, 48];
					const dir2 = this.MakeDir2(direction, ES.trails[0]);
					if (pattern.some(x => x == direction * dir2)) {////8dir
						if (direction == 4 || direction == 6) this.moveDiagonally(direction, dir2);
						else this.moveDiagonally(dir2, direction);
						ES.trails_n++;
						ES.trails.shift();
					}
					else if (direction > 0) this.moveStraight(direction);
				}
				else if (direction > 0) this.moveStraight(direction);
			}

			ES.chase_time--;
		}

		if (ES.chase_time < 0) {
			ES.IsDetectPlayer = false;
			ES.IsChasePlayer = false;
			ES.IsStayAfterFlee = false;
			ES.IsFleePlayer = true;

			if (ES.Isreturn_afterwait) {
				ES.IsReturnOriginalPos = true;
				ES.trails = [];
				ES.trails_n = 0;
			}
		}
	}


	Game_Event.prototype.calcEvacuateDestination = function () {
		//temporary (BFS&BFS => DP in the future work)
		const symbolbfs = [];
		const playerbfs = [];
		const candidates = [];
		const MaxSteps = 8;

		playerbfs.unshift({ x: $gamePlayer.x, y: $gamePlayer.y });
		symbolbfs.unshift({ x: this.x, y: this.y, dist: 0 });
		const currentdist = this.AstarDirTest(symbolbfs[0].x, symbolbfs[0].y, playerbfs[0].x, playerbfs[0].y);
		symbolbfs[0].dist = currentdist.length;

		for (let steps = 0; steps < MaxSteps; steps++) {
			const n_plevel = playerbfs.length;
			for (let i = 0; i < n_plevel; i++) {
				const nexts = playerbfs[n_plevel - 1];
				if (!nexts) continue;

				let shiftcandidate = false;
				for (let dir = 2; dir <= 8; dir += 2) {
					const x2 = this.GetMovedirXPos_SoRESE(nexts.x, dir);
					const y2 = this.GetMovedirYPos_SoRESE(nexts.y, dir);
					if (!this.IsEnablePassAdjcentCells(nexts.x, nexts.y, x2, y2, dir)) continue;
					if (playerbfs.some((v) => v.x == x2 && v.y == y2)) continue;

					shiftcandidate = true;
					playerbfs.unshift({ x: x2, y: y2 });
				}

				if (shiftcandidate == true) playerbfs.pop();
			}

			const n_elevel = symbolbfs.length;
			for (let i = 0; i < n_plevel; i++) {
				const nexts = symbolbfs[n_elevel - 1];
				if (!nexts) continue;
				candidates.unshift({ x: nexts.x, y: nexts.y, s: steps + 1 });

				let shiftcandidate = false;
				for (let dir = 2; dir <= 8; dir += 2) {
					const x2 = this.GetMovedirXPos_SoRESE(nexts.x, dir);
					const y2 = this.GetMovedirYPos_SoRESE(nexts.y, dir);
					if (!this.IsEnablePassAdjcentCells(nexts.x, nexts.y, x2, y2, dir)) continue;
					if (symbolbfs.some((v) => v.x == x2 && v.y == y2)) continue;
					if (playerbfs.some((v) => v.x == x2 && v.y == y2)) continue;

					const n_plevel = playerbfs.length;
					let mindist = 999999;
					let minid = -1;
					let i = 0;
					for (const p of playerbfs) {
						const dist = calcDist(x2, y2, p.x, p.y);
						if (mindist > dist) {
							mindist = dist;
							minid = i;
						}
						i++;
					}

					if (currentdist > mindist) continue;

					symbolbfs.unshift({ x: x2, y: y2, dist: mindist });
					if (steps < MaxSteps - 1) shiftcandidate = true;
				}

				if (shiftcandidate == true) candidates.shift();
				symbolbfs.pop();
			}
		}

		const ncand = candidates.length;
		let candid = 0;
		let candmax = candidates[0];
		for (i = 1; i < ncand; i++) {
			if (candmax < candidates[i] && Math.random() < 0.7) {
				candmax = candidates[i];
				candid = i;
			}
		}

		const cand = candidates[candid];
		if (cand) return this.AstarDir(cand.x, cand.y, cand.s);
		return this.AstarDir(this.x, this.y, 1);
	}



	Game_Event.prototype.FleePlayer = function () {
		const ES = this._SoRES;
		if (!ES.IsStayAfterFlee) {
			ES.waitAC_count = ES.wait_afterchase;
			ES.IsStayAfterFlee = true;

			//balloon
			if (BalloonID_PlayerFled != -1) $gameTemp.requestBalloon(this, BalloonID_PlayerFled);
			if (SE_PlayerFled.se != '' && this.isNearTheScreen()) AudioManager.playSe(SE_PlayerFled);
			if (ES.call_CommonEventID[2] != 0) $gameTemp.reserveCommonEvent(ES.call_CommonEventID[2]);
			if (ES.call_ScriptsInPhases[2] != null) this.SoR_ExecScript(ES.call_ScriptsInPhases[2]);
			this.setMoveSpeed(ES.default_speed);
		}

		ES.waitAC_count--;

		if (ES.waitAC_count < 0) {
			ES.IsStayAfterFlee = false;
			ES.IsFleePlayer = false;
			if (ES.Isreturn_afterwait) {
				ES.IsReturnOriginalPos = true;
				ES.trails = [];
				ES.trails_n = 0;
			}
		}
	}



	Game_Event.prototype.ReturnOrigPoint = function (d) {
		const ES = this._SoRES;
		if ((ES.trails.length == 0 || ES.trails_n >= ES.updateRoute_interval)) {
			ES.trails = this.AstarDir(this.default_x, this.default_y, 99);
			ES.trails_n = 0;
		}

		if (ES.trails.length >= 1) {// trail the player
			const direction = this.MakeDir(ES.trails[0]);
			ES.trails_n++;
			ES.trails.shift();
			if (ES.Dir8moveChase && ES.trails.length >= 1) {
				const pattern = [8, 12, 32, 48];
				const dir2 = this.MakeDir2(direction, ES.trails[0]);
				if (pattern.some(x => x == direction * dir2)) {////8dir
					if (direction == 4 || direction == 6) this.moveDiagonally(direction, dir2);
					else this.moveDiagonally(dir2, direction);
					ES.trails_n++;
					ES.trails.shift();
				}
				else if (direction > 0) this.moveStraight(direction);
			}
			else if (direction > 0) this.moveStraight(direction);
		}

		if (this.x == this.default_x && this.y == this.default_y) {
			ES.IsReturnOriginalPos = false;
			if (ES.call_CommonEventID[4] != 0) $gameTemp.reserveCommonEvent(ES.call_CommonEventID[4]);
			if (ES.call_ScriptsInPhases[4] != null) this.SoR_ExecScript(ES.call_ScriptsInPhases[4]);
		}
	}


	function calcDist(e, p) {
		return Math.sqrt((e.x - p.x) * (e.x - p.x) + (e.y - p.y) * (e.y - p.y));
	}

	function calcAngle(e, p) {
		const va = { x: p.x - e.x, y: p.y - e.y };

		let x = 2, n_op = 0;
		//Cyclic subgroup generated by 2 \in Group(Z_{10}-{0},*)
		while (x != e.dir) {
			x = (x * 2) % 10;
			n_op++;
		}
		const vec = { z: 0, c: 1 };
		//(C,*) isomorphism to sub of Z[i] ~ rotate90
		for (let i = 0; i < n_op; i++) {
			const tmp = -vec.c;
			vec.c = vec.z;
			vec.z = tmp;
		}

		const theta = Math.acos((vec.z * va.x + vec.c * va.y) / Math.sqrt(va.x * va.x + va.y * va.y));
		if (vec.z * va.y - vec.c * va.x < 0) return -theta;
		else return theta;// -pi < theta < pi
	}


	Game_Character.prototype.AstarDir = function (goalX, goalY, dist) {
		const searchLimit = Math.floor(dist * SearchRange_scale);
		const mapWidth = $gameMap.width();
		let nodeList = [];
		let openList = [];
		let closedList = [];
		let start = {};
		let best = start;

		if (this.x === goalX && this.y === goalY) return [];

		start.parent = null;
		start.x = this.x;
		start.y = this.y;
		start.g = 0;
		start.f = dist;
		nodeList.push(start);
		openList.push(start.y * mapWidth + start.x);

		while (nodeList.length > 0) {
			let bestIndex = 0;
			for (let i = 0; i < nodeList.length; i++) {
				if (nodeList[i].f < nodeList[bestIndex].f) {
					bestIndex = i;
				}
			}

			const current = nodeList[bestIndex];
			const x1 = current.x;
			const y1 = current.y;
			const pos1 = y1 * mapWidth + x1;
			const g1 = current.g;

			nodeList.splice(bestIndex, 1);
			openList.splice(openList.indexOf(pos1), 1);
			closedList.push(pos1);

			if (current.x === goalX && current.y === goalY) {
				best = current;
				break;
			}
			if (g1 >= searchLimit) continue;


			for (let j = 0; j < 4; j++) {
				const direction = 2 + j * 2;
				const x2 = this.GetMovedirXPos_SoRESE(x1, direction);
				const y2 = this.GetMovedirYPos_SoRESE(y1, direction);
				const pos2 = y2 * mapWidth + x2;

				if (closedList.contains(pos2)) continue;
				if (!this.IsEnablePassAdjcentCells(x1, y1, x2, y2, direction)) continue;

				const g2 = g1 + 1;
				const index2 = openList.indexOf(pos2);

				if (index2 < 0 || g2 < nodeList[index2].g) {
					let neighbor;
					if (index2 >= 0) neighbor = nodeList[index2];
					else {
						neighbor = {};
						nodeList.push(neighbor);
						openList.push(pos2);
					}
					neighbor.parent = current;
					neighbor.x = x2;
					neighbor.y = y2;
					neighbor.g = g2;
					neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
					if (!best || neighbor.f - neighbor.g < best.f - best.g) best = neighbor;
				}
			}

		}

		let trails = [];
		let goal = { x: goalX, y: goalY };
		if (calcDist(best, goal) == 0) {
			for (node = best; node.parent; node = node.parent) {
				trails.unshift(node);
				if (node.parent === start) break;
			}
		}

		return trails;
	}


	Game_Character.prototype.AstarDirTest = function (startX, startY, goalX, goalY) {
		const searchLimit = 8;
		const mapWidth = $gameMap.width();
		let nodeList = [];
		let openList = [];
		let closedList = [];
		let start = {};
		let best = start;

		if (startX === goalX && startY === goalY) return 0;

		start.parent = null;
		start.x = startX;
		start.y = startY;
		start.g = 0;
		start.f = 4;
		nodeList.push(start);
		openList.push(start.y * mapWidth + start.x);

		while (nodeList.length > 0) {
			let bestIndex = 0;
			for (let i = 0; i < nodeList.length; i++) {
				if (nodeList[i].f < nodeList[bestIndex].f) {
					bestIndex = i;
				}
			}

			const current = nodeList[bestIndex];
			const x1 = current.x;
			const y1 = current.y;
			const pos1 = y1 * mapWidth + x1;
			const g1 = current.g;

			nodeList.splice(bestIndex, 1);
			openList.splice(openList.indexOf(pos1), 1);
			closedList.push(pos1);

			if (current.x === goalX && current.y === goalY) {
				best = current;
				break;
			}
			if (g1 >= searchLimit) continue;

			for (let j = 0; j < 4; j++) {
				const direction = 2 + j * 2;
				const x2 = this.GetMovedirXPos_SoRESE(x1, direction);
				const y2 = this.GetMovedirYPos_SoRESE(y1, direction);
				const pos2 = y2 * mapWidth + x2;

				if (closedList.contains(pos2)) continue;
				if (!this.IsEnablePassAdjcentCells(x1, y1, x2, y2, direction)) continue;

				const g2 = g1 + 1;
				const index2 = openList.indexOf(pos2);

				if (index2 < 0 || g2 < nodeList[index2].g) {
					let neighbor;
					if (index2 >= 0) neighbor = nodeList[index2];
					else {
						neighbor = {};
						nodeList.push(neighbor);
						openList.push(pos2);
					}
					neighbor.parent = current;
					neighbor.x = x2;
					neighbor.y = y2;
					neighbor.g = g2;
					neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
					if (!best || neighbor.f - neighbor.g < best.f - best.g) best = neighbor;
				}
			}
		}

		let trails = [];
		let goal = { x: goalX, y: goalY };
		if (calcDist(best, goal) == 0) {
			for (node = best; node.parent; node = node.parent) {
				trails.unshift(node);
				if (node.parent === start) break;
			}
		}

		return trails.length;
	}


	//extention of canPass
	Game_Event.prototype.IsEnablePassAdjcentCells = function (x, y, x2, y2, d) {
		if (!$gameMap.isValid(x2, y2)) return false;
		//keep out by plugin parameter
		if ($gameMap.regionId(x, y) == SymbolKeepOut_RegionID) return false;
		if ($gameMap.regionId(x2, y2) == SymbolKeepOut_RegionID) return false;
		if (this.isThrough()) return true;
		if (!this.isMapPassable(x, y, d)) return false;
		if (FollowerAttack % 3 == 0 && this.isCollidedWithFollowerCharacters(x, y)) return false;
		if (this.isCollidedWithEventObjects(x2, y2)) return false; // except for the player

		return true;
	}

	Game_Event.prototype.IsEnablePassDiagonallyAdjcentCells = function (x, y, horz, vert) {
		const x2 = $gameMap.roundXWithDirection(x, horz);
		const y2 = $gameMap.roundYWithDirection(y, vert);

		if (this.IsEnablePassAdjcentCells(x, y, x2, y2, vert) && this.IsEnablePassAdjcentCells(x, y, x2, y2, horz)) {
			return true;
		}
		if (this.IsEnablePassAdjcentCells(x, y, x2, y2, horz) && this.IsEnablePassAdjcentCells(x, y, x2, y2, vert)) {
			return true;
		}
		return false;
	}



	Game_Event.prototype.isCollidedWithEventObjects = function (x, y) {
		return Game_Character.prototype.isCollidedWithCharacters.call(this, x, y);
	}

	Game_Character.prototype.MakeDir = function (node) {
		const deltaX1 = $gameMap.deltaX(node.x, this.x);
		const deltaY1 = $gameMap.deltaY(node.y, this.y);
		if (deltaY1 == 1) return 2;
		else if (deltaX1 == -1) return 4;
		else if (deltaX1 == 1) return 6;
		else if (deltaY1 == -1) return 8;
		else return 0;
	}

	Game_Character.prototype.MakeDir2 = function (next, node) {
		let paddx = 0, paddy = 0;
		paddx = next == 6 ? 1 : next == 4 ? -1 : 0;
		paddy = next == 2 ? 1 : next == 8 ? -1 : 0;

		const deltaX1 = $gameMap.deltaX(node.x, this.x + paddx);
		const deltaY1 = $gameMap.deltaY(node.y, this.y + paddy);
		if (deltaY1 == 1) return 2;
		else if (deltaX1 == -1) return 4;
		else if (deltaX1 == 1) return 6;
		else if (deltaY1 == -1) return 8;
		else return 0;
	}

	Game_Map.prototype.isEventTriggered = function () {
		return this._interpreter.isRunning();
	}

	const SoR_ESE_GP_updateVehicleGetOn = Game_Player.prototype.updateVehicleGetOn;
	Game_Player.prototype.updateVehicleGetOn = function () {
		//force quit invincinble for enemy symbol
		if ($gameTemp.invincibleAfterEnc && $gameTemp.invincibleAfterEnc != -1) $gamePlayer.FinishInvinsibleEffectsAfterSE();
		SoR_ESE_GP_updateVehicleGetOn.call(this);
	}


	////////////////////////////////////////////////////
	//
	// Option for follower attack by enemy symbols
	//
	////////////////////////////////////////////////////
	if (FollowerAttack % 3 == 1) {
		const SoR_ESE_GE_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
		Game_Event.prototype.checkEventTriggerTouch = function (x, y) {
			if (this.event().meta.EnemySymbol) {
				if (!$gameMap.isEventRunning()) {

					let flw = $gamePlayer._followers.visibleFollowers();
					let isF_collided = false;
					const n_flw = flw.length;
					for (let i = 0; i < n_flw; i++) {
						isF_collided = flw[i].pos(x, y);
						if (isF_collided == true) {
							$gameTemp.collisionFollower = flw[i];
							break;
						}
					}

					if (this._trigger === 2 && isF_collided) {
						if (!this.isJumping() && this.isNormalPriority()) {
							this.start();
						}
					}
				}
			}

			SoR_ESE_GE_checkEventTriggerTouch.call(this, x, y);
		}
	}
	else if (FollowerAttack % 3 == 2) {
		const SoR_ESE_GE_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
		Game_Event.prototype.isCollidedWithPlayerCharacters = function (x, y) {
			if (this.event().meta.EnemySymbol) {
				return this.isNormalPriority() && !$gamePlayer.isThrough() && $gamePlayer.pos(x, y);
			}
			return SoR_ESE_GE_isCollidedWithPlayerCharacters.call(this, ...arguments);
		}
	}

	Game_Event.prototype.isCollidedWithFollowerCharacters = function (x, y) {
		let flw = $gamePlayer._followers.visibleFollowers();
		let isF_collided = false;
		const n_flw = flw.length;
		for (let i = 0; i < n_flw; i++) {
			isF_collided = flw[i].pos(x, y);
			if (isF_collided == true) {
				return true;
			}
		}
		return isF_collided;
	}



	///////////////////////////////////////////////////////////
	//test for leap move
	Game_Character.prototype.MakeDirTest = function (node, x, y) {
		const deltaX1 = $gameMap.deltaX(node.x, x);
		const deltaY1 = $gameMap.deltaY(node.y, y);
		if (deltaY1 == 1) return 2;
		else if (deltaX1 == -1) return 4;
		else if (deltaX1 == 1) return 6;
		else if (deltaY1 == -1) return 8;
		else return 0;
	}
	Game_Character.prototype.MakeDir2Test = function (next, node, x, y) {
		let paddx = 0, paddy = 0;
		paddx = next == 6 ? 1 : next == 4 ? -1 : 0;
		paddy = next == 2 ? 1 : next == 8 ? -1 : 0;

		const deltaX1 = $gameMap.deltaX(node.x, x + paddx);
		const deltaY1 = $gameMap.deltaY(node.y, y + paddy);
		if (deltaY1 == 1) return 2;
		else if (deltaX1 == -1) return 4;
		else if (deltaX1 == 1) return 6;
		else if (deltaY1 == -1) return 8;
		else return 0;
	}

	Game_CharacterBase.prototype.moveDiagonalTest = function (horz, vert, x, y) {
		let test = { x, y };
		if (this.IsEnablePassDiagonallyAdjcentCells(x, y, horz, vert)) {
			test.x = this.GetMovedirXPos_SoRESE(test.x, horz);
			test.y = this.GetMovedirYPos_SoRESE(test.y, vert);
		}

		return test;
	}

	Game_CharacterBase.prototype.moveStraightTest = function (d, x, y) {
		let test = { x, y };
		if (this.canPass(x, y, d)) {
			test.x = this.GetMovedirXPos_SoRESE(test.x, d);
			test.y = this.GetMovedirYPos_SoRESE(test.y, d);
		}

		return test;
	}

	///////////////////////////////////////////////////////
	//
	// Treatment for MenuSubCommand.js
	//
	///////////////////////////////////////////////////////

	Game_System.prototype.SoRSE_InvincibleExcept = function () {
		return true;
	}

	//TODO 
	//Find an isomorphic function {2,4,8,6} to {i,-1,-i,1}
	////////////////////////////////////////////////////////

	const SoR_SSE_DM_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function () {
		SoR_SSE_DM_setupNewGame.call(this);
		if (AutoDisable_DefaultEncounter) $gameSystem.disableEncounter();
	}

	////////////////////////////////////////////////////////
	Game_Party.prototype.AverageLv = function () {
		let avg = 0;
		const npt = $gameParty.size();
		for (x of $gameParty.members()) {
			avg += x.level;
		}
		return Math.floor(avg / npt);
	}




	////////////////////////////////////////////////////////
	// v1.61 Tri_HalfMove
	////////////////////////////////////////////////////////
	Game_Character.prototype.GetMovedirXPos_SoRESE = function (x, dir) {
		return $gameMap.roundXWithDirection(x, dir);
	}
	Game_Character.prototype.GetMovedirYPos_SoRESE = function (y, dir) {
		return $gameMap.roundYWithDirection(y, dir);
	}
	Game_Map.prototype.GetEventsXY_SoRESE = function (x, y) {
		return $gameMap.eventsXy(x, y);
	}


	////////////////////////////////////////////////////////
	function SoR_Eval(ev) {
		const sentence = "return (" + ev + ");";
		if (typeof $gameTemp.SoRTmp_script === "undefined") $gameTemp.SoRTmp_script = new Map();
		if (!$gameTemp.SoRTmp_script.has(sentence)) {
			$gameTemp.SoRTmp_script.set(sentence, new Function(sentence));
		}
		const res = $gameTemp.SoRTmp_script.get(sentence)();
		return res;
	}

	Game_Event.prototype.SoR_ExecScript = function (ev) {
		let sentence = ev;
		sentence = sentence.replace(/EVID/g, this._eventId);
		sentence = sentence.replace(/MAPID/g, this._mapId);
		sentence = sentence.replace(/PAGEID/g, this._pageIndex);
		sentence = sentence.replace(/selfON\((.*)\)/g, (_, p1) => {
			const tx = "$gameSelfSwitches.setValue([" + this._mapId + "," + this._eventId + ",\"" + String(p1).trim() + "\"]," + true + ")";
			return tx;
		});
		sentence = sentence.replace(/selfOFF\((.*)\)/g, (_, p1) => {
			const tx = "$gameSelfSwitches.setValue([" + this._mapId + "," + this._eventId + ",\"" + String(p1).trim() + "\"]," + false + ")";
			return tx;
		});
		sentence = sentence.replace(/delEV\(\)/g, "$gameMap.eraseEvent(" + this._eventId + ")");

		if (typeof $gameTemp.SoRTmp_script === "undefined") $gameTemp.SoRTmp_script = new Map();
		if (!$gameTemp.SoRTmp_script.has(sentence)) {
			$gameTemp.SoRTmp_script.set(sentence, new Function(sentence));
		}
		const res = $gameTemp.SoRTmp_script.get(sentence)();
		return res;
	}

})();