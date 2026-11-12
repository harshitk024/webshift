import { PageMeta } from '../components/PageMeta'
import { Contact } from '../sections/Contact'
import { Process } from '../sections/Process'
import { Services } from '../sections/Services'
import { Seo } from '../components/Seo'
import { StructuredData } from '../components/StructuredData'

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Services — Webshift"
        description="Business websites, landing pages, redesigns, responsive design, WhatsApp integration, basic local SEO, and maintenance for local businesses."
      />
      <Seo
        path="/"
        title="Web Design, Video Editing & SEO in Mathura | Webshift"
        description="Webshift is an independent digital creative studio in Mathura. We design websites, edit video and handle SEO for local businesses that want to grow online."
      />
      <StructuredData />
      <Services />
      <Process />
      <Contact />
    </>
  )
}
