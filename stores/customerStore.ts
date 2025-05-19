import { defineStore } from 'pinia'
import { customerService } from '~/services/customerService'
import type { Customer } from '~/types'

export interface CustomerState {
  customers: Customer[]
  loading: boolean
  error: string | null
  selectedCustomer: Customer | null
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    customers: [],
    loading: false,
    error: null,
    selectedCustomer: null,
  }),

  actions: {
    async fetchCustomers(filters: { name?: string } = {}) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await customerService.getCustomers(filters)

        if (error) {
          throw error
        }

        this.customers = data || []
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při načítání zákazníků'
      }
      finally {
        this.loading = false
      }
    },

    async createCustomer(customer: Customer) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await customerService.createCustomer(customer)

        if (error) {
          throw error
        }

        const newCustomer = data as Customer
        this.customers.push(newCustomer)
        return newCustomer
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při vytváření zákazníka'
        return null
      }
      finally {
        this.loading = false
      }
    },

    async updateCustomer(id: string, customerData: Customer) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await customerService.updateCustomer(id, customerData)

        if (error) {
          throw error
        }

        const updatedCustomer = data as Customer

        const index = this.customers.findIndex(c => c.id === id)
        if (index !== -1) {
          this.customers[index] = updatedCustomer
        }

        if (this.selectedCustomer?.id === id) {
          this.selectedCustomer = updatedCustomer
        }

        return updatedCustomer
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při aktualizaci zákazníka'
        return null
      }
      finally {
        this.loading = false
      }
    },

    async deleteCustomer(id: string) {
      this.loading = true
      this.error = null

      try {
        const { error } = await customerService.deleteCustomer(id)

        if (error) {
          throw error
        }

        this.customers = this.customers.filter(c => c.id !== id)

        if (this.selectedCustomer?.id === id) {
          this.selectedCustomer = null
        }

        return true
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při odstraňování zákazníka'
        return false
      }
      finally {
        this.loading = false
      }
    },
  },
})
