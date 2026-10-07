/** Kelas utilitas bersama formulir pendaftaran (mengikuti desain referensi). */

export const cardClassName = 'bg-surface border border-outline p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow'
export const cardHeaderClassName = 'flex items-center gap-space-sm pb-space-md mb-space-md border-b border-outline/50'
export const numberBadgeClassName =
  'w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm'
export const cardTitleClassName = 'font-headline-sm text-headline-sm text-primary tracking-tight'
export const cardCaptionClassName = 'text-sm text-muted-foreground'
export const labelClassName = 'block text-sm font-semibold text-on-background mb-1.5'
export const requiredClassName = 'text-error'
export const inputClassName =
  'w-full h-12 px-4 bg-background border border-outline rounded-xl text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all placeholder:text-muted-foreground'
export const textareaClassName =
  'w-full p-4 bg-background border border-outline rounded-xl text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all placeholder:text-muted-foreground'
export const selectClassName =
  'w-full h-12 px-4 bg-background border border-outline rounded-xl text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm appearance-none pr-10 transition-all'
export const errorInputClassName = 'border-error focus:ring-error/20 focus:border-error'
export const helperClassName = 'text-xs text-muted-foreground mt-1.5'
export const errorTextClassName = 'text-xs font-medium text-error mt-1.5'
export const chevronWrapperClassName =
  'absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground'
export const requiredBadgeClassName =
  'text-[10px] font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-md uppercase tracking-[0.1em]'

export function fieldId(name: string): string {
  return `field-${name.replace(/_/g, '-')}`
}
