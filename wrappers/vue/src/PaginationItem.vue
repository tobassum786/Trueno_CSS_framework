<script setup>
const props = defineProps({
  active: Boolean,
  disabled: Boolean,
});
</script>

<template>
  <li
    class="pagination__item"
    :class="{ 'pagination__item--active': active, 'pagination__item--disabled': disabled }"
  >
    <slot />
  </li>
</template>