export type Project = {
  slug: string
  index: string
  name: string
  industry: string
  type: 'Website concept' | 'Landing page website' | 'Personal portfolio'
  focus: string
  summary: string
  problem: string
  approach: string[]
  pages: string[]
  accent: string
  ink: string
  previewImage: string
  paper: string
  liveUrl: string
}

export const projects: Project[] = [
  {
    slug: 'jaswant-telecom',
    index: '01',
    name: 'Jaswant Telecom',
    industry: 'Mobile repair',
    type: 'Website concept',
    focus: 'Repair enquiries and accessories',
    summary:
      'A storefront for a mobile repair counter: services first, accessories second, and a straight path to an enquiry.',
    problem:
      'Repair shops are often found through a signboard or a marketplace listing. A website concept here is meant to explain what gets fixed, what it costs to ask, and how to start a repair without digging through social posts.',
    approach: [
      'Lead with the repair menu, not a brand story.',
      'Keep accessories visible without competing with the enquiry.',
      'Make calling and WhatsApp available from the first screen on a phone.',
    ],
    pages: ['Home', 'Repairs', 'Accessories', 'Contact'],
    accent: '#E23B3B',
    ink: '#161616',
    paper: '#F4F1EA',
    liveUrl: 'https://jaswant-telecom.netlify.app',
    previewImage: ""
  },
  {
    slug: 'AstroVastu Consultancy',
    index: '02',
    name: 'AstroVastu Consultancy',
    industry: 'Astro & Vastu',
    type: 'Landing page website',
    focus: 'Consultation enquiries and blog readership',
    summary:
      'A landing page for an astrology and Vastu consultancy, built so a visitor can understand the services, read the practitioner\u2019s published articles, and get in touch without hunting for a contact option.',
    problem:
      'Astrology and Vastu sites often lean on mystique and heavy visuals, which leaves a first-time visitor unsure what is actually offered or how to book. Blog posts end up hidden away, even though they are what builds trust before anyone makes contact.',
    approach: [
      'Open with a clear statement of what the consultancy offers: horoscope reading, Vastu assessment, and remedies.',
      'Keep the contact form and enquiry details visible on the landing page, so reaching out is one step away.',
      'Give the blog its own section and page, with recent articles previewed on the home page to show expertise.',
    ],
    pages: ['Home', 'Services', 'Blog', 'Contact'],
    accent: '#3E6F8C',
    ink: '#14202A',
    paper: '#F3F6F7',
    liveUrl: "https://www.astrovastuconsultancy.com/",
    previewImage: ""
  },
{
    slug: 'Video Editor Portfolio',
    index: '03',
    name: 'Portfolio',
    industry: 'Video editing',
    type: 'Personal portfolio',
    focus: 'Showcasing work and attracting editing clients',
    summary:
      'A personal portfolio for Ashish, a video editor, built so a visitor can watch his best work within seconds and know how to hire him.',
    problem:
      'Editors are judged by what they have cut, yet many portfolios bury the reel under long introductions or load heavy videos that never play. A client deciding between editors will not wait around, so the work has to be the first thing they see.',
    approach: [
      'Lead with a showreel at the top of the page, before any biography.',
      'Group projects by type, such as YouTube, reels, ads, and weddings, so clients find relevant work quickly.',
      'Keep a short enquiry panel and direct contact details visible, so hiring Ashish takes one step.',
    ],
    pages: ['Home', 'Work', 'About', 'Contact'],
    accent: '#C9852A',
    ink: '#231C14',
    paper: '#F6F1E7',
    liveUrl:"https://3d-videoportfolio.vercel.app/",
    previewImage: ""
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
