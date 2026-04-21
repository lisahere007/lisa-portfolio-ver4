'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<'en' | 'kr'>('en')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lp_lang') as 'en' | 'kr'
    if (saved) setLang(saved)
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const setLanguage = (l: 'en' | 'kr') => {
    setLang(l)
    localStorage.setItem('lp_lang', l)
    window.dispatchEvent(new CustomEvent('langChange', { detail: l }))
  }

  const links = [
    { en: 'About', kr: '소개', href: '#about' },
    { en: 'Personality', kr: '성격', href: '#personality' },
    { en: 'Career', kr: '경력', href: '#career' },
    { en: 'FAQ', kr: 'FAQ', href: '#faq' },
    { en: 'Contact', kr: '연락', href: '#contact' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '58px',
        background: scrolled ? 'rgba(238,242,248,0.95)' : 'rgba(0,0,0,0)',
        borderBottom: scrolled ? '0.5px solid rgba(160,185,225,0.5)' : 'none',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', zIndex: 100,
        transition: 'all 0.4s ease',
      }}>
        <a href="#" style={{
          fontFamily: 'var(--mono)', fontSize: '13px', letterSpacing: '0.16em',
          color: scrolled ? 'var(--text-muted)' : 'rgba(255,255,255,0.85)',
          textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.4s',
        }}>
          Lisa · PM
        </a>

        {/* 데스크탑 메뉴 */}
        <div className="nav-desktop" style={{ display: 'flex', gap: '28px' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontFamily: 'var(--mono)', fontSize: '11px',
              color: scrolled ? 'var(--text-dim)' : 'rgba(255,255,255,0.7)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = scrolled ? 'var(--text-muted)' : 'rgba(255,255,255,1)')}
              onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--text-dim)' : 'rgba(255,255,255,0.7)')}>
              {lang === 'en' ? l.en : l.kr}
            </a>
          ))}
        </div>

        {/* 데스크탑 오른쪽 */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            background: scrolled ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)',
            border: scrolled ? '0.5px solid rgba(160,185,225,0.55)' : '0.5px solid rgba(255,255,255,0.3)',
            borderRadius: '4px', overflow: 'hidden', transition: 'all 0.4s',
          }}>
            {(['en', 'kr'] as const).map(l => (
              <button key={l} onClick={() => setLanguage(l)} style={{
                fontFamily: 'var(--mono)', fontSize: '11px', padding: '5px 12px',
                background: lang === l ? (scrolled ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)') : 'transparent',
                color: scrolled ? (lang === l ? 'var(--text-muted)' : 'var(--text-dim)') : 'rgba(255,255,255,0.85)',
                border: 'none',
                borderRight: l === 'en' ? (scrolled ? '0.5px solid rgba(160,185,225,0.55)' : '0.5px solid rgba(255,255,255,0.2)') : 'none',
                cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s',
              }}>
                {l === 'en' ? 'ENG' : 'KR'}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="live-dot" />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--green)', letterSpacing: '0.08em' }}>
              {lang === 'en' ? 'Available' : '연락가능'}
            </span>
          </div>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1.5px',
              background: scrolled ? 'var(--text-muted)' : 'rgba(255,255,255,0.85)',
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(4.5px, -4.5px)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="nav-mobile" style={{
          position: 'fixed', top: '58px', left: 0, right: 0, zIndex: 99,
          background: 'rgba(238,242,248,0.97)', backdropFilter: 'blur(24px)',
          borderBottom: '0.5px solid rgba(160,185,225,0.5)',
          padding: '16px 20px 24px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
                fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text-muted)',
                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
                padding: '14px 0', borderBottom: '0.5px solid rgba(160,185,225,0.3)',
              }}>
                {lang === 'en' ? l.en : l.kr}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <div style={{
              display: 'flex', background: 'rgba(255,255,255,0.35)',
              border: '0.5px solid rgba(160,185,225,0.55)', borderRadius: '4px', overflow: 'hidden',
            }}>
              {(['en', 'kr'] as const).map(l => (
                <button key={l} onClick={() => setLanguage(l)} style={{
                  fontFamily: 'var(--mono)', fontSize: '11px', padding: '6px 14px',
                  background: lang === l ? 'rgba(255,255,255,0.6)' : 'transparent',
                  color: lang === l ? 'var(--text-muted)' : 'var(--text-dim)',
                  border: 'none',
                  borderRight: l === 'en' ? '0.5px solid rgba(160,185,225,0.55)' : 'none',
                  cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {l === 'en' ? 'ENG' : 'KR'}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="live-dot" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--green)', letterSpacing: '0.08em' }}>
                {lang === 'en' ? 'Available' : '연락가능'}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}