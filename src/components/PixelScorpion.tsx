/** Temporary replaceable pixel specimen. Swap this component for the final art asset later. */
export default function PixelScorpion({ small = false }: { small?: boolean }) {
  return <div className={`scorpion ${small ? 'scorpion-small' : ''}`} role="img" aria-label="Temporary pixel-art scorpion specimen">
    <svg className="scorpion-art" viewBox="0 0 32 28" shapeRendering="crispEdges" aria-hidden="true">
      <g className="pixel-tail">
        <rect x="14" y="12" width="4" height="3" fill="#24170f"/><rect x="13" y="9" width="4" height="4" fill="#3d2819"/><rect x="11" y="6" width="4" height="4" fill="#51341e"/><rect x="12" y="3" width="4" height="4" fill="#422919"/><rect x="15" y="2" width="4" height="4" fill="#604027"/><rect x="18" y="1" width="3" height="4" fill="#80502c"/>
        <rect x="21" y="0" width="3" height="3" fill="#bd7840"/><rect x="23" y="0" width="2" height="2" fill="#e5a44f"/>
        <rect x="13" y="9" width="2" height="1" fill="#91613b"/><rect x="12" y="6" width="2" height="1" fill="#a06c3b"/><rect x="16" y="2" width="2" height="1" fill="#ad7946"/>
      </g>
      <g className="pixel-legs" fill="#21160f">
        <path d="M11 16H9v2H7v2H5v2h3v-2h3v-2h2v-1h2v-2zM21 16h2v2h2v2h2v2h-3v-2h-3v-2h-2v-1h-2v-2z"/>
        <path d="M12 18h-2v2H8v2H6v2h3v-2h3v-2h2v-1h2v-1zM20 18h2v2h2v2h2v2h-3v-2h-3v-2h-2v-1h-2v-1z" fill="#392519"/>
        <path d="M8 21h3v1H8zM21 21h3v1h-3z" fill="#755031"/>
      </g>
      <g className="pixel-claw pixel-claw-left">
        <path d="M11 12H8v1H6v2H4v3h2v-2h2v1h2v-2h2v-2h2v-1h-3z" fill="#24170f"/>
        <path d="M10 12H8v1H6v2H5v2h2v-2h2v1h2v-2h2v-1h2v-1h-4z" fill="#52351f"/>
        <rect x="7" y="13" width="3" height="1" fill="#805834"/><rect x="5" y="15" width="2" height="1" fill="#98673b"/>
      </g>
      <g className="pixel-claw pixel-claw-right">
        <path d="M21 12h3v1h2v2h2v3h-2v-2h-2v1h-2v-2h-2v-2h-2v-1h3z" fill="#24170f"/>
        <path d="M22 12h2v1h2v2h1v2h-2v-2h-2v1h-2v-2h-2v-1h-2v-1h4z" fill="#52351f"/>
        <rect x="22" y="13" width="3" height="1" fill="#805834"/><rect x="25" y="15" width="2" height="1" fill="#98673b"/>
      </g>
      <g className="pixel-body">
        <path d="M12 12h8v1h2v5h-2v2h-8v-2h-2v-5h2z" fill="#1e140e"/>
        <rect x="12" y="12" width="8" height="2" fill="#49301e"/><rect x="11" y="14" width="10" height="3" fill="#3a2618"/><rect x="12" y="17" width="8" height="2" fill="#2d1d13"/>
        <rect x="13" y="13" width="2" height="3" fill="#624128"/><rect x="16" y="13" width="2" height="3" fill="#51351f"/><rect x="19" y="14" width="1" height="3" fill="#80542f"/>
        <rect x="13" y="17" width="2" height="1" fill="#795331"/><rect x="16" y="17" width="2" height="1" fill="#674429"/>
      </g>
      <g className="pixel-head">
        <path d="M13 10h6v1h2v3h-2v1h-6v-1h-2v-3h2z" fill="#644127"/><rect x="14" y="10" width="4" height="2" fill="#79502e"/><rect x="12" y="12" width="8" height="1" fill="#4d321f"/>
        <rect className="pixel-eye pixel-eye-left" x="13" y="11" width="2" height="2" fill="#e7a344"/><rect className="pixel-eye pixel-eye-right" x="18" y="11" width="2" height="2" fill="#e7a344"/><rect x="13" y="11" width="1" height="1" fill="#ffe0a0"/><rect x="18" y="11" width="1" height="1" fill="#ffe0a0"/>
      </g>
    </svg>
  </div>
}
