<script setup>
import { useLoadoutStore } from '@/stores/loadout';
import { computed } from 'vue';
import SkillBox from './SkillBox.vue';
import DamageFormula from './DamageFormula.vue';
import { sortByKey } from '@/main';
import { useSettingsStore } from '@/stores/settings';

const loadout = useLoadoutStore();
const settings = useSettingsStore();

const props = defineProps(['skillFilter'])

const visibleSkills = computed(() => {
  return sortByKey(loadout.skills
      .filter(x => (!props.skillFilter
        || x.name.toLowerCase().includes(props.skillFilter.toLowerCase())
        || x.description?.toLowerCase().includes(props.skillFilter.toLowerCase()))
        && (!settings.filterFavoriteSkills || x.favorite))
    , x => settings.skillSort.map(sort => x[sort.prop]), settings.skillSort[0].asc);
});

</script>

<template>

<div class="d-flex">
  <div>
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