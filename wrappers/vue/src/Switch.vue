<script setup>
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  label: { type: String, default: '' },
  color: { type: String, default: '' },
  size: { type: String, default: '' },
});

const uid = `tr-switch-${Math.random().toString(36).slice(2, 8)}`;

const cls = computed(() => ({
  [`switch--${props.color}`]: props.color,
  [`switch--${props.size}`]: props.size,
}));
</script>

<template>
  <label class="switch" :class="cls">
    <input :id="uid" type="checkbox" v-bind="$attrs" />
    <span class="switch__track" aria-hidden="true" />
    <span v-if="label">{{ label }}</span>
  </label>
</template>