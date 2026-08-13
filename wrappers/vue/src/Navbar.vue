<script setup>
import { provide, ref } from 'vue';

const props = defineProps({
  dark: Boolean,
  light: Boolean,
  primary: Boolean,
  gradient: Boolean,
  transparent: Boolean,
  sticky: Boolean,
  defaultOpen: { type: Boolean, default: false },
});

const open = ref(props.defaultOpen);
const setOpen = (value) => {
  open.value = value;
};

provide('truenoNavbar', { open, setOpen });
</script>

<template>
  <nav
    class="navbar"
    :class="{
      'navbar--dark': dark,
      'navbar--light': light,
      'navbar--primary': primary,
      'navbar--gradient': gradient,
      'navbar--transparent': transparent,
      'navbar--sticky': sticky,
    }"
  >
    <slot />
  </nav>
</template>
