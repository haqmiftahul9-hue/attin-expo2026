import { useParams } from 'react-router-dom'
import AboutBranch from '../components/detail/AboutBranch.jsx'
import BranchComingSoon from '../components/detail/BranchComingSoon.jsx'
import BranchHero from '../components/detail/BranchHero.jsx'
import Breadcrumb from '../components/detail/Breadcrumb.jsx'
import CategorySection from '../components/detail/CategorySection.jsx'
import DetailFooter from '../components/detail/DetailFooter.jsx'
import DetailHeader from '../components/detail/DetailHeader.jsx'
import GuideSection from '../components/detail/GuideSection.jsx'
import HelpCallout from '../components/detail/HelpCallout.jsx'
import OtherBranches from '../components/detail/OtherBranches.jsx'
import QuickFacts from '../components/detail/QuickFacts.jsx'
import RegistrationCallout from '../components/detail/RegistrationCallout.jsx'
import RequirementsSection from '../components/detail/RequirementsSection.jsx'
import RulesSection from '../components/detail/RulesSection.jsx'
import ScheduleSection from '../components/detail/ScheduleSection.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import { getBranchDetail, relatedBranches } from '../data/branchDetail.js'

export default function BranchDetailPage() {
  const { slug } = useParams()
  const branch = getBranchDetail(slug)

  usePageTitle(branch?.metaTitle ?? 'ATTIN EXPO XII 2026')

  return (
    <div className="w-full bg-surface text-on-surface font-sans">
      <DetailHeader />

      <main>
        <div className="flex flex-col w-full">
          <Breadcrumb current={branch?.breadcrumb ?? 'Cabang Lomba'} />

          {branch?.available ? (
            <>
              <BranchHero branch={branch} />
              <QuickFacts facts={branch.facts} />
              <AboutBranch about={branch.about} />
              <CategorySection categories={branch.categories} />
              <RequirementsSection requirements={branch.requirements} />
              <RulesSection rules={branch.rules} />
              <ScheduleSection schedule={branch.schedule} />
              <GuideSection guide={branch.guide} />
              <RegistrationCallout name={branch.name} slug={slug} />
            </>
          ) : (
            <BranchComingSoon slug={slug} />
          )}

          <OtherBranches branches={relatedBranches} currentSlug={slug} />
          <HelpCallout title={branch?.tagline ?? 'Lomba'} />
        </div>
      </main>

      <DetailFooter />
    </div>
  )
}