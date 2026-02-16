import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'

export function useAPIKeys(isReady: boolean) {
  const { data, error, mutate, isLoading } = useSWR(
    isReady ? '/v1/api-keys' : null,
    () => apiClient.getAPIKeys()
  )

  return {
    apiKeys: data?.api_keys || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useCreateAPIKey(isReady: boolean) {
  const { mutate } = useAPIKeys(isReady)

  const createAPIKey = async (data: {
    namespace_id: string
    name: string
    is_read_only?: boolean
    rate_limit_rpm?: number
  }) => {
    const result = await apiClient.createAPIKey(data)
    mutate()
    return result
  }

  return { createAPIKey }
}

export function useRevokeAPIKey(isReady: boolean) {
  const { mutate } = useAPIKeys(isReady)

  const revokeAPIKey = async (keyId: string) => {
    await apiClient.revokeAPIKey(keyId)
    mutate()
  }

  return { revokeAPIKey }
}
