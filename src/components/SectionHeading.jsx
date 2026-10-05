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
      <span className={`font-label-badge text-label-badge ${badgeClassName} tracking-widest uppercase`}>
        {badge}
      </span>
      <h2 className={`font-headline-lg text-headline-lg-mobile lg:text-headline-lg ${titleClassName}`}>
        {title}
      </h2>
      {description ? <p className="font-body-md text-body-md text-outline">{description}</p> : null}
    </Reveal>
  )
}
