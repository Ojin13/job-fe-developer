import { updateCustomer } from '~/server/services/customers'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const customerId = params.id

  const body = await readBody(event)

  const updatedCustomer = await updateCustomer(customerId, body)

  if (!updatedCustomer) {
    throw createError({
      statusCode: 404,
      message: 'Customer not found',
    })
  }

  return updatedCustomer
})
