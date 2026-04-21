'use client'
import { useEffect, useState, useRef } from 'react'

const timeline = [
  { year: '1997', age: '', event_en: 'Born', event_kr: '출생' },
  { year: '2002', age: '6', event_en: '2002 World Cup · Age 6', event_kr: '붉은악마 월드컵 · 6살' },
  { year: '2010', age: '14', event_en: 'Middle school → Singapore', event_kr: '중학교 입학 → 싱가폴 시작' },
  { year: '2016', age: '20', event_en: 'University · Jeju return · Singapore exchange', event_kr: '제주복귀 · 대학교 입학 → 싱가폴 교환학생' },
  { year: '2018', age: '22', event_en: 'Graduated · Vietnam · Cargorush begins', event_kr: '졸업 · 베트남 · Cargorush 시작' },
  { year: '2019', age: '23', event_en: 'Cargorush International Vietnam', event_kr: 'Cargorush International Vietnam' },
  { year: '2020', age: '24', event_en: 'Cargorush International Vietnam', event_kr: 'Cargorush International Vietnam' },
  { year: '2021', age: '25', event_en: 'Cargorush → Cafe24 Vietnam', event_kr: 'Cargorush → Cafe24 Vietnam' },
  { year: '2022', age: '26', event_en: 'Cafe24 Vietnam', event_kr: 'Cafe24 Vietnam' },
  { year: '2023', age: '27', event_en: 'Cafe24 Vietnam → Amoeba', event_kr: 'Cafe24 Vietnam → Amoeba' },
  { year: '2024', age: '28', event_en: 'Return to Korea · KISS begins', event_kr: '한국 복귀 · KISS 시작' },
  { year: '2025', age: '29', event_en: 'KISS Nail Products Inc.', event_kr: 'KISS Nail Products Inc.' },
  { year: '2026', age: '30', event_en: 'KISS · Present', event_kr: 'KISS · 현재' },
]

export default function About() {
  const [lang, setLang] = useState<'en' | 'kr'>('en')
  const [visible, setVisible] = useState(false)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('lp_lang') as 'en' | 'kr'
    if (saved) setLang(saved)
    const handler = (e: Event) => setLang((e as CustomEvent).detail)
    window.addEventListener('langChange', handler)
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => {
      window.removeEventListener('langChange', handler)
      obs.disconnect()
    }
  }, [])

  const t = (en: string, kr: string) => lang === 'en' ? en : kr

  return (
    <section id="about" className="section-wrap" ref={ref}>
      <div className="container">
        <div style={{
          marginBottom: '72px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
        }}>
          <div className="sys-tag" style={{ marginBottom: '16px' }}>{t('About', '소개')}</div>
          <h2 style={{
            fontSize: 'clamp(32px,4vw,56px)', fontWeight: 300,
            color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '16px',
          }}>
            {t('Who is Lisa?', '리사는 누구인가?')}
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.9, maxWidth: '600px' }}>
            {t(
              '6-year IT Project Manager with end-to-end experience from service planning, system design, development collaboration to operational stability.',
              '서비스 기획, 시스템 설계, 개발 협업 및 운영 안정화까지 End-to-End로 수행해온 6년 차 IT 프로젝트 매니저입니다.'
            )}
          </p>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transition: 'all 0.6s ease 0.2s' }}>
          <div className="sys-tag" style={{ marginBottom: '32px' }}>{t('Timeline', '타임라인')}</div>

          <div style={{ position: 'relative' }}>
            <div className="timeline-line" style={{
              position: 'absolute', left: '80px', top: 0, bottom: 0, width: '0.5px',
              background: 'linear-gradient(to bottom, transparent, var(--border) 10%, var(--border) 90%, transparent)',
            }} />

            {timeline.map((item, i) => (
              <div
                key={item.year}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '32px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.5s ease ${i * 0.04}s`,
                }}
              >
                <div style={{ textAlign: 'right', paddingTop: '16px', paddingRight: '16px', position: 'relative' }}>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 500,
                    color: activeIdx === i ? 'var(--accent)' : 'var(--text-primary)',
                    transition: 'color 0.3s',
                  }}>
                    {item.year}
                  </div>
                  {item.age && (
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {lang === 'en' ? `Age ${item.age}` : `${item.age}살`}
                    </div>
                  )}
                  <div style={{
                    position: 'absolute', right: '-5px', top: '20px',
                    width: '9px', height: '9px', borderRadius: '50%',
                    background: activeIdx === i ? 'var(--accent)' : 'var(--border)',
                    border: `2px solid ${activeIdx === i ? 'var(--accent-soft)' : 'var(--bg)'}`,
                    transition: 'all 0.3s',
                    boxShadow: activeIdx === i ? '0 0 8px rgba(26,79,216,0.4)' : 'none',
                  }} />
                </div>

                <div className="glass" style={{
                  borderRadius: '10px', padding: '14px 20px', marginBottom: '4px',
                  background: activeIdx === i ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s',
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: activeIdx === i ? 500 : 400,
                    color: activeIdx === i ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'all 0.3s',
                  }}>
                    {t(item.event_en, item.event_kr)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line { left: 16px !important; }
        }
        @media (max-width: 768px) {
          [style*="gridTemplateColumns: '80px 1fr'"] {
            grid-template-columns: 60px 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}