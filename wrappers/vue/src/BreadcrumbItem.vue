<script setup>
const props = defineProps({
  active: Boolean,
  disabled: Boolean,
});
</script>

<template>
  <li
    class="breadcrumb__item"
    :class="{ 'breadcrumb__item--active': active, 'breadcrumb__item--disabled': disabled }"
    :aria-current="active ? 'page' : undefined"
  >
    <slot />
  </li>
</template>