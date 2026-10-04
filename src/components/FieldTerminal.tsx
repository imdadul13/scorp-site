import { useEffect, useRef, useState, type FormEvent } from 'react'
import { replies } from '../data/terminal'

const opening = ['> initializing desert...', '> scanning sector...', '> searching for life...', '> lifeform detected.', '> classification: UNKNOWN', '> threat assessment: UNKNOWN', '> ...', '> SCORP IS AWAKE.']
const commands = ['help', 'status', 'scan', 'lore', 'scorp', 'clear']

export default function FieldTerminal() {
  const [ready, setReady] = useState(false)
  const [line, setLine] = useState(0)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const output = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 180)
    return () => window.clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (!ready || line >= opening.length) return
    const timer = window.setTimeout(() => setLine(current => current + 1), line === opening.length - 2 ? 310 : 185)
    return () => window.clearTimeout(timer)
  }, [ready, line])
  useEffect(() => {
    if (output.current) output.current.scrollTop = output.current.scrollHeight
  }, [line, history])

  function submit(event: FormEvent) {
    event.preventDefault()
    const command = input.trim().toLowerCase()
    if (!command) return
    if (command === 'clear') {
      setHistory([])
      setInput('')
      return
    }
    const response = replies[command] ?? 'UNKNOWN COMMAND.\nTYPE "HELP".'
    setHistory(current => [...current, `> ${command}`, response])
    setInput('')
  }

  return <div className="terminal-window">
    <div className="terminal-bar"><span className="terminal-lights" aria-hidden="true"><i/><i/><i/></span><span>SCORP_SYS://FIELD_NODE_09</span><span className="terminal-live">● CONNECTED</span></div>
    <div className="terminal-body">
      <div ref={output} className="terminal-output" aria-live="polite" aria-relevant="additions text">
        <div className="boot-text">{opening.slice(0, line).map((row, index) => <div key={row} className={index === opening.length - 1 ? 'terminal-found' : ''}>{row}</div>)}</div>
        {history.map((row, index) => <div className={index % 2 === 0 ? 'terminal-command' : 'terminal-response'} key={`${index}-${row}`}>{row}</div>)}
      </div>
      <form onSubmit={submit} className="terminal-form"><label htmlFor="terminal-input">&gt;</label><input id="terminal-input" value={input} onChange={event => setInput(event.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Type a SCORP terminal command"/><button type="submit" className="terminal-submit" aria-label="Run command">↵</button><span className="cursor" aria-hidden="true"/></form>
      <div className="terminal-hints" aria-label="Available terminal commands">{commands.map(command => <button type="button" key={command} onClick={() => command === 'clear' ? (setHistory([]), setInput('')) : (setInput(command), document.getElementById('terminal-input')?.focus())}>{command}</button>)}</div>
    </div>
  </div>
}
