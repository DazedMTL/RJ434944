//=============================================================================
// BB_TextEX.js
// Copyright (c) 2016 BB ENTERTAINMENT
//=============================================================================

/*:
 * @plugindesc 文字枠調節＆文字半透明化制御文字追加プラグイン
 * @author ビービー
 * 
 * @help 【文字枠調節＆文字半透明化制御文字追加プラグイン】
 * 
 * ◆プラグイン概要
 * 文字枠の幅や色を変更したり文字を半透明化する制御文字を追加するプラグインです。
 * 
 * ◆追加される制御文字
 * \L[n]
 * 文字枠の幅をnの値に変更します。デフォルトの文字枠の幅は4。
 * 
 * \R[n]
 * 文字の枠の色ｎの値の色に変更します。デフォルトの色は15.※1
 * 変更される色は文字の色を変える制御文字\C[n]と同一。※2
 * ※1：nの値が31以上の数値でもデフォルトの色に戻ります。
 * ※2：RTP素材のWindow.pngと同一にしているため、
 *      Window.pngを改変している場合は違う色になる場合もあります。）
 * 
 * \O[n]
 * 文字をnの値によって半透明化させます。
 * n=0で半透明、nが0より大きい場合通常の文字。
 * 
 * ◆使用例
 * 文字のアウトラインを\L[10]太くしたり\L[0]細くしたりできます。
 * \L[4]文字の透明度を\O[0]0(半透明)\O[1]にできます。
 * 文字の\R[16]アウトライン\R[15]の\R[3]色\R[40]を\R[5]変える\R[12]こと\R[13]も\R[20]できます。
 * 
 * ◆注意事項
 * このプラグインはウィンドウが更新されるたびに
 * 文字枠幅、文字枠色、透明度をリセットしています。
 * この3つを他のプラグインやコアスクリプトの書き換えなどで変更している場合
 * 予期せぬ動作が起こる可能性があります。
 * 
 * ◆利用規約：
 * このプラグインは、MITライセンスのもとで公開されています。
 * Copyright (c) 2017 BB ENTERTAINMENT
 * Released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * 
 * ◆コンタクト：
 * BB ENTERTAINMENT Twitter: https://twitter.com/BB_ENTER/
 * BB ENTERTAINMENT BLOG   : http://bb-entertainment-blog.blogspot.jp/
 */


(function () {
    'use strict';
    //-----------------------------------------------------------------------------
    // プラグインパラメータ管理
    var parameters = PluginManager.parameters('BB_TextEX');


    //------------------------------------------------------------------------------
    // ウィンドウごとに追加した制御文字の効果をリセット
    var _Window_Base_prototype_resetFontSettings = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function () {
        _Window_Base_prototype_resetFontSettings.call(this);
        this.resetTextOutline();
        this.resetPaintOpacity();
        this.resetOutlineColor();
    };

    Window_Base.prototype.resetTextOutline = function () {
        this.contents.outlineWidth = 4;
    };

    Window_Base.prototype.resetPaintOpacity = function () {
        this.changePaintOpacity(1);
    };

    Window_Base.prototype.resetOutlineColor = function () {
        this.contents.outlineColor = 'black';
    };

    //------------------------------------------------------------------------------
    // 制御文字の追加
    var _Window_Base_prototype_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function (code, textState) {
        _Window_Base_prototype_processEscapeCharacter.call(this, code, textState);
        switch (code) {
            case 'L':
                this.processOutline(this.obtainEscapeParam(textState), textState);
                break;
            case 'O':
                this.processPaintOpacity(this.obtainEscapeParam(textState), textState);
                break;
            case 'R':
                this.processOutlineColor(this.obtainEscapeParam(textState), textState);
                break;
        }
    };

    Window_Base.prototype.processOutline = function (textState) {
        this.contents.outlineWidth = textState;
    };

    Window_Base.prototype.processPaintOpacity = function (textState) {
        this.changePaintOpacity(textState);
    };

    Window_Base.prototype.processOutlineColor = function (textState) {
        if (textState == 1) {
            this.contents.outlineColor = '#20a0b6';
        } else if (textState == 2) {
            this.contents.outlineColor = '#ff784c';
        } else if (textState == 3) {
            this.contents.outlineColor = '#66cc40';
        } else if (textState == 4) {
            this.contents.outlineColor = '#99ccff';
        } else if (textState == 5) {
            this.contents.outlineColor = '#ccc0ff';
        } else if (textState == 6) {
            this.contents.outlineColor = '#ffffa0';
        } else if (textState == 7) {
            this.contents.outlineColor = '#808080';
        } else if (textState == 8) {
            this.contents.outlineColor = '#c0c0c0';
        } else if (textState == 9) {
            this.contents.outlineColor = '#2080cc';
        } else if (textState == 10) {
            this.contents.outlineColor = '#ff3810';
        } else if (textState == 11) {
            this.contents.outlineColor = '#00a010';
        } else if (textState == 12) {
            this.contents.outlineColor = '#3e9ade';
        } else if (textState == 13) {
            this.contents.outlineColor = '#a098ff';
        } else if (textState == 14) {
            this.contents.outlineColor = '#ffcc20';
        } else if (textState == 15) {
            this.contents.outlineColor = '#000000';
        } else if (textState == 16) {
            this.contents.outlineColor = '#84aaff';
        } else if (textState == 17) {
            this.contents.outlineColor = '#ffff40';
        } else if (textState == 18) {
            this.contents.outlineColor = '#ff2020';
        } else if (textState == 19) {
            this.contents.outlineColor = '#202040';
        } else if (textState == 20) {
            this.contents.outlineColor = '#e08040';
        } else if (textState == 21) {
            this.contents.outlineColor = '#f0c040';
        } else if (textState == 22) {
            this.contents.outlineColor = '#4080c0';
        } else if (textState == 23) {
            this.contents.outlineColor = '#40c0f0';
        } else if (textState == 24) {
            this.contents.outlineColor = '#80ff80';
        } else if (textState == 25) {
            this.contents.outlineColor = '#c08080';
        } else if (textState == 26) {
            this.contents.outlineColor = '#8080ff';
        } else if (textState == 27) {
            this.contents.outlineColor = '#ff80ff';
        } else if (textState == 28) {
            this.contents.outlineColor = '#00a040';
        } else if (textState == 29) {
            this.contents.outlineColor = '#00e060';
        } else if (textState == 30) {
            this.contents.outlineColor = '#a060e0';
        } else if (textState == 31) {
            this.contents.outlineColor = '#c080ff';
        } else if (textState == 0) {
            this.contents.outlineColor = '#ffffff';
        } else {
            this.contents.outlineColor = '#000000';
        }
    };

})();