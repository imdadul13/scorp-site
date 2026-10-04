import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react'
import PixelScorpion from './PixelScorpion'

const whispers = ['lurking', 'watching', 'waiting', 'stinging', 'still here']
const activeCells = new Set([1,4,8,11,16,19,23,25,29,32,37,40,42,47,50,54,58,61])

export default function SwarmGrid() {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = document.getElementById('sector-03')
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: .2 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  function pointScorpions(event: PointerEvent<HTMLDivElement>) {
    const grid = event.currentTarget.querySelector('.swarm-grid')
    if (grid) {
      const bounds = grid.getBoundingClientRect()
      grid.setAttribute('style', `--cursor-x:${event.clientX - bounds.left}px;--cursor-y:${event.clientY - bounds.top}px`)
    }
    event.currentTarget.querySelectorAll<HTMLElement>('.swarm-cell.active .scorpion').forEach(scorpion => {
      const rect = scorpion.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const angle = Math.max(-9, Math.min(9, Math.atan2(dx, -dy) * 180 / Math.PI))
      scorpion.style.setProperty('--turn', `${angle}deg`)
    })
  }

  function resetScorpions(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.querySelectorAll<HTMLElement>('.swarm-cell .scorpion').forEach(scorpion => scorpion.style.removeProperty('--turn'))
  }

  return <div className="swarm-board" onPointerMove={pointScorpions} onPointerLeave={resetScorpions}>
    <div className="board-head"><span>NEARBY SIGNALS</span><span>{inView ? 'SCANNING' : 'DORMANT'} {'//'} 64</span></div>
    <div className={`swarm-grid ${inView ? 'awakened' : ''}`}>
      {Array.from({ length: 64 }, (_, index) => <div className={`swarm-cell ${activeCells.has(index) ? 'active' : ''}`} key={index} title={whispers[index % whispers.length]} style={{ '--i': index } as CSSProperties}><PixelScorpion small /></div>)}
    </div>
    <div className="board-foot"><span>18 ACTIVE</span><span>THE REST ARE LISTENING</span></div>
  </div>
}
