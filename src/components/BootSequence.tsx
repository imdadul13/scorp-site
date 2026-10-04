import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../data/motion'

const lines = ['SCORP // SYSTEM', 'INITIALIZING...', 'LOADING DESERT...', 'SCANNING...', 'LIFEFORM DETECTED.', 'SCORP IS AWAKE.']
const key = 'scorp-intro-seen'

function shouldPlay() {
  if (typeof window === 'undefined') return false
  try { return sessionStorage.getItem(key) !== '1' && !prefersReducedMotion() } catch { return false }
}

export default function BootSequence() {
  const [active, setActive] = useState(shouldPlay)
  const [visibleLines, setVisibleLines] = useState(0)
  useEffect(() => {
    if (!active) return
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setVisibleLines(index)
      if (index >= lines.length) {
        window.clearInterval(timer)
        window.setTimeout(() => {
          setActive(false)
          try { sessionStorage.setItem(key, '1') } catch { /* Storage can be disabled. */ }
        }, 180)
      }
    }, 115)
    return () => window.clearInterval(timer)
  }, [active])
  function skip() {
    setActive(false)
    try { sessionStorage.setItem(key, '1') } catch { /* Storage can be disabled. */ }
  }
  if (!active) return null
  return <div className="boot-screen" role="status" aria-live="polite"><div className="boot-panel">{lines.slice(0, visibleLines).map((line, index) => <div key={line} className={index === lines.length - 1 ? 'boot-final' : ''}>{line}</div>)}<span className="boot-cursor"/></div><button className="boot-skip" onClick={skip}>SKIP INTRO ↗</button></div>
}
