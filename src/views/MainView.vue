<script setup>

import { ref, computed } from 'vue'; 
import LuminaBox from '@/components/LuminaBox.vue';
import WeaponBox from '@/components/WeaponBox.vue';
import SkillBox from '@/components/SkillBox.vue';
import { spoilerLevels } from '@/consts.js';
import { useLoadoutStore } from '@/stores/loadout';
import BuffGroups from '@/components/BuffGroups.vue';
import DamageFormula from '@/components/DamageFormula.vue';
import { sum } from '@/main';

const loadout = useLoadoutStore();

const subTabs = ref(['Luminas', 'Weapons']);
const activeTab = ref('Luminas');

const luminaFilter = ref(null);
const weaponFilter = ref(null);
const skillFilter = ref(null);

const visibleLuminas = computed(() => {
  return loadout.luminas
    .filter(x => !luminaFilter.value
      || x.name.toLowerCase().includes(luminaFilter.value.toLowerCase())
      || x.description.toLowerCase().includes(luminaFilter.value.toLowerCase()));
});

const visibleWeapons = computed(() => {
  return loadout.weapons
    .filter(x => !weaponFilter.value
      || x.name.toLowerCase().includes(weaponFilter.value.toLowerCase())
      || x.levels.some(level => level.description.toLowerCase().includes(weaponFilter.value.toLowerCase())));
});

const visibleSkills = computed(() => {
  return loadout.skills
    .filter(x => !skillFilter.value
      || x.name.toLowerCase().includes(skillFilter.value.toLowerCase())
      || x.description?.toLowerCase().includes(skillFilter.value.toLowerCase()));
});

</script>

<template>

  <div class="row">
    <div class="col d-flex justify-content-start">
      <h1>Clairified</h1>
    </div>

    <div class="col d-flex justify-content-end align-items-center">
      <input class="form-check-input ms-2" type="checkbox" id="capDamage" v-model="loadout.capDamage">
      <label for="capDamage" class="mx-2">Cap Damage</label>

      <label for="spoilerLevel" class="mx-2">Spoiler Level</label>
      <select id="spoilerLevel" v-model="loadout.spoilerLevel" class="form-select">
        <option v-for="level in spoilerLevels" :key="level.name" :value="level">
          {{ level.name }}
        </option>
      </select>
    </div>
  </div>

  <ul class="nav nav-pills">
    <li v-for="character in loadout.characters" :key="character.name" class="nav-item">
      <a class="nav-link" :class="{ 'active': character.name == loadout.character.name }" aria-current="page" href="#"
        @click="loadout.character = character">
        {{ character.name }}
      </a>
    </li>
  </ul>

  <div class="row mt-3">
    <div class="col">
      <h4>Self</h4>
      <div class="buff-container">

        <template v-if="loadout.gimmick?.type == 'comboBox'">
          <div>
            <label for="gimmick" class="me-2">{{ loadout.gimmick.name }}</label>
            <select id="gimmick" v-model="loadout.gimmick.selected" class="form-select me-2 mb-2">
              <option v-for="option in loadout.gimmick.options" :key="option.name" :value="option">{{ option.name }}
              </option>
            </select>
          </div>
        </template>
        <template v-else-if="loadout.gimmick?.type == 'counts'">
          <div v-for="option in loadout.gimmick.options" :key="option" class="me-2">
            <label :for="`gimmick-${option}`">{{ option }}</label>
            <input type="number" :id="`gimmick-${option}`" v-model="loadout.gimmick.counts[option]"
              class="form-control small-number mb-2" value="0" min="0">
          </div>
        </template>

        <div class="me-2">
          <label for="totalAP">Attack Power</label>
          <input type="number" id="totalAP" v-model="loadout.baseAttackPower" class="form-control big-number mb-2" min="0">
        </div>
        <div class="me-2">
          <label for="critChance">Crit %</label>
          <input type="number" id="critChance" v-model="loadout.baseCrit" class="form-control mid-number mb-2" min="0" max="100">
        </div>

        <BuffGroups :buffs="loadout.selfBuffs" />
      </div>

      <h4>Target</h4>
      <div class="buff-container">
        <BuffGroups :buffs="loadout.targetBuffs" />
      </div>

      <div class="tab-header">
        <div class="d-flex align-items-center">
          <ul class="nav nav-pills py-2">
            <li v-for="tab in subTabs" :key="tab" class="nav-item">
              <a class="nav-link" :class="{ 'active': activeTab == tab }" aria-current="page" href="#"
                @click="activeTab = tab">
                {{ tab }}
              </a>
            </li>
          </ul>
          <img v-if="activeTab  == 'Luminas'" class="icon-button" src="@/assets/arrow-counterclockwise.svg"
            v-tooltip="'Reset Luminas'" @click="loadout.resetLuminas()"/>
          <img v-if="activeTab  == 'Weapons'" class="icon-button" src="@/assets/arrow-counterclockwise.svg"
            v-tooltip="'Reset Weapons'" @click="loadout.resetWeapons()"/>
        </div>
        <div>
          <span v-if="activeTab  == 'Luminas'" v-tooltip="'Total Lumina cost'">
            {{ sum(loadout.selectedLuminas, 'cost') }}
          </span>
        </div>
        <div class="d-flex align-items-center">
          <img v-if="activeTab  == 'Luminas' && luminaFilter" class="icon-button" src="@/assets/x-lg.svg"
            v-tooltip="'Clear Filter'" @click="luminaFilter = null"/>
          <img v-if="activeTab  == 'Weapons' && weaponFilter" class="icon-button" src="@/assets/x-lg.svg"
            v-tooltip="'Clear Filter'" @click="weaponFilter = null"/>
          <img src="@/assets/search.svg" class="pe-2 search-icon"/>
          <input v-if="activeTab  == 'Luminas'" type="text" class="form-control search-box" v-model="luminaFilter">
          <input v-if="activeTab  == 'Weapons'" type="text" class="form-control search-box" v-model="weaponFilter">
        </div>
      </div>

      <template v-if="activeTab == 'Luminas'">
        <div class="d-flex">
          <LuminaBox v-for="lumina in visibleLuminas" :key="lumina.name" :lumina="lumina"
            @clicked="(lumina) => lumina.selected = !lumina.selected" />
        </div>
      </template>
      <template v-if="activeTab == 'Weapons'">
        <div class="d-flex">
          <WeaponBox v-for="weapon in visibleWeapons" :key="weapon.name" :weapon="weapon"
            @clicked="(weapon) => weapon.selected = true" @levelClicked="(level) => level.selected = !level.selected" />
        </div>
      </template>
    </div>
    <div class="col">
      <div class="tab-header">
        <h4>Skills</h4>
        <div class="d-flex align-items-center">
          <img src="@/assets/search.svg" class="pe-2 search-icon" />
          <input type="text" class="form-control search-box" v-model="skillFilter">
        </div>
      </div>

      <div class="d-flex">
        <div>
          <span>
            Base formula: 
          </span>
          <DamageFormula />
        </div>
        <SkillBox v-for="skill in visibleSkills" :key="skill.name" :skill="skill" />
      </div>
    </div>
  </div>

</template>

<style>

.icon-button {
  height: 32px;
  width: 32px;
  padding: 6px;
  margin-left: 6px;
  margin-right: 6px;
  filter: invert(1)
          brightness(0.5);
  cursor: pointer;
}

.icon-button:hover {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.dimvert {
  filter: invert(1)
          brightness(0.5);
}

.small-number {
  width: 75px;
}

.big-number {
  width: 125px;
}

.mid-number {
  width: 85px;
}

</style>

<style scoped>

.search-icon {
  height: 22px;
  filter: invert(1)
          brightness(0.5);
}

.tab-header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.search-box {
  max-width: 200px;
  background-color: #ffffff0d;
  border-color: #00000080;
  color: unset;
}

.search-box:focus {
  background-color: #ffffff10;
  /* border-color: #00000080; */
  color: unset;
}

select {
  width: fit-content;
}

.nav-link {
  color: unset;
}

.d-flex {
  flex-wrap: wrap;
}

.buff-container {
  display: flex;
  flex-wrap: wrap;
}

.buff-group {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

</style>
