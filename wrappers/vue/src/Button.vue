<script setup>
import { computed } from 'vue';
import { cn } from '../classNames.js';

const props = defineProps({
  as: { type: String, default: 'button' },
  variant: { type: String, default: '' },
  size: { type: String, default: '' },
});

const cls = computed(() =>
  cn('btn', props.variant && `btn--${props.variant}`, props.size && `btn--${props.size}`)
);
</script>

<template>
  <component :is="as" :class="cls">
    <slot />
  </component>
</template>
