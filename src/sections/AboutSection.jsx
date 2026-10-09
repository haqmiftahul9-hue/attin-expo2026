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
    <section id="tentang" className="w-full bg-white py-16 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <Reveal className="lg:col-span-5 w-full">
            <div className="relative w-full aspect-[4/3] overflow-visible">
              
              {/* Decorative Navy Offset Card */}
              <div 
                className="absolute bg-[#002B49] rounded-2xl z-0" 
                style={{
                  top: '20px',
                  bottom: '-20px',
                  left: '20px',
                  right: '-20px'
                }}
              />
              
              {/* Image Container */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/95 via-[#002B49]/30 to-transparent flex items-end p-6">
                  <div>
                    <span className="font-bold text-[11px] uppercase tracking-widest text-sky-200 mb-1 block">
                      Konsistensi 12 Tahun
                    </span>
                    <p className="font-bold text-[18px] text-white leading-tight">
                      Mencetak Generasi Berjiwa Qur'ani Sejak Usia Dasar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7 flex flex-col pt-4 lg:pt-0">
            <div className="flex flex-col gap-6">
              
              {/* Heading Area */}
              <div>
                <span className="inline-flex items-center text-[11px] font-bold text-[#002B49] tracking-[0.1em] uppercase bg-[#002B49]/5 border border-[#002B49]/10 px-3 py-1.5 rounded w-fit mb-4">
                  {about.badge}
                </span>
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
                  {about.title}
                </h2>
                <p className="text-[16px] text-slate-500 leading-relaxed mt-4 max-w-2xl">
                  {about.body}
                </p>
              </div>

              {/* Feature Cards Area */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-2">
                {about.points.map((point) => (
                  <div 
                    key={point.title} 
                    className="flex flex-col bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#002B49]/5 text-[#002B49] flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 transition-transform">
                      <MaterialIcon name={point.icon} className="text-[20px]" />
                    </div>
                    <h3 className="text-[14px] font-bold text-[#0F172A] mb-2 tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
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

