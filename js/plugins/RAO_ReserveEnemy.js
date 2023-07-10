var Imported = Imported || {};
Imported.RAO_ReserveEnemy = true;
/*:
 * @plugindesc 敵増援システム
 * @author Raoka
 * @help
 * 注意:サイドビュー前提に作られています。フロントビューでも動きますが、演出が雑です。
 * 戦闘中に敵をプラグインコマンドで追加できます。
 * 敵が戦闘不能になった際に設定された控えの敵と入れ替えるような設定もできます。
 *
 * また、サイドビューだと敵出現時に左から右へ移動するような演出が加えられています。
 *
 *
 *=========================プラグインコマンド====================================
 * add_enemy ID
 * 説明 IDの敵がランダムな場所に出現
 *
 * add_enemy ID X Y
 * 説明 IDの敵が(X,Y)場所に出現
 *
 * add_random_enemy N ID ID ID ...
 * 説明 敵をランダムに追加します。
 *      Nは追加する回数です。敵はID達の中からランダムに選択されます。
 *
 * add_random_enemy_probability N 確率 ID ID ID ...
 * 説明 敵を追加しない確率を設定できます
 *
 * add_reserve_enemy ID ID ID ...
 * 説明 敵の誰かが倒されたときに出現する控えの敵を追加します。
 *      IDは追加する敵のIDです、左から順に追加されます。
 *
 * add_random_reserve_enemy N ID ID ID ...
 * 説明 控えの敵をランダムに追加します。
 *      Nは追加する回数です。敵はID達の中からランダムに選択されます。
 *
 * clear_reserve_enemy
 * 説明 控えの敵を全て消します
 *
 *
 *=========================スクリプトコマンド====================================
 *
 * $gameTroop.getRemainingEnemyNumber()
 * 残りの敵の数を取得します。
 *
 * $gameTroop.getReserveEnemyLength()
 * 控えの敵の数を取得します.
 *
 *=============================================================================
 * @param ランダム位置
 * @type boolean
 * @desc 敵が控えと入れ替わる際に位置をランダムにするか。
 * @default false
 *
 * @param 場所の制限
 * @desc ランダムの場所を制限することができます。↓SV用初期値
 * {"left":"200","up": "300","right": "600","down": "500"}
 * @default
 * @type struct<area>
 * @default {"left":"200","up": "300","right": "600","down": "500"}
 *
 * @param キルカウント変数
 * @type variable
 * @desc 指定したゲーム変数に戦闘中に倒した敵の数を入れます。
 * 0の場合変数を指定しません。
 * @default 0
 *
 * @param 移動速度
 * @type number
 * @desc サイドビュー用
 * 出現時の移動速度です。
 * 初期値は10です。
 * @default 10
 *
 * @command add_flg
 * @text 敵追加有無フラグ
 * @desc フラグを有効(1)にすることで、敵が全滅しても控えがいる限り勝利にはならない
 *
 * @arg add_flg
 * @text 敵追加有効フラグ
 * @type number
 * @default 0
 *
 * @command add_enemy_position
 * @text 敵出現
 * @desc IDの敵が出現します。(座標省略時:出現位置ランダム)
 *
 * @arg add_enemy_pos_id
 * @text 敵のID
 * @type number
 * @default 1
 * @desc 出現する敵のIDを指定します。
 *
 * @arg add_enemy_pos_x
 * @text 敵が出現するx座標(範囲:200-600、左記以外ランダム指定)
 * @type number
 * @default 0
 * @desc 敵が出現するx座標を指定します。
 *
 * @arg add_enemy_pos_y
 * @text 敵が出現するy座標(範囲:300-500、左記以外ランダム指定)
 * @type number
 * @default 0
 * @desc 敵が出現するy座標を指定します。
 *
 * @command add_enemy_random_id
 * @text 敵追加(追加敵ランダム)
 * @desc 敵はIDの中からランダムに選択されます。(N:追加回数)
 *
 * @arg add_enemy_rndm_count
 * @text 敵追加回数
 * @type number
 * @default 0
 *
 * @arg add_enemy_rndm_id
 * @text 敵のID
 * @type number[]
 * @default ["1","2","3","4"]
 *
 * @desc 出現する敵のIDを指定します。
 * @command add_random_enemy_probability
 * @text 確率設定(該当機能未実装)
 * @desc 敵を追加しない確率を設定できます。
 *
 * @command add_reserve_enemy
 * @text 控えの敵追加
 * @desc 敵の誰かが倒されたときに出現する控えの敵を追加します。
 *
 * @arg add_res_enemy_id
 * @text 控えの敵ID
 * @type number[]
 * @default ["1","2","3","4"]
 * @desc 敵が倒された場合に出現する敵のIDを指定します。
 *
 * @command add_random_reserve_enemy
 * @text 控えの敵追加(ランダム)
 * @desc 敵はIDの中からランダムに選択されます。(N:追加回数)
 *
 * @command clear_reserve_enemy
 * @text 控えの敵削除(該当機能未実装)
 * @desc 控えの敵を全て消します。
 *
 */
/*~struct~area:
 * @param left
 * @desc 左の制限です。
 * @type number
 * @param up
 * @desc 上の制限です。
 * @type number
 * @param right
 * @desc 右の制限です。
 * @type number
 * @param down
 * @desc 下の制限です。
 * @type number
 */

(() => {
  "use strict";


  //=============================================================================
  // パラメーターの設定をします。
  //=============================================================================
  const getParamArea = function (value, defaultValue) {
    try {
      value = JSON.parse(value || defaultValue);
    } catch (e) {
      alert(`!!!Plugin param is wrong.!!!\nPlugin:${pluginName}.js\nName:[${paramNames}]\nValue:${value}`);
    }
    value.left = Number(value.left);
    value.up = Number(value.up);
    value.right = Number(value.right);
    value.down = Number(value.down);
    return value;
  };

  const pluginName = "RAO_ReserveEnemy";
  const parameters = PluginManager.parameters(pluginName);
  const param = {
    isRandomPos: (parameters['ランダム位置'] == 'true'),
    area: getParamArea(parameters['場所の制限'], { "left": "200", "up": "300", "right": "600", "down": "500" }),
    moveTime: Number(parameters['移動速度'] || 10),
    killCountId: Number(parameters['キルカウント変数'] || 0),
    _killCount: 0,
    get killCount() {
      return this._killCount;
    },
    set killCount(val) {
      if (param.killCountId != 0) $gameVariables.setValue(param.killCountId, val)
      this._killCount = val;
    },
    get randomX() {
      return Math.floor(Math.random() * (param.area.right - param.area.left) + param.area.left);
    },
    get randomY() {
      return Math.floor(Math.random() * (param.area.down - param.area.up) + param.area.up);
    }
  }

  //控えの敵保持用
  let AddFlg = 0;
  let KeepEnemyId = [];
  let KeepFlg = 0;
  let TotalEnemy = 0;

  //=============================================================================
  // プログラム
  //=============================================================================

  //戦闘開始時に増援フラグ取得(0:増援なし、0以外:増援あり)
  PluginManager.registerCommand(pluginName, "add_flg", args => {
    AddFlg = JSON.parse(args.add_flg);
    TotalEnemy = $gameTroop.getReserveEnemyLength();
  });

  const _Game_Troop_setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function (troopId) {
    _Game_Troop_setup.call(this, troopId);
    this.refreshReserveEnemies();
    param.killCount = 0;
  }

  Game_Troop.prototype.getReserveEnemies = function () {
    return this._reserveEnemies || [];
  }

  Game_Troop.prototype.getReserveEnemyLength = function () {
    //return this.getReserveEnemies().length;
    return this._enemies.length;
  }
  Game_Troop.prototype.getRemainingEnemyNumber = function () {
    return this.getReserveEnemies().length + $gameTroop.aliveMembers().length;
  }

  Game_Troop.prototype.refreshReserveEnemies = function () {
    this._reserveEnemies = [];
  }

  Game_Troop.prototype.addEnemy = function (enemyId, x, y) {
    if ($dataEnemies[enemyId]) {
      const enemy = new Game_Enemy(enemyId, x, y);
      this._enemies.push(enemy);
      BattleManager._spriteset.createEnemy(enemy);
      this.makeUniqueNames();
    }
  }

  Game_Troop.prototype.addReserveEnemy = function (enemyId) {
    this.getReserveEnemies().push(enemyId);
  }

  /***************************************************************************/

  //敵死亡時の処理
  const _Game_Enemy_die = Game_Enemy.prototype.die;
  Game_Enemy.prototype.die = function () {
    _Game_Enemy_die.call(this);
    param.killCount += 1;
    //フィールドの敵が全滅時、味方のターンを終了させる
    //if($gameTroop.getReserveEnemyLength() > 0){
    //if($gameTroop.getReserveEnemyLength() <= param.killCount ){
    //  const _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    //  Game_Battler.prototype.onTurnEnd = function() {
    //  _Game_Battler_onTurnEnd.call(this);
    //}
    //  let i = $gameTroop.getReserveEnemies().shift();
    //  $gameTroop.addEnemy(i,param.randomX,param.randomY);
    //}
  };

  //敵全滅時、残りのキャラの行動をキャンセル
  BattleManager.processTurn = function () {
    //_BattleManager_processTurn.call(this)
    const subject = this._subject;
    const action = subject.currentAction();
    if (action) {
      const targets = action.makeTargets();
      if (TotalEnemy > param.killCount) {
        action.prepare();
        if (action.isValid()) {
          this.startAction();
        }
      } else if (targets.length) {
        action.prepare();
        if (action.isValid()) {
          this.startAction();
        }
      }
      //選択していた行動を初期化
      subject.removeCurrentAction();
    } else {
      this.endAction();
      this._subject = null;
    }
  };

  //増援フラグがon(0以外)の場合、敵が全滅していても戦闘続行
  Game_Unit.prototype.isAllDead = function () {
    if (!AddFlg) {
      return this.aliveMembers().length === 0;
    };
  };

  Spriteset_Battle.prototype.createEnemy = function (enemy) {
    const sprite = new Sprite_Enemy(enemy);
    this._battleField.addChild(sprite);
    this._enemySprites.push(sprite);
    this._enemySprites.sort(this.compareEnemySprite.bind(this));
  };


  const _Sprite_Enemy_prototype_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function (battler) {
    _Sprite_Enemy_prototype_setBattler.call(this, battler);
    if ($gameSystem.isSideView()) {
      this._offsetX -= this._homeX;
      this.startMove(0, 0, Math.floor(this._homeX / param.moveTime));
    }
  };

  //敵の出現位置指定(x又はy座標が範囲以下の場合、出現位置はランダム)
  PluginManager.registerCommand(pluginName, "add_enemy_position", args => {
    const EmemyId = JSON.parse(args.add_enemy_pos_id);
    let EnemyPosX = JSON.parse(args.add_enemy_pos_x);
    let EnemyPosY = JSON.parse(args.add_enemy_pos_y);
    if (EnemyPosX < 200 || EnemyPosY < 300) {
      while (EnemyPosX < 200 || EnemyPosX > 600) {
        EnemyPosX = param.randomX;
      }
      while (EnemyPosY < 300 || EnemyPosY > 500) {
        EnemyPosY = param.randomY;
      }
    }
    $gameTroop.addEnemy(EmemyId, EnemyPosX, EnemyPosY);
  });

  //指定した敵IDの中からランダムで敵を出現(出現位置もランダム)
  PluginManager.registerCommand(pluginName, "add_enemy_random_id", args => {
    const EmemyId = JSON.parse(args.add_enemy_rndm_id);
    const RandomCount = JSON.parse(args.add_enemy_rndm_count);
    for (let i = 0; i < RandomCount; i++) {
      let RandomId = EmemyId[1 + Math.randomInt(EmemyId.length - 1)];
      $gameTroop.addEnemy(RandomId, param.randomX, param.randomY);
    };
  });

  //敵が出現しない確立を設定
  //該当機能は使う予定ないので削除
  //PluginManager.registerCommand(pluginName, "add_random_enemy_probability", args => {
  //  for(i = 0; i< args[0];i++){
  //    if(args[1] > Math.randomInt(100)){
  //      $gameTroop.addEnemy(args[2+Math.randomInt(args.length - 2)], param.randomX, param.randomY);
  //    }
  //  }
  //});

  //敵が倒された場合、控えの敵追加
  PluginManager.registerCommand(pluginName, "add_reserve_enemy", args => {
    let EmemyIds = [];
    //初回時:コマンドスクリプトの敵ID一覧を取得、2回目以降:未出現の敵ID
    if (!KeepEnemyId.length && !KeepFlg) {
      //初回時
      EmemyIds = JSON.parse(args.add_res_enemy_id);
      KeepFlg = 1;
    } else if (KeepEnemyId.length) {
      //控え敵ID存在時
      EmemyIds = KeepEnemyId;
    } else {
      //控え敵ID未存在時(全ての控え敵を出現後)
      AddFlg = 0;
    };

    //敵が死亡した数分、控えの敵を出現(フィールドに表示する敵の数が初期の数より多くならない)
    //初期4体、1ターンで3体死亡、控えの敵ID数が3以上なら3体を出現させ、フィールド上は4体をキープ
    $gameTroop.members().map(function (EnemyInfo) {
      if (EnemyInfo.hp <= 0) {
        let EmemyId = EmemyIds.shift();
        $gameTroop.addEnemy(EmemyId, EnemyInfo._screenX, EnemyInfo._screenY);
        //出現した敵の合計数をカウント
        TotalEnemy += 1;
      };
    });

    //未出現の控えの敵IDを保持
    KeepEnemyId = EmemyIds.concat();

    //敵HPが0の配列を削除
    let i = 0;
    while (i <= $gameTroop.members().length - 1) {
      if ($gameTroop.members()[i].hp <= 0) {
        $gameTroop.members().splice(i, 1);
      } else {
        i++;
      };
    };

  });

  PluginManager.registerCommand(pluginName, "add_random_reserve_enemy", args => {
    for (i = 0; i < args[0]; i++) {
      $gameTroop.addReserveEnemy(args[1 + Math.randomInt(args.length - 1)]);
    }
  });

  //控えの敵削除
  //該当機能は使う予定ないので削除
  //PluginManager.registerCommand(pluginName, "clear_reserve_enemy", args => {
  //    $gameTroop.refreshReserveEnemies();
  //});

})();
