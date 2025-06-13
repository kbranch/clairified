import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { spoilerLevels } from '@/consts.js';

export const useSettingsStore = defineStore('settings', () => {
  const capDamage = ref(true);
  const spoilerLevel = ref(spoilerLevels[0]);
  const luminaSort = ref({})
  const weaponSort = ref({});
  const skillSort = ref({});
  const favoriteWeapons = ref([]);
  const favoriteSkills = ref([]);
  const favoriteLuminas = ref([]);

  const allSettings = computed(() => {
    return {
      capDamage: capDamage.value,
      spoilerLevel: spoilerLevel.value,
      luminaSort: luminaSort.value,
      weaponSort: weaponSort.value,
      skillSort: skillSort.value,
      favoriteWeapons: favoriteWeapons.value,
      favoriteSkills: favoriteSkills.value,
      favoriteLuminas: favoriteLuminas.value,
    };
  });

  watch(() => allSettings.value, (newSettings) => {
    localStorage.setItem('settings', JSON.stringify(newSettings));
  }, { deep: true });

  function loadSettings() {
    const savedSettings = localStorage.getItem('settings');

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      capDamage.value = settings.capDamage ?? true;
      spoilerLevel.value = settings.spoilerLevel ?? spoilerLevels[0];
      luminaSort.value = settings.luminaSort ?? {prop: 'name', asc: true};
      weaponSort.value = settings.weaponSort ?? {prop: 'name', asc: true};
      skillSort.value = settings.skillSort ?? {prop: 'name', asc: true};
      favoriteWeapons.value = settings.favoriteWeapons ?? [];
      favoriteSkills.value = settings.favoriteSkills ?? [];
      favoriteLuminas.value = settings.favoriteLuminas ?? [];
    }
  }

  loadSettings();

  return {
    capDamage, spoilerLevel, luminaSort, weaponSort, skillSort, favoriteWeapons, favoriteSkills, favoriteLuminas,
  };
});