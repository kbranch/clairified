import { reactive } from "vue";

export var weapons = reactive([
  {
    name: 'Glaisum',
    character: 'Maelle',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Heal other allies by 20% Health on switching to Virtuose Stance. Deal 10% more damage.',
        multiplier: 1.1,
      },
      {
        level: 10,
        description: 'Gain Shell when switching out of Virtuose Stance.',
      },
      {
        level: 20,
        description: 'Cleanse self Status Effects when switching to Virtuose Stance.',
      },
    ],
  },
  {
    name: 'Medalum',
    character: 'Maelle',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Start in Virtuose Stance',
      },
      {
        level: 10,
        description: 'In Virtuose Stance, every Burn applied is doubled. Deal 10% more damage.',
        multiplier: 1.1,
      },
      {
        level: 20,
        description: 'In Virtuose Stance, Burn deals double damage. Deal 10% more damage.',
        multiplier: 1.1,
      },
    ],
  },
  {
    name: 'Battlum',
    character: 'Maelle',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Double Gradient generation while in Defensive Stance',
      },
      {
        level: 10,
        description: 'If Stanceless, Base Attack switches to Defensive Stance',
      },
      {
        level: 20,
        description: '+5% Gradient Charge on Parry',
      },
    ],
  },
  {
    name: 'Brulerum',
    character: 'Maelle',
    element: 'fire',
    levels: [
      {
        level: 4,
        description: 'Critical hits apply Burn',
      },
      {
        level: 10,
        description: 'Base Attack applies 2 Burn',
      },
      {
        level: 20,
        description: '100% Critical Chance while Stanceless',
      },
    ],
  },
  {
    name: 'Chalium',
    character: 'Maelle',
    element: 'light',
    levels: [
      {
        level: 4,
        description: 'On Defensive Stance, gain 1 Shield per Parry. Lose all Shields on turn start.',
      },
      {
        level: 10,
        description: 'Deal 20% increased Light damage with Skills',
        multiplier: (mods, skill) => {
          return skill.isSkill && skill.element == 'light' ? 1.2 : 1;
        },
      },
      {
        level: 20,
        description: 'Deal 50% increased Counterattack damage for each Shield on self',
        multiplier: (mods, skill) => skill.name == 'Counterattack' ? 1 + (0.5 * (mods.byName('Shield')?.count ?? 0)) : 1,
      },
    ],
  }
]);