//=============================================================================
// ScreenNoiseMZ.js
//=============================================================================
// [Update History]
// - ScreenNoise.js for RMMV
// 2017.Feb.12 Ver0.0.0 Closed Version
// 2019.Jun.27 Ver1.0.0 First Release
// - ScreenNoiseMZ
// 2021.Apr.18 Ver1.0.0 First Release

/*:
 * @target MZ
 * @plugindesc Display noise effect on map and title scene
 * @author Sasuke KANNAZUKI (thx to Rokan)
 *
 * @param Use at Title
 * @desc 0:not display 1:display at title scene
 * @type select
 * @option Yes
 * @value 1
 * @option No
 * @value 0
 * @default 0
 *
 * @requiredAssets img/system/noise_base
 * @requiredAssets img/system/noise_line
 * @requiredAssets img/system/noise_dot
 * 
 * @command start
 * @text Start
 * @desc Start Screen Noise Effect
 *
 * @command end
 * @text End
 * @desc End Screen Noise Effect
 *
 * @help 
 * At first you have to do:
 * This plugin requires 3 image files to run.
 * Put noise_base, noise_line, noise_dot at img/system.
 *
 * Plugin summary:
 * displays noise effect like an old film on the map screen.
 * 
 * Plugin commands:
 * Call plugin command to start/end the noise effect.
 *
 * Copyright: This plugin is based on Rokan's RGSS3 script material.
 * see "Kaisou Ryouiki" http://kaisou-ryouiki.sakura.ne.jp/
 * Thanks to Rokan.
 *
 * License:
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc マップ画面とタイトル画面にノイズをかけます
 * @author 神無月サスケ (原案:ろかん)
 * 
 * @param Use at Title
 * @text タイトルに表示？
 * @desc タイトル画面での表示 0:しない 1:する
 * @type select
 * @option 表示する
 * @value 1
 * @option 表示しない
 * @value 0
 * @default 0
 *
 *
 * @requiredAssets img/system/noise_base
 * @requiredAssets img/system/noise_line
 * @requiredAssets img/system/noise_dot
 * 
 * @command start
 * @text ノイズ開始
 * @desc マップでのノイズを表示します
 *
 * @command end
 * @text ノイズ終了
 * @desc マップ上でのノイズ表示を中止します。
 *
 * @help 
 * 最初にすべきこと:
 * このプラグインの実行には、添付の画像ファイルが必要です。
 * img/system フォルダに、noise_base, noise_line, noise_dotを置いて下さい。
 *
 * プラグイン概要:
 * 古い映像フィルムのようなノイズ効果を与えます。
 * タイトルでの表示はパラメータで設定してください。
 * マップでの表示切替はプラグインコマンドで行ってください。
 * 
 * プラグインコマンド:
 * ノイズ表示の開始と終了を行う際に呼び出して下さい。
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
  //
  // process parameters
  //
  const pluginName = 'ScreenNoiseMZ';

  const parameters = PluginManager.parameters(pluginName);
  const useAtTitle = !!Number(parameters['Use at Title']);


  //
  // process plugin commands
  //
  PluginManager.registerCommand(pluginName, 'start', args => {
    $gameScreen.startScreenNoise();
  });

  PluginManager.registerCommand(pluginName, 'end', args => {
    $gameScreen.endScreenNoise();
  });

  //
  // Game_Screen
  //
  const _Game_Screen_initialize = Game_Screen.prototype.initialize;
  Game_Screen.prototype.initialize = function () {
    _Game_Screen_initialize.call(this);
    this.displayScreenNoise = false;
  };

  Game_Screen.prototype.startScreenNoise = function () {
    this.displayScreenNoise = true;
  };

  Game_Screen.prototype.endScreenNoise = function () {
    this.displayScreenNoise = false;
  };

  //
  // Spriteset_Map
  //

  const _Spriteset_Map_createLowerLayer =
    Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function () {
    _Spriteset_Map_createLowerLayer.call(this);
    this.createNoiseEffects();
  };

  Spriteset_Map.prototype.createNoiseEffects = function () {
    this.noiseEffects = new NoiseEffects();
    this._baseSprite.addChild(this.noiseEffects);
  };

  // ------------------------------------------------------
  //
  // Sprite_NoiseBase : the background sprite
  //

  function Sprite_NoiseBase() {
    this.initialize.apply(this, arguments);
  }

  Sprite_NoiseBase.prototype = Object.create(Sprite.prototype);
  Sprite_NoiseBase.prototype.constructor = Sprite_NoiseBase;

  Sprite_NoiseBase.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.reset();
  };

  Sprite_NoiseBase.prototype.reset = function () {
    this.blendMode = 1;
    this.bitmap = null;
    this.blink = true;
    return this;
  };

  Sprite_NoiseBase.prototype.setup = function () {
    this.bitmap = ImageManager.loadSystem('noise_base');
    this.blink = true;
    this.updateMain();
    return this;
  };

  Sprite_NoiseBase.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (NoiseEffects.needUpdate()) {
      this.updateMain();
    }
  };

  Sprite_NoiseBase.prototype.updateMain = function () {
    this.x = -(Math.randomInt(this.width - Graphics.width));
    this.opacity = this.blink ? 230 : 255;
    this.blink = !this.blink;
  };

  // ------------------------------------------------------
  //
  // Sprite_NoiseLine : the vertical line sprite
  //
  function Sprite_NoiseLine() {
    this.initialize.apply(this, arguments);
  }

  Sprite_NoiseLine.prototype = Object.create(Sprite.prototype);
  Sprite_NoiseLine.prototype.constructor = Sprite_NoiseLine;

  Sprite_NoiseLine.VectorX = [-3, -2, -1, 0, 1, 2, 3];
  Sprite_NoiseLine.OpacitySpeed = [-75, -30, -15, 0, 15, 30, 45, 75];


  Sprite_NoiseLine.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.reset();
  };

  Sprite_NoiseLine.prototype.reset = function () {
    this.bitmap = null;
    return this;
  };

  Sprite_NoiseLine.prototype.setup = function (startX) {
    this.bitmap = ImageManager.loadSystem('noise_line');
    this.x = startX || 0;
    const vx = Sprite_NoiseLine.VectorX;
    this.vectorX = vx[Math.randomInt(vx.length)];
    const os = Sprite_NoiseLine.OpacitySpeed;
    this.opacitySpeed = os[Math.randomInt(os.length)];
    this.updateMain();
    return this;
  };

  Sprite_NoiseLine.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (NoiseEffects.needUpdate()) {
      this.updateMain();
    }
  };

  Sprite_NoiseLine.prototype.updateMain = function () {
    this.x = (this.x + this.vectorX).clamp(0, Graphics.width);
    this.y = -Math.randomInt(this.height - Graphics.height);
    this.opacity += this.opacitySpeed;
    if (Math.randomInt(6) === 0) {
      const vx = Sprite_NoiseLine.VectorX;
      this.vectorX = vx[Math.randomInt(vx.length)];
    }
    if (Math.randomInt(6) === 0) {
      const os = Sprite_NoiseLine.OpacitySpeed;
      this.opacitySpeed = os[Math.randomInt(os.length)];
    }
  };

  // ------------------------------------------------------
  //
  // Sprite_NoiseDot : the background sprite
  //
  function Sprite_NoiseDot() {
    this.initialize.apply(this, arguments);
  }

  Sprite_NoiseDot.prototype = Object.create(Sprite.prototype);
  Sprite_NoiseDot.prototype.constructor = Sprite_NoiseDot;

  Sprite_NoiseDot.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.reset();
  };

  Sprite_NoiseDot.prototype.reset = function () {
    this.bitmap = null;
    return this;
  };

  Sprite_NoiseDot.prototype.setup = function (startX) {
    this.bitmap = ImageManager.loadSystem('noise_dot');
    this.updateMain();
    return this;
  };

  Sprite_NoiseDot.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (NoiseEffects.needUpdate()) {
      this.updateMain();
    }
  };

  Sprite_NoiseDot.prototype.updateMain = function () {
    if (Math.randomInt(50) === 0) {
      this.scale.x = (Math.randomInt(100) + 1.0) / 100.0;
      this.scale.y = (Math.randomInt(100) + 1.0) / 100.0;
      this.rotation = Math.randomInt(360) * Math.PI / 180;
      this.x = Math.randomInt(Graphics.width);
      this.y = Math.randomInt(Graphics.height);
      this.opacity = 255;
    } else {
      this.opacity = 0;
    }
  };

  // ------------------------------------------------------
  //
  // NoiseEffects : the sprite set of noise sprites
  //
  function NoiseEffects() {
    this.initialize.apply(this, arguments);
  }

  NoiseEffects.prototype = Object.create(Sprite.prototype);
  NoiseEffects.prototype.constructor = NoiseEffects;

  NoiseEffects.needUpdate = function () {
    return Graphics.frameCount % 3 === 0;
  };

  NoiseEffects.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._sprites = [];
    this.reset();
  };

  NoiseEffects.prototype.reset = function () {
    while (this._sprites.length > 0) {
      this.removeChild(this._sprites.shift().reset());
    }
    this.working = false;
  };

  NoiseEffects.prototype.setup = function () {
    this.reset();
    this.createNoise();
    this.working = true;
  };

  NoiseEffects.prototype.createNoise = function () {
    this._sprites.push((new Sprite_NoiseBase()).setup());
    this._sprites.push((new Sprite_NoiseLine()).setup(75));
    this._sprites.push((new Sprite_NoiseLine()).setup(525));
    this._sprites.push((new Sprite_NoiseLine()).setup(600));
    this._sprites.push((new Sprite_NoiseLine()).setup(750));
    this._sprites.push((new Sprite_NoiseDot()).setup());

    for (const sprite of this._sprites) {
      this.addChild(sprite);
    }

  };

  NoiseEffects.prototype.update = function () {
    this.updateDisplayState();
    Sprite.prototype.update.call(this);
  };

  NoiseEffects.prototype.updateDisplayState = function () {
    if (this.working !== !!$gameScreen.displayScreenNoise) {
      if (!!$gameScreen.displayScreenNoise) {
        this.setup();
      } else {
        this.reset();
      }
    }
  };

  // ------------------------------------------------------
  //
  // NoiseEffectsTitle : NoiseEffects for Title
  //
  function NoiseEffectsTitle() {
    this.initialize.apply(this, arguments);
  }

  NoiseEffectsTitle.prototype = Object.create(NoiseEffects.prototype);
  NoiseEffectsTitle.prototype.constructor = NoiseEffectsTitle;

  NoiseEffectsTitle.prototype.initialize = function () {
    NoiseEffects.prototype.initialize.call(this);
    this.setup();
  };

  NoiseEffectsTitle.prototype.updateDisplayState = function () {
  };

  const _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
  Scene_Title.prototype.createForeground = function () {
    _Scene_Title_createForeground.call(this);
    if (useAtTitle) {
      this.addChild(new NoiseEffectsTitle());
    }
  };

})();
