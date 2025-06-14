<script setup>
import { computed } from 'vue';

const props = defineProps(['buffs']);

const groupedBuffs = computed(() => {
  const buckets = [];
  let bucket = [];

  for (const buff of props.buffs) {
    if ((bucket.length == 0
         || (bucket[0].type == buff.type
             && buff.type == 'boolean'))
        && bucket.length < 2) {

      bucket.push(buff);
    }
    else {
      buckets.push(bucket);
      bucket = [buff];
    }
  }

  if (bucket.length > 0) {
    buckets.push(bucket);
  }

  return buckets;
});

</script>

<template>

<div class="me-2 buff-group" v-for="group in groupedBuffs" :key="group[0].name">
  <template v-for="buff in group" :key="buff.name">

    <template v-if="buff.type == 'boolean'">
      <div v-if="buff.iconOnly">
        <img v-if="buff.icon" :src="`/images/${buff.icon}`" class="bright-icon-button mb-2" v-tooltip:top="buff.name"
          :class="[{ 'active': buff.selected }]" @click="buff.selected = !buff.selected" />
      </div>
      <div v-else>
        <input class="form-check-input ms-2 mb-2" type="checkbox" :id="buff.name" v-model="buff.selected">
        <label :for="buff.name" class="mx-2 mb-2">
          <img v-if="buff.icon" :src="`/images/${buff.icon}`" class="icon" v-tooltip:top="buff.name" />
          <template v-if="!buff.iconOnly">
            {{ buff.name }}
          </template>
        </label>
      </div>
    </template>

    <template v-else-if="buff.type == 'count'">
      <label :for="buff.name" class="mx-2">
        <img v-if="buff.icon" :src="`/images/${buff.icon}`" class="icon" v-tooltip:top="buff.name" />
        <template v-if="!buff.iconOnly">
          {{ buff.name }}
        </template>
      </label>
      <input type="number" :id="buff.name" v-model="buff.count" class="form-control small-number mb-2" value="0" :min="buff.min ?? 0" :max="buff.max ?? 999">
    </template>

    <template v-else-if="buff.type == 'comboBox'">
      <label :for="buff.name" class="mx-2">{{ buff.name }}</label>
      <select :id="buff.name" v-model="buff.selected" class="form-select mb-2">
        <option v-for="option in buff.options" :key="option.name" :value="option">{{ option.name }}</option>
      </select>
    </template>

  </template>
</div>

</template>

<style scoped>

.bright-icon-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.icon {
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.bright-icon-button {
  height: 32px;
  width: 32px;
  padding: 6px;
  margin-left: 6px;
  margin-right: 6px;
  cursor: pointer;
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  border-color: var(--color-border);
}

.bright-icon-button.active {
  background-color: var(--color-background-mute);
  border-color: var(--color-highlight);
}
</style>