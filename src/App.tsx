import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowDown, ExternalLink, Menu, VolumeX } from 'lucide-react'
import ArchivePanel from './components/ArchivePanel'
import BootSequence from './components/BootSequence'
import DesertScene from './components/DesertScene'
import FieldTerminal from './components/FieldTerminal'
import PixelScorpion from './components/PixelScorpion'
import SectorMarker from './components/SectorMarker'
import SocialLink from './components/SocialLink'
import SwarmGrid from './components/SwarmGrid'
import WorldTransition from './components/WorldTransition'
import { prefersReducedMotion } from './data/motion'
import { TOKEN } from './data/siteConfig'

const nav = [
  ['WORLD', 'sector-01'], ['LORE', 'sector-02'], ['SWARM', 'sector-03'], ['TOKEN', 'sector-05'],
] as const

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [entering, setEntering] = useState(false)
  const [entered, setEntered] = useState(false)
  const [activeNav, setActiveNav] = useState('sector-01')
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const main = document.querySelector('main')
    main?.classList.add('reveal-enabled')
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          reveal.unobserve(entry.target)
        }
      }
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('.sector, .terminal-section').forEach(section => reveal.observe(section))

    const location = new IntersectionObserver(entries => {
      const center = window.innerHeight * .48
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => Math.abs(a.boundingClientRect.top - center) - Math.abs(b.boundingClientRect.top - center))[0]
      if (current && nav.some(([, id]) => id === current.target.id)) setActiveNav(current.target.id)
    }, { threshold: 0, rootMargin: '-42% 0px -48% 0px' })
    nav.forEach(([, id]) => {
      const section = document.getElementById(id)
      if (section) location.observe(section)
    })
    return () => { reveal.disconnect(); location.disconnect(); main?.classList.remove('reveal-enabled') }
  }, [])

  function moveHero(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return
    const x = (event.clientX / window.innerWidth - .5) * 12
    const y = (event.clientY / window.innerHeight - .5) * 8
    heroRef.current?.style.setProperty('--parallax-x', `${x}px`)
    heroRef.current?.style.setProperty('--parallax-y', `${y}px`)
  }

  function enterWorld() {
    if (entering) return
    setEntering(true)
    window.setTimeout(() => {
      setEntering(false)
      setEntered(true)
      document.getElementById('sector-01')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    }, 920)
  }

  return <main className={entering ? 'world-entering' : ''}>
    <BootSequence />
    <div className="crt" aria-hidden="true" />
    <WorldTransition active={entering} />
    <button className="hidden-glyph" aria-label="Inspect anomalous pixel" onClick={event => { const target = event.currentTarget; target.classList.add('found'); window.setTimeout(() => target.classList.remove('found'), 1200) }}>⌑</button>
    <header className="nav">
      <a className="brand" href="#top" aria-label="SCORP — return to the desert entrance"><span className="mini-mark"><PixelScorpion small /></span><span>SCORP<span className="brand-dot">.</span></span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="World locations">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeNav === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}<i className="nav-active-dot" /></a>)}
        <SocialLink channel="x" className="nav-social" >X <ExternalLink size={11} /></SocialLink>
        <SocialLink channel="telegram" className="nav-social">TELEGRAM <ExternalLink size={11} /></SocialLink>
      </nav>
      <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
    </header>

    <section className="hero" id="top" ref={heroRef} onPointerMove={moveHero}>
      <div className="hero-stars" /><div className="moon" />
      <div className="hero-content"><div className="eyebrow"><span className="live-dot" /> DIGITAL DESERT {'//'} UNKNOWN SECTOR</div><h1>SCORP</h1><p className="tagline">THE DESERT IS WATCHING.</p><p className="hero-copy">A pixel creature.<br />A digital desert.<br />One sting.</p><div className="hero-actions"><button className="pixel-button primary" onClick={enterWorld}>ENTER THE DESERT <ArrowDown size={14} /></button><SocialLink channel="x" className="pixel-button ghost">VIEW ON X <ExternalLink size={13} /></SocialLink></div><span className="hero-coordinate">34° 08′ N &nbsp; / &nbsp; 116° 18′ W</span></div>
      <div className="hero-creature"><div className="creature-glow" /><PixelScorpion /><span className="creature-label">FIG. 001 — UNCATALOGUED</span></div>
      <button className="hero-trail" aria-label="Inspect the pixel tracks" data-message="SOMETHING PASSED THROUGH."><i /><i /><i /><i /><i /><i /><i /><i /><i /></button>
      <div className="horizon-creature" aria-hidden="true"><PixelScorpion small /></div><div className="dune dune-back" /><div className="dune dune-front" /><div className="hero-ground" />
      <span className="hero-side-label">KEEP YOUR DISTANCE</span><span className="scroll-hint">SCROLL TO DESCEND <span>↓</span></span><div className="hero-status"><span>SECTOR 09</span><span>● SIGNAL FOUND</span></div>
    </section>

    <section className="world section sector" id="sector-01"><SectorMarker number="01" title="THE DESERT" status="ACTIVE" /><div className="section-heading"><h2>WELCOME TO<br /><em>THE DESERT</em></h2><p className="mono small">AN ACCOUNT OF THE UNACCOUNTED</p></div><DesertScene /></section>
    <section className="den section sector" id="sector-02"><SectorMarker number="02" title="THE DEN" status="UNKNOWN" /><div className="section-heading"><h2>BELOW THE <em>SAND</em></h2><p className="mono small">FIELD NOTE {'//'} ORIGIN UNCONFIRMED</p></div><div className="den-scene"><div className="den-light" /><div className="den-rock rock-one" /><div className="den-rock rock-two" /><div className="den-marks">╱╱╱ &nbsp; ╲╲╲</div><div className="den-object">◈<span>UNIDENTIFIED</span></div><div className="den-creature"><PixelScorpion /></div><div className="den-lore"><span className="stamp">FIELD NOTE 009</span><p>Nobody knows where it came from.</p><p>Some say it crawled out of an abandoned server.</p><p>Others say it has always been here.</p><em>Waiting.</em></div><span className="den-location">TUNNEL 09 {'//'} DEPTH UNKNOWN</span></div></section>
    <section className="swarm section sector" id="sector-03"><SectorMarker number="03" title="THE SWARM" status="ACTIVE" /><div className="section-heading"><h2>THE <em>SWARM</em></h2><p className="mono small">YOU ARE NOT ALONE OUT HERE</p></div><div className="swarm-layout"><div className="swarm-intro"><p>One scorpion is nothing.</p><p className="swarm-big">A swarm<br />is <em>different.</em></p><div className="swarm-actions" id="socials"><SocialLink channel="telegram" className="pixel-button primary">JOIN TELEGRAM <ExternalLink size={13} /></SocialLink><SocialLink channel="x" className="pixel-button ghost">FOLLOW X <ExternalLink size={13} /></SocialLink></div></div><SwarmGrid /></div></section>
    <section className="archive section sector" id="sector-04"><SectorMarker number="04" title="THE ARCHIVE" status="CLASSIFIED" /><div className="section-heading"><h2>SCORP <em>{'//'} ARCHIVE</em></h2><p className="mono small">RESTRICTED MATERIAL {'//'} 6 RECORDS</p></div><ArchivePanel /></section>
    <section className="token section sector" id="sector-05"><SectorMarker number="05" title="THE STING" status={TOKEN.contractAddress ? 'ACTIVE' : 'UNKNOWN'} /><div className="section-heading"><h2>THE <em>STING</em></h2><p className="mono small">DETAILS WILL SURFACE WHEN THEY SURFACE</p></div><div className="token-card"><div className="token-title"><span className="token-glyph">✳</span><div><span className="mono small">FOUND OBJECT</span><h3>SCORP</h3></div><span className="token-index">ARTIFACT / 001</span></div><div className="token-data"><div><span>TICKER</span><b>$SCORP</b></div><div><span>NETWORK</span><b>{TOKEN.network}</b></div><div><span>CONTRACT</span><b className="pending">{TOKEN.contractAddress || 'COMING SOON'}</b></div></div><div className="token-warning">NO PROMISES.<br />NO PROPHECY.<br /><em>JUST SCORP.</em></div></div></section>
    <section className="terminal-section section"><SectorMarker number="09" title="FIELD TERMINAL" status="CONNECTED" /><div className="section-heading"><h2>SCORP <em>{'//'} FIELD TERMINAL</em></h2><p className="mono small">LOCAL CONNECTION {'//'} NO TRACE</p></div><FieldTerminal /></section>
    <footer id="footer"><div className="footer-brand"><span className="mini-mark"><PixelScorpion small /></span><div><b>SCORP</b><span>THE DESERT IS WATCHING.</span></div></div><div className="footer-links"><SocialLink channel="x">X <ExternalLink size={11} /></SocialLink><SocialLink channel="telegram">TELEGRAM <ExternalLink size={11} /></SocialLink><span><VolumeX size={14} /> SOUND OFF</span></div><span className="copyright">© 2026 SCORP</span><span className="footer-coord">{entered ? 'SECTOR 01 // YOU ARE HERE' : 'SIGNAL WILL RETURN'}</span></footer>
  </main>
}
