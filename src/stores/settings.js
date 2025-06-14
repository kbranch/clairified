import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { spoilerLevels } from '@/data/consts.js';

export const useSettingsStore = defineStore('settings', () => {
  const damageCap = ref(9999);
  const spoilerLevel = ref(spoilerLevels[0]);
  const luminaSort = ref(null)
  const weaponSort = ref(null);
  const skillSort = ref(null);
  const favoriteWeapons = ref([]);
  const favoriteSkills = ref([]);
  const favoriteLuminas = ref([]);
  const filterFavoriteWeapons = ref(false);
  const filterFavoriteSkills = ref(false);
  const filterFavoriteLuminas = ref(false);
  const firstLoad = ref(true);

  const sortTypes = {
    lumina: luminaSort,
    weapon: weaponSort,
    skill: skillSort,
  };
  const favoriteTypes = {
    weapon: favoriteWeapons,
    skill: favoriteSkills,
    lumina: favoriteLuminas,
  }

  const allSettings = computed(() => {
    return {
      damageCap: damageCap.value,
      spoilerLevel: spoilerLevel.value,
      luminaSort: luminaSort.value,
      weaponSort: weaponSort.value,
      skillSort: skillSort.value,
      favoriteWeapons: favoriteWeapons.value,
      favoriteSkills: favoriteSkills.value,
      favoriteLuminas: favoriteLuminas.value,
      filterFavoriteWeapons: filterFavoriteWeapons.value,
      filterFavoriteSkills: filterFavoriteSkills.value,
      filterFavoriteLuminas: filterFavoriteLuminas.value,
      firstLoad: firstLoad.value,
    };
  });

  function sortBy(type, prop) {
    const sort = sortTypes[type];
    const item = sort.value.find(x => x.prop === prop);

    if (item) {
      sort.value = sort.value.filter(x => x !== item);
      sort.value.unshift(item)
    }
    else {
      sort.value.unshift({ prop, asc: true });
    }
  }

  function toggleFavorite(type, item) {
    const favorite = favoriteTypes[type];

    if (favorite.value.includes(item.name)) {
      favorite.value = favorite.value.filter(x => x !== item.name);
    } 
    else {
      favorite.value.push(item.name);
    }
  }

  watch(() => allSettings.value, (newSettings) => {
    localStorage.setItem('settings', JSON.stringify(newSettings));
  }, { deep: true });

  function loadSettings() {
    const savedSettings = localStorage.getItem('settings');

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      damageCap.value = settings.damageCap ?? 9999;
      spoilerLevel.value = settings.spoilerLevel ?? spoilerLevels[0];
      luminaSort.value = settings.luminaSort;
      weaponSort.value = settings.weaponSort;
      skillSort.value = settings.skillSort;
      favoriteWeapons.value = settings.favoriteWeapons ?? [];
      favoriteSkills.value = settings.favoriteSkills ?? [];
      favoriteLuminas.value = settings.favoriteLuminas ?? [];
      filterFavoriteWeapons.value = settings.filterFavoriteWeapons ?? false;
      filterFavoriteSkills.value = settings.filterFavoriteSkills ?? false;
      filterFavoriteLuminas.value = settings.filterFavoriteLuminas ?? false;
      firstLoad.value = settings.firstLoad ?? true;
    }

    if (!Array.isArray(luminaSort.value)) {
      luminaSort.value = [{ prop: 'name', asc: true }];
    }

    if (!Array.isArray(weaponSort.value)) {
      weaponSort.value = [{ prop: 'name', asc: true }];
    }

    if (!Array.isArray(skillSort.value)) {
      skillSort.value = [{ prop: 'name', asc: true }];
    }
  }

  loadSettings();

  return {
    damageCap, spoilerLevel, luminaSort, weaponSort, skillSort, favoriteWeapons, favoriteSkills, favoriteLuminas,
    filterFavoriteLuminas, filterFavoriteSkills, filterFavoriteWeapons, firstLoad, sortBy, toggleFavorite,
  };
});