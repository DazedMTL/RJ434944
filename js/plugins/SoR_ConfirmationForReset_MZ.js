//=============================================================================
// SoR_ConfirmationForReset_MZ.js
// SoR License (C) 2020 蒼竜, REQUIRED User Registration on Dragon Cave
// http://dragonflare.blue/dcave/license.php
// ----------------------------------------------------------------------------
// Latest version v1.01 (2020/10/09)
//=============================================================================

/*:ja
@plugindesc ＜ソフトリセット確認ダイアログ＞ v1.01
@author 蒼竜
@help F5によるゲームリセットの際，
確認ダイアログを表示して即座にリセットされないようにします。
F5を誤って押した際にゲームがリセットされることを防止します。

@target MZ
@url http://dragonflare.blue/dcave/

@param ConfirmMessage
@type string
@default リセットしてもよろしいですか？
@desc ダイアログのメッセージテキスト
@param ResetImmediately_onDebug
@desc デバッグプレー中は，ダイアログを出さずに即リセットを行うか？ (default: false)
@default true
@type boolean
*/
/*:
@plugindesc <Confirmation dialog for Game Reset> v1.01
@author Soryu
@help This plugin shows a dialog when F5 key is pushed to reset during the game.
This prevents the player from processing the game reset to push F5 key by mistake.

@target MZ
@url http://dragonflare.blue/dcave/index_e.php

@param ConfirmMessage
@type string
@default Confirm: reset game?
@desc Message text om confirmation dialog
@param ResetImmediately_onDebug
@desc Flag to reset immediately when the game is running as debug mode (default: false)
@default true
@type boolean
*/

(function () {
    const pluginName = "SoR_ConfirmationForReset_MZ";
    const Param = PluginManager.parameters(pluginName);

    const ConfirmMessage = String(Param['ConfirmMessage']) || '';
    const ResetImmediately_onDebug = Boolean(Param['ResetImmediately_onDebug'] === 'true') || false;


    const SoR_CR_SM_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function (event) {
        if (!event.ctrlKey && !event.altKey && event.keyCode === 116) {
            if (ResetImmediately_onDebug && $gameTemp.isPlaytest()) this.reloadGame();
            else {
                const res = window.confirm(ConfirmMessage);
                if (res) this.reloadGame();
            }
        }
        else SoR_CR_SM_onKeyDown.call(this, ...arguments);
    }

    const SoR_CR_SM_reloadGame = SceneManager.reloadGame;
    SceneManager.reloadGame = function () {
        if (!Utils.isNwjs()) location.reload();
        SoR_CR_SM_reloadGame.call(this);
    }

    const SoR_CR_Input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function (event) {

        if (event.keyCode == 116) {
            event.preventDefault();
            return false;
        }
        SoR_CR_Input_onKeyDown.call(this, ...arguments);
    }

}());