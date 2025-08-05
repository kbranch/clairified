<script setup>
import { Modal } from 'bootstrap';
import { nextTick, onMounted, ref } from 'vue';
import { useLoadoutStore } from '@/stores/loadout';
import { download, getFile } from '@/main';

const props = defineProps(['startShowing'])
const modal = ref(null);
const importInputRef = ref(null);
const importMappings = ref(null);
const importFileData = ref(null);
const whichCharacters = ref('all');
const whichPresets = ref('all');

const loadout = useLoadoutStore();

let dialogObj = null;

onMounted(() => {
  dialogObj = new Modal(modal.value);

  if (props.startShowing) {
    nextTick(() => {
      dialogObj.show();
    });
  }
});

async function importData() {
  let data = await getFile(importInputRef.value);
  let obj = JSON.parse(data);
  let target = {};

  for (const [char, presets] of Object.entries(importMappings.value)) {
    for (const [originalPreset, newPreset] of Object.entries(presets)) {
      if (!newPreset) {
        continue;
      }

      if (!(newPreset in target)) {
        target[newPreset] = {};
      }

      target[newPreset][char] = obj[originalPreset][char];
    }
  }

  loadout.importData({ presets: target });
  dialogObj.hide();
}

function exportData() {
  let characters = [];
  let request = {};
  let characterDescription = '';
  let presetDescription = '';

  if (whichCharacters.value == 'all') {
    characters = loadout.characters.filter(x => x.name != '???').map(x => x.name);
    characterDescription = 'all-characters';
  }
  else {
    characters = [loadout.character.name];
    characterDescription = loadout.character.name;
  }

  for (const char of characters) {
    if (whichPresets.value == 'all') {
      request[char] = [... loadout.presets]
      presetDescription = 'all-presets';
    }
    else {
      request[char] = [loadout.activePresets[char]];
      presetDescription = 'single-preset';
    }
  }

  let json = JSON.stringify(loadout.exportData(request));
  download(`clairified-${characterDescription}-${presetDescription}-${(new Date()).toISOString()}.json`, json);
}

async function loadImportFile() {
  if ((importInputRef.value?.files?.length ?? 0) == 0) {
    importMappings.value = null;
    return;
  }

  let data = await getFile(importInputRef.value);
  importFileData.value = JSON.parse(data);

  let charPresets = {};

  for (const preset in importFileData.value) {
    for (const char in importFileData.value[preset]) {
      if (!(char in charPresets)) {
        charPresets[char] = [];
      }

      if (importFileData.value[preset][char].length > 0) {
        charPresets[char].push(preset);
      }
    }
  }

  let singlePreset = Object.values(charPresets).every(x => x.length <= 1);

  importMappings.value = Object.keys(charPresets).reduce((mappings, char) => {
    mappings[char] = charPresets[char].reduce((presets, preset) => {
      presets[preset] = singlePreset ? loadout.activePresets[char] : preset;

      return presets;
    }, {});

    return mappings;
  }, {});
}

</script>

<template>

<div ref="modal" class="modal fade" id="exportModal" tabindex="-1" aria-labelledby="exportModalLabel">
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="exportModalLabel">Build Sharing</h4>
        <button type="button" class="btn-close dimvert" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
          <h4>Import</h4>
          <div>
            <span>Select a file to import:</span>
          </div>

          <input type="file" accept=".json" id="importInput" ref="importInputRef" @change="loadImportFile()" /> 

          <div v-for="char in Object.keys(importMappings ?? {})" :key="char" class="pt-2">
            <h5>{{ char }}:</h5>
            <div v-for="preset in Object.keys(importMappings[char] ?? {})" :key="preset" class="mapping-wrapper">
              <span>Import preset {{ preset }} into our preset</span>

              <select class="form-select mx-2 my-1" aria-label="Preset target" v-model="importMappings[char][preset]">
                <option :value="null">None</option>
                <option v-for="value in loadout.presets" :key="value" :value="value">{{ value }}</option>
              </select>
            </div>
          </div>

          <div class="pt-2">
            <button class="btn btn-secondary" :class="{disabled: !importMappings}" @click="importData()">Import</button>
          </div>
        </div>

        <hr />

        <div>
          <h4>Export</h4>

          <div class="export-wrapper">
            <div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="characterExport" id="allCharacters"
                  v-model="whichCharacters" value="all">
                <label class="form-check-label" for="allCharacters">All Characters</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="characterExport" id="currentCharacter"
                  v-model="whichCharacters" value="current">
                <label class="form-check-label" for="currentCharacter">Current Character</label>
              </div>
            </div>

            <div class="ps-4">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="presetExport" id="allPresets"
                  v-model="whichPresets" value="all">
                <label class="form-check-label" for="allPresets">All Presets</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="presetExport" id="currentPreset"
                  v-model="whichPresets" value="current">
                <label class="form-check-label" for="currentPreset">Current Preset</label>
              </div>
            </div>
          </div>

          <button class="btn btn-secondary mt-2" @click="exportData()">Export</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<style scoped>

h4, h5, h6 {
  color: var(--color-heading);
}

strong {
  font-weight: bold;
  color: var(--color-heading);
}

.center-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.modal-header, .modal-body, .modal-content {
  background-color: var(--color-background);
  color: var(--color-text);
}

.export-wrapper {
  display: flex;
}

.mapping-wrapper {
  display: flex;
  align-items: center;
}

select {
  width: fit-content;
}

</style>