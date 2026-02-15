'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@clerk/nextjs'
import useSWR from 'swr'

interface AuthContextType {
  apiKey: string | null
  isLoading: boolean
  error: Error | null
  user: any | null
  namespace: any | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { getToken, isLoaded } = useAuth()

  const { data, error, isLoading } = useSWR(
    isLoaded ? '/auth/me' : null,
    async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token')

      // Uses Next.js rewrite: /api/v1/* → backend /v1/*
      const response = await fetch('/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`)
      }

      return response.json()
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const value: AuthContextType = {
    apiKey: data?.api_keys?.[0]?.key || null,
    isLoading: !isLoaded || isLoading,
    error: error || null,
    user: data?.user || null,
    namespace: data?.namespace || null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthBridge() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthBridge must be used within AuthProvider')
  }
  return context
}
