import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StackFlow | Marketing Automation Integrations',
  description: 'The ultimate comparison guide for marketing automation tools.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
