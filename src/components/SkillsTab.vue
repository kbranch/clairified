<script setup>
import { useLoadoutStore } from '@/stores/loadout';
import { computed } from 'vue';
import SkillBox from './SkillBox.vue';
import DamageFormula from './DamageFormula.vue';

const loadout = useLoadoutStore();

const props = defineProps(['skillFilter'])

const visibleSkills = computed(() => {
  return loadout.skills
    .filter(x => !props.skillFilter
      || x.name.toLowerCase().includes(props.skillFilter.toLowerCase())
      || x.description?.toLowerCase().includes(props.skillFilter.toLowerCase()));
});

</script>

<template>

<div class="d-flex">
  <div>
    <span>
      Base formula: 
    </span>
    <DamageFormula />
  </div>
  <SkillBox v-for="skill in visibleSkills" :key="skill.name" :skill="skill" />
</div>

</template>

<style scoped>

.d-flex {
  flex-wrap: wrap;
}

</style>