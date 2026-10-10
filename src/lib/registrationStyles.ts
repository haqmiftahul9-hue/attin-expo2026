/** Kelas utilitas bersama formulir pendaftaran (mengikuti desain referensi). */

export const cardClassName = 'bg-white border border-slate-900/10 p-6 rounded-[20px] shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-slate-900/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]'
export const cardHeaderClassName = 'flex items-center gap-space-sm pb-space-md mb-space-md border-b border-outline/50'
export const numberBadgeClassName =
  'w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm'
export const cardTitleClassName = 'font-headline-sm text-headline-sm text-primary tracking-tight'
export const cardCaptionClassName = 'text-[15px] text-slate-600'
export const labelClassName = 'block text-[14px] font-semibold text-[#0F172A] mb-1.5'
export const requiredClassName = 'text-error'
export const inputClassName =
  'w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20 focus:border-[#0057B8] shadow-sm transition-all placeholder:text-slate-500'
export const textareaClassName =
  'w-full p-4 bg-white border border-slate-200 rounded-xl text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20 focus:border-[#0057B8] shadow-sm transition-all placeholder:text-slate-500'
export const selectClassName =
  'w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20 focus:border-[#0057B8] shadow-sm appearance-none pr-10 transition-all'
export const errorInputClassName = 'border-error focus:ring-error/20 focus:border-error'
export const helperClassName = 'text-[14px] text-slate-600 mt-1.5'
export const errorTextClassName = 'text-[14px] font-medium text-error mt-1.5'
export const chevronWrapperClassName =
  'absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500'
export const requiredBadgeClassName =
  'text-[13px] font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-md uppercase tracking-[0.1em]'

export function fieldId(name: string): string {
  return `field-${name.replace(/_/g, '-')}`
}

