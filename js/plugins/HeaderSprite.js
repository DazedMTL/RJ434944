//=============================================================================
// HeaderSprite.js
//=============================================================================
/*:
 * @author Thirop
 */
//============================================================================= 

(function () {
	'use strict';


	//=============================================================================
	// Game_CharacterBase
	//=============================================================================

	var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function () {
		_Game_CharacterBase_initMembers.call(this);
		this.header = null;
	};

	Game_CharacterBase.prototype.setHeader = function (name, icon = 0, color = 'white', dy = 0, opacityLink = false) {
		if (!this.header) {
			this.header = {
				DATA_TYPE: 'header'
			}
		}
		var header = this.header;
		header.changed = true;
		header.name = name;
		header.icon = icon;
		header.color = color;
		header.dy = dy;
		header.opacityLink = opacityLink;
	};

	Game_CharacterBase.prototype.eraseHeader = function () {
		this.header = null;
	};

	//=============================================================================
	// Game_Event
	//=============================================================================
	var _Game_Event_initialize = Game_Event.prototype.initialize;
	Game_Event.prototype.initialize = function (mapId, eventId) {
		_Game_Event_initialize.call(this, mapId, eventId);

		var data = this.event();
		this.initWithMeta(data);
	}

	Game_Event.prototype.initWithMeta = function (data) {
		var headerStr = data.note.replace(/\<.*\>/g, '');
		if (headerStr) {
			this.setupHeader(headerStr)
		}
	};

	var iconRegExp = /\\I\[(\d+)\]/;
	var colorRegExp = /\\C\[(\d+),(\d+),(\d+)\]/;
	Game_Event.prototype.setupHeader = function (headerStr) {
		var iconIndex = 0;
		var color = 'white';
		if (iconRegExp.test(headerStr)) {
			iconIndex = Number(RegExp.$1);
			headerStr = headerStr.replace(iconRegExp, '');
		}
		if (colorRegExp.test(headerStr)) {
			color = 'rgb(' + Number(RegExp.$1) + ',' + Number(RegExp.$2) + ',' + Number(RegExp.$3) + ')';
			headerStr = headerStr.replace(colorRegExp, '');
		}

		this.setHeader(headerStr, iconIndex, color);
	};


	//=============================================================================
	// Sprite_Character
	//=============================================================================
	var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
	Sprite_Character.prototype.initMembers = function () {
		_Sprite_Character_initMembers.call(this);
		this._headerSprite = null;
		this._headerDy = 0;
		this._headerOpacityLink = false;
	};

	var _Sprite_Character_update = Sprite_Character.prototype.update;
	Sprite_Character.prototype.update = function () {
		_Sprite_Character_update.call(this);

		var character = this._character;
		if (character.header && character.header.changed) {
			this.refreshHeaderSprite(character.header);
		}
		if (this._headerSprite) {
			if (!character.header) {
				this._headerSprite.parent.remove(this._headerSprite);
				this._headerSprite = null;
			} else {
				this.updateHeaderSprite(character);
			}
		}

	};

	Sprite_Character.prototype.refreshHeaderSprite = function (header) {
		var name = header.name;
		header.changed = false;

		this._headerDy = header.dy;
		this._headerOpacityLink = header.opacityLink;

		var sprite = this._headerSprite;
		var width = 96;
		var height = 20;
		if (!sprite) {
			var sprite = new Sprite();
			this._headerSprite = sprite;
			sprite.z = 9;
			sprite.anchor.set(0.5, 1);

			sprite.bitmap = new Bitmap(width, height);

			// sprite.trySetCache(null,width,height);
		}

		var fr = sprite._frame;
		var bitmap = sprite.bitmap;
		// bitmap.resetFontSetting();

		var x = fr.x;
		var y = fr.y;
		var iconSize = 0;
		if (header.icon) {
			var src = ImageManager.loadSystem('IconSet');
			var sx = header.icon % 16 * 32;
			var sy = Math.floor(header.icon / 16) * 32;
			iconSize = 20;
			bitmap.bltImage(src, sx, sy, 32, 32, x, y, iconSize, iconSize);

			x += iconSize;
		}

		bitmap.fontSize = 14;
		bitmap.textColor = header.color;
		bitmap.outlineColor = 'black';
		bitmap.outlineWidth = 3;

		var m = 2;
		bitmap.drawText(name, x + m, y, width - 2 * m - iconSize, height);

		fr.width = Math.min(iconSize + bitmap.measureTextWidth(name) + 2 * m, width);
		sprite._refresh();
	};

	Sprite_Character.prototype.updateHeaderSprite = function (character = this._character) {
		var sprite = this._headerSprite;
		if (!sprite.parent) {
			if (this.parent) {
				this.parent.addChild(sprite);
			} else {
				return;
			}
		}

		if (character._opacity === 0 || character._transparent) {
			sprite.visible = false;
			return;
		} else if (!sprite.visible) {
			sprite.visible = true;
		}

		if (this._headerOpacityLink) {
			sprite.opacity = character._opacity;
		}

		sprite.x = this.x;
		sprite.y = this.y - this.anchor.y * this.scale.y * this.height + this._headerDy;
	};

















})();