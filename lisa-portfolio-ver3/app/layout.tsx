import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lisa · IT Project Manager',
  description: 'AX 시대의 IT 프로젝트 매니저 포트폴리오',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="bg-grid" />
        <div className="scan-line" />
        {children}
      </body>
    </html>
  )
}
