import { getCustomers } from '~/server/services/customers'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const customers = await getCustomers()

    if (query.name) {
      return customers.filter((customer) => {
        let matches = true
        if (query.name && typeof query.name === 'string') {
          matches = matches && customer.name.toLowerCase().includes(query.name.toLowerCase())
        }

        return matches
      })
    }

    return customers
  }
  catch (error: any) {
    return await getCustomers()
  }
})
