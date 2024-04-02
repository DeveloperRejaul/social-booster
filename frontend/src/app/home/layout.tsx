import React from 'react'

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children}:IRootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
