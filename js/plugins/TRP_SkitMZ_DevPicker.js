//=============================================================================
// TRP_SkitMZ_DevPicker.js
//=============================================================================
// Copyright (c) 2020 Thirop
//=============================================================================

/*:
 * @target MZ
 * @author Thirop
 * @plugindesc 多層レイヤー使用時の表情データ作成
 * @help
 * 開発用の表情ピッカーを呼び出すためのプラグインです。
 * 「多層レイヤー」形式でのみ使用可能です。
 *
 * 
 * 【更新履歴】
 * 1.09 2021/12/5  コマンドパラメータ名修正、ほか不具合修正
 * 1.02 2021/6/21  サムネール調整時に範囲変更ができない不具合修正
 * 1.01 2020/11/28 リスト画像書き出し失敗の不具合修正
 * 1.00 2020/11/10 初版
 *
 * @param defaultThumbWidth
 * @text サムネール幅
 * @desc 表情サムネールのデフォルト横幅
 * @default 116
 * @type Number
 *
 * @param defaultThumbHeight
 * @text サムネール高さ
 * @desc 表情サムネールのデフォルト縦幅
 * @default 116
 * @type Number
 *
 * @param printCols
 * @text リスト画像列数
 * @desc 表情リスト画像に並べる列の数
 * @default 10
 * @type Number
 *
 * @param printFooterHeight
 * @text リスト画像フッター高さ
 * @desc 表情リスト画像の表情IDを表示するフッターの高さ
 * @default 20
 * @type Number
 *
 * @param printFooterColor
 * @text リスト画像フッター色
 * @desc 表情リスト画像のフッターの背景色。デフォルト値はrgb(100,255,255)
 * @default rgb(100,255,255)
 * @type Number
 *
 * 
 * @command picker
 * @text ピッカー呼び出し
 * @desc 表情ピッカーの呼び出し
 *
 * @arg charaName
 * @text キャラのフォルダ名
 * @desc キャラのフォルダ名
 *
 * @arg poseName
 * @text ポーズ名
 * @desc ポーズ名
 * @default normal
 *
 * @arg addFlag
 * @text 追加モード
 * @desc ON/trueにするとデータの追加モードで起動
 * @type boolean
 * @default false
 */
//============================================================================= 




function TRP_SkitDevPicker() { };
TRP_SkitDevPicker.DIR_PATH = Skit.DATA_DIR_PATH;
TRP_SkitDevPicker.FILE_PATH = TRP_SkitDevPicker.DIR_PATH + '/TRPSkitDevPickerData.json';


(function () {
	"use strict";
	if (!Utils.isNwjs() || !Utils.isOptionValid('test')) {
		return;
	}

	var pluginName = 'TRP_SkitMZ_DevPicker';

	PluginManager.registerCommand(pluginName, "picker", function (args) {
		if (!TRP_CORE.skitParameters.useMultiLayer) {
			SoundManager.playBuzzer();
			return;
		}
		TRP_SkitDevPicker.startPickExp(args.charaName, args.poseName, args.addFlag === 'true' || args.addFlag === true);
		this.setWaitMode('skit');
	});



	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);

	var dirPath = path.join(base, TRP_SkitDevPicker.DIR_PATH);
	StorageManager.fsMkdir(dirPath);

	var filePath = path.join(base, TRP_SkitDevPicker.FILE_PATH);
	if (!fs.existsSync(filePath)) {
		var file = '{}';
		fs.writeFileSync(filePath, file);
	}

	filePath = path.join(base, Skit.EXP_FILE_PATH);
	if (!fs.existsSync(filePath)) {
		var file = '{}';
		fs.writeFileSync(filePath, file);
	}

	DataManager._databaseFiles.push({
		name: '$dataTrpSkitDev',
		src: '../' + TRP_SkitDevPicker.FILE_PATH
	});


	var _DataManager_loadDataFile = DataManager.loadDataFile;
	DataManager.loadDataFile = function (name, src) {
		if (name === '$dataTrpSkitDev') {
			src = src.replace('Test_', '');
		}
		_DataManager_loadDataFile.call(this, name, src);
	};

})();




(function () {
	'use strict';

	if (!Utils.isNwjs() || !Utils.isOptionValid('test')) {
		return;
	}

	var parameters = null;
	var pluginName = 'TRP_SkitMZ_DevPicker';

	var backspaceKey = Input.keyMapper[8] || 'backspace';
	Input.keyMapper[8] = backspaceKey;

	var blinkKey = Input.keyMapper[66] || 'b';
	Input.keyMapper[66] = blinkKey;//B

	var displayKey = Input.keyMapper[68] || 'd';
	Input.keyMapper[68] = displayKey;//D

	var guideKey = Input.keyMapper[71] || 'g';
	Input.keyMapper[71] = guideKey;//G

	var imageKey = Input.keyMapper[73] || 'i';
	Input.keyMapper[73] = imageKey;//I

	var lipSyncKey = Input.keyMapper[76] || 'l';
	Input.keyMapper[76] = lipSyncKey;//L

	var printKey = Input.keyMapper[80] || 'p';
	Input.keyMapper[80] = printKey;//P

	var reloadKey = Input.keyMapper[82] || 'r';
	Input.keyMapper[82] = reloadKey;//R

	var saveKey = Input.keyMapper[83] || 's';
	Input.keyMapper[83] = saveKey;//S




	//=============================================================================
	// Scenes
	//=============================================================================
	var _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function () {
		TRP_SkitDevPicker.setup();

		_Scene_Boot_start.call(this);
	};


	//=============================================================================
	// Skit
	//=============================================================================
	var _Skit__processCommand = Skit.prototype._processCommand;
	Skit.prototype._processCommand = function (args, macroPos) {
		var skitCommand = args[0].toLowerCase();
		switch (skitCommand) {
			case 'pickexp':
			case '表情ピッカー':
				TRP_SkitDevPicker.startPickExp(args[1], args[2], args[3] === 'true' || args[3] === 't');
				break;
		}
		_Skit__processCommand.call(this, args, macroPos);
	};

	var _Skit_isBusy = Skit.prototype.isBusy;
	Skit.prototype.isBusy = function () {
		if (_Skit_isBusy.call(this)) return true;
		if (TRP_SkitDevPicker.isBusy()) return true;
		return false;
	};

	//=============================================================================
	// TRP_SkitDevPicker
	//=============================================================================
	TRP_SkitDevPicker._expPicker = null;
	TRP_SkitDevPicker.setup = function () {
		parameters = JSON.parse(JSON.stringify(PluginManager.parameters(pluginName), function (key, value) {
			try {
				return JSON.parse(value);
			} catch (e) {
				try {
					if (value[0] === '[' || value[0] === '{') {
						if (value.contains(' ')) {
							return value;
						}
						return eval(value);
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
	};

	TRP_SkitDevPicker.isBusy = function () {
		return this._expPicker;
	};


	/* config data
	===================================*/
	TRP_SkitDevPicker.prepareDevActor = function (name) {
		if ($dataTrpSkitDev[name]) return;
		$dataTrpSkitDev[name] = {
			poses: {},
		};
	};
	TRP_SkitDevPicker.prepareDevPose = function (name, pose) {
		this.prepareDevActor(name);
		var actorData = $dataTrpSkitDev[name];
		if (actorData.poses[pose]) return;

		actorData.poses[pose] = {
			expressions: [],
			thumbnail: [
				0,
				0,
				parameters.defaultThumbWidth || 116,
				parameters.defaultThumbHeight || 116,
				1
			]
		}
	};
	TRP_SkitDevPicker.loadDevPoseData = function (name, pose) {
		this.prepareDevPose(name, pose);
		return JsonEx.makeDeepCopy($dataTrpSkitDev[name].poses[pose]);
	};
	TRP_SkitDevPicker.savePoseDevData = function (name, pose, data) {
		this.prepareDevPose(name, pose);
		$dataTrpSkitDev[name].poses[pose] = data;
		this.writeDevSaveData();
	};
	TRP_SkitDevPicker.writeDevSaveData = function () {
		var file = JSON.stringify($dataTrpSkitDev);

		var fs = require('fs');
		var path = require('path');
		var base = path.dirname(process.mainModule.filename);
		var filePath = path.join(base, TRP_SkitDevPicker.FILE_PATH);
		fs.writeFileSync(filePath, file);
	};


	/* expData
	===================================*/
	TRP_SkitDevPicker.prepareActor = function (name) {
		if ($dataTrpSkit[name]) return;
		$dataTrpSkit[name] = {
			poses: {}
		};
	};
	TRP_SkitDevPicker.preparePose = function (name, pose) {
		this.prepareActor(name);
		var actorData = $dataTrpSkit[name];
		if (actorData.poses[pose]) return;

		actorData.poses[pose] = {
			expressions: [],

			blinkKind: -1,
			blinkIds: null,

			lipSyncKind: -1,
			lipSyncIds: null,
		}
	};
	TRP_SkitDevPicker.loadPoseData = function (name, pose) {
		this.preparePose(name, pose);
		return JsonEx.makeDeepCopy($dataTrpSkit[name].poses[pose]);
	};
	TRP_SkitDevPicker.savePoseData = function (name, pose, data) {
		this.preparePose(name, pose);
		$dataTrpSkit[name].poses[pose] = data;

		this.writeSaveData();
	};
	TRP_SkitDevPicker.writeSaveData = function () {
		var file = JSON.stringify($dataTrpSkit);

		var fs = require('fs');
		var path = require('path');
		var base = path.dirname(process.mainModule.filename);
		var filePath = path.join(base, Skit.EXP_FILE_PATH);
		fs.writeFileSync(filePath, file);
	};



	/* exp picker
	===================================*/
	TRP_SkitDevPicker.startPickExp = function (actorName, pose = 'normal', addFlag = false) {
		if (this._expPicker) {
			SceneManager._scene.removeChild(this._expPicker);
			this._expPicker = null;
		}

		this.prepareDevPose(actorName, pose);
		var picker = new TRP_SkitExpPicker(actorName, pose, addFlag);

		this._expPicker = picker;
		SceneManager._scene.addChild(picker);
	};

	TRP_SkitDevPicker.quitPicker = function (picker) {
		SceneManager._scene.removeChild(picker);

		Input.clear();

		if (this._expPicker !== picker) return;
		this._expPicker = null;

		$gameMap._interpreter._waitMode = '';
	}



	//=============================================================================
	// TRP_SkitExpPicker
	//=============================================================================
	function TRP_SkitExpPicker() {
		this.initialize.apply(this, arguments);
		this.setup();
	};

	TRP_SkitExpPicker.prototype = Object.create(PIXI.Container.prototype);
	TRP_SkitExpPicker.prototype.constructor = TRP_SkitExpPicker;
	TRP_SkitExpPicker.prototype.initialize = function (name, pose = 'normal', addFlag = false) {
		PIXI.Container.call(this);
		this.width = Graphics.width;
		this.height = Graphics.height;
		Input.clear();

		this.initMembers();

		this._name = name;
		this._pose = pose;
		this._addMode = addFlag;

		this._baseBitmap = ImageManager.loadBust(this._name, this._pose);
		this._baseBitmap.smooth = true;

		this._guideSprite = new GuideSprite();
		this.addChild(this._guideSprite);

		if (this.needsNaviSprite()) {
			this.createNaviSprite();
		}

		this.registerWheelListener();
	};

	TRP_SkitExpPicker.prototype.needsNaviSprite = function () {
		return true;
	};
	TRP_SkitExpPicker.prototype.createNaviSprite = function () {
		var fontSize = 24;
		var width = 104;
		var bitmap = new Bitmap(width, 2 * fontSize + 4);
		var sprite = new Sprite(bitmap);
		this.addChild(sprite);

		bitmap.fillAll('rgb(0,0,0,0.5)');
		sprite.anchor.set(1, 0);
		sprite.x = Graphics.width;
		this._naviSprite = sprite;

		var bitmap = new Bitmap(width, 2 * fontSize + 4);
		bitmap.fontSize = fontSize;
		bitmap.outlineWidth = 4;
		bitmap.textColor = 'white'
		bitmap.outlineColor = 'black';
		var sprite = new Sprite(bitmap);
		sprite.anchor.set(1, 0);
		this._naviSprite.addChild(sprite);
		this._naviContentsSprite = sprite;
	};


	TRP_SkitExpPicker.prototype.setup = function () {
		this.initGuide();
		this._baseBitmap.addLoadListener(this.didLoadBitmap.bind(this));
	};

	TRP_SkitExpPicker.prototype.initGuide = function () {
		this.showGuide(TRP_SkitExpPicker.GUIDE);
	};

	TRP_SkitExpPicker.GUIDE = [
		'クリック：選択',
		'←/→：ページ移動',
		'R：選択データのみ表示',
		'BackSpace：すべてクリア',
		null,
		'S：保存',
		'D：サムネイル調整',
		'I：リスト画像作成',
		'P：二層レイヤー書き出し',
		'B：まばたき設定',
		'L：口ぱく設定',
		null,
		'G：ガイドを隠す'
	];


	TRP_SkitExpPicker.prototype.didLoadBitmap = function (bitmap) {
		this._initialized = true;
		this.visible = true;

		var data = TRP_SkitDevPicker.loadDevPoseData(this._name, this._pose);
		var poseData = TRP_SkitDevPicker.loadPoseData(this._name, this._pose);
		this._poseDevData = data;
		this._poseData = poseData;

		this._savedExpressions = poseData.expressions.concat();

		var thumb = data.thumbnail;

		this.readPartsVariations();
		this.setupData();

		this.createBackSprite();
		this.createMatrixSprite();

		this._thumbScale = thumb[4];
		this._thumbX = thumb[0];
		this._thumbY = thumb[1];
		this._thumbW = thumb[2];
		this._thumbH = thumb[3];
		this.refreshLayout();
	};

	TRP_SkitExpPicker.prototype.processDevSave = function () {
		SoundManager.playSave();
		TRP_SkitDevPicker.savePoseDevData(this._name, this._pose, this._poseDevData);
		this.showInfo(TRP_SkitExpPicker.DEV_SAVE_INFO);
	};

	TRP_SkitExpPicker.prototype.processSave = function () {
		this._poseData.expressions = this.processExpressionData();

		SoundManager.playSave();
		TRP_SkitDevPicker.savePoseData(this._name, this._pose, this._poseData);
		this.showInfo(TRP_SkitExpPicker.SAVE_INFO);
	};

	TRP_SkitExpPicker.DEV_SAVE_INFO = [
		'ピッカー用の設定を保存しました。'
	];
	TRP_SkitExpPicker.SAVE_INFO = [
		'編集データを保存しました。'
	];


	TRP_SkitExpPicker.prototype.startPrintDoubleLayer = function () {
		if (this._selectedIndexes.length === 0) {
			SoundManager.playBuzzer();
			return;
		}

		SoundManager.playSave();
		this.printDoubleLayers();
	};
	TRP_SkitExpPicker.PRINT_DOUBLE_LEYAERS = [
		'2層レイヤー方式の画像を「_exportフォルダ」に',
		'保存しました。',
	];



	TRP_SkitExpPicker.prototype.processPrintList = function () {
		if (this._selectedIndexes.length === 0) {
			SoundManager.playBuzzer();
			return;
		}

		SoundManager.playSave();
		this.printThumbnails();

		this.showInfo(TRP_SkitExpPicker.PRINT_INFO);
	};
	TRP_SkitExpPicker.PRINT_INFO = [
		'表情サムネールリスト画像を「_exportフォルダ」に',
		'保存しました。',
	];



	TRP_SkitExpPicker.MIN_SIZE = 48;
	TRP_SkitExpPicker.prototype.refreshLayout = function () {
		this.clampSize();

		this._cols = Math.floor(Graphics.width / this._thumbW);
		this._rows = Math.floor(Graphics.height / this._thumbH);
		this._dispNum = this._cols * this._rows;
		this._maxPage = Math.ceil(this._data.length / this._dispNum) - 1;

		this.refreshSprites();

		this.setupPage();
		this.addChild(this._guideSprite);
	};


	TRP_SkitExpPicker.prototype.initMembers = function () {
		this._initialized = false;

		this._name = '';
		this._pose = '';
		this._poseDevData = null;
		this._poseData = null;
		this._savedExpressions = null;

		this._thumbX = 0;
		this._thumbY = 0;
		this._thumbW = 0;
		this._thumbH = 0;
		this._thumbScale = 1;

		this._cols = 0;
		this._rows = 0;
		this._dispNum = 0;
		this._partsNum = 0;
		this._partsNums = [];
		this._partsOptionFlags = [];

		this._printingParts = 0;

		this._selectedIndexes = [];
		this._data = [];
		this._page = 0;
		this._maxPage = 0;

		this._baseBitmap = null;

		this._displaySettging = null;

		this._sprites = [];
		this._selectBitmap = null;
		this._selectSprites = [];
		this._selectSpritesCache = [];
		this._selectSpritesIndexMap = [];

		this._backSprite = null;
		this._matrixSprite = null;
		this._naviSprite = null;
		this._guideSprite = null;

		this._wheelListener = null;
	};


	TRP_SkitExpPicker.prototype.readPartsVariations = function () {
		var actorName = this._name;
		var pose = this._pose + '_';
		var poseLen = pose.length;


		var fs = require('fs');
		var path = require('path');
		var base = path.dirname(process.mainModule.filename);
		var dirPath = path.join(base, 'img/pictures/busts/' + this._name);

		var data = [];
		var optFlags = [];

		var files = fs.readdirSync(dirPath)
		var length = files.length;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			var file = files[i];

			var fp = path.join(dirPath, file);
			if (!fs.statSync(fp).isFile()) continue;

			if (file.indexOf(pose) !== 0) continue;
			if (!(/.*\.png$/.test(file))) continue;

			file = file.substring(poseLen)
			file = file.replace('.png', '');

			var elems = file.split('_');
			var partsKind = Number(elems[0]) - 1;
			var partsId = Number(elems[1]);
			data[partsKind] = Math.max((data[partsKind] || 0), partsId);

			if (partsId === 0) {
				optFlags[partsKind] = false;
			}
		}

		for (var i = 0; i < data.length; i = (i + 1) | 0) {
			if (optFlags[i] === undefined) {
				optFlags[i] = true;
			}
		}

		this._partsNum = data.length;
		this._partsNums = data;
		this._partsOptionFlags = optFlags;

	};

	TRP_SkitExpPicker.prototype.createBackSprite = function () {
		//back sprite
		var sprite = new Sprite();
		this.addChild(sprite);
		this._backSprite = sprite;
		sprite.bitmap = new Bitmap(256, 256);
		sprite.bitmap.fillAll('white');
		sprite.scale.set(Graphics.width / 256, Graphics.height / 256);
	};

	TRP_SkitExpPicker.prototype.createMatrixSprite = function () {
		var bitmap = new Bitmap(Graphics.width, Graphics.height);
		var sprite = new Sprite(bitmap);
		this._matrixSprite = sprite;
		this.addChild(sprite);
	};


	TRP_SkitExpPicker.prototype.refreshSprites = function () {
		var numInPage = this._dispNum;
		var w = this._thumbW;
		var h = this._thumbH;
		var cols = this._cols;
		var rows = this._rows;
		var childNum = this._partsNum;
		var spriteLen = this._sprites.length;
		for (var i = 0; i < numInPage; i = (i + 1) | 0) {
			var sprite = this._sprites[i];
			if (!sprite) {
				sprite = new Sprite();
				this.addChild(sprite);
				this._sprites.push(sprite);

				for (var j = 0; j < childNum; j = (j + 1) | 0) {
					sprite.addChild(new Sprite());
				}
			}
			sprite.visible = true;

			var col = i % cols;
			var row = Math.floor(i / cols);
			sprite.x = col * w;
			sprite.y = row * h;
		}
		for (; i < spriteLen; i = (i + 1) | 0) {
			this._sprites[i].visible = false;
		}

		this.refreshMatrixSprite(cols, rows, w, h);
		this.refreshSelectionBitmap(w, h);
	};

	TRP_SkitExpPicker.prototype.refreshMatrixSprite = function (cols, rows, w, h) {
		var sprite = this._matrixSprite;
		var bitmap = sprite.bitmap;
		this.addChild(sprite);

		bitmap.clear();

		var ctx = bitmap._context;
		ctx.save();
		ctx.beginPath();
		for (var c = 0; c < cols + 1; c = (c + 1) | 0) {
			var x = c * w;
			ctx.moveTo(x, 0);
			ctx.lineTo(x, Graphics.height);
		}
		for (var r = 0; r < rows + 1; r = (r + 1) | 0) {
			var y = r * h;
			ctx.moveTo(0, y);
			ctx.lineTo(Graphics.width, y);
		}
		ctx.strokeStyle = 'black';
		ctx.globalAlpha = 1;
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.fillStyle = 'black';
		ctx.moveTo(cols * w, 0);
		ctx.lineTo(Graphics.width, 0);
		ctx.lineTo(Graphics.width, Graphics.height);
		ctx.lineTo(0, Graphics.height);
		ctx.lineTo(0, rows * h);
		ctx.lineTo(cols * w, rows * h);
		ctx.lineTo(cols * w, 0);
		ctx.fill();
		ctx.restore();
		bitmap._baseTexture.update();
	};

	TRP_SkitExpPicker.prototype.refreshSelectionBitmap = function (w, h) {
		var bitmap = this._selectBitmap;
		var size = bitmap ? bitmap.width : 256;
		while (w > size || h > size) {
			size *= 2;
		}

		var sizeChanged = bitmap && bitmap.width !== size;
		if (!bitmap || sizeChanged) {
			bitmap = new Bitmap(size, size)
		} else {
			bitmap.clear();
		}

		var lineWidth = 4;
		var m = 1;
		bitmap.fillRect(m, m, w - 2 * m, h - 2 * m, this._addMode ? 'blue' : 'red');
		bitmap.clearRect(m + lineWidth, m + lineWidth, w - 2 * m - 2 * lineWidth, h - 2 * m - 2 * lineWidth);
		this._selectBitmap = bitmap;

		if (sizeChanged) {
			for (var sprite of this._selectSpritesCache) {
				sprite.bitmap = bitmap;
				sprite.setFrame(0, 0, w, h);
			}
		}
	};


	/* page
	===================================*/
	TRP_SkitExpPicker.prototype.registerWheelListener = function () {
		var listener = this._onWheel.bind(this);
		this._wheelListener = listener;
		document.addEventListener('wheel', listener);
	};
	TRP_SkitExpPicker.prototype.resignWheelListener = function () {
		if (!this._wheelListener) return;

		document.removeEventListener('wheel', this._wheelListener);
		this._wheelListener = null;
	};

	TRP_SkitExpPicker.WHEEL_DELTA = 4;
	TRP_SkitExpPicker.prototype._onWheel = function (event) {
		if (!this.visible) return;

		if (event.deltaY > TRP_SkitExpPicker.WHEEL_DELTA) {
			this.proceedPage();
		} else if (event.deltaY < -TRP_SkitExpPicker.WHEEL_DELTA) {
			this.regressPage();
		}
		event.stopPropagation();
	};
	TRP_SkitExpPicker.prototype.proceedPage = function () {
		if (Input.isPressed('shift')) {
			this._page += 100;
		} else {
			this._page += 1;
		}
		if (this._page > this._maxPage) {
			this._page = this._maxPage;
			SoundManager.playBuzzer();
			return;
		}
		this.setupPage();
	};
	TRP_SkitExpPicker.prototype.regressPage = function () {
		if (Input.isPressed('shift')) {
			this._page -= 100;
		} else {
			this._page -= 1;
		}
		if (this._page < 0) {
			this._page = 0;
			SoundManager.playBuzzer();
			return;
		}
		this.setupPage();
	};

	TRP_SkitExpPicker.prototype.clear = function () {
		this.setupData(true);
		this.setupPage()
	};




	/* update
	===================================*/
	TRP_SkitExpPicker.prototype.update = function () {
		if (!this.visible || !this._initialized) return;
		if (this._printingParts > 0) return;

		var children = this.children;
		var length = children.length;
		for (var i = length - 1; i >= 0; i = (i - 1) | 0) {
			var child = children[i];
			if (child && child.update) child.update();
		}

		if (this._subPicker) {
			if (this._subPicker.isTerminated()) {
				this.finishSubPikcer();
			}
		} else if (this._displaySettging) {
			this.updateDisplaySettingMode();
		} else {
			this.updateMain();
		}
	};

	TRP_SkitExpPicker.prototype.finishSubPikcer = function () {
		var poseData = this._poseData;
		if (this._subPicker.processSave(poseData)) {
			var name = this._subPicker.pickerName();
			this.showInfo([
				name + TRP_SkitExpPicker.SUB_PICKER_COMPLETE_INFO_TEXT,
				TRP_SkitExpPicker.SUB_PICKER_COMPLETE_INFO_TEXT2
			]);
		}

		this.removeChild(this._subPicker);
		this._subPicker = null;
	};
	TRP_SkitExpPicker.SUB_PICKER_COMPLETE_INFO_TEXT = 'の設定が完了しました。';
	TRP_SkitExpPicker.SUB_PICKER_COMPLETE_INFO_TEXT2 = 'Sキーで保存時に設定内容を保存します。';

	TRP_SkitExpPicker.prototype.updateMain = function () {
		if (Input._latestButton) {
			this.updateInput();
		} else if (TouchInput.isCancelled()) {
			this.proceedPage();
		}

		if (TouchInput.isTriggered()) {
			this.trySelect();
		}

		if (this._naviSprite.opacity > 0) {
			this._naviSprite.opacity -= 2;
			if (this._naviSprite.opacity < 230) {
				this._naviSprite.opacity -= 5;
			}
		}
	};

	TRP_SkitExpPicker.prototype.updateInput = function () {
		if (Input.isTriggered('left')) {
			this.regressPage();
		} else if (Input.isTriggered('right')) {
			this.proceedPage();
		} else if (Input.isTriggered('ok')) {
			this.processOk();
		} else if (Input.isTriggered('cancel')) {
			this.processQuit();
		} else if (Input.isTriggered(backspaceKey)) {
			this.processCancel();
		} else {
			this.updateExInput();
		}
	};

	TRP_SkitExpPicker.prototype.updateExInput = function () {
		if (Input.isTriggered(reloadKey)) {
			this.trimData();
		} else if (Input.isTriggered(saveKey)) {
			this.processSave();
		} else if (Input.isTriggered(displayKey)) {
			SoundManager.playCursor();
			this.startDisplaySetting();
		} else if (Input.isTriggered(blinkKey)) {
			SoundManager.playCursor();
			this.startBlinkPicker();
		} else if (Input.isTriggered(imageKey)) {
			this.processPrintList();
		} else if (Input.isTriggered(printKey)) {
			this.startPrintDoubleLayer();
		} else if (Input.isTriggered(lipSyncKey)) {
			SoundManager.playCursor();
			this.startLipSyncPicker();
		}
	};

	TRP_SkitExpPicker.prototype.processOk = function () {
		this.proceedPage();
	};

	TRP_SkitExpPicker.prototype.processCancel = function () {
		SoundManager.playCancel();
		this.clear();
	};



	/* trim
	===================================*/
	TRP_SkitExpPicker.prototype.trimData = function () {
		if (this._selectedIndexes.length === 0) {
			SoundManager.playBuzzer();
			return;
		}

		var data = this._data = this._data.concat();
		var length = data.length;
		var trimNum = 0;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			if (this._selectedIndexes.contains(i + trimNum)) {
				var idx = this._selectedIndexes.indexOf(i + trimNum);
				this._selectedIndexes[idx] = i;
				continue;
			}

			data.splice(i, 1);
			trimNum += 1;
			i -= 1;
			length -= 1;
		}

		this._page = 0;
		this._maxPage = Math.ceil(this._data.length / this._dispNum) - 1;

		this.setupPage();
	};


	/* save
	===================================*/
	TRP_SkitExpPicker.prototype.processExpressionData = function () {
		var expressions = this._addMode ? this._savedExpressions.concat() : [];

		var selected = this._selectedIndexes;
		selected.sort((a, b) => { return a - b });

		var length = selected.length;
		var str = '[';
		for (var i = 0; i < length; i = (i + 1) | 0) {
			var idx = selected[i];
			expressions.push(this._data[idx]);
		}

		var length = expressions.length;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			var data = expressions[i];
			if (i > 0) {
				str += ',';
			}
			str += '"' + String(data).replace(/,/gi, ' ') + '"';
		}
		str += ']';
		this.copyToClipboard(str);

		return expressions;
	};

	TRP_SkitExpPicker.prototype.copyToClipboard = function (string) {
		var listener = function (e) {
			e.clipboardData.setData("text/plain", string);
			e.preventDefault();
			document.removeEventListener("copy", listener);
		}
		document.addEventListener("copy", listener);
		document.execCommand('copy');
	};



	/* setup
	===================================*/
	TRP_SkitExpPicker.prototype.setupData = function (noLoad) {
		this._data.length = 0;
		this._selectedIndexes.length = 0;

		var maxParts = this._partsNums;
		var typeLen = maxParts.length;
		var options = this._partsOptionFlags;

		var idxes = [];
		for (var i = 0; i < typeLen; i = (i + 1) | 0) {
			idxes.push(options[i] ? -1 : 0)
		}

		var savedExps = this._savedExpressions;
		var savedExpLen = savedExps.length;
		while (!maxParts.equals(idxes)) {
			if (!this._addMode) {
				this._data.push(idxes.concat());
			} else {
				if (!this._savedExpressions.some(function (exp) {
					return exp.equals(idxes);
				})) {
					this._data.push(idxes.concat());
				}
			}

			if (typeLen >= 2) {
				idxes[1] += 1;
				if (options[1] && idxes[1] === 0) {
					idxes[1] = 1;
				}
			} else {
				idxes[0] += 1;
			}

			for (var i = 0; i < typeLen + 1; i = (i + 1) | 0) {
				if (idxes[i] > maxParts[i]) {
					idxes[i] = options[i] ? -1 : 0;
					if (i === typeLen - 1) {
						idxes[0] += 1;
						if (idxes[0] <= 0) idxes[0] = 1;
					} else {
						idxes[i + 1] += 1;
						if (idxes[i + 1] <= 0) idxes[i + 1] = 1;
					}
				}
			}
		};
		this._data.push(idxes);


		var saveData = this._poseData.expressions;
		if (!noLoad && saveData) {
			var length = this._data.length;
			var saveLen = saveData.length;
			for (var i = 0; i < length; i = (i + 1) | 0) {
				var data = this._data[i];
				for (var j = 0; j < saveLen; j = (j + 1) | 0) {
					if (data.equals(saveData[j])) {
						this._selectedIndexes.push(i);
						saveData.splice(j, 1);
						j -= 1;
						saveLen -= 1;
						break;
					}
				};
				if (saveLen <= 0) break;
			}
		}
	};

	TRP_SkitExpPicker.prototype.setupPage = function () {
		//invisible selectSprite
		var length = this._selectSprites.length;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			this._selectSprites[i].visible = false;
			this._selectSpritesCache.push(this._selectSprites[i]);
		}
		this._selectSprites.length = 0;
		this._selectSpritesIndexMap.length = 0;

		//setup main sprite
		this.setupSkitSprites();


		this.refreshSelectedNumNavi(true);
	};

	TRP_SkitExpPicker.prototype.clampSize = function () {
		var minSize = TRP_SkitExpPicker.MIN_SIZE;
		this._thumbW = this._thumbW.clamp(minSize, this._baseBitmap.width);
		this._thumbH = this._thumbH.clamp(minSize, this._baseBitmap.height);

		this._thumbX = this._thumbX.clamp(0, this._baseBitmap.width - this._thumbW);
		this._thumbY = this._thumbY.clamp(0, this._baseBitmap.height - this._thumbH);


	};

	TRP_SkitExpPicker.prototype.setupSkitSprites = function () {
		var index = this._page;
		var numInPage = this._dispNum;
		this.clampSize();

		for (var i = 0; i < numInPage; i = (i + 1) | 0) {
			var idx = index * numInPage + i;
			var data = this._data[idx];
			var sprite = this._sprites[i];
			if (!data) {
				sprite.visible = false;
			} else {
				sprite.visible = true;
				this.setupSprite(sprite, data);
			}
			if (this._selectedIndexes.contains(idx)) {
				this.showSelectSprite(i)
			}
		}
	};

	TRP_SkitExpPicker.prototype.setupSprite = function (sprite, data) {
		sprite.bitmap = this._baseBitmap;

		var cx = this._thumbX + this._thumbW / 2;
		var cy = this._thumbY + this._thumbH / 2;
		var sw = Math.floor(this._thumbW / this._thumbScale * 2) / 2;
		var sh = Math.floor(this._thumbH / this._thumbScale * 2) / 2;
		var sx = cx - sw / 2;
		var sy = cy - sh / 2;

		if (sx < 0) {
			this._thumbX = -this._thumbW / 2 + sw / 2;
			sx = 0;
		}
		if (sy < 0) {
			this._thumbY = -this._thumbH / 2 + sh / 2;
			sy = 0;
		}


		sprite.scale.set(this._thumbScale, this._thumbScale);
		sprite.setFrame(sx, sy, sw, sh);

		var length = data.length;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			var partsId = data[i];
			var partsSprite = sprite.children[i];
			if (partsId < 0) {
				partsSprite.visible = false;
				continue;
			}

			partsSprite.visible = true;
			partsSprite.bitmap = ImageManager.loadBust(this._name, this._pose + '_' + (i + 1) + '_' + partsId);
			partsSprite.bitmap.smooth = true;
			partsSprite.setFrame(sx, sy, sw, sh);
		}
	};


	/* selection
	===================================*/
	TRP_SkitExpPicker.prototype.trySelect = function () {
		var x = TouchInput.x;
		var y = TouchInput.y;
		var col = Math.floor(x / this._thumbW);
		var row = Math.floor(y / this._thumbH);
		if (col > this._cols || row > this._rows) return;

		var baseIdx = this._page * this._dispNum;
		var index = col + row * this._cols;
		var realIndex = baseIdx + index;

		if (realIndex >= this._data.length) {
			SoundManager.playBuzzer();
			return;
		}

		this.didSelect(index, realIndex);
	};

	TRP_SkitExpPicker.prototype.didSelect = function (index, realIndex) {
		if (this._selectedIndexes.contains(realIndex)) {
			this.hideSelectSprite(index);
			var idx = this._selectedIndexes.indexOf(realIndex);
			this._selectedIndexes.splice(idx, 1);
		} else {
			this.showSelectSprite(index);
			this._selectedIndexes.push(realIndex);
			this._selectedIndexes.sort((a, b) => { return a - b });
		}
		this.refreshSelectedNumNavi();
	};

	TRP_SkitExpPicker.prototype.showSelectSprite = function (index) {
		var col = index % this._cols;
		var row = Math.floor(index / this._cols);

		var sprite = this._selectSpritesCache.pop();
		if (!sprite) {
			sprite = new Sprite(this._selectBitmap);
			this.addChild(sprite);
		}
		sprite.x = col * this._thumbW;
		sprite.y = row * this._thumbH;
		sprite.setFrame(0, 0, this._thumbW, this._thumbH);
		sprite.visible = true;

		this._selectSprites.push(sprite);
		this._selectSpritesIndexMap.push(index);
	};
	TRP_SkitExpPicker.prototype.hideSelectSprite = function (index) {
		var sprIndex = this._selectSpritesIndexMap.indexOf(index);
		var sprite = this._selectSprites[sprIndex];

		this._selectSprites.splice(sprIndex, 1);

		this._selectSpritesIndexMap.splice(sprIndex, 1);
		this._selectSpritesCache.push(sprite);
		sprite.visible = false;
	};

	TRP_SkitExpPicker.prototype.refreshSelectedNumNavi = function (refreshPage = false) {
		if (!this._naviSprite) return;

		this._naviSprite.opacity = 255;
		this.addChild(this._naviSprite);

		var sprite = this._naviContentsSprite;
		var bitmap = sprite.bitmap;
		var text;
		if (refreshPage) {
			bitmap.clearRect(0, 0, bitmap.width, bitmap.height / 2);
			bitmap._baseTexture.update();
			text = this._page + '/' + this._maxPage;
			bitmap.drawText(text, 2, 0, bitmap.width - 4, bitmap.height / 2, 'right');
		}

		bitmap.clearRect(0, bitmap.height / 2, bitmap.width, bitmap.height / 2);

		text = '<';
		if (this._addMode) {
			text += this._savedExpressions.length + '+';
		}
		text += this._selectedIndexes.length + '>';
		bitmap.drawText(text, 2, bitmap.height / 2, bitmap.width - 4, bitmap.height / 2, 'right');
	};


	/* guide
	===================================*/
	TRP_SkitExpPicker.prototype.showGuide = function (guide, color) {
		this._guideSprite.setTexts(guide, color);
		this.addChild(this._guideSprite);
	};


	/* adjust display
	===================================*/
	TRP_SkitExpPicker.GUIDE_DISPLAY_SETTING = [
		'カーソル：移動',
		'shift+カーソル：移動(大)',
		'ctrl/opt+カーソル：サイズ変更',
		'Q/W：縮小・拡大',
		null,
		'Enter：保存',
		'Esc：キャンセル',
		null,
		'G：ガイドを隠す'
	];
	TRP_SkitExpPicker.prototype.startDisplaySetting = function () {
		this._displaySettging = [this._thumbX, this._thumbY, this._thumbW, this._thumbH, this._thumbScale];

		this.showGuide(TRP_SkitExpPicker.GUIDE_DISPLAY_SETTING, 'rgba(155,0,0,0.6)');
	};

	TRP_SkitExpPicker.prototype.cancelDisplaySettingMode = function () {
		this._thumbX = this._displaySettging[0];
		this._thumbY = this._displaySettging[1];
		this._thumbW = this._displaySettging[2];
		this._thumbH = this._displaySettging[3];
		this._thumbScale = this._displaySettging[4];
		this._displaySettging = null;

		this.refreshLayout();
		SoundManager.playCancel();

		this.showGuide(TRP_SkitExpPicker.GUIDE);
	};
	TRP_SkitExpPicker.prototype.finishDisplaySettingMode = function () {
		this._displaySettging = null;
		SoundManager.playOk();

		this._poseDevData.thumbnail = [
			this._thumbX,
			this._thumbY,
			this._thumbW,
			this._thumbH,
			this._thumbScale
		];

		this.processDevSave();

		this.showGuide(TRP_SkitExpPicker.GUIDE);
	};


	TRP_SkitExpPicker.prototype.updateDisplaySettingMode = function () {
		if (Input._latestButton) {
			if (Input.isTriggered('ok')) {
				this.finishDisplaySettingMode();
			} else if (Input.isTriggered('cancel')) {
				this.cancelDisplaySettingMode();
			} else if (Input.isRepeated('left')) {
				if (Input.isPressed('control')) {
					this.adjustSize(-1, 0);
				} else {
					this.movePosition(1, 0);
				}
			} else if (Input.isRepeated('right')) {
				if (Input.isPressed('control')) {
					this.adjustSize(1, 0);
				} else {
					this.movePosition(-1, 0);
				}
			} else if (Input.isRepeated('up')) {
				if (Input.isPressed('control')) {
					this.adjustSize(0, -1);
				} else {
					this.movePosition(0, 1);
				}
			} else if (Input.isRepeated('down')) {
				if (Input.isPressed('control')) {
					this.adjustSize(0, 1);
				} else {
					this.movePosition(0, -1);
				}
			} else if (Input.isRepeated('pageup')) {
				this.adjustScale(-0.1);
			} else if (Input.isRepeated('pagedown')) {
				this.adjustScale(0.1);
			}
		}
	};

	TRP_SkitExpPicker.prototype.movePosition = function (dx, dy, noRefresh = false) {
		if (Input.isPressed('shift')) {
			dx *= 10;
			dy *= 10;
		}
		this._thumbX = this._thumbX + dx;
		this._thumbY = this._thumbY + dy;
		if (!noRefresh) {
			this.setupSkitSprites();
		}
	};
	TRP_SkitExpPicker.prototype.adjustSize = function (dw, dh) {
		if (Input.isPressed('shift')) {
			dw *= 10;
			dh *= 10;
		}
		this._thumbW += dw;
		this._thumbH += dh;

		this.refreshLayout();
	};
	TRP_SkitExpPicker.prototype.adjustScale = function (delta) {
		if (Input.isPressed('shift')) {
			delta *= 2;
		}
		this._thumbScale = Math.max(0.1, this._thumbScale + delta);
		this.setupSkitSprites();
	};




	/* quit
	===================================*/
	TRP_SkitExpPicker.prototype.processQuit = function () {
		TRP_SkitDevPicker.quitPicker(this);
	};


	/* info
	===================================*/
	TRP_SkitExpPicker.prototype.showInfo = function (texts) {
		var sprite = new InfoSprite(texts);
		this.addChild(sprite);
	};

	/* pring double layer images
	===================================*/
	TRP_SkitExpPicker.prototype.printDoubleLayers = function () {
		var maxParts = this._partsNums;
		var options = this._partsOptionFlags;
		var num = 0;
		var length = maxParts.length;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			num += options[i] ? maxParts[i] : maxParts[i] + 1;
		};

		for (var i = 0; i < length; i = (i + 1) | 0) {
			var maxKindId = maxParts[i];
			var isOption = options[i];
			for (var j = isOption ? 1 : 0; j <= maxKindId; j = (j + 1) | 0) {
				var partsId = j;
				var src = ImageManager.loadBust(this._name, this._pose + '_' + (i + 1) + '_' + partsId);
				src.addLoadListener(function () {
					num -= 1;
					if (num === 0) {
						this._printDoubleLayers();
					}
				}.bind(this));
			}
		};
		this.showInfo(TRP_SkitExpPicker.PRINT_DOUBLE_LEYAERS);
	};

	TRP_SkitExpPicker.prototype._printDoubleLayers = function () {
		var data = this.processExpressionData();
		var options = this._partsOptionFlags;
		var width = this._baseBitmap.width;
		var height = this._baseBitmap.height;

		var length = data.length;
		var cols = parameters.printCols;
		var rows = Math.ceil(length / cols);

		var footerHeight = parameters.printFooterHeight;
		var footerColor = parameters.printFooterColor;
		var thumbX = this._thumbX;
		var thumbY = this._thumbY;
		var thumbW = this._thumbW;
		var thumbH = this._thumbH;

		var elemH = thumbH + footerHeight;


		for (var i = 0; i < length; i = (i + 1) | 0) {
			var bitmap = new Bitmap(width, height);

			// bitmap.blt(this._baseBitmap,0,0,width,height,0,0);

			var exp = data[i];
			var kindLen = exp.length;
			for (var j = 0; j < kindLen; j = (j + 1) | 0) {
				var partsId = exp[j];
				if (partsId < 0) {
					continue;
				}
				var src = ImageManager.loadBust(this._name, this._pose + '_' + (j + 1) + '_' + partsId);
				src.smooth = true;
				bitmap.blt(src, 0, 0, src.width, src.height, 0, 0);
			}

			var file = this._pose + '_' + (i === 0 ? 'default' : i) + '.png';

			var fs = require('fs');
			var dirPath = '_export';
			var path = require('path');
			var filePath = path.join(dirPath, file);
			var urlData = bitmap._canvas.toDataURL('image/png')

			var regex = (/^data:image\/png;base64,/);
			var base64Data = urlData.replace(regex, "");
			fs.writeFileSync(filePath, base64Data, 'base64');
		}
	};


	/* print list
	===================================*/
	TRP_SkitExpPicker.prototype.printThumbnails = function () {
		var data = this.processExpressionData();
		var length = data.length;
		var footerHeight = parameters.printFooterHeight;
		var footerColor = parameters.printFooterColor;
		var cols = parameters.printCols;
		var rows = Math.ceil(length / cols);

		var thumbX = this._thumbX;
		var thumbY = this._thumbY;
		var thumbW = this._thumbW;
		var thumbH = this._thumbH;

		var elemH = thumbH + footerHeight;
		var width = cols * thumbW;
		var height = rows * elemH;

		var bitmap = new Bitmap(width, height);
		bitmap.fontSize = footerHeight - 2;
		bitmap.textColor = 'black';
		bitmap.outlineWidth = 0;

		this._printingParts = 1;

		var m = 10;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			var col = i % cols;
			var row = Math.floor(i / cols);
			var x = col * thumbW;
			var y = row * elemH;
			this.drawThumbnail(bitmap, data[i], x, y);

			if (col === 0) {
				//draw footer background
				bitmap.fillRect(0, y + thumbH, width, footerHeight, footerColor);
			}
			bitmap.drawText(i, x + m, y + thumbH, thumbW - 2 * m, footerHeight)
		}

		this.didExceedPrintingParts(bitmap);
	};

	TRP_SkitExpPicker.prototype.drawThumbnail = function (bitmap, data, x, y) {
		var cx = this._thumbX + this._thumbW / 2;
		var cy = this._thumbY + this._thumbH / 2;
		var sw = Math.floor(this._thumbW / this._thumbScale * 2) / 2;
		var sh = Math.floor(this._thumbH / this._thumbScale * 2) / 2;
		var sx = cx - sw / 2;
		var sy = cy - sh / 2;

		if (sx < 0) sx = 0;
		if (sy < 0) sy = 0;

		var scale = this._thumbScale;
		var tw = sw * scale;
		var th = sh * scale;
		var tx = x;
		var ty = y;

		bitmap.blt(this._baseBitmap, sx, sy, sw, sh, tx, ty, tw, th);

		var length = data.length;
		var kinds = [];
		for (var i = 0; i < length; i = (i + 1) | 0) {
			var partsId = data[i];
			if (partsId < 0) {
				continue;
			}
			kinds.push(i);
		};
		for (var i = 0; i < length; i = (i + 1) | 0) {
			var partsId = data[i];
			if (partsId < 0) {
				continue;
			}

			var src = ImageManager.loadBust(this._name, this._pose + '_' + (i + 1) + '_' + partsId);
			src.smooth = true;
			this._printingParts += 1;
			src.addLoadListener(this._drawThumbnail.bind(this, data, kinds, i, bitmap, sx, sy, sw, sh, tx, ty, tw, th));
		}
	};
	TRP_SkitExpPicker.prototype._drawThumbnail = function (data, kinds, kind, bitmap, sx, sy, sw, sh, tx, ty, tw, th) {
		kinds.splice(kinds.indexOf(kind), 1);
		if (kinds.length === 0) {
			var length = data.length;
			for (var i = 0; i < length; i = (i + 1) | 0) {
				var partsId = data[i];
				if (partsId < 0) {
					continue;
				}

				var src = ImageManager.loadBust(this._name, this._pose + '_' + (i + 1) + '_' + partsId);
				bitmap.blt(src, sx, sy, sw, sh, tx, ty, tw, th);
				this.didExceedPrintingParts(bitmap);
			}
		}
	};

	TRP_SkitExpPicker.EXPORT_PATH = '_export/';
	TRP_SkitExpPicker.prototype.didExceedPrintingParts = function (bitmap) {
		this._printingParts -= 1;
		if (this._printingParts > 0) return;

		this._printingParts = 0;

		var name = 'thumbnail_' + this._name + '_' + this._pose + '.png';

		var dirPath = TRP_SkitExpPicker.EXPORT_PATH;
		StorageManager.fsMkdir(dirPath);

		var fs = require('fs');
		var path = require('path');
		var filePath = path.join(dirPath, name);
		var urlData = bitmap._canvas.toDataURL('image/png')

		var regex = (/^data:image\/png;base64,/);
		var base64Data = urlData.replace(regex, "");
		fs.writeFileSync(filePath, base64Data, 'base64');
	};


	/* blink picker
	===================================*/
	TRP_SkitExpPicker.prototype.startBlinkPicker = function () {
		this._subPicker = new BlinkPicker(this._name, this._pose);
		this.addChild(this._subPicker);
	};

	/* lipSync picker
	===================================*/
	TRP_SkitExpPicker.prototype.startLipSyncPicker = function () {
		this._subPicker = new LipSyncPicker(this._name, this._pose);
		this.addChild(this._subPicker);
	};




	//=============================================================================
	// InfoSprite
	//=============================================================================
	function InfoSprite() {
		this.initialize.apply(this, arguments);
	};
	InfoSprite.prototype = Object.create(Sprite.prototype);
	InfoSprite.prototype.constructor = InfoSprite;
	InfoSprite.prototype.initialize = function (texts) {
		Sprite.prototype.initialize.call(this);

		var width = Math.min(Graphics.width, 512);
		var lineHeight = 24;
		var length = texts.length;
		var height = lineHeight * length;

		var bitmap = new Bitmap(width, height);
		this.bitmap = bitmap;
		bitmap.fontSize = lineHeight - 6;
		bitmap.outlineColor = 'black';

		var x = 0;
		var margin = 30;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			var text = texts[i];
			var y = i * lineHeight;
			var tWidth = bitmap.measureTextWidth(text);
			tWidth = Math.ceil((tWidth + margin).clamp(0, width))
			bitmap.fillRect(Math.ceil((width - tWidth) / 2), y, tWidth, lineHeight, 'rgba(0,0,0,0.8)')
			bitmap.drawText(text, x + 1, y, width - 2, lineHeight, 'center')
		}

		this.anchor.set(0.5, 0.5);
		this.x = Graphics.width / 2;
		this.y = Graphics.height / 2;
		this.opacity = 0;
		this._count = 0;
	};

	InfoSprite.prototype.update = function () {
		Sprite.prototype.update.call(this);

		if (this._count === 0 && this.opacity < 255) {
			this.opacity += 26;
		}
		if (this.opacity === 255) {
			this._count += 1;
		}
		if (this._count >= 120) {
			this.opacity -= 26;
			if (this.opacity === 0) {
				this.parent.removeChild(this);
			}
		}
	};






	//=============================================================================
	// GuideSprite
	//=============================================================================
	function GuideSprite() {
		this.initialize.apply(this, arguments);
	}
	GuideSprite.prototype = Object.create(Sprite.prototype);
	GuideSprite.prototype.constructor = GuideSprite;

	GuideSprite.LINE_HEIGHT = 20;
	GuideSprite.prototype.initialize = function () {
		Sprite.prototype.initialize.call(this);

		var bitmap = new Bitmap(256, 256);
		this.bitmap = bitmap;
		this._texts = null;
		this._folding = false;
		this._backColor = 'rgba(0,0,0,0.5)';

		bitmap.fontSize = GuideSprite.LINE_HEIGHT - 4;
		bitmap.outlineWidth = 3;
		bitmap.outlineColor = 'black';
	};

	GuideSprite.prototype.setTexts = function (texts, color = 'rgba(0,0,0,0.5)') {
		this._backColor = color;
		if (!texts) {
			this._texts = null;
			this.vibible = false;
			return;
		} else if (this._texts && texts.equals(this._texts)) {
			return;
		} else {
			this._texts = texts;
			if (!this._folding) {
				this.refreshTexts(texts);
			}
		}
	};

	GuideSprite.prototype.refreshTexts = function (texts) {
		var bitmap = this.bitmap;
		bitmap.clear();

		var lineHeight = GuideSprite.LINE_HEIGHT;
		var x = 0;
		var y = 0;


		var length = texts.length;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			var text = texts[i];
			if (!text) {
				y += Math.floor(lineHeight / 2);
				continue;
			}

			var textWidth = bitmap.measureTextWidth(text);
			textWidth = (textWidth + 4).clamp(0, bitmap.width);
			bitmap.fillRect(bitmap.width - textWidth, y, textWidth, lineHeight, this._backColor);

			bitmap.drawText(text, x + 2, y, bitmap.width - 4, lineHeight, 'right');

			y += lineHeight;
		}

		this.x = Graphics.width - this.width;
		this.y = Graphics.height - y - 10;
	};

	GuideSprite.prototype.update = function () {
		Sprite.prototype.update.call(this);
		if (Input.isTriggered(guideKey)) {
			SoundManager.playCursor();
			if (this._folding) {
				this.open();
			} else {
				this.fold();
			}
		}
	};

	GuideSprite.prototype.open = function () {
		if (!this._folding) return;
		this._folding = false;

		if (this._texts) {
			this.refreshTexts(this._texts);
		}
	};

	GuideSprite.FOLDING_TEXTS = ['G：ガイドを表示']
	GuideSprite.prototype.fold = function () {
		if (this._folding) return;
		this._folding = true;

		this.refreshTexts(GuideSprite.FOLDING_TEXTS);
	};





	//=============================================================================
	// SubPicker
	//=============================================================================
	function SubPicker() {
		throw new Error('SubPicker is virtual class')
	};

	SubPicker.prototype = Object.create(TRP_SkitExpPicker.prototype);
	SubPicker.prototype.constructor = SubPicker;
	SubPicker.prototype.initialize = function (name, pose, sequenceMode = false) {
		TRP_SkitExpPicker.prototype.initialize.call(this, name, pose);
		this._sequenceMode = sequenceMode;
	};

	SubPicker.prototype.initMembers = function () {
		TRP_SkitExpPicker.prototype.initMembers.call(this);

		this.completed = false;
		this._terminated = false;
		this._sequenceMode = false;
		this._kind = -1;
		this._partsIds = [];

		this._sequenceGuide = null;
	};

	SubPicker.prototype.isKindPickerMode = function () {
		return this._kind < 0;
	};


	SubPicker.prototype.updateExInput = function () {
	};

	/* guide
	===================================*/
	SubPicker.prototype.showGuide = function (guide, color = 'rgb(0,0,200,0.5)') {
		guide[0] = '【' + this.pickerName() + '】';

		TRP_SkitExpPicker.prototype.showGuide.call(this, guide, color);
	};
	SubPicker.prototype.pickerName = function () {
		return '';
	};
	SubPicker.prototype.initGuide = function () {
		this.refreshGuide();
	};
	SubPicker.prototype.refreshGuide = function () {
		if (this.isKindPickerMode()) {
			this.showGuide(SubPicker.KIND_GUIDE);
		} else {
			if (this._sequenceMode) {
				this.showGuide(SubPicker.SEQUENCE_PICKER_GUIDE);
			} else {
				this.showGuide(SubPicker.ID_PICKER_GUIDE);
			}
		}
	};
	SubPicker.KIND_GUIDE = [
		'',
		'対象のパーツ種類を選択',
	];
	SubPicker.SEQUENCE_PICKER_GUIDE = [
		'',
		'順番にパーツIDを選択',
		null,
		'Enter:設定完了',
		'esc:キャンセル',
		'BackSpace：すべてクリア',
	];
	SubPicker.ID_PICKER_GUIDE = [
		'',
		'対象のパーツIDを全て選択',
		'Enter:設定完了',
		'esc:キャンセル',
		'BackSpace：すべてクリア',
	];



	/* quit
	===================================*/
	SubPicker.prototype.processQuit = function () {
		this._terminated = true;
		SoundManager.playCancel();
	};

	SubPicker.prototype.isTerminated = function () {
		return this._terminated;
	};



	/* base
	===================================*/
	SubPicker.prototype.setupData = function (noLoad) {
		this._data.length = 0;
		this._selectedIndexes.length = 0;
		this._savedExpressions = [];

		if (this.isKindPickerMode()) {
			this.setupKindData();
		} else {
			this.setupPartsIdData();
		}
	};

	SubPicker.prototype.didSelect = function (index, realIndex) {
		if (this.isKindPickerMode()) {
			SoundManager.playCursor();
			this.setKind(index + 1);
		} else {
			if (this._sequenceMode) {
				SoundManager.playCursor();
				this.addSequenceIndex(index, realIndex);
			} else {
				TRP_SkitExpPicker.prototype.didSelect.call(this, index, realIndex);
			}
		}
	};



	/* kind
	===================================*/
	SubPicker.prototype.setupKindData = function () {
		this._data.length = 0;
		this._selectedIndexes.length = 0;

		this._savedExpressions = [];

		var maxParts = this._partsNums;
		var typeLen = maxParts.length;
		var options = this._partsOptionFlags;

		var idxes;
		for (var i = 0; i < typeLen; i = (i + 1) | 0) {
			idxes = []
			for (var j = 0; j < typeLen; j = (j + 1) | 0) {
				if (j === i) {
					idxes.push(options[i] ? 1 : 0);
				} else {
					idxes.push(-1);
				}
			}
			this._data.push(idxes);
		}
	};

	SubPicker.prototype.setKind = function (kind) {
		this._kind = kind;

		this.setupData();
		this.refreshLayout();

		this.refreshGuide();
	};

	SubPicker.prototype.setupKindData = function () {
		this._data.length = 0;
		this._selectedIndexes.length = 0;

		this._savedExpressions = [];

		var maxParts = this._partsNums;
		var typeLen = maxParts.length;
		var options = this._partsOptionFlags;

		var idxes;
		for (var i = 0; i < typeLen; i = (i + 1) | 0) {
			idxes = []
			for (var j = 0; j < typeLen; j = (j + 1) | 0) {
				if (j === i) {
					idxes.push(options[i] ? 1 : 0);
				} else {
					idxes.push(-1);
				}
			}
			this._data.push(idxes);
		}
	};


	/* parts
	===================================*/
	SubPicker.prototype.setupPartsIdData = function () {
		var kindIdx = this._kind - 1;

		var maxParts = this._partsNums;
		var typeLen = maxParts.length;
		var options = this._partsOptionFlags;

		var maxId = maxParts[kindIdx];
		var idxes;
		for (var i = 0; i <= maxId; i = (i + 1) | 0) {
			if (i === 0 && options[kindIdx]) continue;

			idxes = []
			for (var j = 0; j < typeLen; j = (j + 1) | 0) {
				if (j === kindIdx) {
					idxes.push(i);
				} else {
					idxes.push(options[j] ? 1 : 0);
				}
			}
			this._data.push(idxes);
		}
	};

	SubPicker.prototype.addSequenceIndex = function (index, realIndex) {
		if (!this._selectedIndexes.contains(realIndex)) {
			this.showSelectSprite(index);
		}
		this._selectedIndexes.push(realIndex);

		var spriteIdx = this._selectSpritesIndexMap.indexOf(index);
		var sprite = this._selectSprites[spriteIdx];

		var child = sprite.children[0];
		if (!child) {
			child = new Sprite(new Bitmap(96, 20));
			sprite.addChild(child);
			child.anchor.set(1, 1);
			child.x = sprite.width - 2;
			child.y = sprite.height - 2;
		}

		var bitmap = child.bitmap;
		bitmap.clear();
		bitmap._baseTexture.update();


		var length = this._selectedIndexes.length;
		var text = '<';
		for (var i = 0; i < length; i = (i + 1) | 0) {
			if (this._selectedIndexes[i] !== realIndex) continue;

			if (text.length > 1) {
				text += ',';
			}
			text += i + 1;
		}
		text += '>';

		bitmap.fontSize = bitmap.height - 2;
		bitmap.textColor = 'rgb(0,0,255)';
		bitmap.outlineWidth = 5;
		bitmap.outlineColor = 'white';
		bitmap.drawText(text, 1, 0, bitmap.width - 2, bitmap.height, 'right');
	};


	SubPicker.prototype.processOk = function () {
		if (this.isKindPickerMode()) {
			SoundManager.playBuzzer();
		} else {
			this.executeOk();
		}
	};


	SubPicker.prototype.executeOk = function () {
		SoundManager.playOk();
		this.completed = true;
		this._terminated = true;
	};

	SubPicker.prototype.processSave = function (poseData) {
		if (this.completed) {
			var data = this.processExpressionData();
			this._processSave(poseData, data);
			return true;
		} else {
			return false;
		}
	};



	//=============================================================================
	// BlinkPicker
	//=============================================================================
	function BlinkPicker() {
		this.initialize.apply(this, arguments);
		this.setup();
	};

	BlinkPicker.prototype = Object.create(SubPicker.prototype);
	BlinkPicker.prototype.constructor = BlinkPicker;
	BlinkPicker.prototype.initialize = function (name, pose) {
		var sequenceMode = true;
		SubPicker.prototype.initialize.call(this, name, pose, sequenceMode);
	};

	BlinkPicker.prototype.pickerName = function () {
		return 'まばたきピッカー';
	};

	BlinkPicker.prototype._processSave = function (poseData, data) {
		var kind = -1;
		var ids = null;

		var length = data.length;
		if (length > 0) {
			kind = this._kind;
			ids = [];

			var kindIdx = kind - 1;
			for (var i = 0; i < length; i = (i + 1) | 0) {
				var idxes = data[i];
				ids.push(idxes[kindIdx]);
			}
		}

		poseData.blinkKind = kind;
		poseData.blinkIds = ids;
	};






	//=============================================================================
	// LipSyncPicker
	//=============================================================================
	function LipSyncPicker() {
		this.initialize.apply(this, arguments);
		this.setup();
	};

	LipSyncPicker.prototype = Object.create(SubPicker.prototype);
	LipSyncPicker.prototype.constructor = LipSyncPicker;
	LipSyncPicker.prototype.initialize = function (name, pose) {
		var sequenceMode = false;
		SubPicker.prototype.initialize.call(this, name, pose, sequenceMode);
	};

	LipSyncPicker.prototype.pickerName = function () {
		return '口ぱくピッカー';
	};

	LipSyncPicker.prototype._processSave = function (poseData, data) {
		var kind = -1;
		var ids = null;

		var length = data.length;
		if (length > 0) {
			kind = this._kind;
			ids = [];

			var kindIdx = kind - 1;
			for (var i = 0; i < length; i = (i + 1) | 0) {
				var idxes = data[i];
				ids.push(idxes[kindIdx]);
			}
		}

		poseData.lipSyncKind = kind;
		poseData.lipSyncIds = ids;
	};
















})();