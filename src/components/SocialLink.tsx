import type { ReactNode } from 'react'
import { SOCIALS } from '../data/siteConfig'

export default function SocialLink({ channel, className, children }: { channel: keyof typeof SOCIALS; className?: string; children: ReactNode }) {
  const href = SOCIALS[channel]
  return <a className={`${className ?? ''} ${href ? '' : 'social-unavailable'}`} href={href || '#socials'} aria-disabled={!href} data-message={href ? undefined : 'SIGNAL UNAVAILABLE.'} onClick={event => { if (!href) event.preventDefault() }}>{children}</a>
}
