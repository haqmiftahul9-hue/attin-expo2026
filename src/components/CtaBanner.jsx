import MaterialIcon from './MaterialIcon.jsx'

export default function CtaBanner({ 
  title = "Siap Menjadi Bagian dari ATTIN EXPO XII?", 
  description = "Daftarkan delegasi terbaik sekolah Anda sekarang juga sebelum kuota terpenuhi.",
  buttonText = "Daftar Sekarang",
  buttonHref = "#kompetisi-resmi",
  icon = "arrow_forward"
}) {
  return (
    <div className="w-full bg-[#002B45] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-[0_20px_40px_rgba(15,23,42,0.12)] relative overflow-hidden">
      
      {/* Subtle Background Decor (Enterprise / PayPal Style) */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#0057B8]/40 to-transparent rounded-full blur-3xl opacity-60 transform translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>

      <div className="flex-1 text-left z-10">
        <h3 className="text-[24px] md:text-3xl font-[800] text-white tracking-[-0.02em] leading-[1.2]">
          {title}
        </h3>
        <p className="text-sm md:text-base text-sky-100/90 font-[400] leading-[1.6] mt-3 max-w-2xl">
          {description}
        </p>
      </div>

      <div className="shrink-0 z-10 w-full md:w-auto flex justify-start md:justify-center mt-2 md:mt-0">
        <a 
          href={buttonHref}
          className="inline-flex items-center justify-center gap-2 bg-white text-[#002B45] h-12 px-8 rounded-xl font-[700] text-sm hover:bg-slate-50 hover:-translate-y-px transition-all shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_16px_rgba(255,255,255,0.25)] w-full md:w-auto"
        >
          <span>{buttonText}</span>
          {icon && <MaterialIcon name={icon} className="text-[20px]" />}
        </a>
      </div>

    </div>
  )
}

