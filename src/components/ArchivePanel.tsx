import { useState } from 'react'

const records = [
  { id: 'FILE 001', status: 'LOCKED', description: 'ORIGIN RECORD', response: 'ACCESS DENIED.' },
  { id: 'FILE 002', status: 'CORRUPTED', description: 'FIELD IMAGE', response: 'DATA CORRUPTED.' },
  { id: 'FILE 003', status: 'CLASSIFIED', description: 'BEHAVIOR NOTES', response: 'ACCESS DENIED.' },
  { id: 'FILE 004', status: 'UNKNOWN', description: 'UNINDEXED MATERIAL', response: 'CLASSIFICATION FAILED.' },
]
const details = [['SPECIMEN', 'SCORP'], ['ORIGIN', 'UNKNOWN'], ['HABITAT', 'SECTOR 09'], ['BEHAVIOR', 'OBSERVATIONAL'], ['THREAT', 'UNKNOWN'], ['STATUS', 'AWAKE']]

export default function ArchivePanel() {
  const [message, setMessage] = useState('')
  function openRecord(response: string) {
    setMessage(response)
    window.setTimeout(() => setMessage(current => current === response ? '' : current), 2200)
  }
  return <div className="archive-layout">
    <div className="archive-record"><div className="archive-bar"><span>RESEARCH DIVISION {'//'} NIGHT SHIFT</span><span>SYS.09.04</span></div><div className="archive-details">{details.map(([label, value], index) => <div className="archive-detail" key={label}><span>{label}:</span><b className={index === 5 ? 'awake' : ''}>{value}</b></div>)}</div><div className="archive-foot">OBSERVATION LOG {'//'} INCOMPLETE <span>█</span></div></div>
    <div className="locked-files" aria-label="Restricted archive files">{records.map((record, index) => <button className={`locked-file file-${index + 1}`} key={record.id} type="button" data-message={record.response} onClick={() => openRecord(record.response)}><span className="file-number">{record.id}</span><b>STATUS: {record.status}</b><small>{record.description}</small><i aria-hidden="true">▧</i></button>)}</div>
    <div className="archive-response" role="status" aria-live="polite">{message}</div>
  </div>
}
