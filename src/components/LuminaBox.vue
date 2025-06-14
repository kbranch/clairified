<script setup>
import { useSettingsStore } from '@/stores/settings';
import { computed } from 'vue';

const settings = useSettingsStore();

const props = defineProps(['lumina']);
defineEmits(['clicked']);

const favoriteIcon = computed(() => {
  return `/images/star${props.lumina.favorite ? '-fill' : ''}.svg`;
});

</script>

<template>

<div class="box" :class="{ 'active': lumina.selected }" @click="$emit('clicked', lumina)">
  <div class="header">
    <h5>{{ lumina.name }}</h5>
    <div class="header">
      <img :src="favoriteIcon" class="icon-button" @click.stop="settings.toggleFavorite('lumina', lumina)"
        v-tooltip:top="'Favorite'" />
      <span>{{ lumina.cost }}</span>
    </div>
  </div>

  <span>
    {{ lumina.description }}
  </span>
</div>

</template>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box {
  padding: 10px;
  width: 48%;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  margin: 5px;
}

.box:hover {
  background-color: #ffffff18;
  border-color: #ccc;
}

.box.active:hover {
  background-color: #ffffff18;
  border-color: #4d92fa;
}

.active {
  background-color: #ffffff10;
  border-color: var(--color-highlight);
}

</style>