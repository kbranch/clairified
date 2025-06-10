<script setup>

defineProps(['lumina']);
defineEmits(['clicked']);

</script>

<template>

<div class="box" :class="{ 'active': lumina.selected }" @click="$emit('clicked', lumina)">
  <div class="header">
    <h5>{{ lumina.name }}</h5>
    <span>{{ lumina.cost }}</span>
  </div>

  <span>
    {{ lumina.description }}
  </span>
</div>

</template>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box {
  padding: 10px;
  width: 48%;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  margin: 5px;
}

.box:hover {
  background-color: #ffffff18;
  border-color: #ccc;
}

.box.active:hover {
  background-color: #ffffff18;
  border-color: #4d92fa;
}

.active {
  background-color: #ffffff10;
  border-color: var(--color-highlight);
}

</style>