<script setup>
import { computed } from 'vue';
import { cn } from '../classNames.js';

const props = defineProps({
  as: { type: String, default: 'span' },
  variant: { type: String, default: 'secondary' },
  soft: Boolean,
  outline: Boolean,
  pill: Boolean,
  dot: Boolean,
  count: Boolean,
  size: { type: String, default: '' },
});

const cls = computed(() =>
  cn(
    'badge',
    props.dot && 'badge--dot',
    props.count && 'badge--count',
    props.variant && (props.soft ? `badge--soft-${props.variant}` : props.outline ? `badge--outline-${props.variant}` : `badge--${props.variant}`),
    props.pill && 'badge--pill',
    props.size && `badge--${props.size}`
  )
);
</script>

<template>
  <component :is="as" :class="cls">
    <slot />
  </component>
</template>
