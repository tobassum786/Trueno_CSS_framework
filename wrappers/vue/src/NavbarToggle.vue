<script setup>
import { inject } from 'vue';

const props = defineProps({
  controls: { type: String, default: '' },
});

const navbar = inject('truenoNavbar', null);

function toggle() {
  if (navbar) navbar.setOpen(!navbar.open.value);
}
</script>

<template>
  <button
    type="button"
    class="navbar__toggle"
    :aria-expanded="navbar ? String(navbar.open.value) : 'false'"
    :aria-controls="controls"
    @click="toggle"
  >
    <slot />
  </button>
</template>
