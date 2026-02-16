import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'

export function useCollections(isReady: boolean) {
  const { data, error, mutate, isLoading } = useSWR(
    isReady ? '/v1/collections' : null,
    () => apiClient.getCollections()
  )

  return {
    collections: data?.collections || [],
    hasMore: data?.has_more || false,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useCreateCollection(isReady: boolean) {
  const { mutate } = useCollections(isReady)

  const createCollection = async (data: {
    name: string
    dimension: number
    metric: string
    replication_factor?: number
    description?: string
  }) => {
    const result = await apiClient.createCollection(data)
    mutate()
    return result
  }

  return { createCollection }
}

export function useDeleteCollection(isReady: boolean) {
  const { mutate } = useCollections(isReady)

  const deleteCollection = async (id: string) => {
    await apiClient.deleteCollection(id)
    mutate()
  }

  return { deleteCollection }
}
