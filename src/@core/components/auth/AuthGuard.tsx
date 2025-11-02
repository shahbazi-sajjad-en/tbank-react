// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import (App Router)
import { useRouter, usePathname } from 'next/navigation'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const auth = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // اگر کاربر لاگین نیست و داده‌ای در localStorage نیست
    if (auth.user === null && !window.localStorage.getItem('userData')) {
      // هدایت به صفحه لاگین با returnUrl
      router.replace(`/login?returnUrl=${encodeURIComponent(pathname)}`)
    }
  }, [auth.user, router, pathname])

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
