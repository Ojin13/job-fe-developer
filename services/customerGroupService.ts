import { buildUrl, handleResponse, type QueryParams } from './api'
import type { CustomerGroup } from '~/types'

interface CustomerGroupFilters extends QueryParams {
  name?: string
}

export const customerGroupService = {

  async getGroups(filters: CustomerGroupFilters = {}) {
    const url = buildUrl('/api/customer-groups', filters)
    const { data, error } = await useFetch<CustomerGroup[]>(url)
    return handleResponse<CustomerGroup[]>(data, error)
  },

  async createGroup(groupData: CustomerGroup) {
    const { data, error } = await useFetch<CustomerGroup>('/api/customer-groups', {
      method: 'POST',
      body: groupData,
    })
    return handleResponse<CustomerGroup>(data, error)
  },

  async updateGroup(id: string, groupData: CustomerGroup) {
    const { data, error } = await useFetch<CustomerGroup>(`/api/customer-groups/${id}`, {
      method: 'PUT',
      body: groupData,
    })
    return handleResponse<CustomerGroup>(data, error)
  },

  async deleteGroup(id: string) {
    const { data, error } = await useFetch<boolean>(`/api/customer-groups/${id}`, {
      method: 'DELETE',
    })
    return handleResponse<boolean>(data, error)
  },

  async addCustomerToGroup(groupId: string, customerId: string) {
    const { data, error } = await useFetch<CustomerGroup>(`/api/customer-groups/${groupId}/customers`, {
      method: 'POST',
      body: { customerId },
    })
    return handleResponse<CustomerGroup>(data, error)
  },

  async removeCustomerFromGroup(groupId: string, customerId: string) {
    const { data, error } = await useFetch<CustomerGroup>(`/api/customer-groups/${groupId}/customers`, {
      method: 'DELETE',
      body: { customerId },
    })
    return handleResponse<CustomerGroup>(data, error)
  },
}
