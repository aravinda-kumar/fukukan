import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { NgZone } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Events } from '@ionic/angular';

// statistics libraries
import droll from '../utils/droll';
import stats from '../utils/stats';
import sim from '../utils/simulate';

@Component({
  selector: 'app-stat-unit',
  templateUrl: './stat-unit.page.html',
  styleUrls: ['./styles/stat-unit.page.scss'],
})
export class StatUnitPage implements OnInit {


  @ViewChild('attackerSlides') sliderAttacker: IonSlides;

  constructor(
    public alertController: AlertController,
    public events: Events,
    private zone: NgZone) {
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
  }

  public slideOpts = {
    effect: 'slide',
    loop: false,
    autoplay: 50000
  };

  public defenderSlideOpts = {
    effect: 'slide',
    loop: false,
    autoplay: 50000
  };

  public statisticsSlideOpts = {
    effect: 'flip',
    loop: false,
    autoplay: 50000
  };

  public attackersSlideOpts = {
    effect: 'slide',
    loop: false,
    autoplay: 50000
  };

  public defenderTemplate = {
    geq: 'outline',
    meq: 'outline',
    veq: 'outline',
    keq: 'outline'
  };
  public currentDefenderTmp = '';

  public properties = {
    name: 'New',
    defender: {
      cost: 10,
      toughness: 3,
      wounds: 1,
      save: '5',
      invSave: '-',
      rerollSave: false,
      rerollInvSave: false,
      ignoreDamage: '-',
      hitModifier: 0
    },
    results: {
      probability: 50,
      shotCount: 0,
      hitCount: 0,
      woundCount: 0,
      unsavedWoundCount: 0,
      totalDamage: 0,
      modelDead: 0,
      overKill: 0,
      addShotCount: 0,
      mortalCount: 0,
      modifAPCount: 0,
      damageSixCount: 0,
      damageCount: 0,
      fnpCount: 0,
      finalMortal: 0
    },
    attackerLst: []
  };

  ngOnInit() {
    // Adding one attacker to the list
    this.properties.attackerLst.push({
      cost: 10,
      hitStat: '3',
      weaponShot: '1',
      weaponS: '3',
      weaponAP: '-',
      weaponD: '1',
      hitRollMod: '+0',
      woundRollMod: '+0',
      rerollShots: '-',
      rerollWounds: '-',
      autoWound6: false,
      autoHit6: false,
      apOn6: '-',
      dmgOn6: '-',
      mortalOn6: '-',
      shotCountOn6: '-'
    });
  }

  public setDefenderTmp(tmpl) {

    if (this.currentDefenderTmp === tmpl) {
      this.defenderTemplate[tmpl] = 'outline';
      return;
    }
    // Set defender template according to tmpl
    this.defenderTemplate = {
      geq: 'outline',
      meq: 'outline',
      veq: 'outline',
      keq: 'outline'
    };
    this.currentDefenderTmp = tmpl;

    switch (tmpl) {
      case 'geq':
        this.properties.defender.toughness = 3;
        this.properties.defender.wounds = 1;
        this.properties.defender.save = '5';
        this.properties.defender.invSave = '-';
        this.properties.defender.ignoreDamage = '-';
        this.properties.defender.rerollInvSave = false;
        this.properties.defender.rerollSave = false;
        this.properties.defender.hitModifier = 0;
        this.defenderTemplate.geq = 'solid';
        break;
      case 'meq':
        this.properties.defender.toughness = 4;
        this.properties.defender.wounds = 1;
        this.properties.defender.save = '3';
        this.properties.defender.invSave = '-';
        this.properties.defender.ignoreDamage = '-';
        this.properties.defender.rerollInvSave = false;
        this.properties.defender.rerollSave = false;
        this.properties.defender.hitModifier = 0;

        this.defenderTemplate.meq = 'solid';
        break;
      case 'veq':
        this.properties.defender.toughness = 7;
        this.properties.defender.wounds = 10;
        this.properties.defender.save = '3';
        this.properties.defender.invSave = '-';
        this.properties.defender.ignoreDamage = '-';
        this.properties.defender.rerollInvSave = false;
        this.properties.defender.rerollSave = false;
        this.properties.defender.hitModifier = 0;

        this.defenderTemplate.veq = 'solid';
        break;
      case 'keq':
        this.properties.defender.toughness = 8;
        this.properties.defender.wounds = 25;
        this.properties.defender.save = '3';
        this.properties.defender.invSave = '5';
        this.properties.defender.ignoreDamage = '-';
        this.properties.defender.rerollInvSave = false;
        this.properties.defender.rerollSave = false;
        this.properties.defender.hitModifier = 0;
        this.defenderTemplate.keq = 'solid';
        break;
    }
  }

  public addAttacker() {
    this.properties.attackerLst.push({
      cost: 10,
      hitStat: '3',
      weaponShot: '1',
      weaponS: '3',
      weaponAP: '-',
      weaponD: '1',
      hitRollMod: '+0',
      woundRollMod: '+0',
      rerollShots: '-',
      rerollWounds: '-',
      autoWound6: false,
      autoHit6: false,
      apOn6: '-',
      dmgOn6: '-',
      mortalOn6: '-',
      shotCountOn6: '-'
    });
  }

  async alertYesNoDelete(yesCb, noCb) {
    const alert = await this.alertController.create({
      header: 'Please confirm.',
      message: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            noCb();
          }
        }, {
          text: 'Yes',
          handler: () => {
            yesCb();
          }
        }
      ]
    });

    await alert.present();
  }

  public delAttacker() {
    const thisObj = this;
    this.alertYesNoDelete(() => {
      thisObj.sliderAttacker.getActiveIndex().then((idx) => {
        if (idx !== 0) {
          thisObj.properties.attackerLst.splice(idx, 1);
          this.events.publish('updateScreen');
          thisObj.sliderAttacker.update();
        }
      });
    }, () => {
    });
  }

  public throwDice() {
    const thisObj = this;

    function updateWithModifier(stat, modifier) {
      if (modifier === 'A') {
        return 'A';
      }
      if (modifier !== '-') {
        return stat + modifier;
      }
      return stat;
    }

    function getToWoundMin(strength: number, autoWound: number, toughness: number) {
      let stat = 4;
      if (strength === toughness) {
        stat = 4;
      } else if (strength >= 2 * toughness) {
        stat = 2;
      } else if (strength > toughness) {
        stat = 3;
      } else if (strength <= toughness * 0.5) {
        stat = 6;
      } else if (strength < toughness) {
        stat = 5;
      }

      if (autoWound > 0 && stat > autoWound) {
        stat = autoWound;
      }
      return stat;
    }

    function getToHitMin(hitStat, autoHit, hitMod) {
      let stat = parseInt(hitStat) + parseInt(hitMod);
      if (autoHit > 0 && stat > autoHit) {
        stat = autoHit;
      }
      return stat;
    }

    function computeForEachAttacker(attLst) {
      attLst.forEach(function (attacker) {
        const simAPI = sim.init(droll, stats);

        // Shots
        attacker.shotProb = simAPI.computeDistribution(attacker.weaponShot);

        // Hit
        let dice = updateWithModifier('D6', attacker.hitRollMod);
        attacker.hitProb = dice === 'A' ? simAPI.alwaysSuccessProb() :
          simAPI.computeDistribution(dice, attacker.rerollShots,
            getToHitMin(attacker.hitStat, attacker.autoHit6 ? 6 : 0, thisObj.properties.defender.hitModifier));

        // D6 hit prob
        attacker.hitSixProb = simAPI.computeDistribution('D6', '-', 6);

        // Wound
        dice = updateWithModifier('D6', attacker.woundRollMod);
        attacker.woundProb = simAPI.computeDistribution('D6', attacker.rerollWounds,
          getToWoundMin(attacker.weaponS, attacker.autoWound6 ? 6 : 0, thisObj.properties.defender.toughness));

        // D6 wound prob
        attacker.woundSixProb = simAPI.computeDistribution('D6', '-', 6);

        // Save
        dice = updateWithModifier('D6', attacker.weaponAP);
        attacker.saveProb = thisObj.properties.defender.save === '-' ? simAPI.alwaysFailProb() :
          simAPI.computeDistribution(dice, '-', thisObj.properties.defender.save);

        if (attacker.apOn6 !== '-') {
          dice = updateWithModifier('D6', attacker.apOn6);
          attacker.saveOn6Prob = thisObj.properties.defender.save === '-' ? simAPI.alwaysFailProb() :
            simAPI.computeDistribution(dice, '-', thisObj.properties.defender.save);
        }

        // InvSave
        attacker.invSaveProb = thisObj.properties.defender.invSave === '-' ? simAPI.alwaysFailProb() :
          simAPI.computeDistribution('D6', '-', thisObj.properties.defender.invSave);

        // FNP
        attacker.fnpProb = thisObj.properties.defender.ignoreDamage === '-' ? simAPI.alwaysFailProb() :
          simAPI.computeDistribution('D6', '-', thisObj.properties.defender.ignoreDamage);

        // Regular Damage
        attacker.damageProb = simAPI.computeDistribution(attacker.weaponD);

      });
    }

    // Compute statistics for all attackers
    computeForEachAttacker(this.properties.attackerLst);

    // Aggregate results 
    this.aggregateProbabilities();
  }

  public aggregateProbabilities() {
    const localThis = this;
    const simAPI = sim.init(droll, stats);

    let summary = {
      probability: localThis.properties.results.probability,
      shotCount: 0,
      hitCount: 0,
      woundCount: 0,
      unsavedWoundCount: 0,
      totalDamage: 0,
      modelDead: 0,
      overKill: 0,
      addShotCount: 0,
      mortalCount: 0,
      modifAPCount: 0,
      damageSixCount: 0,
      damageCount: 0,
      fnpCount: 0,
      finalMortal: 0
    };

    function combineProbability(attacker, defender, prob: number) {
      const result = {
        shotCount: 0,
        hitCount: 0,
        woundCount: 0,
        unsavedWoundCount: 0,
        totalDamage: 0,
        modelDead: 0,
        addShotCount: 0,
        mortalCount: 0,
        modifAPCount: 0,
        damageSixCount: 0,
        damageCount: 0,
        fnpCount: 0,
        finalMortal: 0
      };

      // # of shots 
      result.shotCount = simAPI.computeValueProb(attacker.shotProb, prob);

      // # additional shot counts
      result.addShotCount = attacker.shotCountOn6 !== '-' ? result.shotCount * simAPI.computeSuccessProb(attacker.hitSixProb, prob) : 0;

      // # hit (shot * hitProb)
      result.hitCount = simAPI.computeSuccessProb(attacker.hitProb, prob) * (result.shotCount + result.addShotCount);

      // # wounds
      result.woundCount = simAPI.computeSuccessProb(attacker.woundProb, prob) * result.hitCount;

      // # additional wound counts
      result.mortalCount = attacker.mortalOn6 !== '-' ?
        result.woundCount * simAPI.computeSuccessProb(attacker.woundSixProb, prob) * attacker.mortalOn6 :
        0;

      // # of modified AP
      result.modifAPCount = attacker.apOn6 !== '-' ? result.woundCount * simAPI.computeSuccessProb(attacker.woundSixProb, prob) : 0;

      // Unsaved wound
      let regularSave = (result.woundCount - result.modifAPCount) * (1 - simAPI.computeSuccessProb(attacker.saveProb, prob));
      if (attacker.saveOn6Prob !== undefined) {
        regularSave += result.modifAPCount * (1 - simAPI.computeSuccessProb(attacker.saveOn6Prob, prob));
      }
      const invSave = result.woundCount * (1 - simAPI.computeSuccessProb(attacker.invSaveProb, prob));
      result.unsavedWoundCount = (invSave < regularSave) ? invSave : regularSave;

      // # Damage
      result.damageSixCount = attacker.dmgOn6 !== '-' ? simAPI.computeSuccessProb(attacker.woundSixProb, prob) * attacker.dmgOn6 : 0;
      result.damageCount = attacker.dmgOn6 !== '-' ?
        (1 - simAPI.computeSuccessProb(attacker.woundSixProb, prob)) * simAPI.computeValueProb(attacker.damageProb, prob) :
        simAPI.computeValueProb(attacker.damageProb, prob);

      result.damageSixCount *= result.unsavedWoundCount;
      result.damageCount *= result.unsavedWoundCount;
      result.totalDamage = result.damageSixCount + result.damageCount + result.mortalCount;

      // FNP on regular wound
      result.fnpCount = result.totalDamage * simAPI.computeSuccessProb(attacker.fnpProb, prob);
      result.totalDamage -= result.fnpCount;
      result.finalMortal = (1 - simAPI.computeSuccessProb(attacker.fnpProb, prob)) * result.mortalCount;

      return result;
    }

    let countDead = 0;
    let accumDmg = 0;
    this.properties.attackerLst.forEach(function (attacker) {
      const result = combineProbability(attacker, localThis.properties.defender, localThis.properties.results.probability);
      summary.shotCount += result.shotCount;
      summary.hitCount += result.hitCount;
      summary.woundCount += result.woundCount;
      summary.unsavedWoundCount += result.unsavedWoundCount;
      summary.totalDamage += result.totalDamage;
      summary.modelDead += result.modelDead;
      summary.addShotCount += result.addShotCount;
      summary.mortalCount += result.mortalCount;
      summary.modifAPCount += result.modifAPCount;
      summary.fnpCount += result.fnpCount;
      summary.damageSixCount += result.damageSixCount;
      summary.damageCount += result.damageCount;
      summary.finalMortal += result.finalMortal;

      // Accumulate wound to count # deads
      let n = 1;
      while (n < result.unsavedWoundCount) {
        accumDmg += (result.totalDamage - result.finalMortal) / result.unsavedWoundCount;
        if (accumDmg + Number.EPSILON >= localThis.properties.defender.wounds) {
          countDead++;
          accumDmg = 0;
        }
        n++;
      }
      accumDmg += (result.unsavedWoundCount - n + 1) * (result.totalDamage - result.finalMortal) / result.unsavedWoundCount;
      if (accumDmg + Number.EPSILON >= localThis.properties.defender.wounds) {
        countDead++;
        accumDmg = 0;
      }
    });

    // Update # dead models based on mortal wounds
    const remainingMortal = summary.finalMortal - (localThis.properties.defender.wounds - accumDmg);
    if (remainingMortal >= 0) {
      countDead += 1 + Math.floor(remainingMortal / localThis.properties.defender.wounds);
    }
    summary.modelDead = countDead;
    summary.overKill = (countDead !== 0) ? Math.floor(summary.totalDamage / localThis.properties.defender.wounds) / countDead : 1;
    this.properties.results = summary;
  }
}
