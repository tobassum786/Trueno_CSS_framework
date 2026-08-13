<script setup>
import { computed } from 'vue';
import { cn } from '../classNames.js';

const props = defineProps({
  as: { type: String, default: 'input' },
  size: { type: String, default: '' },
  invalid: Boolean,
  valid: Boolean,
});

const cls = computed(() =>
  cn(
    'form-control',
    props.size && `form-control--${props.size}`,
    props.invalid && 'form-control--invalid',
    props.valid && 'form-control--valid'
  )
);
</script>

<template>
  <component :is="as" :class="cls">
    <slot />
  </component>
</template>