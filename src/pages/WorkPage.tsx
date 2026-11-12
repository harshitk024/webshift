import { PageMeta } from '../components/PageMeta'
import { SelectedWork } from '../sections/SelectedWork'
import { Seo } from '../components/seo'
import { StructuredData } from '../components/StructuredData'
export function WorkPage() {
  return (
    <>
      <PageMeta
        title="Work — Webshift"
        description="Website concepts for mobile repair, home services, and solar businesses. Studies by Webshift, an independent web design studio."
      />
        <Seo
        path="/"
        title="Web Design, Video Editing & SEO in Mathura | Webshift"
        description="Webshift is an independent digital creative studio in Mathura. We design websites, edit video and handle SEO for local businesses that want to grow online."
      />
      <StructuredData />
      <SelectedWork />
    </>
  )
}
