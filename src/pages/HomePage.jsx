import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import BenefitsSection from '../sections/BenefitsSection.jsx'
import CallToActionSection from '../sections/CallToActionSection.jsx'
import CompetitionSection from '../sections/CompetitionSection.jsx'
import ContactSection from '../sections/ContactSection.jsx'
import EventStatsSection from '../sections/EventStatsSection.jsx'
import FaqSection from '../sections/FaqSection.jsx'
import HeroSection from '../sections/HeroSection.jsx'
import JuknisSection from '../sections/JuknisSection.jsx'
import TimelineSection from '../sections/TimelineSection.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import { site } from '../data/site.js'

export default function HomePage() {
  usePageTitle(site.title)

  return (
    <>
      <Header />

      <main className="w-full pt-20 bg-surface flex-1">
        <div className="flex flex-col w-full">
          <HeroSection />
          <EventStatsSection />
          <AboutSection />
          <CompetitionSection />
          <BenefitsSection />
          <TimelineSection />
          <JuknisSection />
          <CallToActionSection />
          <FaqSection />
          <ContactSection />
        </div>
      </main>

      <Footer />
    </>
  )
}