import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'

export function useAPIKeys(apiKey: string) {
  const { data, error, mutate, isLoading } = useSWR(
    apiKey ? '/v1/api-keys' : null,
    () => apiClient.getAPIKeys(apiKey)
  )

  return {
    apiKeys: data?.api_keys || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useCreateAPIKey(apiKey: string) {
  const { mutate } = useAPIKeys(apiKey)

  const createAPIKey = async (data: {
    namespace_id: string
    name: string
    is_read_only?: boolean
    rate_limit_rpm?: number
  }) => {
    const result = await apiClient.createAPIKey(apiKey, data)
    mutate()
    return result
  }

  return { createAPIKey }
}

export function useRevokeAPIKey(apiKey: string) {
  const { mutate } = useAPIKeys(apiKey)

  const revokeAPIKey = async (keyId: string) => {
    await apiClient.revokeAPIKey(apiKey, keyId)
    mutate()
  }

  return { revokeAPIKey }
}
