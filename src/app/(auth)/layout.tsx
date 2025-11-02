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
// import { AuthProvider } from "src/context/AuthContext"
import { AuthProvider } from '../../context/AuthContext'

// Theme
// import ThemeComponent from "src/@core/theme/ThemeComponent"
import ThemeComponent from '../../@core/theme/ThemeComponent'


// Others
import { PersistGate } from "redux-persist/integration/react"
import BlankLayout from "src/@core/layouts/BlankLayout"
import themeConfig from "src/configs/themeConfig"




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
    <html lang="fa" dir="rtl">
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SettingsProvider>

                <SettingsConsumer>

                  {({ settings }) => (
                    <ThemeComponent settings={settings}>
                      <AuthProvider>
                        <Guard authGuard={authGuard} guestGuard={guestGuard}>
                            <BlankLayout>{children}</BlankLayout>

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
      </body>
    </html>

  )
}
