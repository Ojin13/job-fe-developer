import { getCustomerGroupById } from '~/server/services/customerGroups'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const groupId = params.id

  const group = await getCustomerGroupById(groupId)

  if (!group) {
    throw createError({
      statusCode: 404,
      message: 'Customer group not found',
    })
  }

  return group
})
