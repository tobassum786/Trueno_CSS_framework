<script setup>
const props = defineProps({
  as: { type: String, default: 'a' },
});
</script>

<template>
  <component :is="as" class="navbar__brand">
    <slot />
  </component>
</template>