import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'

export function useCreditBalance(apiKey: string) {
  const { data, error, mutate, isLoading } = useSWR(
    apiKey ? '/v1/usage/credit-balance' : null,
    () => apiClient.getCreditBalance(apiKey)
  )

  return {
    creditBalance: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useUsageSummary(apiKey: string) {
  const { data, error, mutate, isLoading } = useSWR(
    apiKey ? '/v1/usage/summary' : null,
    () => apiClient.getUsageSummary(apiKey)
  )

  return {
    usageSummary: data,
    isLoading,
    isError: error,
    mutate,
  }
}
