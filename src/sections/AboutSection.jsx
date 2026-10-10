import { useState, useEffect } from 'react'
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
    <section 
      id="tentang" 
      className="relative w-full py-10 md:py-12 lg:py-16 scroll-mt-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center p-8 md:p-10 lg:p-12">
          
          {/* Left Column: Image Area */}
          <Reveal className="lg:col-span-5 w-full flex items-center justify-center lg:justify-start">
            <div className="relative w-full aspect-[4/3] max-w-[400px] mx-auto lg:mx-0 overflow-visible">
              
              {/* Decorative Navy Offset */}
              <div 
                className="absolute bg-[#061B33] rounded-2xl z-0 transition-all" 
                style={{
                  top: '16px',
                  bottom: '-16px',
                  left: '16px',
                  right: '-16px'
                }}
              />
              
              {/* Image Container */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-xl border border-white/20">
                {site.heroImages && site.heroImages.map((imgSrc, index) => (
                  <img
                    key={index}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={imgSrc}
                    alt={site.heroImageAlt}
                  />
                ))}
                
                {/* Overlay Gradient on Image */}
                <div 
                  className="absolute inset-0 flex items-end p-6 md:p-8"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%)'
                  }}
                >
                  <div>
                    <span className="font-bold text-[13px] md:text-[14px] uppercase tracking-[0.15em] text-sky-200 mb-2 block opacity-90">
                      Konsistensi 12 Tahun
                    </span>
                    <p className="font-extrabold text-[16px] md:text-[18px] text-white leading-tight drop-shadow-sm">
                      Mencetak Generasi Berjiwa Qur'ani Sejak Usia Dasar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Text Area */}
          <Reveal delay={100} className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex flex-col max-w-[620px]">
              
              {/* Badge */}
              <span className="inline-flex items-center text-[13px] md:text-[14px] font-bold text-[#0057B8] tracking-[0.15em] uppercase bg-[#0057B8]/10 px-3.5 py-1.5 rounded-sm w-fit mb-4">
                {about.badge}
              </span>
              
              {/* Heading */}
              <h2 className="text-[32px] md:text-[38px] lg:text-[44px] font-extrabold text-[#061B33] tracking-[-0.02em] leading-[1.15]">
                {about.title}
              </h2>
              
              {/* Separator Accent */}
              <div className="w-16 h-1.5 bg-[#8B1E3F] mt-5 mb-7 rounded-full" />
              
              {/* Description */}
              <p className="text-[16px] lg:text-[18px] text-[#475569] leading-[1.6] max-w-[600px] whitespace-pre-line">
                {about.body}
              </p>
              
            </div>
          </Reveal>
           
          </div>
        </div>
      </div>
    </section>
  )
}
