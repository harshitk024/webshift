import { PageMeta } from '../components/PageMeta'
import { Contact } from '../sections/Contact'
import { Seo } from '../components/Seo'
import { StructuredData } from '../components/StructuredData'

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact — Webshift"
        description="Start a website project with Webshift. Share your business, the type of site, and how to reach you."
      />
      <Seo
        path="/"
        title="Web Design, Video Editing & SEO in Mathura | Webshift"
        description="Webshift is an independent digital creative studio in Mathura. We design websites, edit video and handle SEO for local businesses that want to grow online."
      />
      <StructuredData />
      <Contact />
    </>
  )
}
