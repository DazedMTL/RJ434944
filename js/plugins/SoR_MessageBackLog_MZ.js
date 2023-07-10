//=============================================================================
// SoR_MessageBackLog_MZ.js
// SoR License (C) 2020 蒼竜, REQUIRED User Registration on Dragon Cave
// http://dragonflare.blue/dcave/license.php
// ---------------------------------------------------------------------------
// Latest version v1.45 (2023/03/08)
//=============================================================================
/*:ja
@plugindesc ＜メッセージバックログ＞ v1.45
@author 蒼竜
@target MZ
@url http://dragonflare.blue/dcave/
@orderAfter SoR_GabWindow_MZ_Left
@orderAfter SoR_GabWindow_MZ_Right
@orderAfter SoR_MessageExtension_MZ
@help ゲーム中に表示されたメッセージを蓄積し、
マップ上でそのログを閲覧するシーンを実装します。

9.「おしゃべりポップアップ」(SoR_GabWindow)導入時、
表示されたメッセージを通常メッセージと独立に蓄積することができます。
さらに、13.「メッセージウィンドウ拡張」(SoR_MessageExtension)導入時、
ルビ情報も記録・ログ上に表示します。

バックログは、プラグインコマンドまたはプラグインパラメータで
指定したキー入力で起動できます。スクリプトからの直接起動もできます。
----------------------------------------------------------------------
[v1.40以降]

他者作プラグインによって制御文字が追加されている場合、ログ蓄積と
一斉表示のみを目的としている「バックログ」が制御に対応しない場合があります。
他者作プラグイン定義の制御文字がバックログに取り残される場合は、
各自で"DeleteSequenceList"にログ上から削除したい制御文字を
設定していただきます。

@param -----基本設定-----
@param Header_Style
@desc ログ上部ヘッダー(シーンタイトルバー) (default: 0)
@type select
@option 標準スキンによるウィンドウ
@value 0
@option 独自画像を利用
@value 1
@default 0

@param HeaderWindow_Text
@desc ヘッダー内テキスト。ウィンドウスキンを使用する場合のみ有効 (default: Message Log)
@default Message Log
@type string
@param Header_OriginalImage
@desc ヘッダー画像。独自画像を使用する場合のみ有効 (default: msglog_bg)
@type file
@dir img/system/
@default msglog_bg

@param HelpWindow_Text
@desc 操作ヘルプウィンドウ内に表示するテキスト、制御文字使用可能 (default: PageDown: 最新  PageUp: 末尾)
@default PageDown: 最新  PageUp: 末尾
@type string

@param Background_OriginalImage
@desc 背景画像。空欄で無効，デフォルトメニュー同等のブラー処理 (default: none)
@type file
@dir img/system/
@default 

@param BackgroundSkin_LogWindow
@desc ログ表示に用いるウィンドウに使用するウィンドウスキン画像 (default: Window)
@type file
@dir img/system/
@default Window

@param EnableAccumulate_BattleMessage
@desc true:戦闘中のシステムメッセージをログに記録する。基本的にfalse推奨 (default: false)
@default false
@type boolean

@param ---操作演出---
@param BackLog_TriggerKey
@desc マップ上でのバックログ起動キー，空欄で無効 (default: pageup)
@default pageup
@type string

@param SE_OpenBackLog
@desc バックログ起動時の効果音，無指定で通常の「決定音」
@dir audio/se/
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param SE_CloseBackLog
@desc バックログ終了時の効果音，無指定で通常の「キャンセル音」
@dir audio/se/
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param SE_BackLogCursor
@desc バックログ内カーソル移動時の効果音，無指定で通常の「カーソル音」
@dir audio/se/
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param ---ログ詳細設定---
@param SpeakerName_Color
@desc 話者をログ上に記録する時の文字色 RGB値 (default: #ffff00)
@default #ffff00
@type string
@param MessageSplit_Color
@desc 罫線(各メッセージごとの区切り線)の中央部分の色 RGB値 (default: #0000ff)
@default #0000ff
@type string
@param Max_MessageStore
@desc メッセージログの最大蓄積数。これ以上は古いものから破棄 (default: 100)
@default 100
@type number

@param EnableSave_BackLog
@desc バックログの内容をセーブデータに保持する。falseだとロード毎にログは初期化される (default: true)
@default true
@type boolean

@param ---UI配置微調整---
@param LogWindowWidth
@desc メッセージログウィンドウ横幅，デザイン・ゲーム内実装に応じて要調整 (default: 700)
@default 700
@type number

@param HelpWindow_Ypadd
@desc 操作ヘルプウィンドウのy座標，ヘッダーのスタイルに応じて要調整 (default: 56)
@default 56
@type number
@min -9999
@param ControlHelpText_XPadd
@desc 操作ヘルプウィンドウ内のテキストのx座標補正 (default: 36)
@default 36
@type number
@min -9999

@param ScrollBar_Xpadd
@desc ログ内スクロールバーのx座標補正 (default: 108)
@default 108
@type number
@min -9999
@param ScrollBar_Ypadd
@desc ログ内スクロールバーのy座標補正 (default: -18)
@default -18
@type number
@min -9999
@param ScrollBar_Width
@desc ログ内スクロールバーの横幅 (default: 12)
@default 12
@type number

@param SplitLine_YPadd
@desc メッセージごとの区切り線の位置，y座標補正 (default: -5)
@default -5
@type number
@min -9999
@param SplitLine_WidthPadd
@desc メッセージごとの区切り線の幅補正  正で内側に縮み，負で外側に拡大 (default: -60)
@default -60
@type number
@min -9999

@param -おしゃべりポップアップ併用-
@param CollectLog_SoR_GabWindow
@desc 「おしゃべりポップアップ」導入時，そのログを別途収集・表示します (default: true)
@default true
@type boolean

@param Text_MessageLogCursor
@desc 通常メッセージ側ログを表すコマンド名 (default: メッセージ)
@default メッセージ
@type string
@param Text_GabLogCursor
@desc 「おしゃべりポップアップ」テキスト側ログを表すコマンド名 (default: チャット)
@default チャット
@type string

@param LogtypeTab_Xpadd
@desc 表示ログタイプ切り替えコマンドウィンドウ 表示位置x座標補正値 (default: -240)
@default -240
@type number
@min -9999
@param LogtypeTab_Ypadd
@desc 表示ログタイプ切り替えコマンドウィンドウ 表示位置y座標補正値 (default: 28)
@default 28
@type number
@min -9999

@param LogtypeTab_width
@desc 表示ログタイプ切り替えコマンドウィンドウ 横幅サイズ (default: 296)
@default 296
@type number
@min 1
@param LogtypeTab_height
@desc 表示ログタイプ切り替えコマンドウィンドウ 縦幅サイズ (default: 50)
@default 50
@type number
@min 1
@param LogtypeTab_fontSize
@desc 表示ログタイプ切り替えコマンドウィンドウ 内部テキストフォントサイズ (default: 16)
@default 16
@type number
@min 1



@param FacePos_Xpadd
@desc 「おしゃべりポップアップ」ログ内の顔グラフィック位置，右端基準 x座標補正値 (default: 0)
@default 0
@type number
@min -9999
@param FacePos_Ypadd
@desc 「おしゃべりポップアップ」ログ内の顔グラフィック位置，下端基準 y座標補正値 (default: 0)
@default 0
@type number
@min -9999
@param SE_ShiftPageType
@desc メッセージ・おしゃべりポップアップのページ切替音，無指定で通常の「カーソル音」 (default: none)
@dir audio/se/
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param -その他-
@param MouseTrigger
@desc マウスホイールによるバックログ起動トリガー (default: 0)
@type select
@option 無効
@value 0
@option 上回転
@value 1
@option 下回転
@value 2
@option 左傾倒
@value 3
@option 右傾倒
@value 4
@option 上下回転どちらも可
@value 5
@default 0

@param CancelButton_PaddX
@desc タッチUI用キャンセルボタン配置 x座標補正値 (default: 0)
@default 0
@type number
@min -9999
@param CancelButton_PaddY
@desc タッチUI用キャンセルボタン配置 y座標補正値 (default: 0)
@default 0
@type number
@min -9999

@param DeleteSequenceList
@type struct<DELCSEQ>[]
@desc 他者作プラグイン等に実装された、「バックログに含まれたくない」特殊制御文字のリスト
@default []

@command Launch_BackLog
@text ログ画面表示[メッセージバックログ]
@desc その場でログ画面を起動します。
@command StopAccumulate
@text ログ記録一時停止[メッセージバックログ]
@desc 全てのメッセージのログへの記録を一時的に無効化します。
@command RestartAccumulate
@text ログ記録再開[メッセージバックログ]
@desc 停止中のメッセージログ記録を再開します。
@command ResetLogMes
@text ログリセット[メッセージバックログ]
@desc ログ記録を初期化します(開発中デバッグ用途想定)。

@command FlagBacklogOpen
@text バックログ起動許可設定 [メッセージバックログ]
@desc バックログ起動の一時禁止・許可状態を変更します(デフォルトでは必要ありません)。
@arg enabled
@desc true: 許可する, false: 禁止(入力しても無視)する
@default true
@type boolean
*/
/*:
@plugindesc <Message Backlog> v1.45
@author Soryu
@target MZ
@url http://dragonflare.blue/dcave/index_e.php
@orderAfter SoR_GabWindow_MZ_Left
@orderAfter SoR_GabWindow_MZ_Right
@orderAfter SoR_MessageExtension_MZ
@help This plugin accumlates messages drawn in message windows during the game 
to view them in the backlog viewer scene. With SoR_GabWindow, gab texts are 
also accumlated and seen in an additional log window. Furthermore, with 
SoR_MessageExtension, ruby given to texts are also shown in the log window.

The backlog scene can be activated by plugin commands,
a script command, and any keys registered in the plugin parameter.

------------------------------------------------------------------------
[After v1.40]

This backlog mechanism cannot pursue control sequences defined by 
other developer's plugins. This is because the machanism is 
constructed from minimum window structure to avoid risk of conflict. 
When you encoutner a situations that specific control sequences 
remain in the log text, you can eliminate them by setting 
in a plugin parameter "DeleteSequenceList".
@param -----Basic-----
@param Header_Style
@desc Header shown at the upper in the scene (Log scene title) (default: 0)
@type select
@option Window using a default skin
@value 0
@option Original image for the header
@value 1
@default 0

@param HeaderWindow_Text
@desc Text in the header. Only for the window using default skin (default: Message Log)
@default Message Log
@type string
@param Header_OriginalImage
@desc Header image source. Only for using the original image (default: msglog_bg)
@type file
@dir img/system/
@default msglog_bg

@param HelpWindow_Text
@desc Texts in the help window in the log scene (default: PageDown: newest  PageUp: oldest)
@default PageDown: newest  PageUp: oldest
@type string

@param Background_OriginalImage
@desc Background image in the scene. Nothing specified, a blur effect is applied as the default windows in RPGMaker. (default: none)
@type file
@dir img/system/
@default 

@param BackgroundSkin_LogWindow
@desc A window skin applied to text window fog logs (default: Window)
@type file
@dir img/system/
@default Window

@param EnableAccumulate_BattleMessage
@desc If true, system messages in battles are also accumulated in the log. (default: false)
@default false
@type boolean

@param ---Operation---
@param BackLog_TriggerKey
@desc A key to activate the log scene on the map. Set nothing to disable (default: pageup)
@default pageup
@type string

@param SE_OpenBackLog
@desc SE when the backlog is activated. Specify nothing to use default SE of decision. (default: none)
@dir audio/se/
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param SE_CloseBackLog
@desc SE when the backlog is closed. Specify nothing to use default SE of cancel. (default: none)
@dir audio/se/
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param SE_BackLogCursor
@desc SE when the cursor is moved in the log. Specify nothing to use default SE of cursor. (default: none)
@dir audio/se/
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param ----Log detail config----
@param SpeakerName_Color
@desc RGB color to write the speaker name in the log window (default: #ffff00)
@default #ffff00
@type string
@param MessageSplit_Color
@desc RGB color around the center of ruled line to split each message (default: #0000ff)
@default #0000ff
@type string
@param Max_MessageStore
@desc Maximum number of messages accumulated in the log. (default: 100)
@default 100
@type number

@param EnableSave_BackLog
@desc If true, the message log is stored in the save data. (default: true)
@default true
@type boolean

@param ----UI adjustment----
@param LogWindowWidth
@desc Width of each message log window. Adjust according to the game design, screen size, and volume of texts. (default: 700)
@default 700
@type number

@param HelpWindow_Ypadd
@desc Y-coordinate of help window in the scene (default: 56)
@default 56
@type number
@min -9999
@param ControlHelpText_XPadd
@desc Padding of the text in the help window for x-coordinate (default: 36)
@default 36
@type number
@min -9999

@param ScrollBar_Xpadd
@desc Padding of scroll bar for the log windows for x-coordinate (default: 108)
@default 108
@type number
@min -9999
@param ScrollBar_Ypadd
@desc Padding of scroll bar for the log windows for y-coordinate (default: -18)
@default -18
@type number
@min -9999
@param ScrollBar_Width
@desc Width of scroll bar for the log windows (default: 12)
@default 12
@type number

@param SplitLine_YPadd
@desc Padding of ruled lines to split each message for y-coordinate (default: -5)
@default -5
@type number
@min -9999
@param SplitLine_WidthPadd
@desc Padding for ruled lines for x-direction. The positive gets shorten. (default: -60)
@default -60
@type number
@min -9999

@param -with SoR_GabWindow-
@param CollectLog_SoR_GabWindow
@desc With SoR_Gab, accumlate the log for every gab. (default: true)
@default true
@type boolean
@param Text_MessageLogCursor
@desc Command Name for regular messages (default: Message)
@default Message
@type string
@param Text_GabLogCursor
@desc Command Name for gab messages (default: Gabs)
@default Gabs
@type string
@param LogtypeTab_Xpadd
@desc Padding for the window to handle the log type for x-coordinate (default: -240)
@default -240
@type number
@min -9999
@param LogtypeTab_Ypadd
@desc Padding for the window to handle the log type for y-coordinate (default: 28)
@default 28
@type number
@min -9999

@param LogtypeTab_width
@desc Width of the window to handle the log type (default: 296)
@default 296
@type number
@min 1
@param LogtypeTab_height
@desc Height of the window to handle the log type (default: 50)
@default 50
@type number
@min 1
@param LogtypeTab_fontSize
@desc Fontsize of internal texts in the log type window (default: 16)
@default 16
@type number
@min 1

@param FacePos_Xpadd
@desc Padding for the face drawn in the gab for x-coordinate. (default: 0)
@default 0
@type number
@min -9999
@param FacePos_Ypadd
@desc Padding for the face drawn in the gab for y-coordinate. (default: 0)
@default 0
@type number
@min -9999
@param SE_ShiftPageType
@desc SE to switch the log type. Specify nothing to use the default SE of cursor (default: none)
@dir audio/se/
@type struct<SEDATA>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param -Others-
@param MouseTrigger
@desc Trigger for backlog scene with mouse wheel operations (default: 0)
@type select
@option Invalid
@value 0
@option Scroll up
@value 1
@option Scroll down
@value 2
@option Till Left 
@value 3
@option Till Right
@value 4
@option Either up or down scroll
@value 5
@default 0

@param CancelButton_PaddX
@desc Padding for the cancel button in Touch UI for x-coordinate. (default: 0)
@default 0
@type number
@min -9999
@param CancelButton_PaddY
@desc Padding for the cancel button in Touch UI for y-coordinate. (default: 0)
@default 0
@type number
@min -9999

@param DeleteSequenceList
@type struct<DELCSEQE>[]
@desc A list of control sequences "not be included to the backlog" mainly implemented by other developers plugins 
@default []

@command Launch_BackLog
@text Call Backlog[Message Backlog]
@desc Activate the backlog scene there.
@command StopAccumulate
@text Stop Log Accumulation[Message Backlog]
@desc Disable accumulation of message in the log.
@command Restart Accumulation
@text Restart Log Accumulation[Message Backlog]
@desc Restart accumulation of message in the log.
@command ResetLogMes
@text Initialize Log[Message Backlog]
@desc Clear all message logs (assumed to be used for debug under development).

@command FlagBacklogOpen
@text Open Log Permission [Message Backlog]
@desc Change the state of permission for backlog scene activation (no use in default).
@arg enabled
@desc true: enabled, false: temporary fobidden (ignore user inputs)
@default true
@type boolean
*/
/*~struct~SEDATA:
@type string
@param name
@dir audio/se/
@type file
@desc 効果音
@param volume
@desc 音量 [0...100]
@type number
@default 100
@min 0
@max 100
@param pitch
@desc ピッチ [50...150]
@type number
@default 100
@min 50
@max 150
@param pan
@desc パン(位相) [-50...50]
@type number
@default 0
@min -50
@max 50
*/
/*~struct~SEDATAE:
@param name
@dir audio/se/
@type file
@desc SE File
@param volume
@desc Voulme [0...100]
@type number
@default 100
@min 0
@max 100
@param pitch
@desc Pitch [50...150]
@type number
@default 100
@min 50
@max 150
@param pan
@desc Pan [-50...50]
@type number
@default 0
@min -50
@max 50
*/
/*~struct~DELCSEQ:
@param Sequence
@type string
@desc 削除する制御文字(バックスラッシュ不要、テキスト部分のみ)
@param SequenceType
@desc 削除する制御文字の記述形式
@type select
@option \hoge[xxx]形式
@value 0
@option \hoge形式 (引数なし)
@value 1
@default 0
@param Note
@desc 自由記述メモ欄 (例えば、どのプラグインのものかを記載する等)
@type string
*/
/*~struct~DELCSEQE:
@param Sequence
@type string
@desc A control sequence to be deleted (eliminate backslash)
@param SequenceType
@desc Format of the control sequence
@type select
@option \foo[bar]
@value 0
@option \foo (no argument)
@value 1
@default 0
@param Note
@desc Free text area (e.g. write a name of plugin where the sequence comes from.)
@type string
*/


var SoR = SoR || {};
(function () {
    "use strict";

    const pluginName = "SoR_MessageBackLog_MZ";
    const Param = PluginManager.parameters(pluginName);

    const Header_Style = Number(Param['Header_Style']) || 0;
    const HeaderWindow_Text = String(Param['HeaderWindow_Text']) || '';
    const Header_OriginalImage = String(Param['Header_OriginalImage']) || '';
    const HelpWindow_Text = String(Param['HelpWindow_Text']) || '';
    const HelpWindow_Ypadd = Number(Param['HelpWindow_Ypadd']) || 0;
    const Background_OriginalImage = String(Param['Background_OriginalImage']) || '';

    const EnableAccumulate_BattleMessage = Boolean(Param['EnableAccumulate_BattleMessage'] === 'true') || false;
    const BackLog_TriggerKey = String(Param['BackLog_TriggerKey']) || '';

    const SpeakerName_Color = String(Param['SpeakerName_Color']) || '';
    const MessageSplit_Color = String(Param['MessageSplit_Color']) || '';
    const Max_MessageStore = Number(Param['Max_MessageStore']) || 0;

    const EnableSave_BackLog = Boolean(Param['EnableSave_BackLog'] === 'true') || false;
    const CollectLog_SoR_GabWindow = Boolean(Param['CollectLog_SoR_GabWindow'] === 'true') || false;

    const LogWindowWidth = Number(Param['LogWindowWidth']) || 0;

    const ControlHelpText_XPadd = Number(Param['ControlHelpText_XPadd']) || 0;
    const ScrollBar_Xpadd = Number(Param['ScrollBar_Xpadd']) || 0;
    const ScrollBar_Ypadd = Number(Param['ScrollBar_Ypadd']) || 0;
    const ScrollBar_Width = Number(Param['ScrollBar_Width']) || 0;

    const SplitLine_YPadd = Number(Param['SplitLine_YPadd']) || 0;
    const SplitLine_WidthPadd = Number(Param['SplitLine_WidthPadd']) || 0;

    const Text_MessageLogCursor = String(Param['Text_MessageLogCursor']) || '';
    const Text_GabLogCursor = String(Param['Text_GabLogCursor']) || '';
    const FacePos_Xpadd = Number(Param['FacePos_Xpadd']) || 0;
    const FacePos_Ypadd = Number(Param['FacePos_Ypadd']) || 0;

    const LogtypeTab_Xpadd = Number(Param['LogtypeTab_Xpadd']) || 0;
    const LogtypeTab_Ypadd = Number(Param['LogtypeTab_Ypadd']) || 0;
    //v1.45
    const LogtypeTab_width = Number(Param['LogtypeTab_width']) || 0;
    const LogtypeTab_height = Number(Param['LogtypeTab_height']) || 0;
    const LogtypeTab_fontSize = Number(Param['LogtypeTab_fontSize']) || 0;



    const SE_ShiftPageType = convertJsonSE(Param['SE_ShiftPageType']) || '';
    const SE_OpenBackLog = convertJsonSE(Param['SE_OpenBackLog']) || '';
    const SE_CloseBackLog = convertJsonSE(Param['SE_CloseBackLog']) || '';
    const SE_BackLogCursor = convertJsonSE(Param['SE_BackLogCursor']) || '';
    const MouseTrigger = Number(Param['MouseTrigger']) || 0;

    //v1.40
    const BackgroundSkin_LogWindow = String(Param['BackgroundSkin_LogWindow']) || '';
    const CancelButton_PaddX = Number(Param['CancelButton_PaddX']) || 0;
    const CancelButton_PaddY = Number(Param['CancelButton_PaddY']) || 0;
    const DeleteSequenceList = convertJsonArray(Param['DeleteSequenceList']);



    let MB_Import_flag = 0;
    const IsGabReady = (PluginManager._scripts.includes("SoR_GabWindow_MZ_Left") || PluginManager._scripts.includes("SoR_GabWindow_MZ_Right")) || (PluginManager._scripts.includes("SoR_GabWindow_MZ_Left2") && PluginManager._scripts.includes("SoR_GabWindow_MZ_Right2"));
    const IsGab = IsGabReady && CollectLog_SoR_GabWindow;

    let LogAccumulationFlag = true;// temporal stop
    let SoR_MBLog_Isopen = true; //v1.20

    if (PluginManager._scripts.includes("SoR_MessageExtension_MZ")) MB_Import_flag += 1;
    if (IsGab) MB_Import_flag += 2;

    PluginManager.registerCommand(pluginName, "Launch_BackLog", args => {
        if (SE_OpenBackLog.name != "") AudioManager.playSe(SE_OpenBackLog);
        else SoundManager.playOk();
        SceneManager.push(Scene_MSGBackLog);
    });

    PluginManager.registerCommand(pluginName, "StopAccumulate", args => {
        LogAccumulationFlag = false;
    });
    PluginManager.registerCommand(pluginName, "RestartAccumulate", args => {
        LogAccumulationFlag = true;
    });
    PluginManager.registerCommand(pluginName, "ResetLogMes", args => {
        $gameTemp.InitMesBackLogStack();
    });

    PluginManager.registerCommand(pluginName, "FlagBacklogOpen", args => { //v1.20
        SoR_MBLog_Isopen = Boolean(args.enabled === 'true' || false);
    });

    let SystemLogAccumulationFlag = true;

    function convertJsonSE(param) {
        const obj = JSON.parse(param);
        obj.volume = Number(obj.volume);
        obj.pan = Number(obj.pan);
        obj.pitch = Number(obj.pitch);
        return obj;
    }

    function convertJsonArray(param) {
        if (param == undefined) return [];
        let arr = [];
        JSON.parse(param).map(function (param) {
            const obj = JSON.parse(param);
            obj.Sequence = obj.Sequence.trim();
            obj.SequenceType = Number(obj.SequenceType);
            delete obj.Note;
            arr.push(obj);
        });

        return arr;
    }

    DeleteSequenceList.push({ Sequence: "PX", SequenceType: 0 });
    DeleteSequenceList.push({ Sequence: "PY", SequenceType: 0 });
    DeleteSequenceList.push({ Sequence: "\x1b$", SequenceType: 1 });
    DeleteSequenceList.push({ Sequence: "\x1b.", SequenceType: 1 });
    DeleteSequenceList.push({ Sequence: "\x1b|", SequenceType: 1 });
    DeleteSequenceList.push({ Sequence: "!", SequenceType: 1 });
    DeleteSequenceList.push({ Sequence: ">", SequenceType: 1 });
    DeleteSequenceList.push({ Sequence: "<", SequenceType: 1 });
    DeleteSequenceList.push({ Sequence: "\x1b^", SequenceType: 1 });

    ///////////////////////////////////////////////////////////////////////
    // Process default battle messages
    ///////////////////////////////////////////////////////////////////////
    // v1.42
    // need more treatment
    const SoR_MSGB_GA_displayLevelUp = Game_Actor.prototype.displayLevelUp;
    Game_Actor.prototype.displayLevelUp = function (newSkills) {
        if ($gameParty.inBattle() && !EnableAccumulate_BattleMessage) SystemLogAccumulationFlag = false;
        SoR_MSGB_GA_displayLevelUp.call(this, ...arguments);
    }

    const SoR_MSGB_GA_showAddedStates = Game_Actor.prototype.showAddedStates;
    Game_Actor.prototype.showAddedStates = function () {
        if ($gameParty.inBattle() && !EnableAccumulate_BattleMessage) this.SoR_showAddedStates();
        SoR_MSGB_GA_showAddedStates.call(this);
    }

    const SoR_MSGB_GA_showRemovedStates = Game_Actor.prototype.showRemovedStates;
    Game_Actor.prototype.showRemovedStates = function () {
        if ($gameParty.inBattle() && !EnableAccumulate_BattleMessage) this.SoR_showRemovedStates();
        SoR_MSGB_GA_showRemovedStates.call(this);
    }


    Game_Actor.prototype.SoR_showAddedStates = function () {
        for (const state of this.result().addedStateObjects()) {
            if (state.message1) {
                SystemLogAccumulationFlag = false;
                $gameMessage.add(state.message1.format(this._name));
            }
        }
    }
    Game_Actor.prototype.SoR_showRemovedStates = function () {
        for (const state of this.result().removedStateObjects()) {
            if (state.message4) {
                SystemLogAccumulationFlag = false;
                $gameMessage.add(state.message4.format(this._name));
            }
        }
    }




    const SoR_MSGB_BM_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function () {
        if ($gameParty.inBattle() && !EnableAccumulate_BattleMessage) SystemLogAccumulationFlag = false;
        SoR_MSGB_BM_displayStartMessages.call(this);
    }

    const SoR_MSGB_BM_displayVictoryMessage = BattleManager.displayVictoryMessage;
    BattleManager.displayVictoryMessage = function () {
        if ($gameParty.inBattle() && !EnableAccumulate_BattleMessage) SystemLogAccumulationFlag = false;

        SoR_MSGB_BM_displayVictoryMessage.call(this);
    }

    const SoR_MSGB_BM_displayDefeatMessage = BattleManager.displayDefeatMessage;
    BattleManager.displayDefeatMessage = function () {
        if ($gameParty.inBattle() && !EnableAccumulate_BattleMessage) SystemLogAccumulationFlag = false;

        SoR_MSGB_BM_displayDefeatMessage.call(this);
    }

    const SoR_MSGB_BM_displayEscapeSuccessMessage = BattleManager.displayEscapeSuccessMessage;
    BattleManager.displayEscapeSuccessMessage = function () {
        if ($gameParty.inBattle() && !EnableAccumulate_BattleMessage) SystemLogAccumulationFlag = false;

        SoR_MSGB_BM_displayEscapeSuccessMessage.call(this);

    }

    const SoR_MSGB_BM_displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
    BattleManager.displayEscapeFailureMessage = function () {
        if ($gameParty.inBattle() && !EnableAccumulate_BattleMessage) SystemLogAccumulationFlag = false;

        SoR_MSGB_BM_displayEscapeFailureMessage.call(this);

    }

    const SoR_MSGB_BM_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function () {
        if ($gameParty.inBattle() && !EnableAccumulate_BattleMessage) SystemLogAccumulationFlag = false;

        SoR_MSGB_BM_displayRewards.call(this);
    }

    ////////////////////////////////////////////////////////////////////
    // Log accumulation process
    ////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.AccumulateLog = function (id, data) {
        if (!this.BackLogStack) this.InitMesBackLogStack();
        if (!LogAccumulationFlag) return;
        ////////////////////////////////////////////////////////
        data.text = this.DeleteCSQ_SoRBacklog(data.text);

        if (id == 0 && data.rb) {//padd mes rb (total lines -> each line)
            const rbl = data.rb.length;
            const tx = data.text.split('\n');
            let padL = tx[0].length;
            for (let i = 1; i < rbl; i++) {
                let nrb = data.rb[i].length;
                for (let j = 0; j < nrb; j++) {
                    data.rb[i][j].idx -= padL;
                    data.rb[i][j].idx2 -= padL;
                    //console.log(padL)
                }
                padL += tx[i].length;
            }
        }

        //accumulate
        if ($gameTemp.BackFromScene_BackLog && $gameTemp.BackFromScene_BackLog == true) {
            if (this.BackLogStack[id][0] == undefined) this.BackLogStack[id].unshift(data);
            else if (data.unq && this.BackLogStack[id][0].unq) {
                const test = this.BackLogStack[id][0].unq;// still depends on interpreter process...???
                if (data.unq.map != test.map || data.unq.evid != test.evid || data.unq.idx != test.idx) this.BackLogStack[id].unshift(data);
            }
            else if (this.BackLogStack[id][0].text != data.text) this.BackLogStack[id].unshift(data);
        }
        else this.BackLogStack[id].unshift(data);


        //dispose the oldest log
        if (this.BackLogStack[id].length > Max_MessageStore) this.BackLogStack[id].length = Max_MessageStore;
        $gameTemp.BackFromScene_BackLog = false;
    }


    Game_Temp.prototype.DeleteCSQ_SoRBacklog = function (text) {

        for (const sq of DeleteSequenceList) {
            let pattern;
            if (sq.SequenceType == 0) pattern = "\x1b" + sq.Sequence + "\\[(.*?)\\]";
            else pattern = "\x1b" + sq.Sequence;

            const reg = new RegExp(pattern, "gi");
            text = text.replace(reg, "");
        }

        text = text.replace(/\\/g, "\x1b\x1b");
        return text;
    }


    const SoR_MSGB_WM_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function () {
        SoR_MSGB_WM_terminateMessage.call(this);
        $gameTemp.BackFromScene_BackLog = false;
        SystemLogAccumulationFlag = true;
    }


    Game_Temp.prototype.CallBacklog = function () {
        if (!SoR_MBLog_Isopen) return; //disabled;

        if (SE_OpenBackLog.name != "") AudioManager.playSe(SE_OpenBackLog);
        else SoundManager.playOk();
        SceneManager.push(Scene_MSGBackLog);
    }


    Game_Temp.prototype.InitMesBackLogStack = function () {
        this.BackLogStack = [[], []];
    }

    const SoR_MSGB_WB_onEndOfText = Window_Message.prototype.onEndOfText;
    Window_Message.prototype.onEndOfText = function () { //for message
        // console.log(EnableAccumulate_BattleMessage + " " +SystemLogAccumulationFlag)
        if (!EnableAccumulate_BattleMessage && SystemLogAccumulationFlag == false);// console.log("bklog: ignored");
        else {

            let name = "";
            let rb = undefined;
            if (this._nameBoxWindow._name != "") name = this._nameBoxWindow._name;
            if (MB_Import_flag % 2 == 1) rb = this.SoR_MesRubyarr;

            const interpret = { map: $gameMap._interpreter._mapId, evid: $gameMap._interpreter._eventId, idx: $gameMap._interpreter._index }
            const data = { name: name, text: this._textState.text, rb: rb, Isface: false, unq: interpret };
            $gameTemp.AccumulateLog(0, data);
        }

        SoR_MSGB_WB_onEndOfText.call(this);
    }


    //for SoR_GabWindow
    if (IsGab) {
        const SoR_MSGB_SoRGabWindow_setupGab = SoR.Gab.prototype.setupGab;
        SoR.Gab.prototype.setupGab = function (scene) { // original SoR_GabWindow.prototype.setupGab
            SoR_MSGB_SoRGabWindow_setupGab.call(this, ...arguments);

            let name = "";
            let rb = undefined;
            if (MB_Import_flag % 2 == 1) rb = this.SoR_GabRubyarr;

            const tx = this._text1 + "\n" + this._text2;
            const ts = this.createTextState(tx, 0, 0, this.textWidth(tx));
            const data = { name: this.faceID, text: ts.text, rb: rb, Isface: true };
            $gameTemp.AccumulateLog(1, data);
        }

        if (PluginManager._scripts.includes("SoR_GabWindow_MZ_Right2")) {
            const SoR_MSGB_SoRGab2Window_setupGab = SoR.Gab2.prototype.setupGab;
            SoR.Gab2.prototype.setupGab = function (scene) { // original SoR_GabWindow.prototype.setupGab
                SoR_MSGB_SoRGab2Window_setupGab.call(this, ...arguments);

                let name = "";
                let rb = undefined;
                if (MB_Import_flag % 2 == 1) rb = this.SoR_GabRubyarr;

                const tx = this._text1 + "\n" + this._text2;
                const ts = this.createTextState(tx, 0, 0, this.textWidth(tx));
                const data = { name: this.faceID, text: ts.text, rb: rb, Isface: true };
                $gameTemp.AccumulateLog(1, data);
            }
        }

    }


    const SoR_MSGB_SM_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        SoR_MSGB_SM_update.call(this);
        this.checkHitKeyForBackLogCall();
    }

    Scene_Map.prototype.checkHitKeyForBackLogCall = function () {
        if (!SoR_MBLog_Isopen) return; //disabled;
        if (CheckBacklogTrigger()) {
            if (this.isBusyforBklog()) return;

            if (SE_OpenBackLog.name != "") AudioManager.playSe(SE_OpenBackLog);
            else SoundManager.playOk();

            SceneManager.push(Scene_MSGBackLog);
        }
    }

    Scene_Map.prototype.isBusyforBklog = function () {
        return (
            this.isMessageWindowClosing() ||
            this._waitCount > 0 ||
            this._encounterEffectDuration > 0 ||
            $gamePlayer.isTransferring() ||
            Scene_Message.prototype.isBusy.call(this)
        );
    }



    function CheckBacklogTrigger() {
        if (BackLog_TriggerKey != "" && Input.isTriggered(BackLog_TriggerKey)) return true;
        if (MouseTrigger > 0) {
            switch (MouseTrigger) {
                case 1:
                    if (TouchInput.wheelY <= -10) return true;
                    break;
                case 2:
                    if (TouchInput.wheelY >= 10) return true;
                    break;
                case 3:
                    if (TouchInput.wheelX <= -10) return true;
                    break;
                case 4:
                    if (TouchInput.wheelX >= 10) return true;
                    break;
                case 5:
                    if (Math.abs(TouchInput.wheelY) >= 10) return true;
                    break;
                default:
                    break;
            }
        }
        return false;
    }



    ///////////////////////////////////////////////////////////////////////
    // Backlog scene
    ///////////////////////////////////////////////////////////////////////

    function Scene_MSGBackLog() {
        this.initialize.apply(this, arguments);
    }
    Scene_MSGBackLog.prototype = Object.create(Scene_Base.prototype);
    Scene_MSGBackLog.prototype.constructor = Scene_MSGBackLog;
    Object.defineProperty(Scene_MSGBackLog.prototype, "innerWidth", {
        get: function () { return this._width; },
        set: function (value) { this.height = value; },
        configurable: true
    });
    Object.defineProperty(Scene_MSGBackLog.prototype, "innerHeight", {
        get: function () { return this._height; },
        set: function (value) { this.height = value; },
        configurable: true
    });



    Scene_MSGBackLog.prototype.initialize = function () {
        this.currentListID = 0;
        this.isUpdateRequired = false;
        this.Scroll_typePos = [0, 0];

        Scene_Base.prototype.initialize.call(this);
        this.processlogs();
    }

    //initialization
    Scene_MSGBackLog.prototype.processlogs = function () {
        this.LogWindows = [[], []];
        this.LogSplitLines = [[], []];
        this.numLogs = [0, 0];
        this.YLengthLogs = [0, 0];

        if (!$gameTemp.BackLogStack) $gameTemp.InitMesBackLogStack();
        this.numLogs[0] = $gameTemp.BackLogStack[0].length;
        this.numLogs[1] = $gameTemp.BackLogStack[1].length;

        for (let i = 0; i < this.numLogs[0]; i++) {
            this.LogWindows[0][i] = new LogMesWindow($gameTemp.BackLogStack[0][i]);
            if (i >= 1) this.LogWindows[0][i].y = this.LogWindows[0][i - 1].y - this.LogWindows[0][i].height - 8;
        }
        if (this.numLogs[0] != 0) {
            this.YLengthLogs[0] = this.LogWindows[0][0].y - this.LogWindows[0][this.numLogs[0] - 1].y;
            this.LogWindowWidth = this.LogWindows[0][0].y;
        }

        if (IsGab) {
            for (let i = 0; i < this.numLogs[1]; i++) {
                this.LogWindows[1][i] = new LogMesWindow($gameTemp.BackLogStack[1][i]);
                if (i >= 1) this.LogWindows[1][i].y = this.LogWindows[1][i - 1].y - this.LogWindows[1][i].height - 8;
            }
            if (this.numLogs[1] != 0) {
                this.YLengthLogs[1] = this.LogWindows[1][0].y - this.LogWindows[1][this.numLogs[1] - 1].y;
                this.LogWindowWidth = this.LogWindows[1][0].y;
            }
        }

    }



    Scene_MSGBackLog.prototype.updatelogPos = function () {
        //logwindows
        for (let i = 0; i < this.numLogs[this.currentListID]; i++) {
            if (i == 0) {
                this.LogWindows[this.currentListID][0].y = this.LogWindows[this.currentListID][0].initY + this.WindowForcusY;
                if (i != this.numLogs[this.currentListID] - 1) this.LogSplitLines[this.currentListID][0].y = this.LogWindows[this.currentListID][0].y + SplitLine_YPadd;
            }
            else {
                this.LogWindows[this.currentListID][i].y = this.LogWindows[this.currentListID][i - 1].y - this.LogWindows[this.currentListID][i].height - 8;
                if (i != this.numLogs[this.currentListID] - 1) this.LogSplitLines[this.currentListID][i].y = this.LogWindows[this.currentListID][i].y + SplitLine_YPadd;
            }
            if (i < this.numLogs[this.currentListID] - 1) this.LogSplitLines[this.currentListID][i].visible = true;
            this.LogWindows[this.currentListID][i].visible = true;

            this.switchVisibleLogWindows(this.currentListID, i, true);
        }
        //scroll bar for logs
        const ypadd = this.WindowForcusY * (Graphics.boxHeight * 0.7 - this.ScrollbarPointer[this.currentListID].height) / (this.YLengthLogs[this.currentListID] - Graphics.boxHeight * 0.5);
        this.ScrollbarPointer[this.currentListID].y = Graphics.boxHeight * 0.25 + Graphics.boxHeight * 0.7 - this.ScrollbarPointer[this.currentListID].height - ypadd + ScrollBar_Ypadd;
        this.ScrollbarPointer[this.currentListID].visible = true;


        if (IsGab) {
            const reverseID = 1 - this.currentListID;
            for (let i = 0; i < this.numLogs[reverseID]; i++) {
                this.LogWindows[reverseID][i].visible = false;
                if (i < this.numLogs[reverseID] - 1) this.LogSplitLines[reverseID][i].visible = false;
            }
            this.ScrollbarPointer[reverseID].visible = false;
        }


        this.isUpdateRequired = false;
    }

    ///////////////////////////////////////////////////////////////////
    Scene_MSGBackLog.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this.createLogWindowLayer();
        this.createSceneNameWindow();
        this.createSplitLines();
        this.createHelpWindow();
        this.createScrollBar();

        if (Header_Style == 1) this.createSprites();
        if (IsGab) this.createLogSelectable();
        if (ConfigManager.touchUI) this.createCancelButton();
    }


    Scene_MSGBackLog.prototype.createLogWindowLayer = function () {
        this._backlogWindowLayer = new Sprite_bklog();
        this.addChild(this._backlogWindowLayer);
    }

    ///////////////////////////////////////////////////////////////////
    // split lines
    ///////////////////////////////////////////////////////////////////
    Scene_MSGBackLog.prototype.createSplitLines = function () {
        for (let i = 0; i < this.numLogs[0] - 1; i++) {
            this.LogSplitLines[0][i] = new Sprite();
            this.LogSplitLines[0][i].bitmap = this.makeLineBitmap();
            this.LogSplitLines[0][i].y = this.LogWindows[0][i].y + SplitLine_YPadd;
        }

        if (IsGab) {
            for (let i = 0; i < this.numLogs[1] - 1; i++) {
                this.LogSplitLines[1][i] = new Sprite();
                this.LogSplitLines[1][i].bitmap = this.makeLineBitmap();
                this.LogSplitLines[1][i].y = this.LogWindows[1][i].y + SplitLine_YPadd;
                this.LogSplitLines[1][i].visible = false;
            }
        }
    }


    Scene_MSGBackLog.prototype.makeLineBitmap = function () {

        const bitmap = new Bitmap(Graphics.boxWidth, 20);
        const context = bitmap._context;
        context.beginPath();

        context.lineWidth = 3;
        context.lineCap = "round";

        const wl = (Graphics.width - this.LogWindowWidth) * 0.33;
        const grad = context.createLinearGradient(wl, 0, Graphics.boxWidth - wl, 0);
        grad.addColorStop(0.0, "gray");
        grad.addColorStop(0.3, "silver");
        grad.addColorStop(0.5, MessageSplit_Color);
        grad.addColorStop(0.8, "silver");
        grad.addColorStop(1.0, "gray");
        context.strokeStyle = grad;
        context.globalAlpha = 0.7;

        context.moveTo(wl + 10 + SplitLine_WidthPadd, 0);
        context.lineTo(Graphics.boxWidth - wl - SplitLine_WidthPadd, 0);
        context.stroke();

        return bitmap;
    }

    Scene_MSGBackLog.prototype.createScrollBar = function () {
        const x = (Graphics.width + this.LogWindowWidth) * 0.5 + 24;
        const y = Graphics.boxHeight * 0.5;


        this.Scrollbar = new Sprite();
        this.Scrollbar.bitmap = this.makeScrollBarBitmap();
        this.Scrollbar.x = x + ScrollBar_Xpadd;
        this.Scrollbar.y = (Graphics.boxHeight - y) * 0.5 + ScrollBar_Ypadd;
        this.addChild(this.Scrollbar);

        this.ScrollbarPointer = [new Sprite(), new Sprite()];

        if (this.numLogs[0] != 0) {
            this.ScrollbarPointer[0].bitmap = this.makeScrollBarPointerBitmap(0);
            this.ScrollbarPointer[0].x = x + ScrollBar_Xpadd;
            this.ScrollbarPointer[0].y = (Graphics.boxHeight - y) * 0.5 + Graphics.boxHeight * 0.7 - this.ScrollbarPointer[0].height + ScrollBar_Ypadd;
            this.addChild(this.ScrollbarPointer[0]);
        }

        if (IsGab) {
            if (this.numLogs[1] != 0) {
                this.ScrollbarPointer[1].bitmap = this.makeScrollBarPointerBitmap(1);
                this.ScrollbarPointer[1].x = x + ScrollBar_Xpadd;
                this.ScrollbarPointer[1].y = (Graphics.boxHeight - y) * 0.5 + Graphics.boxHeight * 0.7 - this.ScrollbarPointer[1].height + ScrollBar_Ypadd;
                this.ScrollbarPointer[1].visible = false;
                this.addChild(this.ScrollbarPointer[1]);
            }
        }
    }


    Scene_MSGBackLog.prototype.makeScrollBarBitmap = function () {

        const bitmap = new Bitmap(ScrollBar_Width, Graphics.boxHeight);
        const context = bitmap._context;
        context.beginPath();

        const wl = ScrollBar_Width;
        const wh = Graphics.boxHeight * 0.7 + 1;
        const grad = context.createLinearGradient(0, 0, wl, 0);
        grad.addColorStop(0.0, "gray");
        grad.addColorStop(0.5, "silver");
        grad.addColorStop(1.0, "gray");
        context.fillStyle = grad;
        context.globalAlpha = 0.7;
        context.rect(0, 0, wl, wh);
        context.fill();

        return bitmap;
    }


    Scene_MSGBackLog.prototype.makeScrollBarPointerBitmap = function (type) {
        const pointerH = this.YLengthLogs[type];
        const allh = Graphics.boxHeight - 64;
        const barh = Graphics.boxHeight * 0.7;
        const viewrate = barh / pointerH >= 1.0 ? 1.0 : barh / pointerH;
        const wh = allh * viewrate;
        const wl = ScrollBar_Width;

        const bitmap = new Bitmap(ScrollBar_Width, barh * viewrate);
        const context = bitmap._context;
        context.beginPath();

        const grad = context.createLinearGradient(0, 0, wl, 0);
        grad.addColorStop(0.0, 'rgb(55,55,0)');
        grad.addColorStop(0.5, "gold");
        grad.addColorStop(1.0, 'rgb(55,55,0)');
        context.fillStyle = grad;
        context.globalAlpha = 0.7;
        context.rect(0, 0, wl, wh);
        context.fill();

        return bitmap;
    }
    ///////////////////////////////////////////////////////////////////

    Scene_MSGBackLog.prototype.createLogSelectable = function () {
        this._LogListIDWindow = new Window_LogListSelection(new Rectangle(Graphics.width * 0.5 + LogtypeTab_Xpadd, LogtypeTab_Ypadd, LogtypeTab_width, LogtypeTab_height));
        this.addChild(this._LogListIDWindow);
    }


    Scene_MSGBackLog.prototype.createCancelButton = function () {
        this._cancelButton = new Sprite_Button("cancel");
        this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 4 + CancelButton_PaddX;
        this._cancelButton.y = this.buttonY() + CancelButton_PaddY;
        this.addWindow(this._cancelButton);
    }

    //background as Scene_Menu
    Scene_MSGBackLog.prototype.createBackground = function () {

        if (Background_OriginalImage != "") {
            const img = ImageManager.loadSystem(Background_OriginalImage);
            this._backgroundSprite = new Sprite(img);
        }
        else {
            this._backgroundFilter = new PIXI.filters.BlurFilter();
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this._backgroundSprite.filters = [this._backgroundFilter];
        }
        this.addChild(this._backgroundSprite);
        this._backgroundSprite.opacity = 192;
    }

    // main window
    Scene_MSGBackLog.prototype.createSceneNameWindow = function () {

        this._SceneNamewindow = new LogHelpWindow(new Rectangle(0, 0, Graphics.boxWidth, 64));
        this._SceneNamewindow.setBackgroundType(0);

        if (Header_Style == 0) {
            this.addChild(this._SceneNamewindow);
            this._SceneNamewindow.drawText(HeaderWindow_Text, 0, 0, this._SceneNamewindow.width, "center");
        }
    }


    Scene_MSGBackLog.prototype.createHelpWindow = function () {
        const helptext = HelpWindow_Text;

        this._SceneNamewindow.contents.fontSize = 18;
        const hname_w = this._SceneNamewindow.textWidth(helptext);
        this._HelpWindow = new LogHelpWindow(new Rectangle(0, HelpWindow_Ypadd, Graphics.width, 56));
        const helpstate = this._HelpWindow.createTextState(helptext, Graphics.width / 2 + ControlHelpText_XPadd, 0, this._HelpWindow.width);

        this._HelpWindow.opacity = 255;
        this._HelpWindow.contents.fontSize = 18;
        this._HelpWindow.setBackgroundType(1);
        this._HelpWindow.processAllText(helpstate);
        this.addChild(this._HelpWindow);
    }


    Scene_MSGBackLog.prototype.createSprites = function () {
        const img = ImageManager.loadSystem(Header_OriginalImage);
        this._bgpicture = new Sprite(img);
        this.addChild(this._bgpicture);
    }
    ///////////////////////////////////////////////////////////////////

    Scene_MSGBackLog.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        this.WindowForcusY = 0;
        this.window_dy = 0;
        this.isUpdateRequired = true;//for first time
    }

    Scene_MSGBackLog.prototype.update = function () {
        Scene_Base.prototype.update.call(this);

        if (IsGab && this.currentListID != this._LogListIDWindow._index) {
            this.currentListID = this._LogListIDWindow._index;
            this.Scroll_typePos[1 - this.currentListID] = this.WindowForcusY;//old
            this.WindowForcusY = this.Scroll_typePos[this.currentListID];//now
            this.isUpdateRequired = true;
        }

        this.CheckHitKeys();

        if (this.window_dy != 0) {
            const diff = this.window_dy * 0.5;
            this.WindowForcusY += diff;
            this.window_dy -= diff;
            if (Math.abs(this.window_dy) <= 1) {
                this.WindowForcusY += this.window_dy;
                this.window_dy = 0;
            }
            this.isUpdateRequired = true;
        }
        if (this.isUpdateRequired) this.updatelogPos();

    }



    Scene_MSGBackLog.prototype.switchVisibleLogWindows = function (type, id, flag) {
        if (flag == false) {
            this._backlogWindowLayer.removeChild(this.LogWindows[type][id]);
            return;
        }

        const ytop = this.LogWindows[type][id].y + this.LogWindows[type][id].height;
        const ybottom = this.LogWindows[type][id].y;

        if (ytop >= 0 && ybottom < Graphics.height) {
            this._backlogWindowLayer.addChild(this.LogWindows[type][id]);
        }
        else {
            this._backlogWindowLayer.removeChild(this.LogWindows[type][id]);
        }

        if (id >= 1) {
            const lid = id - 1;
            const lytop = this.LogSplitLines[type][lid].y;
            if (lytop >= 0 && lytop < Graphics.height) {
                this._backlogWindowLayer.addChild(this.LogSplitLines[type][lid]);
            }
            else {
                this._backlogWindowLayer.removeChild(this.LogSplitLines[type][lid]);
            }
        }
    }



    ////////////////////////////////////////////////////////////
    function Sprite_bklog() {
        this.initialize(...arguments);
    }
    Sprite_bklog.prototype = Object.create(Sprite.prototype);
    Sprite_bklog.prototype.constructor = Sprite_bklog;
    Sprite_bklog.prototype.update = function () { }
    ////////////////////////////////////////////////////////////

    Scene_MSGBackLog.prototype.CheckHitKeys = function () {
        if (IsGab) {
            if (Input.isTriggered('left')) this.currentListID = 0;
            else if (Input.isTriggered('right')) this.currentListID = 1;
        }

        if (this.YLengthLogs[this.currentListID] >= 1) {
            if (Input.isTriggered('up') || Input.isLongPressed('up') || TouchInput.wheelY <= -10) {
                let yy = this.YLengthLogs[this.currentListID] - Graphics.height / 2;
                yy -= yy % 32;
                if (this.WindowForcusY < yy) {
                    const yyy = this.YLengthLogs[this.currentListID] - Graphics.height / 2;
                    //this.WindowForcusY += 32;
                    //if(yyy-this.WindowForcusY<32) this.WindowForcusY = yyy;

                    if (yyy - this.WindowForcusY < 64) this.window_dy = yyy - this.WindowForcusY;
                    else this.window_dy = 32;

                    this.isUpdateRequired = true;
                    if (SE_BackLogCursor.name != "") AudioManager.playSe(SE_BackLogCursor);
                    else SoundManager.playCursor();
                }
                else if (Input.isTriggered('up') && !Input.isLongPressed('up')) {
                    //this.WindowForcusY = 0;
                    this.window_dy = -this.WindowForcusY;

                    this.isUpdateRequired = true;
                    if (SE_BackLogCursor.name != "") AudioManager.playSe(SE_BackLogCursor);
                    else SoundManager.playCursor();
                }
            }
            else if (Input.isTriggered('down') || Input.isLongPressed('down') || TouchInput.wheelY >= 10) {
                if (this.WindowForcusY > 0) {
                    //this.WindowForcusY -= 32;
                    if (this.WindowForcusY < 64) this.window_dy = -this.WindowForcusY;
                    else this.window_dy = -32;

                    this.isUpdateRequired = true;
                    if (SE_BackLogCursor.name != "") AudioManager.playSe(SE_BackLogCursor);
                    else SoundManager.playCursor();
                }
                else if (Input.isTriggered('down') && !Input.isLongPressed('down')) {
                    let yy = this.YLengthLogs[this.currentListID] - Graphics.height / 2;
                    //yy -= yy%32;
                    //this.WindowForcusY = yy;
                    this.window_dy = yy - this.WindowForcusY;

                    this.isUpdateRequired = true;
                    if (SE_BackLogCursor.name != "") AudioManager.playSe(SE_BackLogCursor);
                    else SoundManager.playCursor();
                }
            }

            if (Input.isTriggered("pageup")) {
                let yy = this.YLengthLogs[this.currentListID] - Graphics.height / 2;
                yy -= yy % 32;
                //this.WindowForcusY = yy;
                this.window_dy = yy - this.WindowForcusY;

                this.isUpdateRequired = true;
                if (SE_BackLogCursor.name != "") AudioManager.playSe(SE_BackLogCursor);
                else SoundManager.playCursor();
            }
            else if (Input.isTriggered("pagedown")) {
                //this.WindowForcusY = 0;
                this.window_dy = - this.WindowForcusY;

                this.isUpdateRequired = true;
                if (SE_BackLogCursor.name != "") AudioManager.playSe(SE_BackLogCursor);
                else SoundManager.playCursor();
            }

            const touchbar = CheckScrollBarTouch(this.Scrollbar);
            if (TouchInput.isRepeated() && touchbar != -1) {//for touch on the scroll bar
                const totalbar_h = Graphics.boxHeight * 0.7;
                const Ty = TouchInput.y;

                let candy = 0;
                if (Ty - this.ScrollbarPointer[this.currentListID].height * 0.5 <= this.Scrollbar.y) {
                    candy = this.YLengthLogs[this.currentListID] - Graphics.height / 2;
                    //candy -= candy%32;
                }
                else if (Ty + this.ScrollbarPointer[this.currentListID].height * 0.5 >= this.Scrollbar.y + totalbar_h) {
                    candy = 0;
                }
                else {
                    const diffrate = (touchbar - this.ScrollbarPointer[this.currentListID].height * 0.5) / totalbar_h;
                    const diffval = this.YLengthLogs[this.currentListID] * diffrate;
                    candy = diffval - diffval % 32;
                }

                if (candy != this.WindowForcusY) {
                    //this.WindowForcusY = candy;
                    this.window_dy = candy - this.WindowForcusY;
                    this.isUpdateRequired = true;
                    if (SE_BackLogCursor.name != "") AudioManager.playSe(SE_BackLogCursor);
                    else SoundManager.playCursor();
                }
            }
        }


        if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
            if (SE_CloseBackLog.name != "") AudioManager.playSe(SE_CloseBackLog);
            else SoundManager.playCancel();
            $gameTemp.BackFromScene_BackLog = true;
            SceneManager.pop();
        }
    }

    function CheckScrollBarTouch(scb) {
        let tp = -1;
        const Tx = TouchInput.x;
        const Ty = TouchInput.y;
        const wd = ScrollBar_Width;
        const ht = Graphics.boxHeight * 0.7;
        if (Tx >= scb.x && Tx <= scb.x + wd) {
            if (Ty >= scb.y && Ty <= scb.y + ht) {
                tp = (scb.y + ht) - Ty;
            }
        }
        return tp;
    }


    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    function LogMesWindow() {
        this.initialize(...arguments);
    }

    LogMesWindow.prototype = Object.create(Window_Base.prototype);
    LogMesWindow.prototype.constructor = LogMesWindow;
    Object.defineProperty(LogMesWindow.prototype, "innerWidth", {
        get: function () { return this._width; },
        set: function (value) { this.height = value; },
        configurable: true
    });
    Object.defineProperty(LogMesWindow.prototype, "innerHeight", {
        get: function () { return this._height; },
        set: function (value) { this.height = value; },
        configurable: true
    });

    LogMesWindow.prototype.initialize = function (data) {
        this.speaker_name = data.name;
        this.texts = data.text;
        this.rbs = data.rb;
        this.Isface = data.Isface;
        this.facesize = ImageManager.faceWidth * 0.5;

        Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, Graphics.width, Graphics.height));
        this.setLogMesWindow();
    }

    LogMesWindow.prototype.loadWindowskin = function () {
        const skinname = BackgroundSkin_LogWindow ? BackgroundSkin_LogWindow : "Window";
        this.windowskin = ImageManager.loadSystem(skinname);
    }

    LogMesWindow.prototype.setLogMesWindow = function () {
        this.width = LogWindowWidth;
        let h = 0;
        this.contents.clear();

        if (!this.Isface) h += this.DrawNameBox(h);
        h += this.DrawMessageTexts(h);

        this.x = (Graphics.width - this.width) / 2;
        this.height = h + this.padding * 2;
        this.y = Graphics.height - this.height - 32;
        this.initY = this.y;

        if (this.Isface && this.speaker_name != "0") {
            const facemin = this.facesize + this.padding * 2;
            this.height = this.height < facemin ? facemin : this.height;

            const fname = $dataActors[this.speaker_name].faceName;
            const fidx = $dataActors[this.speaker_name].faceIndex;

            this.drawFace(fname, fidx, this.width - this.facesize - this.padding * 2 + FacePos_Xpadd, this.height - this.facesize - FacePos_Ypadd, ImageManager.faceWidth, ImageManager.faceHeight, this.facesize, this.facesize);
        }
    }


    LogMesWindow.prototype.drawFace = function (faceName, faceIndex, x, y, width, height, dw, dh) {
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
        const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;

        bitmap.addLoadListener(function () {
            this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
        }.bind(this));
    }

    LogMesWindow.prototype.DrawNameBox = function (h) {
        const text = this.speaker_name;
        if (text == "") return 0;

        this.contents.fontSize = 20;//NameWindow_FontSize;
        const w = this.textWidth(text);
        const pd = this.padding + this.itemPadding();

        this.changeTextColor(SpeakerName_Color);//yellow
        const textState = this.createTextState(text, this.padding, h, w + pd * 2);
        this.processAllText(textState);
        const th = this.calcTextHeight(textState);
        this.resetTextColor();
        this.resetFontSettings();

        return th;
    }


    LogMesWindow.prototype.DrawMessageTexts = function (h) {
        const strings = this.texts.split('\n');
        const rbs = this.rbs;
        this.contents.fontSize = 24;//NameWindow_FontSize;
        const baseH = this.calcTextHeight(this.createTextState("1234567890AAA", this.padding, h, 0));

        let th = 0;
        let tx_count = 0;
        for (let l = 0; l < strings.length; l++) {
            const text = strings[l];
            const testState1 = this.createTextState(text, this.padding, h, 0);
            const paddY = this.calcTextHeight(testState1) - baseH;

            const n_rb = !rbs || !rbs[l] ? 0 : rbs[l].length;
            if (n_rb > 0) {
                const origfsize = this.contents.fontSize;
                for (let k = 0; k < n_rb; k++) {
                    const ruby = rbs[l][k];
                    this.contents.fontSize = origfsize;
                    const prevwd = text.substring(0, ruby.idx);
                    const prevarea = this.contents.measureTextRectArea(prevwd);
                    const rbbasewd = text.substring(0, ruby.idx2);
                    const rbbasearea = this.contents.measureTextRectArea(rbbasewd);
                    const new_xpos = prevarea.x + (rbbasearea.x - prevarea.x) * 0.5;

                    this.contents.fontSize = Math.round(origfsize * 0.6);
                    const rbw = this.contents.measureTextRectArea(ruby.rb);
                    const rbx = new_xpos - rbw.x * 0.5 + this.padding;
                    const rby = h + th;
                    this.contents.drawText(ruby.rb, rbx, rby, rbw.x + 32, 16);
                }
                th += 14;
            }//ruby

            tx_count += text.length;
            this.contents.fontSize = 24;
            const w = this.contents.measureTextRectArea(text);
            const pd = this.padding + this.itemPadding();

            const textState = this.createTextState(text, this.padding, h + th, w.x + pd * 2);
            this.processAllText(textState);
            const th1 = this.calcTextHeight(textState) + paddY;
            th += th1;
        }

        //after process
        this.resetTextColor();
        this.resetFontSettings();

        return th;
    }


    LogMesWindow.prototype.update = function () { };

    //Renders the object using the WebGL renderer.
    LogMesWindow.prototype.render = function render(renderer) {////TBD (WindowLayer.prototype.render)
        if (!this.visible) return;
        /*
            const graphics = new PIXI.Graphics();
            const gl = renderer.gl;
            const children = this.children.clone();
        
            renderer.framebuffer.forceStencil();
            graphics.transform = this.transform;
            renderer.batch.flush();
        
            gl.clear(gl.STENCIL_BUFFER_BIT);
            gl.clearStencil(0);
            renderer.batch.flush();
        */
        for (const child of this.children) {
            if (!child._isWindow && child.visible) {
                child.render(renderer);
            }
        }
        //renderer.batch.flush();
    }


    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    function LogHelpWindow() {
        this.initialize(...arguments);
    }

    LogHelpWindow.prototype = Object.create(Window_Base.prototype);
    LogHelpWindow.prototype.constructor = LogHelpWindow;
    Object.defineProperty(LogHelpWindow.prototype, "innerWidth", {
        get: function () { return this._width; },
        set: function (value) { this.height = value; },
        configurable: true
    });
    Object.defineProperty(LogHelpWindow.prototype, "innerHeight", {
        get: function () { return this._height; },
        set: function (value) { this.height = value; },
        configurable: true
    });

    LogHelpWindow.prototype.initialize = function (rect) {
        Window_Base.prototype.initialize.call(this, rect);
    }

    //Renders the object using the WebGL renderer.
    LogHelpWindow.prototype.render = function render(renderer) {
        if (!this.visible) return;

        const graphics = new PIXI.Graphics();
        const gl = renderer.gl;
        const children = this.children.clone();

        renderer.framebuffer.forceStencil();
        graphics.transform = this.transform;
        renderer.batch.flush();
        gl.enable(gl.STENCIL_TEST);

        while (children.length > 0) {
            const win = children.pop();
            if (win._isWindow && win.visible && win.openness > 0) {
                win.render(renderer);
            }
        }

        gl.disable(gl.STENCIL_TEST);
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.clearStencil(0);
        renderer.batch.flush();

        for (const child of this.children) {
            if (!child._isWindow && child.visible) {
                child.render(renderer);
            }
        }

        renderer.batch.flush();
    }

    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    function Window_LogListSelection() {
        this.initialize(...arguments);
    }

    Window_LogListSelection.prototype = Object.create(Window_Command.prototype);
    Window_LogListSelection.prototype.constructor = Window_LogListSelection;

    Window_LogListSelection.prototype.initialize = function (rect) {
        Window_Command.prototype.initialize.call(this, rect);
    }

    Object.defineProperty(Window_LogListSelection.prototype, "innerWidth", {
        get: function () { return this._width; },
        set: function (value) { this.height = value; },
        configurable: true
    });

    Object.defineProperty(Window_LogListSelection.prototype, "innerHeight", {
        get: function () { return this._height; },
        set: function (value) { this.height = value; },
        configurable: true
    });

    Window_LogListSelection.prototype.maxCols = function () { return 2; }
    Window_LogListSelection.prototype.numVisibleRows = function () { return 1; }

    Window_LogListSelection.prototype.processCursorMove = function () {
        if (this.isCursorMovable()) {
            const lastIndex = this.index();
            if (Input.isRepeated("right")) {
                this.cursorRight(Input.isTriggered("right"));
            }
            if (Input.isRepeated("left")) {
                this.cursorLeft(Input.isTriggered("left"));
            }
            if (this.index() !== lastIndex) {
                if (SE_ShiftPageType.name != "") AudioManager.playSe(SE_ShiftPageType);
                else SoundManager.playCursor();
            }
        }
    }

    Window_LogListSelection.prototype.makeCommandList = function () {
        this.contents.fontSize = LogtypeTab_fontSize;
        this.addCommand(Text_MessageLogCursor, "", true);
        this.addCommand(Text_GabLogCursor, "", true);
    }

    Window_LogListSelection.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            const rect = this.itemRect(this.index());
            this.setCursorRect(rect.x + 5, rect.y + 3, rect.width - 10, rect.height - 6);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    }

    Window_LogListSelection.prototype.itemRect = function (index) {
        this._padding = 2;
        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const x = col * itemWidth + colSpacing / 2 + 6;
        const y = row * itemHeight + rowSpacing / 2 + 4;
        const width = itemWidth - colSpacing - 12;
        const height = itemHeight - rowSpacing - 12;
        return new Rectangle(x, y, width, height);
    };

    Window_LogListSelection.prototype.update = function () {
        Window_Command.prototype.update.call(this);
    }

    Window_LogListSelection.prototype.isScrollEnabled = function () {
        return false;
    }

    Window_LogListSelection.prototype.processOk = function () { }

    Window_LogListSelection.prototype.itemHeight = function () {
        return this.lineHeight() + 8;
    }

    Window_LogListSelection.prototype.lineHeight = function () {
        return this._height - this._padding * 2 - 4;
    }



    Bitmap.prototype.measureTextRectArea = function (text) {
        const context = this.context;
        context.save();
        context.font = this._makeFontNameText();
        const wd = context.measureText(text).width;

        let maxhgt = 0;
        const txl = text.length
        for (let i = 0; i < txl; i++) {
            const hgt = context.measureText(text[i]).width;
            if (maxhgt < hgt) maxhgt = hgt;
        }

        context.restore();
        return { x: wd, y: maxhgt };
    }

    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    const SoR_MSGB_ST_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function () {
        $gameTemp.InitMesBackLogStack();
        SoR_MBLog_Isopen = true;
        SoR_MSGB_ST_commandNewGame.call(this);
    }
    const SoR_MSGB_DM_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const contents = SoR_MSGB_DM_makeSaveContents.call(this);
        if (EnableSave_BackLog) contents.SoR_BackLogStack = $gameTemp.BackLogStack;
        contents.SoRBacklogOpen = SoR_MBLog_Isopen;
        return contents;
    }
    const SoR_MSGB_DM_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        SoR_MSGB_DM_extractSaveContents.call(this, contents);
        if (EnableSave_BackLog && contents.SoR_BackLogStack) $gameTemp.BackLogStack = contents.SoR_BackLogStack;
        else $gameTemp.InitMesBackLogStack();

        if (!contents.SoRBacklogOpen) SoR_MBLog_Isopen = true;
        else SoR_MBLog_Isopen = contents.SoRBacklogOpen;
    }

}());