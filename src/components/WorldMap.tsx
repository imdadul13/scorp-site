import { useEffect, useRef, useState } from 'react'
import { UNKNOWN_LOCATION, WORLD_LOCATIONS } from '../data/world'

export default function WorldMap({ activeLocation }: { activeLocation: string }) {
  const [unknownMessage, setUnknownMessage] = useState('')
  const timer = useRef<number[]>([])

  useEffect(() => () => timer.current.forEach(window.clearTimeout), [])

  function inspectUnknown() {
    timer.current.forEach(window.clearTimeout)
    timer.current = []
    setUnknownMessage('ACCESS DENIED.')
    timer.current.push(window.setTimeout(() => setUnknownMessage('NOT YET.'), 950))
    timer.current.push(window.setTimeout(() => setUnknownMessage(''), 2300))
  }

  return <nav className="world-map" aria-label="Interactive desert map">
    <div className="map-grid" aria-hidden="true" />
    <div className="map-path map-path-top" aria-hidden="true" />
    <div className="map-path map-path-left" aria-hidden="true" />
    <div className="map-path map-path-right" aria-hidden="true" />
    <div className="map-path map-path-down" aria-hidden="true" />
    <div className="map-path map-path-swarm" aria-hidden="true" />
    <div className="map-path map-path-sting" aria-hidden="true" />
    {WORLD_LOCATIONS.map(location => <a
      key={location.id}
      className={`world-map-node map-node-${location.sector}${activeLocation === location.id ? ' map-current' : ''}`}
      href={`#${location.id}`}
      aria-current={activeLocation === location.id ? 'location' : undefined}
    ><span className="map-icon" aria-hidden="true">{location.symbol}</span><span>{location.name}</span></a>)}
    <div className="world-map-unknown">
      <button type="button" className="world-map-node map-node-unknown" onClick={inspectUnknown} aria-label="Unknown location — access restricted">
        <span className="map-icon" aria-hidden="true">{UNKNOWN_LOCATION.symbol}</span><span>{UNKNOWN_LOCATION.name}</span>
      </button>
      <span className="unknown-message" role="status" aria-live="polite">{unknownMessage}</span>
    </div>
  </nav>
}
