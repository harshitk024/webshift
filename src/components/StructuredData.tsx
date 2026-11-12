import { Helmet } from 'react-helmet-async'
import { SITE_URL } from "./seo"

// Put <StructuredData /> once, on the Home page.
export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Webshift',
    url: SITE_URL,
    image: `${SITE_URL}/webshift.jpg`,
    description:
      'Independent digital creative studio offering web design, video editing, media handling, SEO and website testing for local businesses.',
    email: 'hello@webshift.co.in', // ⚠️ use your real email
    // telephone: '+919761875434',   // ⚠️ add your real number
    areaServed: ['Mathura', 'Vrindavan', 'Uttar Pradesh', 'India'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mathura',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    // sameAs: ['https://www.instagram.com/yourhandle', 'https://www.linkedin.com/company/yourpage'],
    makesOffer: [
      'Web Design',
      'Video Editing',
      'Media Handling',
      'SEO',
      'Website Testing',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}