'use client'
import { useEffect, useState, useRef } from 'react'

type Message = {
  role: 'user' | 'ai'
  text_en: string
  text_kr: string
}

const conversation: Message[] = [
  { role: 'user', text_en: 'What kind of person is Lisa?', text_kr: '리사는 어떤 사람이야?' },
  { role: 'ai', text_en: "She's someone who transforms complexity into structure.", text_kr: '복잡한 걸 구조로 바꾸는 사람이에요.' },
  { role: 'ai', text_en: 'When given an idea, she asks "Is this systemically executable?" before anything else.', text_kr: '아이디어를 받으면 바로 포장하는 대신, "이게 시스템적으로 계산 가능한가?"를 먼저 물어요.' },
  { role: 'user', text_en: 'How does she work with others?', text_kr: '협업 방식은 어때?' },
  { role: 'ai', text_en: 'She listens first, structures what she heard, then connects it to the next action.', text_kr: '상대방 말을 먼저 듣고, 구조화해서 다음 액션으로 연결해요.' },
  { role: 'ai', text_en: 'She carries things all the way — from planning to development, QA, and operations.', text_kr: '기획부터 개발, QA, 운영까지 끝까지 들고 가요.' },
  { role: 'ai', text_en: 'Many people plan, but few actually bridge designers, developers, and decision-makers. Lisa does.', text_kr: '많은 사람이 기획은 하는데, 개발자·운영자·디자이너·의사결정자를 연결해서 굴러가게 만드는 건 잘 못해요. 리사는 그걸 해요.' },
  { role: 'user', text_en: 'What are her strengths?', text_kr: '강점이 뭐야?' },
  { role: 'ai', text_en: '01. Structural thinking — turns complex requirements into executable systems.', text_kr: '01. 구조적 사고 — 복잡한 요구사항을 실행 가능한 시스템으로 변환해요.' },
  { role: 'ai', text_en: '02. Risk detection — spots edge cases before they become problems.', text_kr: '02. 리스크 감지 — 남들이 지나칠 예외 케이스를 미리 포착해요.' },
  { role: 'ai', text_en: '03. Reality check — prioritizes what actually works over what sounds ideal.', text_kr: '03. 현실 감각 — 이상적인 안보다 실제 구현 가능성을 먼저 생각해요.' },
  { role: 'ai', text_en: '04. End-to-end ownership — from idea to operational stability.', text_kr: '04. 끝까지 책임 — 아이디어부터 운영 안정화까지 놓지 않아요.' },
  { role: 'user', text_en: 'Anything to watch out for?', text_kr: '단점은?' },
  { role: 'ai', text_en: "She carries too many things at once — can't easily just ship it.", text_kr: '생각해야 할 포인트를 너무 많이 동시에 들고 가는 편이에요. "대충 넘기자"가 잘 안 맞아요.' },
  { role: 'ai', text_en: 'What she needs: the ability to decide at 80% and push forward.', text_kr: '필요한 건 어느 순간 80%에서 결정하고 밀어붙이는 힘이에요.' },
]

const ANIMATE_COUNT = 3

const tagsData = [
  { en: 'AB', kr: 'AB형' },
  { en: 'ENTP', kr: 'ENTP' },
  { en: 'Quick Learner', kr: '빠른 이해' },
  { en: 'Logical Thinker', kr: '논리적 사고' },
  { en: 'Realist', kr: '현실주의' },
  { en: 'Accountable', kr: '책임감' },
  { en: 'Risk Detector', kr: '리스크 감지' },
  { en: 'Communicator', kr: '소통' },
  { en: 'Curious Machine', kr: '호기심' },
]

export default function Personality() {
  const [lang, setLang] = useState<'en' | 'kr'>('en')
  const [visible, setVisible] = useState(false)
  const [shownCount, setShownCount] = useState(0)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [animDone, setAnimDone] = useState(false)
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

  useEffect(() => {
    if (!visible || animDone) return
    if (shownCount >= ANIMATE_COUNT) {
      setAnimDone(true)
      return
    }

    const current = conversation[shownCount]
    const delay = shownCount === 0 ? 600 : current.role === 'user' ? 400 : 300

    const timer = setTimeout(() => {
      if (current.role === 'user') {
        setShownCount(c => c + 1)
      } else {
        const text = lang === 'en' ? current.text_en : current.text_kr
        setIsTyping(true)
        setTypingText('')
        let i = 0
        const typeInterval = setInterval(() => {
          if (i < text.length) {
            setTypingText(text.slice(0, i + 1))
            i++
          } else {
            clearInterval(typeInterval)
            setIsTyping(false)
            setShownCount(c => c + 1)
          }
        }, 24)
        return () => clearInterval(typeInterval)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [visible, shownCount, animDone, lang])

  const t = (en: string, kr: string) => lang === 'en' ? en : kr

  const visibleMessages = animDone ? conversation : conversation.slice(0, shownCount)

  return (
    <section id="personality" className="section-wrap" style={{ background: 'rgba(255,255,255,0.15)' }} ref={ref}>
      <div className="container">

        <div style={{ marginBottom: '48px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <div className="sys-tag" style={{ marginBottom: '16px' }}>{t('Personality', '성격')}</div>
          <h2 style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '20px' }}>
            {t('How I think & work', '나는 어떻게 생각하고 일하는가')}
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tagsData.map(tag => (
              <span key={tag.en} style={{ fontFamily: 'var(--mono)', fontSize: '12px', padding: '5px 14px', borderRadius: '99px', background: 'rgba(255,255,255,0.5)', border: '0.5px solid var(--border)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                {lang === 'en' ? tag.en : tag.kr}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start', opacity: visible ? 1 : 0, transition: 'all 0.6s ease 0.2s' }}>

          <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div className="corner corner-tl" />
            <div style={{ padding: '14px 20px', borderBottom: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.3)' }}>
              <span className="live-dot" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
                AI_INSIGHT.sys · {t('analyzing Lisa...', '리사 분석 중...')}
              </span>
            </div>

            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {visibleMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fadeUp 0.3s ease forwards' }}>
                  {msg.role === 'ai' && (
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--accent-soft)', border: '0.5px solid rgba(26,79,216,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px', flexShrink: 0, marginTop: '2px' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', color: 'var(--accent)' }}>AI</span>
                    </div>
                  )}
                  <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px', background: msg.role === 'user' ? 'var(--text-primary)' : 'rgba(255,255,255,0.6)', border: msg.role === 'user' ? 'none' : '0.5px solid var(--border)', fontSize: '13px', color: msg.role === 'user' ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)', lineHeight: 1.7, fontFamily: msg.role === 'ai' ? 'var(--mono)' : 'var(--sans)' }}>
                    {lang === 'en' ? msg.text_en : msg.text_kr}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'fadeUp 0.3s ease forwards' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--accent-soft)', border: '0.5px solid rgba(26,79,216,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px', flexShrink: 0, marginTop: '2px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', color: 'var(--accent)' }}>AI</span>
                  </div>
                  <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: '12px 12px 12px 2px', background: 'rgba(255,255,255,0.6)', border: '0.5px solid var(--border)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, fontFamily: 'var(--mono)' }}>
                    {typingText}
                    <span className="blink-cursor" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { tag: '01', en: 'Structural Thinker', kr: '구조적 사고', desc_en: 'Turns complex requirements into executable systems', desc_kr: '복잡한 요구사항을 실행 가능한 시스템으로' },
              { tag: '02', en: 'Risk Detector', kr: '리스크 감지', desc_en: 'Spots edge cases before they become problems', desc_kr: '예외 케이스를 문제가 되기 전에 포착' },
              { tag: '03', en: 'Reality Checker', kr: '현실 감각', desc_en: 'Prioritizes what actually works over ideal', desc_kr: '이상보다 실제 구현 가능성을 먼저' },
              { tag: '04', en: 'End-to-End Owner', kr: '책임', desc_en: 'From idea to operational stability', desc_kr: '아이디어부터 운영 안정화까지' },
            ].map((trait, i) => (
              <div key={trait.tag} className="glass" style={{ borderRadius: '12px', padding: '18px 20px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.5s ease ${0.3 + i * 0.08}s` }}>
                <div className="corner corner-tl" />
                <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '0.12em', marginBottom: '7px' }}>{trait.tag}</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{t(trait.en, trait.kr)}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.6 }}>{t(trait.desc_en, trait.desc_kr)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
