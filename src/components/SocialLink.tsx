import type { ReactNode } from 'react'
import { PROJECT_STATE } from '../config/project'

export default function SocialLink({ channel, className, children }: { channel: 'x' | 'telegram'; className?: string; children: ReactNode }) {
  const href = channel === 'x' ? PROJECT_STATE.xUrl : PROJECT_STATE.telegramUrl
  return <a className={`${className ?? ''} ${href ? '' : 'social-unavailable'}`} href={href || '#socials'} aria-disabled={!href} data-message={href ? undefined : 'SIGNAL UNAVAILABLE.'} onClick={event => { if (!href) event.preventDefault() }}>{children}</a>
}
