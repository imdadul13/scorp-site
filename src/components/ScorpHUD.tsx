export default function ScorpHUD({ sector, status }: { sector: string; status: string }) {
  return <aside className="scorp-hud" aria-label="SCORP world status">
    <span className="hud-title">SCORP {'//'} 001</span>
    <span>STATUS <b>{status}</b></span>
    <span>SECTOR <b>{sector}</b></span>
    <span>THREAT <b>UNKNOWN</b></span>
    <span>SIGNAL <b className="hud-online">● ONLINE</b></span>
  </aside>
}
