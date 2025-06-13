import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { spoilerLevels } from '@/consts.js';

export const useSettingsStore = defineStore('settings', () => {
  const capDamage = ref(true);
  const spoilerLevel = ref(spoilerLevels[0]);

  const allSettings = computed(() => {
    return {
      capDamage: capDamage.value,
      spoilerLevel: spoilerLevel.value,
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
    }
  }

  loadSettings();

  return {
    capDamage, spoilerLevel,
  };
});