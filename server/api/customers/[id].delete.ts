import { deleteCustomer } from '~/server/services/customers'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const customerId = params.id

  const result = await deleteCustomer(customerId)

  if (!result) {
    throw createError({
      statusCode: 404,
      message: 'Customer not found',
    })
  }

  setResponseStatus(event, 204)
  return null
})
