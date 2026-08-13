<script setup>
const props = defineProps({
  columns: { type: Number, default: 2 },
});
</script>

<template>
  <div class="form-grid" :class="{ 'form-grid--3': columns === 3 }">
    <slot />
  </div>
</template>