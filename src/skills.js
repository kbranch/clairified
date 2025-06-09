import { reactive } from "vue";

export var skills = reactive([
  {
    name: 'Base Attack',
    hits: [{
      count: 1,
      element: 'weapon',
    }],
    apCost: -1,
  },
  {
    name: 'Free Aim',
    hits: [{
      count: 1,
      element: 'weapon',
      multiplier: (mods) => mods.byName('Flying') ? .3 : 0.15,
    }],
    apCost: 1,
  },
  {
    name: 'Parry Counter',
    hits: [{
      count: 1,
      element: 'weapon',
      multiplier: 5.95,
    }],
    apCost: 0,
  },
  {
    name: 'Percée',
    description: 'Deals medium single target Physical damage. 1 hit. Increased damage to Marked targets.',
    icon: 'percée.png',
    character: 'Maelle',
    hits: [{
      count: 1,
      element: 'physical',
      multiplier: 2.2,
      additiveMultiplier: (mods) => mods.byName('Mark') ? 1 : 0,
    }],
    apCost: (mods) => mods.byName('Virtuose') ? 2 : 5,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
  {
    name: 'Offensive Switch',
    character: 'Maelle',
    hits: [{
      count: 1,
      element: 'weapon',
    }],
    description: 'Deals low single target damage and applies Defenceless for 3 turns. Uses weapon\'s element.',
    apCost: 1,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
  {
    name: 'Breaking Rules',
    character: 'Maelle',
    hits: [{
      count: 2,
      element: 'physical',
      multiplier: 0.75,
      breakMultiplier: 0.7,
    }],
    description: 'Deals low single target Physical damage. Destroys all target\'s Shields. Gains 1 AP per Shield destroyed.If target is Defenceless, play a second turn.',
    apCost: 3,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
  {
    name: 'Degagement',
    character: 'Maelle',
    hits: [{
      count: 1,
      element: 'fire',
    }],
    description: 'Deals low single target Fire damage. Target becomes weak to Fire damage for 2 turns.',
    apCost: 2,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
  {
    name: 'Spark',
    character: 'Maelle',
    hits: [{
      count: 1,
      element: 'fire',
    }],
    description: 'Deals low single target Fire damage. Applies 3 Burn. Offensive Stance: Applies 2 more Burn.',
    apCost: 3,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
  {
    name: 'Combustion',
    character: 'Maelle',
    hits: [{
      count: 2,
      element: 'physical',
      multiplier: (mods) => 0.8 + (Math.min(mods.byName('Burn')?.count ?? 0, 10) * 0.4),
      breakMultiplier: 0.7,
    }],
    description: 'Deals medium single target Physical Damage. Consumes up to 10 Burn for increased damage.',
    apCost: 4,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
  {
    name: 'Fleuret Fury',
    character: 'Maelle',
    hits: [{
      count: 3,
      element: 'physical',
      multiplier: 0.8,
      breakMultiplier: 0.5,
    }],
    description: 'Deals high single target Physical damage. If in Virtuose Stance, stay in Virtuose Stance.',
    canBreak: true,
    apCost: 6,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
  {
    name: 'Rain of Fire',
    character: 'Maelle',
    hits: [{
      count: 2,
      element: 'fire',
      multiplier: 1.25,
      breakMultiplier: 0.7,
    }],
    description: 'Deals medium single target Fire damage. Applies 3 Burn per hit. Defensive Stance: applies 2 more Burn per hit.',
    apCost: 5,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
  {
    name: 'Swift Stride',
    character: 'Maelle',
    hits: [{
      count: 1,
      element: 'physical',
    }],
    description: 'Deals low single target Physical damage. Switches to Virtuose Stance if target is Burning. Regains 0 to 2 AP.',
    apCost: 3,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
]);