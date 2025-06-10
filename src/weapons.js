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
        multiplier: 1,
      },
      {
        level: 20,
        description: 'Cleanse self Status Effects when switching to Virtuose Stance.',
        multiplier: 1,
      },
    ],
  },
]);