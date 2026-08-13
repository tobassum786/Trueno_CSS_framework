<script setup>
import { computed, ref } from 'vue';
import { cn } from '../classNames.js';

const props = defineProps({
  variant: { type: String, default: 'primary' },
  solid: Boolean,
  outline: Boolean,
  dismissible: Boolean,
  size: { type: String, default: '' },
  title: { type: String, default: '' },
});

const emit = defineEmits(['dismiss']);

const root = ref(null);
const visible = ref(true);
const leaving = ref(false);

const cls = computed(() =>
  cn(
    'alert',
    props.variant && (props.solid ? `alert--solid-${props.variant}` : props.outline ? `alert--outline-${props.variant}` : `alert--${props.variant}`),
    props.dismissible && 'alert--dismissible',
    props.size && `alert--${props.size}`
  )
);

function dismiss() {
  if (leaving.value) return;
  leaving.value = true;
  const el = root.value;
  if (el) {
    el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
  }
  emit('dismiss');
  setTimeout(() => {
    visible.value = false;
  }, 200);
}
</script>

<template>
  <div v-if="visible" ref="root" class="alert" :class="cls" role="alert">
    <p v-if="title" class="alert__title">{{ title }}</p>
    <slot />
    <button v-if="dismissible" type="button" class="alert__close" aria-label="Close" @click="dismiss">×</button>
  </div>
</template>
