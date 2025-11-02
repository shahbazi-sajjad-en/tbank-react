"use client"

import { Geist, Geist_Mono } from "next/font/google"
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

// Theme
// import ThemeComponent from "src/@core/theme/ThemeComponent"
import ThemeComponent from '../../@core/theme/ThemeComponent'


// Others
import { PersistGate } from "redux-persist/integration/react"
import themeConfig from "src/configs/themeConfig"
// import { AuthProvider } from "src/context/AuthContext"
import { AuthProvider } from '../../context/AuthContext'
import UserLayout from "src/layouts/UserLayout"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const clientSideEmotionCache = createEmotionCache()

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: React.ReactNode
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  // if (guestGuard) {
  //   return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  // } else if (!guestGuard && !authGuard) {
  //   return <>{children}</>
  // } else {
  //   return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  // }
  return <>{children}</>
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const authGuard = false
  const guestGuard = false


  return (
    <html lang="fa" dir="rtl"  >
      <body dir="rtl" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CacheProvider value={clientSideEmotionCache}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SettingsProvider>
                <SettingsConsumer>

                  {({ settings }) => (
                    <ThemeComponent settings={settings}>
                      <AuthProvider>

                        <Guard authGuard={authGuard} guestGuard={guestGuard}>

                            <UserLayout>

                              {children}

                            </UserLayout>
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
