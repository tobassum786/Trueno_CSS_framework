<script setup>
const props = defineProps({
  type: { type: String, default: '' },
});
</script>

<template>
  <small class="form-feedback" :class="type && `form-feedback--${type}`">
    <slot />
  </small>
</template>