<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  for: { type: String, default: '' },
});
</script>

<template>
  <div class="form-group">
    <label v-if="label" :for="for">{{ label }}</label>
    <slot />
  </div>
</template>