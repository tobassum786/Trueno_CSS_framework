<script setup>
import { onMounted, ref } from 'vue';

const dark = ref(false);

onMounted(() => {
  dark.value = document.body.classList.contains('theme--dark');
});

function toggle() {
  dark.value = !dark.value;
  if (window.Trueno && window.Trueno.Theme) {
    window.Trueno.Theme.set(dark.value);
  } else {
    document.body.classList.toggle('theme--dark', dark.value);
    try {
      localStorage.setItem('trueno-theme', dark.value ? 'dark' : 'light');
    } catch (e) {}
  }
}
</script>

<template>
  <button type="button" class="theme-toggle" :aria-pressed="String(dark)" @click="toggle">
    <slot>{{ dark ? '☀️' : '🌙' }}</slot>
  </button>
</template>