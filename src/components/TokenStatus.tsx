import CopyButton from './CopyButton'
import { PROJECT_STATE } from '../config/project'

export default function TokenStatus() {
  const { launched, contractAddress, buyUrl, ticker, network } = PROJECT_STATE
  const address = contractAddress.trim()
  const buyLink = buyUrl.trim()
  const hasContract = launched && Boolean(address)

  return <div className="token-card">
    <div className="token-title"><span className="token-glyph">✳</span><div><span className="mono small">{launched ? 'ARTIFACT DETECTED' : 'FOUND OBJECT'}</span><h3>{PROJECT_STATE.name}</h3></div><span className="token-index">ARTIFACT / 001</span></div>
    {launched && <p className="launch-message">THE STING HAS LANDED.</p>}
    <div className="token-data token-data-live">
      <div><span>TICKER</span><b>{ticker}</b></div>
      <div><span>STATUS</span><b>{launched ? 'AWAKE' : 'AWAITING AWAKENING'}</b></div>
      <div><span>NETWORK</span><b>{network.toUpperCase()}</b></div>
      <div className="contract-field"><span>{hasContract ? 'CA' : 'CONTRACT'}</span><b className="pending">{hasContract ? address : 'COMING SOON'}</b>{hasContract && <CopyButton value={address} />}</div>
    </div>
    {buyLink && launched && <a className="pixel-button primary buy-scorp" href={buyLink} target="_blank" rel="noreferrer">BUY SCORP</a>}
    {!launched && <div className="token-warning">NO PROMISES.<br />NO PROPHECY.<br /><em>JUST SCORP.</em></div>}
  </div>
}
