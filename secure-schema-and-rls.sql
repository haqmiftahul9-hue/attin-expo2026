-- ==============================================================================
-- ATTIN EXPO XII 2026 - PRODUCTION SECURITY HARDENING & ROW LEVEL SECURITY (RLS)
-- Jalankan skrip ini di menu Supabase Dashboard > SQL Editor > New Query > Run
-- ==============================================================================

-- 1. AKTIFKAN ROW LEVEL SECURITY (RLS) PADA TABEL UTAMA
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 2. HAPUS POLICY LAMA (JIKA ADA) AGAR BERSIH & TIDAK DUPLIKAT
DROP POLICY IF EXISTS "Allow public insert registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow authenticated select all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow authenticated update registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow authenticated delete registrations" ON public.registrations;
DROP POLICY IF EXISTS "Public select registrations" ON public.registrations;
DROP POLICY IF EXISTS "Public update registrations" ON public.registrations;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.registrations;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.registrations;

-- 3. POLICY UNTUK TABEL REGISTRATIONS
-- a. Peserta Umum (anon) & Admin diizinkan mendaftar (INSERT)
CREATE POLICY "Allow public insert registrations"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- b. HANYA ADMIN TERAUTENTIKASI (authenticated) yang boleh membaca (SELECT) data lengkap
CREATE POLICY "Allow authenticated select all registrations"
ON public.registrations
FOR SELECT
TO authenticated
USING (true);

-- c. HANYA ADMIN TERAUTENTIKASI (authenticated) yang boleh mengubah status (UPDATE)
CREATE POLICY "Allow authenticated update registrations"
ON public.registrations
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- d. HANYA ADMIN TERAUTENTIKASI (authenticated) yang boleh menghapus data (DELETE)
CREATE POLICY "Allow authenticated delete registrations"
ON public.registrations
FOR DELETE
TO authenticated
USING (true);

-- 4. BUAT SECURE VIEW KHUSUS UNTUK SECTION "SEKOLAH TERDAFTAR" (PUBLIK)
-- View ini HANYA menampilkan school_name dan competition_slug.
-- Seluruh data pribadi peserta (nama, no hp, tgl lahir, bukti bayar) AMAN dan tidak bisa diakses publik.
DROP VIEW IF EXISTS public.public_registered_schools;

CREATE OR REPLACE VIEW public.public_registered_schools
WITH (security_invoker = false) AS
SELECT DISTINCT school_name, competition_slug
FROM public.registrations
WHERE registration_status != 'rejected';

-- Berikan izin akses SELECT pada view aman ini untuk anon dan authenticated
GRANT SELECT ON public.public_registered_schools TO anon, authenticated;

-- 5. KEAMANAN STORAGE BUCKET (registration-payments)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('registration-payments', 'registration-payments', false) 
ON CONFLICT (id) DO UPDATE SET public = false;

-- Hapus policy storage lama jika ada
DROP POLICY IF EXISTS "Allow public upload payment proof" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated admin read payment proofs" ON storage.objects;

-- a. Peserta umum boleh mengunggah bukti transfer HANYA ke folder bukti dan tipe berkas valid
CREATE POLICY "Allow public upload payment proof"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'registration-payments'
  AND (
    LOWER(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'pdf')
  )
);

-- b. HANYA Admin yang boleh melihat / mengunduh berkas bukti transfer
CREATE POLICY "Allow authenticated admin read payment proofs"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'registration-payments');

-- 6. KEAMANAN TABEL KONTEN (CMS & SETTINGS)
-- Publik boleh membaca, tapi HANYA Admin yang boleh memodifikasi
DO $$ 
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['competitions', 'faqs', 'timeline_events', 'site_settings', 'page_sections', 'ui_cards']
  LOOP
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = tbl) THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', tbl);
      EXECUTE format('DROP POLICY IF EXISTS "Public read %s" ON public.%I;', tbl, tbl);
      EXECUTE format('DROP POLICY IF EXISTS "Admin write %s" ON public.%I;', tbl, tbl);
      EXECUTE format('CREATE POLICY "Public read %s" ON public.%I FOR SELECT TO anon, authenticated USING (true);', tbl, tbl);
      EXECUTE format('CREATE POLICY "Admin write %s" ON public.%I FOR ALL TO authenticated USING (true) WITH CHECK (true);', tbl, tbl);
    END IF;
  END LOOP;
END $$;

