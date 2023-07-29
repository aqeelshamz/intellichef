"use client";
import './globals.css'
import { Golos_Text } from 'next/font/google'

const golos = Golos_Text({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: 'IntelliChef',
  description: 'Your AI-powered personal chef',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" data-theme="bumblebee">
      <body className={golos.className}>
        {children}
      </body>
    </html>
  )
}
