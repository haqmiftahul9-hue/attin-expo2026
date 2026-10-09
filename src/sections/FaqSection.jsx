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
    <section id="faq" className="w-full bg-transparent py-8 lg:py-12 scroll-mt-32">
      <div className="max-w-3xl mx-auto px-gutter-mobile lg:px-space-md">
        <SectionHeading
          badge={staticFaq.badge}
          badgeClassName="text-secondary"
          title={staticFaq.title}
          titleClassName="text-primary"
          description={staticFaq.description}
        />

        <div className="mt-12 flex flex-col bg-surface border-2 border-outline/80 rounded-3xl p-4 md:p-8 shadow-md relative overflow-hidden">
          {/* Chat Window Header */}
          <div className="flex items-center justify-between border-b border-outline/50 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <MaterialIcon name="support_agent" className="text-primary text-[20px]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-on-background">Tim Support {site.name}</h3>
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint"></span>
                  </span>
                  Aktif membalas
                </p>
              </div>
            </div>
            <MaterialIcon name="more_horiz" className="text-muted-foreground" />
          </div>

          {/* Chat Messages */}
          <div className="space-y-8 flex-1 overflow-y-auto pr-2">
            {faqItems.map((item, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="space-y-6">
                  {/* User Question (Right) */}
                  <div className="flex justify-end">
                    <div className="max-w-[90%] sm:max-w-[80%] flex flex-col items-end">
                      <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-sm shadow-md inline-block text-left border border-primary/20">
                        <p className="text-sm font-semibold leading-relaxed">{item.question}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1.5 px-1 font-bold">Anda • Ditanya baru saja</span>
                    </div>
                  </div>

                  {/* Agent Answer (Left) */}
                  <div className="flex justify-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface border border-outline flex items-center justify-center shrink-0 mt-1 shadow-sm overflow-hidden">
                      <img src="/assets/logo-attin-expo.png" alt="Admin" className="w-5 h-5 object-contain" />
                    </div>
                    <div className="max-w-[90%] sm:max-w-[80%] flex flex-col items-start">
                      <div className="bg-surface-container-low border border-outline text-on-background p-4 rounded-2xl rounded-tl-sm shadow-sm inline-block">
                        <p className="text-sm font-medium leading-relaxed text-on-background">{item.answer}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1.5 px-1 font-bold">Admin Expo • Langsung membalas</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          
          {/* Faux Input Box */}
          <div className="mt-8 pt-4 border-t border-outline flex items-center gap-3">
            <div className="flex-1 bg-surface-container-low border border-outline rounded-full px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ketik pertanyaan lainnya...</span>
              <MaterialIcon name="sentiment_satisfied" className="text-muted-foreground text-[20px]" />
            </div>
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
              <MaterialIcon name="send" className="text-on-primary text-[18px] ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
