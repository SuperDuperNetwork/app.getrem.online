import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'

export function useCollections(apiKey: string) {
  const { data, error, mutate, isLoading } = useSWR(
    apiKey ? '/v1/collections' : null,
    () => apiClient.getCollections(apiKey)
  )

  return {
    collections: data?.collections || [],
    hasMore: data?.has_more || false,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useCreateCollection(apiKey: string) {
  const { mutate } = useCollections(apiKey)

  const createCollection = async (data: {
    name: string
    dimension: number
    metric: string
    replication_factor?: number
    description?: string
  }) => {
    const result = await apiClient.createCollection(apiKey, data)
    mutate()
    return result
  }

  return { createCollection }
}

export function useDeleteCollection(apiKey: string) {
  const { mutate } = useCollections(apiKey)

  const deleteCollection = async (id: string) => {
    await apiClient.deleteCollection(apiKey, id)
    mutate()
  }

  return { deleteCollection }
}
