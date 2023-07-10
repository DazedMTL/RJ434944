//=============================================================================
// MainMenuChange.js
//=============================================================================

/*:
 * @plugindesc メニュー画面入れ替えプラグイン
 * @target MZ
 * @author AGNES
 *
 * @param OptionChange
 * @text オプション入れ替え
 * @desc オプションと並び替えを入れ替えます。(0:入れ替えない、1:入れ替える)
 * @default 0
 * @type Number
 * @max 1
 * @min 0
 *
 * @help MainMenuChange.js
 *
 * メインメニュー画面の項目を任意に入れ替えることができます。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(() => {
    'use strict';
    const pluginName = "MainMenuChange";

    const parameters = PluginManager.parameters(pluginName);
    const OptionChange = Number(parameters['OptionChange'] || 0);

    const _Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function () {
        _Window_MenuCommand_makeCommandList.aplly(this, arguments);
    };

    Window_MenuCommand.prototype.makeCommandList = function () {
        if (OptionChange !== 0) {
            this.addMainCommands();
            this.addOptionsCommand();
            this.addOriginalCommands();
            this.addFormationCommand();
            this.addSaveCommand();
            this.addGameEndCommand();
            // 22/07/24 add start
            this.addMapTravel();
            // 22/07/24 add end
        } else {
            this.addMainCommands();
            this.addFormationCommand();
            this.addOriginalCommands();
            this.addOptionsCommand();
            this.addSaveCommand();
            this.addGameEndCommand();
        }
    };
})();
