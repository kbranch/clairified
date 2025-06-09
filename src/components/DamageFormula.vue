<script setup>
import { DamageCalc } from '@/damageCalc';
import { useLoadoutStore } from '@/stores/loadout';
import { computed } from 'vue';

const loadout = useLoadoutStore();

const props = defineProps(['skill', 'type']);

function base(hit) {
  return baseCalc.value.hitDamage(null, props.skill ? rawMods.value : [], [], additiveMods(hit).length == 0);
}

const rawMods = computed(() => {
  let list = [...loadout.selectedMods];

  if (props.type == 'crit') {
    list.push(loadout.allMods.find(x => x.name == 'Critical Hit'));
  }

  return list;
});

function mods(hit) {
  let list = rawMods.value
    .filter(x => modDifferentWithSkill(x, hit))
    .map(x => ({
        name: x.name ?? x,
        mod: x,
        mult: DamageCalc.getMultiplier(x, rawMods.value, hit),
    }))
    .filter(x => x.mult !== 1);

  return list
}

function additiveMods(hit) {
  let combined = rawMods.value.filter(x => x.additiveMultiplier);

  if (hit.additiveMultiplier) {
    combined = combined.concat([{
      name: 'skill',
      additiveMultiplier: hit.additiveMultiplier,
    }]);
  }

  const newMods = combined
    .filter(x => modDifferentWithSkill(x, hit, 'additiveMultiplier'))
    .map(x => ({
        name: x.name ?? x,
        mod: x,
        mult: DamageCalc.getMultiplier(x.additiveMultiplier, rawMods.value, hit),
    }))
    .filter(x => x.mult !== 0)

  if(newMods.length > 0) {
    return combined
      .map(x => ({
          name: x.name ?? x,
          mod: x,
          mult: DamageCalc.getMultiplier(x.additiveMultiplier, rawMods.value, hit),
      }))
      .filter(x => x.mult !== 0)
  }

  return [];
}

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
  return new DamageCalc(null, rawMods.value, loadout);
});

const hits = computed(() => {
  return props.skill?.hits ?? [DamageCalc.defaultHit];
});

function hitMult(hit) {
  return calc.value.getHitMultiplier(hit);
}

function modDifferentWithSkill(mod, hit, multName = 'multiplier') {
  return !props.skill
    || ['skill', 'Critical Hit'].includes(mod.name)
    || DamageCalc.getMultiplier(mod[multName] ?? 1, rawMods.value) !== DamageCalc.getMultiplier(mod[multName] ?? 1, rawMods.value, hit)
}

function showHits(hit) {
  return hit.count !== 1;
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
  <div v-for="hit in hits" :key="hit">
    <span v-if="!props.skill">
      Base formula:
    </span>

    <span>
      {{ base(hit).toLocaleString() }}
    </span>

    <span v-for="mod in mods(hit)" :key="mod">
      * {{ (Math.round(mod.mult * 100) / 100).toLocaleString() }}
      <v-tooltip v-if="!skill" activator="parent" location="top">
        {{ mod.name }}
      </v-tooltip>
    </span>

    <span v-if="hitMult(hit) !== 1">
      * {{ hitMult(hit).toLocaleString() }} (skill)
    </span>

    <template v-if="additiveMods(hit).length > 0">
      <span>
        * (1 + 
      </span>

      <span v-for="(mod, i) in additiveMods(hit)" :key="mod">
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

    <span v-if="showHits(hit)">
      * {{ hit.count.toLocaleString() }} hits
    </span>

    <span>
      = {{ calc.hitDamage(hit, rawMods, [calc.getSkillQteMultiplier()]).toLocaleString() }}
    </span>
  </div>
</template>

</template>

<style scoped>

.end-paren {
  margin-left: -4px;
}

</style>