import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { sortByKey } from '@/main';
import { characters as allCharacters, spoilerLevels, gimmicks } from '@/consts.js';
import { skills as allSkills } from '@/skills.js';
import { luminas as allLuminas } from '@/luminas.js';
import { weapons as allWeapons } from '@/weapons.js';
import { targetBuffs as allTargetBuffs, selfBuffs as allSelfBuffs } from '@/buffs.js';

export const useLoadoutStore = defineStore('loadout', () => {
  const defaultAttackPower = 1000;
  const defaultCrit = 25;

  const character = ref(allCharacters[0]);
  const spoilerLevel = ref(spoilerLevels[4]);
  const baseAttackPower = ref(defaultAttackPower);
  const baseCrit = ref(defaultCrit);
  const capDamage = ref(true);

  const selections = ref([]);

  const characters = computed(() => allCharacters.filter(x => (x.spoilerLevel ?? 0) <= spoilerLevel.value.level));

  const luminas = computed(() => {
    return allLuminas.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= spoilerLevel.value.level);
  });

  const skills = computed(() => {
    return allSkills.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= spoilerLevel.value.level);
  });

  const gimmick = computed (() => {
    return gimmicks.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= spoilerLevel.value.level)[0];
  });

  const weapons = computed(() => {
    return allWeapons.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= spoilerLevel.value.level);
  });

  const selfBuffs = computed(() => {
    return sortByKey(allSelfBuffs.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= spoilerLevel.value.level), x => [x.type, x.name]);
  });

  const targetBuffs = computed(() => {
    return sortByKey(allTargetBuffs.filter(x => (x.character ?? character.value.name) == character.value.name
      && (x.spoilerLevel ?? 0) <= spoilerLevel.value.level), x => [x.type, x.name]);
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
    else if (gimmick.value?.type == 'counts') {
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
        type: 'weapon',
      });

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
      for (const level of weapon.levels) {
        level.selected = false;
      }
    }
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

  watch(character, (value) => {
    if (selections.value[value.name]) {
      loadSelections(value.name);
    }
  });

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

  function saveSelectionsToStorage() {
    localStorage.setItem('selections', JSON.stringify(selections.value));
  }

  function loadSelectionsFromStorage() {
    const storedSelections = localStorage.getItem('selections');
    if (storedSelections) {
      selections.value = JSON.parse(storedSelections);
    } else {
      initStorage();
    }
  }

  function initStorage() {
    selections.value = {};

    for (const character of allCharacters) {
      selections.value[character.name] = [];
    }
  }

  for (const buff of allSelfBuffs.concat(allTargetBuffs)) {
    initMod(buff);
  }

  for (const lumina of allLuminas) {
    initMod(lumina);
  }

  loadSelectionsFromStorage();
  loadSelections(character.value.name);

  return { character, spoilerLevel, baseAttackPower, baseCrit, capDamage, characters, luminas, skills, gimmick,
    weapons, selfBuffs, targetBuffs, allMods, selectedMods, modByName, resetLuminas, resetWeapons };
})
