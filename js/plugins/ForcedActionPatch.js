/*:
* @plugindesc 戦闘行動の強制による、直前の中断された行動を再開するプラグイン
* @author チョコワ部
* @help 
* ターン途中にバトルイベントの戦闘行動の強制が起こると、
* その直前の行動が中断されます。
* 例
* ・直前に行動したキャラの行動回数が残っていても、
*   中断されて行動せずに終わってしまう。
* ・直前に行動したキャラのステートの、行動によるターン経過が起こらない。
* 
* このプラグインはその中断された部分を、バトルイベント後に再開するものです。
* ただし、戦闘行動の強制の仕様として、
* 戦闘行動を強制されたキャラの行動回数が残っている場合は、そちらが先に行動します。
* 
* 本プラグインの改造・再配布は制限しません。
*/

(function () {


    // 戦闘行動の強制後、直前に行動したキャラが再度行動。ステートのターン経過も行う。
    BattleManager.processForcedAction = function () {
        if (this._subject) this._actionBattlers.unshift(this._subject);
        if (this._actionForcedBattler) {
            this._subject = this._actionForcedBattler;
            this._actionForcedBattler = null;
            this.startAction();
            this._subject.removeCurrentAction();
        }
    };
})();
