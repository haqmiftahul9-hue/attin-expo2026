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
  align = 'center',
  wrapperClassName = '',
  className = '',
}) {
  const isCenter = align === 'center'
  const layoutClassName = isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'

  return (
    <Reveal
      className={`${layoutClassName} mb-12 space-y-4 ${wrapperClassName} ${className}`.trim()}
    >
      <span className={`inline-flex items-center text-[11px] font-bold tracking-[0.1em] uppercase border px-3 py-1.5 rounded ${badgeClassName}`}>
        {badge}
      </span>
      <h2 className={`text-[28px] md:text-[36px] font-extrabold tracking-tight ${titleClassName}`}>
        {title}
      </h2>
      {description ? <p className="text-[15px] text-slate-500 leading-relaxed max-w-xl mx-auto">{description}</p> : null}
    </Reveal>
  )
}

