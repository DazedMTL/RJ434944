//=============================================================================
// SoR_BattleTeminationRefactor_MZ.js
// SoR License (C) 2020 蒼竜, REQUIRED User Registration on Dragon Cave
// http://dragonflare.blue/dcave/license.php
// ----------------------------------------------------------------------------
// Latest version v1.30 (2021/10/07)
//=============================================================================
/*:ja
@plugindesc ＜戦闘終了処理ルーチン細分化＞ v1.30
@author 蒼竜
@target MZ
@url http://dragonflare.blue/dcave/
@help 戦闘終了(勝利・敗北・中断)時の処理実装を細分化します。
RPGツクールのデフォルトシステムでは仕様上、プラグインによる
敗北時処理の機能拡張性に乏しく、プラグイン単位での競合のリスク管理が
煩雑であるため、根本の修正を行います。

"ゲームそのものには何の変化もありません"が、
他の戦闘敗北処理に干渉する拡張プラグインのための基幹システムとなります。
できるだけプラグインマネージャ上部へ入れてください。

※今後の「戦闘終了処理」に干渉するプラグインたちの基盤となる
必須の前提プラグインとなります。

※関連プラグインの状況に応じて、拡張・更新があります。
関連プラグインの導入・更新においては、本プラグインも常に
「最新の状態」である必要があります。

@param Enable_EscapeAbort
@desc 逃走による中断処理も細分化する。対応するプラグイン使用時に必須 (default: true)
@default true
@type boolean
@param Enable_BattleEndCheck
@desc 戦闘終了判定処理も細分化する。対応するプラグイン使用時に必須 (default: true)
@default true
@type boolean
*/
/*:
@plugindesc <Battle Termination Process Refactor> v1.30
@author Soryu
@target MZ
@url http://dragonflare.blue/dcave/index_e.php
@help This plugin modify the default implementation in battle termination
due to victory and lost process by classifying them into more smaller 
chanks of process.

Modification of battle defeated process by each plugin may emerge
great risk due to poor extendability in default RPGMaker system.

Just this plugin actually gives "NO effect" to the games,
which is a fundamental treatment for other plugins to extend 
the battle defeated process.

!! This is a prerequisite (base) plugin for upcoming plugins which approach
to "Battle Termination Process".

!! This plugin will be updated and extended according to the release and 
update of other related plugin. Therefore, this must be always UP-TO-DATE.

@param Enable_EscapeAbort
@desc Also refactorize the process of battle abort by "escape", which is required for corresponding plugins. (default: true)
@default true
@type boolean
@param Enable_BattleEndCheck
@desc Also refactorize the process of battle termination check, which is required for corresponding plugins. (default: true)
@default true
@type boolean
*/


(function () {
    const pluginName = "SoR_BattleTeminationRefactor_MZ";
    const Param = PluginManager.parameters(pluginName);
    const Enable_EscapeAbort = Boolean(Param['Enable_EscapeAbort'] === 'true') || false;
    const Enable_BattleEndCheck = Boolean(Param['Enable_BattleEndCheck'] === 'true') || false;


    //OVER WRITTEN the core of processVictory
    BattleManager.processVictory = function () {
        this.ProcessWin_ExtendedProcess1();//other
        this.BattleWinInitialProcess();//init
        this.ProcessWinSounds();//sound 
        this.PrepareBattleRewards();//rew
        this.ProcessWin();//winmes,rewards
        this.ProcessWin_ExtendedProcess2();//other
        this.BattleWinTerminater();//end
    }

    /////////////////////////////////////////////////////////////
    //ORIGINAL SMALL ROUTINES
    BattleManager.BattleWinInitialProcess = function () {//init
        this.RefreshStatusAfterWin();
        this.BattleWinPerformance();
    }
    BattleManager.RefreshStatusAfterWin = function () {
        $gameParty.removeBattleStates();
    }
    BattleManager.BattleWinPerformance = function () {
        $gameParty.performVictory();
    }



    BattleManager.ProcessWinSounds = function () {//sound
        this.ProcessWinZingles();
        this.ProcessWin_AfterSounds();
    }
    BattleManager.ProcessWinZingles = function () {
        this.playVictoryMe();
    }
    BattleManager.ProcessWin_AfterSounds = function () {
        this.replayBgmAndBgs();
    }



    BattleManager.PrepareBattleRewards = function () {//rew
        this.makeRewards();//default reward
        this.FinalizeBattleRewards();
    }

    BattleManager.FinalizeBattleRewards = function () {//rew 
        this.FinalizeBattleRewards_forward();
        this.FinalizeBattleRewards_midterm1();
        this.FinalizeBattleRewards_midterm2();
        this.FinalizeBattleRewards_last();
    }

    BattleManager.FinalizeBattleRewards_forward = function () {//rew
    }
    BattleManager.FinalizeBattleRewards_midterm1 = function () {//rew
    }
    BattleManager.FinalizeBattleRewards_midterm2 = function () {//rew
    }
    BattleManager.FinalizeBattleRewards_last = function () {//rew
    }


    BattleManager.ProcessWin = function () {//mes
        this.ProcessWinMessage();
        this.ProcessWinRewards();
        this.ProcessWinRewardsGain();
    }
    BattleManager.ProcessWinMessage = function () {//winmes,rewards
        this.displayVictoryMessage();
    }
    BattleManager.ProcessWinRewards = function () {
        this.displayRewards();
    }
    BattleManager.ProcessWinRewardsGain = function () {
        this.gainRewards();
    }




    BattleManager.ProcessWin_ExtendedProcess1 = function () {//other
        /*currently none, defined by others*/
    }

    BattleManager.ProcessWin_ExtendedProcess2 = function () {//other
        /*currently none, defined by others*/
    }


    BattleManager.BattleWinTerminater = function () {//end
        this.TerminateWinBattle();
    }
    BattleManager.TerminateWinBattle = function () {
        this.endBattle(0);
    }


    /////////////////////////////////////////////////////////////////////////////
    //OVER WRITTEN the core of processDefeat
    /////////////////////////////////////////////////////////////////////////////
    BattleManager.processDefeat = function () {
        this.ProcessDefeated_ExtendedProcess1();//other
        this.ProcessDefeatedMessage();//mes
        this.ProcessDefeatedSounds();//sound
        this.ProcessDefeated_ExtendedProcess2();//other
        this.BattleLostTerminater();//end
    }


    /////////////////////////////////////////////////////////////
    //ORIGINAL SMALL ROUTINES
    BattleManager.ProcessDefeatedMessage = function () {//mes
        this.displayDefeatMessage();
    }



    BattleManager.ProcessDefeatedSounds = function () {//sound
        this.ProcessDefeatedZingles();
        this.ProcessDefeated_AfterSounds();
    }
    BattleManager.ProcessDefeatedZingles = function () {
        this.playDefeatMe();
    }
    BattleManager.ProcessDefeated_AfterSounds = function () {
        if (this._canLose) this.ProcessDefeated_AfterSounds_canLose();
        else this.ProcessDefeated_AfterSounds_gameover();
    }

    BattleManager.ProcessDefeated_AfterSounds_canLose = function () {
        this.replayBgmAndBgs();
    }

    BattleManager.ProcessDefeated_AfterSounds_gameover = function () {
        AudioManager.stopBgm();
    }


    BattleManager.ProcessDefeated_ExtendedProcess1 = function () {//other
        /*currently none, defined by others*/
}

    BattleManager.ProcessDefeated_ExtendedProcess2 = function () {//other
        /*currently none, defined by others*/
    }




    BattleManager.BattleLostTerminater = function () {//end
        this.TerminateLostBattle();
    }

    BattleManager.TerminateLostBattle = function () {//end
        this.endBattle(2);
    }








    /////////////////////////////////////////////////////////////////////////////
    //OVER WRITTEN the core of updateBattleEnd
    /////////////////////////////////////////////////////////////////////////////
    BattleManager.updateBattleEnd = function () {
        this.Terminate_BattlePreProcess();//other

        if (this.isBattleTest()) this.Terminate_BattleTest(); //battletest
        else if (!this._escaped && $gameParty.isAllDead()) this.ProcessTerminate_PartyAllDead(); //deadend
        else this.Terminate_BattleNormally();//suspended

        this.CreanUp_BattleTerminate();//cleanup
    }



    /////////////////////////////////////////////////////////////
    //ORIGINAL SMALL ROUTINES
    BattleManager.Terminate_BattlePreProcess = function () {//other
        /*currently none, defined by others*/
    }


    BattleManager.Terminate_BattleTest = function () { //battletest
        AudioManager.stopBgm();
        SceneManager.exit();
    }


    BattleManager.ProcessTerminate_PartyAllDead = function () { //deadend
        if (this._canLose) this.Terminate_canBattleLost();
        else this.Terminate_LostGameOver();
    }
    BattleManager.Terminate_canBattleLost = function () { //deadend
        this.Process_RestoreLostParty(); //can lose
        this.Process_EndBattleScene();
    }
    BattleManager.Process_EndBattleScene = function () { //deadend
        SceneManager.pop();
    }

    BattleManager.Process_RestoreLostParty = function () { //deadend(can lose)
        $gameParty.reviveBattleMembers();
    }
    BattleManager.Terminate_LostGameOver = function () { //deadend
        SceneManager.goto(Scene_Gameover);
    }


    BattleManager.Terminate_BattleNormally = function () {//suspended
        this.Process_EndBattleScene();
    }


    BattleManager.CreanUp_BattleTerminate = function () {//cleanup
        this.CreanUp_originalProcesses();
        this._phase = "";
    }
    BattleManager.CreanUp_originalProcesses = function () {//cleanup
        /*currently none, defined by others*/
    }







    if (Enable_EscapeAbort) {
        /////////////////////////////////////////////////////////////////////////////
        //OVER WRITTEN the core of processEscape
        /////////////////////////////////////////////////////////////////////////////
        BattleManager.processEscape = function () {
            this.processEsc_init();
            this.processEsc_BattlerPerform();
            this.processEsc_PerformSound();

            const evaluated = this.processEsc_evaluation();
            this.processEsc_finalize();
            return evaluated;
        }

        /////////////////////////////////////////////////////////////
        //ORIGINAL SMALL ROUTINES
        BattleManager.processEsc_init = function () {
            // implemented by others
        }

        BattleManager.processEsc_BattlerPerform = function () {
            $gameParty.performEscape();
        }
        BattleManager.processEsc_PerformSound = function () {
            SoundManager.playEscape();
        }

        BattleManager.processEsc_evaluation = function () {
            const success = this.processEsc_evalEscapeRate();
            if (success) this.processEsc_onSuccess();
            else this.processEsc_onFailure();
            return success;
        }


        BattleManager.processEsc_evalEscapeRate = function () {
            if (this._preemptive) return this.processEsc_evalEscapeRate_Preemptive();
            return this.processEsc_evalEscapeRate_regular();
        }
        BattleManager.processEsc_evalEscapeRate_Preemptive = function () {
            return true;
        }
        BattleManager.processEsc_evalEscapeRate_regular = function () {
            return Math.random() < this.processEsc_calcEscapeRate();
        }
        BattleManager.processEsc_calcEscapeRate = function () {
            return this._escapeRatio;
        }

        BattleManager.processEsc_onSuccess = function () {
            this.onEscapeSuccess();
        }
        BattleManager.processEsc_onFailure = function () {
            this.onEscapeFailure();
        }


        //////////////////////////////////////////////////////
        BattleManager.onEscapeSuccess = function () {
            this.displayEscapeSuccessMessage();// default in corescript
            this.processonEscapeSuccess();
            this.processTermination_onSuccess();
        }

        BattleManager.processonEscapeSuccess = function () {
            this._escaped = true;
        }

        BattleManager.processTermination_onSuccess = function () {
            this.processAbort();
        }


        //////////////////////////////////////////////////////
        BattleManager.onEscapeFailure = function () {
            this.processonEscapeFailure();
            this.displayEscapeFailureMessage();// default in corescript
            this.ModifyEscapeRateonEscapeFailure();
            this.processPenalty_EscapeFailure();
        }

        BattleManager.processonEscapeFailure = function () {
            $gameParty.onEscapeFailure();
        }

        BattleManager.ModifyEscapeRateonEscapeFailure = function () {
            this._escapeRatio += 0.1;
        }

        BattleManager.processPenalty_EscapeFailure = function () {
            if (!this.isTpb()) this.startTurn();
        }


        BattleManager.processEsc_finalize = function () {
            // implemented by others
        }

    }



    /////////////////////////////////////////////////////////////////////////////
    //OVER WRITTEN the core of checkBattleEnd
    /////////////////////////////////////////////////////////////////////////////

    if (Enable_BattleEndCheck) {
        BattleManager.checkBattleEnd = function () {
            if (this._phase) {
                if (this.ProcessForceTermination()) return true;
                else if (this.ProcessDefeatedCheck()) return true;
                else if (this.ProcessVictoryCheck()) return true;
            }
            return false;
        }

        BattleManager.ProcessForceTermination = function () {
            const termination = this.checkAbort();
            const additional = this.ProcessTerminateCheck_Additional();
            const additional2 = this.ProcessTerminateCheck_Avoid();
            const flag = (termination || additional) && !additional2;
            return flag;
        }
        //for others
        BattleManager.ProcessTerminateCheck_Additional = function () { return false; }
        BattleManager.ProcessTerminateCheck_Avoid = function () { return false; }


        BattleManager.ProcessDefeatedCheck = function () {
            const alldead = $gameParty.isAllDead();
            const additional = this.ProcessDefeatedCheck_Additional();
            const additional2 = this.ProcessDefeatedCheck_Avoid();

            const flag = (alldead || additional) && !additional2;
            if (flag) {
                this.processDefeat();
                if (this.isAdditional_AfterDefeated()) return false;
            }
            return flag;
        }
        //for others
        BattleManager.ProcessDefeatedCheck_Additional = function () { return false; }
        BattleManager.ProcessDefeatedCheck_Avoid = function () { return false; }
        BattleManager.isAdditional_AfterDefeated = function () { return false; }


        BattleManager.ProcessVictoryCheck = function () {
            const alldead = $gameTroop.isAllDead();
            const additional = this.ProcessVictoryCheck_Additional();
            const additional2 = this.ProcessVictoryCheck_Avoid();

            const flag = (alldead || additional) && !additional2;
            if (flag) this.processVictory();
            return flag;
        }
        //for others
        BattleManager.ProcessVictoryCheck_Additional = function () { return false; }
        BattleManager.ProcessVictoryCheck_Avoid = function () { return false; }
    }


})();