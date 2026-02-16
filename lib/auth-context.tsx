'use client'

import { createContext, useContext, useCallback, ReactNode } from 'react'
import { useAuth } from '@clerk/nextjs'
import useSWR from 'swr'

interface AuthContextType {
  token: string | null
  isLoading: boolean
  error: Error | null
  user: any | null
  namespace: any | null
  apiKeys: any[]
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

  // Memoize getToken so hooks can call it for fresh tokens
  const getCachedToken = useCallback(async () => {
    return await getToken()
  }, [getToken])

  // Store getToken on window for api-client to access
  if (typeof window !== 'undefined') {
    ;(window as any).__clerkGetToken = getCachedToken
  }

  const value: AuthContextType = {
    token: isLoaded ? 'clerk-session' : null, // Marker that auth is ready
    isLoading: !isLoaded || isLoading,
    error: error || null,
    user: data ? {
      id: data.user_id,
      email: data.email,
      name: data.name,
      is_verified: data.is_verified,
      created_at: data.created_at,
    } : null,
    namespace: data?.namespaces?.[0] || null,
    apiKeys: data?.api_keys || [],
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
