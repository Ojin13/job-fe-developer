import { randomUUID } from 'crypto'
import { useStorage } from 'nitropack/runtime'
import type { Customer, CustomerGroup } from '~/types'

export async function getCustomers(): Promise<Customer[]> {
  const customers = await useStorage().getItem<Customer[]>('customers')
  return customers || []
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  const customers = await getCustomers()
  return customers.find(customer => customer.id === id)
}

export async function createCustomer(customerData: any): Promise<Customer> {
  const customers = await getCustomers()
  const newCustomer: Customer = {
    id: randomUUID(),
    ...customerData,
    createdAt: new Date(),
  }

  await useStorage().setItem('customers', [...customers, newCustomer])
  return newCustomer
}

export async function updateCustomer(id: string, customerData: Customer): Promise<Customer | null> {
  const customers = await getCustomers()
  const customerIndex = customers.findIndex(customer => customer.id === id)

  if (customerIndex === -1) {
    return null
  }

  const updatedCustomer = {
    ...customers[customerIndex],
    ...customerData,
  }

  customers[customerIndex] = updatedCustomer
  await useStorage().setItem('customers', customers)

  return updatedCustomer
}

export async function deleteCustomer(id: string): Promise<boolean> {
  const customers = await getCustomers()
  const filteredCustomers = customers.filter(customer => customer.id !== id)

  if (filteredCustomers.length === customers.length) {
    return false
  }

  await useStorage().setItem('customers', filteredCustomers)

  const customerGroups = await useStorage().getItem<CustomerGroup[]>('customerGroups') || []
  const updatedGroups = customerGroups.map(group => ({
    ...group,
    customers: group.customers?.filter(customer => customer.id !== id) || [],
  }))

  await useStorage().setItem('customerGroups', updatedGroups)

  return true
}
