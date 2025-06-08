import { reactive } from "vue";

export var targetBuffs = reactive([
  {
    name: 'Vulnerability',
    type: 'comboBox',
    options: [
      {
        name: 'Normal',
        description: 'Attacks deal normal damage.',
      },
      {
        name: 'Weakness',
        description: 'Attacks deal 50% more damage',
        multiplier: 1.5,
      },
      {
        name: 'Resistant',
        description: 'Attacks deal 50% less damage.',
        multiplier: 0.5,
      },
    ],
  },
  {
    name: 'Flying',
    type: 'boolean',
  },
  {
    name: 'Mark',
    type: 'boolean',
    description: 'The next hit deals 50% more damage.',
    multiplier: 1.5,
    hits: 1,
  },
  {
    name: 'Defenceless',
    type: 'boolean',
    description: 'Defenceless increases the damage received by the target by 25%.',
    multiplier: 1.25,
  },
  {
    name: 'Foretell',
    type: 'count',
    character: 'Sciel',
  },
  {
    name: 'Burn',
    type: 'count',
  },
  {
    name: 'Stunned',
    type: 'boolean',
  },
]);

export var selfBuffs = reactive([
  {
    name: 'Turn',
    type: 'count',
    default: 1,
    min: 1,
    max: 5,
  },
  {
    name: 'Health %',
    type: 'count',
    default: 100,
    min: 1,
    max: 100,
  },
  {
    name: 'Powerful',
    type: 'boolean',
    multiplier: 1.25,
  },
  {
    name: 'Twilight',
    type: 'boolean',
    multiplier: 1.5, // This is wrong, needs to account for how many sun/moon cards you have
    character: 'Sciel',
  },
  {
    name: 'Allies Alive',
    type: 'boolean',
    description: 'All allies are still alive',
  },
  {
    name: 'Alone',
    type: 'boolean',
  },
  {
    name: 'QTE',
    type: 'comboBox',
    options: [
      {
        name: 'Perfect',
      },
      {
        name: 'Success',
      },
      {
        name: 'Failure',
      },
    ],
  },
  {
    name: 'Critical Hit',
    type: 'boolean',
    multiplier: 1.5,
    character: 'None',
  },
  {
    name: 'Exhausted',
    type: 'boolean',
  },
  {
    name: 'Inverted',
    type: 'boolean',
  },
]);