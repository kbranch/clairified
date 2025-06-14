<script setup>
import { upperFirst } from '@/main';
import { useLoadoutStore } from '@/stores/loadout';
import { useSettingsStore } from '@/stores/settings';
import { computed } from 'vue';

const loadout = useLoadoutStore();
const settings = useSettingsStore();

const props = defineProps(['weapon']);
defineEmits(['clicked', 'levelClicked']);

const favoriteIcon = computed(() => {
  return `/images/star${props.weapon.favorite ? '-fill' : ''}.svg`;
});

</script>

<template>

<div class="box" :class="{ 'active': weapon.selected }" @click="$emit('clicked', weapon)">
  <div class="header">
    <h5>{{ weapon.name }}</h5>
    <div>
      <img :src="favoriteIcon" class="icon-button" @click.stop="settings.toggleFavorite('weapon', weapon)"
        v-tooltip:top="'Favorite'" />

      <img :src="loadout.elementUrl(weapon.element)" class="element-icon"
        v-tooltip:top="upperFirst(loadout.resolveElement(weapon.element))" />
    </div>
  </div>

  <div class="levels">
    <div v-for="level in weapon.levels" :key="level.level" class="level" :class="{ 'active': level.selected }"
      @click="$emit('levelClicked', level)">

      <span :class="`level-${level.level}`">
        {{ level.level }}
      </span>
      <span>
        {{ level.description }}
      </span>
    </div>
  </div>
</div>

</template>

<style scoped>

.element-icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level {
  padding: 5px;
  margin: 4px;
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  border-color: #0000;
}

.level:hover {
  background-color: #ffffff0a;
  border-color: #ffffff40;
}

.level.active:hover {
  background-color: #ffffff0a;
  border-color: #4d92fa;
}

.level-4 {
  font-weight: bold;
  color: #a7c8ff;
  padding-right: 8px;
}

.level-10 {
  font-weight: bold;
  color: #8771b2;
  padding-right: 8px;
}

.level-20 {
  font-weight: bold;
  color: #b2a38e;
  padding-right: 8px;
}

.box {
  padding: 10px;
  width: 100%;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  margin: 5px;
}

.box:hover:not(:has(.levels:hover)) {
  background-color: #ffffff18;
  border-color: #ffffff40;
}

.box.active:hover:not(:has(.levels:hover)) {
  background-color: #ffffff18;
  border-color: #4d92fa;
}

.box.active {
  background-color: #ffffff10;
  border-color: #0d6efd;
  border-style: solid;
  border-width: 2px;
}

.level.active {
  background-color: #ffffff08;
  border-color: #0d6efd;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
}

</style>