/**
 * Sumber tunggal pembacaan environment variable aplikasi.
 *
 * Vite hanya meng-expose variabel berawalan `VITE_` ke bundle browser, jadi:
 *  - `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` aman diakses di frontend;
 *  - `SUPABASE_SERVICE_ROLE_KEY`, password database, JWT secret, dan private key
 *    TIDAK BOLEH dideklarasikan sebagai `VITE_*` karena akan bocor ke pengguna.
 *    Secret tersebut hanya boleh berada di environment Vercel / Edge Function.
 *
 * Akses selalu lewat `import.meta.env` (statis digantikan Vite saat build),
 * bukan `process.env`, agar nilai tidak pernah tertinggal di source code.
 */

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

export const env = Object.freeze({
  supabaseUrl,
  supabaseAnonKey,
})

/** True hanya bila kedua kredensial publik Supabase sudah terisi. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (import.meta.env.DEV && !isSupabaseConfigured) {
  console.warn(
    '[env] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diisi. ' +
      'Salin .env.example menjadi .env lalu isi nilainya.',
  )
}