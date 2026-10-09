import { useEffect, useState } from 'react'
import { getVerifiedSchools, subscribeToVerifiedSchools } from '../lib/registrationsRepository.js'
import Icon from '../components/Icon.jsx'

const getBadgeStyles = (lombaSlug) => {
  switch (lombaSlug.toLowerCase()) {
    case 'tahfizh':
      return 'bg-[#F0F5FF] text-[#003772] border-[#003772]/20'
    case 'pra-tka':
      return 'bg-[#FFF0F0] text-[#7F1D1D] border-[#7F1D1D]/20'
    case 'panahan':
      return 'bg-[#F0FDFA] text-[#0F766E] border-[#0F766E]/20'
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200'
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
      <section className="w-full py-20 px-6 lg:px-12 bg-gray-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[200px]">
          <div className="animate-spin text-[#003772] opacity-50 mb-4">
            <Icon name="refresh" className="text-4xl" />
          </div>
          <p className="text-gray-500 font-medium text-sm">Memuat data kontingen...</p>
        </div>
      </section>
    )
  }

  if (schools.length === 0) {
    return null
  }

  return (
    <section className="w-full py-20 px-6 lg:px-12 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#003772]/[0.02] rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-900/[0.02] rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#003772] mb-5 shadow-sm border border-gray-100">
            <Icon name="verified_user" className="text-[24px]" />
          </div>
          <h2 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight mb-3">
            Sekolah Terdaftar
          </h2>
          <p className="text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed">
            Daftar sekolah dan madrasah yang telah menyelesaikan registrasi dan lolos verifikasi panitia.
          </p>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-3.5 px-6 text-[13px] font-bold text-[#003772] tracking-wide w-1/2">Nama Sekolah / Madrasah</th>
                  <th className="py-3.5 px-6 text-[13px] font-bold text-[#003772] tracking-wide w-1/2">Cabang Lomba yang Diikuti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schools.map((school, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-5 px-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="font-bold text-[15px] text-gray-800 leading-tight">
                          {school.school_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 align-middle">
                      <div className="flex flex-wrap gap-2">
                        {school.competitions.map((lomba, idx) => {
                          const styles = getBadgeStyles(lomba)
                          return (
                            <span key={idx} className={`px-3 py-1 text-[11px] font-bold rounded-md border capitalize whitespace-nowrap ${styles}`}>
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
