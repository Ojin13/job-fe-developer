import { buildUrl, handleResponse, type QueryParams } from './api'
import type { Customer } from '~/types'

interface CustomerFilters extends QueryParams {
  name?: string
}

export const customerService = {
  async getCustomers(filters: CustomerFilters = {}) {
    const url = buildUrl('/api/customers', filters)
    const { data, error } = await useFetch<Customer[]>(url)
    return handleResponse<Customer[]>(data, error)
  },

  async createCustomer(customerData: Customer) {
    const { data, error } = await useFetch<Customer>('/api/customers', {
      method: 'POST',
      body: customerData,
    })
    return handleResponse<Customer>(data, error)
  },

  async updateCustomer(id: string, customerData: Customer) {
    const { data, error } = await useFetch<Customer>(`/api/customers/${id}`, {
      method: 'PUT',
      body: customerData,
    })
    return handleResponse<Customer>(data, error)
  },

  async deleteCustomer(id: string) {
    const { data, error } = await useFetch<boolean>(`/api/customers/${id}`, {
      method: 'DELETE',
    })
    return handleResponse<boolean>(data, error)
  },
}
