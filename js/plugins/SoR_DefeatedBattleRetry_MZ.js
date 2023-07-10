//=============================================================================
// SoR_DefeatedBattleRetry_MZ.js
// SoR License (C) 2020 蒼竜, REQUIRED User Registration on Dragon Cave
// http://dragonflare.blue/dcave/license.php
// ----------------------------------------------------------------------------
// Latest version v1.10 (2021/11/01)
//=============================================================================
/*:ja
@plugindesc ＜敗北時バトルリトライ＞ v1.10
@author 蒼竜
@target MZ
@orderAfter SoR_BattleTeminationRefactor_MZ
@orderAfter SoR_DefeatedWindow_MZ
@base SoR_BattleTeminationRefactor_MZ
@url http://dragonflare.blue/dcave/
@help ※要「戦闘終了処理ルーチン細分化」(SoR_BattleTeminationRefactor_MZ.js)

戦闘敗北時に、当該戦闘に直ちに再挑戦するための機能を実装します。
デフォルト実装のゲームオーバー画面の遷移は取り外し、
「戦闘画面・シーンから直接選択・遷移する」形式となります。

リトライ選択時はメニュー画面に一度遷移して、
プレイヤーが準備を行った後に再戦処理となります。
@param ---全般---
@param ImageFile_GameOver
@desc 全滅シーン背景に表示するゲームオーバー画像 (default: "gameover")
@type file
@dir img/SoRBatHUD/
@default gameover
@param EnableBattleRetry_Default
@desc true: リトライ可能な状態でゲームスタートする (default: false)
@default false
@type boolean
@param RetryWindow_PaddY
@desc リトライウィンドウy座標補正 (default: -80)
@default -80
@min -9999
@type number
@param RetryWindow_width
@desc リトライウィンドウ横幅 (default: 500)
@default 500
@type number
@param StopBGM_onMenuFromRetry
@desc true: リトライからのメニュー遷移時、BGM再生を止める (default: false)
@default false
@type boolean
@param ConfirmWindowOnMenu_width
@desc メニュー画面上確認ウィンドウ横幅 (default: 500)
@default 500
@type number
@param ---コマンド---
@param CommandText_Retry
@desc 「戦闘をやり直す」コマンド名
@default 再挑戦する
@type string
@param CommandText_LoadGame
@desc 「ロード」コマンド名
@default データをロードする
@type string
@param CommandText_Exit
@desc 「終了」コマンド名
@default タイトルに戻る
@type string

@param Command_HelpTexts
@desc 各コマンドに対応するヘルプテキスト(Retry/LoadGame/Exit)
@default ["","",""]
@type string[]

@param ---メニューコマンド---
@param CommandText_Confirm
@desc メニュー終了時、戦闘再開確認テキスト
@default メニューを終了してもよろしいですか？
@type string
@param CommandText_Yes
@desc 再開確認テキスト(OK)
@default はい
@type string
@param CommandText_No
@desc 再開確認テキスト(NO)
@default いいえ
@type string

@command ChangeRetryPermission
@text リトライ可能設定変更 [敗北時バトルリトライ]
@desc 敗北不可戦闘における、全滅時のリトライ可否を変更します。
@arg enabled
@desc true: 可能にする, false: 不可能にする
@default true
@type boolean
*/
/*:
@plugindesc <Defeated Battle Retry> v1.10
@author Soryu
@target MZ
@orderAfter SoR_DefeatedWindow_MZ
@base SoR_BattleTeminationRefactor_MZ
@orderAfter SoR_BattleTeminationRefactor_MZ
@url http://dragonflare.blue/dcave/index_e.php
@help [Prerequisite] SoR_BattleTeminationRefactor_MZ
This plugin implements a system to retry defeated battles with related processes.

When the party is defeated, a command to retry or load/exit is appeared 
on the battle screen and directly transfer to the another scene.
Default gameover scene is eliminated. Before the battle retry, 
players can use menu scene.

@param ---General---
@param ImageFile_GameOver
@desc GameOver Image on the background (default: "gameover")
@type file
@dir img/SoRBatHUD/
@default gameover
@param EnableBattleRetry_Default
@desc If true, battle retry when defeated is initially enabled. (default: false)
@default false
@type boolean
@param RetryWindow_PaddY
@desc Padding for y-coordinate of a retry command window (default: -80)
@default -80
@min -9999
@type number
@param RetryWindow_width
@desc Width of a retry command window (default: 500)
@default 500
@type number
@param StopBGM_onMenuFromRetry
@desc If true, stop the BGM on the menu transferred from defeated battles. (default: false)
@default false
@type boolean
@param ConfirmWindowOnMenu_width
@desc Width of a confirmation window in the menu scene (default: 500)
@default 500
@type number
@param ---Commands---
@param CommandText_Retry
@desc Command Text for "retry"
@default Retry the Battle
@type string
@param CommandText_LoadGame
@desc Command Text for "load"
@default Load Game
@type string
@param CommandText_Exit
@desc Command Text for "Exit"
@default Return to the Title
@type string

@param Command_HelpTexts
@desc Help Text associated with each command in the retry window (Retry/LoadGame/Exit)
@default ["","",""]
@type string[]

@param ---Menu Commands---
@param CommandText_Confirm
@desc Confirmation Text on the Menu from before restart
@default Ready to retry?
@type string
@param CommandText_Yes
@desc Text (OK) of the command on the Menu from before restart
@default Yes
@type string
@param CommandText_No
@desc Text (No) of the command on the Menu from before restart
@default No
@type string

@command ChangeRetryPermission
@text Change Retry Permission [Defeated Battle Retry]
@desc Switch the eligiblity of battle retry in when the party is defeated.
@arg enabled
@desc true: Enable, false: Disable
@default true
@type boolean
*/
(function () {
    const pluginName = "SoR_DefeatedBattleRetry_MZ";
    const Param = PluginManager.parameters(pluginName);

    if (!PluginManager._scripts.includes("SoR_BattleTeminationRefactor_MZ")) throw new Error("[SoR_DefeatedBattleRetry_MZ] This plugin REQUIRES SoR_BattleTeminationRefactor_MZ.");

    const ImageFile_GameOver = String(Param['ImageFile_GameOver']) || '';
    const EnableBattleRetry_Default = Boolean(Param['EnableBattleRetry_Default'] === 'true' || false);
    const RetryWindow_PaddY = Number(Param['RetryWindow_PaddY']) || 60;
    const RetryWindow_width = Number(Param['RetryWindow_width']) || 500;
    const StopBGM_onMenuFromRetry = Boolean(Param['StopBGM_onMenuFromRetry'] === 'true' || false);
    const ConfirmWindowOnMenu_width = Number(Param['ConfirmWindowOnMenu_width']) || 500;

    const CommandText_Retry = String(Param['CommandText_Retry']) || "";
    const CommandText_LoadGame = String(Param['CommandText_LoadGame']) || "";
    const CommandText_Exit = String(Param['CommandText_Exit']) || "";
    const Command_HelpTexts = convertJsonParam(Param['Command_HelpTexts']) || [];

    const CommandText_Confirm = String(Param['CommandText_Confirm']) || "";
    const CommandText_Yes = String(Param['CommandText_Yes']) || "";
    const CommandText_No = String(Param['CommandText_No']) || "";

    function convertJsonParam(param) {
        if (param == undefined) return [];
        let arr = [];
        JSON.parse(param).map(function (param) {
            arr.push(param);
        });
        return arr;
    }

    ImageManager.loadBattleHudSprite = function (filename) {
        return this.loadBitmap('img/SoRBatHUD/', filename, 0, true);
    }

    PluginManager.registerCommand(pluginName, "ChangeRetryPermission", args => {
        $gameSystem._EnableDefeatedRetry = Boolean(args.enabled === 'true' || false);
    });

    ////////////////////////////////////////////////////////////////
    const SoR_SBR_GS_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        SoR_SBR_GS_initialize.call(this);
        this.InitializeBattleDefeatedSetting();
    }

    Game_System.prototype.InitializeBattleDefeatedSetting = function () {
        SoR_SBR_GS_initialize.call(this);
        this._EnableDefeatedRetry = EnableBattleRetry_Default;
    }




    const SoR_SBR_BM_TerminateLostBattle = BattleManager.TerminateLostBattle;
    BattleManager.TerminateLostBattle = function () {//end
        if (this._canLose) SoR_SBR_BM_TerminateLostBattle.call(this);
        else {//cannot Lose
            if (!this.isBusy() && typeof this._defeatedSelectWindow === "undefined") {
                SceneManager._scene.createDefeatedSelectionWindow();
                this._defeatedSelectWindow.activate();
                this._defeatedSelectWindow.open();
            }
        }
    }

    const SoR_DBR_BM_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function () {
        $gameTemp.Retry_tmpParty = {
            item: copyTMPData($gameParty._items), wp: copyTMPData($gameParty._weapons), am: copyTMPData($gameParty._armors), gd: $gameParty._gold,
            flag: false, vari: copyTMPData($gameVariables._data), sw: copyTMPData($gameSwitches._data), ssw: copyTMPData($gameSelfSwitches._data), ssw2: copyTMPData($gameSelfSwitches._variableData),
            cansave: copyTMPData($gameSystem._saveEnabled)
        };
        SoR_DBR_BM_startBattle.call(this);
    }

    BattleManager.displayDefeatMessage = function () { }

    const SoR_DBR_BM_playBattleBgm = BattleManager.playBattleBgm;
    BattleManager.playBattleBgm = function () {
        if ($gameTemp.SoR_DBR_ReturnLoad === true) return;
        SoR_DBR_BM_playBattleBgm.call(this);
    }

    const SoR_DBR_BM_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function () {
        if ($gameTemp.SoR_DBR_ReturnLoad === true) return;
        SoR_DBR_BM_displayStartMessages.call(this);
    }


    const SoR_DBR_BM_BattleManager_ProcessDefeatedMessage = BattleManager.ProcessDefeatedMessage;
    BattleManager.ProcessDefeatedMessage = function () {
        if ($gameTemp.SoR_DBR_ReturnLoad === true) {
            if (this._defeatedMesWindow) {
                //this.ProcessDefeatedZingles();
                this._defeatedMesWindow._timer = 0;
                this._defeatedMesWindow.showfinished = true;
            }
        }
        SoR_DBR_BM_BattleManager_ProcessDefeatedMessage.call(this);
    }


    function copyTMPData(input) {
        if (!input) return undefined;
        return JSON.parse(JSON.stringify(input));
    }


    /////////////////////////////////////////////////////////////////////////
    //register

    const SoR_DBR_SB_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function () {
        SoR_DBR_SB_createAllWindows.call(this);
        this._defeatedSelectWindow = undefined;
        BattleManager.setDefeatedSelectWindow(this._defeatedSelectWindow);
        //this.createDefeatedSelectionWindow();
    }


    //Create Window
    Scene_Battle.prototype.createDefeatedSelectionWindow = function () {
        this._defeatedSelectWindow = new Window_DefeatedSelection();
        this._defeatedSelectWindow.visible = true;
        if ($gameSystem._EnableDefeatedRetry) this._defeatedSelectWindow.setHandler("restartBattle", this.SoR_restartBattle.bind(this));
        this._defeatedSelectWindow.setHandler("loadgame", this.SoR_loadgame.bind(this));
        this._defeatedSelectWindow.setHandler("gototitle", this.SoR_gototitle.bind(this));
        this.addChild(this._defeatedSelectWindow.gameoverspr);
        this.addChild(this._defeatedSelectWindow);
        BattleManager.setDefeatedSelectWindow(this._defeatedSelectWindow);

        this._defeatedCommandHelpWindow = new Window_DefeatedCommandHelp();
        this._defeatedCommandHelpWindow.visible = true;
        this.addChild(this._defeatedCommandHelpWindow);
        this._defeatedSelectWindow.sethelpwindow(this._defeatedCommandHelpWindow);
        this._defeatedCommandHelpWindow.setup(0);
    }


    //Set Window
    BattleManager.setDefeatedSelectWindow = function (window) {
        this._defeatedSelectWindow = window;
    }


    ////////////////////////////////////////////////////////////////
    Scene_Battle.prototype.SoR_restartBattle = function () {
        this.SoR_restoreRetry();
        $gameTroop.TemporaryRestore_restart();
        SceneManager.push(Scene_Menu);
    }

    const SoR_DBR_SM_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
        if ($gameTemp.Retry_tmpParty && $gameTemp.Retry_tmpParty.flag == true) {
            for (x of $gameParty.members()) x.recoverAll();
        }

        SoR_DBR_SM_create.call(this);

        if ($gameTemp.Retry_tmpParty && $gameTemp.Retry_tmpParty.flag == true) {
            this.createConfirmRetryWindow();
            if (StopBGM_onMenuFromRetry) AudioManager.stopBgm();
        }
    }


    Scene_Battle.prototype.SoR_restoreRetry = function () {
        $gameParty._items = copyTMPData($gameTemp.Retry_tmpParty.item);
        $gameParty._weapons = copyTMPData($gameTemp.Retry_tmpParty.wp);
        $gameParty._armors = copyTMPData($gameTemp.Retry_tmpParty.am);
        $gameParty._gold = $gameTemp.Retry_tmpParty.gd;
        $gameVariables._data = copyTMPData($gameTemp.Retry_tmpParty.vari);
        $gameSwitches._data = copyTMPData($gameTemp.Retry_tmpParty.sw); 1
        $gameSelfSwitches._data = copyTMPData($gameTemp.Retry_tmpParty.ssw);
        $gameSelfSwitches._variableData = copyTMPData($gameTemp.Retry_tmpParty.ssw2);
        $gameTemp.Retry_tmpParty.flag = true;
        $gameSystem.disableSave();
    }

    Game_Troop.prototype.TemporaryRestore_restart = function () {
        this._interpreter.clear();
        this._eventFlags = {};
        this._turnCount = 0;
        for (const member of this._enemies) member.recoverAll();
    }

    Scene_Battle.prototype.SoR_loadgame = function () {
        $gameTemp.SoR_DBR_ReturnLoad = true;
        SceneManager.push(Scene_Load);
    }


    const SoR_DBR_SL_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function () {
        if (typeof $gameTemp.SoR_DBR_ReturnLoad !== "undefined") {
            $gameTemp.Retry_tmpParty.flag = false;
            $gameTemp.Retry_tmpParty.pt = null;
            $gameTemp.SoR_DBR_ReturnLoad = undefined;
        }
        SoR_DBR_SL_onLoadSuccess.call(this);
    }


    Scene_Battle.prototype.SoR_gototitle = function () {
        $gameTemp.SoR_DBR_ReturnLoad = undefined;
        this.fadeOutAll();
        SceneManager.goto(Scene_Title);
        Window_TitleCommand.initCommandPosition();
    }

    Scene_Menu.prototype.popScene = function () {
        if ($gameTemp.Retry_tmpParty && $gameTemp.Retry_tmpParty.flag == true) {
            this._confirmwindow.activate();
            this._confirmwindow.open();
        }
        else Scene_MenuBase.prototype.popScene.call(this);
    }


    ////////////////////////////////////////////////////////////////
    function Window_DefeatedSelection() {
        this.initialize.apply(this, arguments);
    }
    Window_DefeatedSelection.prototype = Object.create(Window_Command.prototype);
    Window_DefeatedSelection.prototype.constructor = Window_DefeatedSelection;

    Window_DefeatedSelection.prototype.initialize = function () {
        const width = RetryWindow_width;
        const height = $gameSystem._EnableDefeatedRetry ? 160 : 112;
        const x = (Graphics.boxWidth - width) / 2;
        const y = Graphics.boxHeight - height + RetryWindow_PaddY;

        Window_Command.prototype.initialize.call(this, new Rectangle(x, y, width, height));
        this.openness = 0;
        this.active = false;

        if (ImageFile_GameOver != "") this.gameoverspr = new Sprite(ImageManager.loadBattleHudSprite(ImageFile_GameOver));
        else this.gameoverspr = new Sprite();
        this.gameoverspr.opacity = 1;
    }

    Window_DefeatedSelection.prototype.maxItems = function () { return this._list.length; }
    Window_DefeatedSelection.prototype.needsCommand = function (name) { return true; }
    Window_DefeatedSelection.prototype.needsSelection = function () { return true; }
    Window_DefeatedSelection.prototype.makeCommandList = function () {
        if ($gameSystem._EnableDefeatedRetry) this.addCommand(CommandText_Retry, "restartBattle");
        this.addCommand(CommandText_LoadGame, "loadgame");
        this.addCommand(CommandText_Exit, "gototitle");
    }

    Window_DefeatedSelection.prototype.sethelpwindow = function (w) { this._helpwindow = w; }

    Window_DefeatedSelection.prototype.callUpdateHelp = function () {
        if (this.active && this._helpwindow) {
            this._helpwindow.updateHelp(this.index());
        }
    }

    Window_DefeatedSelection.prototype.processOk = function () {
        Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    }

    Window_DefeatedSelection.prototype.update = function () {
        Window_Command.prototype.update.call(this);
        if (this.gameoverspr.opacity < 255) this.gameoverspr.opacity += 5;
        else this.gameoverspr.opacity = 255;
    }

    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////

    function Window_DefeatedCommandHelp() {
        this.initialize.apply(this, arguments);
    }
    Window_DefeatedCommandHelp.prototype = Object.create(Window_Base.prototype);
    Window_DefeatedCommandHelp.prototype.constructor = Window_DefeatedCommandHelp;


    Window_DefeatedCommandHelp.prototype.initialize = function () {
        this._text = '';
        this.item = null;
        const x = -12;
        const y = Graphics.height - 50;
        const width = Graphics.boxWidth;
        const height = 64;
        this.visible = true;
        Window_Base.prototype.initialize.call(this, new Rectangle(x, y, width, height));
        this.setBackgroundType(2);
        this.openness = 255;
    }

    Window_DefeatedCommandHelp.prototype.contentsHeight = function () { return this.height; }
    Window_DefeatedCommandHelp.prototype.standardPadding = function () { return 2; }

    Window_DefeatedCommandHelp.prototype.setup = function (id) {
        this._text = '';
        this.setText(id);
        this.visible = true;
        this.openness = 255;
    }

    Window_DefeatedCommandHelp.prototype.updateHelp = function (id) {
        this.setText(id);
    }

    Window_DefeatedCommandHelp.prototype.setText = function (id) {
        if (!$gameSystem._EnableDefeatedRetry) id = id + 1;
        this._text = Command_HelpTexts[id];
        this.refresh();
    }

    Window_DefeatedCommandHelp.prototype.refresh = function () {
        this.contents.clear();
        this.DrawBackground();

        this.contents.fontSize = 18;
        this.drawText(this._text, 15, 0, this.width, 'left');
        this.resetFontSettings();
    }

    Window_DefeatedCommandHelp.prototype.close = function () {
        Window_Base.prototype.close.call(this);
        this._text = '';
    }

    Window_DefeatedCommandHelp.prototype.DrawBackground = function () {
        var color1 = ColorManager.dimColor1();
        var color2 = ColorManager.dimColor2();
        this.contents.fillRect(0, 0, this.width / 2, this.height, color1);
        this.contents.gradientFillRect(this.width / 2, 0, this.width / 2, this.height, color1, color2);
    }




    ////////////////////////////////////////////////////////////////
    Scene_Menu.prototype.createConfirmRetryWindow = function () {
        const rect = this.commandWindowRect();
        const confirmwindow = new Window_DefeatedRestartConfirm();

        confirmwindow.setHandler("battlestart", this.RestartBattleScene.bind(this));
        confirmwindow.setHandler("cancel", this.keepMenuScene.bind(this));
        this.addWindow(confirmwindow);
        this._confirmwindow = confirmwindow;
    }

    Scene_Menu.prototype.keepMenuScene = function () {
        this._confirmwindow.deactivate();
        this._confirmwindow.close();
        this._commandWindow.activate();
    }

    Scene_Menu.prototype.RestartBattleScene = function () {
        this._confirmwindow.deactivate();
        this._confirmwindow.close();
        if ($gameTemp.Retry_tmpParty.cansave) $gameSystem.enableSave();
        $gameTemp.Retry_tmpParty.flag = false;
        $gameTemp.Retry_tmpParty.pt = null;
        $gameTemp.SoR_DBR_ReturnLoad = undefined;
        $gameTroop.setup($gameTroop._troopId); ///
        Scene_MenuBase.prototype.popScene.call(this);
    }

    function Window_DefeatedRestartConfirm() {
        this.initialize.apply(this, arguments);
    }
    Window_DefeatedRestartConfirm.prototype = Object.create(Window_Command.prototype);
    Window_DefeatedRestartConfirm.prototype.constructor = Window_DefeatedRestartConfirm;

    Window_DefeatedRestartConfirm.prototype.initialize = function () {
        const width = ConfirmWindowOnMenu_width;
        const height = 160;
        const x = (Graphics.width - width) / 2;
        const y = (Graphics.boxHeight - height) / 2;

        Window_Command.prototype.initialize.call(this, new Rectangle(x, y, width, height));
        this.openness = 0;
        this.active = false;
    }

    Window_DefeatedRestartConfirm.prototype.maxItems = function () { return this._list.length; }
    Window_DefeatedRestartConfirm.prototype.needsCommand = function (name) { return true; }
    Window_DefeatedRestartConfirm.prototype.needsSelection = function () { return true; }
    Window_DefeatedRestartConfirm.prototype.makeCommandList = function () {
        this.addCommand(CommandText_Yes, "battlestart");
        this.addCommand(CommandText_No, "cancel");
    }

    Window_DefeatedRestartConfirm.prototype.drawAllItems = function () {
        this.drawHeadTitle();

        const topIndex = this.topIndex();
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            const index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItemBackground(index + 1);
                this.drawItem(index);
            }
        }
    }

    Window_DefeatedRestartConfirm.prototype.drawHeadTitle = function () {
        const rect = this.itemLineRect(-1);
        const align = this.itemTextAlign();
        this.resetTextColor();
        this.drawText(CommandText_Confirm, rect.x, rect.y, rect.width, align);
    }

    Window_DefeatedRestartConfirm.prototype.itemLineRect = function (index) {
        const rect = this.itemRectWithPadding(index + 1);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding;
        rect.height -= padding * 2;
        return rect;
    }

    Window_DefeatedRestartConfirm.prototype.refreshCursor = function () {
        const rect = this.itemRect(this.index() + 1);
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    }

    Window_DefeatedRestartConfirm.prototype.processOk = function () {
        Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    }
})();