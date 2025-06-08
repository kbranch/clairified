import { reactive } from "vue";

export var skills = reactive([
  {
    name: 'Base Attack',
    hits: 1,
    multiplier: 1,
    breakMultiplier: 1,
    apCost: -1,
  },
  {
    name: 'Free Aim',
    hits: 1,
    multiplier: (mods) => mods.byName('Flying') ? .3 : 0.15,
    breakMultiplier: 1,
    apCost: 1,
  },
  {
    name: 'Parry Counter',
    hits: 1,
    multiplier: 5.95,
    breakMultiplier: 1,
    apCost: 0,
  },
  {
    name: 'Percée',
    description: 'Deals medium single target Physical damage. 1 hit. Increased damage to Marked targets.',
    icon: 'percée.png',
    character: 'Maelle',
    hits: 1,
    multiplier: 2.2,
    additiveMultiplier: (mods) => mods.byName('Mark') ? 1 : 0,
    breakMultiplier: 1,
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
    hits: 1,
    multiplier: 1,
    breakMultiplier: 1,
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
    hits: 2,
    multiplier: 0.75,
    breakMultiplier: 0.7,
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
    hits: 1,
    multiplier: 1,
    breakMultiplier: 1,
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
    hits: 1,
    multiplier: 1,
    breakMultiplier: 1,
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
    hits: 2,
    multiplier: (mods) => 0.8 + (Math.min(mods.byName('Burn')?.count ?? 0, 10) * 0.4),
    breakMultiplier: 0.7,
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
    hits: 3,
    multiplier: 0.8,
    breakMultiplier: 0.5,
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
    hits: 2,
    multiplier: 1.25,
    breakMultiplier: 0.7,
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
    hits: 1,
    multiplier: 1,
    breakMultiplier: 1,
    apCost: 3,
    qte: {
      'Perfect': 1.2,
      'Success': 1.1,
      'Failure': 1,
    }
  },
]);