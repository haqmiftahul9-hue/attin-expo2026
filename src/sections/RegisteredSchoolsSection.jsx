import { useEffect, useState } from 'react'
import { getVerifiedSchools, subscribeToVerifiedSchools } from '../lib/registrationsRepository.js'
import Icon from '../components/Icon.jsx'

const getBadgeStyles = (lombaSlug) => {
  switch (lombaSlug.toLowerCase()) {
    case 'tahfizh':
      return 'bg-blue-50 text-[#002B49] border-[#002B49]/15'
    case 'pra-tka':
      return 'bg-rose-50 text-[#8B1E3F] border-[#8B1E3F]/15'
    case 'panahan':
      return 'bg-teal-50 text-[#0F766E] border-[#0F766E]/15'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

export default function RegisteredSchoolsSection() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe = () => {}

    async function fetchData() {
      const data = await getVerifiedSchools()
      setSchools(data)
      setLoading(false)

      unsubscribe = await subscribeToVerifiedSchools((newData) => {
        setSchools(newData)
      })
    }

    fetchData()

    return () => {
      unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <section className="w-full py-16 lg:py-24 px-5 lg:px-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[200px]">
          <div className="animate-spin text-[#002B49] opacity-50 mb-4">
            <Icon name="refresh" className="text-4xl" />
          </div>
          <p className="text-slate-500 font-medium text-sm">Memuat data kontingen...</p>
        </div>
      </section>
    )
  }

  if (schools.length === 0) {
    return null
  }

  return (
    <section className="w-full py-16 lg:py-24 px-5 lg:px-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#002B49]/[0.03] rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#8B1E3F]/[0.03] rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#002B49] mb-4 shadow-sm border border-slate-200">
            <Icon name="verified_user" className="text-[24px]" />
          </div>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0F172A] tracking-tight mb-3">
            Sekolah Terdaftar
          </h2>
          <p className="text-[15px] text-slate-500 max-w-xl mx-auto leading-relaxed">
            Daftar sekolah dan madrasah yang telah menyelesaikan registrasi dan lolos verifikasi panitia.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-4 px-6 text-[13px] font-bold text-[#0F172A] tracking-wide w-1/2 uppercase">Nama Sekolah / Madrasah</th>
                  <th className="py-4 px-6 text-[13px] font-bold text-[#0F172A] tracking-wide w-1/2 uppercase">Cabang Lomba yang Diikuti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schools.map((school, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-5 px-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="font-bold text-[15px] text-[#0F172A] leading-tight">
                          {school.school_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 align-middle">
                      <div className="flex flex-wrap gap-2">
                        {school.competitions.map((lomba, idx) => {
                          const styles = getBadgeStyles(lomba)
                          return (
                            <span key={idx} className={`px-3 py-1 text-[11px] font-bold rounded border capitalize whitespace-nowrap ${styles}`}>
                              {lomba.replace('-', ' ')}
                            </span>
                          )
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

