//=============================================================================
// SoarPhotonEffectMZ.js
//=============================================================================
// [Update History]
// SoarPhotonEffect.js
// 2017.Feb.12 Ver0.0.0 Closed Version
// 2019.Jun.27 Ver1.0.0 First Release
// SoarPhotonEffectMZ.js
// 2021.Apr.18 Ver1.0.0 First Relase

/*:
 * @target MZ
 * @plugindesc display soar photons on screen as a kind of weather
 * @author Sasuke KANNAZUKI (thx to Rokan)
 *
 * @command photon1
 * @text Display Photon 1
 * @desc change the weather photon type 1.
 *
 * @command photon2
 * @text Display Photon 2
 * @desc change the weather photon type 2.
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 * This plugin introduces new 2 weathers with soar photon.
 *
 * Plugin Commands:
 * Call when you change the weather with soar photon.
 *
 * To stop the effect, run event command 'Change Weather',
 * because this effects are the kind of weather.
 *
 * Copyright: This plugin is based on Rokan's RGSS3 script material.
 * see "Kaisou Ryouiki" http://kaisou-ryouiki.sakura.ne.jp/
 * Thanks to Rokan.
 *
 * License:
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:
 * @target MZ
 * @plugindesc 舞い上がる光の粒を天候として表示します。
 * @author 神無月サスケ (原案:ろかん)
 *
 * @command photon1
 * @text 天候をタイプ１に変更
 * @desc 天候を通常状態のエフェクトにします。
 *
 * @command photon2
 * @text 天候をタイプ２に変更
 * @desc 天候を光が伸びながら消えていくエフェクトにします。
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 * このプラグインは、2つの新たな天候エフェクトを追加します。
 *
 * プラグインコマンド:
 * 新たに追加された天候エフェクトを表示するときに呼び出してください。
 *
 * エフェクトを止める時は、イベントコマンド「天候の設定」で「なし」を
 * 選択してください。（このエフェクトも天候のひとつだから）
 *
 * 著作権表記:
 * このプラグインは、ろかん氏のRGSS3素材をベースに作成しました。
 * Webサイト：回想領域 http://kaisou-ryouiki.sakura.ne.jp/
 * ろかん氏に謝意を示します。
 *
 * ライセンス表記:
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'SoarPhotonEffectMZ';

  PluginManager.registerCommand(pluginName, 'photon1', args => {
    $gameScreen.changeWeather('photon1', 1, 0);
  });

  PluginManager.registerCommand(pluginName, 'photon2', args => {
    $gameScreen.changeWeather('photon2', 1, 0);
  });

  /*
    //
    // process plugin commands
    //
    var _Game_Interpreter_pluginCommand =
     Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      _Game_Interpreter_pluginCommand.call(this, command, args);
      if (command === 'SoarPhotonEffect') {
        $gameScreen.changeWeather(Number(args[0]) ? 'photon2' : 'photon1', 1, 0);
      }
    };
  */

  //
  // Weather
  //
  const _Weather_createBitmaps = Weather.prototype._createBitmaps;
  Weather.prototype._createBitmaps = function () {
    _Weather_createBitmaps.call(this);
    var color1 = 'rgba(200, 255, 255, ' + 120.0 / 256 + ')';
    var color2 = 'rgba(170, 255, 255, 1.0)';
    this._photonBitmap = new Bitmap(9, 9);
    this._photonBitmap.fillRect(0, 1, 9, 7, color1);
    this._photonBitmap.fillRect(1, 0, 7, 9, color1);
    this._photonBitmap.fillRect(1, 3, 7, 3, color2);
    this._photonBitmap.fillRect(3, 1, 3, 7, color2);
  };

  const _Weather_updateSprite = Weather.prototype._updateSprite;
  Weather.prototype._updateSprite = function (sprite) {
    switch (this.type) {
      case 'photon1':
        this._updatePhoton1Sprite(sprite);
        break;
      case 'photon2':
        this._updatePhoton2Sprite(sprite);
        break;
      default:
        sprite.scale.x = sprite.scale.y = 1.0;
        _Weather_updateSprite.call(this, sprite);
        return;
    }
    if (sprite.opacity < 16) {
      this._rebornPhotonSprite(sprite);
    }
  };

  Weather.prototype._updatePhoton1Sprite = function (sprite) {
    sprite.bitmap = this._photonBitmap;
    sprite.rotation = 0;
    sprite.ay -= 1 + (Graphics.frameCount % 2);
    sprite.opacity -= 2;
    sprite.scale.x = sprite.scale.y = 1.0;
  };

  Weather.prototype._updatePhoton2Sprite = function (sprite) {
    sprite.bitmap = this._photonBitmap;
    sprite.rotation = 0;
    sprite.ay -= 1 + (Graphics.frameCount % 2);
    sprite.opacity -= 2;
    sprite.scale.x -= 0.006;
    sprite.scale.y += 0.06;
  };

  Weather.prototype._rebornPhotonSprite = function (sprite) {
    sprite.anchor.x = sprite.anchor.y = 0.5;
    sprite.ax = Math.randomInt(960) - 75 + this.origin.x;
    sprite.ay = Math.randomInt(720) + 75 + this.origin.y;
    sprite.opacity = Math.randomInt(76) + 180;
    sprite.scale.x = sprite.scale.y = 1.0;
  };
})();
