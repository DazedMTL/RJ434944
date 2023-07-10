// FesSpin.js Ver.1.5.0
// MIT License (C) 2020-2022 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:ja
* @target MV MZ
* @plugindesc RPGツクールフェスの回転移動を再現します。
* @author あわやまたな (Awaya_Matana)
* @url https://twitter.com/New_Awayamatana
* @help 回転移動を制御するためには[移動ルートの設定]の[スクリプト]、
* もしくはイベントコマンドの[スクリプト]、[プラグインコマンド]を利用します。
* 【移動ルートの設定から行う場合】
* ◇スクリプト：this.spin(引数);
* 引数にはtrueまたはfalseを入力します。trueで回転移動を有効化。falseで無効化。
* 未入力だと有効時には無効化、無効時には有効化します。
*
* 使用例1：this.spin(true); 
* 使用例2：this.spin(false); 
* 使用例3：this.spin(); 
*
* 【イベントコマンドから行う場合】
* 主人公の回転を制御する時
* ◆スクリプト：$gamePlayer.spin(引数)
* イベントの回転を制御する時
* ◆スクリプト：this.character(イベントID).spin(引数)
*
* イベントIDにはイベントIDを入力します。
* 引数は上記と同様です。
* ちなみに現在実行中のイベントIDはthis._eventIdで取得できます。
*
* 【プラグインコマンドから行う場合(MV)】※MZはイベントコマンド[プラグインコマンド]から説明を読んでください。
* 回転移動を有効にする時
* spinStart イベントID
*
* 回転移動を無効にする時
* spinStop イベントID
*
* 回転移動を切り替える時
* spinToggle イベントID
* 
* イベントIDにはイベントIDを入力します。
* 0にするとこのイベント、-1にすると主人公に効果があります。
* 数値を入力しないとマップ全体を一括で切り替えます。
*
* [オプション]
* イベントのメモに<fesSpin>があるなら全てのページ、
* <fesSpin:1>や<fesSpin:1,3>(コンマ区切り)とした場合は
* その数字があるページのみ最初から回転移動がセットされる。
*
* [仕様]
* 基本、1マス移動につき一回転。
* [移動ルートの設定]で、連続で1歩しか動かさなかった場合は半回転。
* （上記二つはジャンプした場合を除く）
* PluginCommonBaseがあっても無くても動作します。
* ある場合はプラグインコマンドで変数の代入が可能になります。
* MV/MZ共に使用可能。
*
* [更新履歴]
* 2020/10/31：α版リリース
* 2020/11/01：β版。歩行、足踏みのアニメーションに割り込ませていた処理を独立させ、不具合を全て解消。
*           　コマンドで一歩しか動かさなかった時に半回転になる仕様を追加。
* 2020/11/01：RPGツクールMVでも動くように改良。
* 2020/11/01：不具合を修正。また、競合を減らすため、既存の関数は上書きせずフックする処理に変更した。
*           　このまま正式にリリースしてもいいかも。
* 2020/11/01：PluginCommonBaseがあっても無くても動くように。無かったらMZのデフォルトの機能を使用します。
* 2020/11/02：主に[動作を繰り返す]絡みの半回転時の挙動を修正。また、自律移動でも半回転の仕様を実現。
*           　通常の回転速度は移動速度7、半回転は速度8まで移動速度と連動可能（多分）。
*           　コードの可読性アップ。キリが良くなったのでひとまず公開。
* 2020/11/02：セルフスイッチ「ハロルド」を廃止して、独自の変数で状態を管理。処理数も少なくなった。
* 2020/11/03：Ver.1.0.0　多分まともなプラグインになったのでVer.1.0.0とします。プラグインパラメータを追加。
* 2020/11/04：Ver.1.0.1　リファクタリング。プラグインコマンドの処理とフォロワーの更新処理を最適化。
* 2020/11/06：Ver.1.1.0　プラグインコマンドの処理を変更。英語版ヘルプを追加。（DeepL翻訳を使用）
* 2020/11/10：Ver.1.2.0　バグの修正。プラグインパラメータの削除。
* 2020/11/11：Ver.1.2.1　バグの修正。
* 2020/11/12：Ver.1.3.0　バグの修正。オプションの追加。
* 2020/11/23：Ver.1.3.1　リファクタリング。
* 2020/11/23：Ver.1.3.2　リファクタリング。
* 2020/12/02：Ver.1.3.3　リファクタリング。
* 2020/12/09：Ver.1.3.4　リファクタリング。
* 2021/06/26：Ver.1.3.5　バグの修正。
* 2021/07/21：Ver.1.4.0　バグの修正。競合対策。処理の効率化。
* 2021/08/07：Ver.1.4.1　バグの修正。
* 2022/01/05：Ver.1.5.0　バグ修正。処理の効率化。distancePerFrame書き換えにも対応。
*
* @command start
* @text 回転有効化
* @desc 回転を有効にします。
*
* @arg id
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -999
*
* @command stop
* @text 回転無効化
* @desc 回転を無効にします。
*
* @arg id
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -999
*
* @command toggle
* @text 回転切り替え
* @desc 有効時には無効化、無効時には有効化します。
*
* @arg id
* @text イベントID
* @desc イベントのIDを指定します。
* このイベント:0  主人公:-1
* @default 0
* @type number
* @min -999
*
* @command setAll
* @text 一括操作
* @desc マップ全体の回転を切り替えます。
*
* @arg bool
* @text 操作
* @desc 操作を指定します。
* @default true
* @type select
* @option true
* @option false
* @option toggle
*/

/*:
* @target MV MZ
* @plugindesc Reproduces the rotational movement of RPG Maker Fes.
* @author Awayamatana (Awaya_Matana)
* @url https://twitter.com/New_Awayamatana
* @help Use [Script] of [Set Movement Route] or [Script] or [Plugin Command]
* to control the rotational movement.
* 【For Set Movement Route】
* ◇Script：this.spin(argument);
* The argument should be true or false. true to enable rotational movement,
* false to disable it.
* If not entered, it will be disabled when enabled and enabled when disabled.
*
* Example 1：this.spin(true); 
* Example 2：this.spin(false); 
* Example 3：this.spin(); 
*
* 【For Script】
* Player
* ◆Script：$gamePlayer.spin(argument)
* Event
* ◆Script：this.character(EventID).spin(argument)
*
* Enter the Event ID in EventID.
* The argument is the same as above.
*
* 【For Plugin Command (MV)】※If you use MZ, please read the explanation in the event command [Plugin Command].
* When enabling rotational movement
* spinStart EventID
*
* When disabling rotation movement
* spinStop EventID
*
* When switching between rotational movement
* spinToggle EventID
* 
* Enter the Event ID in EventID.
* 0:This Event  -1:Player  Unentered:All Events in this map
*
* [Options]
* If <fesSpin> is specified in the event's note, the rotation is set to all pages,
* or if <fesSpin:1> or <fesSpin:1,3> (comma separated),
* the rotational movement is set to the page with the number.
*
* [Specification]
* Basically, one rotation per square move.
* If you only move one step in a row, you make a half turn when use [Set Movement Route].
* （The above two do not include jumping.）
* This Plugin works with or without PluginCommonBase.
* If PluginCommonBase is enabled, you can use [Plugin Command] to assign variables.
* Available for both MV and MZ.
*
* [Update history]
* 2020/10/31：Alpha release
* 2020/11/03：Ver.1.0.0
* 2021/01/05：Ver.2.0.0
*
* @command start
* @text Enable rotation
*
* @arg id
* @text Event ID
* @desc 0:This Event -1:Player
* @default 0
* @type number
* @min -999
*
* @command stop
* @text Disable rotation
*
* @arg id
* @text Event ID
* @desc 0:This Event -1:Player
* @default 0
* @type number
* @min -999
*
* @command toggle
* @text Switching rotation.
* @desc If not entered, it will be disabled when enabled and enabled when disabled.
*
* @arg id
* @text Event ID
* @desc 0:This Event  -1:Player
* @default 0
* @type number
* @min -999
*
* @command setAll
* @text All Events in this map
*
* @arg bool
* @text Operation
* @default true
* @type select
* @option true
* @option false
* @option toggle
*/

'use strict';
{

	//プラグイン名取得。
	const script = document.currentScript;
	const pluginName = script.src.replace(/^.*\/(.*).js$/, (_, p1) => p1);
	const useMZ = Utils.RPGMAKER_NAME === "MZ";
	const PluginCommonBase = (() => {
		for (const p of $plugins) {
			if (p.name === "PluginCommonBase" && p.status) return true;
		}
		return false;
	})();
	//プラグインコマンドの定義。PluginCommonBaseの有無やMZ/MVを判別。
	if (PluginCommonBase && useMZ) {
		PluginManagerEx.registerCommand(document.currentScript, "start", function (args) {
			this.character(args.id).spin(true);
		});
		PluginManagerEx.registerCommand(document.currentScript, "stop", function (args) {
			this.character(args.id).spin(false);
		});
		PluginManagerEx.registerCommand(document.currentScript, "toggle", function (args) {
			this.character(args.id).spin();
		});
		PluginManagerEx.registerCommand(document.currentScript, "setAll", function (args) {
			const bool = args.bool === 'toggle' ? undefined : args.bool;
			$gamePlayer.spinAll(bool);
		});
	}
	else if (useMZ) {
		PluginManager.registerCommand(pluginName, "start", function (args) {
			this.character(+args.id).spin(true);
		});
		PluginManager.registerCommand(pluginName, "stop", function (args) {
			this.character(+args.id).spin(false);
		});
		PluginManager.registerCommand(pluginName, "toggle", function (args) {
			this.character(+args.id).spin();
		});
		PluginManager.registerCommand(pluginName, "setAll", function (args) {
			const bool = args.bool === 'toggle' ? undefined : args.bool === 'true';
			$gamePlayer.spinAll(bool);
		});
	}

	const commandMap = new Set(['spinStart', 'spinStop', 'spinToggle']);

	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_Game_Interpreter_pluginCommand.apply(this, arguments);

		commandMap.has(command) && this[command](args);

	};

	Game_Interpreter.prototype.spinStart = function (args) {
		let id = args[0];
		if (id) this.character(+id).spin(true);
		else $gamePlayer.spinAll(true);
	};

	Game_Interpreter.prototype.spinStop = function (args) {
		let id = args[0];
		if (id) this.character(+id).spin(false);
		else $gamePlayer.spinAll(false);
	};

	Game_Interpreter.prototype.spinToggle = function (args) {
		let id = args[0];
		if (id) this.character(+id).spin();
		else $gamePlayer.spinAll();
	};

	//スピンをカウントする変数と回転周期を管理する変数を追加。
	const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function () {
		_Game_CharacterBase_initMembers.call(this);
		this._spin = false;
		this._spinCount = 0;
		this._spinCycle = 1;
	};

	//キャラクターのアップデート処理に回転のアップデートを追加。
	const _Game_CharacterBase_update = Game_CharacterBase.prototype.update;
	Game_CharacterBase.prototype.update = function () {
		_Game_CharacterBase_update.call(this);
		this.updateSpin();
	};

	//向きを変更するタイミングを定義。
	Game_CharacterBase.prototype.updateSpin = function () {
		this.updateSpinCount();
		const spinWait = this.spinWait();
		if (this._spinCount >= spinWait) {
			this.updateSpinDirection(spinWait);
			this._spinCount = 0;
		}
	};

	//回転周期。歩行時に何マスで一回転するかを決定。
	Game_CharacterBase.prototype.spinWait = function () {
		return this.spinCycle() / this.distancePerFrame() / 4;
	};

	//フレーム数をカウントする。
	Game_CharacterBase.prototype.updateSpinCount = function () {
		this._spinCount++;
	};

	//イベントの向きを変える。
	Game_CharacterBase.prototype.updateSpinDirection = function (spinWait) {
		if (this._stopCount === 0 && this.canSpin()) {
			if (spinWait >= 1) this.turnRight90();
			else this.turn180();
		}
	};

	//競合対策
	let stopSetDirection = false;//移動する方向に向くのをキャンセルするための変数。
	const _Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
	Game_CharacterBase.prototype.setDirection = function (d) {
		stopSetDirection || _Game_CharacterBase_setDirection.call(this, d);
	};

	//回転直進時に進行方向に向きを変えさせない
	const _Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
	Game_CharacterBase.prototype.moveStraight = function (d) {
		stopSetDirection = this.canSpin();
		_Game_CharacterBase_moveStraight.call(this, d);
		stopSetDirection = false;
	};

	//回転斜進時に進行方向に向きを変えさせない
	const _Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
	Game_CharacterBase.prototype.moveDiagonally = function (horz, vert) {
		stopSetDirection = this.canSpin();
		_Game_CharacterBase_moveDiagonally.call(this, horz, vert);
		stopSetDirection = false;
	};

	//回転ジャンプ時に進行方向に向きを変えさせない。
	const _Game_CharacterBase_jump = Game_CharacterBase.prototype.jump;
	Game_CharacterBase.prototype.jump = function (xPlus, yPlus) {
		stopSetDirection = this.canSpin();
		_Game_CharacterBase_jump.call(this, xPlus, yPlus);
		stopSetDirection = false;
	};

	//イベントの回転移動が可能かどうかを返す。
	Game_CharacterBase.prototype.canSpin = function () {
		return this._spin;
	};

	//回転移動をするかどうか切り替える。未指定の時はトグル。
	Game_CharacterBase.prototype.spin = function (bool = !this.canSpin()) {
		this._spin = bool;
	};

	Game_CharacterBase.prototype.spinAll = function (bool) {
		$gameMap.events().forEach(event => event.spin(bool));
		$gamePlayer.spin(bool);
		$gamePlayer.followers()._data.forEach(follower => follower.spin(bool));
	};

	//移動ルートの設定時に半回転させるか？するなら回転周期を半分に。
	Game_CharacterBase.prototype.tryHalfSpin = function () {
		const list = this._moveRoute.list;
		const index = this._moveRouteIndex;
		if (list[index].code > 0 && list[index].code < 14) {
			//1つ前のコードを取得　動作を繰り返すならリスト最後尾を取得。
			let code1 = index === 0 ? (this._moveRoute.repeat ? list[list.length - 2].code : -1) : list[index - 1].code;
			//1つ後のコードを取得　動作を繰り返すならリスト最前列を取得。
			let code2 = index === list.length - 2 ? (this._moveRoute.repeat ? list[0].code : -1) : list[index + 1].code;
			//前後に歩行がないなら半回転
			if (code1 < 1 || code1 > 14 && code2 < 1 || code2 > 14) {
				this.setSpinCycle(2);
			}
		} else {
			this.setSpinCycle(1);
		}
	};

	const _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
	Game_Character.prototype.processMoveCommand = function (command) {
		this.canSpin() && this.tryHalfSpin();
		_Game_Character_processMoveCommand.call(this, command);
	};

	//回転周期の取得。
	Game_CharacterBase.prototype.spinCycle = function () {
		return this._spinCycle;
	};

	//回転周期の設定。
	Game_CharacterBase.prototype.setSpinCycle = function (spinCycle) {
		this._spinCycle = spinCycle;
	};

	//フォロワーの更新処理を拡張。
	const _Game_Follower_update = Game_Follower.prototype.update
	Game_Follower.prototype.update = function () {
		_Game_Follower_update.call(this);
		this.setSpinCycle($gamePlayer.spinCycle());
		this.spin($gamePlayer.canSpin());
	};

	//メモ欄に<fesSpin>があるなら全てのページ、<fesSpin:1>や<fesSpin:1,3>(コンマ区切り)とした場合は
	//その数字があるページのみデフォで回転移動する。
	const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function () {
		_Game_Event_setupPageSettings.call(this);
		this.setupSettingsFesSpin();
	};

	Game_Event.prototype.setupSettingsFesSpin = function () {
		const page = this.page();
		this.spin(page.fesSpin);
	};

	//マップデータロード時の処理に追加
	const _DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function (object) {
		_DataManager_onLoad.call(this, object);
		if (!!(object.data && object.events)) {
			this.addFesSpinToCondition();
		}
	};

	//メモ欄の情報を事前に解析し、$dataMapに書き込むことでリフレッシュ時の負担を軽減。実質的にイベントのオプションと同じ仕様にする。
	DataManager.addFesSpinToCondition = function () {
		$dataMap.events.forEach(data => {
			if (!data) return;
			const pages = data.pages;
			const meta = data.meta['fesSpin'];
			const spinPages = this.analyticsFesSpin(pages, meta);
			for (let i = 0; i <= pages.length - 1; i++) {
				pages[i]['fesSpin'] = spinPages[i];
			}
		});
	};
	//解析
	DataManager.analyticsFesSpin = function (pages, meta) {
		if (typeof meta === "boolean") {
			return Array(pages.length).fill(meta);
		} else {
			const spinPages = Array(pages.length).fill(false);
			if (meta) {
				const arrMeta = meta.split(',').map(i => --i);
				for (let i = 0; arrMeta.length - 1 >= i; i++) {
					spinPages[arrMeta[i]] = true;
				}
			}
			return spinPages;
		}
	};
}