<script setup>
import { useSettingsStore } from '@/stores/settings';
import { computed } from 'vue';

const settings = useSettingsStore();

const ascIcons = {
  'name': 'sort-alpha-down.svg',
  'cost': 'sort-numeric-down.svg',
  'calculatedCost': 'sort-numeric-down.svg',
  'averageDamage': 'sort-down-alt.svg',
  'sortMult': 'sort-down-alt.svg',
  'favorite': 'star-half.svg',
};

const descIcons = {
  'name': 'sort-alpha-up.svg',
  'cost': 'sort-numeric-up.svg',
  'calculatedCost': 'sort-numeric-up.svg',
  'averageDamage': 'sort-up-alt.svg',
  'sortMult': 'sort-up-alt.svg',
  'favorite': 'star-half.svg',
};

const types = {
  lumina: {
    options: [{
      name: 'Name',
      prop: 'name',
    },
    {
      name: 'Cost',
      prop: 'cost',
    },
    {
      name: 'Multiplier',
      prop: 'sortMult',
    },
    {
      name: 'Favorite',
      prop: 'favorite',
    }]
  },
  weapon: {
    options: [{
      name: 'Name',
      prop: 'name',
    },
    {
      name: 'Favorite',
      prop: 'favorite',
    }]
  },
  skill: {
    options: [{
      name: 'Name',
      prop: 'name',
    },
    {
      name: 'Cost',
      prop: 'calculatedCost',
    },
    {
      name: 'Damage',
      prop: 'averageDamage',
    },
    {
      name: 'Favorite',
      prop: 'favorite',
    }]
  },
}

const model = defineModel();
const props = defineProps(['type']);

const selected = computed(() => {
  return types[props.type]?.options.find(x => x.prop === model.value.prop) || types[props.type]?.options[0];
});

const options = computed(() => types[props.type]?.options);

const icon = computed(() => {
  return `/images/${model.value.asc ? ascIcons[model.value.prop] : descIcons[model.value.prop]}`;
});

</script>

<template>

<div class="btn-group">
  <img :src="icon" @click="model.asc = !model.asc" class="icon-button" v-tooltip:top="`Sorting by ${selected.name} (${model.asc ? 'Asc' : 'Desc'})`" />
  <button type="button" class="dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
  </button>
  <ul class="dropdown-menu">
    <li v-for="option in options" :key="option.name" @click="settings.sortBy(type, option.prop)">
      <a class="dropdown-item">{{ option.name }}</a>
    </li>
  </ul>
</div>

</template>

<style scoped>

.dropdown-item {
  color: var(--color-text);
  background-color: var(--color-background-soft);
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-menu {
  background-color: var(--color-background-soft);
}

.icon-button {
  margin-right: 0px;
}

.dropdown-toggle {
  height: 32px;
  padding: 6px;
  margin-left: 0px;
  margin-right: 6px;
}

.dropdown-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

</style>