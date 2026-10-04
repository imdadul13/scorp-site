import { useState } from 'react'
import { ARCHIVE_FILES } from '../data/archive'

export default function ArchiveSystem() {
  const [openFile, setOpenFile] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const selected = ARCHIVE_FILES.find(file => file.id === openFile)

  function inspectFile(id: string, status: string, response?: string) {
    if (status === 'READABLE') {
      setOpenFile(id)
      setMessage('')
      return
    }
    setOpenFile(null)
    setMessage(response ?? 'ACCESS DENIED.')
    window.setTimeout(() => setMessage(current => current === (response ?? 'ACCESS DENIED.') ? '' : current), 2200)
  }

  return <div className="archive-layout archive-system">
    <div className="archive-record">
      <div className="archive-bar"><span>SCORP {'//'} ARCHIVE</span><span>SYS.09.04</span></div>
      {selected?.details ? <div className="archive-details" aria-live="polite">
        <strong className="open-file-title">{selected.id} <span>STATUS: CLASSIFIED</span></strong>
        {selected.details.map(([label, value]) => <div className="archive-detail" key={label}><span>{label}:</span><b>{value}</b></div>)}
        <button className="close-file" type="button" onClick={() => setOpenFile(null)}>CLOSE FILE</button>
      </div> : <div className="archive-details archive-idle"><span>SELECT A FILE TO INSPECT.</span><span>ACCESS LEVEL: LIMITED</span></div>}
      <div className="archive-foot">OBSERVATION LOG {'//'} INCOMPLETE <span>█</span></div>
    </div>
    <div className="locked-files" aria-label="SCORP archive files">{ARCHIVE_FILES.map(file => <button
      className={`locked-file archive-file status-${file.status.toLowerCase()}`}
      key={file.id}
      type="button"
      aria-expanded={openFile === file.id}
      onClick={() => inspectFile(file.id, file.status, file.response)}
    ><span className="file-number">{file.id}</span><b>STATUS: {file.status}</b><small>{file.description}</small><i aria-hidden="true">{file.status === 'READABLE' ? '▤' : '▧'}</i></button>)}</div>
    <div className="archive-response" role="status" aria-live="polite">{message}</div>
  </div>
}
