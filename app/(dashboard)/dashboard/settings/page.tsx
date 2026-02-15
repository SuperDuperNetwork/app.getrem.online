'use client'

import { useState } from 'react'
import { UserProfile } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthBridge } from '@/lib/auth-context'

export default function SettingsPage() {
  const { namespace } = useAuthBridge()
  const [deleting, setDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      'Are you absolutely sure you want to delete your account? This will permanently delete all your collections, vectors, and data. This action cannot be undone.'
    )
    if (!confirmed) return

    const doubleConfirm = prompt('Type "DELETE" to confirm account deletion:')
    if (doubleConfirm !== 'DELETE') {
      alert('Account deletion cancelled.')
      return
    }

    setDeleting(true)
    try {
      // TODO: Call backend API to delete account
      // This should soft-delete the user and all associated data
      alert('Account deletion is not yet implemented. Please contact support.')
    } catch (err: any) {
      alert(err.message || 'Failed to delete account')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      {/* Profile (Clerk) */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <UserProfile
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none border-0 w-full',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Namespace Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Namespace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Namespace Name</label>
            <input
              type="text"
              defaultValue={namespace?.name || 'default'}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
              disabled
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Namespace name cannot be changed after creation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all data. This cannot be undone.
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={handleDeleteAccount} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete Account'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
