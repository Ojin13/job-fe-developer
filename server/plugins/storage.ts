import { defineNitroPlugin, useStorage } from 'nitropack/runtime'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  Promise.all([
    storage.hasItem('customers'),
    storage.hasItem('customerGroups'),
  ]).then(([hasCustomers, hasCustomerGroups]) => {
    if (!hasCustomers) {
      storage.setItem('customers', [])
    }
    if (!hasCustomerGroups) {
      storage.setItem('customerGroups', [])
    }
  })
})
