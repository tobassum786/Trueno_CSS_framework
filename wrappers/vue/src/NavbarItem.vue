<script setup>
const props = defineProps({
  active: Boolean,
  hasDropdown: Boolean,
});
</script>

<template>
  <li
    class="navbar__item"
    :class="{ 'navbar__item--active': active, 'navbar__has-dropdown': hasDropdown }"
  >
    <slot />
  </li>
</template>