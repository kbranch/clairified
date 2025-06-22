import { reactive } from "vue";

export var luminas = reactive([
  {
    name: 'Dead Energy II',
    description: 'Deal 10% more damage. Recover 3 AP on killing an enemy',
    icon: 'dead_energy_2.png',
    cost: 2,
    multiplier: 1.1,
    selected: false,
  },
  {
    name: 'First Strike',
    description: 'Deal 10% more damage. Play first.',
    icon: 'first_strike.png',
    cost: 10,
    multiplier: 1.1,
  },
  {
    name: 'Teamwork',
    description: 'Deal 10% more damage. Deal 21% more damage instead if allies are alive.',
    icon: 'teamwork.png',
    cost: 5,
    multiplier: (mods) => mods.byName('Allies Alive') ? 1.21 : 1.1,
  },
  {
    name: 'Sweet Kill',
    description: 'Deal 10% more damage. Heal 50% Health on killing an enemy.',
    icon: 'sweet_kill.png',
    cost: 5,
    multiplier: 1.1,
  },
  {
    name: 'At Death\'s Door',
    description: 'Deal 50% more damage if Health is below 10%',
    cost: 5,
    multiplier: (mods) => mods.byName('Health %')?.count < 10 ? 1.5 : 1,
  },
  {
    name: 'Augmented Aim',
    description: '50% increased Free Aim damage',
    cost: 3,
    additiveMultiplier: (mods, skill) => skill.name == 'Free Aim' ? 0.5 : 0,
  },
  {
    name: 'Augmented Attack',
    description: '50% increased Base Attack damage',
    cost: 7,
    additiveMultiplier: (mods, skill) => skill.name == 'Base Attack' ? 0.5 : 0,
  },
  {
    name: 'Augmented Counter I',
    description: '25% increased Counterattack damage',
    cost: 3,
    additiveMultiplier: (mods, skill) => ['Counterattack', 'Gradient Counter'].includes(skill.name) ? 0.25 : 0,
  },
  {
    name: 'Augmented Counter II',
    description: '50% increased Counterattack damage',
    cost: 5,
    additiveMultiplier: (mods, skill) => ['Counterattack', 'Gradient Counter'].includes(skill.name) ? 0.5 : 0,
  },
  {
    name: 'Augmented First Strike',
    description: 'Deal 50% increased damage on the first hit',
    cost: 5,
    additiveMultiplier: (mods) => mods.byName('Turn')?.count == 1 ? 0.5 : 0,
    hitDuration: 1,
  },
  {
    name: 'First Offensive',
    description: 'First hit dealt and taken deals 50% more damage',
    cost: 5,
    multiplier: (mods) => mods.byName('Turn')?.count == 1 ? 1.5 : 1,
    hitDuration: 1,
  },
  // {
  //   name: 'Breaker',
  //   description: '25% more Break potency',
  //   cost: 10,
  //   breakMultiplier: 1.25,
  // },
  // {
  //   name: 'Breaking Burn',
  //   description: '25% more Break potency on burning targets',
  //   cost: 5,
  //   breakMultiplier: (mods) => mods.byName('Burn') ? 1.25 : 1,
  // },
  // {
  //   name: 'Breaking Counter',
  //   description: '50% more Break potency on Counterattack',
  //   cost: 3,
  //   breakMultiplier: (mods, skill) => skill.name == 'Counterattack' ? 1.5 : 1,
  // },
  // {
  //   name: 'Breaking Shots',
  //   description: '50% increased Break potency with Free Aim shots',
  //   cost: 3,
  //   breakMultiplier: (mods, skill) => skill.name == 'Free Aim' ? 1.5 : 1,
  // },
  {
    name: 'Combo Attack I',
    description: 'Base Attack has 1 extra hit',
    cost: 10,
    extraHits: (mods, skill) => {
      if (skill.name == 'Base Attack') {
        return [{
          count: 1,
          element: 'weapon',
          multiplier: 0.5,
        }];
      }

      return null;
    },
  },
  {
    name: 'Combo Attack II',
    description: 'Base Attack has 1 extra hit',
    cost: 20,
    extraHits: (mods, skill) => {
      if (skill.name == 'Base Attack') {
        return [{
          count: 1,
          element: 'weapon',
          multiplier: 0.5,
        }];
      }

      return null;
    },
  },
  {
    name: 'Combo Attack III',
    description: 'Base Attack has 1 extra hit',
    cost: 30,
    extraHits: (mods, skill) => {
      if (skill.name == 'Base Attack') {
        return [{
          count: 1,
          element: 'weapon',
          multiplier: 0.5,
        }];
      }

      return null;
    },
  },
  // {
  //   name: 'Critical Break',
  //   description: '25% more Break potency on Critical hits',
  //   cost: 5,
  //   breakMultiplier: (mods) => mods.byName('Critical Hit') ? 1.25 : 1,
  // },
  {
    name: 'Critical Burn',
    description: '25% increased Critical Chance on Burning enemies',
    cost: 5,
    crit: (mods) => mods.byName('Burn') ? 25 : 0,
  },
  {
    name: 'Critical Vulnerability',
    description: '25% increased Critical Chance on Defenceless enemies',
    cost: 5,
    crit: (mods) => mods.byName('Defenceless') ? 25 : 0,
  },
  {
    name: 'Double Mark',
    description: 'Mark requires one more hit to be removed',
    cost: 20,
  },
  {
    name: 'Greater Defenceless',
    description: '+15% to Defenceless damage amplification',
    cost: 15,
  },
  {
    name: 'Greater Powerful',
    description: '+15% to Powerful damage increase',
    cost: 10,
  },
  {
    name: 'Powered Attack',
    description: 'On every damage dealt, try to consume 1 AP. If successful, increase damage by 20%.',
    cost: 10,
    additiveMultiplier: 0.2,
  },
  {
    name: 'Critical Moment',
    description: '50% increased Critical Chance if Health is below 30%',
    cost: 5,
    crit: (mods) => mods.byName('Health %')?.count < 30 ? 50 : 0,
  },
  {
    name: 'Exhausting Power',
    description: 'Deal 50% increased damage if Exhausted',
    cost: 2,
    additiveMultiplier: (mods) => mods.byName('Exhausted') ? 0.5 : 0,
  },
  {
    name: 'Inverted Affinity',
    description: 'Apply Inverted on self on battle start. Deal 50% increased damage while Inverted.',
    cost: 5,
    additiveMultiplier: (mods) => mods.byName('Inverted') ? 0.5 : 0,
  },
  {
    name: 'Last Stand Critical',
    description: '100% Critical Chance while fighting alone',
    cost: 3,
    crit: (mods) => mods.byName('Alone') ? 100 : 0,
  },
  {
    name: 'Stun Boost',
    description: 'Deal 30% increased damage on Stunned targets',
    cost: 10,
    additiveMultiplier: (mods) => mods.byName('Stunned') ? 0.3 : 0,
  },
  // {
  //   name: 'Staggering Attack',
  //   description: '50% more Break potency on Base Attack',
  //   cost: 3,
  //   breakMultiplier: (mods, skill) => skill.name == 'Base Attack' ? 1.5 : 1,
  // },
  {
    name: 'Solo Fighter',
    description: 'Deal 50% more damage if fighting alone',
    cost: 1,
    multiplier: (mods) => mods.byName('Alone') ? 1.5 : 1,
  },
  {
    name: 'Warming Up',
    description: 'Gain 5% increased damage at turn start, up to 25%',
    cost: 15,
    additiveMultiplier: (mods) => Math.min(mods.byName('Turn')?.count ?? 0, 5) * 0.05,
  },
  {
    name: 'Confident Fighter',
    description: 'Deal 30% increased damage, but can\'t be Healed',
    cost: 15,
    additiveMultiplier: 0.3,
  },
  {
    name: 'Glass Canon',
    description: 'Deal 25% more damage, but take 25% more damage',
    cost: 10,
    multiplier: 1.25,
  },
  {
    name: 'Immaculate',
    description: 'Deal 30% increased damage until a hit is received',
    cost: 10,
    additiveMultiplier: (mods) => (mods.byName('Hits Taken')?.count ?? 0) > 0 ? 0 : 0.3,
  },
  {
    name: 'Shield Affinity',
    description: 'Deal 30% increased damage while having Shields, but receiving any damage always removes all Shields',
    cost: 15,
    additiveMultiplier: (mods) => mods.byName('Self Shield') ? 0.3 : 0,
  },
  {
    name: 'Versatile',
    description: 'After a Free Aim hit, Base Attack damage is increased by 50% for 1 turn',
    cost: 5,
    additiveMultiplier: (mods, skill) => skill.name == 'Base Attack' && (mods.byName('Shots Fired')?.count ?? 0) > 0 ? 0.5 : 0,
  },
]);