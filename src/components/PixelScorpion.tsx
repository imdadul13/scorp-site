export default function PixelScorpion({ small = false }: { small?: boolean }) {
  return <div className={`scorpion ${small ? 'scorpion-small' : ''}`} aria-label="Temporary pixel-art scorpion placeholder" role="img">
    <i className="tail tail-a"/><i className="tail tail-b"/><i className="tail tail-c"/><i className="tail tail-d"/><i className="stinger"/>
    <i className="claw claw-left"/><i className="claw claw-right"/><i className="leg leg-a"/><i className="leg leg-b"/><i className="leg leg-c"/><i className="leg leg-d"/>
    <i className="body"/><i className="head"/><i className="eye eye-a"/><i className="eye eye-b"/>
  </div>
}
