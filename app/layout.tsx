import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'


const inter = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Royal Honda',
  description: 'Invoices System',
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
