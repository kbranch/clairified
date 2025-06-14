<script setup>
import { computed } from 'vue';
import { useLoadoutStore } from '@/stores/loadout';
import DamageFormula from './DamageFormula.vue';
import { DamageCalc } from '@/damageCalc';
import { upperFirst } from '@/main';
import { useSettingsStore } from '@/stores/settings';

const props = defineProps(['skill']);
const loadout = useLoadoutStore();
const settings = useSettingsStore();

const hits = computed(() => {
  return DamageCalc.getHits(calc.value.skill, calc.value.mods);
})

const hitCount = computed(() => {
  let hitCount = 0;

  for (const hit of hits.value) {
    hitCount += DamageCalc.hitCount(hit, calc.value.mods, calc.value.skill);
  }

  return hitCount;
});

const calc = computed (() => {
  return new DamageCalc(props.skill, loadout.selectedMods, loadout);
});

const favoriteIcon = computed(() => {
  return `/images/star${props.skill.favorite ? '-fill' : ''}.svg`;
});

</script>

<template>

<div class="box">
  <div class="header">
    <h5>{{ skill.name }}</h5>
    <div class="header">
      <img :src="favoriteIcon" class="icon-button" @click.stop="settings.toggleFavorite('skill', skill)"
        v-tooltip:top="'Favorite'" />

      <span>
        {{ hitCount }} {{ hitCount === 1 ? 'hit' : 'hits' }}
      </span>

      <img v-for="element in [... new Set(hits.map(x => x.element))]" :key="element" :src="loadout.elementUrl(element)"
        class="element-icon" v-tooltip="upperFirst(loadout.resolveElement(element))" />

      <span class="ps-2">
        {{ skill.calculatedCost }} AP
      </span>
    </div>
  </div>

  <span>
    {{ skill.description }}
  </span>

  <div>
    <span class="damage pe-2">
      D {{ calc.skillDamage().toLocaleString() }}
      <v-tooltip activator="parent" location="top">
        <DamageFormula :skill="skill" />
      </v-tooltip>
    </span>
    <span class="critDamage pe-2">
      C {{ calc.skillCritDamage().toLocaleString() }}
      <v-tooltip activator="parent" location="top">
        <DamageFormula :skill="skill" type="crit" />
      </v-tooltip>
    </span>
    <span class="averageDamage">
      A {{ calc.skillAverageDamage().toLocaleString() }}
      <v-tooltip activator="parent" location="top">
        <DamageFormula :skill="skill" type="average" />
      </v-tooltip>
    </span>

  </div>
</div>

</template>

<style scoped>

.element-icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
}

.hidden {
  display: none;
}

.damage {
  color: white;
}

.critDamage {
  color: #baa400;
}

.averageDamage {
  color: #3a47db;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box {
  padding: 10px;
  width: 100%;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>