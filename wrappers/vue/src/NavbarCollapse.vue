<script setup>
import { inject } from 'vue';

const navbar = inject('truenoNavbar', null);

function onContentClick() {
  if (navbar && navbar.open.value) navbar.setOpen(false);
}
</script>

<template>
  <div
    class="navbar__collapse"
    :class="{ 'is-open': navbar ? navbar.open.value : false }"
    @click="onContentClick"
  >
    <slot />
  </div>
</template>
