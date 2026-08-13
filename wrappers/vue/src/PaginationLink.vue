<script setup>
const props = defineProps({
  prev: Boolean,
  next: Boolean,
  active: Boolean,
});
</script>

<template>
  <a
    class="pagination__link"
    :class="{ 'pagination__link--prev': prev, 'pagination__link--next': next, 'pagination__link--active': active }"
    :aria-current="active ? 'page' : undefined"
  >
    <slot />
  </a>
</template>