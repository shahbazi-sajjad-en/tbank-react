"use client"


import "../globals.css"
// Redux
import { Provider } from "react-redux"
import { persistor, store } from "src/store"

// Emotion Cache
import { CacheProvider } from "@emotion/react"
import { createEmotionCache } from "src/@core/utils/create-emotion-cache"

// Toast
import { Toaster } from "react-hot-toast"
import ReactHotToast from "src/@core/styles/libs/react-hot-toast"

// Context Providers
import { SettingsConsumer, SettingsProvider } from "src/@core/context/settingsContext"
import { AuthProvider } from "src/context/AuthContext"

// Theme
import ThemeComponent from "src/@core/theme/ThemeComponent"


// Others
import { SessionProvider } from "next-auth/react"
import { PersistGate } from "redux-persist/integration/react"
import themeConfig from "src/configs/themeConfig"
import BlankLayout from "src/@core/layouts/BlankLayout"




export default function AuthLayout({ children }: { children: React.ReactNode }) {


  const clientSideEmotionCache = createEmotionCache()

  type GuardProps = {
    authGuard: boolean
    guestGuard: boolean
    children: React.ReactNode
  }

  const Guard = ({ children, }: GuardProps) => {
    // if (guestGuard) {
    //   return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
    // } else if (!guestGuard && !authGuard) {
    //   return <>{children}</>
    // } else {
    //   return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
    // }
    return <>{children}</>
  }
  const authGuard = false
  const guestGuard = false
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SettingsProvider>

            <SettingsConsumer>

              {({ settings }) => (
                <ThemeComponent settings={settings}>
                  <AuthProvider>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <SessionProvider>
                        <BlankLayout>{children}</BlankLayout>

                      </SessionProvider>
                    </Guard>
                  </AuthProvider>
                  <Toaster position={themeConfig.toastPosition} />
                  <ReactHotToast />
                </ThemeComponent>

              )}
            </SettingsConsumer>

          </SettingsProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>

  )
}
