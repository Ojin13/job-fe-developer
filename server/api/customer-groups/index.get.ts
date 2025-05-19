import { getCustomerGroups } from '~/server/services/customerGroups'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const groups = await getCustomerGroups()

    if (query.name) {
      return groups.filter((group) => {
        let matches = true
        if (query.name && typeof query.name === 'string') {
          matches = matches && group.name.toLowerCase().includes(query.name.toLowerCase())
        }
        return matches
      })
    }

    return groups
  }
  catch (error: any) {
    return await getCustomerGroups()
  }
})
