import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'


const inter = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Study Tracker',
  description: 'A small system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root">
            <AuthContext>
                <ToasterContext />
                {children}
            </AuthContext>
        </div>
      </body>
    </html>
  )
}
