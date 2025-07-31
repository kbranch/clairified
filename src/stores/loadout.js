import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { sortByKey } from '@/main';
import { characters as allCharacters, gimmicks } from '@/data/consts.js';
import { skills as allSkills } from '@/data/skills.js';
import { luminas as allLuminas } from '@/data/luminas.js';
import { weapons as allWeapons } from '@/data/weapons.js';
import { targetBuffs as allTargetBuffs, selfBuffs as allSelfBuffs } from '@/data/buffs.js';
import { useSettingsStore } from './settings';
import { DamageCalc } from '@/damageCalc';

export const useLoadoutStore = defineStore('loadout', () => {
  const settings = useSettingsStore();

  const defaultAttackPower = 1000;
  const defaultCrit = 25;
  const elements = ['dark', 'light', 'physical', 'fire', 'ice', 'lightning', 'earth', 'void'];

  const character = ref(allCharacters[0]);
  const baseAttackPower = ref(defaultAttackPower);
  const baseCrit = ref(defaultCrit);

  const presets = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  const activePresets = ref(null);
  const activePreset = ref(null);

  const selections = ref([]);

  const characters = computed (() => {
    return allCharacters.map(x => {
      return (x.spoilerLevel ?? 0) <= settings.spoilerLevel.level ? x : {
        name: '???',
      }
    });
  });

  const weaknesses = ref({});

  const luminas = computed(() => {
    return allLuminas.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= settings.spoilerLevel.level);
  });

  const selectedLuminas = computed(() => luminas.value.filter(x => x.selected > 0));

  const skills = computed(() => {
    return allSkills.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= settings.spoilerLevel.level);
  });

  const gimmick = computed (() => {
    return gimmicks.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= settings.spoilerLevel.level)[0];
  });

  const weapons = computed(() => {
    return allWeapons.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= settings.spoilerLevel.level);
  });

  const selectedWeapon = computed(() => weapons.value.find(x => x.selected));

  const selfBuffs = computed(() => {
    return sortByKey(allSelfBuffs.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= settings.spoilerLevel.level), x => [x.type, x.name]);
  });

  const targetBuffs = computed(() => {
    return sortByKey(allTargetBuffs.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= settings.spoilerLevel.level), x => [x.type, x.name]);
  });

  const allMods = computed(() => {
    let mods = [];

    if (gimmick.value?.type == 'comboBox') {
      mods.push(gimmick.value.selected);
    }
    else if (gimmick.value?.type == 'counts') {
      for (const [option, count] of Object.entries(gimmick.value.counts)) {
        mods.push({
          name: option,
          count: count,
          multiplier: 1,
        });
      }
    }

    mods = mods.concat(allSelfBuffs);
    mods = mods.concat(allTargetBuffs);
    mods = mods.concat(allLuminas);

    const weapon = weapons.value.find(x => x.selected);
    if (weapon) {
      mods.push({
        name: weapon.name,
      });

      for (const level of weapon.levels) {
        level.name = `${weapon.name} L${level.level}`;
      }

      mods = mods.concat(weapon.levels);
    }

    return mods;
  });

  const selectedMods = computed(() => {
    let mods = [];

    if (gimmick.value?.type == 'comboBox') {
      gimmick.value.selected.type = 'gimmick';
      mods.push(gimmick.value.selected);
    }
    else if (gimmick.value?.type == 'counts' && gimmick.value.counts) {
      for (const [option, count] of Object.entries(gimmick.value.counts)) {
        if (count > 0) {
          mods.push({
            name: option,
            count: count,
            multiplier: 1,
            type: 'gimmick',
          });
        }
      }
    }

    mods = mods.concat(selfBuffs.value.filter(x => x.selected || (x.count ?? 0) > 0));
    mods = mods.concat(targetBuffs.value.filter(x => x.selected || (x.count ?? 0) > 0));
    mods = mods.concat(luminas.value.filter(x => x.selected || (x.count ?? 0) > 0));

    const weapon = weapons.value.find(x => x.selected);
    if (weapon) {
      mods.push({
        name: weapon.name,
        element: weapon.element,
        type: 'weapon',
      });

      for (const level of weapon.levels) {
        level.name = `${weapon.name} L${level.level}`;
      }

      mods = mods.concat(weapon.levels.filter(x => x.selected));
    }

    return mods;
  });

  function modByName(name) {
    return allMods.value.find(mod => mod.name == name);
  }

  function resetLuminas() {
    for (const lumina of luminas.value) {
      lumina.selected = false;
    }
  }

  function resetWeapons() {
    for (const weapon of weapons.value) {
      weapon.selected = false;
      if (weapon.levels) {
        for (const level of weapon.levels) {
          level.selected = false;
        }
      }
    }
  }

  function resolveElement(element) {
    element = DamageCalc.getElement(element, selectedMods.value);

    if (element == 'weapon') {
      element = selectedWeapon.value?.element ?? 'physical';
    }

    return element;
  }

  function elementUrl(element) {
    return `/images/${resolveElement(element)}.png`;
  }

  function weaknessMod(element) {
    element = resolveElement(element);
    return allMods.value.find(mod => mod.type == 'weakness' && mod.value == weaknesses.value[element]) ?? 1;
  }

  watch(gimmick, (value) => {
    if (value?.type == 'comboBox') {
      value.selected = value.options[0];
    }
    else if (value?.type == 'counts') {
      value.counts = {};
      for (const option of value.options) {
        value.counts[option] = 0;
      }
    }
  });

  let savedCharacter = null;
  watch(selectedMods, (value) => {
    if (savedCharacter && character.value.name != savedCharacter) {
      savedCharacter = character.value.name;
      return;
    }

    saveSelections(value);
  });

  watch(baseAttackPower, () => {
    if (savedCharacter && character.value.name != savedCharacter) {
      savedCharacter = character.value.name;
      return;
    }

    saveSelections(selectedMods.value);
  });

  watch(baseCrit, () => {
    if (savedCharacter && character.value.name != savedCharacter) {
      savedCharacter = character.value.name;
      return;
    }

    saveSelections(selectedMods.value);
  });

  watch(weaknesses, () => {
    if (savedCharacter && character.value.name != savedCharacter) {
      savedCharacter = character.value.name;
      return;
    }

    saveSelections(selectedMods.value);
  }, { deep: true });

  watch(character, (value, oldValue) => {
    activePresets.value[oldValue.name] = activePreset.value;
    activePreset.value = activePresets.value[value.name];

    if (selections.value[value.name]) {
      loadSelections(value.name);
    }
  });

  watch(selectedMods, (newMods) => {
    newMods.filter(x => x.hitDuration)
      .forEach(x => {
        x.duration = x.hitDuration;

        if (typeof x.duration === 'function') {
          x.duration = DamageCalc.resolveFunction(x.duration, newMods);
        }
    });
  });

  watch(() => settings.favoriteLuminas, () => {
    updateLuminas();
  }, { deep: true });

  watch(() => settings.favoriteWeapons, () => {
    updateWeapons();
  }, { deep: true });

  watch(() => settings.favoriteSkills, () => {
    updateSkills();
  }, { deep: true });

  watch(activePreset, () => {
    loadSelectionsFromStorage();
    loadSelections(character.value.name);
  });

  function updateLuminas() {
    allLuminas.forEach(lumina => {
      let mult = DamageCalc.getMultiplier(lumina, selectedMods.value) - 1;
      let additive = DamageCalc.getMultiplier(lumina, selectedMods.value, null, 'additiveMultiplier');

      if (additive == 1) {
        additive = 0;
      }

      lumina.sortMult = Math.round((mult + additive) * 100);
      lumina.favorite = settings.favoriteLuminas.includes(lumina.name);
    });
  }

  function updateSkills() {
    allSkills.forEach(skill => {
      const cost = typeof skill.apCost === 'function'
        ? DamageCalc.resolveFunction(skill.apCost, selectedMods.value, skill)
        : skill.apCost;

      skill.calculatedCost = cost
      skill.favorite = settings.favoriteSkills.includes(skill.name);
    });
  }

  function updateWeapons() {
    allWeapons.forEach(weapon => {
      weapon.favorite = settings.favoriteWeapons.includes(weapon.name);
    });
  }

  function loadSelections(character) {
    clearSelections();

    for (const mod of selections.value[character]) {
      if (mod.type == 'weapon') {
        let weapon = weapons.value.find(x => x.name == mod.name);
        if (weapon) {
          weapon.selected = true;
        }
      }
      else if (mod.type == 'gimmick') {
        if (gimmick.value.type == 'comboBox') {
          gimmick.value.selected = gimmick.value.options.find(x => x.name == mod.name);
        }
        else if (gimmick.value.type == 'counts') {
          gimmick.value.counts[mod.name] = mod.count;
        }
      }
      else if (mod.type == 'attackPower') {
        baseAttackPower.value = mod.count;
      }
      else if (mod.type == 'crit') {
        baseCrit.value = mod.count;
      }
      else if (mod.type == 'element') {
        weaknesses.value[mod.name] = mod.selected;
      }

      let modData = modByName(mod.name);
      if (modData) {
        modData.selected = mod.selected;
        modData.count = mod.count;
      }
    }
  }

  function saveSelections(mods) {
    let storage = [];

    for (const mod of mods) {
      storage.push({
        name: mod.name,
        type: mod.type,
        count: mod.count,
        selected: mod.selected,
      });
    }

    for (const element of elements) {
      if (!weaknesses.value[element]) {
        continue;
      }

      storage.push({
        name: element,
        selected: weaknesses.value[element],
        type: 'element',
      });
    }

    storage.push({
      name: 'Attack Power',
      count: baseAttackPower.value,
      type: 'attackPower',
    });

    storage.push({
      name: 'Crit',
      count: baseCrit.value,
      type: 'crit',
    });

    selections.value[character.value.name] = storage;
    saveSelectionsToStorage();
    savedCharacter = character.value.name;

    updateLuminas();
    updateSkills();
    updateWeapons();
  }

  function clearSelections() {
    for (const mod of selectedMods.value) {
      delete mod['selected'];
      delete mod['counts'];

      if (mod.type == 'weapon') {
        let weapon = weapons.value.find(x => x.name == mod.name);
        if (weapon) {
          weapon.selected = false;
        }
      }

      initMod(mod);
    }

    initWeaknesses();

    baseAttackPower.value = defaultAttackPower;
    baseCrit.value = defaultCrit;
  }

  function initMod(mod) {
    if (mod.type == 'boolean') {
      mod.selected = false;
    }
    else if (mod.type == 'count') {
      mod.count = mod.default ?? 0;
    }
    else if (mod.type == 'comboBox') {
      mod.selected = mod.options[0];
    }
    else {
      mod.selected = false;
    }
  }

  function initGimmicks() {
    for (const gimmick of gimmicks) {
      if (gimmick.type == 'comboBox') {
        gimmick.selected = gimmick.options[0];
      }
      else if (gimmick.type == 'counts') {
        gimmick.counts = {};
        for (const option of gimmick.options) {
          gimmick.counts[option] = 0;
        }
      }
    }
  }

  function saveSelectionsToStorage() {
    const all = getAllFromStorage();

    if (!all.presets) {
      all.presets = {};
    }

    all.presets[activePreset.value] = selections.value;

    localStorage.setItem('selections', JSON.stringify(all));
  }

  function loadSelectionsFromStorage() {
    const all = getAllFromStorage();
    if (all) {
      if (all.presets) {
        selections.value = all.presets[activePreset.value];

        if (!selections.value) {
          initStorage();
        }
      }
      else {
        selections.value = all;
      }
    } else {
      initStorage();
    }
  }

  function getAllFromStorage() {
    const storedSelections = localStorage.getItem('selections');
    if (storedSelections) {
      return JSON.parse(storedSelections);
    }

    return null;
  }

  function initStorage() {
    selections.value = {};

    for (const character of allCharacters) {
      selections.value[character.name] = [];
    }
  }

  function initWeaknesses() {
    for (const element of elements) {
      weaknesses.value[element] = 'normal';
    }
  }

  function initPresets() {
    activePresets.value = allCharacters.reduce((acc, char) => {
      acc[char.name] = presets.value[0];
      return acc;
    }, {});

    activePreset.value = activePresets.value[character.value.name];
  }

  initPresets();
  initGimmicks();

  for (const buff of allSelfBuffs.concat(allTargetBuffs)) {
    initMod(buff);
  }

  for (const lumina of allLuminas) {
    initMod(lumina);
  }

  initWeaknesses();

  loadSelectionsFromStorage();
  loadSelections(character.value.name);

  return { character, baseAttackPower, baseCrit, characters, luminas, skills, gimmick,
    weapons, selectedWeapon, selfBuffs, targetBuffs, allMods, selectedMods, selectedLuminas, modByName, resetLuminas,
    resetWeapons, weaknessMod, resolveElement, elementUrl, weaknesses, presets, activePreset };
})
