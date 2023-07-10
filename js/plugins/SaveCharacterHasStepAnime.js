// SceneSaveCharacterHasStepAnime.js Ver.1.0.0
// MIT License (C) 2022 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @plugindesc セーブ画面のキャラクターを足踏みさせます。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/
* @help 選択不能とは、セーブ画面におけるオートセーブのコマンドの事です。
*
* [更新履歴]
* 2022/08/20：Ver.1.0.0　公開。
*
* @param dir
* @text 向き
* @desc キャラクターの向きです。
* @default 4
* @type select
* @option 下
* @value 2
* @option 左
* @value 4
* @option 右
* @value 6
* @option 上
* @value 8
*
* @param disabledDir
* @text 選択不能時の向き
* @desc 選択不能なセーブデータでのキャラクターの向きです。
* @default 4
* @type select
* @option 下
* @value 2
* @option 左
* @value 4
* @option 右
* @value 6
* @option 上
* @value 8
*
* @param disabledStep
* @text 選択不能の項目も足踏みする
* @desc 選択不能の項目も足踏みします。
* @default true
* @type boolean
*
* @param focusStep
* @text 選択中の項目のみ足踏みする
* @desc 選択中の項目のみ足踏みします。
* @default false
* @type boolean
*
* @param enableShiftY
* @text シフトY有効化
* @desc ファイル名先端に!が付いているかどうかを考慮します。
* @default false
* @type boolean
*
*/


'use strict';

{
	//プラグイン名取得。
	const script = document.currentScript;
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

	const parameters = PluginManager.parameters(pluginName);

	const dir = Number(parameters["dir"]);
	const disabledDir = Number(parameters["disabledDir"]);
	const focusStep = parameters["focusStep"] === "true";
	const disabledStep = parameters["disabledStep"] === "true";
	const enableShiftY = parameters["enableShiftY"] === "true";

	//-----------------------------------------------------------------------------
	// Window_SavefileList

	const _Window_SavefileList_initialize = Window_SavefileList.prototype.initialize;
	Window_SavefileList.prototype.initialize = function (rect) {
		_Window_SavefileList_initialize.call(this, rect);
		this._emptyCharacter = new Game_WindowCharacter();
		this._characters = null;
		this.createPartyCharacters();
	};

	Window_SavefileList.prototype.createPartyCharacters = function () {
		this._characterContainer = new Sprite();
		this._clientArea.addChild(this._characterContainer);
		this._characterSprites = [];
		const maxVisibleItems = this.maxVisibleItems();
		const maxMembers = $gameParty.maxBattleMembers();
		const num = maxVisibleItems * maxMembers;
		for (let i = 0; i < num; i++) {
			const sprite = new Sprite_WindowCharacter(this._emptyCharacter);
			this._characterSprites.push(sprite);
			this._characterContainer.addChild(sprite);
		}
	};

	const _Window_SavefileList_drawAllItems = Window_SavefileList.prototype.drawAllItems;
	Window_SavefileList.prototype.drawAllItems = function () {
		for (const sprite of this._characterSprites) {
			sprite._character = this._emptyCharacter;
		}
		_Window_SavefileList_drawAllItems.call(this);
		for (const sprite of this._characterSprites) {
			sprite.update();
		}
	};

	let currentIndex = 0;
	let isEnabled = false;
	const _Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem;
	Window_SavefileList.prototype.drawItem = function (index) {
		currentIndex = index;
		const savefileId = this.indexToSavefileId(index);
		isEnabled = this.isEnabled(savefileId);
		_Window_SavefileList_drawItem.call(this, index);
	};

	let drawParty = false;
	let loopIndex = 0;
	let characters = 0;
	let sprites = 0;

	const _Window_SavefileList_drawPartyCharacters = Window_SavefileList.prototype.drawPartyCharacters;
	Window_SavefileList.prototype.drawPartyCharacters = function (info, x, y) {
		drawParty = true;
		if (info.characters && this.hasGameCharacters()) {
			this.setCurrentPartyCharacters(currentIndex);
		}
		_Window_SavefileList_drawPartyCharacters.apply(this, arguments);
		drawParty = false;
		loopIndex = 0;
	};

	Window_SavefileList.prototype.setCurrentPartyCharacters = function (index) {
		this._currentCharacters = this.partyCharacters(index);
		this._currentSprites = this.partySprites(index);
	};

	const _Window_SavefileList_drawCharacter = Window_SavefileList.prototype.drawCharacter;
	Window_SavefileList.prototype.drawCharacter = function (
		characterName, characterIndex, x, y
	) {
		if (!drawParty) {
			_Window_SavefileList_drawCharacter.apply(this, arguments);
		} else if (this.hasGameCharacters()) {
			this.setPartyCharacter(characterName, characterIndex, x, y);
			loopIndex++;
		}
	};

	Window_SavefileList.prototype.setPartyCharacter = function (characterName, characterIndex, x, y) {
		const character = this._currentCharacters[loopIndex];
		const sprite = this._currentSprites[loopIndex];
		this.setCharacterStatus(currentIndex, character, sprite, [characterName, characterIndex], x, y);
	};

	Window_SavefileList.prototype.convCharX = function (x) {
		return x / $gameMap.tileWidth() - 0.5;
	};

	Window_SavefileList.prototype.convCharY = function (y) {
		return y / $gameMap.tileHeight() - 1;
	};

	Window_SavefileList.prototype.hasGameCharacters = function () {
		return !!this._characters;
	};

	Window_SavefileList.prototype.setGameCharacters = function (characters) {
		return this._characters = characters;
	};

	Window_SavefileList.prototype.partySprites = function (index) {
		const spriteIndex = index - this.topIndex();
		return this.sliceParty(this._characterSprites, spriteIndex);
	};

	Window_SavefileList.prototype.partyCharacters = function (index) {
		return this.sliceParty(this._characters, index)
	};

	Window_SavefileList.prototype.sliceParty = function (data, index) {
		const size = $gameParty.maxBattleMembers();
		const start = index * size;
		const end = start + size;
		return data.slice(start, end);
	};

	Window_SavefileList.prototype.setCharacterStatus = function (index, character, sprite, data, x, y) {
		const opacity = this.contents.paintOpacity;
		const direction = isEnabled ? dir : disabledDir;
		const canStep = this.canStep(index);
		character.setImage(data[0], data[1]);
		character.setPosition(this.convCharX(x), this.convCharY(y));
		character.setDirection(direction);
		character.setOpacity(opacity);
		character.setStepAnime(canStep);
		if (!canStep) {
			character.straighten();
		}
		if (sprite) {
			sprite._character = character;
		}
	};

	Window_SavefileList.prototype.canStep = function (index) {
		const canStep = isEnabled || disabledStep;
		return focusStep ? canStep && this.index() === index : canStep;
	};

	const _Window_SavefileList_select = Window_SavefileList.prototype.select;
	Window_SavefileList.prototype.select = function (index) {
		const lastIndex = this.index();
		_Window_SavefileList_select.call(this, index);
		this.redrawItem(lastIndex);
		this.redrawCurrentItem();
	};

	//-----------------------------------------------------------------------------
	// Scene_File

	const _Scene_File_create = Scene_File.prototype.create;
	Scene_File.prototype.create = function () {
		_Scene_File_create.call(this);
		this.createCharacters();
	};

	Scene_File.prototype.createCharacters = function () {
		const listWindow = this._listWindow;
		const maxItems = listWindow.maxItems();
		const maxMembers = $gameParty.maxBattleMembers();
		const num = maxItems * maxMembers;
		this._characters = [];
		for (let i = 0; i < num; i++) {
			const character = new Game_WindowCharacter();
			character.setStepAnime(true);
			this._characters.push(character);
		}
		listWindow._characters = this._characters;
	};

	const _Scene_File_update = Scene_File.prototype.update;
	Scene_File.prototype.update = function () {
		_Scene_File_update.call(this);
		this.updateCharacters();
	};

	Scene_File.prototype.updateCharacters = function () {
		for (const character of this._characters) {
			character.update();
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_WindowCharacter

	function Sprite_WindowCharacter() {
		this.initialize(...arguments);
	}

	Sprite_WindowCharacter.prototype = Object.create(Sprite_Character.prototype);
	Sprite_WindowCharacter.prototype.constructor = Sprite_WindowCharacter;

	function Game_WindowCharacter() {
		this.initialize(...arguments);
	}

	//-----------------------------------------------------------------------------
	// Game_WindowCharacter

	Game_WindowCharacter.prototype = Object.create(Game_Character.prototype);
	Game_WindowCharacter.prototype.constructor = Game_WindowCharacter;

	Game_WindowCharacter.prototype.scrolledX = function () {
		return this._realX;
	};

	Game_WindowCharacter.prototype.scrolledY = function () {
		return this._realY;
	};

	Game_WindowCharacter.prototype.isOnLadder = function () {
		return false;
	};

	Game_WindowCharacter.prototype.isOnBush = function () {
		return false;
	};

	Game_WindowCharacter.prototype.terrainTag = function () {
		return 0;
	};

	Game_WindowCharacter.prototype.regionId = function () {
		return 0;
	};

	Game_WindowCharacter.prototype.setPosition = function (x, y) {
		Game_Character.prototype.setPosition.call(this, x, y);
		this._x = x;
		this._y = y;
	};

	Game_WindowCharacter.prototype.isNearTheScreen = function () {
		return true;
	};

	if (!enableShiftY) {
		Game_WindowCharacter.prototype.shiftY = function () {
			return 0;
		};
	}

}