export class DamageCalc {
  static defaultHit = {count: 1};

  constructor(skill, mods, loadout) {
    this.skill = skill;
    this.mods = mods;
    this.loadout = loadout;

    if (!this.skill) {
      this.skill = {
        name: 'None',
        hits: [DamageCalc.defaultHit],
      };
    }
  }

  getHitMultiplier(hit) {
    return DamageCalc.getMultiplier(hit?.multiplier ?? 1, this.mods, hit);
  }

  hitDamage(hit, mods, extraMods=[], includeAdditive=true) {
    if (!hit) {
      hit = DamageCalc.defaultHit;
    }

    let combinedMods = mods.concat(extraMods)
    let totalDamage = 0;

    for (let i = 0; i < DamageCalc.hitCount(hit, combinedMods, this.skill); i++) {
      let damage = this.loadout.baseAttackPower;
      let hitMods = combinedMods.filter(x => !x.hitDuration || x.hitDuration > hit.previousHits + i);

      hitMods.push(hit);

      if (hit?.element) {
        hitMods.push(this.loadout.weaknessMod(hit.element));
      }

      let multiplier = this.getTotalMultiplier(hit, hitMods, 'multiplier', includeAdditive? 'additiveMultiplier' : 'nope');
      let hitDamage = damage * multiplier;

      totalDamage += Math.round(this.loadout.capDamage ? Math.min(hitDamage, 9999) : hitDamage);
    }

    return totalDamage;
  }

  hitCrit(hit, mods, extraMods=[]) {
    let crit = this.loadout.baseCrit;
    let combinedMods = mods.concat(extraMods);
    let extra = this.getTotalMultiplier(hit, combinedMods, 'nope', 'crit', 'critGroup') - 1;

    return Math.min(crit + extra, 100);
  }

  skillCrit(extraMods=[]) {
    let hit = this.hitCrit({}, this.mods, extraMods);

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
    let damage = 0;
    let hits = DamageCalc.getHits(this.skill, this.mods, extraMods);

    for (const hit of hits) {
      hit.name = this.skill?.name;
      hit.isSkill = 'isSkill' in this.skill ? this.skill.isSkill : true;
      damage += this.hitDamage(hit, this.mods, extraMods, includeAdditive);
    }

    return damage;
  }

  skillCritDamage(extraMods=[]) {
    return this.skillDamage(extraMods.concat(['Critical Hit']));
  }

  skillAverageDamage(extraMods=[]) {
    let critChance = this.skillCrit() / 100;
    let hitChance = 1 - critChance;

    return Math.round(this.skillDamage(extraMods) * hitChance + this.skillCritDamage(extraMods) * critChance);
  }

  getTotalMultiplier(hit, mods, multName='multiplier', additiveMultName='additiveMultiplier', additiveGroupName='additiveGroup') {
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

      let multiplier = DamageCalc.getMultiplier(target, mods, hit, multName);

      totalMultiplier *= multiplier;

      if (mod[additiveMultName]) {
        let group = String(mod[additiveGroupName]);
        let mult = DamageCalc.getMultiplier(mod[additiveMultName], mods, hit);
        groups[group] = (groups[group] || 0) + mult;
      }
    }

    for (const group in groups) {
      totalMultiplier *= 1 + groups[group];
    }

    return totalMultiplier;
  }

  static hitCount(hit, mods, skill) {
    let count = hit.count ?? 1;

    if (typeof count === 'function') {
      count = DamageCalc.resolveFunction(count, mods, skill);
    }

    return count;
  }

  static resolveFunction(func, mods, skill) {
    mods.byName = (name) => mods.find(mod => (mod.name ?? mod) === name);
    mods.stainsMet = (requirements) => {
      const stainCounts = ['Fire', 'Ice', 'Lightning', 'Earth', 'Light', 'Dark']
        .reduce((counts, element) => {
          counts[element] = (mods.byName(element)?.count ?? 0)
          return counts;
        }, {});

      for (const element in requirements) {
        const required = requirements[element];
        const nativeAvailable = stainCounts[element];

        if (nativeAvailable < required) {
          const lightAvailable = stainCounts['Light'];

          if (lightAvailable + nativeAvailable >= required) {
            stainCounts['Light'] -= required - nativeAvailable;
          }
          else {
            return false;
          }
        }
      }
      
      return true;
    }

    return func(mods, skill);
  }

  static getHits(skill, mods, extraMods=[]) {
    let hits = skill.hits;
    let combined = mods.concat(extraMods);

    if (!skill || !skill.hits) {
      hits = [DamageCalc.defaultHit];
    }
    else if (typeof skill.hits === 'function') {
      hits = DamageCalc.resolveFunction(skill.hits, combined, skill);
    }

    let extraHits = mods
      .map(x => x.extraHits)
      .filter(x => x);
    
    for (const extra of extraHits) {
      if (typeof extra === 'function') {
        let result = DamageCalc.resolveFunction(extra, mods, skill);
        if (result) {
          hits = hits.concat(result);
        }
      }
      else {
        hits = hits.concat(extra);
      }
    }

    let previousHits = 0;
    for (const hit of hits) {
      hit.previousHits = previousHits;
      previousHits += DamageCalc.hitCount(hit, combined, skill);
    }

    return hits;
  }

  static getMultiplier(target, mods, hit, multName='multiplier') {
    let multiplier = target[multName] ?? 1;

    if (target[multName]) {
      target = target[multName];
    }

    if (typeof target === 'number') {
      multiplier = target;
    }
    else if (typeof target === 'function') {
      let originalElement = hit?.element;
      let tempHit = hit ?? {};
      tempHit = DamageCalc.copyHit(tempHit);

      if (tempHit.element == 'weapon') {
        tempHit.element = mods.find(x => x.element && x.element != 'weapon')?.element ?? 'weapon';
      }

      multiplier = DamageCalc.resolveFunction(target, mods, tempHit);

      tempHit.element = originalElement;
    }

    return multiplier;
  }

  static copyHit(hit) {
    return {
      count: hit.count,
      element: hit.element,
      multiplier: hit.multiplier,
      additiveMultiplier: hit.additiveMultiplier,
      crit: hit.crit,
      previousHits: hit.previousHits,
      isSkill: hit.isSkill,
      name: hit.name,
    }
  }
}