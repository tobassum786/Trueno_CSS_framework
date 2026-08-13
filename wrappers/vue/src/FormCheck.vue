<script setup>
defineOptions({ inheritAttrs: false });

const props = defineProps({
  type: { type: String, default: 'checkbox' },
  label: { type: String, default: '' },
  inline: Boolean,
});

const uid = `tr-check-${Math.random().toString(36).slice(2, 8)}`;
</script>

<template>
  <div class="form-check" :class="{ 'form-check--inline': inline }">
    <input :id="uid" :type="type" v-bind="$attrs" />
    <label v-if="label" :for="uid">{{ label }}</label>
  </div>
</template>