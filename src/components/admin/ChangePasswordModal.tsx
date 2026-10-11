import React, { useState } from 'react'
import MaterialIcon from '../MaterialIcon.jsx'
import { supabase } from '../../lib/supabaseClient.js'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!isOpen) return null

  const handleClose = () => {
    if (isLoading) return
    setError('')
    setSuccess('')
    setNewPassword('')
    setConfirmPassword('')
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword.length < 6) {
      setError('Kata sandi baru minimal harus 6 karakter.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok. Harap periksa kembali.')
      return
    }

    if (!supabase) {
      setError('Koneksi ke Supabase belum terkonfigurasi.')
      return
    }

    setIsLoading(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) {
        throw updateError
      }

      setSuccess('Kata sandi admin berhasil diperbarui! Gunakan kata sandi baru ini untuk login selanjutnya.')
      setNewPassword('')
      setConfirmPassword('')

      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (err: any) {
      const msg = err?.message?.toLowerCase() || ''
      if (msg.includes('same as old')) {
        setError('Kata sandi baru tidak boleh sama dengan kata sandi lama.')
      } else {
        setError(err?.message || 'Terjadi kesalahan saat mengganti kata sandi.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#002B49] text-white flex items-center justify-center shadow-md">
              <MaterialIcon name="vpn_key" className="text-[20px]" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#0F172A] tracking-tight">Ganti Kata Sandi</h3>
              <p className="text-[12px] text-[#475569] font-medium">Perbarui kata sandi akun Admin Portal</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#334155] hover:bg-slate-100 transition-colors"
          >
            <MaterialIcon name="close" className="text-[20px]" />
          </button>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2.5 text-[13px]">
            <MaterialIcon name="error" className="text-[18px] text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2.5 text-[13px]">
            <MaterialIcon name="check_circle" className="text-[18px] text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{success}</span>
          </div>
        )}

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-[#334155] mb-1.5" htmlFor="newPassword">
              Kata Sandi Baru <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <MaterialIcon name="lock" className="absolute left-3.5 text-[#64748B] text-[18px] pointer-events-none" />
              <input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                placeholder="Minimal 6 karakter"
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-white text-[#0F172A] text-[14px] border border-[#CBD5E1] focus:outline-none focus:border-[#0057B8] focus:ring-2 focus:ring-[#0057B8]/20 transition-all placeholder:text-[#64748B]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 text-[#64748B] hover:text-[#334155] p-1"
              >
                <MaterialIcon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[18px]" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#334155] mb-1.5" htmlFor="confirmPassword">
              Ulangi Kata Sandi Baru <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <MaterialIcon name="lock_reset" className="absolute left-3.5 text-[#64748B] text-[18px] pointer-events-none" />
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                placeholder="Ketik ulang kata sandi baru"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white text-[#0F172A] text-[14px] border border-[#CBD5E1] focus:outline-none focus:border-[#0057B8] focus:ring-2 focus:ring-[#0057B8]/20 transition-all placeholder:text-[#64748B]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 h-10 rounded-xl text-[13px] font-bold text-[#334155] hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 h-10 rounded-xl bg-[#002B49] hover:bg-[#003B66] text-white text-[13px] font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <MaterialIcon name="progress_activity" className="text-[16px] animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="save" className="text-[16px]" />
                  <span>Simpan Kata Sandi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

