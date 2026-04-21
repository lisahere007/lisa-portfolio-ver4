'use client'
import { useEffect, useState, useRef } from 'react'

export default function Hero() {
  const [lang, setLang] = useState<'en' | 'kr'>('en')
  const [typed, setTyped] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  const fullText = lang === 'en'
    ? 'IT Project Manager · AX Era'
    : 'IT 프로젝트 매니저 · AX 시대'

  useEffect(() => {
    const saved = localStorage.getItem('lp_lang') as 'en' | 'kr'
    if (saved) setLang(saved)
    const handler = (e: Event) => setLang((e as CustomEvent).detail)
    window.addEventListener('langChange', handler)
    return () => window.removeEventListener('langChange', handler)
  }, [])

  useEffect(() => {
    setTyped('')
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [fullText])

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/AI와_함께하는_미래형_사무실_디자인.mp4" type="video/mp4" />
      </video>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(10,20,50,0.55) 0%, rgba(10,20,50,0.35) 50%, rgba(10,20,50,0.7) 100%)',
      }} />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(100,150,220,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(100,150,220,0.06) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '0 40px',
        maxWidth: '900px',
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: '11px',
          letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)',
          textTransform: 'uppercase', marginBottom: '28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          animation: 'fadeUp 0.8s ease 0.2s both',
        }}>
          <span style={{ width: '20px', height: '0.5px', background: 'rgba(255,255,255,0.4)', display: 'inline-block' }} />
          {lang === 'en' ? 'Identity Node · Seoul, KR' : '아이덴티티 노드 · 서울, 대한민국'}
          <span style={{ width: '20px', height: '0.5px', background: 'rgba(255,255,255,0.4)', display: 'inline-block' }} />
        </div>

        <h1 style={{
          fontSize: 'clamp(52px, 8vw, 96px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.95)',
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          marginBottom: '20px',
          animation: 'fadeUp 0.8s ease 0.4s both',
        }}>
          Lisa
        </h1>

        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(14px, 2vw, 18px)',
          color: 'rgba(255,255,255,0.65)',
          marginBottom: '32px',
          height: '28px',
          animation: 'fadeUp 0.8s ease 0.6s both',
        }}>
          <span>{typed}</span>
          <span style={{
            display: 'inline-block', width: '2px', height: '1em',
            background: 'rgba(255,255,255,0.6)', marginLeft: '2px',
            verticalAlign: 'middle', animation: 'blink 1s step-end infinite',
          }} />
        </div>

        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 17px)',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.9,
          maxWidth: '600px',
          margin: '0 auto 48px',
          animation: 'fadeUp 0.8s ease 0.8s both',
        }}>
          {lang === 'en'
            ? 'With hands-on experience in DX-driven service planning and system development, ready to lead service innovation and shape new ways of collaboration in the AX era.'
            : 'DX 기반의 서비스 기획과 시스템 구축 경험을 토대로, AX 시대에 필요한 서비스 혁신과 새로운 협업 방식을 설계하고 이끌어갑니다.'}
        </p>

        <div style={{
          display: 'flex', gap: '14px', justifyContent: 'center',
          animation: 'fadeUp 0.8s ease 1.0s both',
        }}>
          <a href="#career" className="btn-primary">
            {lang === 'en' ? 'View Work' : '경력 보기'}
          </a>
          <a href="#contact" className="btn-ghost">
            {lang === 'en' ? 'Contact' : '연락하기'}
          </a>
        </div>

        <div style={{
          display: 'flex', gap: '48px', justifyContent: 'center',
          marginTop: '72px',
          animation: 'fadeUp 0.8s ease 1.2s both',
        }}>
          {[
            { num: '6+', label: lang === 'en' ? 'Years' : '경력', idx: '01' },
            { num: '4', label: lang === 'en' ? 'Companies' : '회사', idx: '02' },
            { num: '10+', label: lang === 'en' ? 'Projects' : '프로젝트', idx: '03' },
          ].map(s => (
            <div key={s.idx} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', marginBottom: '6px' }}>{s.idx}</div>
              <div style={{ fontSize: '32px', fontWeight: 300, color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'fadeUp 1s ease 1.5s both',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>
          SCROLL
        </span>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollLine {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
      `}</style>
    </section>
  )
}
