import { deleteCustomerGroup } from '~/server/services/customerGroups'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const groupId = params.id

  const result = await deleteCustomerGroup(groupId)

  if (!result) {
    throw createError({
      statusCode: 404,
      message: 'Customer group not found',
    })
  }

  setResponseStatus(event, 204)
  return null
})
