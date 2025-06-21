import { reactive } from 'vue'
import { sum } from '../main'

export var skills = reactive([
  {
    name: 'Base Attack',
    isSkill: false,
    hits: [
      {
        count: 1,
        element: 'weapon',
      },
    ],
    apCost: -1,
  },
  {
    name: 'Free Aim',
    isSkill: false,
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: (mods) => (mods.byName('Flying') ? 0.3 : 0.15),
      },
    ],
    apCost: 1,
  },
  {
    name: 'Counterattack',
    isSkill: false,
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: 5.6,
      },
    ],
    apCost: 0,
  },
  {
    name: 'Gradient Counter',
    isSkill: false,
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: 5.95,
      },
    ],
    apCost: 0,
    spoilerLevel: 3,
  },
  {
    name: 'Percée',
    character: 'Maelle',
    icon: 'percée.png',
    description: '220% Physical damage. Mark: Deals 100% more damage. Virtuose Stance: Costs 2 AP.',
    apCost: (mods) => (mods.byName('Virtuose') ? 2 : 5),
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 2.2,
        additiveMultiplier: (mods) => (mods.byName('Mark') ? 1 : 0),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Phantom Strike',
    character: 'Maelle',
    description: '70% Void damage to all enemies. On completion, grants +35% Gradient Charge.',
    apCost: 7,
    spoilerLevel: 5,
    hits: [
      {
        count: 4,
        element: 'void',
        multiplier: 0.7,
      },
    ],
    qte: {
      Perfect: 1.6786, // Seems odd, need to test
      Success: 1.3393,
      Failure: 1,
    },
  },
  {
    name: 'Burning Canvas',
    character: 'Maelle',
    description: '40% Void damage. Applies 1 Burn on hit. Deals 10% more damage for each Burn on target, up to 1000%.',
    apCost: 5,
    spoilerLevel: 5,
    hits: [
      {
        count: 5,
        element: 'void',
        multiplier: (mods) => 0.4 + Math.min(mods.byName('Burn')?.count ?? 0, 100) * 0.04,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Stendhal',
    character: 'Maelle',
    description: '1500% Void damage. Applies Defenceless to Maelle and removes all her Shields (5 turns).',
    apCost: 8,
    spoilerLevel: 5,
    hits: [
      {
        count: 1,
        element: 'void',
        multiplier: 15,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    }
  },
  {
    name: 'Offensive Switch',
    character: 'Maelle',
    description: '100% damage. Uses weapon\'s element. Applies Defenceless on hit (3 turns).',
    apCost: 1,
    hits: [
      {
        count: 1,
        element: 'weapon',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Payback',
    character: 'Maelle',
    description: '500% Physical damage. Can Stun. Reduced AP cost for each attack parried since last turn.',
    apCost: 9,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 5,
      },
    ],
    qte: {
      Perfect: 1.6,
      Success: 1.3,
      Failure: 1,
    }
  },
  {
    name: 'Momentum Strike',
    character: 'Maelle',
    description: '350% damage. Uses weapon\'s element. Mark: Deals 100% more damage. Virtuose Stance: Costs 4 AP.',
    apCost: (mods) => (mods.byName('Virtuose') ? 4 : 7),
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: (mods) => mods.byName('Mark') ? 3.5 * 2 : 3.5,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Fencer\'s Flurry',
    character: 'Maelle',
    description: '140% damage to all enemies. Uses weapon\'s element. Applies Defenceless on hit (1 turn).',
    apCost: 4,
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: 1.4,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Sword Ballet',
    character: 'Maelle',
    description: '75% damage. Uses weapon\'s element. Critical Hits: deal 100% more damage.',
    apCost: 9,
    hits: [
      {
        count: 5,
        element: 'weapon',
        multiplier: (mods) => (mods.byName('Critical Hit') ? 0.75 * 1.33333333 : 0.75), // Needs testing
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Gustave\'s Homage',
    character: 'Maelle',
    description: '50% Lightning damage. Deals 100% more damage on last hit. Mark: Deals 50% more damage. Doesn\'t remove Mark.',
    apCost: 8,
    hits: [
      {
        count: 7,
        element: 'lightning',
        multiplier: (mods) => mods.byName('Mark') ? 0.5 * 1.5 : 0.5,
        leaves: ['Mark'],
      },
      {
        count: 1,
        element: 'lightning',
        multiplier: (mods) => mods.byName('Mark') ? 1 * 1.5 : 1,
        leaves: ['Mark'],
      }
    ],
    qte: {
      Perfect: 1.6,
      Success: 1.3,
      Failure: 1,
    },
  },
  {
    name: 'Revenge',
    character: 'Maelle',
    description: '120% Fire damage. Can Stun. Deals 150% more damage for each hit received since the previous turn.',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'fire',
        multiplier: 1.2,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Pyrolyse',
    character: 'Maelle',
    description: '167% Fire damage. Applies 5 Burn on hit. Offensive Stance: applies 2 more Burn on hit.',
    apCost: 9,
    hits: [
      {
        count: 3,
        element: 'fire',
        multiplier: 1.67,
      },
    ],
    qte: {
      Perfect: 1.133333,
      Success: 1.066667,
      Failure: 1,
    },
  },
  {
    name: 'Virtuose Strike (Gradient)',
    character: 'Maelle',
    description: '30% Physical damage',
    apCost: 1,
    spoilerLevel: 3,
    hits: [
      {
        count: 5,
        element: 'physical',
        multiplier: 0.3,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Breaking Rules',
    character: 'Maelle',
    description: '75% Physical damage. Destroys all Shields on hit. Recovers 1 AP per Shield destroyed. If target is Defenceless, play a second turn.',
    hits: [
      {
        count: 2,
        element: 'physical',
        multiplier: 0.75,
        breakMultiplier: 0.7,
      },
    ],
    apCost: 3,
    qte: {
      Perfect: 1.1,
      Success: 1.05,
      Failure: 1,
    },
  },
  {
    name: 'Degagement',
    character: 'Maelle',
    description: '100% Fire damage. Target becomes weak to Fire damage on hit (2 turns).',
    hits: [
      {
        count: 1,
        element: 'fire',
      },
    ],
    apCost: 2,
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Spark',
    character: 'Maelle',
    description: '100% Fire damage. Applies 3 Burn on hit. Offensive Stance: Applies 2 more Burn on hit.',
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'fire',
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Combustion',
    character: 'Maelle',
    description: '80% Physical damage. Deals 40% more damage for each Burn, up to 400%. Consumes up to 10 Burn on completion.',
    apCost: 4,
    hits: [
      {
        count: 2,
        element: 'physical',
        multiplier: (mods) => (4 - 0.8) * Math.min(mods.byName('Burn')?.count ?? 0, 10) / 10 + 0.8,
        breakMultiplier: 0.7,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Fleuret Fury',
    character: 'Maelle',
    description: '80% Physical damage. Can Stun. If in Virtuose Stance, stay in Virtuose Stance.',
    apCost: 6,
    hits: [
      {
        count: 3,
        element: 'physical',
        multiplier: 0.8,
        breakMultiplier: 0.5,
      },
    ],
    canBreak: true,
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Rain of Fire',
    character: 'Maelle',
    description: '125% Fire damage. Applies 3 Burn on hit. Defensive Stance: applies 2 more Burn on hit.',
    apCost: 5,
    hits: [
      {
        count: 2,
        element: 'fire',
        multiplier: 1.25,
        breakMultiplier: 0.7,
      },
    ],
    qte: {
      Perfect: 1.3,
      Success: 1.15,
      Failure: 1,
    },
  },
  {
    name: 'Swift Stride',
    character: 'Maelle',
    description: '100% Physical damage. Switches to Virtuose Stance if target is Burning on hit. Recovers 0-2 AP.',
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'physical',
      },
    ],
    qte: {
      Perfect: 1,
      Success: 1,
      Failure: 1,
    },
  },
  {
    name: 'Crustal Crush',
    character: 'Lune',
    description: '90% Earth damage. Consumes two Lightning Stains: Deals 200% more damage.',
    apCost: 7,
    hits: [
      {
        count: 5,
        element: 'earth',
        multiplier: (mods) => (mods.stainsMet({ Lightning: 2 }) ? 0.9 * 3 : 0.9),
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Earth Rising',
    character: 'Lune',
    description: 'Deals 120% Earth damage to all enemies. Consumes one Lightning Stain: Deals 50% more damage.',
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'earth',
        multiplier: (mods) => (mods.stainsMet({ Lightning: 1 }) ? 1.2 * 1.5 : 1.2),
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Electrify',
    character: 'Lune',
    description: '20% Lightning damage. Critical Hits trigger an additional hit. Consumes one Fire Stain: deals 100% more damage and generates one Light Stain.',
    apCost: 1,
    hits: [
      {
        count: (mods) => (mods.byName('Critical Hit') ? 6 : 3),
        element: 'lightning',
        multiplier: (mods) => (mods.stainsMet({ Fire: 1 }) ? 0.2 * 2 : 0.2),
      },
    ],
    qte: {
      Perfect: 1.1,
      Success: 1.05,
      Failure: 1,
    },
  },
  {
    name: 'Fire Rage',
    character: 'Lune',
    description: 'Deals 100% Fire damage to all enemies on cast. 250% Fire damage on turn start. Damage increases on trigger. On being hit, Stuns Lune. Consumes two Ice Stains: Deals 100% more damage.',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'fire',
        multiplier: (mods) => (mods.stainsMet({ Ice: 2 }) ? 2 * 2 : 1),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Ice Lance',
    character: 'Lune',
    description: '140% Ice damage. Applies Slow on hit (3 turns). Consumes one Earth Stain: Deals 50% more damage.',
    apCost: 4,
    hits: [
      {
        count: 1,
        element: 'ice',
        multiplier: (mods) => (mods.stainsMet({ Earth: 1 }) ? 1.4 * 1.5 : 1.4),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Immolation',
    character: 'Lune',
    description: '70% Fire damage. Applies 3 Burn on hit. Mark: Applies 2 more Burn on hit. Consumes one Ice Stain: Deals 50% more damage.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'fire',
        multiplier: (mods) => (mods.stainsMet({ Ice: 1 }) ? 0.7 * 1.5 : 0.7),
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Lightning Dance',
    character: 'Lune',
    description: '60% Lightning damage. Critical Hits trigger an additional hit. Consumes one Earth, one Ice and one Fire Stain: Deals 400% more damage.',
    apCost: 7,
    hits: [
      {
        count: (mods) => (mods.byName('Critical Hit') ? 12 : 6),
        element: 'lightning',
        multiplier: (mods) => (mods.stainsMet({ Earth: 1, Ice: 1, Fire: 1 }) ? 0.6 * 5 : 0.6),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Mayhem',
    character: 'Lune',
    description: 'Consumes all Stains: Deals 69/90/120/180% elemental damage, 1 hit per Stain. Damage scales with number of consumed Stains. Can Stun if 4 stains are consumed.',
    apCost: 3,
    hits: (mods) => {
      const stains = ['Fire', 'Ice', 'Lightning', 'Earth', 'Light', 'Dark']
        .map((element) => mods.byName(element))
        .filter((x) => x)
      const multiplier = [0.69, 0.9, 1.2, 1.8][Math.min(sum(stains, 'count'), 3)]

      return stains.map((stain) => ({
        count:
          stain.name == 'Lightning' && mods.byName('Critical Hit') ? stain.count * 2 : stain.count,
        element: stain.name.toLocaleLowerCase(),
        multiplier: multiplier,
      }))
    },
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Rockslide',
    character: 'Lune',
    description: '125% Earth damage. Consumes one Lightning, one Ice, and one Fire stain: Deals 400% more damage.',
    apCost: 5,
    hits: [
      {
        count: 2,
        element: 'earth',
        multiplier: (mods) => (mods.stainsMet({ Lightning: 1, Ice: 1, Fire: 1 }) ? 1.25 * 5 : 1.25),
      },
    ],
    qte: {
      Perfect: 1.1,
      Success: 1.05,
      Failure: 1,
    },
  },
  {
    name: 'Thermal Transfer',
    character: 'Lune',
    description: '50% Ice damage. Recovers 4 AP if target is Burning. Consumes two Earth stains: Play a second turn.',
    apCost: 2,
    hits: [
      {
        count: 2,
        element: 'ice',
        multiplier: 0.5,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Thunderfall',
    character: 'Lune',
    description: '30% Lightning damage, 2-6 hits. Each hit targets a random enemy. Critical Hits trigger an additional hit. Consumes one Fire stain: deals 50% more damage.',
    apCost: 5,
    hits: [
      {
        count: (mods) => {
          let base = mods.byName('QTE').selected.name == 'Perfect' ? 6 : mods.byName('QTE').selected.name == 'Success' ? 4 : 2
          return mods.byName('Critical Hit') ? base * 2 : base
        },
        element: 'lightning',
        multiplier: (mods) => (mods.stainsMet({ Fire: 1 }) ? 0.3 * 1.5 : 0.3),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Wildfire',
    character: 'Lune',
    description: '125% Fire damage to all enemies. Deals damage to Lune if failed. Applies 3 Burn on hit. Consumes two Ice stains: Deals 100% more damage.',
    apCost: 4,
    hits: [
      {
        count: 1,
        element: 'fire',
        multiplier: (mods) => (mods.stainsMet({ Ice: 2 }) ? 1.25 * 2 : 1.25),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Hell',
    character: 'Lune',
    description: '500% Fire damage to all enemies. Deals damage to Lune if failed. Applies 5 Burn on hit. Consumes one Ice, one Earth, and one Lightning stain: Deals 200% more damage.',
    apCost: 9,
    hits: [
      {
        count: 2,
        element: 'fire',
        multiplier: (mods) => (mods.stainsMet({ Ice: 1, Earth: 1, Lightning: 1 }) ? 5 * 3 : 5),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Terraquake',
    character: 'Lune',
    description: '80% Earth damage to all enemies on cast. 150% Earth damage on turn start (3 turns). Grants allies 50% more Break potency while active. Consumes two Lightning stains: Increased duration (5 turns).',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'earth',
        multiplier: 0.8,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Terraquake Periodic',
    character: 'Lune',
    description: '150% Earth damage on turn start (3 turns). Grants allies 50% more Break potency while active. Consumes two Lightning stains: Increased duration (5 turns).',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'earth',
        multiplier: 1.5,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Elemental Trick',
    character: 'Lune',
    description: '30% elemental damage. Element cycles through Ice, Fire, Lightning, and Earth. Critical Hits generate the corresponding Stain.',
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'ice',
        multiplier: 0.3,
      },
      {
        count: 1,
        element: 'fire',
        multiplier: 0.3,
      },
      {
        count: 1,
        element: 'lightning',
        multiplier: 0.3,
      },
      {
        count: 1,
        element: 'earth',
        multiplier: 0.3,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Crippling Tsunami',
    character: 'Lune',
    description: '250% Ice damage to all enemies. Applies Slow on hit (3 turns). Consumes one Earth, one Lightning, and one Fire stain: Deals 400% more damage.',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'ice',
        multiplier: (mods) => (mods.stainsMet({ Earth: 1, Lightning: 1, Fire: 1 }) ? 2.5 * 5 : 2.5),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Typhoon',
    character: 'Lune',
    description: '120% Ice damage to all enemies on cast. 250% Ice damage on turn start (3 turns). Heals all allies by 20% when triggered or cast. Consumes two Earth stains: Increased duration (5 turns).',
    apCost: 8,
    hits: [
      {
        count: 1,
        element: 'ice',
        multiplier: 1.2,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Typhoon Periodic',
    character: 'Lune',
    description: '250% Ice damage on turn start (3 turns). Heals all allies by 20% when triggered. Consumes two Earth stains: Increased duration (5 turns).',
    apCost: 8,
    hits: [
      {
        count: 1,
        element: 'ice',
        multiplier: 2.5,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Elemental Genesis',
    character: 'Lune',
    description: '300% damage to all enemies. Each hit deals damage in a random element. Can only be cast with one Lightning Stain, one Earth Stain, one Fire Stain, and one Ice Stain.',
    apCost: 4,
    hits: [
      {
        count: 8,
        element: 'weapon',
        multiplier: 3,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Storm Caller',
    character: 'Lune',
    description: 'Applies Stormcaller to all enemies (3 turns): 60% Lightning damage at the end of their turn. 20% Lightning damage on being hit. Consumes two Fire stains: Double thunder strikes on turn end.',
    apCost: 6,
    hits: [
      {
        count: 1,
        element: 'lightning',
        multiplier: 0.6,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Tremor (Gradient)',
    character: 'Lune',
    description: '500% Earth damage to all enemies. Removes all enemy Shields on cast.',
    apCost: 1,
    spoilerLevel: 3,
    hits: [
      {
        count: 1,
        element: 'earth',
        multiplier: 5,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Assault Zero',
    character: 'Verso',
    description: "25% damage. Uses weapon's element. Critical Hits generate 1 additional Perfection. Rank B: Deals 100% more damage.",
    apCost: 3,
    hits: [
      {
        count: 5,
        element: 'weapon',
        multiplier: (mods) => (mods.byName('B') ? 0.25 * 2 : 0.25),
      },
    ],
    qte: {
      Perfect: 1.24,
      Success: 1.12,
      Failure: 1,
    },
  },
  {
    name: 'Steeled Strike',
    character: 'Verso',
    description: 'After 1 turn, deals 50% Physical damage. Interrupted if any damage taken. Rank S: Deals 150% more damage.',
    apCost: 9,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: (mods) => (mods.byName('S') ? 0.5 * 2.5 : 0.5),
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Radiant Slash',
    character: 'Verso',
    description: '70% Light damage to all enemies. Can Stun. Rank C: Deals 50% more damage.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'light',
        multiplier: (mods) => (mods.byName('C') ? 0.7 * 1.5 : 0.7),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Light Holder',
    character: 'Verso',
    description: '30% Light damage. Interrupted if failed. Increases Rank by one on completion. Rank A: Recovers 2 AP.',
    apCost: 4,
    hits: [
      {
        count: 5,
        element: 'light',
        multiplier: 0.3,
      },
    ],
    qte: {
      Perfect: 1.32,
      Success: 1.16,
      Failure: 1,
    },
  },
  {
    name: 'End Bringer',
    character: 'Verso',
    description: '120% Physical damage. Deals 200% more damage if target is Stunned. Rank A: Can reapply Stun.',
    apCost: 9,
    hits: [
      {
        count: 6,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Stunned') ? 1.2 * 3 : 1.2),
      },
    ],
    qte: {
      Perfect: 1.166667,
      Success: 1.083333,
      Failure: 1,
    },
  },
  {
    name: 'Ascending Assault First Use',
    character: 'Verso',
    description: '250% damage. Uses weapon\'s element. Deals 30% more damage for each previous cast, up to 150%. Rank S: Costs 2 AP.',
    apCost: (mods) => (mods.byName('S') ? 2 : 5),
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: 2.5,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Ascending Assault 6+ Uses',
    character: 'Verso',
    description: '250% damage. Uses weapon\'s element. Deals 30% more damage for each previous cast, up to 150%. Rank S: Costs 2 AP.',
    apCost: (mods) => (mods.byName('S') ? 2 : 5),
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: 2.5 * 2.5,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Speed Burst',
    character: 'Verso',
    description: '50% Light damage. Damage increased by Speed difference with target, up to 100% more. Rank C: Deals 100% more damage.',
    apCost: 6,
    hits: [
      {
        count: 5,
        element: 'light',
        multiplier: 0.5,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Sabotage (Gradient)',
    character: 'Verso',
    description: '300% Physical damage to all enemies. Applies Mark on hit.',
    apCost: 1,
    spoilerLevel: 3,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 3,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Striker (Gradient)',
    character: 'Verso',
    description: '1000% Physical damage. Can Stun.',
    apCost: 2,
    spoilerLevel: 3,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 10,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Berserk Slash',
    character: 'Verso',
    description: '20% Physical damage. Deals 15% more damage for each HP% Verso is missing, up to 1500%. Rank C: Deals 50% more damage.',
    apCost: 4,
    hits: [
      {
        count: 3,
        element: 'physical',
        multiplier: (mods) => {
          const hpMissing = 100 - (mods.byName('Health %')?.count ?? 100)
          return 0.2 * (1 + hpMissing * 0.15) * (mods.byName('C') ? 1.5 : 1)
        },
      },
    ],
    qte: {
      Perfect: 1.2666667,
      Success: 1.1333333,
      Failure: 1,
    },
  },
  {
    name: 'Blitz',
    character: 'Verso',
    description: '150% Physical damage. Kills non-boss enemies with less than 10% Health. Play a second turn. Rank B: Deals 50% more damage.',
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: (mods) => (mods.byName('B') ? 1.5 * 1.5 : 1.5),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Defiant Strike',
    character: 'Verso',
    description: '200% Physical damage. Costs 30% of current Health. Last hit applies Mark. Rank B: Deals 50% more damage.',
    apCost: 3,
    hits: [
      {
        count: 2,
        element: 'physical',
        multiplier: (mods) => (mods.byName('B') ? 2 * 1.5 : 2),
      },
    ],
    qte: {
      Perfect: 1.1,
      Success: 1.05,
      Failure: 1,
    },
  },
  {
    name: 'Follow Up',
    character: 'Verso',
    description: '200% Light damage. Deals 50% more damage for each Free Aim shot this turn, up to 500%.',
    apCost: (mods) => (mods.byName('S') ? 2 : 5),
    hits: [
      {
        count: 1,
        element: 'light',
        multiplier: (mods) => 2 * (1 + 0.5 * (mods.byName('Shots Fired')?.count ?? 0)),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Strike Storm',
    character: 'Verso',
    description: '70% damage. Uses weapon\'s element. Critical Hits generate 2 additional Perfection. Rank C: Deals 100% more damage.',
    apCost: 7,
    hits: [
      {
        count: 5,
        element: 'weapon',
        multiplier: (mods) => (mods.byName('C') ? 0.7 * 2 : 0.7),
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'From Fire',
    character: 'Verso',
    description: "62.5% damage. Uses weapon's element. Heals 20% Health on completion if target Burns. Rank B: Deals 100% more damage",
    apCost: 4,
    hits: [
      {
        count: 3,
        element: 'weapon',
        multiplier: (mods) => (mods.byName('B') ? 1.25 * 2 : 1.25),
      },
    ],
    qte: {
      Perfect: 1.0666667,
      Success: 1.0333333,
      Failure: 1,
    },
  },
  {
    name: 'Marking Shot',
    character: 'Verso',
    description: "100% damage. Uses weapon's element. Applies Mark on hit. Rank C: Deals 100% more damage.",
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: (mods) => (mods.byName('C') ? 1 * 2 : 1),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Paradigm Shift',
    character: 'Verso',
    description: '30% Physical damage. Recovers 1-3 AP. Rank C: +1 additional AP.',
    apCost: 1,
    hits: [
      {
        count: 3,
        element: 'physical',
        multiplier: 0.3,
      },
    ],
    qte: {
      Perfect: 1,
      Success: 1,
      Failure: 1,
    },
  },
  {
    name: 'Perfect Break',
    character: 'Verso',
    description: '500% Light damage. Sets Rank to S on Break. Rank B: Costs 5 AP',
    apCost: (mods) => (mods.byName('B') ? 5 : 7),
    hits: [
      {
        count: 1,
        element: 'light',
        multiplier: 5,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Phantom Stars',
    character: 'Verso',
    description: '70% Light damage to all enemies. Rank S: Costs 5 AP.',
    apCost: (mods) => (mods.byName('S') ? 5 : 9),
    hits: [
      {
        count: 5,
        element: 'light',
        multiplier: 0.7,
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Purification',
    character: 'Verso',
    description: '125% Light damage. On cast, dispels status effects on Verso. Rank B: Deals 100% more damage.',
    apCost: 5,
    hits: [
      {
        count: 2,
        element: 'light',
        multiplier: (mods) => (mods.byName('B') ? 1.25 * 2 : 1.25),
      },
    ],
  },
  {
    name: 'Quick Strike',
    character: 'Verso',
    description: '100% Physical damage. Rank D: Gives 10 additional Perfection.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 1,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Abbest Wind',
    character: 'Monoco',
    description: '80% Physical damage. Play a second turn. Agile Mask: Costs 0 AP.',
    apCost: (mods) => (mods.byName('Agile') ? 0 : 2),
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 0.8,
      },
    ],
    qte: {
      Perfect: 1,
      Success: 1,
      Failure: 1,
    },
  },
  {
    name: 'Clair Enfeeble',
    character: 'Monoco',
    description: '175% Light damage to all enemies. Applies Powerless on hit (3 turns). Balanced Mask: Deals 200% more damage.',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'light',
        multiplier: (mods) => (mods.byName('Balanced') ? 1.75 * 3 : 1.75),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Obscur Sword',
    character: 'Monoco',
    description: '60% Dark damage. Deals 100% more damage against Powerless targets. Heavy Mask: Deals 200% more damage.',
    apCost: 6,
    hits: [
      {
        count: 5,
        element: 'dark',
        multiplier: (mods) => (mods.byName('Heavy') ? 0.6 * 3 : 0.6),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Mighty Strike (Gradient)',
    character: 'Monoco',
    description: '400% damage. Uses weapon\'s element. Deals 100% more damage if target is Stunned. Switch to Almighty Mask.',
    apCost: 1,
    spoilerLevel: 3,
    hits: [
      {
        count: 2,
        element: 'weapon',
        multiplier: (mods) => (mods.byName('Stunned') ? 4 * 2 : 4),
      },
    ],
    qte: {
      Perfect: 2.4, // Can't be right, needs testing
      Success: 1.7,
      Failure: 1,
    },
  },
  {
    name: 'Ballet Charm',
    character: 'Monoco',
    description: '80% Light damage. Applies Powerless on hit (3 turns). Caster Mask: Deals 200% more damage.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'light',
        multiplier: (mods) => (mods.byName('Caster') ? 0.8 * 3 : 0.8),
      },
    ],
    qte: {
      Perfect: 1.2, // Needs testing, the spreadsheet doesn't make sense
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Braseleur Smash',
    character: 'Monoco',
    description: '90% Fire damage. Applies 3 Burn on hit. Balanced Mask: Deals 200% more damage.',
    apCost: 4,
    hits: [
      {
        count: 2,
        element: 'fire',
        multiplier: (mods) => (mods.byName('Balanced') ? 0.9 * 3 : 0.9),
      },
    ],
    qte: {
      Perfect: 1.08333,
      Success: 1.04167,
      Failure: 1,
    },
  },
  {
    name: 'Bruler Bash',
    character: 'Monoco',
    description: '80% Physical damage. Caster Mask: Deals 200% more damage.',
    apCost: 4,
    hits: [
      {
        count: 3,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Caster') ? 0.8 * 3 : 0.8),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Bénisseur Mortar',
    character: 'Monoco',
    description: '80% Ice damage. Mark: Switch to Almighty Mask. Caster Mask: Deals 200% more damage.',
    apCost: 5,
    hits: [
      {
        count: 3,
        element: 'ice',
        multiplier: (mods) => (mods.byName('Caster') ? 0.8 * 3 : 0.8),
      },
    ],
    qte: {
      Perfect: 1,
      Success: 1,
      Failure: 1,
    },
  },
  {
    name: 'Chalier Combo',
    character: 'Monoco',
    description: '60% Physical damage. Interrupted if failed. Balanced Mask: Deals 200% more damage.',
    apCost: 7,
    hits: [
      {
        count: 6,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Balanced') ? 0.6 * 3 : 0.6),
      },
    ],
    qte: {
      Perfect: 1.083333,
      Success: 1.041667,
      Failure: 0,
    },
  },
  {
    name: 'Chapelier Slash',
    character: 'Monoco',
    description: '80% Physical damage to all enemies. Last hit applies Mark. Agile Mask: Deals 200% more damage.',
    apCost: 7,
    hits: [
      {
        count: 3,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Agile') ? 0.8 * 3 : 0.8),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Chevalière Ice',
    character: 'Monoco',
    description: '60% Ice damage to all enemies. Last hit applies Slow. Balanced Mask: Deals 200% more damage.',
    apCost: 6,
    hits: [
      {
        count: 3,
        element: 'ice',
        multiplier: (mods) => (mods.byName('Balanced') ? 0.6 * 3 : 0.6),
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Chevalière Piercing',
    character: 'Monoco',
    description: '30% Physical damage. Ignores Shields. Deals 30% more damage for each Shield on target. Agile Mask: Deals 200% more damage.',
    apCost: 3,
    hits: [
      {
        count: 3,
        element: 'physical',
        multiplier: (mods) => ((mods.byName('Target Shield')?.count ?? 0) * 0.3 + 1) * (mods.byName('Agile') ? 3 : 1),
      },
    ],
    qte: {
      Perfect: 2.4, // This seems wrong, needs testing
      Success: 1.7,
      Failure: 1,
    },
  },
  {
    name: 'Chevalière Thrusts',
    character: 'Monoco',
    description: '60% Physical damage to all enemies. Critical hits deal 150% more damage. Heavy Mask: Deals 200% more damage.',
    apCost: 7,
    hits: [
      {
        count: 3,
        element: 'physical',
        // Crits are still going to do their 1.5 mod, so (5/3) * 1.5 gets us our 2.5
        multiplier: (mods) => 0.6 * (mods.byName('Critical Hit') ? 2.5 : 1) * (mods.byName('Heavy') ? 3 : 1),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Contorsionniste Blast',
    character: 'Monoco',
    description: '250% Physical damage to all enemies. Heals all allies by 10% Health for each enemy hit. Balanced Mask: Deals 200% more damage.',
    apCost: 6,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Balanced') ? 2.5 * 3 : 2.5),
      },
    ],
    qte: {
      Perfect: 1.16,
      Success: 1.08,
      Failure: 1,
    },
  },
  {
    name: 'Cultist Blood',
    character: 'Monoco',
    description: '30% Dark damage to all enemies. Sacrifices 90% current Health to deal 3% more damage for each HP% lost, up to 270%. Heavy Mask: Deals 200% more damage.',
    apCost: 3,
    hits: [
      {
        count: 3,
        element: 'dark',
        multiplier: (mods) => {
          const hp = mods.byName('Health %')?.count ?? 100
          const hpLost = hp - hp * 0.9
          return 0.3 * (1 + hpLost * 0.03) * (mods.byName('Heavy') ? 3 : 1); // Also seems bugged, test
        },
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Cultist Slashes',
    character: 'Monoco',
    description: '70% Dark damage. Deals 2.5% more damage for each missing HP%, up to 250%. Agile Mask: Deals 200% more damage.',
    apCost: 5,
    hits: [
      {
        count: 3,
        element: 'dark',
        multiplier: (mods) => {
          const hpMissing = 100 - (mods.byName('Health %')?.count ?? 100)
          return 0.7 * (1 + hpMissing * 0.025) * (mods.byName('Agile') ? 3 : 1)
        },
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Sakapatate Explosion',
    character: 'Monoco',
    description: '50% Lightning damage. Each hit targets a random enemy. Critical Hits trigger an additional hit. Caster Mask: Deals 200% more damage.',
    apCost: 4,
    hits: [
      {
        count: (mods) => 3 + (mods.byName('Critical Hit') ? 3 : 0),
        element: 'lightning',
        multiplier: (mods) => (mods.byName('Caster') ? 0.5 * 3 : 0.5),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Sakapatate Fire',
    character: 'Monoco',
    description: '150% Fire to all enemies. Applies 3 Burn on hit. Almighty Mask: Deals 400% more damage.',
    apCost: 9,
    hits: [
      {
        count: 3,
        element: 'fire',
        multiplier: (mods) => (mods.byName('Almighty') ? 1.5 * 4 : 1.5),
      },
    ],
    qte: {
      Perfect: 1.166667,
      Success: 1.083333,
      Failure: 1,
    },
  },
  {
    name: 'Sakapatate Estoc',
    character: 'Monoco',
    description: '150% Lightning damage. Deals 500% more damage if target is Stunned. Balanced Mask: Deals 200% more damage.',
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'lightning',
        multiplier: (mods) => (mods.byName('Stunned') ? 1.5 * 6 : 1.5) * (mods.byName('Balanced') ? 3 : 1),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Lancelier Impale',
    character: 'Monoco',
    description: '120% Ice damage. Applies Slow on hit (3 turns). Agile mask: Deals 200% more damage.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'ice',
        multiplier: (mods) => (mods.byName('Agile') ? 1.2 * 3 : 1.2),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Danseuse Waltz',
    character: 'Monoco',
    description: '130% Fire damage. Deals 50% more damage against Burning targets. Balanced Mask: Deals 200% more damage.',
    apCost: 8,
    hits: [
      {
        count: 3,
        element: 'fire',
        multiplier: (mods) => 1.3 * (mods.byName('Burn') ? 1.5 : 1) * (mods.byName('Balanced') ? 3 : 1),
      },
    ],
    qte: {
      Perfect: 1.25,
      Success: 1.125,
      Failure: 1,
    },
  },
  {
    name: 'Démineur Thunder',
    character: 'Monoco',
    description: '100% Lightning damage. Caster Mask: Doubles Break Potency',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'lightning',
        multiplier: 1,
      },
    ],
    qte: {
      Perfect: 1.46,
      Success: 1.23,
      Failure: 1,
    },
  },
  {
    name: 'Gault Fury',
    character: 'Monoco',
    description: '40% Physical damage. Last hit applies Mark. Balanced Mask: Deals 200% more damage.',
    apCost: 3,
    hits: [
      {
        count: 4,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Balanced') ? 0.4 * 3 : 0.4),
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Glaise Earthquakes',
    character: 'Monoco',
    description: '300% Earth damage to all enemies. Applies Powerful to self on completion (3 turns). Heavy Mask: also applies Powerful to other allies.',
    apCost: 4,
    hits: [
      {
        count: 1,
        element: 'earth',
        multiplier: 3, // Sounds like it might be bugged, test
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Grosse Tête Whack',
    character: 'Monoco',
    description: '60% Physical damage. Last hit applies Defenceless (3 turns). Heavy Mask: Deals 100% more damage.',
    apCost: 6,
    hits: [
      {
        count: 5,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Heavy') ? 0.6 * 2 : 0.6),
      },
    ],
    qte: {
      Perfect: 1.1866667,
      Success: 1.0933333,
      Failure: 1,
    },
  },
  {
    name: 'Hexga Crush',
    character: 'Monoco',
    description: '120% Earth damage. Last hit applies Defenceless (3 turns). Heavy Mask: Increases duration (5 turns).',
    apCost: 5,
    hits: [
      {
        count: 2,
        element: 'earth',
        multiplier: 1.2,
      },
    ],
    qte: {
      Perfect: 1.1416667,
      Success: 1.0708333,
      Failure: 1,
    },
  },
  {
    name: 'Jar Lampstorm',
    character: 'Monoco',
    description: '50% Physical damage to all enemies. Applies Shell to self (3 turns). Heavy Mask: Deals 200% more damage.',
    apCost: 5,
    hits: [
      {
        count: 4,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Heavy') ? 0.5 * 3 : 0.5),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Luster Slices',
    character: 'Monoco',
    description: '60% Physical damage. Applies Rush to self (3 turns). Agile Mask: Deals 200% more damage.',
    apCost: 3,
    hits: [
      {
        count: 3,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Agile') ? 0.6 * 3 : 0.6),
      },
    ],
    qte: {
      Perfect: 1,
      Success: 1,
      Failure: 1,
    },
  },
  {
    name: 'Moissonneuse Vendange',
    character: 'Monoco',
    description: '100% Physical damage. Balanced Mask: Deals 200% more damage.',
    apCost: 5,
    hits: [
      {
        count: 3,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Balanced') ? 1 * 3 : 1),
      },
    ],
    qte: {
      Perfect: 1.4233333, // Seems suspicious
      Success: 1.2116667,
      Failure: 1,
    },
  },
  {
    name: 'Sakapatate Slam',
    character: 'Monoco',
    description: '300% Physical damage to all enemies. Mark: Deals 100% more damage. Heavy Mask: Deals 200% more damage.',
    apCost: 7,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Mark') ? 3 * 2 : 3) * (mods.byName('Heavy') ? 3 : 1),
      },
    ],
    qte: {
      Perfect: 1.166667,
      Success: 1.083333,
      Failure: 1,
    },
  },
  {
    name: 'Portier Crash',
    character: 'Monoco',
    description: '500% Physical damage to all enemies. Heavy Mask: Deals 200% more damage.',
    apCost: 8,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Heavy') ? 5 * 3 : 5),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Ramasseure Bonk',
    character: 'Monoco',
    description: "80% Dark damage. Agile Mask: +20% target's Break Bar on hit",
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'dark',
        multiplier: 0.8,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Rocher Hammering',
    character: 'Monoco',
    description: '40% Physical damage. Heavy Mask: Deals 200% more damage.',
    apCost: 3,
    hits: [
      {
        count: 4,
        element: 'physical',
        multiplier: (mods) => (mods.byName('Heavy') ? 0.4 * 3 : 0.4),
      },
    ],
    qte: {
      Perfect: 1,
      Success: 1,
      Failure: 1,
    },
  },
  {
    name: 'Sapling Absorption',
    character: 'Monoco',
    description: '100% Dark damage. Heals 5% Health on hit. Caster Mask: Deals 200% more damage and double Heal.',
    apCost: 6,
    hits: [
      {
        count: 3,
        element: 'dark',
        multiplier: (mods) => (mods.byName('Caster') ? 1 * 3 : 1),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Stalact Punches',
    character: 'Monoco',
    description: '45% Ice damage. Heavy Mask: Deals 200% more damage.',
    apCost: 4,
    hits: [
      {
        count: 4,
        element: 'ice',
        multiplier: (mods) => (mods.byName('Heavy') ? 0.45 * 3 : 0.45),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Évêque Spear',
    character: 'Monoco',
    description: '400% Earth damage. Applies Powerless on hit (3 turns). Heavy Mask: Deals 200% more damage.',
    apCost: 6,
    hits: [
      {
        count: 1,
        element: 'earth',
        multiplier: (mods) => (mods.byName('Heavy') ? 4 * 3 : 4),
      },
    ],
    qte: {
      Perfect: 1.1666667,
      Success: 1.0833333,
      Failure: 1,
    },
  },
  {
    name: 'Bad Omen',
    character: 'Sciel',
    description: '100% Dark damage to all enemies. Applies 2 Foretell on hit.',
    apCost: 3,
    hits: [
      {
        count: 2,
        element: 'dark',
        multiplier: 1,
        special: 'Sun',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Plentiful Harvest',
    character: 'Sciel',
    description: '100% Physical damage. On completion, consumes all Foretell to recover 1 AP to an ally per stack.',
    apCost: 4,
    hits: [
      {
        count: 2,
        element: 'physical',
        multiplier: 1,
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Our Sacrifice',
    character: 'Sciel',
    description: '200% Dark damage to all enemies. Sets other allies\' Health to 1. Deals 1.5% more damage for each HP% lost this way. Consumes all Foretell to deal 30% more damage per stack.',
    apCost: 4,
    hits: [
      {
        count: 1,
        element: 'dark',
        multiplier: (mods) => {
          const hpLost = ((mods.byName('Health %')?.count ?? 100) - 1) * 3; // Assume three characters lose the same HP
          const foretell = mods.byName('Foretell')?.count ?? 0;
          return 2 * (1 + hpLost * 0.015) * (1 + 0.3 * foretell);
        },
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Dark Wave',
    character: 'Sciel',
    description: '100% dark damage to all enemies. Deals 25% more damage for each Foretell. Consumes all Foretell on completion.',
    apCost: 6,
    hits: [
      {
        count: 3,
        element: 'dark',
        multiplier: (mods) => 1 * (1 + 0.25 * (mods.byName('Foretell')?.count ?? 0)),
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Final Path',
    character: 'Sciel',
    description: '750% Dark damage. Can Stun. Applies 10 Foretell on hit.',
    apCost: 9,
    hits: [
      {
        count: 1,
        element: 'dark',
        multiplier: 7.5,
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Twilight Dance',
    character: 'Sciel',
    description: '150% Dark damage. During Twilight, extends its duration by m turn. Deals 25% more damage for each Foretell. Consumes all Foretell on completion.',
    apCost: 9,
    hits: [
      {
        count: 4,
        element: 'dark',
        multiplier: (mods) => 1.5 * (1 + 0.25 * (mods.byName('Foretell')?.count ?? 0)),
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.3,
      Success: 1.15,
      Failure: 1,
    },
  },
  {
    name: 'Card Weaver',
    character: 'Sciel',
    description: "200% Physical damage. Propagates target's Foretell to all enemies. Play a second turn.",
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 2,
        special: 'Sun',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Delaying Slash',
    character: 'Sciel',
    description: '150% damage. Uses weapon\'s element. Deals 30% more damage for each Foretell. Consumes all Foretell on completion and delay target\'s turn.',
    apCost: 5,
    hits: [
      {
        count: 2,
        element: 'weapon',
        multiplier: (mods) => 1.5 * (1 + 0.3 * (mods.byName('Foretell')?.count ?? 0)),
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.1,
      Success: 1.05,
      Failure: 1,
    },
  },
  {
    name: 'Shadow Bringer (Gradient)',
    character: 'Sciel',
    description: '50% Dark damage. Each hit targets a random enemy. Applies 1 Foretell on hit.',
    apCost: 1,
    spoilerLevel: 3,
    hits: [
      {
        count: 10,
        element: 'dark',
        multiplier: 0.5,
        special: 'Sun',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Doom (Gradient)',
    character: 'Sciel',
    description: '250% Dark damage. Can Stun. Applies Powerless then Defenceless and then Slow (3 turns).',
    apCost: 2,
    spoilerLevel: 3,
    hits: [
      {
        count: 3,
        element: 'dark',
        multiplier: 2.5,
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.3,
      Success: 1.15,
      Failure: 1,
    },
  },
  {
    name: 'Firing Shadow',
    character: 'Sciel',
    description: '50% Dark damage to all enemies. Consumes 1 Foretell on hit to deal 200% more damage.',
    apCost: 3,
    hits: [
      {
        count: 3,
        element: 'dark',
        multiplier: (mods) => (mods.byName('Foretell') ? 0.5 * 3 : 0.5),
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Focused Foretell',
    character: 'Sciel',
    description: '100% Physical damage. Applies 5 Foretell on hit. If target already has Foretell, applies 2 instead.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 1,
        special: 'Sun',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Grim Harvest',
    character: 'Sciel',
    description: '300% Dark damage. Heals all allies by 30% Health. Consumes all Foretell to increase Heal by +5% Health per stack.',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'dark',
        multiplier: 3,
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Harvest',
    character: 'Sciel',
    description: "200% damage. Uses weapon's element. Heals 40% Health. Consumes all Foretell to increase Heal by +5% Health per stack.",
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: 2,
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Marking Card',
    character: 'Sciel',
    description: '100% Dark damage. Last hit applies Mark and 3 Foretell.',
    apCost: 3,
    hits: [
      {
        count: 2,
        element: 'dark',
        multiplier: 1,
        special: 'Sun',
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Phantom Blade',
    character: 'Sciel',
    description: '300% Dark damage. Consumes all Foretell to deal 35% more damage per stack.',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'dark',
        multiplier: (mods) => 3 * (1 + 0.35 * (mods.byName('Foretell')?.count ?? 0)),
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Sealed Fate',
    character: 'Sciel',
    description: "40% damage, 5-7 hits. Uses weapon's element. Consumes 1 Foretell on hit to deal 200% more damage. Critical Hits don't remove Foretell but still get the damage increase.",
    apCost: 4,
    hits: [
      {
        count: (mods) => mods.byName('QTE').selected.name == 'Perfect' ? 7 : mods.byName('QTE').selected.name == 'Success' ? 6 : 5,
        element: 'weapon',
        multiplier: (mods) => (mods.byName('Foretell') ? 0.4 * 3 : 0.4),
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Searing Bond',
    character: 'Sciel',
    description: '250% Dark damage. Applies 5 Foretell on hit. Also deals damage and applies Foretell to every other Burning enemies.',
    apCost: 4,
    hits: [
      {
        count: 1,
        element: 'dark',
        multiplier: 2.5,
        special: 'Sun',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Spectral Sweep',
    character: 'Sciel',
    description: "50% damage, 2-6 hits. Uses weapon's element. Applies 1 Foretell on hit. Critical Hits apply an additional Foretell.",
    apCost: 7,
    hits: [
      {
        count: (mods) => mods.byName('QTE').selected.name == 'Perfect'
            ? 6
            : mods.byName('QTE').selected.name == 'Success'
              ? 4
              : 2,
        element: 'weapon',
        multiplier: 0.5,
        special: 'Sun',
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Twilight Slash',
    character: 'Sciel',
    description: '100% Dark damage. Consumes all Foretell to deal 25% more damage per stack.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'dark',
        multiplier: (mods) => 1 * (1 + 0.25 * (mods.byName('Foretell')?.count ?? 0)),
        special: 'Moon',
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Lumière Assault',
    character: 'Gustave',
    description: '25% damage. Uses weapon\'s element. Critical hits generate 1 additional Charge.',
    apCost: 3,
    hits: [
      {
        count: 5,
        element: 'weapon',
        multiplier: 0.25,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Overcharge',
    character: 'Gustave',
    description: '150% Lightning damage. Can Stun. Deals 20% more damage for each Charge. Deals 25% more damage when fully Charged. Resets Charges.',
    apCost: 4,
    hits: [
      {
        count: 1,
        element: 'lightning',
        multiplier: (mods) => {
          const chargeCount = mods.byName('Charge')?.count ?? 0;
          return 1.5 * (1 + chargeCount * 0.2) * (chargeCount == 10 ? 1.25 : 1);
        },
      },
    ],
    qte: {
      Perfect: 1.4,
      Success: 1.2,
      Failure: 1,
    },
  },
  {
    name: 'Marking Shot',
    character: 'Gustave',
    description: '100% Lightning damage. Applies Mark on hit.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'lightning',
        multiplier: (mods) => mods.byName('C') ? 1 * 2 : 1,
      },
    ],
    qte: {
      Perfect: 1.21,
      Success: 1.105,
      Failure: 1,
    },
  },
  {
    name: 'From Fire',
    character: 'Gustave',
    description: '62.5% damage. Uses weapon\'s element. Heals 20% Health if target Burns.',
    apCost: 4,
    hits: [
      {
        count: 3,
        element: 'weapon',
        multiplier: 0.625,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Shatter',
    character: 'Gustave',
    description: '175% Lightning damage to all enemies. Can Stun. Fully Charged on Stun',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'lightning',
        multiplier: 1.75,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Strike Storm',
    character: 'Gustave',
    description: '70% damage. Uses weapon\'s element. Critical Hits generate 2 additional Charges.',
    apCost: 7,
    hits: [
      {
        count: 6,
        element: 'weapon',
        multiplier: 0.7,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  }
])
