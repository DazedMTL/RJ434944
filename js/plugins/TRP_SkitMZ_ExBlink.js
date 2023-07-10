//=============================================================================
// TRP_SkitMZ_ExBlink.js
//=============================================================================
// Copyright (c) 2020 Thirop
//============================================================================

/*:
 * @target MZ
 * @author Thirop
 * @plugindesc TRP_SkitMZ、まばたき拡張パッチ
 * @help
 * 立ち絵表示時にまばたき動作を有効化します。
 * （※表情の階層レイヤーを使用する必要があります。）
 * 
 * 1.各キャラの各ポーズごとに表情ピッカーを起動し
 * 「Bキー」よりまばたきパーツ選択モードに入る。
 * 2.目パーツにあたる表情パーツ種類を選択
 * 3.まばたき時のパーツIDを順にクリックで選択
 * （複数フレームでアニメーションさせる場合は順に選択）
 * 4.決定キーで確定後、「Sキー」で保存
 * 
 *
 * □まばたきの制御
 * ▷まばたき無効
 * 表情IDを指定時に「表情ID-nb」
 * 例）メッセージ中の制御文字で「\SE[1-nb]」
 * 
 * ▷強制的に目を閉じる
 * 表情IDを指定時に「表情ID-b」
 * 例）メッセージ中の制御文字で「\SE[1-b]」
 * 
 * 
 * 
 * 【更新履歴】
 * 1.01 2022/1/20  不具合の修正
 * 1.00 2020/11/10 初版
 *
 * @param blinkFrame
 * @text 瞬きフレーム
 * @desc 目を閉じてる間のフレーム数
 * @type number
 * @default 4
 *
 * @param maxFrame
 * @text 瞬き間隔の最大フレーム数
 * @desc 瞬き間隔の最大フレーム数
 * @type number
 * @min 1
 * @default 240
 *
 * @param minFrame
 * @text 瞬き間隔の最小フレーム数
 * @desc 瞬き間隔の最小フレーム数
 * @type number
 * @min 1
 * @default 20
 *
 */
//============================================================================= 


(function () {
	'use strict';

	var pluginName = 'TRP_SkitMZ_ExBlink';
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

	var _SkitActor_clearParameters = SkitActor.prototype.clearParameters;
	SkitActor.prototype.clearParameters = function () {
		_SkitActor_clearParameters.call(this);
		this.clearBlink();
	};

	var _SkitActor_show = SkitActor.prototype.show;
	SkitActor.prototype.show = function () {
		this.clearBlink();

		_SkitActor_show.apply(this, arguments)
		this.setupBlink();
	};

	var _SkitActor_changeImage = SkitActor.prototype.changeImage;
	SkitActor.prototype.changeImage = function () {
		this.clearBlink();

		_SkitActor_changeImage.apply(this, arguments);
		this.setupBlink();
	};


	var _SkitActor_update = SkitActor.prototype.update;
	SkitActor.prototype.update = function () {
		_SkitActor_update.call(this);

		if (this._showing && (this._blinkCount > 0 || this._blinkWait > 0)) {
			this.updateBlink();
		}
	};



	SkitActor.prototype.clearBlink = function () {
		this._blinkCount = 0;
		this._blinkWait = 0;
	};

	SkitActor.prototype.setupBlink = function () {
		this.clearBlink();

		var pose = this._pose;
		var exp = this._expression;

		if (/-(?:b|B|nb|NB)(?:-|$)/.test(exp)) {
			return;
		}

		var expActorData = $dataTrpSkit[this._name];
		if (!expActorData) return;

		var poseData = expActorData.poses[pose];
		if (!poseData || !poseData.blinkIds) return;

		this.setBlinkWait();
	};

	SkitActor.prototype.updateBlink = function () {
		if (this._blinkWait === 0) {
			var blinkCount = this.blinkFrame();
			if (this._blinkCount % blinkCount === 0) {
				var blinkIdx = this._blinkCount / blinkCount;
				if (blinkIdx > this.exData().poses[this._pose].blinkIds.length) {
					this._blinkCount = 0;
					this.setBlinkWait();
				}
				this.applyOverlay();
			}

			if (this._blinkWait === 0) {
				this._blinkCount += 1;
			}
		} else {
			this._blinkWait -= 1;
			if (this._blinkWait <= 0) {
				this._blinkCount = 1;
				this.applyOverlay();
			}
		}
	};

	SkitActor.prototype.setBlinkWait = function () {
		this._blinkWait = parameters.minFrame + Math.max(0, Math.randomInt(parameters.maxFrame - parameters.minFrame));
	};
	SkitActor.prototype.blinkFrame = function () {
		return Math.max(1, parameters.blinkFrame);
	};


	var _SkitActor_overlayName = SkitActor.prototype.overlayName;
	SkitActor.prototype.overlayName = function () {
		var overlay = _SkitActor_overlayName.call(this);
		if (this._blinkCount) {
			overlay += '-' + this.blinkOverlayParts();
		}
		return overlay;
	};

	SkitActor.prototype.blinkOverlayParts = function () {
		var blinkIdx = Math.ceil((this._blinkCount) / this.blinkFrame()) - 1;
		return 'b:' + blinkIdx;
	};




	//=============================================================================
	// Sprite_Picture
	//=============================================================================
	var _Sprite_Picture_convertSkitOverlayPartsId = Sprite_Picture.convertSkitOverlayPartsId;
	Sprite_Picture.convertSkitOverlayPartsId = function (ret, elem, poseData, exps) {
		var separatorIdx = elem.indexOf(':');
		if (
			(elem[0] === 'B' || elem[0] === 'b')
			&& (separatorIdx === -1 || separatorIdx === 1)
		) {
			if (poseData.blinkIds) {
				var blinkIdx = poseData.blinkIds.length - 1;
				if (separatorIdx > 0) {
					blinkIdx = Number(elem.substring(separatorIdx + 1));
					if (isNaN(blinkIdx)) {
						blinkIdx = poseData.blinkIds.length - 1;
					}
				}
				elem = 'p' + poseData.blinkKind + ':' + poseData.blinkIds[Math.min(blinkIdx, poseData.blinkIds.length - 1)];
			} else {
				return;
			}
		} else if (elem === 'NB' || elem === 'nb') {
			return;
		}

		_Sprite_Picture_convertSkitOverlayPartsId.call(this, ret, elem, poseData, exps);
	};













})();