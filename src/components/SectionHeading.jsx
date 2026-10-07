import Reveal from './Reveal.jsx'

/**
 * Blok judul seksi yang dipakai berulang (badge + judul + deskripsi).
 * `align="left" | "center"`, `titleClassName` untuk warna judul.
 */
export default function SectionHeading({
  badge,
  badgeClassName = 'text-primary-container',
  title,
  titleClassName = 'text-on-surface',
  description,
  align = 'center',
  wrapperClassName = '',
  className = '',
}) {
  const isCenter = align === 'center'
  const layoutClassName = isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'

  return (
    <Reveal
      className={`${layoutClassName} mb-space-xl space-y-space-xs ${wrapperClassName} ${className}`.trim()}
    >
      <span className={`text-[11px] font-bold tracking-widest uppercase bg-surface border border-outline px-2.5 py-1 rounded-full ${badgeClassName}`}>
        {badge}
      </span>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4 ${titleClassName}`}>
        {title}
      </h2>
      {description ? <p className="text-base text-muted-foreground leading-relaxed mt-4">{description}</p> : null}
    </Reveal>
  )
}
