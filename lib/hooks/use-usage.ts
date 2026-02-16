import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'

export function useCreditBalance(isReady: boolean) {
  const { data, error, mutate, isLoading } = useSWR(
    isReady ? '/v1/usage/credit-balance' : null,
    () => apiClient.getCreditBalance()
  )

  return {
    creditBalance: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useUsageSummary(isReady: boolean) {
  const { data, error, mutate, isLoading } = useSWR(
    isReady ? '/v1/usage/summary' : null,
    () => apiClient.getUsageSummary()
  )

  return {
    usageSummary: data,
    isLoading,
    isError: error,
    mutate,
  }
}
