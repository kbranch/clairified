<script setup>
import { computed } from 'vue';
import { useLoadoutStore } from '@/stores/loadout';
import DamageFormula from './DamageFormula.vue';
import { DamageCalc } from '@/damageCalc';

const props = defineProps(['skill']);
const loadout = useLoadoutStore();

const cost = computed(() => {
  const mods = loadout.selectedMods;
  mods.byName = (name) => mods.find(mod => mod.name === name);
  return typeof props.skill.apCost === 'function' ? props.skill.apCost(mods) : props.skill.apCost;
});

const hits = computed(() => {
  return props.skill.hits ?? 1;
});

const calc = computed (() => {
  return new DamageCalc(props.skill, loadout.selectedMods, loadout);
})

</script>

<template>

<div class="box">
  <div class="header">
    <h5>{{ skill.name }}</h5>
    <div>
      <span>
        {{ hits }} {{ hits === 1 ? 'hit' : 'hits' }}
      </span>
      <span class="ps-2">
        {{ cost }} AP
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
  margin: 5px;
}

</style>