import { randomUUID } from 'crypto'
import { useStorage } from 'nitropack/runtime'
import { getCustomers } from './customers'
import type { CustomerGroup } from '~/types'

export async function getCustomerGroups(): Promise<CustomerGroup[]> {
  const groups = await useStorage().getItem<CustomerGroup[]>('customerGroups')
  return groups || []
}

export async function getCustomerGroupById(id: string): Promise<CustomerGroup | undefined> {
  const groups = await getCustomerGroups()
  return groups.find(group => group.id === id)
}

export async function createCustomerGroup(groupData: any): Promise<CustomerGroup> {
  const groups = await getCustomerGroups()
  const newGroup: CustomerGroup = {
    id: randomUUID(),
    ...groupData,
    customers: [],
    createdAt: new Date(),
  }

  await useStorage().setItem('customerGroups', [...groups, newGroup])
  return newGroup
}

export async function updateCustomerGroup(
  id: string,
  groupData: CustomerGroup,
): Promise<CustomerGroup | null> {
  const groups = await getCustomerGroups()
  const groupIndex = groups.findIndex(group => group.id === id)

  if (groupIndex === -1) {
    return null
  }

  const updatedGroup = {
    ...groups[groupIndex],
    ...groupData,
  }

  groups[groupIndex] = updatedGroup
  await useStorage().setItem('customerGroups', groups)

  return updatedGroup
}

export async function deleteCustomerGroup(id: string): Promise<boolean> {
  const groups = await getCustomerGroups()
  const filteredGroups = groups.filter(group => group.id !== id)

  if (filteredGroups.length === groups.length) {
    return false
  }

  await useStorage().setItem('customerGroups', filteredGroups)
  return true
}

export async function addCustomerToGroup(groupId: string, customerId: string): Promise<CustomerGroup | null> {
  const customers = await getCustomers()
  const customer = customers.find((c: any) => c.id === customerId)

  if (!customer) {
    return null
  }

  const groups = await getCustomerGroups()
  const groupIndex = groups.findIndex(group => group.id === groupId)

  if (groupIndex === -1) {
    return null
  }

  if (!groups[groupIndex].customers) {
    groups[groupIndex].customers = []
  }

  if (groups[groupIndex].customers.some((c: any) => c.id === customerId)) {
    return groups[groupIndex]
  }

  groups[groupIndex].customers.push(customer)

  await useStorage().setItem('customerGroups', groups)
  return groups[groupIndex]
}

export async function removeCustomerFromGroup(groupId: string, customerId: string): Promise<CustomerGroup | null> {
  const groups = await getCustomerGroups()
  const groupIndex = groups.findIndex(group => group.id === groupId)

  if (groupIndex === -1) {
    return null
  }

  if (!groups[groupIndex].customers) {
    groups[groupIndex].customers = []
    return groups[groupIndex]
  }

  const initialLength = groups[groupIndex].customers.length
  groups[groupIndex].customers = groups[groupIndex].customers.filter((c: any) => c.id !== customerId)

  if (groups[groupIndex].customers.length === initialLength) {
    return groups[groupIndex]
  }

  await useStorage().setItem('customerGroups', groups)

  return groups[groupIndex]
}
