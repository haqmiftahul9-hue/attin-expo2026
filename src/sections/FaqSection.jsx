import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import MaterialIcon from '../components/MaterialIcon.jsx'
import { faq as staticFaq } from '../data/home.js'
import { site } from '../data/site.js'
import { getFaqs } from '../lib/cmsRepository.js'

export default function FaqSection() {
  const [faqItems, setFaqItems] = useState(staticFaq.items)

  useEffect(() => {
    async function loadFaqs() {
      const data = await getFaqs()
      if (data && data.length > 0) {
        setFaqItems(data)
      }
    }
    loadFaqs()
  }, [])

  return (
    <section id="faq" className="w-full bg-white py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-4xl mx-auto px-5 lg:px-20">
        <SectionHeading
          badge={staticFaq.badge}
          title={staticFaq.title}
          description={staticFaq.description}
        />

        <div className="mt-12 flex flex-col bg-white border border-slate-200 rounded-2xl p-5 md:p-8 shadow-sm relative overflow-hidden">
          {/* Chat Window Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#002B49]/5 flex items-center justify-center shrink-0 border border-[#002B49]/10">
                <MaterialIcon name="support_agent" className="text-[#002B49] text-[24px]" />
              </div>
              <div>
                <h3 className="font-bold text-[15px] text-[#0F172A]">Tim Support {site.name}</h3>
                <p className="text-[13px] text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  Aktif membalas
                </p>
              </div>
            </div>
            <MaterialIcon name="more_horiz" className="text-slate-400" />
          </div>

          {/* Chat Messages */}
          <div className="space-y-10 flex-1 overflow-y-auto pr-2 pb-4">
            {faqItems.map((item, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="space-y-6">
                  {/* User Question (Right) */}
                  <div className="flex justify-end">
                    <div className="max-w-[90%] sm:max-w-[80%] flex flex-col items-end">
                      <div className="bg-[#002B49] text-white p-4 lg:p-5 rounded-2xl rounded-tr-sm shadow-sm inline-block text-left border border-[#003B66]">
                        <p className="text-[14px] lg:text-[15px] font-semibold leading-relaxed">{item.question}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-2 px-1">Anda • Ditanya baru saja</span>
                    </div>
                  </div>

                  {/* Agent Answer (Left) */}
                  <div className="flex justify-start gap-3 lg:gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-1 shadow-sm overflow-hidden">
                      <img src="/assets/logo-attin-expo.png" alt="Admin" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="max-w-[90%] sm:max-w-[80%] flex flex-col items-start">
                      <div className="bg-slate-50 border border-slate-200 text-[#0F172A] p-4 lg:p-5 rounded-2xl rounded-tl-sm shadow-sm inline-block">
                        <p className="text-[14px] lg:text-[15px] font-medium leading-relaxed">{item.answer}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-2 px-1">Admin Expo • Langsung membalas</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          
          {/* Faux Input Box */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-5 py-3 flex items-center justify-between">
              <span className="text-[14px] text-slate-400">Ketik pertanyaan lainnya...</span>
              <MaterialIcon name="sentiment_satisfied" className="text-slate-400 text-[22px]" />
            </div>
            <div className="w-12 h-12 rounded-full bg-[#002B49] flex items-center justify-center shrink-0 shadow-md cursor-pointer hover:bg-[#003B66] transition-colors">
              <MaterialIcon name="send" className="text-white text-[20px] ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

