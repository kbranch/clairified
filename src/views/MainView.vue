<script setup>

import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'; 
import LuminaBox from '@/components/LuminaBox.vue';
import WeaponBox from '@/components/WeaponBox.vue';
import { spoilerLevels } from '@/data/consts.js';
import { useLoadoutStore } from '@/stores/loadout';
import BuffGroups from '@/components/BuffGroups.vue';
import { sortByKey, sum } from '@/main';
import SkillsTab from '@/components/SkillsTab.vue';
import ElementPicker from '@/components/ElementPicker.vue';
import { useSettingsStore } from '@/stores/settings';
import SortPicker from '@/components/SortPicker.vue';
import AboutDialog from '@/components/AboutDialog.vue';

const loadout = useLoadoutStore();
const settings = useSettingsStore();

const subTabs = computed(() => {
  let tabs = ['Luminas', 'Weapons']

  if (isNarrow.value) {
    tabs.push('Skills');
  }

  return tabs;
});

const activeTab = ref('Luminas');

const luminaFilter = ref(null);
const weaponFilter = ref(null);
const skillFilter = ref(null);

const visibleLuminas = computed(() => {
  return sortByKey(loadout.luminas
      .filter(x => (!luminaFilter.value
        || x.name.toLowerCase().includes(luminaFilter.value.toLowerCase())
        || x.description.toLowerCase().includes(luminaFilter.value.toLowerCase()))
        && (!settings.filterFavoriteLuminas || x.favorite))
    , x => settings.luminaSort.map(sort => x[sort.prop]), settings.luminaSort[0].asc);
});

const visibleWeapons = computed(() => {
  return sortByKey(loadout.weapons
      .filter(x => (!weaponFilter.value
        || x.name.toLowerCase().includes(weaponFilter.value.toLowerCase())
        || x.levels?.some(level => level.description.toLowerCase().includes(weaponFilter.value.toLowerCase())))
        && (!settings.filterFavoriteWeapons || x.favorite))
    , x => settings.weaponSort.map(sort => x[sort.prop]), settings.weaponSort[0].asc);
});

const isNarrow = computed(() => {
  return pageWidth.value <= 1200;
});

const pageWidth = ref(null);

function updatePageWidth() {
  pageWidth.value = window.innerWidth;
}

function selectWeapon(weapon) {
  for (const w of loadout.weapons) {
    w.selected = false;
  }

  weapon.selected = true;
}

function selectLevel(level, weapon) {
  if (level.selected && level.level == weapon.levels[0].level && weapon.levels.filter(x => x.selected).length == 1) {
    level.selected = false;
    return;
  }

  for (const otherLevel of weapon.levels) {
    otherLevel.selected = otherLevel.level <= level.level;
  }
}

onMounted(() => {
  updatePageWidth();
  window.addEventListener('resize', updatePageWidth);

  nextTick(() => settings.firstLoad = false);
});

onUnmounted(() => {
  window.removeEventListener('resize', updatePageWidth);
});

</script>

<template>

  <div class="row">
    <div class="col d-flex justify-content-start align-items-center pt-2">
      <h1>Clairified</h1>
    </div>

    <div class="col-auto d-flex justify-content-end align-items-center">
      <label for="damageCap" class="mx-2">Damage Cap</label>
      <select id="damageCap" v-model="settings.damageCap" class="form-select">
        <option value="9999"> {{ (9999).toLocaleString() }} </option>
        <option value="99999"> {{ (99999).toLocaleString() }} </option>
        <option value="999999"> {{ (999999).toLocaleString() }} </option>
        <option value="0">None</option>
      </select>

      <label for="spoilerLevel" class="mx-2">Spoiler Level</label>
      <select id="spoilerLevel" v-model="settings.spoilerLevel" class="form-select">
        <option v-for="level in spoilerLevels" :key="level.name" :value="level">
          {{ level.name }}
        </option>
      </select>
      <img src="/images/info-square.svg" class="header-icon ms-2" v-tooltip:top="'About Clairified'"
        data-bs-toggle="modal" data-bs-target="#aboutModal" />
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

      <div class="d-flex">
        <ElementPicker v-for="element in ['light', 'dark', 'physical', 'fire', 'ice', 'lightning', 'earth']"
          :key="element" :element="element" />
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
            v-tooltip:top="'Reset Luminas'" @click="loadout.resetLuminas()"/>
          <img v-if="activeTab  == 'Weapons'" class="icon-button" src="@/assets/arrow-counterclockwise.svg"
            v-tooltip:top="'Reset Weapons'" @click="loadout.resetWeapons()"/>
        </div>
        <div class="pe-2">
          <span v-if="activeTab  == 'Luminas'" v-tooltip:top="'Total Lumina cost'">
            {{ sum(loadout.selectedLuminas, 'cost') }}
          </span>
        </div>
        <div class="filters">
          <img v-if="activeTab  == 'Luminas'" class="icon-button me-0" v-tooltip:top="'Filter Favorites'" 
            :src="`/images/star${settings.filterFavoriteLuminas ? '-fill': ''}.svg`"
           @click="settings.filterFavoriteLuminas = !settings.filterFavoriteLuminas"/>

          <img v-if="activeTab  == 'Weapons'" class="icon-button me-0" v-tooltip:top="'Filter Favorites'" 
            :src="`/images/star${settings.filterFavoriteWeapons ? '-fill': ''}.svg`"
            @click="settings.filterFavoriteWeapons = !settings.filterFavoriteWeapons"/>

          <img v-if="activeTab  == 'Skills'" class="icon-button me-0" v-tooltip:top="'Filter Favorites'" 
            :src="`/images/star${settings.filterFavoriteSkills ? '-fill': ''}.svg`"
            @click="settings.filterFavoriteSkills = !settings.filterFavoriteSkills"/>

          <SortPicker v-if="activeTab  == 'Luminas'" v-model="settings.luminaSort[0]" type="lumina" />
          <SortPicker v-if="activeTab  == 'Weapons'" v-model="settings.weaponSort[0]" type="weapon" />
          <SortPicker v-if="activeTab  == 'Skills'" v-model="settings.skillSort[0]" type="skill" />

          <img v-if="activeTab  == 'Luminas' && luminaFilter" class="icon-button" src="@/assets/x-lg.svg"
            v-tooltip:top="'Clear Filter'" @click="luminaFilter = null"/>

          <img v-if="activeTab  == 'Weapons' && weaponFilter" class="icon-button" src="@/assets/x-lg.svg"
            v-tooltip:top="'Clear Filter'" @click="weaponFilter = null"/>

          <img v-if="activeTab  == 'Skills' && skillFilter" class="icon-button" src="@/assets/x-lg.svg"
            v-tooltip:top="'Clear Filter'" @click="skillFilter = null"/>

          <img src="@/assets/search.svg" class="pe-2 search-icon"/>
          <input v-if="activeTab  == 'Luminas'" type="text" class="form-control search-box" v-model="luminaFilter">
          <input v-if="activeTab  == 'Weapons'" type="text" class="form-control search-box" v-model="weaponFilter">
          <input v-if="activeTab  == 'Skills'" type="text" class="form-control search-box" v-model="skillFilter">
        </div>
      </div>

      <template v-if="activeTab == 'Luminas'">
        <div class="lumina-container">
          <LuminaBox v-for="lumina in visibleLuminas" :key="lumina.name" :lumina="lumina"
            @clicked="(lumina) => lumina.selected = !lumina.selected" />
        </div>
      </template>
      <template v-if="activeTab == 'Weapons'">
        <div class="d-flex">
          <WeaponBox v-for="weapon in visibleWeapons" :key="weapon.name" :weapon="weapon"
            @clicked="(weapon) => selectWeapon(weapon)" @levelClicked="(level, weapon) => selectLevel(level, weapon)" />
        </div>
      </template>
      <template v-if="activeTab == 'Skills'">
        <div class="d-flex">
          <SkillsTab :skill-filter="skillFilter" />
        </div>
      </template>
    </div>
    <div v-if="!isNarrow" class="col">
      <div class="tab-header">
        <h4>Skills</h4>
        <div class="d-flex align-items-center">
          <img class="icon-button me-0" :src="`/images/star${settings.filterFavoriteSkills ? '-fill': ''}.svg`"
            v-tooltip:top="'Filter Favorites'" @click="settings.filterFavoriteSkills = !settings.filterFavoriteSkills"/>

          <SortPicker v-model="settings.skillSort[0]" type="skill" />

          <img src="@/assets/search.svg" class="pe-2 search-icon" />
          <input type="text" class="form-control search-box" v-model="skillFilter">
        </div>
      </div>

      <SkillsTab :skill-filter="skillFilter" />
    </div>
  </div>

  <AboutDialog :start-showing="settings.firstLoad" />

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

.header-icon {
  height: 32px;
  width: 32px;
  filter: invert(1)
          brightness(0.5);
  cursor: pointer;
}

.lumina-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-right: -10px;
}

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
  min-width: 75px;
  flex-shrink: 1;
  background-color: #ffffff0d;
  border-color: #00000080;
  color: unset;
  width: 100%;
}

.filters {
  flex: 1;
  min-width: 135px;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.search-box:focus {
  background-color: #ffffff10;
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
