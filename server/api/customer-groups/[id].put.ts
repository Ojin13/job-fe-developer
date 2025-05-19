import { updateCustomerGroup } from '~/server/services/customerGroups'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const groupId = params.id

  const body = await readBody(event)

  const updatedGroup = await updateCustomerGroup(groupId, body)

  if (!updatedGroup) {
    throw createError({
      statusCode: 404,
      message: 'Customer group not found',
    })
  }

  return updatedGroup
})
