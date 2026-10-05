/** Kelas utilitas bersama formulir pendaftaran (mengikuti desain referensi). */

export const cardClassName = 'bg-surface-container-lowest p-space-lg rounded-xl shadow-sm'
export const cardHeaderClassName = 'flex items-center gap-space-sm pb-space-sm mb-space-md'
export const numberBadgeClassName =
  'w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-body-md-semibold text-caption'
export const cardTitleClassName = 'font-headline-sm text-headline-sm text-primary'
export const cardCaptionClassName = 'font-caption text-caption text-on-surface-variant'
export const labelClassName = 'block font-label-md text-label-md text-on-surface mb-1'
export const requiredClassName = 'text-error'
export const inputClassName =
  'w-full h-12 px-space-md bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface focus:outline-none focus:bg-white shadow-sm transition-all'
export const textareaClassName =
  'w-full p-space-md bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface focus:outline-none focus:bg-white shadow-sm transition-all'
export const selectClassName =
  'w-full h-12 px-space-md bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface focus:outline-none focus:bg-white shadow-sm appearance-none pr-10'
export const errorInputClassName = 'ring-1 ring-error'
export const helperClassName = 'font-caption text-caption text-on-surface-variant mt-1'
export const errorTextClassName = 'font-caption text-caption text-error mt-1'
export const chevronWrapperClassName =
  'absolute inset-y-0 right-0 flex items-center px-space-md pointer-events-none text-outline'
export const requiredBadgeClassName =
  'font-label-badge text-label-badge text-secondary bg-secondary-fixed/40 px-3 py-1 rounded-full uppercase'

export function fieldId(name: string): string {
  return `field-${name.replace(/_/g, '-')}`
}
