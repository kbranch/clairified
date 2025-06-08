<script setup>
import { DamageCalc } from '@/damageCalc';
import { useLoadoutStore } from '@/stores/loadout';
import { computed } from 'vue';

const loadout = useLoadoutStore();

const props = defineProps(['skill', 'type']);

const base = computed(() => {
  return props.skill ? baseCalc.value.skillDamage([], false) : loadout.baseAttackPower;
});

const mods = computed(() => {
  return loadout.selectedMods
    .filter(x => modDifferentWithSkill(x))
    .map(x => ({
        name: x.name ?? x,
        mod: x,
        mult: DamageCalc.getMultiplier(x, loadout.selectedMods, props.skill),
    }))
    .filter(x => x.mult !== 1);
});

const additiveMods = computed(() => {
  const newMods = loadout.selectedMods
    .filter(x => x.additiveMultiplier
      && modDifferentWithSkill(x, 'additiveMultiplier'))
    .map(x => ({
        name: x.name ?? x,
        mod: x,
        mult: DamageCalc.getMultiplier(x.additiveMultiplier, loadout.selectedMods, props.skill),
    }))
    .filter(x => x.mult !== 0)

  return newMods ? loadout.selectedMods
    .filter(x => x.additiveMultiplier)
    .map(x => ({
        name: x.name ?? x,
        mod: x,
        mult: DamageCalc.getMultiplier(x.additiveMultiplier, loadout.selectedMods, props.skill),
    }))
    .filter(x => x.mult !== 0) : [] ;
});

const calc = computed(() => {
  return new DamageCalc(props.skill, loadout.selectedMods, loadout);
});

const baseCalc = computed(() => {
  const fakeSkill = {
    name: '',
    hits: 1,
    multiplier: 1,
  };

  return new DamageCalc(fakeSkill, loadout.selectedMods, loadout);
});

const skillMult = computed(() => {
  return props.skill ? calc.value.getSkillMultiplier() : 1;
});

function modDifferentWithSkill(mod, multName = 'multiplier') {
  return !props.skill
    || DamageCalc.getMultiplier(mod[multName] ?? 1, loadout.selectedMods) !== DamageCalc.getMultiplier(mod[multName] ?? 1, loadout.selectedMods, props.skill)
}

</script>

<template>

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

<style scoped>

.end-paren {
  margin-left: -4px;
}

</style>