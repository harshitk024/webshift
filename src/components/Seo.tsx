import { Helmet } from 'react-helmet-async'

// ⚠️ Replace with your real domain (no trailing slash)
export const SITE_URL = 'https://www.webshift.co.in'
const SITE_NAME = 'Webshift'
const DEFAULT_IMAGE = `${SITE_URL}/webshift.jpg` // 1200×630 image in /public

type SeoProps = {
  title: string
  description: string
  path?: string // e.g. "/work"
  image?: string
  noindex?: boolean
}

export function Seo({ title, description, path = '/', image = DEFAULT_IMAGE, noindex = false }: SeoProps) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph (WhatsApp, LinkedIn, Facebook) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}