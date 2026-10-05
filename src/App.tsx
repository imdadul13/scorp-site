import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowDown, ExternalLink, Menu, VolumeX } from 'lucide-react'
import ArchiveSystem from './components/ArchiveSystem'
import BootSequence from './components/BootSequence'
import DesertScene from './components/DesertScene'
import FieldTerminal from './components/FieldTerminal'
import PixelScorpion from './components/PixelScorpion'
import SectorMarker from './components/SectorMarker'
import SocialLink from './components/SocialLink'
import ScorpHUD from './components/ScorpHUD'
import SwarmGrid from './components/SwarmGrid'
import TokenStatus from './components/TokenStatus'
import WorldTransition from './components/WorldTransition'
import WorldMap from './components/WorldMap'
import { prefersReducedMotion } from './data/motion'
import { PROJECT_STATE } from './config/project'
import { WORLD_LOCATIONS } from './data/world'

const nav = [
  ['WORLD', 'sector-01'], ['LORE', 'sector-02'], ['SWARM', 'sector-03'], ['TOKEN', 'sector-05'],
] as const

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [entering, setEntering] = useState(false)
  const [entered, setEntered] = useState(false)
  const [activeNav, setActiveNav] = useState('sector-01')
  const [activeSector, setActiveSector] = useState({ sector: '00', status: 'AWAKING' })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = document.querySelector('main')
    let reveal: IntersectionObserver | undefined
    if (!prefersReducedMotion()) {
      main?.classList.add('reveal-enabled')
      reveal = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            reveal?.unobserve(entry.target)
          }
        }
      }, { threshold: .12, rootMargin: '0px 0px -8% 0px' })
      document.querySelectorAll('.sector, .terminal-section').forEach(section => reveal?.observe(section))
    }

    const locations = [{ id: 'top', sector: '00', status: 'AWAKING' }, ...WORLD_LOCATIONS.map(({ id, sector, status }) => ({ id, sector, status })), { id: 'field-terminal', sector: '09', status: 'CONNECTED' }]
    const location = new IntersectionObserver(entries => {
      const center = window.innerHeight * .48
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => Math.abs(a.boundingClientRect.top - center) - Math.abs(b.boundingClientRect.top - center))[0]
      if (current) {
        const place = locations.find(item => item.id === current.target.id)
        if (place) setActiveSector({ sector: place.sector, status: place.status })
        if (current.target.id !== 'top' && WORLD_LOCATIONS.some(place => place.id === current.target.id)) setActiveNav(current.target.id)
      }
    }, { threshold: 0, rootMargin: '-42% 0px -48% 0px' })
    locations.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) location.observe(section)
    })
    return () => { reveal?.disconnect(); location.disconnect(); main?.classList.remove('reveal-enabled') }
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
      <a className="brand" href="#top" aria-label="SCORP — return to the desert entrance"><span className="mini-mark"><img src="/scorp-favicon-32.png" alt="" /></span><span>SCORP<span className="brand-dot">.</span></span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="World locations">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeNav === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}<i className="nav-active-dot" /></a>)}
        <SocialLink channel="x" className="nav-social" >X <ExternalLink size={11} /></SocialLink>
        <SocialLink channel="telegram" className="nav-social">TELEGRAM <ExternalLink size={11} /></SocialLink>
        <ScorpHUD sector={activeSector.sector} status={activeSector.status} />
      </nav>
      {PROJECT_STATE.buyUrl && <a className="pixel-button primary nav-buy" href={PROJECT_STATE.buyUrl} target="_blank" rel="noreferrer">BUY NOW <ExternalLink size={12} /></a>}
      <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
    </header>

    <section className="hero" id="top" ref={heroRef} onPointerMove={moveHero}>
      <div className="hero-stars" /><div className="moon" />
      <div className="hero-content"><div className="eyebrow"><span className="live-dot" /> DIGITAL DESERT {'//'} UNKNOWN SECTOR</div><h1>{PROJECT_STATE.name}</h1><p className="tagline">{PROJECT_STATE.launched ? 'THE STING HAS LANDED.' : 'THE DESERT IS WATCHING.'}</p><p className="hero-copy">A pixel creature.<br />A digital desert.<br />One sting.</p><div className="hero-actions"><button className="pixel-button primary" onClick={enterWorld}>ENTER THE DESERT <ArrowDown size={14} /></button><SocialLink channel="x" className="pixel-button ghost">VIEW ON X <ExternalLink size={13} /></SocialLink></div><span className="hero-coordinate">34° 08′ N &nbsp; / &nbsp; 116° 18′ W</span></div>
      <div className="hero-creature"><div className="creature-glow" /><PixelScorpion /><span className="creature-label">FIG. 001 — UNCATALOGUED</span></div>
      <button className="hero-trail" aria-label="Inspect the pixel tracks" data-message="SOMETHING PASSED THROUGH."><i /><i /><i /><i /><i /><i /><i /><i /><i /></button>
      <div className="horizon-creature" aria-hidden="true"><PixelScorpion small /></div><div className="dune dune-back" /><div className="dune dune-front" /><div className="hero-ground" />
      <span className="hero-side-label">KEEP YOUR DISTANCE</span><span className="scroll-hint">SCROLL TO DESCEND <span>↓</span></span><div className="hero-status"><span>SECTOR 09</span><span>● SIGNAL FOUND</span></div>
    </section>

    <section className="world section sector" id="sector-01"><SectorMarker number="01" title="THE DESERT" status="ACTIVE" /><div className="section-heading"><h2>WELCOME TO<br /><em>THE DESERT</em></h2><p className="mono small">AN ACCOUNT OF THE UNACCOUNTED</p></div><DesertScene /><div className="map-intro"><span className="mono small">FIELD MAP {'//'} KNOWN SIGNALS</span><p>SELECT A LOCATION TO DESCEND.</p></div><WorldMap activeLocation={WORLD_LOCATIONS.find(place => place.sector === activeSector.sector)?.id ?? ''} /></section>
    <section className="den section sector" id="sector-02"><SectorMarker number="02" title="THE DEN" status="UNKNOWN" /><div className="section-heading"><h2>BELOW THE <em>SAND</em></h2><p className="mono small">FIELD NOTE {'//'} ORIGIN UNCONFIRMED</p></div><div className="den-scene"><div className="den-light" /><div className="den-rock rock-one" /><div className="den-rock rock-two" /><div className="den-marks">╱╱╱ &nbsp; ╲╲╲</div><div className="den-object">◈<span>UNIDENTIFIED</span></div><div className="den-creature"><PixelScorpion /></div><div className="den-lore"><span className="stamp">FIELD NOTE 009</span><p>Nobody knows where it came from.</p><p>Some say it crawled out of an abandoned server.</p><p>Others say it has always been here.</p><em>Waiting.</em></div><span className="den-location">TUNNEL 09 {'//'} DEPTH UNKNOWN</span></div></section>
    <section className="swarm section sector" id="sector-03"><SectorMarker number="03" title="THE SWARM" status="ACTIVE" /><div className="section-heading"><h2>THE <em>SWARM</em></h2><p className="mono small">YOU ARE NOT ALONE OUT HERE</p></div><div className="swarm-layout"><div className="swarm-intro"><p>One scorpion is nothing.</p><p className="swarm-big">A swarm<br />is <em>different.</em></p><div className="swarm-actions" id="socials"><SocialLink channel="telegram" className="pixel-button primary">JOIN TELEGRAM <ExternalLink size={13} /></SocialLink><SocialLink channel="x" className="pixel-button ghost">FOLLOW X <ExternalLink size={13} /></SocialLink></div></div><SwarmGrid /></div></section>
    <section className="archive section sector" id="sector-04"><SectorMarker number="04" title="THE ARCHIVE" status="CLASSIFIED" /><div className="section-heading"><h2>SCORP <em>{'//'} ARCHIVE</em></h2><p className="mono small">RESTRICTED MATERIAL {'//'} 6 RECORDS</p></div><ArchiveSystem /></section>
    <section className="token section sector" id="sector-05"><SectorMarker number="05" title="THE STING" status={PROJECT_STATE.launched ? 'ACTIVE' : 'LOCKED'} /><div className="section-heading"><h2>THE <em>STING</em></h2><p className="mono small">DETAILS WILL SURFACE WHEN THEY SURFACE</p></div><TokenStatus /></section>
    <section className="terminal-section section" id="field-terminal"><SectorMarker number="09" title="FIELD TERMINAL" status="CONNECTED" /><div className="section-heading"><h2>SCORP <em>{'//'} FIELD TERMINAL</em></h2><p className="mono small">LOCAL CONNECTION {'//'} NO TRACE</p></div><FieldTerminal /></section>
    <footer id="footer"><div className="footer-brand"><span className="mini-mark"><img src="/scorp-favicon-32.png" alt="" /></span><div><b>SCORP</b><span>THE DESERT IS WATCHING.</span></div></div><div className="footer-links"><SocialLink channel="x">X <ExternalLink size={11} /></SocialLink><SocialLink channel="telegram">TELEGRAM <ExternalLink size={11} /></SocialLink><span><VolumeX size={14} /> SOUND OFF</span></div><span className="copyright">© 2026 SCORP</span><span className="footer-coord">{entered ? 'SECTOR 01 // YOU ARE HERE' : 'SIGNAL WILL RETURN'}</span></footer>
  </main>
}
