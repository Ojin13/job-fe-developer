import { defineStore } from 'pinia'
import { customerGroupService } from '~/services/customerGroupService'
import type { CustomerGroup } from '~/types'

export interface CustomerGroupState {
  groups: CustomerGroup[]
  loading: boolean
  error: string | null
}

export const useCustomerGroupStore = defineStore('customerGroup', {
  state: (): CustomerGroupState => ({
    groups: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchGroups(filters: { name?: string, description?: string } = {}) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await customerGroupService.getGroups(filters)

        if (error) {
          throw error
        }

        this.groups = data || []
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při načítání skupin zákazníků'
      }
      finally {
        this.loading = false
      }
    },

    async createGroup(groupData: CustomerGroup) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await customerGroupService.createGroup(groupData)

        if (error) {
          throw error
        }

        const newGroup = data as CustomerGroup
        this.groups.push(newGroup)
        return newGroup
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při vytváření skupiny'
        return null
      }
      finally {
        this.loading = false
      }
    },

    async updateGroup(id: string, groupData: CustomerGroup) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await customerGroupService.updateGroup(id, groupData)

        if (error) {
          throw error
        }

        const updatedGroup = data as CustomerGroup

        const index = this.groups.findIndex(g => g.id === id)
        if (index !== -1) {
          this.groups[index] = updatedGroup
        }

        return updatedGroup
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při aktualizaci skupiny'
        return null
      }
      finally {
        this.loading = false
      }
    },

    async deleteGroup(id: string) {
      this.loading = true
      this.error = null

      try {
        const { error } = await customerGroupService.deleteGroup(id)

        if (error) {
          throw error
        }

        this.groups = this.groups.filter(g => g.id !== id)

        return true
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při odstraňování skupiny'
        return false
      }
      finally {
        this.loading = false
      }
    },

    async addCustomerToGroup(groupId: string, customerId: string) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await customerGroupService.addCustomerToGroup(groupId, customerId)

        if (error) {
          throw error
        }

        const updatedGroup = data as CustomerGroup

        const index = this.groups.findIndex(g => g.id === groupId)
        if (index !== -1) {
          this.groups[index] = updatedGroup
        }

        return updatedGroup
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při přidávání zákazníka do skupiny'
        return null
      }
      finally {
        this.loading = false
      }
    },

    async removeCustomerFromGroup(groupId: string, customerId: string) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await customerGroupService.removeCustomerFromGroup(groupId, customerId)

        if (error) {
          throw error
        }

        const updatedGroup = data as CustomerGroup

        const index = this.groups.findIndex(g => g.id === groupId)
        if (index !== -1) {
          this.groups[index] = updatedGroup
        }

        return updatedGroup
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Neznámá chyba při odebírání zákazníka ze skupiny'
        return null
      }
      finally {
        this.loading = false
      }
    },
  },
})
