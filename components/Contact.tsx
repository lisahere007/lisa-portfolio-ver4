'use client'
import { useEffect, useState, useRef } from 'react'

export default function Contact() {
  const [lang, setLang] = useState<'en' | 'kr'>('en')
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [oops, setOops] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('lp_lang') as 'en' | 'kr'
    if (saved) setLang(saved)
    const handler = (e: Event) => setLang((e as CustomEvent).detail)
    window.addEventListener('langChange', handler)
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => {
      window.removeEventListener('langChange', handler)
      obs.disconnect()
    }
  }, [])

  const t = (en: string, kr: string) => lang === 'en' ? en : kr
  const copyEmail = () => {
    navigator.clipboard.writeText('sunday24vibe@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statusItems = [
    { label: t('Availability', '가용성'), value: t('Open to opportunities', '기회에 열려 있음') },
    { label: t('Response time', '응답 시간'), value: t('Within 24h', '24시간 이내') },
    { label: t('Timezone', '시간대'), value: 'KST (UTC+9)' },
    { label: t('Location', '위치'), value: t('Seoul, South Korea', '서울, 대한민국') },
    { label: t('Languages', '언어'), value: t('Korean, English', '한국어, 영어') },
  ]

  return (
    <section id="contact" className="section-wrap" ref={ref}>
      <div className="container">
        <div style={{ marginBottom: '64px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <div className="sys-tag" style={{ marginBottom: '16px' }}>{t('Contact Node', '연락처 노드')}</div>
          <h2 style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            {t("Let's Talk", '연락해요')}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '900px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            <div className="glass" style={{ borderRadius: '14px', padding: '28px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0s' }}>
              <div className="corner corner-tl" /><div className="corner corner-br" />
              <div className="sys-tag" style={{ marginBottom: '14px', fontSize: '10px' }}>Email</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '6px' }}>{t('Primary Channel', '주요 채널')}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '15px', color: 'var(--text-primary)' }}>sunday24vibe@gmail.com</div>
                </div>
                <button onClick={copyEmail} style={{ fontFamily: 'var(--mono)', fontSize: '11px', padding: '7px 16px', borderRadius: '5px', whiteSpace: 'nowrap', cursor: 'pointer', background: copied ? 'rgba(15,138,90,0.08)' : 'rgba(255,255,255,0.4)', border: copied ? '0.5px solid rgba(15,138,90,0.35)' : '0.5px solid var(--border)', color: copied ? 'var(--green)' : 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s' }}>
                  {copied ? t('Copied', '복사됨') : t('Copy', '복사')}
                </button>
              </div>
            </div>

            <div className="glass" style={{ borderRadius: '14px', padding: '28px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.12s' }}>
              <div className="corner corner-tl" /><div className="corner corner-br" />
              <div className="sys-tag" style={{ marginBottom: '14px', fontSize: '10px' }}>Phone</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '6px' }}>{t('Direct Line', '직통 전화')}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '15px', color: 'var(--text-primary)' }}>010 · · · · · · · · ·</span>
                <button onClick={() => setOops(true)} style={{ fontFamily: 'var(--mono)', fontSize: '11px', padding: '5px 12px', borderRadius: '3px', cursor: 'pointer', background: 'rgba(255,255,255,0.3)', border: '0.5px solid var(--border)', color: 'var(--text-dim)', letterSpacing: '0.08em', transition: 'all 0.2s' }}>
                  {t('[ locked ]', '[ 잠금 ]')}
                </button>
              </div>
            </div>

            <div className="glass" style={{ borderRadius: '14px', padding: '28px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.24s' }}>
              <div className="corner corner-tl" /><div className="corner corner-br" />
              <div className="sys-tag" style={{ marginBottom: '14px', fontSize: '10px' }}>LinkedIn</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '6px' }}>Hyein Kim</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)' }}>linkedin.com/in/hyein-kim-95129736a</div>
                </div>
                <a href="https://www.linkedin.com/in/hyein-kim-95129736a/" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '11px', padding: '7px 16px', borderRadius: '5px', whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.4)', border: '0.5px solid var(--border)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s' }}>Connect</a>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="glass" style={{ borderRadius: '14px', padding: '28px', opacity: visible ? 1 : 0, transition: 'all 0.6s ease 0.3s' }}>
              <div className="corner corner-tl" /><div className="corner corner-br" />
              <div className="sys-tag" style={{ marginBottom: '20px', fontSize: '10px' }}>{t('System Status', '시스템 상태')}</div>
              {statusItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < statusItems.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>{item.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="live-dot" style={{ width: '5px', height: '5px' }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass" style={{ borderRadius: '10px', padding: '16px 20px', fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)', lineHeight: 2.1, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 0.4s' }}>
              <div><span style={{ color: 'var(--green)' }}>✓</span>{' '}contact.sys · online · transmission ready</div>
              <div><span style={{ color: 'var(--accent)' }}>›</span>{' '}{t('preferred: email · response under 24h', '선호채널: 이메일 · 응답 24시간 이내')}</div>
              <div><span style={{ color: 'var(--green)' }}>✓</span>{' '}{t('status: available · node: online', '상태: 연락가능 · 노드: 온라인')}<span className="blink-cursor" /></div>
            </div>
          </div>
        </div>
      </div>

      {oops && (
        <div onClick={() => setOops(false)} style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(13,26,58,0.4)', backdropFilter: 'blur(8px)' }}>
          <div onClick={e => e.stopPropagation()} className="glass" style={{ borderRadius: '18px', padding: '44px 48px', textAlign: 'center', maxWidth: '360px', width: '90%' }}>
            <div style={{ fontSize: '24px', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '12px' }}>Oops!</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '28px' }}>
              {t('are you sure you want to contact me directly?', '정말로 직접 연락하실 건가요?')}
            </div>
            <button onClick={() => setOops(false)} style={{ fontFamily: 'var(--mono)', fontSize: '13px', padding: '11px 30px', borderRadius: '6px', cursor: 'pointer', background: 'rgba(255,255,255,0.4)', border: '0.5px solid var(--border)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t('Sorry ...', '죄송해요 ...')}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
