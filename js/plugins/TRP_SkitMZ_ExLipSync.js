//=============================================================================
// TRP_SkitMZ_ExLipSync.js
//=============================================================================
// Copyright (c) 2020 Thirop
//============================================================================

/*:
 * @target MZ
 * @author Thirop
 * @plugindesc TRP_SkitMZ、口パク拡張パッチ
 * @help
 * 立ち絵表示時にセリフに合わせて口パク動作を有効化します。
 * （※表情の階層レイヤーを使用する必要があります。）
 * 
 * 1.各キャラの各ポーズごとに表情ピッカーを起動し
 * 「Lキー」より口パクパーツ選択モードに入る。
 * 2.口パーツにあたる表情パーツ種類を選択
 * 3.口パク時にランダム表示するパーツIDをクリックで選択
 * 4.決定キーで確定後、「Sキー」で保存
 * 
 *
 * 【更新履歴】
 * 1.00 2020/11/10 初版
 *
 * @param animationFrame
 * @text フレーム数
 * @desc １コマあたりのフレーム数
 * @type number
 * @default 9
 *
 */
//============================================================================= 

(function () {
	'use strict';

	var pluginName = 'TRP_SkitMZ_ExLipSync';
	var parameters = JSON.parse(JSON.stringify(PluginManager.parameters(pluginName), function (key, value) {
		try {
			return JSON.parse(value);
		} catch (e) {
			try {
				if (value[0] === '[' || value[0] === '{') {
					if (value.contains(' ')) {
						return value;
					}
					return eval(value);
				} else if (value === '') {
					return value;
				} else if (!isNaN(value)) {
					return Number(value);
				} else if (value === 'true') {
					return true;
				} else if (value === 'false') {
					return false;
				} else {
					return value;
				}
			} catch (e) {
				return value;
			}
		}
	}));


	var _Window_Message_flushTextState = Window_Message.prototype.flushTextState;
	Window_Message.prototype.flushTextState = function (textState) {
		if (textState.drawing && textState.buffer) {
			$gameMessage.onPronounce(textState.buffer);
		}
		_Window_Message_flushTextState.call(this, textState);
	};


	Game_Message.prototype.onPronounce = function (text) {
		if (this._talkingActorName) {
			$gameSkit.onPronounce(this._talkingActorName, text);
		}
	};


	Skit.prototype.onPronounce = function (target, text) {
		if (!this.isSkitOn()) return;

		var actor = this.actor(target);
		if (actor && actor._showing) {
			actor.onPronounce(text);
		}
	};


	var _SkitActor_clearParameters = SkitActor.prototype.clearParameters;
	SkitActor.prototype.clearParameters = function () {
		_SkitActor_clearParameters.call(this);
		this.clearLipSync();
	};

	var _SkitActor_show = SkitActor.prototype.show;
	SkitActor.prototype.show = function () {
		this.clearLipSync();
		_SkitActor_show.apply(this, arguments)

		this.setupLipSync();
	};

	var _SkitActor_changeImage = SkitActor.prototype.changeImage;
	SkitActor.prototype.changeImage = function () {
		this.clearLipSync();
		_SkitActor_changeImage.apply(this, arguments);

		this.setupLipSync();
	};

	var _SkitActor_overlayName = SkitActor.prototype.overlayName;
	SkitActor.prototype.overlayName = function () {
		var overlay = _SkitActor_overlayName.call(this);
		if (this._lipSyncIdx >= 0) {
			overlay += '-L:' + this._lipSyncIdx;
		}
		return overlay;
	};

	var _SkitActor_update = SkitActor.prototype.update;
	SkitActor.prototype.update = function () {
		_SkitActor_update.call(this);
		if (this._lipSyncWait > 0) {
			this.updateLipSyncWait();
		}
	};


	SkitActor.prototype.onPronounce = function (text) {
		if (this._lipSyncWait !== 0) return;

		var lipSyncIds = this.exData().poses[this._pose].lipSyncIds;
		var idx;

		if (this._lipSyncIdx >= 0) {
			idx = Math.randomInt(lipSyncIds.length - 1);
			if (idx >= this._lipSyncIdx) {
				idx += 1;
			}
		} else {
			idx = Math.randomInt(lipSyncIds.length);
		}

		this._lipSyncIdx = idx;
		this._lipSyncWait = this.lipSyncWait();

		this.applyOverlay();
	};

	SkitActor.prototype.clearLipSync = function () {
		this._lipSyncWait = 0;
		this._lipSyncIdx = -1;
	};


	SkitActor.prototype.setupLipSync = function () {
		this.clearLipSync();

		var exp = this._expression;
		if (/-(?:nl|NL)(?:-|$)/.test(exp)) {
			this._lipSyncWait = -1;
			return;
		}

		var actorData = this.exData();
		var pose = actorData ? actorData.poses[this._pose] : null;
		var lipSyncIds = pose ? pose.lipSyncIds : null;
		if (!lipSyncIds || lipSyncIds.length === 0) {
			this._lipSyncWait = -1;
			return;
		}
	};

	SkitActor.prototype.updateLipSyncWait = function () {
		this._lipSyncWait -= 1;
		if (this._lipSyncWait <= 0) {
			this._lipSyncWait = 0;
			this._lipSyncIdx = -1;
			this.applyOverlay();
		}
	};

	SkitActor.prototype.lipSyncWait = function () {
		return parameters.animationFrame;
	};




	//=============================================================================
	// Sprite_Picture
	//=============================================================================
	var _Sprite_Picture_convertSkitOverlayPartsId = Sprite_Picture.convertSkitOverlayPartsId;
	Sprite_Picture.convertSkitOverlayPartsId = function (ret, elem, poseData, exps) {
		if ((elem[0] === 'L' || elem[0] === 'l') && elem[1] === ':') {
			if (poseData.lipSyncIds) {
				var lipSyncIdx = Number(elem.substring(2));
				if (isNaN(lipSyncIdx)) {
					lipSyncIdx = poseData.lipSyncIds.length - 1;
				}
				elem = 'p' + poseData.lipSyncKind + ':' + poseData.lipSyncIds[lipSyncIdx];
			} else {
				return;
			}
		} else if (elem === 'NL' || elem === 'nl') {
			return;
		}

		_Sprite_Picture_convertSkitOverlayPartsId.call(this, ret, elem, poseData, exps);
	};


})();