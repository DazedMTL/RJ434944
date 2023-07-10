//=============================================================================
// TRP_DisplacementFilter.js
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 水中マップ用のゆらぎフィルター
 * @author Thirop
 * @help
 *
 * 1.img/systemフォルダに指定する画像名の変形用画像ファイルを配置
 * 2.マップのメモ欄に設定を記述
 * <displacement:x方向スピード,y方向スピード,拡大率,画像名>
 * 拡大率を省略時のデフォルト値は20
 * 画像名を省略時のデフォルト値はDisplacementMap
 *
 *
 * @param usingFiles
 * @text 使用ファイル登録
 * @desc 「未使用ファイル除外」で除外されないように使用する画像を登録
 * @type file[] 
 * @default ["img/system/DisplacementMap","img/system/DisplacementMap2"]
 * 
 *
 */
//============================================================================= 
//PRAGMA: englishHeader
/*:
 * @target MZ
 * @plugindesc Fluctuation filter for underwater maps
 * @author Thirop
 * @help
 *
 * 1. Place image files for deformation with the specified image name in the img/system folder.
 * 2. Describe settings in the memo field of the map
 * <displacement:speed in x-direction,speed in y-direction,magnification,image name>
 * Default value when magnification is omitted is [20]
 * Default value when image name is omitted is [DisplacementMap]
 *
 *
 * @param usingFiles
 * @text File Registration
 * @desc Register images to be used to avoid being excluded from "Unused File Exclusion".
 * @type file[] 
 * @default ["img/system/DisplacementMap","img/system/DisplacementMap2"]
 * 
 *
 */
//============================================================================= 
//PRAGMA_END: englishHeader

(function () {
	var parameters = PluginManager.parameters('TRP_DisplacementFilter');


	//=============================================================================
	// Game_Screen
	//=============================================================================
	var _Game_Screen_clear = Game_Screen.prototype.clear;
	Game_Screen.prototype.clear = function () {
		_Game_Screen_clear.call(this);
		this._displacementSetting = null;
	};

	Game_Screen.prototype.startDisplacementFilter = function (sx, sy, scale, image) {
		this._displacementSetting = {
			sx: sx || 0,
			sy: sy || 0,
			scale: scale || 20,
			image: image || 'DisplacementMap'
		};
	};
	Game_Screen.prototype.clearDisplacementFilter = function (sx, sy, scale, image) {
		this._displacementSetting = null;
	};


	//=============================================================================
	// Game_Map
	//=============================================================================
	var _Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function (mapId) {
		_Game_Map_setup.call(this, mapId);

		var displacement = $dataMap.meta ? $dataMap.meta.displacement : null;
		if (displacement) {
			this.setupDisplacement(displacement);
		} else {
			$gameScreen.clearDisplacementFilter();
		}
	};

	Game_Map.prototype.setupDisplacement = function (displacement) {
		var dispArgs = displacement.split(',');
		var sx = Number(dispArgs[0]);
		var sy = Number(dispArgs[1]);
		var scale = Number(dispArgs[2]) || 0;
		var image = dispArgs[3];
		$gameScreen.startDisplacementFilter(sx, sy, scale, image);
	};


	//=============================================================================
	// Scene_Map
	//=============================================================================
	var _Scene_Map_initialize = Scene_Map.prototype.initialize;
	Scene_Map.prototype.initialize = function () {
		_Scene_Map_initialize.call(this);
		this.clearDisplacement();
	};

	Scene_Map.prototype.clearDisplacement = function () {
		this._displacement = {
			image: '',
			scale: 0,
			filter: null,
			dx: -1,
			dy: -1
		};
	};

	var _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function () {
		_Scene_Map_update.call(this);

		this.updateDisplacementFilter();
	};

	Scene_Map.prototype.updateDisplacementFilter = function () {
		var setting = $gameScreen._displacementSetting;
		if (setting) {
			if (this._displacement.image !== setting.image) {
				this._displacement.image = setting.image;
				this.setupDisplacementFilters(setting);
			} else if (this._displacement.filter) {
				this._updateDisplacemenFilters(setting);
			}
		} else if (this._displacement.filter) {
			ths.removeDisplacementFilter();
		}
	};
	Scene_Map.prototype._updateDisplacemenFilters = function (setting) {
		var displacement = this._displacement;
		var filter = displacement.filter;
		filter.maskSprite.x += setting.sx;
		filter.maskSprite.y += setting.sy;

		var dx = $gameMap.displayX();
		if (displacement.dx !== dx) {
			filter.maskSprite.x += (displacement.dx - dx) * 48;
			displacement.dx = dx;
		}
		var dy = $gameMap.displayY();
		if (displacement.dy !== dy) {
			filter.maskSprite.y += (displacement.dy - dy) * 48;
			displacement.dy = dy;
		}


		if (this._displacement.scale !== setting.scale) {
			this._displacement.scale = setting.scale;
			filter.scale = new PIXI.Point(setting.scale, setting.scale);
		}
	};

	Scene_Map.prototype.setupDisplacementFilters = function (setting) {
		if (!this._displacement.filter) {
			this.createDisplacementFilter(setting);
		}
		var bitmap = ImageManager.loadSystem(setting.image);
		bitmap.addLoadListener(function (bitmap) {
			bitmap.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
		});

		this._displacement.filter.maskSprite.bitmap = bitmap;

		this._displacement.scale = setting.scale;
		this._displacement.filter.scale = new PIXI.Point(setting.scale, setting.scale);
	};

	Scene_Map.prototype.createDisplacementFilter = function (setting) {
		var sprite = new Sprite();
		var filter = new PIXI.filters.DisplacementFilter(sprite);
		this.addChild(sprite);
		this._displacement.filter = filter;

		var allFilters = this._spriteset.filters || [];
		allFilters.push(filter);
		this._spriteset.filters = allFilters;
	};

	Scene_Map.prototype.removeDisplacementFilter = function () {
		var allFilters = this._spriteset.filters;
		var filter = this._displacement.filter;
		var index = allFilters ? allFilters.indexOf(filter) : -1;
		if (index >= 0) {
			allFilters.splice(index, 1);
		}
		this._spriteset.filters = allFilters;

		if (filter.maskSprite.parent) {
			filter.maskSprite.parent.removeChild(filter.maskSprite);
		}

		this.clearDisplacement();

	};






})();