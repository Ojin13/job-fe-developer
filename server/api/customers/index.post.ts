import { createCustomer } from '~/server/services/customers'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const newCustomer = await createCustomer({
    name: body.name,
    email: body.email,
    phone: body.phone || '',
    address: body.address || '',
  })

  setResponseStatus(event, 201)
  return newCustomer
})
