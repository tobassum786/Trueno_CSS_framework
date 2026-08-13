<script setup>
const props = defineProps({
  separator: { type: String, default: '' },
  size: { type: String, default: '' },
  plain: Boolean,
});
</script>

<template>
  <ol
    class="breadcrumb"
    :class="{
      'breadcrumb--chevron': separator === 'chevron',
      'breadcrumb--bullet': separator === 'bullet',
      'breadcrumb--custom': separator === 'custom',
      [`breadcrumb--${size}`]: size,
      'breadcrumb--plain': plain,
    }"
  >
    <slot />
  </ol>
</template>