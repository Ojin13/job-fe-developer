<template>
  <div class="customers-page">
    <CustomerTable
      :customers="customers"
      :is-loading="customerStore.loading"
      @add-customer="openAddModal"
      @edit-customer="openEditModal"
      @delete-customer="openDeleteConfirmation"
      @search="handleSearch"
    />

    <CustomerModal
      :show="showModal"
      @close="closeModal"
    >
      <CustomerForm
        :customer="selectedCustomer"
        :is-edit="isEditing"
        @submit="handleFormSubmit"
        @cancel="closeModal"
      />
    </CustomerModal>

    <ConfirmDialog
      :show="showConfirmDialog"
      title="Odstranit zákazníka"
      :message="`Opravdu chcete odstranit zákazníka '${selectedCustomer?.name}'?`"
      confirm-text="Odstranit"
      cancel-text="Zrušit"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCustomerStore } from '~/stores/customerStore'
import { useCustomerGroupStore } from '~/stores/customerGroupStore'
import type { Customer } from '~/types'
import CustomerTable from '~/components/customer/CustomerTable.vue'
import CustomerForm from '~/components/customer/CustomerForm.vue'
import CustomerModal from '~/components/customer/CustomerModal.vue'
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue'
import type { CustomerFormData } from '~/schemas/customers'

const customerStore = useCustomerStore()
const groupStore = useCustomerGroupStore()

const { pending } = useAsyncData('customers', async () => {
  await Promise.all([
    customerStore.fetchCustomers(),
    groupStore.fetchGroups(),
  ])
  return true
})

const customers = computed(() => customerStore.customers || [])
const showModal = ref(false)
const showConfirmDialog = ref(false)
const isEditing = ref(false)
const selectedCustomer = ref<Customer | null>(null)
const searchQuery = ref('')

onMounted(async () => {
  if (customerStore.customers.length === 0 || groupStore.groups.length === 0) {
    await Promise.all([
      customerStore.fetchCustomers(),
      groupStore.fetchGroups(),
    ])
  }
})

function openAddModal(): void {
  isEditing.value = false
  selectedCustomer.value = null
  showModal.value = true
}

function openEditModal(customer: Customer): void {
  isEditing.value = true
  selectedCustomer.value = customer
  showModal.value = true
}

function closeModal(): void {
  showModal.value = false
}

function openDeleteConfirmation(customer: Customer): void {
  selectedCustomer.value = customer
  showConfirmDialog.value = true
}

function cancelDelete(): void {
  showConfirmDialog.value = false
  selectedCustomer.value = null
}

async function confirmDelete(): Promise<void> {
  if (selectedCustomer.value) {
    await customerStore.deleteCustomer(selectedCustomer.value.id)
    showConfirmDialog.value = false
    selectedCustomer.value = null
  }
}

async function handleFormSubmit(formData: CustomerFormData, selectedGroups: string[]): Promise<void> {
  if (isEditing.value && selectedCustomer.value) {
    const updatedCustomer = await customerStore.updateCustomer(
      selectedCustomer.value.id,
      formData,
    )

    if (updatedCustomer) {
      await updateCustomerGroups(updatedCustomer.id, selectedGroups)
    }
  }
  else {
    const newCustomer = await customerStore.createCustomer(formData)

    if (newCustomer) {
      await updateCustomerGroups(newCustomer.id, selectedGroups)
    }
  }

  closeModal()
}

async function handleSearch(query: string): Promise<void> {
  searchQuery.value = query
  await customerStore.fetchCustomers({
    name: query,
    email: query,
  })
}

async function updateCustomerGroups(customerId: string, selectedGroups: string[]): Promise<void> {
  const currentGroups = groupStore.groups.filter(group =>
    group.customers?.some((c: Customer) => c.id === customerId) || false,
  )

  const currentGroupIds = currentGroups.map(g => g.id)
  const groupsToAdd = selectedGroups.filter(id => !currentGroupIds.includes(id))
  const groupsToRemove = currentGroupIds.filter(id => !selectedGroups.includes(id))

  for (const groupId of groupsToAdd) {
    await groupStore.addCustomerToGroup(groupId, customerId)
  }

  for (const groupId of groupsToRemove) {
    await groupStore.removeCustomerFromGroup(groupId, customerId)
  }
}
</script>
