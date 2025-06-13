import { reactive } from "vue";

export var spoilerLevels = reactive([ 
  {
    level: 0,
    name: 'Start of Act 1',
  },
  {
    level: 1,
    name: 'After Flying Waters',
  },
  {
    level: 2,
    name: 'After Gestral Village',
  },
  {
    level: 3,
    name: 'Start of Act 2',
  },
  {
    level: 4,
    name: 'After Monoco\'s Station',
  },
]);

export var characters = reactive([
  {
    name: 'Gustave',
  },
  {
    name: 'Lune',
  },
  {
    name: 'Maelle',
    spoilerLevel: 1,
  },
  {
    name: 'Sciel',
    spoilerLevel: 2,
  },
  {
    name: 'Verso',
    spoilerLevel: 3,
  },
  {
    name: 'Monoco',
    spoilerLevel: 4,
  },
]);

export var gimmicks = reactive([
  {
    name: 'Stains',
    character: 'Lune',
    type: 'counts',
    options: [
      'Earth',
      'Fire',
      'Ice',
      'Lightning',
      'Light',
      'Dark',
    ],
  },
  {
    name: 'Stance',
    character: 'Maelle',
    type: 'comboBox',
    options: [
      {
        name: 'Virtuose',
        description: 'Deal 200% more damage',
        multiplier: 3,
      },
      {
        name: 'Offensive',
        description: 'Deal 50% more damage, but also take 50% more damage',
        multiplier: 1.5,
      },
      {
        name: 'Defensive',
        description: 'Take 50% less damage. +1 AP on successful parry or dodge',
        multiplier: 1,
      },
      {
        name: 'Stanceless',
        description: 'Deal normal damage',
        multiplier: 1,
      },
    ],
  },
  {
    name: 'Charges',
    character: 'Sciel',
    type: 'counts',
    options: [
      'Sun',
      'Moon',
    ],
  },
  {
    name: 'Rank',
    character: 'Verso',
    type: 'comboBox',
    options: [
      {
        name: 'S',
        multiplier: 3,
      },
      {
        name: 'A',
        multiplier: 2,
      },
      {
        name: 'B',
        multiplier: 1.5,
      },
      {
        name: 'C',
        multiplier: 1.25,
      },
      {
        name: 'D',
        multiplier: 1,
      },
    ],
  },
  {
    name: 'Mask',
    character: 'Monoco',
    type: 'comboBox',
    options: [
      {
        name: 'Almighty',
      },
      {
        name: 'Agile',
      },
      {
        name: 'Caster',
      },
      {
        name: 'Balanced',
      },
      {
        name: 'Heavy',
      },
    ],
  }
]);