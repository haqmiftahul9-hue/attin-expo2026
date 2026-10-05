import FaqAccordion from '../components/FaqAccordion.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { faq } from '../data/home.js'

export default function FaqSection() {
  return (
    <section id="faq" className="w-full bg-surface-container-low py-space-xl scroll-mt-32">
      <div className="max-w-4xl mx-auto px-gutter-mobile lg:px-space-md">
        <SectionHeading
          badge={faq.badge}
          badgeClassName="text-secondary"
          title={faq.title}
          titleClassName="text-primary"
          description={faq.description}
        />

        <Reveal>
          <FaqAccordion items={faq.items} id="faq-accordion" />
        </Reveal>
      </div>
    </section>
  )
}
