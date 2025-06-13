<script setup>
import { useLoadoutStore } from '@/stores/loadout';

defineProps(['element']);

const loadout = useLoadoutStore();

</script>

<template>

<div class="py-1">
  <img :src="loadout.elementUrl(element ?? 'weapon')" class="element-icon" />

  <input type="radio" class="btn-check" :name="`${element}-weakness`" :id="`${element}-weak`" autocomplete="off"
    value="weak" v-model="loadout.weaknesses[element]">
  <label class="btn" :for="`${element}-weak`" v-tooltip:top="`Weak to ${element}`">W</label>

  <input type="radio" class="btn-check" :name="`${element}-weakness`" :id="`${element}-normal`" autocomplete="off"
    value="normal" v-model="loadout.weaknesses[element]">
  <label class="btn" :for="`${element}-normal`" v-tooltip:top="`Normal ${element} damage`">N</label>

  <input type="radio" class="btn-check" :name="`${element}-weakness`" :id="`${element}-resist`" autocomplete="off"
    value="resist" v-model="loadout.weaknesses[element]">
  <label class="btn" :for="`${element}-resist`" v-tooltip:top="`Resistant to ${element}`">R</label>

  <input type="radio" class="btn-check" :name="`${element}-weakness`" :id="`${element}-immune`" autocomplete="off"
    value="immune" v-model="loadout.weaknesses[element]">
  <label class="btn" :for="`${element}-immune`" v-tooltip:top="`Immune to ${element}`">I</label>

  <input type="radio" class="btn-check" :name="`${element}-weakness`" :id="`${element}-absorb`" autocomplete="off"
    value="absorb" v-model="loadout.weaknesses[element]">
  <label class="btn" :for="`${element}-absorb`" v-tooltip:top="`Absorbs ${element}`">A</label>
</div>

</template>

<style scoped>

.element-icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
}

.btn {
  color: unset;
}

.btn:hover {
  color: white;
}

.btn-check:checked + .btn {
  border-color: var(--color-highlight);
}

</style>