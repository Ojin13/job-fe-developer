import { addCustomerToGroup } from '~/server/services/customerGroups'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const groupId = params.id

  const body = await readBody(event)
  const customerId = body.customerId

  if (!customerId) {
    throw createError({
      statusCode: 400,
      message: 'Customer ID is required',
    })
  }

  const updatedGroup = await addCustomerToGroup(groupId, customerId)

  if (!updatedGroup) {
    throw createError({
      statusCode: 404,
      message: 'Customer or group not found',
    })
  }

  return updatedGroup
})
