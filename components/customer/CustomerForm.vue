<template>
  <div class="customer-form">
    <h2 class="customer-form__title">
      {{ isEdit ? 'Upravit zákazníka' : 'Přidat zákazníka' }}
    </h2>

    <form
      class="customer-form__form"
      @submit.prevent="submitForm"
    >
      <div class="customer-form__field">
        <label
          class="customer-form__label"
          for="name"
        >Jméno *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="customer-form__input"
          :class="{ 'customer-form__input--error': nameError }"
        >

        <div
          v-if="nameError"
          class="customer-form__error"
        >
          {{ nameError }}
        </div>
      </div>

      <div class="customer-form__field">
        <label
          class="customer-form__label"
          for="email"
        >Email *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="customer-form__input"
          :class="{ 'customer-form__input--error': emailError }"
        >
        <div
          v-if="emailError"
          class="customer-form__error"
        >
          {{ emailError }}
        </div>
      </div>

      <div class="customer-form__field">
        <label
          class="customer-form__label"
          for="phone"
        >Telefon</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="customer-form__input"
        >
      </div>

      <div class="customer-form__field">
        <label
          class="customer-form__label"
          for="address"
        >Adresa</label>
        <textarea
          id="address"
          v-model="form.address"
          class="customer-form__textarea"
        />
      </div>

      <div class="customer-form__field">
        <label class="customer-form__label">Skupiny zákazníků</label>
        <div class="customer-form__groups">
          <div
            v-for="group in customerGroups"
            :key="group.id"
            class="customer-form__group-item"
          >
            <input
              :id="'group-' + group.id"
              type="checkbox"
              :checked="isInGroup(group.id)"
              @change="toggleGroup(group.id)"
            >
            <label :for="'group-' + group.id">{{ group.name }}</label>
          </div>
          <div
            v-if="customerGroups.length === 0"
            class="customer-form__no-groups"
          >
            Žádné skupiny nejsou k dispozici
          </div>
        </div>
      </div>

      <div class="customer-form__actions">
        <button
          type="button"
          class="customer-form__cancel-btn"
          @click="$emit('cancel')"
        >
          Zrušit
        </button>
        <button
          type="submit"
          class="customer-form__submit-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Ukládání...' : (isEdit ? 'Uložit změny' : 'Vytvořit zákazníka') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ZodError } from 'zod'
import { useCustomerStore } from '~/stores/customerStore'
import { useCustomerGroupStore } from '~/stores/customerGroupStore'
import type { Customer, CustomerGroup } from '~/types'
import { customerFormSchema, type CustomerFormData } from '~/schemas/customers'

const props = defineProps<{
  customer?: Customer
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [customer: Customer, selectedGroups: string[]]
  cancel: []
}>()

const customerStore = useCustomerStore()
const groupStore = useCustomerGroupStore()
const customerGroups = computed(() => groupStore.groups)
const isSubmitting = ref(false)
const selectedGroups = ref<string[]>([])
const nameError = ref('')
const emailError = ref('')

const form = reactive<CustomerFormData>({
  name: props.customer?.name || '',
  email: props.customer?.email || '',
  phone: props.customer?.phone || '',
  address: props.customer?.address || '',
})

onMounted(async () => {
  if (groupStore.groups.length === 0) {
    await groupStore.fetchGroups()
  }

  if (props.isEdit && props.customer) {
    groupStore.groups.forEach((group) => {
      if (group.customers?.some(c => c.id === props.customer?.id)) {
        selectedGroups.value.push(group.id)
      }
    })
  }
})

function isInGroup(groupId: string): boolean {
  return selectedGroups.value.includes(groupId)
}

function toggleGroup(groupId: string): void {
  const index = selectedGroups.value.indexOf(groupId)
  if (index === -1) {
    selectedGroups.value.push(groupId)
  }
  else {
    selectedGroups.value.splice(index, 1)
  }
}

function validateForm(): boolean {
  nameError.value = ''
  emailError.value = ''

  try {
    customerFormSchema.parse(form)
    return true
  }
  catch (error) {
    if (error instanceof ZodError) {
      error.errors.forEach((err) => {
        const field = err.path[0] as string
        if (field === 'name') {
          nameError.value = err.message
        }
        else if (field === 'email') {
          emailError.value = err.message
        }
      })
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
      email: form.email,
      phone: form.phone,
      address: form.address,
    }, selectedGroups.value)
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

.customer-form {
  padding: 1.5rem;

  &__title {
    font-size: $header-font-size;
    margin-bottom: $large-spacing;
  }

  &__fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $standard-spacing;
  }

  &__field {
    margin-bottom: $standard-spacing;

    &--full {
      grid-column: 1 / -1;
    }
  }

  &__label {
    display: block;
    margin-bottom: $small-spacing;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }

  &__input,
  &__textarea,
  &__select {
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

  &__groups {
    display: flex;
    flex-direction: column;
    gap: $small-spacing;
    max-height: 200px;
    overflow-y: auto;
    padding: $small-spacing;
    border: 1px solid $bg-light;
    border-radius: $border-radius;
  }

  &__group-item {
    display: flex;
    align-items: center;
    gap: $small-spacing;
  }

  &__no-groups {
    color: $text-secondary;
    font-size: $small-font-size;
    padding: $small-spacing 0;
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
