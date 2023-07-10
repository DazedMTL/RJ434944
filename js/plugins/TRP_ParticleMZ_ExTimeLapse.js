//=============================================================================
// TRP_ParticleMZ_ExTimeLapse.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 時間操作パッチ(TRP_ParticleMZ.jsより下に配置)
 * @author Thirop
 * @help
 * 本パッチを導入するとupdate/animateコマンドで
 * パーティクルの再生速度などを操作できるようになります。
 *
 * ◆timeRate:再生速度(0以上の値。1で等速、0で停止)
 * パーティクルの速度のみでなく、発生間隔などにも影響します。
 * 
 * 例) particle update 管理ID timeRate 0.5
 * → 管理IDで指定したパーティクルを半分の速度に変更
 * 例) particle animate 管理ID 60 timeRate 0
 * → 管理IDで指定したパーティクルを60フレームかけて停止
 * 
 * 
 * ◆timeLapse:タイムラプス間隔(1以上の値。1で通常)
 * 指定した間隔フレームに１度のみ更新し、パラパラアニメのように
 * コマ送りに見えます。（再生速度自体は変化なし）
 * 例) particle udpate 管理ID timeLapse 2
 * → 管理IDで指定したパーティクルを2フレームに1度の
 *   アニメーション更新頻度に変更
 * 例) particle animate 管理ID 60 timeLapse 6
 * → 管理IDで指定したパーティクルを60フレームかけて
 *   6フレームに一度のアニメーション更新頻度に変更
 *
 *
 * ◆画面全体のコマ送り
 * プラグインコマンドより画面全体のコマ送り操作が可能です。
 * spritesetに対してコマ送りを実行するため、
 * 文章表示などのscene上の表示は通常の速度で表示されます。
 *
 * □MV形式コマンドにも対応
 * ▷開始
 * 「timeLapse start 間隔フレーム数 フラッシュ赤(0~255) 緑 青 強さ(0~255) 時間」
 *  （※フラッシュは強さを1以上にするとコマ送りごとに実行。
 *     短い間隔で強いフラッシュを入れすぎないように注意。
 *     フラッシュ時間は省略すると間隔フレーム数の値）
 *
 * ▷終了
 * 「timeLapse end」
 *
 * ▷一時停止
 * 「timeLapse pause」
 *
 * ▷再開
 * 「timeLapse resume」
 * 
 *
 * @param defaultInterval
 * @text 間隔フレーム[デフォ値]
 * @desc タイムラプス開始コマンドの間隔フレーム数のデフォルト値
 * @default 4
 * @type number
 * 
 *
 * @command start
 * @text タイムラプス開始
 * @desc 画面全体のタイムラプス開始。spriteset全体がコマ送りになります。
 * 
 * @arg interval
 * @text 間隔フレーム
 * @desc コマ送りの間隔フレーム数
 * @type number
 *
 * @arg flashR
 * @text フラッシュ赤
 * @desc フラッシュ赤(0~255)
 * @default 255
 * @type number
 *
 * @arg flashG
 * @text フラッシュ緑
 * @desc フラッシュ赤(0~255)
 * @default 255
 * @type number
 *
 * @arg flashB
 * @text フラッシュ青
 * @desc フラッシュ青(0~255)
 * @default 255
 * @type number
 *
 * @arg flashStrength
 * @text フラッシュ強さ
 * @desc フラッシュ強さ(0~255)。1以上とするとコマ送り時にフラッシュを実行。強くかけすぎないよう注意
 * @default 0
 * @type number
 *
 * @arg flashDuration
 * @text フラッシュ時間
 * @desc フラッシュに要する時間。0で間隔フレーム数の値
 * @type number
 * default 0
 *
 *
 * @command end
 * @text タイムラプス終了
 * @desc タイムラプスの終了
 *
 * @command pause
 * @text タイムラプス一時停止
 * @desc タイムラプス一時停止
 *
 * @command resume
 * @text タイムラプスの再開
 * @desc タイムラプスの再開
 * 
 */
//============================================================================= 


function TimeLapseSprite() {
	this.initialize.apply(this, arguments);
}

(function () {

	var pluginName = 'TRP_ParticleMZ_ExTimeLapse';
	var parameters = PluginManager.parameters(pluginName);

	//=============================================================================
	// Game_Interpreter
	//=============================================================================
	(function () {
		var commands = ['start', 'pause', 'resume', 'end'];
		for (const command of commands) {
			PluginManager.registerCommand(pluginName, command, function (args) {
				var argsArr = Object.values(args)

				argsArr.unshift(command);
				this._processTimeLapseCommand(argsArr);
			});
		}
	})();


	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		switch (command.toLowerCase()) {
			case 'timelapse':
			case 'タイムラプス':
				this._processTimeLapseCommand(args)
				break;
			default:
				_Game_Interpreter_pluginCommand.call(this, command, args);
		}
	};

	Game_Interpreter.prototype._processTimeLapseCommand = function (args) {
		var subCommand = args.shift();

		switch (subCommand) {
			case 'start':
			case '開始':
				$gameScreen.startTimeLapse.apply($gameScreen, args);
				break;
			case 'pause':
			case '停止':
			case '一時停止':
				$gameScreen.pauseTimeLapse();
				break;
			case 'resume':
			case '再開':
				$gameScreen.resumeTimeLapse();
				break;
			case 'end':
			case '終了':
				$gameScreen.endTimeLapse();
				break;
		}
	};




	//=============================================================================
	// Game_Screen
	//=============================================================================
	var _Game_Screen_clear = Game_Screen.prototype.clear;
	Game_Screen.prototype.clear = function () {
		_Game_Screen_clear.call(this);

		this._timeLapse = null;
	};
	Game_Screen.prototype.startTimeLapse = function (interval, fr = 255, fg = 255, fb = 255, fStrength = 0, flashDuration) {
		if (!interval) {
			interval = parameters.defaultInterval;
		}

		this._timeLapse = {
			on: true,
			interval: Number(interval),
			flash: Number(fStrength) > 0 ? [Number(fr), Number(fg), Number(fb), Number(fStrength)] : null,
			flashDuration: Number(flashDuration) || interval,
		};
	};
	Game_Screen.prototype.pauseTimeLapse = function () {
		if (this._timeLapse) {
			this._timeLapse.on = false;
		}
	};
	Game_Screen.prototype.resumeTimeLapse = function () {
		if (this._timeLapse) {
			this._timeLapse.on = true;
		}
	};
	Game_Screen.prototype.endTimeLapse = function () {
		this._timeLapse = null;
	}


	//=============================================================================
	// Spriteset_Base
	//=============================================================================
	var _Spriteset_Base_initialize = Spriteset_Base.prototype.initialize;
	Spriteset_Base.prototype.initialize = function () {
		_Spriteset_Base_initialize.call(this);
		this._timeLapseSprite = null;
	};

	var _Spriteset_Base_destroy = Spriteset_Base.prototype.destroy;
	Spriteset_Base.prototype.destroy = function (options) {
		this._timeLapseSprite = null;
		_Spriteset_Base_destroy.call(this, options);
	};

	var _Spriteset_Base_update = Spriteset_Base.prototype.update;
	Spriteset_Base.prototype.update = function () {
		_Spriteset_Base_update.call(this);

		if ($gameScreen._timeLapse && !this._timeLapseSprite) {
			this._timeLapseSprite = new TimeLapseSprite(this);
		}
		if (this._timeLapseSprite) {
			this._timeLapseSprite.updateSnap(this);
		}
	};


	//=============================================================================
	// TimeLapseSprite
	//=============================================================================
	TimeLapseSprite.prototype = Object.create(PIXI.Sprite.prototype);
	TimeLapseSprite.prototype.constructor = TimeLapseSprite;
	TimeLapseSprite.prototype.initialize = function (spriteset) {
		var width = Graphics.width;
		var height = Graphics.height;
		var texture = PIXI.RenderTexture.create(width, height);

		PIXI.Sprite.call(this, texture);

		this._useAppRenderer = (Utils.RPGMAKER_NAME === 'MZ');

		this._interval = 1;
		this._on = false;
		this._count = 0
		this._flashFilter = null;
		this._flash = [0, 0, 0, 0];
		this._flashDuration = 0;

		var parent = spriteset.parent;
		parent.addChildAt(this, parent.children.indexOf(spriteset) + 1);

		this.visible = false;
	};
	TimeLapseSprite.prototype.destroy = function () {
		PIXI.Sprite.prototype.destroy.call(this, { children: true, texture: true });
	};


	TimeLapseSprite.prototype.start = function (spriteset) {
		this._on = true;
		this.refreshInterval(spriteset);

		if (this.visible) {
			this.snap(spriteset);
		}
	};
	TimeLapseSprite.prototype.pause = function (spriteset) {
		this._on = false;
		this.refreshVisible(spriteset);
	};

	TimeLapseSprite.prototype.refreshInterval = function (spriteset) {
		this._interval = $gameScreen._timeLapse.interval;
		this.refreshVisible(spriteset);
	};
	TimeLapseSprite.prototype.refreshVisible = function (spriteset) {
		if (!this._on) {
			this.visible = false;
			spriteset.visible = true;

			if (this._flashDuration > 0) {
				this._flashDuration = 0;
				$gameScreen.startFlash(this._flash, this._flashDuration);
			}
		} else {
			this.visible = true;
			spriteset.visible = false;
		}
	};

	TimeLapseSprite.prototype.updateSnap = function (spriteset) {
		if (!$gameScreen._timeLapse) {
			if (this._on) {
				this.pause(spriteset);
			}
			return;
		}

		if ($gameScreen._timeLapse.on !== this._on) {
			if ($gameScreen._timeLapse.on) {
				this.start(spriteset);
			} else {
				this.pause(spriteset);
			}
			return;
		}

		if (this._on && this._interval !== $gameScreen._timeLapseInterval) {
			this.refreshInterval(spriteset);
		}

		if (!this.visible) {
			return;
		}

		this._count += 1;
		if (this._count >= this._interval) {
			this.snap(spriteset);
		}

		this.updateFlash();
	};

	TimeLapseSprite.prototype.updateFlash = function () {
		if (this._flashDuration > 0) {
			if (!this._flashFilter) {
				this._flashFilter = new ColorFilter();
				this.filters = [this._flashFilter];
			}
			this._flashDuration -= 1;
			if (this._flashDuration > 0) {
				this._flash[3] *= (this._flashDuration - 1) / this._flashDuration;
			} else {
				this._flash[3] = 0;
			}
			this._flashFilter.setBlendColor(this._flash);
		}
	};

	TimeLapseSprite.prototype.snap = function (spriteset) {
		var renderTexture = this._texture;
		this._count = 0;

		spriteset.visible = true;

		if (this._useAppRenderer) {
			Graphics.app.renderer.render(spriteset, renderTexture);
		} else {
			Graphics._renderer.render(spriteset, renderTexture);
		}

		spriteset.worldTransform.identity();
		spriteset.visible = false;

		var flash = $gameScreen._timeLapse.flash;
		if (flash) {
			this._flashDuration = $gameScreen._timeLapse.flashDuration;
			this._flash[0] = flash[0];
			this._flash[1] = flash[1];
			this._flash[2] = flash[2];
			this._flash[3] = flash[3];
		}
	};





	//=============================================================================
	// ParticleEmitter
	//=============================================================================
	var _ParticleEmitter_initMembers = ParticleEmitter.prototype.initMembers;
	ParticleEmitter.prototype.initMembers = function () {
		_ParticleEmitter_initMembers.call(this);

		this._timeRate = 1;
		this._timeLapse = 1;
		this._timeLapseCount = 0;
	};

	var _ParticleEmitter_updateParam = ParticleEmitter.prototype._updateParam;
	ParticleEmitter.prototype._updateParam = function (key, args, rate, emitter) {
		rate = rate || 1;

		switch (key.toLowerCase()) {
			case 'timerate':
				this._timeRate = this.paramWithRate(Number(args[0]) || 0, this._timeRate, rate);
				break;
			case 'timelapse':
				this._timeLapse = Math.max(1, Math.round(this.paramWithRate(Number(args[0]) || 0, this._timeLapse, rate)));
				break;
			default:
				_ParticleEmitter_updateParam.call(this, key, args, rate, emitter);
		}
	};

	var _ParticleEmitter_updateEmitter = ParticleEmitter.prototype.updateEmitter;
	ParticleEmitter.prototype.updateEmitter = function () {
		if (this._timeLapse !== 1) {
			this._timeLapseCount += 1;
			if (this._timeLapseCount < this._timeLapse) return;
			this._timeLapseCount = 0;
		}
		_ParticleEmitter_updateEmitter.call(this);
	};

	ParticleEmitter.prototype.updateDeltaTime = function () {
		return ParticleEmitter.DELTA_TIME * this._timeRate * this._timeLapse;
	};



})();