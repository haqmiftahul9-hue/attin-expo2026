import Reveal from './Reveal.jsx'

/**
 * Blok judul seksi yang dipakai berulang (badge + judul + deskripsi).
 * `align="left" | "center"`, `titleClassName` untuk warna judul.
 */
export default function SectionHeading({
  badge,
  badgeClassName = 'text-[#002B49] bg-[#002B49]/5 border-[#002B49]/10',
  title,
  titleClassName = 'text-[#0F172A]',
  description,
  descriptionClassName = 'text-[#475569]',
  align = 'center',
  wrapperClassName = '',
  className = '',
}) {
  const isCenter = align === 'center'
  const layoutClassName = isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'

  return (
    <Reveal
      className={`${layoutClassName} mb-10 md:mb-12 ${wrapperClassName} ${className}`.trim()}
    >
      <span className={`inline-flex items-center text-[14px] font-bold tracking-[0.1em] uppercase border px-3 py-1.5 rounded mb-3 md:mb-4 ${badgeClassName}`}>
        {badge}
      </span>
      <h2 className={`text-[32px] md:text-[40px] font-extrabold tracking-tight leading-[1.15] mb-4 md:mb-5 ${titleClassName}`}>
        {title}
      </h2>
      {description ? <p className={`text-[16px] md:text-[18px] ${descriptionClassName} leading-relaxed max-w-xl ${isCenter ? 'mx-auto' : ''}`}>{description}</p> : null}
    </Reveal>
  )
}

