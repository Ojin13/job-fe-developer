import { removeCustomerFromGroup } from '~/server/services/customerGroups'

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

  const updatedGroup = await removeCustomerFromGroup(groupId, customerId)

  if (!updatedGroup) {
    throw createError({
      statusCode: 404,
      message: 'Group not found',
    })
  }

  return updatedGroup
})
