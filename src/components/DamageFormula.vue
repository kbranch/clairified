<script setup>
import { DamageCalc } from '@/damageCalc';
import { sum } from '@/main';
import { useLoadoutStore } from '@/stores/loadout';
import { computed } from 'vue';

const loadout = useLoadoutStore();

const props = defineProps(['skill', 'type']);

function base(hit) {
  let tempMods = rawMods.value.filter(x => x.name !== 'Critical Hit' && !x.hitDuration);
  return baseCalc.value.hitDamage(null, props.skill ? tempMods : [], [], additiveMods(hit).length == 0);
}

const rawMods = computed(() => {
  let list = [...loadout.selectedMods];

  if (props.type == 'crit') {
    list.push(loadout.allMods.find(x => x.name == 'Critical Hit'));
  }

  return list;
});

const totalMods = computed(() => rawMods.value.filter(x => props.skill || !x.hitDuration));

function mods(hit, i) {
  let raw = [... totalMods.value];

  if (hit?.element) {
    raw.push(loadout.weaknessMod(DamageCalc.getElement(hit.element, rawMods.value, props.skill)));
  }

  const previousHits = sum(hits.value.slice(0, i), 'count');

  let list = raw
    .filter(x => {
      return modDifferentWithSkill(x, hit)
        && (!x.hitDuration
            || x.duration > previousHits
            || (hit.leaves ?? []).includes(x.name));
    })
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
  return DamageCalc.getHits(calc.value.skill, calc.value.mods);
});

const underline = computed(() => props.skill ? 'none' : 'underline');

function hitMult(hit) {
  return calc.value.getHitMultiplier(hit);
}

function hitCount(hit) {
  return DamageCalc.hitCount(hit, calc.value.mods, calc.value.skill);
}

function modDifferentWithSkill(mod, hit, multName = 'multiplier') {
  return !props.skill
    || ['skill', 'Critical Hit'].includes(mod.name)
    || mod.type == 'weakness'
    || mod.hitDuration
    || DamageCalc.getMultiplier(mod[multName] ?? 1, rawMods.value) !== DamageCalc.getMultiplier(mod[multName] ?? 1, rawMods.value, hit)
}

function showHits(hit) {
  return hit.count !== 1;
}

</script>

<template>

<template v-if="type == 'average'">
 <span>
    <div>
      Average damage:
    </div>

    ({{ critCalc.skillDamage().toLocaleString() }}
    *
    {{ critCalc.skillCrit().toLocaleString() }}% crit chance)
    +
    ({{ critlessCalc.skillDamage().toLocaleString() }}
    *
    {{ 100 - critlessCalc.skillCrit().toLocaleString() }}% hit chance)
    =
    <span class="total">
      {{ calc.skillAverageDamage().toLocaleString() }}
    </span>
 </span> 
</template>

<template v-else>
  <span v-if="!skill">
    Base formula:
  </span>
  <span v-else-if="type == 'crit'">
    Critical hit:
  </span>
  <span v-else>
    Normal hit:
  </span>
  <div v-for="(hit, i) in hits" :key="hit">
    <span>
      {{ base(hit).toLocaleString() }}
    </span>

    <template v-for="mod in mods(hit, i)" :key="mod">
      * 
      <span class="multiplier">
        {{ (Math.round(mod.mult * 100) / 100).toLocaleString() }}
        <v-tooltip v-if="!skill" activator="parent" location="top">
          {{ mod.name }}
        </v-tooltip>
        <span v-else>({{ mod.name }})</span>
      </span>
    </template>

    <span v-if="hitMult(hit) !== 1">
      * {{ hitMult(hit).toLocaleString() }} (skill)
    </span>

    <template v-if="additiveMods(hit).length > 0">
      <span>
        * (1 + 
      </span>

      <template v-for="(mod, i) in additiveMods(hit)" :key="mod">
        {{ i > 0 ? ' + ' : '' }}
        <span class="multiplier">
          {{ (Math.round(mod.mult * 100) / 100).toLocaleString() }}
          <v-tooltip v-if="!skill" activator="parent" location="top">
            {{ mod.name }}
          </v-tooltip>
        </span>
        <template v-if="mod.name == 'skill'">
          (skill)
        </template>
      </template>

      <span class="end-paren">
        )
      </span>
    </template>

    <template v-if="skill && calc.getSkillQteMultiplier() !== 1">
      *
      <span class="multiplier">
        {{ calc.getSkillQteMultiplier().toLocaleString() }} (QTE)
      </span>
    </template>

    <span v-if="showHits(hit)">
     = {{ (calc.hitDamage(hit, totalMods, [calc.getSkillQteMultiplier()]) / hitCount(hit)).toLocaleString() }} per hit * {{ hitCount(hit).toLocaleString() }} hits
    </span>

    <span>
      = 
      <span class="hit-total">
        {{ calc.hitDamage(hit, totalMods, [calc.getSkillQteMultiplier()]).toLocaleString() }}
      </span>
    </span>
    <img :src="loadout.elementUrl(DamageCalc.getElement(hit.element, rawMods, props.skill) ?? 'weapon')" class="element-icon" />
  </div>
  <div v-if="hits.length > 1 && type !== 'average'">
    <span>Total: </span>
    <span class="total">{{ calc.skillDamage().toLocaleString() }}</span>
  </div>
</template>

</template>

<style scoped>

.wrapper {
  display: flex;
  align-items: center;
}

.hit-total {
  font-weight: bold;
}

.total {
  font-weight: bold;
}

.end-paren {
  margin-left: -3px;
}

.element-icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
}

.multiplier {
  text-decoration-line: v-bind(underline);
  cursor: default;
}

</style>