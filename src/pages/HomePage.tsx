import { PageMeta } from '../components/PageMeta'
import { site } from '../config/site'
import  About from '../sections/About'
import { Contact } from '../sections/Contact'
import { Faq } from '../sections/Faq'
import { Hero } from '../sections/Hero'
import { Process } from '../sections/Process'
import { SelectedWork } from '../sections/SelectedWork'
import { Services } from '../sections/Services'
import { Why } from '../sections/Why'
import { Seo } from '../components/seo'
import { StructuredData } from '../components/StructuredData'

export function HomePage() {
  return (
    <>
      <PageMeta title={`${site.name} — Web design for local businesses`} description={site.description} />
      <Seo
        path="/"
        title="Web Design, Video Editing & SEO in Mathura | Webshift"
        description="Webshift is an independent digital creative studio in Mathura. We design websites, edit video and handle SEO for local businesses that want to grow online."
      />
      <StructuredData />
      <Hero />
      <SelectedWork />
      <Services teaser />
      <Why />
      <Process />
      <About />
      <Faq />
      <Contact />
    </>
  )
}
