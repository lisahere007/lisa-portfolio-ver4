import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Personality from '@/components/Personality'
import Career from '@/components/Career'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Personality />
      <Career />
      <FAQ />
      <Contact />
      <footer style={{
        position: 'relative', zIndex: 2,
        borderTop: '0.5px solid rgba(160,185,225,0.4)',
        padding: '24px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: '#6a85b0', letterSpacing: '0.1em' }}>
          Lisa · IT Project Manager · © 2026
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: '#6a85b0', letterSpacing: '0.08em' }}>
          node:online · sys:active
        </span>
      </footer>
    </main>
  )
}
