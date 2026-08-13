<script setup>
const props = defineProps({
  size: { type: String, default: '' },
  rounded: Boolean,
  center: Boolean,
  right: Boolean,
  secondary: Boolean,
});
</script>

<template>
  <nav aria-label="Page navigation">
    <ul
      class="pagination"
      :class="{
        [`pagination--${size}`]: size,
        'pagination--rounded': rounded,
        'pagination--center': center,
        'pagination--right': right,
        'pagination--secondary': secondary,
      }"
    >
      <slot />
    </ul>
  </nav>
</template>