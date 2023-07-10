//=============================================================================
// HeaderName.js
//=============================================================================
/*:ja
 * @target MZ
 * @author Thirop
 *
 * @param marginY
 * @text 頭上からの距離
 * @desc デフォルト:4
 * @type number
 * @default 4
 *
 * @param maxWidth
 * @text 最大横幅
 * @desc デフォルト:96
 * @type number
 * @default 96
 *
 * @param fontSize
 * @text フォントサイズ
 * @desc デフォルト:16
 * @type number
 * @default 16
 *
 */
//============================================================================= 
//PRAGMA: englishHeader
/*:
 * @target MZ
 * @author Thirop
 *
 * @param marginY
 * @text Distance from overhead
 * @desc Default value:4
 * @type number
 * @default 4
 *
 * @param maxWidth
 * @text maxWidth
 * @desc Default value:96
 * @type number
 * @default 96
 *
 * @param fontSize
 * @text fontSize
 * @desc Default value:16
 * @type number
 * @default 16
 *
 */
//=============================================================================
//PRAGMA_END: englishHeader


(function () {
	'use strict';

	var parameters = PluginManager.parameters('HeaderName');
	var marginY = Number(parameters.marginY) || 4;
	var maxWidth = Number(parameters.maxWidth) || 128;
	var fontSize = Number(parameters.fontSize) || 20;


	//=============================================================================
	// HeaderNameSprite
	//=============================================================================
	Game_Character.prototype.headerName = function () { return null };


	var _Game_Event_prototype_initMembers = Game_Event.prototype.initMembers;
	Game_Event.prototype.initMembers = function () {
		_Game_Event_prototype_initMembers.call(this);
		this._headerName = '';
	};

	var _Game_Event_initialize = Game_Event.prototype.initialize;
	Game_Event.prototype.initialize = function (mapId, eventId) {
		_Game_Event_initialize.call(this, mapId, eventId);

		var data = this.event();
		if (data && data.note) {
			this._headerName = data.note;
		}
	};
	Game_Event.prototype.headerName = function () {
		return this._headerName;
	};


	var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
	Sprite_Character.prototype.initMembers = function () {
		_Sprite_Character_initMembers.call(this);
		this._headerNameSprite = null;
		this._headerNameLines = 0;
	};

	var _Sprite_Character_setCharacter = Sprite_Character.prototype.setCharacter;
	Sprite_Character.prototype.setCharacter = function (character) {
		_Sprite_Character_setCharacter.call(this, character);
		var name = character.headerName();
		if (!name) {
			if (this._headerNameSprite) {
				this._headerNameSprite.visible = false;
			}
		} else {
			this.setupHeaderNameSprite(name);
		}
	};

	Sprite_Character.prototype.setupHeaderNameSprite = function (name) {
		var sprite = this._headerNameSprite;
		var bitmap;
		var lines = name.split('\\n');
		var length = lines.length;

		var lineHeight = fontSize + 2;
		if (!sprite || this._headerNameLines !== length) {
			bitmap = new Bitmap(maxWidth, length * lineHeight);
			sprite = new Sprite(bitmap);
			this._headerNameSprite = sprite;
			sprite.anchor.set(0.5, 1);
			sprite.z = 8;
			bitmap.fontSize = fontSize;
		} else {
			bitmap = sprite.bitmap
			bitmap.clear();
		}

		this._headerNameLines = length;

		var width = bitmap.width;
		var height = bitmap.height;

		for (var i = 0; i < length; i = (i + 1) | 0) {
			var line = lines[i];
			bitmap.drawText(line, 0, i * lineHeight, width, lineHeight, 'center');
		}
	};


	var _Sprite_Character_update = Sprite_Character.prototype.update;
	Sprite_Character.prototype.update = function () {
		_Sprite_Character_update.call(this);
		if (this._headerNameSprite) {
			this.updateHeaderNameSprite();
		}
	};

	Sprite_Character.prototype.updateHeaderNameSprite = function () {
		var sprite = this._headerNameSprite;
		if (!this.visible || this.opacity === 0) {
			sprite.visible = false;
			return;
		}

		if (!sprite.parent) {
			if (this.parent) {
				this.parent.addChild(sprite);
			} else {
				return;
			}
		}

		sprite.visible = true;
		sprite.x = this.x;
		sprite.y = this.y - this.height - marginY;
	};



})();