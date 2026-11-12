/**
 * Central site configuration.
 * Replace placeholder contact details before launch.
 * Social links render only when a URL is set.
 */
export const site = {
  name: 'Webshift',
  wordmark: 'webshift',
  tagline: 'Better websites. Better business opportunities.',
  url: 'https://webshift.co.in',
  description:
    'Webshift designs and develops modern websites that help local businesses build credibility, connect with customers, and create better opportunities online.',

  /**
   * Shown in the About section. Leave as-is until a public name is confirmed.
   * Do not invent credentials alongside this field.
   */
  founderLabel: 'The person behind Webshift',

  contact: {
    email: 'hello@webshift.co.in',
    /** Digits only, including country code, no plus sign. Used for wa.me links. */
    whatsapp: '917017765457',
    whatsappDisplay: '+91 70177 65457',
    phoneDisplay: '+91 70177 65457',
    location: 'Independent studio',
  },

  socials: [
    { label: 'Instagram', href: '' },
    { label: 'LinkedIn', href: '' },
  ],
} as const

export type ProjectType =
  | 'Business website'
  | 'Landing page'
  | 'Website redesign'
  | 'Not sure yet'

export const projectTypes: ProjectType[] = [
  'Business website',
  'Landing page',
  'Website redesign',
  'Not sure yet',
]

export function whatsappHref(message?: string) {
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : `?text=${encodeURIComponent('Hello Webshift, I would like to talk about a website.')}`
  return `https://wa.me/${site.contact.whatsapp}${text}`
}

export function mailtoHref(subject = 'Website project enquiry') {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`
}
