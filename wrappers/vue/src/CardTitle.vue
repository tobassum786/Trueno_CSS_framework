<script setup>
const props = defineProps({
  as: { type: String, default: 'h5' },
});
</script>

<template>
  <component :is="as" class="card__title">
    <slot />
  </component>
</template>