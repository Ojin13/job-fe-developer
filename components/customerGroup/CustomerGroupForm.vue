<template>
  <div class="customer-group-form">
    <h2 class="customer-group-form__title">
      {{ isEdit ? 'Upravit skupinu' : 'Přidat skupinu' }}
    </h2>

    <form
      class="customer-group-form__form"
      @submit.prevent="submitForm"
    >
      <div class="customer-group-form__field">
        <label
          class="customer-group-form__label"
          for="name"
        >Název *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="customer-group-form__input"
          :class="{ 'customer-group-form__input--error': nameError }"
        >
        <div
          v-if="nameError"
          class="customer-group-form__error"
        >
          {{ nameError }}
        </div>
      </div>

      <div class="customer-group-form__field">
        <label
          class="customer-group-form__label"
          for="description"
        >Popis</label>
        <textarea
          id="description"
          v-model="form.description"
          class="customer-group-form__textarea"
        />
      </div>

      <div class="customer-group-form__actions">
        <button
          type="button"
          class="customer-group-form__cancel-btn"
          @click="$emit('cancel')"
        >
          Zrušit
        </button>
        <button
          type="submit"
          class="customer-group-form__submit-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Ukládání...' : (isEdit ? 'Uložit změny' : 'Vytvořit skupinu') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ZodError } from 'zod'
import type { CustomerGroup } from '~/types'
import { customerGroupFormSchema, type CustomerGroupFormData } from '~/schemas/customerGroups'

const props = defineProps<{
  group?: CustomerGroup
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [groupData: CustomerGroup]
  cancel: []
}>()

const isSubmitting = ref(false)
const nameError = ref('')

const form = reactive<CustomerGroupFormData>({
  name: props.group?.name || '',
  description: props.group?.description || '',
})

function validateForm(): boolean {
  nameError.value = ''

  try {
    customerGroupFormSchema.parse(form)
    return true
  }
  catch (error) {
    if (error instanceof ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0] === 'name') {
          nameError.value = err.message
        }
      })
    }
    else {
      console.error(error)
    }
    return false
  }
}

async function submitForm() {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    emit('submit', {
      name: form.name,
      description: form.description,
    })
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/sass/_variables.scss";

.customer-group-form {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  &__title {
    font-size: $header-font-size;
    margin-bottom: $large-spacing;
  }

  &__field {
    margin-bottom: $standard-spacing;
  }

  &__label {
    display: block;
    margin-bottom: $small-spacing;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }

  &__input,
  &__textarea {
    width: 100%;
    padding: 0.6rem 0.8rem;
    border: 1px solid $text-secondary;
    border-radius: $border-radius;
    font-size: $small-font-size;
    transition: border-color $transition-speed;

    &:focus {
      outline: none;
      border-color: $primary;
    }

    &--error {
      border-color: $danger;
    }
  }

  &__textarea {
    min-height: 100px;
    resize: vertical;
  }

  &__error {
    color: $danger;
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: $standard-spacing;
    margin-top: $standard-spacing;
  }

  &__cancel-btn,
  &__submit-btn {
    padding: 0.6rem 1.2rem;
    border-radius: $border-radius;
    font-weight: $font-weight-medium;
    cursor: pointer;
  }

  &__cancel-btn {
    background-color: $bg-light;
    border: 1px solid $text-secondary;
    color: $text-secondary;

    &:hover {
      background-color: $bg-light;
    }
  }

  &__submit-btn {
    background-color: $primary;
    border: none;
    color: $white;

    &:hover {
      background-color: $primary-hover;
    }

    &:disabled {
      background-color: lighten($primary, 20%);
      cursor: not-allowed;
    }
  }
}
</style>
