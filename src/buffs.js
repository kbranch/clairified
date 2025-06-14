import { reactive } from "vue";

export var targetBuffs = reactive([
  {
    name: 'Normal',
    type: 'weakness',
    value: 'normal',
    multiplier: 1,
    character: 'None',
  },
  {
    name: 'Weakness',
    type: 'weakness',
    value: 'weak',
    multiplier: 1.5,
    character: 'None',
  },
  {
    name: 'Resistant',
    type: 'weakness',
    value: 'resist',
    multiplier: 0.5,
    character: 'None',
  },
  {
    name: 'Immune',
    type: 'weakness',
    value: 'immune',
    multiplier: 0,
    character: 'None',
  },
  {
    name: 'Absorb',
    type: 'weakness',
    value: 'absorb',
    multiplier: -0.5,
    character: 'None',
  },
  {
    name: 'Flying',
    type: 'boolean',
  },
  {
    name: 'Mark',
    type: 'boolean',
    icon: 'mark.png',
    iconOnly: true,
    description: 'The next hit deals 50% more damage.',
    multiplier: 1.5,
    hitDuration: 1,
  },
  {
    name: 'Defenceless',
    type: 'boolean',
    icon: 'defenceless.png',
    iconOnly: true,
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
    icon: 'fire.png',
    iconOnly: true,
  },
  {
    name: 'Stunned',
    type: 'boolean',
    icon: 'stun.png',
    iconOnly: true,
  },
  {
    name: 'Powerless',
    type: 'boolean',
    icon: 'powerless.png',
    iconOnly: true,
  },
  {
    name: 'Target Shield',
    icon: 'shield.png',
    iconOnly: true,
    type: 'count',
    default: 0,
    min: 0,
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
    name: 'Self Shield',
    icon: 'shield.png',
    iconOnly: true,
    type: 'count',
    default: 0,
    min: 0,
  },
  {
    name: 'Powerful',
    type: 'boolean',
    icon: 'powerful.png',
    iconOnly: true,
    multiplier: 1.25,
  },
  {
    name: 'Twilight',
    type: 'boolean',
    icon: 'twilight.png',
    iconOnly: true,
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
    icon: 'exhausted.png',
    iconOnly: true,
  },
  {
    name: 'Inverted',
    type: 'boolean',
    icon: 'inverted.png',
    iconOnly: true,
  },
]);