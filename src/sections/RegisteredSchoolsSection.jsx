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
      <section className="w-full py-12 lg:py-16 px-5 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12 flex flex-col items-center justify-center min-h-[200px]">
            <div className="animate-spin text-[#002B49] opacity-50 mb-4">
              <Icon name="refresh" className="text-4xl" />
            </div>
            <p className="text-slate-600 font-medium text-sm">Memuat data kontingen...</p>
          </div>
        </div>
      </section>
    )
  }

  if (schools.length === 0) {
    return null
  }

  return (
    <section className="w-full py-12 lg:py-16 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#002B49] mb-4 shadow-sm border border-white/30">
              <Icon name="verified_user" className="text-[24px]" />
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0F172A] tracking-tight mb-3">
              Sekolah Terdaftar
            </h2>
            <p className="text-[16px] text-slate-600 max-w-xl mx-auto leading-relaxed">
              Daftar sekolah dan madrasah yang telah menyelesaikan registrasi dan lolos verifikasi panitia.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white border border-white/30 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/30 bg-white/50">
                    <th className="py-4 px-6 text-[14px] font-bold text-[#0F172A] tracking-wide w-1/2 uppercase">Nama Sekolah / Madrasah</th>
                    <th className="py-4 px-6 text-[14px] font-bold text-[#0F172A] tracking-wide w-1/2 uppercase">Cabang Lomba yang Diikuti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/30">
                  {schools.map((school, i) => (
                    <tr key={i} className="hover:bg-white/50 transition-colors group">
                      <td className="py-5 px-6 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                          <span className="font-bold text-[16px] text-[#0F172A] leading-tight">
                            {school.school_name}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6 align-middle">
                        <div className="flex flex-wrap gap-2">
                          {school.competitions.map((lomba, idx) => {
                            const styles = getBadgeStyles(lomba)
                            return (
                              <span key={idx} className={`px-3 py-1 text-[14px] font-bold rounded border capitalize whitespace-nowrap ${styles}`}>
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
      </div>
    </section>
  )
}


