'use client'
import { useEffect, useState, useRef } from 'react'

const faqs = [
  {
    q_en: 'What is your current employment status?',
    q_kr: '현재 재직 중이신가요?',
    a_en: 'Yes, I am currently working at KISS Nail Products Inc. as an IT Project Manager since April 2024. I am open to new opportunities depending on the role and company.',
    a_kr: '네, 현재 KISS Nail Products Inc.에서 IT 프로젝트 매니저로 재직 중입니다 (2024.04~). 역할과 회사에 따라 새로운 기회에 열려 있습니다.',
  },
  {
    q_en: 'What type of roles are you looking for?',
    q_kr: '어떤 직무를 찾고 계신가요?',
    a_en: 'I am looking for IT Project Manager, Service Planner, or Product Manager roles — especially in companies building digital platforms, ecommerce systems, or AI-driven services.',
    a_kr: 'IT 프로젝트 매니저, 서비스 기획자, 또는 프로덕트 매니저 직무를 찾고 있습니다. 특히 디지털 플랫폼, 이커머스 시스템, AI 기반 서비스를 구축하는 회사에 관심이 있습니다.',
  },
  {
    q_en: 'What industries have you worked in?',
    q_kr: '어떤 업종에서 일해보셨나요?',
    a_en: 'Ecommerce (US D2C, B2B/B2C), IT consulting, SaaS platform development, and international logistics. My experience spans Korea, Vietnam, and the US market.',
    a_kr: '이커머스 (미국 D2C, B2B/B2C), IT 컨설팅, SaaS 플랫폼 개발, 국제 물류 업종에서 일했습니다. 한국, 베트남, 미국 시장 경험이 있습니다.',
  },
  {
    q_en: 'Can you work remotely or overseas?',
    q_kr: '원격 근무나 해외 근무가 가능하신가요?',
    a_en: 'Yes. I have extensive experience working remotely and across time zones (Korea, Vietnam, US). I am comfortable with async communication and cross-cultural collaboration.',
    a_kr: '네. 한국, 베트남, 미국 등 다양한 타임존에서 원격으로 일한 경험이 풍부합니다. 비동기 커뮤니케이션과 다문화 협업에 익숙합니다.',
  },
  {
    q_en: 'What tools and platforms do you use?',
    q_kr: '어떤 툴과 플랫폼을 사용하시나요?',
    a_en: 'Shopify, Cafe24, Odoo, WooCommerce for ecommerce. Google Analytics (GA4), Figma for design review, Notion, Jira-style PM tools, and various custom internal tools I have designed myself.',
    a_kr: '이커머스는 Shopify, Cafe24, Odoo, WooCommerce. Google Analytics (GA4), 디자인 검토용 Figma, Notion, Jira 형태 PM 툴, 그리고 직접 설계한 다양한 내부 툴을 사용합니다.',
  },
  {
    q_en: 'What is your strongest skill as a PM?',
    q_kr: 'PM으로서 가장 강한 역량은 무엇인가요?',
    a_en: 'Turning complex, ambiguous requirements into structured, executable systems — and carrying them all the way through to operational stability. I connect planning, development, QA, and operations as one continuous flow.',
    a_kr: '복잡하고 모호한 요구사항을 구조화된 실행 가능한 시스템으로 바꾸고, 운영 안정화까지 끝까지 책임지는 것입니다. 기획, 개발, QA, 운영을 하나의 연속된 흐름으로 연결합니다.',
  },
{
    q_en: 'Are you available for freelance or consulting?',
    q_kr: '프리랜서나 컨설팅도 가능하신가요?',
    a_en: 'Depending on the scope and timeline, yes. Feel free to reach out!',
    a_kr: '범위와 일정에 따라 가능합니다. 편하게 연락 주세요!',
    link: true,
  },
]

export default function FAQ() {
  const [lang, setLang] = useState<'en' | 'kr'>('en')
  const [visible, setVisible] = useState(false)
  const [openIdx, setOpenIdx] = useState<number | null>(null)
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
    <section id="faq" className="section-wrap" style={{ background: 'rgba(255,255,255,0.15)' }} ref={ref}>
      <div className="container">
        <div style={{
          marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
        }}>
          <div className="sys-tag" style={{ marginBottom: '16px' }}>FAQ</div>
          <h2 style={{
            fontSize: 'clamp(32px,4vw,56px)',
            fontWeight: 300,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
          }}>
            {t('Frequently Asked', '자주 묻는 질문')}
          </h2>
        </div>

        <div style={{
          maxWidth: '780px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          opacity: visible ? 1 : 0,
          transition: 'all 0.6s ease 0.2s',
        }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass"
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 0.5s ease ${i * 0.06}s`,
              }}
            >
              <div
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  padding: '20px 24px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  background: openIdx === i ? 'rgba(255,255,255,0.6)' : 'transparent',
                  transition: 'background 0.3s',
                }}
              >
                <div style={{
                  fontSize: '15px',
                  fontWeight: openIdx === i ? 500 : 400,
                  color: openIdx === i ? 'var(--text-primary)' : 'var(--text-muted)',
                  transition: 'all 0.3s',
                  lineHeight: 1.5,
                }}>
                  {t(faq.q_en, faq.q_kr)}
                </div>
                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '16px',
                  color: 'var(--text-dim)',
                  transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0)',
                  transition: 'transform 0.3s',
                  flexShrink: 0,
                }}>
                  +
                </div>
              </div>

              <div style={{
                maxHeight: openIdx === i ? '300px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease',
              }}>
                <div style={{
                  padding: '0 24px 20px',
                  borderTop: '0.5px solid var(--border)',
                  paddingTop: '16px',
                }}>
<p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.9, fontFamily: 'var(--mono)', marginBottom: (faq as any).link ? '12px' : '0' }}>
                  {t(faq.a_en, faq.a_kr)}
                </p>
                {(faq as any).link && (
                  <a href="https://www.linkedin.com/in/hyein-kim-95129736a/" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '11px', padding: '6px 16px', borderRadius: '5px', background: 'rgba(255,255,255,0.4)', border: '0.5px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-block', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s' }}>
                    LinkedIn →
                  </a>
                )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
