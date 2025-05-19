<template>
  <div class="customer-groups-page">
    <CustomerGroupTable
      :groups="groups"
      :is-loading="groupStore.loading"
      @add-group="openAddModal"
      @edit-group="openEditModal"
      @delete-group="openDeleteConfirmation"
      @search="handleSearch"
    />

    <CustomerModal
      :show="showModal"
      @close="closeModal"
    >
      <CustomerGroupForm
        :group="selectedGroup"
        :is-edit="isEditing"
        @submit="handleFormSubmit"
        @cancel="closeModal"
      />
    </CustomerModal>

    <ConfirmDialog
      :show="showConfirmDialog"
      title="Odstranit skupinu"
      :message="`Opravdu chcete odstranit skupinu '${selectedGroup?.name}'?`"
      confirm-text="Odstranit"
      cancel-text="Zrušit"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCustomerGroupStore } from '~/stores/customerGroupStore'
import type { CustomerGroup } from '~/types'
import CustomerGroupTable from '~/components/customerGroup/CustomerGroupTable.vue'
import CustomerGroupForm from '~/components/customerGroup/CustomerGroupForm.vue'
import CustomerModal from '~/components/customer/CustomerModal.vue'
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue'
import type { CustomerGroupFormData } from '~/schemas/customerGroups'
import { useAsyncData } from '#app'

const groupStore = useCustomerGroupStore()

const { pending } = useAsyncData('customerGroups', async () => {
  await groupStore.fetchGroups()
  return true
})

const groups = computed(() => groupStore.groups || [])
const showModal = ref(false)
const showConfirmDialog = ref(false)
const isEditing = ref(false)
const selectedGroup = ref<CustomerGroup | null>(null)
const searchQuery = ref('')

onMounted(async () => {
  if (groupStore.groups.length === 0) {
    await groupStore.fetchGroups()
  }
})

function openAddModal(): void {
  isEditing.value = false
  selectedGroup.value = null
  showModal.value = true
}

function openEditModal(group: CustomerGroup): void {
  isEditing.value = true
  selectedGroup.value = group
  showModal.value = true
}

function closeModal(): void {
  showModal.value = false
}

function openDeleteConfirmation(group: CustomerGroup): void {
  selectedGroup.value = group
  showConfirmDialog.value = true
}

function cancelDelete(): void {
  showConfirmDialog.value = false
  selectedGroup.value = null
}

async function confirmDelete(): Promise<void> {
  if (selectedGroup.value) {
    try {
      const result = await groupStore.deleteGroup(selectedGroup.value.id)
    }
    catch (error) {
      console.error(error)
    }

    showConfirmDialog.value = false
    selectedGroup.value = null
  }
}

async function handleFormSubmit(formData: CustomerGroupFormData): Promise<void> {
  try {
    if (isEditing.value && selectedGroup.value) {
      const result = await groupStore.updateGroup(selectedGroup.value.id, formData)
    }
    else {
      const result = await groupStore.createGroup(formData)
    }
    closeModal()
  }
  catch (error) {
    console.error(error)
  }
}

async function handleSearch(query: string): Promise<void> {
  searchQuery.value = query
  await groupStore.fetchGroups({
    name: query,
    description: query,
  })
}
</script>
