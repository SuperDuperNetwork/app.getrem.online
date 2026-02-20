'use client'

import { UserButton, SignedIn } from '@clerk/nextjs'
import { Bell, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/dashboard/sidebar'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/collections': 'Collections',
  '/dashboard/api-keys': 'API Keys',
  '/dashboard/usage': 'Usage',
  '/dashboard/billing': 'Billing',
  '/dashboard/settings': 'Settings',
}

export default function Header() {
  const { setIsOpen } = useSidebar()
  const pathname = usePathname()
  const title = pageTitles[pathname]
    || (pathname.startsWith('/dashboard/collections/') ? 'Collection Details' : 'Dashboard')

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
