<script setup>
const props = defineProps({
  as: { type: String, default: 'a' },
  active: Boolean,
});
</script>

<template>
  <component :is="as" class="navbar__link" :class="{ 'navbar__link--active': active }">
    <slot />
  </component>
</template>