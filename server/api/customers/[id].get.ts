import { getCustomerById } from '~/server/services/customers'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const customerId = params.id

  const customer = await getCustomerById(customerId)

  if (!customer) {
    throw createError({
      statusCode: 404,
      message: 'Customer not found',
    })
  }

  return customer
})
