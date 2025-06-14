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
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'light' ? 0.2 : 0,
      },
      {
        level: 20,
        description: 'Deal 50% increased Counterattack damage for each Shield on self',
        additiveMultiplier: (mods, skill) => skill.name == 'Counterattack' ? (0.5 * (mods.byName('Self Shield')?.count ?? 0)) : 0,
      },
    ],
  },
  {
    name: 'Clierum',
    character: 'Maelle',
    element: 'lightning',
    levels: [
      {
        level: 4,
        description: 'Critical hits with Skills recover 2 AP. Once per turn.',
      },
      {
        level: 10,
        description: 'Deal 20% increased Lightning damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'lightning' ? 0.2 : 0,
      },
      {
        level: 20,
        description: '+50% Critical Chance while in Offensive Stance',
        crit: (mods) => mods.byName('Offensive Stance') ? 50 : 0,
      },
    ],
  },
  {
    name: 'Duenum',
    character: 'Maelle',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'In Defensive Stance, recovering AP also recovers 1 AP to other allies',
      },
      {
        level: 10,
        description: 'If Stanceless, Base Attack switches to Defensive Stance',
      },
      {
        level: 20,
        description: 'Recover 1 AP on Stance switch',
      },
    ],
  },
  {
    name: 'Jarum',
    character: 'Maelle',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Switch to Virtuose Stance on Counterattack',
      },
      {
        level: 10,
        description: 'Apply 5 Burn on Counterattack',
      },
      {
        level: 20,
        description: 'Deal 50% increased Counterattack damage for each Shield on self',
        additiveMultiplier: (mods, skill) => skill.name == 'Counterattack' ? (0.5 * (mods.byName('Self Shield')?.count ?? 0)) : 0,
      },
    ],
  },
  {
    name: 'Maellum',
    character: 'Maelle',
    element: 'physical',
  },
  {
    name: 'Melarum',
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
        description: 'Applies Shell when Health is above 80%. (3 turns)',
      },
      {
        level: 20,
        description: 'Switch to Virtuose Stance when Health falls below 50%',
      },
    ],
  },
  {
    name: 'Plenum',
    character: 'Maelle',
    element: 'ice',
    levels: [
      {
        level: 4,
        description: 'On turn start, if Stanceless, switch to Defensive Stance',
      },
      {
        level: 10,
        description: 'In Defensive Stance, double Break potency',
        breakMultiplier: (mods) => mods.byName('Defensive Stance') ? 2 : 1,
      },
      {
        level: 20,
        description: 'Support Skills cost 1 less AP',
      },
    ],
  },
  {
    name: 'Sekarum',
    character: 'Maelle',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Switch to Virtuose Stance on destroying a Shield',
      },
      {
        level: 10,
        description: 'Free Aim shots destroy 2 Shields',
      },
      {
        level: 20,
        description: 'In Virtuose Stance, all damage pierce Shields. Deal 10% more damage.',
        multiplier: 1.1,
      },
    ],
  },
  {
    name: 'Stalum',
    character: 'Maelle',
    element: 'fire',
    levels: [
      {
        level: 4,
        description: 'Apply Burn on self on turn start. Deal 10% increased damage for each Burn on self.',
        additiveMultiplier: (mods) => (0.1 * (mods.byName('Self Burn')?.count ?? 0)),
      },
      {
        level: 10,
        description: 'Base Attack applies 2 Burn',
      },
      {
        level: 20,
        description: 'While in Defensive Stance, receive Heal instead of Burn damage',
      },
    ],
  },
  {
    name: 'Benisim',
    character: 'Lune',
    element: 'earth',
    levels: [
      {
        level: 4,
        description: 'Healing Skills cost 1 less AP',
        // todo: let this modify skills
      },
      {
        level: 10,
        description: 'Generate one Earth Stain at the beginning of each turn',
      },
      {
        level: 20,
        description: 'Replay instantly on consuming Stains with a Healing Skill',
      },
    ],
  },
  {
    name: 'Chapelim',
    character: 'Lune',
    element: 'earth',
    levels: [
      {
        level: 4,
        description: '30% increased Break potency per Earth Stain',
        breakMultiplier: (mods) => 1 + (0.3 * (mods.byName('Earth')?.count ?? 0)),
      },
      {
        level: 10,
        description: 'Recover 9 AP on Stunning an enemy',
      },
      {
        level: 20,
        description: 'Generate one Earth Stain at the beginning of each turn',
      },
    ],
  },
  {
    name: 'Colim',
    character: 'Lune',
    element: 'light',
    levels: [
      {
        level: 4,
        description: '50% chance to generate a Light Stain when consuming Stains',
      },
      {
        level: 10,
        description: 'Recover 1 AP on consuming a Light Stain',
      },
      {
        level: 20,
        description: 'Deal 20% increased damage with Skills per Light Stain',
        additiveMultiplier: (mods, skill) => skill.isSkill ? (0.2 * (mods.byName('Light')?.count ?? 0)) : 0,
      },
    ],
  },
  {
    name: 'Coralim',
    character: 'Lune',
    element: 'ice',
    levels: [
      {
        level: 4,
        description: 'Ice Skills cost 1 less AP',
      },
      {
        level: 10,
        description: 'Deal 20% increased Ice damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'ice' ? 0.2 : 0,
      },
      {
        level: 20,
        description: 'Start battle with 1 Earth Stain',
      },
    ],
  },
  {
    name: 'Deminerim',
    character: 'Lune',
    element: 'lightning',
    levels: [
      {
        level: 4,
        description: 'Lightning Skills cost 1 less AP',
      },
      {
        level: 10,
        description: 'Deal 20% increased Lightning damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'lightning' ? 0.2 : 0,
      },
      {
        level: 20,
        description: 'Start battle with 1 Fire Stain',
      },
    ],
  },
  {
    name: 'Elerim',
    character: 'Lune',
    element: 'earth',
    levels: [
      {
        level: 4,
        description: 'Consuming an Earth Stain applies 1 Shield to self',
      },
      {
        level: 10,
        description: 'Deal 20% increased Earth damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'earth' ? 0.2 : 0,
      },
      {
        level: 20,
        description: 'Base Attack generates an Earth Stain',
      },
    ],
  },
  {
    name: 'Kralim',
    character: 'Lune',
    element: 'lightning',
    levels: [
      {
        level: 4,
        description: 'After casking a Skill, Skills of all other elements deal 20% increased damage. Resets when casting a Skill of a previous element',
      },
      {
        level: 10,
        description: 'On turn start, if no Stains, 2 random Stains are generated',
      },
      {
        level: 20,
        description: 'Recover 1 AP when Stains are consumed',
      },
    ],
  },
  {
    name: 'Lighterim',
    character: 'Lune',
    element: 'fire',
    levels: [
      {
        level: 4,
        description: 'Fire Skills cost 1 less AP',
      },
      {
        level: 10,
        description: 'Deal 20% increased Fire damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'fire' ? 0.2 : 0,
      },
      {
        level: 20,
        description: 'Start battle with 1 Ice Stain',
      },
    ],
  },
  {
    name: 'Lunerim',
    character: 'Lune',
    element: 'fire',
  },
  {
    name: 'Poterim',
    character: 'Lune',
    element: 'ice',
    levels: [
      {
        level: 4,
        description: 'Healing Skills generate one additional Light stain',
      },
      {
        level: 10,
        description: 'Consuming a Light Stain applies Slow to a random enemy',
      },
      {
        level: 20,
        description: 'Base Attack generates a Light Stain',
      },
    ],
  },
  {
    name: 'Redalim',
    character: 'Lune',
    element: 'ice',
    levels: [
      {
        level: 4,
        description: 'Healing Skills generate one additional Light Stain',
      },
      {
        level: 10,
        description: 'Generate one Ice Stain at the beginning of each turn',
      },
      {
        level: 20,
        description: 'Replay instantly on consuming Stains with a Healing Skill',
      },
    ],
  },
  {
    name: 'Saperim',
    character: 'Lune',
    element: 'lightning',
    levels: [
      {
        level: 4,
        description: 'Using a Gradient Attack generates 1 additional Light Stain',
      },
      {
        level: 10,
        description: 'When a Fire Stain is generated, a Lightning Stain is also generated. Once per turn.',
      },
      {
        level: 20,
        description: 'Gradient Attacks and Gradient Counters deal 50% more damage',
      },
    ],
  },
  {
    name: 'Scaverim',
    character: 'Lune',
    element: 'dark',
    levels: [
      {
        level: 4,
        description: '50% chance to generate a Dark Stain when consuming Stains. Deal 50% more damage with Skills per active Dark Stain.',
        multiplier: (mods, skill) => skill.isSkill ? 1 + (0.5 * (mods.byName('Dark')?.count ?? 0)) : 1,
      },
      {
        level: 10,
        description: 'Base Attacks can consume one Dark Stain to deal 200% more damage',
        multiplier: (mods, skill) => skill.name == 'Base Attack' && mods.byName('Dark') ? 3 : 1,
      },
      {
        level: 20,
        description: 'With 4 active Dark Stains, any Skill can consume them to deal 300% increased damage',
        additiveMultiplier: (mods, skill) => skill.isSkill && mods.byName('Dark')?.count >= 4 ? 3 : 0,
      },
    ],
  },
  {
    name: 'Trebuchim',
    character: 'Lune',
    element: 'lightning',
    levels: [
      {
        level: 4,
        description: 'Generate a random Stain on Free Aim shot',
      },
      {
        level: 10,
        description: 'Recover 1 AP when Stains are consumed',
      },
      {
        level: 20,
        description: 'Base Attack generates 2 random Stains',
      },
    ],
  },
  {
    name: 'Troubadim',
    character: 'Lune',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Free Aim Shots deal damage to an additional random target',
      },
      {
        level: 10,
        description: 'Deal 50% increased Free Aim damage',
        additiveMultiplier: (mods, skill) => skill.name == 'Free Aim' ? 0.5 : 0,
      },
      {
        level: 20,
        description: 'Generate a random Stain on Free Aim shot',
      },
    ],
  },
  {
    name: 'Algueron',
    character: 'Sciel',
    element: 'ice',
    levels: [
      {
        level: 4,
        description: 'Free Aim shots can consume 1 Foretell to deal double damage',
        multiplier: (mods, skill) => skill.name == 'Free Aim' && mods.byName('Foretell') ? 2 : 1,
      },
      {
        level: 10,
        description: 'Base Attack applies 3 Foretell. Deal 10% more damage.',
        multiplier: 1.1,
      },
      {
        level: 20,
        description: 'During Twilight, Free Aim shots deal double damage',
        multiplier: (mods, skill) => skill.name == 'Free Aim' && mods.byName('Twilight') ? 2 : 1,
      },
    ],
  },
  {
    name: 'Blizzon',
    character: 'Sciel',
    element: 'ice',
    levels: [
      {
        level: 4,
        description: 'While having at least 1 active Moon charge, Moon Skills are always Critical but damage taken is doubled',
        crit: (mods, skill) => skill.special == 'Moon' && mods.byName('Moon') ? 100 : 0,
      },
      {
        level: 10,
        description: 'Deal 25% more damage per Moon charge',
        multiplier: (mods) => 1 + (0.25 * (mods.byName('Moon')?.count ?? 0)),
      },
      {
        level: 20,
        description: 'Base Attack gives 1 Moon charge',
      },
    ],
  },
  {
    name: 'Bourgelon',
    character: 'Sciel',
    element: 'light',
    levels: [
      {
        level: 4,
        description: 'Consuming Foretell applies 2 Burn on target per Sun charge',
      },
      {
        level: 10,
        description: 'Deal double Burn damage in Twilight state',
      },
      {
        level: 20,
        description: 'Sun Skills give one more charge',
      },
    ],
  },
  {
    name: 'Chation',
    character: 'Sciel',
    element: 'dark',
    levels: [
      {
        level: 4,
        description: 'Sun Skills always apply 10 Foretell, but all damage taken is doubled',
      },
      {
        level: 10,
        description: 'Base Attack gives 1 moon charge and consumes all Foretell to apply Burn',
      },
      {
        level: 20,
        description: 'Deal double Burn damage in Twilight state',
      },
    ],
  },
  {
    name: 'Corderon',
    character: 'Sciel',
    element: 'dark',
    levels: [
      {
        level: 4,
        description: 'Curse self on battle start (4 turns). Deal 50% more damage while Cursed.',
        multiplier: (mods) => mods.byName('Curse') ? 1.5 : 1,
      },
      {
        level: 10,
        description: 'Reset Curse duration when entering Twilight state (6 turns)',
      },
      {
        level: 20,
        description: 'Play again when entering Twilight state',
      },
    ],
  },
  {
    name: 'Direton',
    character: 'Sciel',
    element: 'earth',
    levels: [
      {
        level: 4,
        description: 'Recover 1 AP per Moon charge on turn start',
      },
      {
        level: 10,
        description: 'Base Attack gives 1 Moon charge',
      },
      {
        level: 20,
        description: 'During Twilight, Base Attack consumes all AP. Base Attack applies 1 Foretell and deals 50% increased damage per AP consumed.',
      },
    ],
  },
  {
    name: 'Gobluson',
    character: 'Sciel',
    element: 'fire',
    levels: [
      {
        level: 4,
        description: 'During Twilight, every time Foretell is applied it also affects another random enemy',
      },
      {
        level: 10,
        description: 'Apply 1 Burn every 3 foretell applied with Skills',
      },
      {
        level: 20,
        description: 'Deal 20% increased Fire damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'fire' ? 0.2 : 0,
      },
    ],
  },
  {
    name: 'Lusteson',
    character: 'Sciel',
    element: 'dark',
    levels: [
      {
        level: 4,
        description: 'Killing an enemy with Foretell applies its Foretell to another random enemy',
      },
      {
        level: 10,
        description: 'Apply Mark on consuming Foretell',
      },
      {
        level: 20,
        description: 'Deal 20% increased Dark damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'dark' ? 0.2 : 0,
      },
    ],
  },
  {
    name: 'Minason',
    character: 'Sciel',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Sun Skills deal 10% increased damage for each Foretell on the target. Moon Skills don\'t generate Moon charges anymore.',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.special == 'Sun' ? (0.1 * (mods.byName('Foretell')?.count ?? 0)) : 0,
      },
      {
        level: 10,
        description: 'With at least 1 active Sun charge, recover one additional AP for each Foretell consumed',
      },
      {
        level: 20,
        description: 'Base Attack can consume 1 Sun charge to apply 5 foretell',
      },
    ],
  },
  {
    name: 'Moisson',
    character: 'Sciel',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'During Twilight, all damage dealt is converted to Dark damage',
      },
      {
        level: 10,
        description: 'Deal 20% increased Dark damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'dark' ? 0.2 : 0,
      },
      {
        level: 20,
        description: 'Apply Shell during Moon, Powerful during Sun, and Rush during Twilight (3 turns)',
      },
    ],
  },
  {
    name: 'Ramasson',
    character: 'Sciel',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Can consume 1 Moon charge on turn start to heal all allies by 20% Health',
      },
      {
        level: 10,
        description: 'Base Attack gives 1 Moon charge',
      },
      {
        level: 20,
        description: 'Moon Skills give one more charge',
      },
    ],
  },
  {
    name: 'Rangeson',
    character: 'Sciel',
    element: 'dark',
    levels: [
      {
        level: 4,
        description: 'Heal 5% Health for each Foretell applied',
      },
      {
        level: 10,
        description: 'Healing Skills cost 1 less AP',
      },
      {
        level: 20,
        description: '30% increased Heal efficiency per Moon charge. Base Attack gives 1 Moon charge.',
      },
    ],
  },
  {
    name: 'Sadon',
    character: 'Sciel',
    element: 'light',
    levels: [
      {
        level: 4,
        description: 'On turn start, gain 1 Shield if at least 1 Sun charge is active',
      },
      {
        level: 10,
        description: 'Apply 5 Foretell on enemies that destroy Shields',
      },
      {
        level: 20,
        description: '+2 Sun charges on Counterattack',
      },
    ],
  },
  {
    name: 'Scieleson',
    character: 'Sciel',
    element: 'physical',
  },
  {
    name: 'Tisseron',
    character: 'Sciel',
    element: 'lightning',
    levels: [
      {
        level: 4,
        description: 'Deal 50% more damage with Sun Skills. Extend Twilight by one turn on using a Moon Skill.',
        multiplier: (mods, skill) => skill.isSkill && skill.special == 'Sun' ? 1.5 : 1,
      },
      {
        level: 10,
        description: 'Twilight duration is increased by 1',
      },
      {
        level: 20,
        description: 'Play again when entering Twilight state',
      },
    ],
  },
  {
    name: 'Abysseram',
    character: 'Verso',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Deal 50% more damage on Rank D. No damage increase on other ranks.',
        multiplier: (mods) => mods.byName('Rank')?.name == 'D' ? 1.5 : 1,
      },
      {
        level: 10,
        description: 'Deal 50% increased Base Attack damage',
        additiveMultiplier: (mods, skill) => skill.name == 'Base Attack' ? 0.5 : 0,
      },
      {
        level: 20,
        description: 'On Rank D, heal 20% Health with Base Attack',
      },
    ],
  },
  {
    name: 'Blodam',
    character: 'Verso',
    element: 'light',
    levels: [
      {
        level: 4,
        description: 'Perfection is now based on current Health. Gain 1 Rank every 20% missing Health.',
      },
      {
        level: 10,
        description: 'Deal 20% increased Light damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'light' ? 0.2 : 0,
      },
      {
        level: 20,
        description: 'Recover 1 AP on Rank Up',
      },
    ],
  },
  {
    name: 'Confuso',
    character: 'Verso',
    element: 'light',
    levels: [
      {
        level: 4,
        description: 'Light damage can Burn on Critical hits',
      },
      {
        level: 10,
        description: 'Apply 3 Burn instead of Mark',
      },
      {
        level: 20,
        description: 'Deal 50% more Burn damage per Rank, upto 300% on Rank S',
      },
    ],
  },
  {
    name: 'Contorso',
    character: 'Verso',
    element: 'lightning',
    levels: [
      {
        level: 4,
        description: 'Switch to Rank S on Stun. Base Attack can Stun.',
      },
      {
        level: 10,
        description: '100% Critical Chance on Rank S',
        crit: (mods) => mods.byName('S') ? 100 : 0,
      },
      {
        level: 20,
        description: 'Triggers a lightning strike on Critical Hits. Deals electric damage equal to 50% of base Attack Power.',
        extraHits: (mods, skill) => mods.byName('Critical Hit') ? [{
          count: skill.parsedCount,
          element: 'lightning',
          multiplier: 0.5,
        }] : null,
      },
    ],
  },
  {
    name: 'Cruleram',
    character: 'Verso',
    element: 'ice',
    levels: [
      {
        level: 4,
        description: 'Don\'t lose Rank when taking damage from Powerless enemies',
      },
      {
        level: 10,
        description: '+1 perfection on hitting a Powerless enemy',
      },
      {
        level: 20,
        description: 'Apply Powerless on Counterattack (3 turns)',
      },
    ],
  },
  {
    name: 'Danseso',
    character: 'Verso',
    element: 'fire',
    levels: [
      {
        level: 4,
        description: 'Base attack gives 1 Perfection per Burn on target',
      },
      {
        level: 10,
        description: 'While Powerful, 20% change to Burn on hit',
      },
      {
        level: 20,
        description: 'Recover 1 AP on Rank Up',
      },
    ],
  },
  {
    name: 'Delaram',
    character: 'Verso',
    element: 'light',
    levels: [
      {
        level: 4,
        description: 'Start battle on Rank B, but 50% Health',
      },
      {
        level: 10,
        description: 'Heal 15% Health on Base Attack',
      },
      {
        level: 20,
        description: 'Start battle with Powerful. Lasts until Rank changes.',
      },
    ],
  },
  {
    name: 'Demonam',
    character: 'Verso',
    element: 'light',
    levels: [
      {
        level: 4,
        description: 'Deal 50% increased Light damage after casting a Physical Skill and vice versa',
      },
      {
        level: 10,
        description: 'Deal 20% increased Physical damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'physical' ? 0.2 : 0,
      },
      {
        level: 20,
        description: 'Dealing Light damage with a Skill heals 3% Health',
      },
    ],
  },
  {
    name: 'Dualiso',
    character: 'Verso',
    element: 'lightning',
    levels: [
      {
        level: 4,
        description: 'Play again after a Base Attack',
      },
      {
        level: 10,
        description: 'Deal 50% increased Base Attack damage',
        additiveMultiplier: (mods, skill) => skill.name == 'Base Attack' ? 0.5 : 0,
      },
      {
        level: 20,
        description: 'Base Attack gives 4 Perfection',
      },
    ],
  },
  {
    name: 'Gaulteram',
    character: 'Verso',
    element: 'earth',
    levels: [
      {
        level: 4,
        description: 'When hit, lose 1 Perfection instead of 1 Rank',
      },
      {
        level: 10,
        description: 'Rank S also grants Rush',
      },
      {
        level: 20,
        description: 'Gain 2 Perfection on turn start',
      },
    ],
  },
  {
    name: 'Glaceso',
    character: 'Verso',
    element: 'ice',
    levels: [
      {
        level: 4,
        description: '+1 Perfection on Critical hit',
      },
      {
        level: 10,
        description: 'Heal 2% Health on dealing a Critical hit',
      },
      {
        level: 20,
        description: 'Counterattack is always a Critical hit',
        crit: (mods, skill) => skill.name == 'Counterattack' ? 100 : 0,
      },
    ],
  },
  {
    name: 'Lanceram',
    character: 'Verso',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Rank can\'t be lower than C',
      },
      {
        level: 10,
        description: 'Base Attack gives 4 Perfection',
      },
      {
        level: 20,
        description: 'Parrying gives 2 Perfection instead of 1',
      },
    ],
  },
  {
    name: 'Noahram',
    character: 'Verso',
    element: 'physical',
  },
  {
    name: 'Sakaram',
    character: 'Verso',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Can\'t lose Perfection. No damage increase from Rank.',
      },
      {
        level: 10,
        description: 'Deal 50% increased Base Attack damage',
        additiveMultiplier: (mods, skill) => skill.name == 'Base Attack' ? 0.5 : 0,
      },
      {
        level: 20,
        description: 'Base Attack gives 4 Perfection',
      },
    ],
  },
  {
    name: 'Seeram',
    character: 'Verso',
    element: 'light',
    levels: [
      {
        level: 4,
        description: '+1 to all Perfection gain but can\'t reach Rank S',
      },
      {
        level: 10,
        description: 'Base Attack gives 4 Perfection',
      },
      {
        level: 20,
        description: 'Deal 20% increased Light damage with Skills',
        additiveMultiplier: (mods, skill) => skill.isSkill && skill.element == 'light' ? 0.2 : 0,
      },
    ],
  },
  {
    name: 'Sireso',
    character: 'Verso',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Bonus damage from Perfection applies to other allies at half value instead',
      },
      {
        level: 10,
        description: 'Perfection gained is increased by 1 while Powerful',
      },
      {
        level: 20,
        description: 'Support Skills cost 1 less AP',
      },
    ],
  },
  {
    name: 'Verleso',
    character: 'Verso',
    element: 'physical',
  },
  {
    name: 'Ballaro',
    character: 'Monoco',
    element: 'light',
    levels: [
      {
        level: 4,
        description: 'Reverse Bestial Wheel order',
      },
      {
        level: 10,
        description: 'Using an Upgraded Skill recovers 1 AP to other allies',
      },
      {
        level: 20,
        description: 'Almighty Mask recovers 2 AP to all allies',
      },
    ],
  },
  {
    name: 'Boucharo',
    character: 'Monoco',
    element: 'fire',
    levels: [
      {
        level: 4,
        description: 'Start battle in Agile Mask',
      },
      {
        level: 10,
        description: 'Agile Mask applies Rush (3 turns)',
      },
      {
        level: 20,
        description: '+50% Critical Chance while in Agile Mask',
        crit: (mods) => mods.byName('Agile') ? 50 : 0,
      },
    ],
  },
  {
    name: 'Monocaro',
    character: 'Monoco',
    element: 'physical',
    levels: [
      {
        level: 4,
        description: 'Start battle in Balanced Mask',
      },
      {
        level: 10,
        description: 'Balanced Mask applies Powerful (3 turns)',
      },
      {
        level: 20,
        description: 'Critical hits deal 130% increased damage while in Balanced Mask',
        additiveMultiplier: (mods) => mods.byName('Balanced') && mods.byName('Critical Hit') ? 1.3 : 0,
      },
    ],
  },
  {
    name: 'Nusaro',
    character: 'Monoco',
    element: 'dark',
    levels: [
      {
        level: 4,
        description: 'Parries increase the Bestial Wheel by 1. Taking damage resets the Bestial Wheel.',
      },
      {
        level: 10,
        description: 'Upgraded Skills deal 30% increased damage',
        additiveMultiplier: (mods, skill) => mods.byName(skill.special) ? 0.3 : 0,
      },
      {
        level: 20,
        description: '+1 AP on Mask change',
      },
    ],
  }
]);