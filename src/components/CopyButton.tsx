import { useState } from 'react'

export default function CopyButton({ value }: { value: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.setTimeout(() => setState('idle'), 2200)
  }

  return <span className="copy-control">
    <button type="button" className={`copy-button copy-${state}`} onClick={copyAddress} aria-label="Copy contract address">
      {state === 'copied' ? 'COPIED ✓' : state === 'failed' ? 'COPY FAILED.' : 'COPY'}
    </button>
    {state !== 'idle' && <span className="copy-toast" role="status" aria-live="polite">{state === 'copied' ? 'COPIED.' : 'COPY FAILED.'}</span>}
  </span>
}
