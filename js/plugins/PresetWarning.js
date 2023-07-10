//=============================================================================
// PresetWarning.js
//=============================================================================
/*:ja
 * @author Thirop
 * @target MZ
 * @plugindesc サンプルマップ用プリセットチェック
 * @help サンプルマップ動作に必要な追加プリセットプラグイン
 * が導入されていない場合にメッセージを表示する
 * サンプルプロジェクト用のプラグインです。
 */
//============================================================================= 
//PRAGMA: englishHeader
/*:
 * @author Thirop
 * @target MZ
 * @plugindesc Preset check for sample map
 * @help This is a plug-in for the sample project
 * that displays a message when additional preset plug-ins required
 * for the sample map operation are not installed.
 */
//============================================================================= 
//PRAGMA_END: englishHeader

(function () {
	'use strict';

	var allInNames = ['TRP_ParticleMZ_ExPreset', 'TRP_Particle_ExPreset'];

	var LC = TRP_Localize.localize.bind(TRP_Localize, 'preWa');
	var NLC = TRP_Localize.noLocalize;


	//=============================================================================
	// Game_Map
	//=============================================================================
	var _Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function (mapId) {
		_Game_Map_setup.call(this, mapId);

		if ($dataMap.meta.presetNames) {
			if (Utils.RPGMAKER_NAME === 'MZ') {
				Game_Particle.checkPresetNames($dataMap.meta.presetNames.split(','));
			} else {
				Game_Particle.checkPresetNames(($dataMap.meta.presetNamesMV || $dataMap.meta.presetNames).split(','));
			}
		}
	};


	Game_Particle.checkPresetNames = function (names) {
		var hasAllInPreset = false;
		for (var i = allInNames.length - 1; i >= 0; i = (i - 1) | 0) {
			if (PluginManager._scripts.contains(allInNames[i])) {
				hasAllInPreset = true;
			}
		}

		var allPluginOk = true;
		for (var i = names.length - 1; i >= 0; i = (i - 1) | 0) {
			var name = names[i];
			if (PluginManager._scripts.contains(name)) {
				continue
			}
			if (hasAllInPreset && name.contains('ExPreset')) {
				continue;
			}
			allPluginOk = false;
			break;
		}

		if (allPluginOk) {
			return;
		}


		var errText = LC('このマップは追加プリセット用のサンプルマップです。', 0);

		var length = names.length;
		for (var i = 0; i < length; i = (i + 1) | 0) {
			if (i > 0) {
				errText += '","';
			}
			var name = names[i];
			errText += name + '.js';
		}

		errText += LC('"をお持ちの場合はプラグインを導入した上でお試しください。', 1);

		throw new Error(errText);
	};



})();