<script setup>
import { DamageCalc } from '@/damageCalc';
import { useLoadoutStore } from '@/stores/loadout';
import { computed } from 'vue';

const loadout = useLoadoutStore();

const props = defineProps(['skill', 'type']);

const base = computed(() => {
  return props.skill ? baseCalc.value.skillDamage([], additiveMods.value.length == 0) : loadout.baseAttackPower;
});

const rawMods = computed(() => {
  let list = [...loadout.selectedMods];

  if (props.type == 'crit') {
    list.push(loadout.allMods.find(x => x.name == 'Critical Hit'));
  }

  return list;
});

const mods = computed(() => {
  let list = rawMods.value
    .filter(x => modDifferentWithSkill(x))
    .map(x => ({
        name: x.name ?? x,
        mod: x,
        mult: DamageCalc.getMultiplier(x, rawMods.value, props.skill),
    }))
    .filter(x => x.mult !== 1);

  return list
});

const additiveMods = computed(() => {
  let combined = rawMods.value.filter(x => x.additiveMultiplier);

  if (props.skill?.additiveMultiplier) {
    combined = combined.concat([{
      name: 'skill',
      additiveMultiplier: props.skill.additiveMultiplier,
    }]);
  }

  const newMods = combined
    .filter(x => modDifferentWithSkill(x, 'additiveMultiplier'))
    .map(x => ({
        name: x.name ?? x,
        mod: x,
        mult: DamageCalc.getMultiplier(x.additiveMultiplier, rawMods.value, props.skill),
    }))
    .filter(x => x.mult !== 0)

  if(newMods.length > 0) {
    return combined
      .map(x => ({
          name: x.name ?? x,
          mod: x,
          mult: DamageCalc.getMultiplier(x.additiveMultiplier, rawMods.value, props.skill),
      }))
      .filter(x => x.mult !== 0)
  }

  return [];
});

const calc = computed(() => {
  return new DamageCalc(props.skill, rawMods.value, loadout);
});

const critlessCalc = computed(() => {
  let modList = rawMods.value.filter(x => x.name !== 'Critical Hit');
  return new DamageCalc(props.skill, modList, loadout);
});

const critCalc = computed(() => {
  let modList = rawMods.value;

  if (!modList.some(x => x.name === 'Critical Hit')) {
    modList = modList.concat(loadout.allMods.find(x => x.name === 'Critical Hit'));
  }

  return new DamageCalc(props.skill, modList, loadout);
});

const baseCalc = computed(() => {
  const fakeSkill = {
    name: '',
    hits: 1,
    multiplier: 1,
  };

  return new DamageCalc(fakeSkill, rawMods.value, loadout);
});

const skillMult = computed(() => {
  return props.skill ? calc.value.getSkillMultiplier() : 1;
});

function modDifferentWithSkill(mod, multName = 'multiplier') {
  return !props.skill
    || ['skill', 'Critical Hit'].includes(mod.name)
    || DamageCalc.getMultiplier(mod[multName] ?? 1, rawMods.value) !== DamageCalc.getMultiplier(mod[multName] ?? 1, rawMods.value, props.skill)
}

</script>

<template>

<template v-if="type == 'average'">
 <span>
    ({{ critlessCalc.skillDamage().toLocaleString() }}
    *
    {{ 100 - critlessCalc.skillCrit().toLocaleString() }}%)
    +
    ({{ critCalc.skillDamage().toLocaleString() }}
    *
    {{ critCalc.skillCrit().toLocaleString() }}%)
    =
    {{ calc.skillAverageDamage().toLocaleString() }}
 </span> 
</template>

<template v-else>
  <span>
    {{ base.toLocaleString() }}
  </span>

  <span v-for="mod in mods" :key="mod">
    * {{ (Math.round(mod.mult * 100) / 100).toLocaleString() }}
    <v-tooltip v-if="!skill" activator="parent" location="top">
      {{ mod.name }}
    </v-tooltip>
  </span>

  <span v-if="skillMult && skillMult !== 1">
    * {{ skillMult.toLocaleString() }} (skill)
  </span>

  <template v-if="additiveMods.length > 0">
    <span>
      * (1 + 
    </span>

    <span v-for="(mod, i) in additiveMods" :key="mod">
      {{ i > 0 ? ' + ' : '' }}
      {{ (Math.round(mod.mult * 100) / 100).toLocaleString() }}
      <template v-if="mod.name == 'skill'">
        (skill)
      </template>
    <v-tooltip v-if="!skill" activator="parent" location="top">
      {{ mod.name }}
    </v-tooltip>
    </span>

    <span class="end-paren">
      )
    </span>
  </template>

  <span v-if="skill && calc.getSkillQteMultiplier() !== 1">
    * {{ calc.getSkillQteMultiplier().toLocaleString() }} (QTE)
  </span>

  <span v-if="skill && skill.hits !== 1">
    * {{ skill.hits.toLocaleString() }} hits
  </span>

  <span>
    = {{ calc.skillDamage().toLocaleString() }}
  </span>

</template>

</template>

<style scoped>

.end-paren {
  margin-left: -4px;
}

</style>