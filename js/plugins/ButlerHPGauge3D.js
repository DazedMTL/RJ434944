(() => {
    'use strict';

    const pluginName = 'ButlerHPGauge3D';

    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);

    //-------------------------------------------------------------------------
    // Pseudo3DBattle
    //
    // 疑似3Dの動作を管理する静的クラスです。
    // 現在の仕様では外部プラグインからの上書き、及び再定義はできません。
    // BattleManager から最低限のメソッドにアクセスできます。
    function Pseudo3DBattle() {
        throw new Error('This is a static class');
    }

    Pseudo3DBattle._sideViewDriftBase = { x: 20, y: 8, altitude: 16, skew: 0.24 };
    Pseudo3DBattle._sideViewMoveMethods = {
        // ここのメソッドは Pseudo3DBattle を this として呼び出します。
        setup() {
            return { altitude: 50, scale: 0.7 };
        },
        startBattle() {
            return { duration: 150 };
        },
        home(duration = 60) {
            return { duration, type: 'Slow start and end' };
        },
        inputting(user) {
            const pos = this.targets2dPosition([user]);
            return {
                x: this.bringInsideX(pos.x),
                y: pos.y,
                altitude: -15,
                scale: 1.1,
                duration: 40
            };
        },
        targeting(targets) {
            const pos = this.targets2dPosition(targets);
            if (!pos) return null;
            return {
                x: this.bringInsideXByRate(pos.x, 0.4),
                y: this.bringInsideYByRate(pos.y, 0.4),
                altitude: targets.length > 1 ? 10 : -10,
                scale: targets.length > 1 ? 1 : 1.1,
                duration: this.isAction() ? 12 : 30
            };
        },
        endTargeting() {
            return { duration: this.isAction() ? 12 : 30 };
        },
        showAnimation(targets) {
            const pos = this.targets2dPosition(targets);
            if (!pos) return null;
            return {
                x: this.bringInsideXByRate(pos.x, 0.3),
                y: this.bringInsideYByRate(pos.y, 0.3),
                altitude: -20,
                scale: targets.length > 1 ? 1.05 : 1.1,
                duration: 16
            };
        },
        damage(target) {
            const pos = this.targets2dPosition([target]);
            return {
                x: this.bringInsideXByRate(pos.x, 0.3),
                y: this.bringInsideYByRate(pos.y, 0.3),
                altitude: -20,
                scale: 1.1,
                duration: 30,
                type: 'Slow start and end'
            };
        },
        collapse(target) {
            const pos = this.targets2dPosition([target]);
            return {
                x: this.bringInsideXByRate(pos.x, 0.4),
                y: this.bringInsideYByRate(pos.y, 0.4),
                altitude: -20,
                scale: 1.13,
                duration: 12
            };
        },
        endAction() {
            return { duration: 45, type: 'Slow start and end' };
        },
        driftOn() {
            return {}; // dummy
        },
        driftOff() {
            return {}; // dummy
        },
        victory() {
            const pos = this.targets2dPosition($gameParty.members());
            if (!pos) return {};
            return {
                x: this.bringInsideX(pos.x),
                y: pos.y,
                altitude: -10,
                scale: 1.15,
                skew: pos.x < this.centerX() ? -0.12 : 0.12,
                duration: 90,
                isWait: true,
                type: 'Slow start and end'
            };
        },
        escape() {
            return {
                x: this.centerX(),
                y: this.centerY(),
                altitude: 50,
                scale: 0.87,
                duration: 120
            };
        },
        defeat() {
            return {
                x: this.centerX(),
                y: this.centerY(),
                altitude: 40,
                scale: 0.8,
                duration: 240,
                isWait: true
            };
        },
        focus(targets, scale, duration) {
            const pos = this.targets2dPosition(targets);
            if (!pos) return null;
            return {
                x: this.bringInsideXByRate(pos.x, 0.4),
                y: this.bringInsideYByRate(pos.y, 0.4),
                altitude: -10,
                scale,
                duration
            };
        }
    };
    Pseudo3DBattle.targets2dPosition = function (targets) {
        const sprites = BattleManager._spriteset.makeTargetSprites(targets);
        return this.targetSprites2dPosition(sprites);
    };

    Pseudo3DBattle.targetSprites2dPosition = function (targetSprites) {
        if (targetSprites.length === 0) {
            return null;
        }
        const pos = targetSprites.reduce((pos, target) => {
            pos.x += target.targetGroundX();
            pos.y += target.targetGroundY();
            return pos;
        }, new Point());
        pos.x /= targetSprites.length;
        pos.y /= targetSprites.length;
        return pos;
    };

    //-------------------------------------------------------------------------
    // Sprite_Battler

    const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function () {
        _Sprite_Battler_initMembers.apply(this, arguments);
        this._pseudo3dType = 'obj';
    };

    Sprite_Battler.prototype.pseudo3dAltitude = function () {
        return this._homeY + this._offsetY - this.y;
    };

    Sprite_Battler.prototype.targetGroundX = function () {
        return this._homeX + (this._targetOffsetX || 0);
    };

    Sprite_Battler.prototype.targetGroundY = function () {
        return this._homeY + (this._targetOffsetY || 0);
    };

    //-------------------------------------------------------------------------
    // Sprite_Enemy

    Sprite_Enemy.prototype.targetGroundY = function () {
        const groundY = Sprite_Battler.prototype.targetGroundY.call(this);
        return groundY - this.height / 8;
    };

    Sprite_Enemy.prototype.pseudo3dAltitude = function () {
        const altitude = Sprite_Battler.prototype.pseudo3dAltitude.call(this);
        return altitude - this.height / 20;
    };
})();    
