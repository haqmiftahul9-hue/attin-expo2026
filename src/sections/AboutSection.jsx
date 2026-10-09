import { useState, useEffect } from 'react'
import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { about } from '../data/home.js'
import { site } from '../data/site.js'

export default function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (!site.heroImages || site.heroImages.length === 0) return
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % site.heroImages.length)
    }, 3500)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <section id="tentang" className="w-full bg-transparent py-16 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <Reveal className="lg:col-span-5 w-full">
            {/* Image Wrapper with decoration */}
            <div className="relative w-full aspect-[4/3] overflow-visible">
              
              {/* Decorative Blue Card Background */}
              <div 
                className="absolute bg-[#0057b8] rounded-2xl z-0" 
                style={{
                  top: '24px',
                  bottom: '-24px',
                  left: '24px',
                  right: '-24px'
                }}
              />
              
              {/* Actual Image Container */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-lg border border-white/20">
                {site.heroImages && site.heroImages.map((imgSrc, index) => (
                  <img
                    key={index}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={imgSrc}
                    alt={site.heroImageAlt}
                  />
                ))}
                
                {/* Overlay Gradient on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001b3e]/90 via-[#001b3e]/20 to-transparent flex items-end p-6">
                  <div>
                    <span className="font-bold text-[11px] uppercase tracking-wider text-[#aac7ff] mb-1 block">
                      Konsistensi 12 Tahun
                    </span>
                    <p className="font-bold text-lg text-white leading-tight">
                      Mencetak Generasi Berjiwa Qur'ani Sejak Usia Dasar
                    </p>
                  </div>
                </div>
              </div>
              
              

            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7 flex flex-col pt-2 lg:pt-0">
            <div className="flex flex-col gap-5">
              
              {/* Heading Area */}
              <div>
                <span className="text-[12px] font-bold text-[#0057b8] tracking-widest uppercase bg-[#eaf3ff] px-3 py-1.5 rounded-full w-fit mb-4 block">
                  {about.badge}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191c1e] tracking-tight leading-tight">
                  {about.title}
                </h2>
                <p className="text-base text-[#424751] leading-relaxed mt-4">
                  {about.body}
                </p>
              </div>

              {/* Feature Cards Area */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                {about.points.map((point) => (
                  <div 
                    key={point.title} 
                    className="flex flex-col bg-white border border-[#e5e7eb] shadow-sm rounded-2xl p-4 lg:p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#eaf3ff] text-[#0057b8] flex items-center justify-center mb-3 shrink-0">
                      <MaterialIcon name={point.icon} className="text-[20px]" />
                    </div>
                    <h3 className="text-[15px] font-bold text-[#191c1e] mb-1.5 tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-[14px] text-[#424751] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
              
            </div>
          </Reveal>
          
        </div>
      </div>
    </section>
  )
}
