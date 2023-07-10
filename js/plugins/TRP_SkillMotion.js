//=============================================================================
// TRP_SkillMotion.js
//=============================================================================
/*:ja
 * @target MZ
 * @author Thirop
 * @plugindesc スキル使用時のモーション簡易設定
 *
 * @help
 * 戦闘モーション拡張系のプラグインとは競合可能性大
 * 必要に応じてプラグイン設定で機能を制限してご利用ください
 * 
 * 《モーション設定》
 * ※設定はいずれもスキルのメモ欄に記述
 *
 * □アニメーションの表示開始を遅らせる
 * <animationDelay:遅延フレーム数>
 *
 * □スキル使用時のモーション変更
 * <motion:モーション名>
 * 有効なモーション名
 * ・walk
 * ・wait
 * ・chant
 * ・guard
 * ・damage
 * ・evade
 * ・thrust
 * ・swing
 * ・missile
 * ・skill
 * ・spell
 * ・item
 * ・escape
 * ・victory
 * ・dying
 * ・abnormal
 * ・sleep
 * ・dead
 *
 * □スキル使用時のモーションを硬直
 * <motionD:硬直フレーム数>
 * └武器を振ったあとにすぐにポーズを戻したくないときに設定
 *
 *
 *
 * @param disableAnimationDelay
 * @text アニメ遅延機能の無効化
 * @desc 競合で動かないときにOFF/falseにしてアニメーション遅延機能を無効化
 * @type boolean
 * @default false
 *
 * @param disableSkillMotion
 * @text モーション変更の無効化
 * @desc 競合で動かないときにOFF/falseにしてスキルモーション変更機能を無効化
 * @type boolean
 * @default false
 *
 * @param disableMotionDuration
 * @text モーション硬直の無効化
 * @desc 競合で動かないときにOFF/falseにしてモーションの硬直機能を無効化
 * @type boolean
 * @default false
 */
//============================================================================= 
//PRAGMA: englishHeader
/*:
 * @target MZ
 * @author Thirop
 * @plugindesc Simplified motion settings for skill use
 *
 * @help
 * May conflict with combat motion enhancement plug-ins.
 * Please limit the functionality in the plugin settings as needed.
 * 
 * [Motion setting]
 * All settings are described in the notes section of the skill
 *
 * Delay the start of displaying animations
 * <animationDelay:number of delayed frames>.
 *
 * Changed motion when using skill
 * <motion:motion name>
 * Valid motion name
 *   walk
 *   wait
 *   chant
 *   guard
 *   damage
 *   evade
 *   thrust
 *   swing
 *   missile
 *   skill
 *   spell
 *   item
 *   escape
 *   victory
 *   dying
 *   abnormal
 *   sleep
 *   dead
 *
 * Stiff motion when using skills
 * <motionD: Number of rigid frames>.
 * Set when you don't want to return to the pose immediately after swinging the weapon
 *
 *
 *
 * @param disableAnimationDelay
 * @text Disable animation delay function
 * @desc Turn OFF/false to disable the function when it does not work due to conflicts
 * @type boolean
 * @default false
 *
 * @param disableSkillMotion
 * @text Disable motion change
 * @desc Turn OFF/false to disable the function when it does not work due to conflicts
 * @type boolean
 * @default false
 *
 * @param disableMotionDuration
 * @text Disable motion stiffness
 * @desc Turn OFF/false to disable the function when it does not work due to conflicts
 * @type boolean
 * @default false
 */
//============================================================================= 
//PRAGMA_END: englishHeader

(function () {
	'use strict';

	var parameters = PluginManager.parameters('TRP_SkillMotion');

	var disableAnimationDelay = parameters.disableAnimationDelay === 'true';
	var disableSkillMotion = parameters.disableSkillMotion === 'true';
	var disableMotionDuration = parameters.disableMotionDuration === 'true';


	//=============================================================================
	// AnimationDelay
	//=============================================================================
	(() => {
		if (disableAnimationDelay) return;

		//=============================================================================
		// Window_BattleLog
		//=============================================================================
		var _Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
		Window_BattleLog.prototype.initialize = function (rect) {
			_Window_BattleLog_initialize.call(this, rect);

			this._animationDelay = 0;
			this._reservedAnimations = [];
		};


		var _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
		Window_BattleLog.prototype.startAction = function (subject, action, targets) {
			_Window_BattleLog_startAction.call(this, subject, action, targets);

			const item = action.item();
			if (item && item.meta.animationDelay) {
				this._animationDelay = Number(item.meta.animationDelay) || 0;
			} else {
				this._animationDelay = 0;
			}
		};

		var _Window_BattleLog_endAction = Window_BattleLog.prototype.endAction;
		Window_BattleLog.prototype.endAction = function (subject) {
			_Window_BattleLog_endAction.call(this, subject);
			this._animationDelay = 0;
		};

		var _Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
		Window_BattleLog.prototype.showAnimation = function (
			subject, targets, animationId
		) {
			if (this._animationDelay > 0) {
				this._reservedAnimations.push([
					this._animationDelay, ...arguments
				]);
			} else {
				_Window_BattleLog_showAnimation.call(this, ...arguments);
			}
		};

		var _Window_BattleLog_update = Window_BattleLog.prototype.update;
		Window_BattleLog.prototype.update = function () {
			_Window_BattleLog_update.call(this);
			if (this._reservedAnimations) {
				this.updateReservedAnimations();
			}
		};
		Window_BattleLog.prototype.updateReservedAnimations = function () {
			var animations = this._reservedAnimations;
			var length = animations.length;
			for (var i = 0; i < length; i = (i + 1) | 0) {
				var data = animations[i];
				data[0] -= 1;
				if (data[0] <= 0) {
					animations.splice(i, 1);
					i -= 1;
					length -= 1;
					data.shift();
					_Window_BattleLog_showAnimation.call(this, ...data);
				}
			}
		};

		var _Window_BattleLog_isBusy = Window_BattleLog.prototype.isBusy
		Window_BattleLog.prototype.isBusy = function () {
			if (this._reservedAnimations.length) return true;
			return _Window_BattleLog_isBusy.call(this);
		};
	})();






	//=============================================================================
	// SkillMotion
	//=============================================================================
	(() => {
		if (disableSkillMotion) return;

		var _Game_Actor_performAction = Game_Actor.prototype.performAction;
		Game_Actor.prototype.performAction = function (action) {
			var skill = action.item();
			if (skill && skill.meta.motion) {
				var motion;
				if (skill.meta.motion === 'attack') {
					var weapons = this.weapons();
					var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
					var attackMotion = $dataSystem.attackMotions[wtypeId];
					if (attackMotion) {
						if (attackMotion.type === 0) {
							motion = 'thrust';
						} else if (attackMotion.type === 1) {
							motion = 'swing';
						} else if (attackMotion.type === 2) {
							motion = 'missile';
						}
						this.startWeaponAnimation(attackMotion.weaponImageId);
					} else {
						_Game_Actor_performAction.call(this, action);
					}
				} else {
					motion = skill.meta.motion;
				}
				this.requestMotion(motion);
			} else {
				_Game_Actor_performAction.call(this, ...arguments);
			}
		};
	})();




	//=============================================================================
	// MotionDuration
	//=============================================================================
	(() => {
		if (disableMotionDuration) return;

		//=============================================================================
		// Game_Actor
		//=============================================================================
		var Game_Actor_initMembers = Game_Actor.prototype.initMembers;
		Game_Actor.prototype.initMembers = function () {
			Game_Actor_initMembers.call(this);
			this._motionDuration = 0;
		};

		var _Game_Actor_performAction = Game_Actor.prototype.performAction;
		Game_Actor.prototype.performAction = function (action) {
			var skill = action.item();

			if (skill.meta.motionD) {
				this._motionDuration = Number(skill.meta.motionD);
			} else {
				this._motionDuration = 0;
			}

			_Game_Actor_performAction.call(this, ...arguments);
		};

		//=============================================================================
		// Sprite_Actor
		//=============================================================================
		var _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
		Sprite_Actor.prototype.initMembers = function () {
			_Sprite_Actor_initMembers.call(this);
			this._motionDuration = 0;
		};

		var _Sprite_Actor_startMotion = Sprite_Actor.prototype.startMotion;
		Sprite_Actor.prototype.startMotion = function (motionType) {
			const newMotion = Sprite_Actor.MOTIONS[motionType];
			if (this._motion !== newMotion) {
				this._motionDuration = this._actor._motionDuration || 0;
			};
			_Sprite_Actor_startMotion.call(this, ...arguments);
		};

		var _Sprite_Actor_updateMotionCount = Sprite_Actor.prototype.updateMotionCount
		Sprite_Actor.prototype.updateMotionCount = function () {
			if (this._motion
				&& !this._motion.loop
				&& this._pattern === 2
				&& (this._motionCount + 1) >= this.motionSpeed()
				&& this._motionDuration > 0) {
				this._motionDuration -= 1;
			} else {
				_Sprite_Actor_updateMotionCount.call(this);
			}
		};

		var _Sprite_Actor_setupWeaponAnimation = Sprite_Actor.prototype.setupWeaponAnimation;
		Sprite_Actor.prototype.setupWeaponAnimation = function () {
			var requested = this._actor.isWeaponAnimationRequested();

			_Sprite_Actor_setupWeaponAnimation.call(this);

			if (requested) {
				this._weaponSprite.setMotionDuration(this._actor._motionDuration)
			}
		};

		//=============================================================================
		// Sprite_Weapon
		//=============================================================================
		var _Sprite_Weapon_initMembers = Sprite_Weapon.prototype.initMembers;
		Sprite_Weapon.prototype.initMembers = function () {
			_Sprite_Weapon_initMembers.call(this);
			this._motionDuration = 0;
		};
		Sprite_Weapon.prototype.setMotionDuration = function (duration = 0) {
			this._motionDuration = duration;
		};

		var _Sprite_Weapon_update = Sprite_Weapon.prototype.update;
		Sprite_Weapon.prototype.update = function () {
			if (this._pattern === 2 && this._motionDuration > 0) {
				this._motionDuration -= 1;
				Sprite.prototype.update.call(this);
			} else {
				_Sprite_Weapon_update.call(this);
			}
		};
	})();








})();