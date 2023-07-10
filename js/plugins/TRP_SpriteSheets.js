//=============================================================================
// TRP_SpriteSheets.js
//=============================================================================
// Copyright (c) 2020 Thirop
//============================================================================= 
/*:
 * @target MZ
 * @author Thirop
 * @plugindesc スプライトシート機能の提供
 * @help
 * TRP_SkitMZにて階層レイヤー方式の画像形式で
 * スプライトシート化した表情画像を使用する際に必要な
 * プラグインです。
 *
 * 【更新履歴】
 * 1.01 2022/2/27  画像読み込みが遅れた際のエラー修正
 * 1.00 2020/11/10 初版
 */

var TRP_SpriteSheet = function () { };


(() => {
    'use strict';

    var _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        _DataManager_loadDatabase.call(this);

        TRP_SpriteSheet.setup()
    };


    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!TRP_SpriteSheet.isReady()) return false;

        return true;
    };


    //=============================================================================
    // TRP_SpriteSheet
    //=============================================================================
    TRP_SpriteSheet._loadingCount = 0;
    TRP_SpriteSheet.data = {};

    TRP_SpriteSheet.setup = function () {
    };

    TRP_SpriteSheet.load = function (file, completion = null) {
        if (this.data[file]) return;

        this._loadingCount += 1;

        file = file.replace('.json', '');

        var xhr = new XMLHttpRequest();
        var url = 'dataEx/spritesheets/' + file + '.json';
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = this._onLoad.bind(this, file, xhr, completion);

        xhr.onerror = this._onError.bind(this, url);
        xhr.send();
    };

    TRP_SpriteSheet._onLoad = function (file, xhr, completion = null) {
        if (xhr.status < 400) {
            this.data[file] = JSON.parse(xhr.responseText);;
        }
        this._loadingCount -= 1;

        if (completion) {
            completion();
        }
    };
    TRP_SpriteSheet._onError = function (url) {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    TRP_SpriteSheet.isReady = function () {
        return this._loadingCount === 0;
    };






    //=============================================================================
    // Sprite
    //=============================================================================
    Sprite.prototype.setupWithSheet = function (sheet, image, bitmap) {
        if (!this.bitmap) return;
        if (bitmap && this.bitmap !== bitmap) return;

        if (!this.bitmap.isReady()) {
            this.bitmap.addLoadListener(this.setupWithSheet.bind(this, sheet, image));
            return;
        }

        if (!TRP_SpriteSheet.data[sheet]) {
            throw new Error('spritesheet not loaded:' + sheet)
        }

        var data = TRP_SpriteSheet.data[sheet].frames[image];
        if (!data) {
            throw new Error('spritesheet image data not found:' + sheet + '>' + image);
        }

        var rect = data.frame;
        if (!rect) return;

        var frame = null;
        var trim = null;
        var sourceSize = data.trimmed !== false && data.sourceSize
            ? data.sourceSize : data.frame;
        var orig = new Rectangle(0, 0, Math.floor(sourceSize.w), Math.floor(sourceSize.h));
        if (data.rotated) {
            frame = new Rectangle(Math.floor(rect.x), Math.floor(rect.y), Math.floor(rect.h), Math.floor(rect.w));
        }
        else {
            frame = new Rectangle(Math.floor(rect.x), Math.floor(rect.y), Math.floor(rect.w), Math.floor(rect.h));
        }
        //  Check to see if the sprite is trimmed
        if (data.trimmed !== false && data.spriteSourceSize) {
            trim = new Rectangle(Math.floor(data.spriteSourceSize.x), Math.floor(data.spriteSourceSize.y), Math.floor(rect.w), Math.floor(rect.h));
        }



        this._frame = frame;
        this.texture.trim = trim;
        this.texture.orig = orig;
        this.texture._rotate = data.rotated ? 2 : 0;
        this.texture.frame = frame.clone();

        this.texture.updateUvs();
    };


})();