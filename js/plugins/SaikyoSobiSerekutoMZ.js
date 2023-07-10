//=============================================================================
// RPG Maker MZ - SaikyoSobiSerekutoMZ.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Set the priority of the optimize equipment in the note(meta) v1.10
 * @author UM
 * @help wirte at note(meta) when set priority of the optimize equipment.
 *  
 * <rank:n> bigger number more priority
 * EX. <rank:10> 
 * <rank:-1>
 *
 * If there is no description, it will be the strongest equipment
 * with the default priority.
 * If they have the same rank, they will be compared by default.
 *
 * Additional features
 * If set to "-1", it will be excluded from the candidates for the optimaize equipment.
 *
 *
 * And,
 * if the increase value of each equipment exceeds [2048], 
 * the priority of the rank setting will be penetrated,
 * and if it exceeds [128], the priority of the comparison
 * value of 1 rank will be penetrated.
 *
 * This plugin has no plugin command.
*/

/*:ja
 * @target MZ
 * @plugindesc 最強装備の優先度をメモ欄で設定できるプラグイン v1.10
 * @author 温州みかん
 *
 * @help 最強装備の優先度をメモ欄で設定する
 * <rank:n>
 * nの数字が大きいほど優先度が高くなります 半角数字
 * なにも記述がなければデフォルトの優先度で最強装備されます
 * 同じランクならデフォルトで比較されます
 *
 * 追加機能
 * 「-1」を設定すると、最強装備の候補から除外されます
 *
 * 例
 * <rank:10>
 * <rank:-1>
 * なお、各装備品の上昇値が[2048]を超えるとランク設定の優先度を
 * [128]を超えると1ランクの比較値の優先度を貫通します
 *
 * このプラグインにプラグインコマンドはありません
 *
 * このプラグインは著作権を主張できない規模のメソッドの集合です
 */


(() => {
    'use strict';
    const pluginName = "SaikyoSobiSerekutoMZ";

    //ここを改造したらイケるはず rmmz_objects.jsの4347あたり
    Game_Actor.prototype.bestEquipItem = function (slotId) {
        const etypeId = this.equipSlots()[slotId];
        const items = $gameParty
            .equipItems()
            .filter(item => item.etypeId === etypeId && this.canEquip(item));
        //filter は配列の中からtureを返す値のみを残す ===は完全同値 &&は かつ
        let bestItem = null;
        let bestPerformance = -1000;
        for (let i = 0; i < items.length; i++) {
            //　ここで比較している 追加・加工
            let performance = this.calcEquipItemPerformance(items[i]);
            if (items[i].meta.rank > 0) {
                performance = performance + items[i].meta.rank * 128 + 2048;
            }
            if (items[i].meta.rank == -1) {
                performance = -2048;
            }
            if (performance > bestPerformance) {
                bestPerformance = performance;
                bestItem = items[i];
            }
        }
        return bestItem;
    };

})();
