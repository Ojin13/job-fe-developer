import { createCustomerGroup } from '~/server/services/customerGroups'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const newGroup = await createCustomerGroup({
    name: body.name,
    description: body.description,
  })

  setResponseStatus(event, 201)
  return newGroup
})
