<script setup>
import { useLoadoutStore } from '@/stores/loadout';

const loadout = useLoadoutStore();

</script>

<template>

  <template v-for="preset in loadout.presets" :key="preset">
    <input  type="radio" class="btn-check" :name="`preset-${preset}`"
      :id="`preset-${preset}`" autocomplete="off" :value="preset" v-model="loadout.activePreset">
    <label class="btn" :for="`preset-${preset}`" v-tooltip:top="`Preset ${preset}`">{{ preset }}</label>
  </template>

</template>

<style scoped>

.btn {
  color: unset;
}

.btn:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-check:checked + .btn {
  border-color: var(--color-highlight);
  background-color: var(--color-background-mute);
}

</style>