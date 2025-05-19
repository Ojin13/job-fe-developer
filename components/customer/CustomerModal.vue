<template>
  <div
    v-if="show"
    class="customer-modal"
  >
    <div
      class="customer-modal__overlay"
      @click="$emit('close')"
    />
    <div class="customer-modal__content">
      <button
        class="customer-modal__close"
        @click="$emit('close')"
      />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style lang="scss" scoped>
@import "~/assets/sass/_variables.scss";

.customer-modal {
  position: fixed;
  z-index: $z-overlay;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $overlay-bg;
  }

  &__content {
    position: relative;
    z-index: $z-modal;
    background-color: $white;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: $border-radius-large;
    box-shadow: 0 4px 12px $shadow-color;
  }

  &__close {
    position: absolute;
    top: 0.75rem;
    right: $standard-spacing;
    font-size: $header-font-size;
    background: none;
    border: none;
    cursor: pointer;
    color: $text-secondary;

    &:hover {
      color: $text-primary;
    }
  }
}
</style>
