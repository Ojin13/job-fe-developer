export type QueryParams = Record<string, string | undefined | null>

export const buildUrl = (endpoint: string, params?: QueryParams): string => {
  if (!params) return endpoint

  const queryParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value)
  })

  const queryString = queryParams.toString()
  return `${endpoint}${queryString ? `?${queryString}` : ''}`
}

export const handleResponse = <T>(data: any, error: any): { data: T | null, error: Error | null } => {
  if (error.value) {
    return {
      data: null,
      error: new Error(`API Error: ${error.value.message}`),
    }
  }

  return {
    data: data.value as T,
    error: null,
  }
}
