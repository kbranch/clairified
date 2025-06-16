<script setup>
import { Modal } from 'bootstrap';
import { nextTick, onMounted, ref } from 'vue';

const props = defineProps(['startShowing'])
const modal = ref(null);

onMounted(() => {
  if (props.startShowing) {
    nextTick(() => {
      new Modal(modal.value).show();
    });
  }
});

</script>

<template>

<div ref="modal" class="modal fade" id="aboutModal" tabindex="-1" aria-labelledby="aboutModalLabel">
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="aboutModalLabel">About Clairified</h4>
        <button type="button" class="btn-close dimvert" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p id="aboutBody">
          Clairified is a damage calculator for <a href="https://www.expedition33.com/">Expedition 33: Clair Obscur</a>. Thanks to <a href="https://www.nexusmods.com/clairobscurexpedition33/mods/134">Kimjsd's Enhanced Descriptions</a> mod for the underlying data.
        </p>

        <div class="accordion" id="moreInfoAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#moreInfoCollapse" aria-controls="moreInfoCollapse">
                More Information
              </button>
            </h2>
            <div id="moreInfoCollapse" class="accordion-collapse collapse" data-bs-parent="#moreInfoAccordion">
              <div class="accordion-body">
                <p>
                  Source code is available on <a href="https://github.com/kbranch/clairified">GitHub</a>, which is also a great place for bug reports.
                  <strong>Contributions are welcome!</strong> Adding skills, luminas, weapons, buffs, and even characters can be done with little technical experience.
                </p>
                <p>
                  <strong>Note: This is currently early in development.</strong> A lot of data is missing, and most of the math has not been validated.
                  If you understand how the game does its calculations, your help would be much appreciated!
                </p>
              </div>
            </div>
          </div>
        </div>

        <h5 class="pt-3">Getting Started</h5>
        <h6 class="pt-2">1) Enter stats and buffs</h6>
        <div class="row">
          <div class="col">
            <p>
              Start by entering your character's total Attack Power and Critical Rate. This information can be found in the top right corner of the character's equipment screen in-game.
            </p>
            <p>
              Also select which buffs are active (e.g. Powerful, Defenceless, active Stains, etc.), both on your character and on the enemy (target).
            </p>
          </div>
          <div class="col col-auto py-2">
            <img src="/images/character-stats.png" width="250px" class="" />
          </div>
        </div>

        <h6 class="pt-3">2) Select Luminas and a weapon</h6>
        <p>
          Below the buffs section, select the Luminas tab and choose which Luminas you have equipped.
        </p>
        <p>
          Switch to the Weapons tab and select which level upgrades your weapon currently has.
        </p>

        <h6 class="pt-3">3) Review skill damage</h6>
        <p>
          That's it! Now the Skills section will display information about the damage done by each skill, and how those numbers are calculated.
        </p>
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

</style>