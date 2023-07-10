// =============================================================================
// ABMZ_EnemyRandomScale.js
// Version: 1.00
// -----------------------------------------------------------------------------
// Copyright (c) 2021 ヱビ
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================


/*:
 * @plugindesc v1.00 敵の大きさをランダムにし、能力値を変化させるプラグイン
 * @target MZ
 * @author ヱビ
 * 
 * 
 * @param HPFormula
 * @type text
 * @text HPの計算式
 * @desc HPの計算式です。value:元の値、scale:大きさ
 * @default value * Math.pow(scale, 3)
 * 
 * @param MPFormula
 * @type text
 * @text MPの計算式
 * @desc MPの計算式です。value:元の値、scale:大きさ
 * @default value * Math.pow(scale, 3)
 * 
 * @param ATKFormula
 * @type text
 * @text 攻撃力の計算式
 * @desc 攻撃力の計算式です。value:元の値、scale:大きさ
 * @default value
 * 
 * @param DEFFormula
 * @type text
 * @text 防御力の計算式
 * @desc 防御力の計算式です。value:元の値、scale:大きさ
 * @default value
 * 
 * 
 * @param MATFormula
 * @type text
 * @text 魔法力の計算式
 * @desc 魔法力の計算式です。value:元の値、scale:大きさ
 * @default value
 * 
 * @param MDFFormula
 * @type text
 * @text 魔法防御力の計算式
 * @desc 魔法防御力の計算式です。value:元の値、scale:大きさ
 * @default value
 * 
 * @param AGIFormula
 * @type text
 * @text 敏捷性の計算式
 * @desc 敏捷性の計算式です。value:元の値、scale:大きさ
 * @default value
 * 
 * @param LUKFormula
 * @type text
 * @text 運の計算式
 * @desc 運の計算式です。value:元の値、scale:大きさ
 * @default value
 * 
 * @param EXPFormula
 * @type text
 * @text 経験値の計算式
 * @desc 経験値の計算式です。value:元の値、scale:大きさ
 * @default value * scale
 * 
 * 
 * @help
 * ============================================================================
 * どんなプラグイン？
 * ============================================================================
 * 
 * 敵キャラの大きさをランダムにし、能力値を変化させられるプラグインです。
 * 
 * ============================================================================
 * 機能
 * ============================================================================
 * 
 * 
 * 敵キャラのメモ：
 * <scale:x>
 * 大きさをx倍にし、能力値を変化させます。小数点が使えます。
 * maxScale、minScaleと併用するとscaleが優先されます。
 * 
 * <maxScale:x>
 * <minScale:y>
 * 大きさをminScale～maxScaleの中のランダムにし、能力値を変化させます。
 * 小数点が使えます。
 * minScaleを省略するとminScaleは1になります。
 * maxScaleを省略するとmaxScaleは1になります。
 * 
 * 
 * 【大きさ決定計算式】
 * Math.floor(((Math.random() * (maxScale - minScale))
 *  + (Math.random() * (maxScale - minScale))) /2*10)/10+minScale
 * 
 * サイコロを2回転がして2で割り、中間の大きさを出やすくしています。
 * サイコロを3回転がした方が正規分布には近くなりますが、ゲーム的にはいろいろな
 * パターンを見られた方が楽しいので2回にしました。
 * 
 * ============================================================================
 * プラグインコマンド
 * ============================================================================
 * 
 * nextEnemyScales 敵キャラ1の大きさ 敵キャラ2の大きさ ... 敵キャラ8の大きさ
 *   次の戦闘で、敵キャラの大きさを指定します。
 *   0を指定すると、通常と同じく敵キャラのタグ通りになります。
 *   引数を省略すると0になります。
 *   設定した大きさは戦闘が終了するとリセットされます。
 * 
 * 例）
 * nextEnemyScales 2.5 0 1
 *   次の戦闘で、敵キャラの大きさを、敵キャラ1は2.5倍、敵キャラ2は通常通り、
 *   敵キャラ3は1倍にします。
 *   敵キャラ4以降は通常通りです。
 * 
 * 
 * clearEnemyScales
 *   次の戦闘の敵キャラの大きさの設定をリセットします。
 * 
 * ============================================================================
 * デフォルトの計算式の意図の説明
 * ============================================================================
 * 
 * 【HPの計算式、MPの計算式】
 * value * Math.pow(scale, 3)
 * 
 * 幅、高さ、奥行きがscale倍になっているので、体積はscaleの3乗倍になります。
 * 体が大きくなった分HPもscaleの3乗倍にしてしまおうという計算式です。
 * 
 * 【参考】HPがデフォルトの計算式の場合のscaleごとのHPの倍率
 * scale    HP
 * 1.0  ：1.000倍
 * 1.1  ：1.331倍
 * 1.2  ：1.728倍
 * 1.3  ：2.197倍
 * 1.4  ：2.744倍
 * 1.5  ：3.375倍
 * 1.6  ：4.096倍
 * 1.7  ：4.913倍
 * 1.8  ：5.832倍
 * 1.9  ：6.859倍
 * 2.0  ：8.000倍
 * 
 * ============================================================================
 * 更新履歴
 * ============================================================================
 * 
 * Version 1.00
 *   公開
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・MITライセンスです。
 * ・クレジット表記は不要
 * ・営利目的で使用可
 * ・ソースコードのライセンス表示以外は改変可
 * ・素材だけの再配布も可
 * ・アダルトゲーム、残酷なゲームでの使用も可
 * 
 * 
 * @command nextEnemyScales
 * @text 次の戦闘の敵キャラの大きさ
 * @desc 次の戦闘の敵キャラの大きさを指定します。
 * 
 * 
 * @arg enemy1Scale
 * @type number
 * @decimals 1
 * @min 0
 * @default 0
 * @text 敵キャラ1の大きさ
 * @desc 敵キャラ1の大きさです。0を指定すると通常通りになります。
 * 
 * 
 * @arg enemy2Scale
 * @type number
 * @decimals 1
 * @min 0
 * @default 0
 * @text 敵キャラ2の大きさ
 * @desc 敵キャラ2の大きさです。0を指定すると通常通りになります。
 * 
 * 
 * @arg enemy3Scale
 * @type number
 * @decimals 1
 * @min 0
 * @default 0
 * @text 敵キャラ3の大きさ
 * @desc 敵キャラ3の大きさです。0を指定すると通常通りになります。
 * 
 * 
 * @arg enemy4Scale
 * @type number
 * @decimals 1
 * @min 0
 * @default 0
 * @text 敵キャラ4の大きさ
 * @desc 敵キャラ4の大きさです。0を指定すると通常通りになります。
 * 
 * 
 * @arg enemy5Scale
 * @type number
 * @decimals 1
 * @min 0
 * @default 0
 * @text 敵キャラ5の大きさ
 * @desc 敵キャラ5の大きさです。0を指定すると通常通りになります。
 * 
 * 
 * @arg enemy6Scale
 * @type number
 * @decimals 1
 * @min 0
 * @default 0
 * @text 敵キャラ6の大きさ
 * @desc 敵キャラ6の大きさです。0を指定すると通常通りになります。
 * 
 * 
 * @arg enemy7Scale
 * @type number
 * @decimals 1
 * @min 0
 * @default 0
 * @text 敵キャラ7の大きさ
 * @desc 敵キャラ7の大きさです。0を指定すると通常通りになります。
 * 
 * 
 * @arg enemy8Scale
 * @type number
 * @decimals 1
 * @min 0
 * @default 0
 * @text 敵キャラ8の大きさ
 * @desc 敵キャラ8の大きさです。0を指定すると通常通りになります。
 * 
 * @command clearEnemyScales
 * @text 敵キャラの大きさリセット
 * @desc 次の戦闘の敵キャラの大きさの設定をリセットします。
 * 
 * 
 */

(function () {
	"use strict";
	const parameters = PluginManager.parameters('ABMZ_EnemyRandomScale');
	const ScaleFormula = String("");
	const ScaleParamFormula = [];
	ScaleParamFormula[0] = String(parameters["HPFormula"]);
	ScaleParamFormula[1] = String(parameters["MPFormula"]);
	ScaleParamFormula[2] = String(parameters["ATKFormula"]);
	ScaleParamFormula[3] = String(parameters["DEFFormula"]);
	ScaleParamFormula[4] = String(parameters["MATFormula"]);
	ScaleParamFormula[5] = String(parameters["MDFFormula"]);
	ScaleParamFormula[6] = String(parameters["AGIFormula"]);
	ScaleParamFormula[7] = String(parameters["LUKFormula"]);
	const ScaleEXPFormula = String(parameters["EXPFormula"]);

	//=============================================================================
	// PluginManager
	//=============================================================================

	const pluginName = "ABMZ_EnemyRandomScale";

	PluginManager.registerCommand(pluginName, "nextEnemyScales", args => {
		$gameSystem.setEnemyScales(args);
	});

	PluginManager.registerCommand(pluginName, "clearEnemyScales", args => {
		$gameSystem.clearEnemyScales();
	});
	//=============================================================================
	// Game_Interpreter
	//=============================================================================
	var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'nextEnemyScales') {
			$gameSystem.setEnemyScales(args);
		}
		if (command === 'clearEnemyScales') {
			$gameSystem.clearEnemyScales();
		}
	};
	//=============================================================================
	// Game_System
	//=============================================================================

	Game_System.prototype.clearEnemyScales = function () {
		this._ABEnemyScales = null;
	};

	Game_System.prototype.setEnemyScales = function (args) {
		this._ABEnemyScales = [];
		if (args.enemy1Scale) {
			this._ABEnemyScales[0] = Number(args.enemy1Scale) || 0;
			this._ABEnemyScales[1] = Number(args.enemy2Scale) || 0;
			this._ABEnemyScales[2] = Number(args.enemy3Scale) || 0;
			this._ABEnemyScales[3] = Number(args.enemy4Scale) || 0;
			this._ABEnemyScales[4] = Number(args.enemy5Scale) || 0;
			this._ABEnemyScales[5] = Number(args.enemy6Scale) || 0;
			this._ABEnemyScales[6] = Number(args.enemy7Scale) || 0;
			this._ABEnemyScales[7] = Number(args.enemy8Scale) || 0;
		} else if (args[1]) {
			for (let i = 0; i < 8; i++) {
				this._ABEnemyScales[i] = Number(args[i]) || 0;
			}
		}
	};
	Game_System.prototype.getEnemyScale = function (enemyIndex) {
		if (!this._ABEnemyScales) return 0;
		if (!this._ABEnemyScales[enemyIndex]) return 0;
		return this._ABEnemyScales[enemyIndex];
	};
	//=============================================================================
	// Sprite_Enemy
	//=============================================================================
	const _Sprite_Enemy_prototype_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
	Sprite_Enemy.prototype.loadBitmap = function (name) {
		_Sprite_Enemy_prototype_loadBitmap.call(this, name);

		if (this._enemy.ABScale) {
			var scale = this._enemy.ABScale;
			this.scale.x = scale;
			this.scale.y = scale;

		}
	};
	// ステートスプライトを小さくする
	const _Sprite_Enemy_prototype_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
	Sprite_Enemy.prototype.updateStateSprite = function () {
		this._stateIconSprite.scale.x = 1 / this.scale.x;
		this._stateIconSprite.scale.y = 1 / this.scale.y;
		_Sprite_Enemy_prototype_updateStateSprite.call(this);
		this._stateIconSprite.y = -Math.round((this.bitmap.height * this.scale.y + 40) * 0.9);
		if (this._stateIconSprite.y < (40 - this.y) / this.scale.y) {
			this._stateIconSprite.y = (40 - this.y) / this.scale.y
		}
	};
	//=============================================================================
	// Game_Enemy
	//=============================================================================
	/*
		const _Game_Enemy_prototype_setup = Game_Enemy.prototype.setup;
		Game_Enemy.prototype.setup = function(enemyId, x, y) {
			_Game_Enemy_prototype_setup.call(this, enemyId, x, y);
		};
	*/
	Game_Enemy.prototype.setupABScale = function () {
		// 敵キャラのindexがわからないと
		// プラグインコマンドでのスケール指定が読み取れないため、
		// $gameTroopのsetup終了後に呼ぶ
		const scaleSet = $gameSystem.getEnemyScale(this.index());
		if (scaleSet > 0) {
			this.setABScale(scaleSet);
			return;
		}
		if (this.enemy().meta.scale) {
			const scale = Number(this.enemy().meta.scale);
			if (!scale || scale <= 0) return;
			this.setABScale(scale);
			return;

		} else if (this.enemy().meta.maxScale || this.enemy().meta.minScale) {
			const maxScale = Number(this.enemy().meta.maxScale) || 1;
			const minScale = Number(this.enemy().meta.minScale) || 1;
			const scale = Math.floor(((Math.random() * (maxScale - minScale)) + (Math.random() * (maxScale - minScale))) / 2 * 10) / 10 + minScale;
			if (!scale || scale <= 0) return;
			this.setABScale(scale);
			return;
		}

	}
	Game_Enemy.prototype.setABScale = function (scale) {
		this.ABScale = scale;
		this.refresh();
		this.recoverAll();

	}

	const _Game_Enemy_prototype_paramBase = Game_Enemy.prototype.paramBase;
	Game_Enemy.prototype.paramBase = function (paramId) {
		const value = _Game_Enemy_prototype_paramBase.call(this, paramId);
		if (!this.ABScale) return value;
		const scale = this.ABScale;
		return Math.floor(eval(ScaleParamFormula[paramId]));
	};

	const _Game_Enemy_prototype_exp = Game_Enemy.prototype.exp;
	Game_Enemy.prototype.exp = function () {
		const value = _Game_Enemy_prototype_exp.call(this);
		if (!this.ABScale) return value;
		const scale = this.ABScale;
		return Math.floor(eval(ScaleEXPFormula));
	};
	//=============================================================================
	// Game_Troop
	//=============================================================================
	const _Game_Troop_prototype_setup = Game_Troop.prototype.setup;
	Game_Troop.prototype.setup = function (troopId) {
		_Game_Troop_prototype_setup.call(this, troopId);
		this.members().forEach(function (enemy) {
			enemy.setupABScale();
		})
		$gameSystem.clearEnemyScales();
	}
})();
