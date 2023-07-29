import React from 'react';
import Home from './home';

export const metadata = {
  title: 'IntelliChef',
  description: 'Your AI-powered personal chef',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<Home>{children}</Home>)
}
