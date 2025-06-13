import { reactive } from 'vue'
import { sum } from './main'

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
        multiplier: (mods) => mods.byName('Flying') ? 0.3 : 0.15,
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
        multiplier: 5.95,
      },
    ],
    apCost: 0,
  },
  {
    name: 'Percée',
    description:
      'Deals medium single target Physical damage. 1 hit. Increased damage to Marked targets.',
    icon: 'percée.png',
    character: 'Maelle',
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 2.2,
        additiveMultiplier: (mods) => mods.byName('Mark') ? 1 : 0,
      },
    ],
    apCost: (mods) => (mods.byName('Virtuose') ? 2 : 5),
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Offensive Switch',
    character: 'Maelle',
    hits: [
      {
        count: 1,
        element: 'weapon',
      },
    ],
    description:
      "Deals low single target damage and applies Defenceless for 3 turns. Uses weapon's element.",
    apCost: 1,
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Breaking Rules',
    character: 'Maelle',
    hits: [
      {
        count: 2,
        element: 'physical',
        multiplier: 0.75,
        breakMultiplier: 0.7,
      },
    ],
    description:
      "Deals low single target Physical damage. Destroys all target's Shields. Gains 1 AP per Shield destroyed.If target is Defenceless, play a second turn.",
    apCost: 3,
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Degagement',
    character: 'Maelle',
    hits: [
      {
        count: 1,
        element: 'fire',
      },
    ],
    description:
      'Deals low single target Fire damage. Target becomes weak to Fire damage for 2 turns.',
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
    hits: [
      {
        count: 1,
        element: 'fire',
      },
    ],
    description:
      'Deals low single target Fire damage. Applies 3 Burn. Offensive Stance: Applies 2 more Burn.',
    apCost: 3,
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Combustion',
    character: 'Maelle',
    hits: [
      {
        count: 2,
        element: 'physical',
        multiplier: (mods) => 0.8 + Math.min(mods.byName('Burn')?.count ?? 0, 10) * 0.4,
        breakMultiplier: 0.7,
      },
    ],
    description:
      'Deals medium single target Physical Damage. Consumes up to 10 Burn for increased damage.',
    apCost: 4,
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Fleuret Fury',
    character: 'Maelle',
    hits: [
      {
        count: 3,
        element: 'physical',
        multiplier: 0.8,
        breakMultiplier: 0.5,
      },
    ],
    description:
      'Deals high single target Physical damage. If in Virtuose Stance, stay in Virtuose Stance.',
    canBreak: true,
    apCost: 6,
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Rain of Fire',
    character: 'Maelle',
    hits: [
      {
        count: 2,
        element: 'fire',
        multiplier: 1.25,
        breakMultiplier: 0.7,
      },
    ],
    description:
      'Deals medium single target Fire damage. Applies 3 Burn per hit. Defensive Stance: applies 2 more Burn per hit.',
    apCost: 5,
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Swift Stride',
    character: 'Maelle',
    hits: [
      {
        count: 1,
        element: 'physical',
      },
    ],
    description:
      'Deals low single target Physical damage. Switches to Virtuose Stance if target is Burning. Regains 0 to 2 AP.',
    apCost: 3,
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.stainsMet({ Lightning: 2 }) ? 0.9 * 3 : 0.9,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Earth Rising',
    character: 'Lune',
    description:
      'Deals 120% Earth damage to all enemies. Consumes one Lightning Stain: Deals 50% more damage.',
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'earth',
        multiplier: (mods) => mods.stainsMet({ Lightning: 1 }) ? 1.2 * 1.5 : 1.2,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Electrify',
    character: 'Lune',
    description:
      '20% Lightning damage. Critical Hits trigger an additional hit. Consumes one Fire Stain: deals 100% more damage and generates one Light Stain.',
    apCost: 1,
    hits: [
      {
        count: (mods) => (mods.byName('Critical Hit') ? 6 : 3),
        element: 'lightning',
        multiplier: (mods) => mods.stainsMet({ Fire: 1 }) ? 0.2 * 2 : 0.2,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Fire Rage',
    character: 'Lune',
    description:
      'Deals 100% Fire damage to all enemies on cast. 250% Fire damage on turn start. Damage increases on trigger. On being hit, Stuns Lune. Consumes two Ice Stains: Deals 100% more damage.',
    apCost: 5,
    hits: [
      {
        count: 1,
        element: 'fire',
        multiplier: (mods) => mods.stainsMet({ Ice: 2 }) ? 2 * 2 : 1,
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
    description:
      '140% Ice damage. Applies Slow on hit (3 turns). Consumes one Earth Stain: Deals 50% more damage.',
    apCost: 4,
    hits: [
      {
        count: 1,
        element: 'ice',
        multiplier: (mods) => mods.stainsMet({ Earth: 1 }) ? 1.4 * 1.5 : 1.4,
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
    description:
      '70% Fire damage. Applies 3 Burn on hit. Mark: Applies 2 more Burn on hit. Consumes one Ice Stain: Deals 50% more damage.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'fire',
        multiplier: (mods) => mods.stainsMet({ Ice: 1 }) ? 0.7 * 1.5 : 0.7,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Lightning Dance',
    character: 'Lune',
    description:
      '60% Lightning damage. Critical Hits trigger an additional hit. Consumes one Earth, one Ice and one Fire Stain: Deals 400% more damage.',
    apCost: 7,
    hits: [
      {
        count: (mods) => (mods.byName('Critical Hit') ? 12 : 6),
        element: 'lightning',
        multiplier: (mods) => mods.stainsMet({ Earth: 1, Ice: 1, Fire: 1 }) ? 0.6 * 5 : 0.6,
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
    description:
      'Consumes all Stains: Deals 69/90/120/180% elemental damage, 1 hit per Stain. Damage scales with number of consumed Stains. Can Stun if 4 stains are consumed.',
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
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Rockslide',
    character: 'Lune',
    description:
      '125% Earth damage. Consumes one Lightning, one Ice, and one Fire stain: Deals 400% more damage.',
    apCost: 5,
    hits: [
      {
        count: 2,
        element: 'earth',
        multiplier: (mods) => mods.stainsMet({ Lightning: 1, Ice: 1, Fire: 1 }) ? 1.25 * 5 : 1.25,
      },
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Thermal Transfer',
    character: 'Lune',
    description:
      '50% Ice damage. Recovers 4 AP if target is Burning. Consumes two Earth stains: Play a second turn.',
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
          let base = mods.byName('QTE').selected.name == 'Perfect' ? 6 : mods.byName('QTE').selected.name == 'Success' ? 4 : 2;
          return mods.byName('Critical Hit') ? base * 2 : base;
        },
        element: 'lightning',
        multiplier: (mods) => mods.stainsMet({ Fire: 1 }) ? 0.3 * 1.5 : 0.3,
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
      }
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
    description: '25% damage. Uses weapon\'s element. Critical Hits generate 1 additional Perfection. Rank B: Deals 100% more damage.',
    apCost: 3,
    hits: [
      {
        count: 5,
        element: 'weapon',
        multiplier: (mods) => mods.byName('B') ? 0.25 * 2 : 0.25,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
          const hpMissing = 100 - (mods.byName('Health %')?.count ?? 100);
          return 0.2 * (1 + hpMissing * 0.15) * (mods.byName('C') ? 1.5 : 1);
        },
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('B') ? 1.5 * 1.5 : 1.5,
      }
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
        multiplier: (mods) => mods.byName('B') ? 2 * 1.5 : 2,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Follow Up',
    character: 'Verso',
    description: '200% Light damage. Deals 50% more damage for each Free Aim shot this turn, up to 500%.',
    apCost: (mods) => mods.byName('S') ? 2 : 5,
    hits: [
      {
        count: 1,
        element: 'light',
        multiplier: (mods) => 2 * (1 + 0.5 * (mods.byName('Shots Fired')?.count ?? 0)),
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'From Fire',
    character: 'Verso',
    description: '62.5% damage. Uses weapon\'s element. Heals 20% Health on completion if target Burns. Rank B: Deals 100% more damage',
    apCost: 4,
    hits: [
      {
        count: 3,
        element: 'weapon',
        multiplier: (mods) => mods.byName('B') ? 1.25 * 2 : 1.25,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Marking Shot',
    character: 'Verso',
    description: '100% damage. Uses weapon\'s element. Applies Mark on hit. Rank C: Deals 100% more damage.',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: (mods) => mods.byName('C') ? 1 * 2 : 1,
      }
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
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Perfect Break',
    character: 'Verso',
    description: '500% Light damage. Sets Rank to S on Break. Rank B: Costs 5 AP',
    apCost: (mods) => mods.byName('B') ? 5 : 7,
    hits: [
      {
        count: 1,
        element: 'light',
        multiplier: 5,
      }
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
    apCost: (mods) => mods.byName('S') ? 5 : 9,
    hits: [
      {
        count: 5,
        element: 'light',
        multiplier: 0.7,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('B') ? 1.25 * 2 : 1.25,
      }
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
      }
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
    apCost: (mods) => mods.byName('Agile') ? 0 : 2,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 0.8,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Caster') ? 0.8 * 3 : 0.8,
      }
    ],
    qte: {
      Perfect: 1.2,
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
        multiplier: (mods) => mods.byName('Balanced') ? 0.9 * 3 : 0.9,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Caster') ? 0.8 * 3 : 0.8,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Caster') ? 0.8 * 3 : 0.8,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Balanced') ? 0.6 * 3 : 0.6,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Agile') ? 0.8 * 3 : 0.8,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Balanced') ? 0.6 * 3 : 0.6,
      }
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
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => 0.6 * (mods.byName('Critical Hit') ? 5/3 : 1) * (mods.byName('Heavy') ? 3 : 1),
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Balanced') ? 2.5 * 3 : 2.5,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
          const hp = mods.byName('Health %')?.count ?? 100;
          const hpLost = hp - hp * 0.9;
          return 0.3 * (1 + hpLost * 0.03) * (mods.byName('Heavy') ? 3 : 1);
        },
      }
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
          const hpMissing = 100 - (mods.byName('Health %')?.count ?? 100);
          return 0.7 * (1 + hpMissing * 0.025) * (mods.byName('Agile') ? 3 : 1);
        },
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Balanced') ? 0.4 * 3 : 0.4,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: 3,
      }
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
        multiplier: (mods) => mods.byName('Heavy') ? 0.6 * 2 : 0.6,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Heavy') ? 0.5 * 3 : 0.5,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Agile') ? 0.6 * 3 : 0.6,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Balanced') ? 1 * 3 : 1,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Heavy') ? 5 * 3 : 5,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Ramasseure Bonk',
    character: 'Monoco',
    description: '80% Dark damage. Agile Mask: +20% target\'s Break Bar on hit',
    apCost: 2,
    hits: [
      {
        count: 1,
        element: 'dark',
        multiplier: 0.8,
      }
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
        multiplier: (mods) => mods.byName('Heavy') ? 0.4 * 3 : 0.4,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Caster') ? 1 * 3 : 1,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Heavy') ? 0.45 * 3 : 0.45,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Heavy') ? 4 * 3 : 4,
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  },
  {
    name: 'Card Weaver',
    character: 'Sciel',
    description: '200% Physical damage. Propagates target\'s Foretell to all enemies. Play a second turn.',
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'physical',
        multiplier: 2,
        special: 'Sun',
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
        multiplier: (mods) => mods.byName('Foretell') ? 0.5 * 3 : 0.5,
        special: 'Moon',
      }
    ],
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
      }
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
      }
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
    description: '200% damage. Uses weapon\'s element. Heals 40% Health. Consumes all Foretell to increase Heal by +5% Health per stack.',
    apCost: 3,
    hits: [
      {
        count: 1,
        element: 'weapon',
        multiplier: 2,
        special: 'Moon',
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
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
      }
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
    description: '40% damage, 5-7 hits. Uses weapon\'s element. Consumes 1 Foretell on hit to deal 200% more damage. Critical Hits don\'t remove Foretell but still get the damage increase.',
    apCost: 4,
    hits: [
      {
        count: (mods) => mods.byName('QTE').selected.name == 'Perfect' ? 7 : mods.byName('QTE').selected.name == 'Success' ? 6 : 5,
        element: 'weapon',
        multiplier: (mods) => mods.byName('Foretell') ? 0.4 * 3 : 0.4,
        special: 'Moon',
      }
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
      }
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
    description: '50% damage, 2-6 hits. Uses weapon\'s element. Applies 1 Foretell on hit. Critical Hits apply an additional Foretell.',
    apCost: 7,
    hits: [
      {
        count: (mods) => mods.byName('QTE').selected.name == 'Perfect' ? 6 : mods.byName('QTE').selected.name == 'Success' ? 4 : 2,
        element: 'weapon',
        multiplier: 0.5,
        special: 'Sun',
      }
    ],
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
      }
    ],
    qte: {
      Perfect: 1.2,
      Success: 1.1,
      Failure: 1,
    },
  }
])
