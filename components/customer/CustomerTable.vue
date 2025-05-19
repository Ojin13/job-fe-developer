<template>
  <div class="customer-table">
    <div class="customer-table__header">
      <h2 class="customer-table__title">
        Seznam zákazníků
      </h2>
      <div class="customer-table__actions">
        <div class="customer-table__search">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Vyhledat..."
            class="customer-table__search-input"
            @input="onSearch"
          >
        </div>
        <button
          class="customer-table__add-btn"
          @click="$emit('add-customer')"
        >
          Přidat zákazníka
        </button>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="customer-table__loading"
    >
      Loading...
    </div>

    <table
      v-else-if="customers && customers.length > 0"
      class="customer-table__table"
    >
      <thead>
        <tr>
          <th>Jméno</th>
          <th>Email</th>
          <th>Telefon</th>
          <th>Adresa</th>
          <th>Skupiny</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in customers"
          :key="customer.id"
          class="customer-table__row"
        >
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone || '-' }}</td>
          <td>{{ customer.address || '-' }}</td>
          <td>
            <div class="customer-table__groups">
              <span
                v-for="group in getCustomerGroups(customer)"
                :key="group.id"
                class="customer-table__group-tag"
              >
                {{ trimString(group.name, 25) }}
              </span>
              <span v-if="getCustomerGroups(customer)?.length === 0">-</span>
            </div>
          </td>
          <td>
            <div class="customer-table__row-actions">
              <button
                class="customer-table__edit-btn"
                @click="$emit('edit-customer', customer)"
              >
                Upravit
              </button>
              <button
                class="customer-table__delete-btn"
                @click="$emit('delete-customer', customer)"
              >
                Smazat
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-else
      class="customer-table__empty"
    >
      Žádní zákazníci nebyli nalezeni.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCustomerStore } from '~/stores/customerStore'
import { useCustomerGroupStore } from '~/stores/customerGroupStore'
import type { Customer, CustomerGroup } from '~/types'
import trimString from '~/utils/stringTrimmer'

const props = defineProps<{
  customers: Customer[]
  isLoading?: boolean
}>()

const isLoading = computed(() => props.isLoading ?? false)

const emit = defineEmits<{
  'add-customer': []
  'edit-customer': [customer: Customer]
  'delete-customer': [customer: Customer]
  'search': [query: string]
}>()

const searchQuery = ref('')
const customerStore = useCustomerStore()
const groupStore = useCustomerGroupStore()

onMounted(() => {
  if (!groupStore.groups || groupStore.groups.length === 0) {
    groupStore.fetchGroups()
  }
})

function getCustomerGroups(customer: Customer): CustomerGroup[] {
  if (!groupStore.groups) return []
  return groupStore.groups.filter(group =>
    group.customers?.some((c: Customer) => c.id === customer.id) || false,
  )
}

function onSearch(): void {
  emit('search', searchQuery.value)
}
</script>

<style lang="scss" scoped>
@import "~/assets/sass/_variables.scss";

.customer-table {
  background-color: $white;
  border-radius: $border-radius-large;
  box-shadow: 0 2px 5px $shadow-color;
  padding: $large-spacing;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $large-spacing;
  }

  &__title {
    margin: 0;
    font-size: $header-font-size;
  }

  &__actions {
    display: flex;
    gap: $standard-spacing;
    align-items: center;
  }

  &__search-input {
    padding: 0.6rem 0.8rem;
    border: 1px solid $text-secondary;
    border-radius: $border-radius;
    font-size: $small-font-size;
    min-width: 250px;
  }

  &__add-btn {
    background-color: $primary;
    color: $white;
    border: none;
    border-radius: $border-radius;
    padding: 0.6rem $standard-spacing;
    cursor: pointer;
    font-weight: $font-weight-medium;

    &:hover {
      background-color: $primary-hover;
    }
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 0.8rem;
      text-align: left;
      border-bottom: 1px solid $bg-light;
    }

    th {
      font-weight: $font-weight-semibold;
      color: $text-secondary;
    }
  }

  &__row {
    &:hover {
      background-color: $bg-light;
    }
  }

  &__groups {
    display: flex;
    flex-wrap: wrap;
    gap: $small-spacing;
  }

  &__group-tag {
    background-color: $bg-light;
    color: $text-secondary;
    font-size: 0.8rem;
    padding: 0.2rem $small-spacing;
    border-radius: $border-radius;
  }

  &__row-actions {
    display: flex;
    gap: $small-spacing;
  }

  &__edit-btn,
  &__delete-btn {
    background: none;
    border: none;
    font-size: $small-font-size;
    cursor: pointer;
    padding: 0.3rem $small-spacing;
    border-radius: $border-radius;
  }

  &__edit-btn {
    color: #4299e1;

    &:hover {
      background-color: $info-hover-bg;
    }
  }

  &__delete-btn {
    color: $danger;

    &:hover {
      background-color: $danger-hover-bg;
    }
  }

  &__loading,
  &__empty {
    padding: $xl-spacing;
    text-align: center;
    color: $text-secondary;
  }
}
</style>
