<script setup>
const props = defineProps({
  position: { type: String, default: 'prepend' },
});
</script>

<template>
  <div class="input-group" :class="position === 'append' ? 'input-group--append' : 'input-group--prepend'">
    <slot />
  </div>
</template>