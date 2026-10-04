export type ArchiveStatus = 'READABLE' | 'LOCKED' | 'CORRUPTED' | 'CLASSIFIED' | 'UNKNOWN'

export const ARCHIVE_FILES: { id: string; status: ArchiveStatus; description: string; response?: string; details?: readonly [string, string][] }[] = [
  { id: 'FILE 001', status: 'READABLE', description: 'SPECIMEN RECORD', details: [['SPECIMEN', 'SCORP'], ['ORIGIN', 'UNKNOWN'], ['FIRST DETECTION', 'SECTOR 09'], ['BEHAVIOR', 'OBSERVATIONAL']] },
  { id: 'FILE 002', status: 'CORRUPTED', description: 'FIELD IMAGE', response: 'DATA CORRUPTED.' },
  { id: 'FILE 003', status: 'CLASSIFIED', description: 'BEHAVIOR NOTES', response: 'CLEARANCE REQUIRED.' },
  { id: 'FILE 004', status: 'LOCKED', description: 'ORIGIN RECORD', response: 'ACCESS DENIED.' },
  { id: 'FILE 005', status: 'UNKNOWN', description: 'UNINDEXED MATERIAL', response: 'SIGNAL LOST.' },
  { id: 'FILE ???', status: 'UNKNOWN', description: 'UNRESOLVED', response: 'SIGNAL LOST.' },
]
