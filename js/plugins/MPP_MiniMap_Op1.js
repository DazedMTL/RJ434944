//=============================================================================
// MPP_MiniMap_Op1.js
//=============================================================================
// Copyright (c) 2017-2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Only the areas that have passed nearby will be displayed on the minimap.
 * @author Mokusei Penguin
 * @url
 * 
 * @base MPP_MiniMap
 * @orderAfter MPP_MiniMap
 *
 * @help [version 2.0.1]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin command
 *  - In MV, the variable N is referred to by writing 'v[N]' in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write 'v[N]' to refer to the variable N.
 *    
 *  〇 MV / MZ
 *  
 *  〇 SetMappingRadius r  / setRadius
 *      r : radius(1 = 1tile)
 *   - Change the mapping radius.
 * 
 *  〇 FillMappingXy x y r  / fillXy
 *      x : X coordinate
 *      y : Y coordinate
 *      r : radius(1 = 1tile)
 *   - Maps the radius (r) around the coordinates (x, y) of the current map.
 * 
 *  〇 FillAllMapping mapId  / fillAll
 *      mapId : Map ID
 *   - Marks all specified maps as mapped.
 * 
 *  〇 ClearMapping mapId  / clear
 *      mapId : Map ID
 *   - Clears the mapping of the specified map.
 * 
 * ▼ script
 *  〇 $gameMinimap.isFilled(x, y)
 *   - Gets whether the specified coordinates have been mapped.
 * 
 * ▼ Supplement
 *  - The mapping information is initialized when the map is resized.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setRadius
 *      @desc 
 *      @arg radius
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 6
 * 
 *  @command fillXy
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg radius
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 6
 * 
 *  @command fillAll
 *      @desc 
 *      @arg mapId
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 9999
 *          @default 1
 * 
 *  @command clear
 *      @desc 
 *      @arg mapId
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 9999
 *          @default 1
 * 
 * 
 *  @param Default Mapping Radius
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 6
 *
 *  @param Out Tile Type
 *      @desc Display type of unmapped range
 *      @type select
 *          @option translucent
 *          @value translucent
 *          @option color
 *          @value color
 *      @default color
 *
 *  @param Out Color
 *      @desc Colors in the unmapped range
 *      @default 0,0,0,0.375
 *      @parent Out Tile Type
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc 近くを通ったことのある範囲のみ、ミニマップに標示します。
 * @author 木星ペンギン
 * @url
 * 
 * @base MPP_MiniMap
 * @orderAfter MPP_MiniMap
 *
 * @help [version 2.0.1]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ プラグインコマンド
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  
 *  〇 MV / MZ
 *  
 *  〇 SetMappingRadius r  / マッピング半径設定
 *      r : 半径(1 = 1マス)
 *   - マッピングの半径を変更します。
 * 
 *  〇 FillMappingXy x y r  / 座標マッピング
 *      x : X座標
 *      y : Y座標
 *      r : 半径(1 = 1マス)
 *   - 現在のマップの座標(x,y)を中心に半径(r)をマッピングします。
 * 
 *  〇 FillAllMapping mapId  / マッピング塗りつぶし
 *      mapId : マップID
 *   - 指定したマップをすべてマッピング済みにします。
 * 
 *  〇 ClearMapping mapId  / マッピングクリア
 *      mapId : マップID
 *   - 指定したマップのマッピングをクリアします。
 * 
 * ▼ スクリプト
 *  〇 $gameMinimap.isFilled(x, y)
 *   - 指定した座標がマッピング済みかどうかを取得します。
 * 
 * ▼ 補足
 *  - マッピング情報はマップのサイズが変更されると初期化されます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setRadius
 *      @text マッピング半径設定
 *      @desc 
 *      @arg radius
 *          @text 半径
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 6
 * 
 *  @command fillXy
 *      @text 座標マッピング
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg radius
 *          @text 半径
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 6
 * 
 *  @command fillAll
 *      @text マッピング塗りつぶし
 *      @desc 
 *      @arg mapId
 *          @text マップID
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 9999
 *          @default 1
 * 
 *  @command clear
 *      @text マッピングクリア
 *      @desc 
 *      @arg mapId
 *          @text マップID
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 9999
 *          @default 1
 * 
 * 
 *  @param Default Mapping Radius
 *      @text デフォルトマッピング半径
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 6
 *
 *  @param Out Tile Type
 *      @text 外側の表示タイプ
 *      @desc マッピングしていない範囲の表示タイプ
 *      @type select
 *          @option 半透明
 *          @value translucent
 *          @option 色指定
 *          @value color
 *      @default color
 *
 *  @param Out Color
 *      @text 外側の色
 *      @desc マッピングしていない範囲の色
 *      @default 0,0,0,0.375
 *      @parent Out Tile Type
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_MiniMap_Op1';

    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_DefaultMappingRadius = Number(parameters['Default Mapping Radius'] || 8);
    const param_OutTileType = parameters['Out Tile Type'] || 'color';
    const param_OutColor = `rgba(${parameters['Out Color'] || '0,0,0,0'})`;

    // ArrayExt
    const ArrayExt = {
        compress(array) {
            const max = array.length;
            const result = [max, array[0] || 0];
            for (let i = 1; i < max; i++) {
                const value = array[i] || 0;
                if (result[result.length - 1] !== value) {
                    result[result.length - 2] = i;
                    result.push(max, value);
                }
            }
            return result;
        },

        decompress(array) {
            const result = [];
            for (let i = 0; i < array.length; i += 2) {
                const start = result.length;
                result.length = array[i];
                result.fill(array[i + 1], start);
            }
            return [...result];
        }

    };

    //-----------------------------------------------------------------------------
    // Minimap_Table

    function Minimap_Table() {
        this.initialize.apply(this, arguments);
    }

    window.Minimap_Table = Minimap_Table;

    Object.defineProperties(Minimap_Table.prototype, {
        width: {
            get() {
                return this._width;
            },
            configurable: true
        },
        height: {
            get() {
                return this._height;
            },
            configurable: true
        }
    });

    Minimap_Table.prototype.initialize = function (width, height) {
        this._width = width;
        this._height = height;
        this._data = [];
        this._compress = false;
    };

    Minimap_Table.prototype.isValid = function (x, y) {
        return x >= 0 && x < this._width && y >= 0 && y < this._height;
    };

    Minimap_Table.prototype.value = function (x, y) {
        this.decompress();
        return this.isValid(x, y) ? this._data[y * this._width + x] || 0 : 0;
    };

    Minimap_Table.prototype.setValue = function (x, y, value) {
        if (this.isValid(x, y)) {
            this.decompress();
            this._data[y * this._width + x] = value;
        }
    };

    Minimap_Table.prototype.fill = function (value) {
        this._data = [...Array(this._width * this._height)].fill(value);
        this._compress = false;
    };

    Minimap_Table.prototype.compress = function () {
        if (!this._compress) {
            this._data = ArrayExt.compress(this._data);
            this._compress = true;
        }
    };

    Minimap_Table.prototype.decompress = function () {
        if (this._compress) {
            this._data = ArrayExt.decompress(this._data);
            this._compress = false;
        }
    };

    //-------------------------------------------------------------------------
    // DataManager

    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        $gameMap.mappingCompress();
        return _DataManager_makeSaveContents.apply(this, arguments);
    };

    //-------------------------------------------------------------------------
    // Game_MinimapMarker

    const _Game_MinimapMarker_clearMarker = Game_MinimapMarker.prototype.clearMarker;
    Game_MinimapMarker.prototype.clearMarker = function () {
        _Game_MinimapMarker_clearMarker.call(this);
        this._mapping = false;
    }

    const _Game_MinimapMarker_isVisible = Game_MinimapMarker.prototype.isVisible
    Game_MinimapMarker.prototype.isVisible = function () {
        return (
            _Game_MinimapMarker_isVisible.call(this) &&
            (!this._mapping || this.isOnMapping())
        );
    }

    Game_MinimapMarker.prototype.isOnMapping = function () {
        const subject = this.subject();
        const x = subject ? subject.x : this._x;
        const y = subject ? subject.y : this._y;
        return $gameMap.isMapping(x, y);
    }

    const _Game_MinimapMarker_setMarkerFlag = Game_MinimapMarker.prototype.setMarkerFlag;
    Game_MinimapMarker.prototype.setMarkerFlag = function (flag) {
        _Game_MinimapMarker_setMarkerFlag.call(this, flag);
        this._mapping = flag.includes('M');
    }

    //-------------------------------------------------------------------------
    // Game_Map

    Game_Map._mappingDrawPos = [];

    const _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function () {
        _Game_Map_initialize.apply(this, arguments);
        this._mappingTables = {};
        this._mappingRadius = param_DefaultMappingRadius;
    };

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        _Game_Map_setup.apply(this, arguments);
        if (this.isShowMinimap(mapId)) {
            const table = this._mappingTables[mapId];
            const width = this.width();
            const height = this.height();
            if (!table || table.width !== width || table.height !== height) {
                this._mappingTables[mapId] = new Minimap_Table(width, height);
            }
        }
    };

    Game_Map.prototype.mappingCompress = function () {
        for (const table of Object.values(this._mappingTables)) {
            table.compress();
        }
    };

    Game_Map.prototype.currentMappingTable = function () {
        return this._mappingTables[this._mapId];
    };

    Game_Map.prototype.mappingRadius = function () {
        return this._mappingRadius
    };

    Game_Map.prototype.setMappingRadius = function (radius) {
        this._mappingRadius = radius;
        $gamePlayer.onMapping();
    };

    Game_Map.prototype.clearMappingDrawPos = function () {
        Game_Map._mappingDrawPos.length = 0;
    };

    Game_Map.prototype.addMappingDrawPos = function (x, y) {
        Game_Map._mappingDrawPos.push(y * this.width() + x);
    };

    Game_Map.prototype.mappingDrawPos = function () {
        const width = this.width();
        return Game_Map._mappingDrawPos.map(
            p => [p % width, Math.floor(p / width)]
        );
    };

    Game_Map.prototype.mappingPos = function (x, y, r) {
        const table = this.currentMappingTable();
        if (table && r > 0) {
            const width = this.width();
            const height = this.height();
            this.iterateMappingPos(x, y, r, (dx, dy) => {
                const rx = (dx + width) % width;
                const ry = (dy + height) % height;
                const v = Math.floor(3 * (r + 1 - Math.hypot(x - dx, y - dy)));
                this.addMappingOpacity(table, rx, ry, Math.min(v, 5));
            });
        }
    };

    Game_Map.prototype.iterateMappingPos = function (x, y, r, callback) {
        const loopHor = this.isLoopHorizontal();
        const loopVer = this.isLoopVertical();
        const minX = loopHor ? x - r : Math.max(x - r, 0);
        const maxX = loopHor ? x + r : Math.min(x + r, this.width() - 1);
        const minY = loopVer ? y - r : Math.max(y - r, 0);
        const maxY = loopVer ? y + r : Math.min(y + r, this.height() - 1);
        for (let dx = minX; dx <= maxX; dx++) {
            for (let dy = minY; dy <= maxY; dy++) {
                callback(dx, dy);
            }
        }
    };

    Game_Map.prototype.addMappingOpacity = function (table, x, y, value) {
        if (table.value(x, y) < value) {
            table.setValue(x, y, value);
            this.addMappingDrawPos(x, y);
        }
    };

    Game_Map.prototype.clearMapping = function (mapId) {
        this.fillAllMapping(mapId, 0);
    };

    Game_Map.prototype.fillAllMapping = function (mapId, value = 5) {
        mapId = mapId || this._mapId;
        const table = this._mappingTables[mapId];
        if (table) {
            table.fill(value);
            if (mapId === this._mapId) {
                $gamePlayer.onMapping();
                MinimapImage.refresh();
            }
        }
    };

    Game_Map.prototype.isMapping = function (x, y) {
        return this.mappingOpacity(x, y) >= 128;
    };

    Game_Map.prototype.mappingOpacity = function (x, y) {
        const table = this.currentMappingTable();
        return table ? Math.min(table.value(x, y) * 51, 255) : 0;
    };

    //-------------------------------------------------------------------------
    // Game_Player

    const _Game_Player_locate = Game_Player.prototype.locate;
    Game_Player.prototype.locate = function (x, y) {
        _Game_Player_locate.apply(this, arguments);
        this.onMapping();
    };

    const _Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
    Game_Player.prototype.increaseSteps = function () {
        _Game_Player_increaseSteps.apply(this, arguments);
        this.onMapping();
    };

    Game_Player.prototype.onMapping = function () {
        $gameMap.mappingPos(this.x, this.y, $gameMap.mappingRadius());
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        SetMappingRadius: { name: 'setRadius', keys: ['radius'] },
        FillMappingXy: { name: 'fillXy', keys: ['x', 'y', 'radius'] },
        FillAllMapping: { name: 'fillAll', keys: ['mapId'] },
        ClearMapping: { name: 'clear', keys: ['mapId'] }
    };
    Object.assign(_mzCommands, {
        'マッピング半径設定': _mzCommands.SetMappingRadius,
        '座標マッピング': _mzCommands.FillMappingXy,
        'マッピング塗りつぶし': _mzCommands.FillAllMapping,
        'マッピングクリア': _mzCommands.ClearMapping
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(...mzCommand.keys.map((k, i) => ({ [k]: args[i] })));
            PluginManager.callCommand(this, pluginName, mzCommand.name, args2);
        }
    };

    //-------------------------------------------------------------------------
    // PluginManager

    PluginManager.registerCommand(pluginName, 'setRadius', args => {
        const radius = PluginManager.mppValue(args.radius);
        $gameMap.setMappingRadius(radius);
    });

    PluginManager.registerCommand(pluginName, 'fillXy', args => {
        const x = PluginManager.mppValue(args.x);
        const y = PluginManager.mppValue(args.y);
        const radius = PluginManager.mppValue(args.radius);
        $gameMap.mappingPos(x, y, radius);
    });

    PluginManager.registerCommand(pluginName, 'fillAll', args => {
        const mapId = PluginManager.mppValue(args.mapId);
        $gameMap.fillAllMapping(mapId);
    });

    PluginManager.registerCommand(pluginName, 'clear', args => {
        const mapId = PluginManager.mppValue(args.mapId);
        $gameMap.clearMapping(mapId);
    });

    //-------------------------------------------------------------------------
    // MinimapImage

    MinimapImage._baseBitmap = null;
    MinimapImage._needsRefresh = false;

    MinimapImage.destroy = function () {
        if (this.bitmap) {
            this.bitmap.destroy();
        }
        this.bitmap = null;
        this._baseImage = null;
    };

    const _MinimapImage_refresh = MinimapImage.refresh;
    MinimapImage.refresh = function () {
        this._needsRefresh = true;
    };

    MinimapImage.refresh2 = function () {
        _MinimapImage_refresh.call(this);
        if (this._isUserImage) {
            this.bitmap.clear();
            const width = $gameMap.width();
            const height = $gameMap.height();
            const tileWidth = this.tileWidth();
            const tileHeight = this.tileHeight();
            for (let y = 0; y < width; y++) {
                for (let x = 0; x < height; x++) {
                    this.paintUserSpot(x, y, tileWidth, tileHeight);
                }
            }
            this.bitmap.baseTexture.update();
        }
    };

    MinimapImage.paintUserSpot = function (x, y, tileWidth, tileHeight) {
        const dx = Math.floor(x * tileWidth);
        const dy = Math.floor(y * tileHeight);
        const dw = Math.floor((x + 1) * tileWidth) - dx;
        const dh = Math.floor((y + 1) * tileHeight) - dy;
        const opacity = $gameMap.mappingOpacity(x, y);
        this.drawUserImage(dx, dy, dw, dh, opacity);
    };

    MinimapImage.drawUserImage = function (dx, dy, dw, dh, opacity) {
        const image = this._baseImage;
        const context = this.bitmap.context;
        context.save();
        if (param_OutTileType === 'color') {
            if (opacity > 0) {
                context.globalAlpha = opacity / 255;
                context.drawImage(image, dx, dy, dw, dh, dx, dy, dw, dh);
            }
            if (opacity < 255) {
                context.globalCompositeOperation = 'lighter';
                context.globalAlpha = (255 - opacity) / 255;
                context.fillStyle = param_OutColor;
                context.fillRect(dx, dy, dw, dh);
            }
        } else {
            context.globalAlpha = 0.25 + 0.75 * opacity / 255;
            context.drawImage(image, dx, dy, dw, dh, dx, dy, dw, dh);
        }
        context.restore();
    };

    const _MinimapImage_paintSpot = MinimapImage.paintSpot;
    MinimapImage.paintSpot = function (x, y) {
        const opacity = $gameMap.mappingOpacity(x, y);
        const context = this.bitmap.context;
        if (param_OutTileType === 'color') {
            if (opacity > 0) {
                context.globalAlpha = opacity / 255;
                _MinimapImage_paintSpot.call(this, x, y);
            }
            if (opacity < 255) {
                context.globalAlpha = (255 - opacity) / 255;
                context.fillStyle = param_OutColor;
                const size = this._tileSize;
                context.fillRect(x * size, y * size, size, size);
            }
        } else {
            context.globalAlpha = 0.25 + 0.75 * opacity / 255;
            _MinimapImage_paintSpot.call(this, x, y);
        }
    };

    MinimapImage.update = function () {
        if (this.bitmap) {
            this.updateBaseImage();
            this.updateRefresh();
            this.updateMapping();
        }
    };

    MinimapImage.updateBaseImage = function () {
        if (this._isUserImage && !this._baseImage && this.bitmap.isReady()) {
            this._baseImage = this.bitmap._image;
            const { width, height } = this.bitmap;
            this.bitmap = new Bitmap(width, height);
        }
    };

    MinimapImage.updateRefresh = function () {
        if (this._needsRefresh) {
            if (!this._isUserImage || this._baseImage) {
                this.refresh2();
                this._needsRefresh = false;
            }
        }
    };

    MinimapImage.updateMapping = function () {
        if (this._isUserImage) {
            if (this._baseImage) {
                const tileWidth = this.tileWidth();
                const tileHeight = this.tileHeight();
                for (const [x, y] of $gameMap.mappingDrawPos()) {
                    this.repaintUserSpot(x, y, tileWidth, tileHeight);
                }
                this.bitmap.baseTexture.update();
                $gameMap.clearMappingDrawPos();
            }
        } else {
            for (const [x, y] of $gameMap.mappingDrawPos()) {
                this.repaintSpot(x, y);
            }
            this.bitmap.baseTexture.update();
            $gameMap.clearMappingDrawPos();
        }
    };

    MinimapImage.repaintUserSpot = function (x, y, tileWidth, tileHeight) {
        const dx = Math.floor(x * tileWidth);
        const dy = Math.floor(y * tileHeight);
        const dw = Math.floor((x + 1) * tileWidth) - dx;
        const dh = Math.floor((y + 1) * tileHeight) - dy;
        this.bitmap.clearRect(dx, dy, dw, dh);
        this.paintUserSpot(x, y, tileWidth, tileHeight);
    };

    MinimapImage.repaintSpot = function (x, y) {
        const size = this._tileSize;
        const dx = x * size;
        const dy = y * size;
        this.bitmap.clearRect(dx, dy, size, size);
        this.paintSpot(x, y);
    };

    //-------------------------------------------------------------------------
    // Sprite_MiniMap

    const _Sprite_MiniMap_update = Sprite_MiniMap.prototype.update;
    Sprite_MiniMap.prototype.update = function () {
        MinimapImage.update();
        _Sprite_MiniMap_update.apply(this, arguments);
    };

})();
