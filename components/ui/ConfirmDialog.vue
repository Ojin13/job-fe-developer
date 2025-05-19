<template>
  <div
    v-if="show"
    class="confirm-dialog"
  >
    <div
      class="confirm-dialog__overlay"
      @click="$emit('cancel')"
    />
    <div class="confirm-dialog__content">
      <h2 class="confirm-dialog__title">
        {{ title }}
      </h2>
      <p class="confirm-dialog__message">
        {{ message }}
      </p>
      <div class="confirm-dialog__actions">
        <button
          class="confirm-dialog__cancel-btn"
          @click="$emit('cancel')"
        >
          {{ cancelText }}
        </button>
        <button
          class="confirm-dialog__confirm-btn"
          @click="$emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<style lang="scss" scoped>
@import "~/assets/sass/_variables.scss";

.confirm-dialog {
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
    max-width: 400px;
    border-radius: $border-radius-large;
    box-shadow: 0 4px 12px $shadow-color;
    padding: $large-spacing;
  }

  &__title {
    margin-top: 0;
    font-size: $header-font-size;
    color: $text-primary;
  }

  &__message {
    margin-bottom: $large-spacing;
    color: $text-secondary;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: $standard-spacing;
  }

  &__cancel-btn,
  &__confirm-btn {
    padding: 0.6rem 1.2rem;
    border-radius: $border-radius;
    font-weight: $font-weight-medium;
    cursor: pointer;
  }

  &__cancel-btn {
    background-color: $bg-light;
    border: 1px solid $text-secondary;
    color: $text-secondary;
  }

  &__confirm-btn {
    background-color: $danger;
    border: none;
    color: $white;
  }
}
</style>
