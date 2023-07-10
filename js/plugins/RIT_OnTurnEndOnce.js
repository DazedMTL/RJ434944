//=============================================================================
// ターン終了時の処理は一度だけ
// RIT_OnTurnEndOnce.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ターン終了時の処理を１ターンに一度にします。　(Ver 1.0.1)
 * @author ライト
 *
 * @help
 *
 * ※このプラグインはターン制を想定しています。
 * 　TPBモードでの動作は保障されません。
 * -----------------------------------------------------------------
 * ■概要
 * デフォルトの仕様では、ターン終了時に「戦闘行動の強制」を行うと、
 * ターン終了時の処理(HP・MPの再生やステートターンの更新など)が
 * もう一度呼び出されます。
 * これを撤廃し、ターン終了時の処理は１ターンに一度しか行われないようにします。
 * また、0ターン目に「戦闘行動の強制」を行ってもターン終了時の処理が
 * 行われないようにします。
 *
 * ■使い方
 * プラグインパラメータ・プラグインコマンドはありません。
 * このプラグインを導入するだけで動作します。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 *
 */

(() => {
    'use strict';

    //追加定義(呼び出し済みフラグを設定)
    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function () {
        _BattleManager_initMembers.apply(this, arguments);
        this._alreadyOnTurnEnd = true;
    };

    //追加定義(ターン開始時にフラグをOFFにする)
    const _BattleManager_startInput = BattleManager.startInput;
    BattleManager.startInput = function () {
        this._alreadyOnTurnEnd = false;
        _BattleManager_startInput.apply(this, arguments);
    };

    //追加定義(ターン終了時の処理は一度しか行わない)
    const _BattleManager_endAllBattlersTurn = BattleManager.endAllBattlersTurn;
    BattleManager.endAllBattlersTurn = function () {
        if (this._alreadyOnTurnEnd) {
            return;
        }
        _BattleManager_endAllBattlersTurn.apply(this, arguments);
        this._alreadyOnTurnEnd = true;
    };

})();
