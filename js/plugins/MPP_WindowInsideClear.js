//=============================================================================
// MPP_WindowInsideClear.js
//=============================================================================
// Copyright (c) 2018 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Slightly narrows the area where the lower window is deleted when overlaying windows.
 * @author Mokusei Penguin
 * @url 
 * 
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @param Inside Width
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 99
 *      @default 0
 *
 *  @param Corners Radius
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 99
 *      @default 9
 *
 */

/*:ja
 * @target MZ
 * @plugindesc ウィンドウを重ねて表示する際の、下のウィンドウが削除される領域を若干狭めます。
 * @author 木星ペンギン
 * @url 
 * 
 * @help [version 2.0.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @param Inside Width
 *      @text 内側に寄せる幅
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 99
 *      @default 0
 *
 *  @param Corners Radius
 *      @text 角の半径
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 99
 *      @default 9
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_WindowInsideClear';

    const parameters = PluginManager.parameters(pluginName);
    const param_InsideWidth = Number(parameters['Inside Width'] || 0);
    const param_CornersRadius = Number(parameters['Corners Radius'] || 9);

    //-------------------------------------------------------------------------
    // Window

    Window.prototype.drawShape = function (graphics) {
        if (graphics) {
            const iw = param_InsideWidth;
            const r = param_CornersRadius;

            const width = this.width - iw * 2;
            const height = ((this.height - iw * 2) * this._openness) / 255;
            const x = this.x + iw;
            const y = this.y + (this.height - height) / 2;

            graphics.beginFill(0xffffff);
            graphics.drawRoundedRect(x, y, width, height, r);
            graphics.endFill();
        }
    };
})();
