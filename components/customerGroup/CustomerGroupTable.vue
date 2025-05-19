<template>
  <div class="customer-group-table">
    <div class="customer-group-table__header">
      <h2 class="customer-group-table__title">
        Skupiny zákazníků
      </h2>
      <div class="customer-group-table__actions">
        <div class="customer-group-table__search">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Vyhledat..."
            class="customer-group-table__search-input"
            @input="onSearch"
          >
        </div>
        <button
          class="customer-group-table__add-btn"
          @click="$emit('add-group')"
        >
          Přidat skupinu
        </button>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="customer-group-table__loading"
    >
      Načítání...
    </div>

    <table
      v-else-if="groups && groups.length > 0"
      class="customer-group-table__table"
    >
      <thead>
        <tr>
          <th>Název</th>
          <th>Popis</th>
          <th>Počet zákazníků</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="group in groups"
          :key="group.id"
          class="customer-group-table__row"
        >
          <td>{{ group.name ? trimString(group.name, 25) : '-' }}</td>
          <td>{{ group.description ? trimString(group.description, 25) : '-' }}</td>
          <td>{{ group.customers?.length || 0 }}</td>
          <td>
            <div class="customer-group-table__row-actions">
              <button
                class="customer-group-table__edit-btn"
                @click="$emit('edit-group', group)"
              >
                Upravit
              </button>
              <button
                class="customer-group-table__delete-btn"
                @click="$emit('delete-group', group)"
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
      class="customer-group-table__empty"
    >
      Žádné skupiny zákazníků nebyly nalezeny.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CustomerGroup } from '~/types'
import trimString from '~/utils/stringTrimmer'

const props = defineProps<{
  groups: CustomerGroup[]
  isLoading: boolean
}>()

const emit = defineEmits<{
  'add-group': []
  'edit-group': [group: CustomerGroup]
  'delete-group': [group: CustomerGroup]
  'search': [query: string]
}>()

const searchQuery = ref('')

function onSearch(): void {
  emit('search', searchQuery.value)
}
</script>

<style lang="scss" scoped>
@import "~/assets/sass/_variables.scss";

.customer-group-table {
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
