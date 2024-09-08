import React from 'react';
import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Haus',
  description: 'A real estate marketplace where users can browse home listings, schedule tours, and make offers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
