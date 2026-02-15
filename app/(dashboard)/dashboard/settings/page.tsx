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
              baseTheme: undefined,
              variables: {
                colorBackground: 'hsl(222 47% 6%)',
                colorInputBackground: 'hsl(222 47% 8%)',
                colorText: 'hsl(210 40% 98%)',
                colorTextSecondary: 'hsl(215 20.2% 55%)',
                colorPrimary: 'hsl(217.2 91.2% 59.8%)',
                colorDanger: 'hsl(0 62.8% 30.6%)',
                colorInputText: 'hsl(210 40% 98%)',
                colorNeutral: 'hsl(210 40% 98%)',
                borderRadius: '0.5rem',
              },
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none border-0 w-full bg-transparent',
                navbar: 'bg-transparent border-r border-white/10',
                navbarButton: 'text-zinc-400 hover:text-white hover:bg-white/5',
                navbarButtonActive: 'text-white bg-white/10',
                pageScrollBox: 'bg-transparent',
                page: 'bg-transparent',
                profileSection: 'border-white/10',
                profileSectionTitle: 'border-white/10',
                profileSectionTitleText: 'text-zinc-300',
                profileSectionContent: 'bg-transparent',
                profileSectionPrimaryButton: 'text-blue-400 hover:text-blue-300',
                formFieldLabel: 'text-zinc-300',
                formFieldInput: 'bg-white/5 border-white/10 text-white',
                formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
                formButtonReset: 'text-zinc-400 hover:text-white',
                badge: 'bg-white/10 text-zinc-300',
                avatarBox: 'border-white/10',
                headerTitle: 'text-white',
                headerSubtitle: 'text-zinc-400',
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
