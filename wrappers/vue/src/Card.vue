<script setup>
const props = defineProps({
  hoverable: Boolean,
});
</script>

<template>
  <div class="card" :class="{ 'card--hoverable': hoverable }">
    <slot />
  </div>
</template>