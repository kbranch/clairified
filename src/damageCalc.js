export class DamageCalc {
  constructor(skill, mods, loadout) {
    this.skill = skill;
    this.mods = mods;
    this.loadout = loadout;
  }

  getSkillMultiplier() {
    return DamageCalc.getMultiplier(this.skill?.multiplier ?? 1, this.mods, this.skill);
  }

  hitDamage(mods, extraMods=[], includeAdditive=true) {
    let damage = this.loadout.baseAttackPower;
    let combinedMods = mods.concat(extraMods);
    let multiplier = this.getTotalMultiplier(combinedMods, 'multiplier', includeAdditive? 'additiveMultiplier' : 'nope');

    return damage * multiplier;
  }

  hitCrit(mods, extraMods=[]) {
    let crit = this.loadout.baseCrit;
    let combinedMods = mods.concat(extraMods);
    let extra = this.getTotalMultiplier(combinedMods, 'nope', 'crit', 'critGroup') - 1;

    return Math.min(crit + extra, 100);
  }

  skillCrit(extraMods=[]) {
    let hit = this.hitCrit(this.mods, extraMods);

    return Math.round(hit);
  }

  getSkillQteMultiplier() {
    if (this.skill?.qte) {
      let selectedQte = this.loadout.modByName('QTE').selected;
      return this.skill.qte[selectedQte.name];
    }

    return 1;
  }

  skillDamage(extraMods=[], includeAdditive=true) {
    extraMods = extraMods.concat(this.getSkillQteMultiplier());
    let hit = this.hitDamage(this.mods, [this.getSkillMultiplier()].concat(extraMods), includeAdditive);

    return (Math.round(this.loadout.capDamage ? Math.min(hit, 9999) : hit) * (this.skill?.hits ?? 1));
  }

  skillCritDamage(extraMods=[]) {
    return this.skillDamage(extraMods.concat(['Critical Hit']));
  }

  skillAverageDamage(extraMods=[]) {
    let critChance = this.skillCrit() / 100;
    let hitChance = 1 - critChance;

    return Math.round(this.skillDamage(extraMods) * hitChance + this.skillCritDamage(extraMods) * critChance);
  }

  getTotalMultiplier(mods, multName='multiplier', additiveMultName='additiveMultiplier', additiveGroupName='additiveGroup') {
    let groups = {};
    let totalMultiplier = 1;

    for (const mod of mods) {
      let target = mod;

      if (typeof mod.selected === 'object')
      {
        target = mod.selected;
      }
      else if (typeof mod === 'string') {
        target = this.loadout.modByName(mod);
      }

      let multiplier = DamageCalc.getMultiplier(target, mods, this.skill, multName);

      totalMultiplier *= multiplier;

      if (mod[additiveMultName]) {
        let group = String(mod[additiveGroupName]);
        let mult = DamageCalc.getMultiplier(mod[additiveMultName], mods, this.skill);
        groups[group] = (groups[group] || 0) + mult;
      }
    }

    if (this.skill && this.skill[additiveMultName]) {
      let group = String(this.skill[additiveGroupName]);
      let mult = DamageCalc.getMultiplier(this.skill[additiveMultName], mods, this.skill);
      groups[group] = (groups[group] || 0) + mult;
    }

    for (const group in groups) {
      totalMultiplier *= 1 + groups[group];
    }

    return totalMultiplier;
  }

  static getMultiplier(target, mods, skill, multName='multiplier') {
    let multiplier = target[multName] ?? 1;

    if (target[multName]) {
      target = target[multName];
    }

    if (typeof target === 'number') {
      multiplier = target;
    }
    else if (typeof target === 'function') {
      mods.byName = (name) => mods.find(mod => mod.name === name);
      multiplier = target(mods, skill ?? {});
    }

    return multiplier;
  }
}