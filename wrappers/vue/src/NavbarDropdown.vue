<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  label: { type: String, default: '' },
});

const root = ref(null);
const open = ref(false);

function onToggle(event) {
  event.preventDefault();
  event.stopPropagation();
  open.value = !open.value;
}

function onDocumentClick(event) {
  if (root.value && !root.value.contains(event.target)) open.value = false;
}

onMounted(() => document.addEventListener('click', onDocumentClick));
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick));
</script>

<template>
  <li ref="root" class="navbar__item navbar__has-dropdown" :class="{ 'is-open': open }">
    <a class="navbar__link" href="#" @click="onToggle">{{ label }}</a>
    <ul class="navbar__dropdown">
      <slot />
    </ul>
  </li>
</template>