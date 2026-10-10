-- Jalankan script ini di SQL Editor Supabase untuk memastikan tabel memiliki kolom yang benar
-- dan mengatasi masalah 500 Internal Server Error saat pendaftaran.

-- 1. Pastikan kolom category ada di tabel site_settings dan faqs
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'general';
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'general';

-- 2. Pastikan tabel competitions memiliki data awal
INSERT INTO public.competitions (slug, name, full_name, tagline, description, icon_name, fee_amount, quota, form_config)
VALUES 
('tahfizh', 'Tahfizh Al-Qur''an', 'Lomba Tahfizh Al-Qur''an', 'Melahirkan Generasi Qur''ani', 'Lomba Hafalan Al-Qur''an dengan tajwid dan tartil terbaik.', 'menu_book', 150000, 100, '[{"name": "nama_pa", "label": "Nama Peserta Putra"}, {"name": "nama_pi", "label": "Nama Peserta Putri"}]'),
('pra-tka', 'Pra-TKA', 'Lomba Pra-TKA', 'Membangun Karakter Usia Dini', 'Lomba akademik dasar untuk tingkat usia dini dan TK.', 'child_care', 100000, 50, '[]'),
('panahan', 'Panahan', 'Lomba Panahan Tradisional', 'Melatih Fokus dan Ketangkasan', 'Kompetisi memanah tingkat dasar dengan jarak 10 meter.', 'track_changes', 120000, 80, '[]')
ON CONFLICT (slug) DO NOTHING;

-- 3. Pastikan bucket storage tersedia
INSERT INTO storage.buckets (id, name, public) 
VALUES ('registration-payments', 'registration-payments', false) ON CONFLICT (id) DO NOTHING;

-- 4. Pastikan tabel registrations memiliki kolom baru
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS category VARCHAR(100);
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS participant_count INT DEFAULT 1;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS unit_fee INT DEFAULT 0;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS total_fee INT DEFAULT 0;
