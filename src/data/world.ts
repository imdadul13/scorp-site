export const WORLD_LOCATIONS = [
  { id: 'sector-01', name: 'THE DESERT', sector: '01', status: 'ACTIVE', symbol: '▧' },
  { id: 'sector-02', name: 'THE DEN', sector: '02', status: 'UNKNOWN', symbol: '⌂' },
  { id: 'sector-03', name: 'THE SWARM', sector: '03', status: 'ACTIVE', symbol: '⁙' },
  { id: 'sector-04', name: 'THE ARCHIVE', sector: '04', status: 'CLASSIFIED', symbol: '▤' },
  { id: 'sector-05', name: 'THE STING', sector: '05', status: 'LOCKED', symbol: '✳' },
] as const

export const UNKNOWN_LOCATION = { name: '???', symbol: '◈' } as const
