<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  footer: { type: String, default: '' },
  closeButton: { type: Boolean, default: true },
});

const emit = defineEmits(['close', 'open', 'update:open']);

const root = ref(null);
const prevFocus = ref(null);
const closing = ref(false);
const uid = Math.random().toString(36).slice(2, 8);
const titleId = `tr-modal-title-${uid}`;

function openModal() {
  const el = root.value;
  if (!el) return;
  prevFocus.value = document.activeElement;
  if (window.Trueno && window.Trueno.Modal) {
    window.Trueno.Modal.open(el);
  } else {
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  const focusable = el.querySelector(FOCUSABLE);
  if (focusable) focusable.focus();
  emit('open');
}

function closeModal() {
  const el = root.value;
  if (!el) return;
  closing.value = true;
  if (window.Trueno && window.Trueno.Modal) {
    window.Trueno.Modal.close(el);
  } else {
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal.is-open')) document.body.style.overflow = '';
  }
  closing.value = false;
  if (prevFocus.value) prevFocus.value.focus();
}

function requestClose() {
  if (root.value && !root.value.classList.contains('is-open')) return;
  emit('update:open', false);
  emit('close');
}

function onBackdrop(event) {
  if (event.target === root.value) requestClose();
}

function onKey(event) {
  if (event.key === 'Escape' || event.keyCode === 27) requestClose();
}

function onTruenoClose(event) {
  if (closing.value) return;
  if (event.detail && event.detail.modal === root.value) {
    emit('update:open', false);
    emit('close');
  }
}

watch(
  () => props.open,
  (value) => (value ? openModal() : closeModal())
);

onMounted(() => {
  if (props.open) openModal();
  if (window.Trueno && window.Trueno.Modal) {
    document.addEventListener('trueno:modal:close', onTruenoClose);
  } else {
    document.addEventListener('keydown', onKey);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey);
  document.removeEventListener('trueno:modal:close', onTruenoClose);
  if (props.open) closeModal();
});
</script>

<template>
  <div ref="root" class="modal" :aria-hidden="open ? 'false' : 'true'" @click="onBackdrop">
    <div
      class="modal__dialog"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="title ? titleId : undefined"
    >
      <header v-if="title || closeButton" class="modal__header">
        <h3 v-if="title" class="modal__title" :id="titleId">{{ title }}</h3>
        <span v-else />
        <button v-if="closeButton" type="button" class="modal__close-btn" aria-label="Close" @click="requestClose">
          ×
        </button>
      </header>
      <div v-if="$slots.default" class="modal__body">
        <slot />
      </div>
      <footer v-if="footer || $slots.footer" class="modal__footer">
        <slot name="footer">{{ footer }}</slot>
      </footer>
    </div>
  </div>
</template>
