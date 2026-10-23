-- Jalankan script ini di SQL Editor Supabase untuk memastikan tabel memiliki kolom yang benar
-- dan mengatasi masalah 500 Internal Server Error saat pendaftaran.

-- 1. Pastikan kolom category ada di tabel site_settings dan faqs
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'general';
ALTER TABLE public.faqs ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'general';

-- 2. Pastikan tabel competitions memiliki data awal
INSERT INTO public.competitions (slug, name, full_name, tagline, description, icon_name, fee_amount, quota, form_config)
VALUES 
('tahfizh', 'Tahfizh Al-Qur''an', 'Lomba Tahfizh Al-Qur''an', 'Melahirkan Generasi Qur''ani', 'Lomba Hafalan Al-Qur''an dengan tajwid dan tartil terbaik.', 'menu_book', 150000, 100, '[{"name": "nama_pa", "label": "Nama Peserta Putra"}, {"name": "nama_pi", "label": "Nama Peserta Putri"}]'),
('olimpiade', 'Olimpiade Matematika, IPA, dan IPS', 'Olimpiade Matematika, IPA, dan IPS', 'Mengasah Penalaran Logika dan Pemahaman Sains', 'Olimpiade Matematika, IPA, dan IPS untuk siswa kelas 3, 4, dan 5 SD/MI sederajat mengasah penalaran logika, pemahaman konsep, dan ketrampilan proses sains.', 'school', 35000, 100, '[{"name": "kategori_olimpiade", "label": "Mata Pelajaran", "options": [{"value": "matematika", "label": "Matematika"}, {"value": "ipa", "label": "IPA"}, {"value": "ips", "label": "IPS"}]}]'),
('panahan', 'Panahan', 'Lomba Panahan Tradisional', 'Melatih Fokus dan Ketangkasan', 'Kompetisi memanah tingkat dasar dengan jarak 10 meter.', 'track_changes', 120000, 80, '[]'),
('kolase', 'Lomba Kolase Anak dan Orang Tua', 'Lomba Kolase Anak dan Orang Tua', 'Karya kolase kolaboratif anak dan orang tua', 'Lomba Kolase Anak dan Orang Tua mengajak anak TK/PAUD bekerja sama dengan orang tuanya menciptakan karya kolase seni kreatif.', 'diversity_3', 20000, 100, '[]'),
('pra-tka', 'Lomba Pra-TKA', 'Lomba Pra-TKA (Pra Tahfidz & Keislaman Anak)', 'Lomba Pra-Tahfidz & Keislaman Anak', 'Lomba Pra-Tahfidz & Keislaman Anak mengenalkan hafalan surat pendek, doa harian, dan adab Islami bagi anak usia dini.', 'auto_stories', 35000, 100, '[]'),
('futsal', 'Lomba Futsal', 'Lomba Futsal', 'Kompetisi futsal antar sekolah', 'Kompetisi futsal antar sekolah/madrasah SD/MI yang menjunjung tinggi sportivitas, kerja sama tim, dan adab Islami di atas lapangan.', 'sports_soccer', 250000, 100, '[]'),
('baca-puisi', 'Lomba Baca Puisi', 'Lomba Baca Puisi', 'Lomba baca puisi Islami', 'Lomba baca puisi Islami yang mengasah kefasihan, ekspresi, dan apresiasi sastra bagi siswa SD/MI sederajat.', 'record_voice_over', 35000, 100, '[]')
ON CONFLICT (slug) DO NOTHING;

-- 3. Pastikan bucket storage tersedia
INSERT INTO storage.buckets (id, name, public) 
VALUES ('registration-payments', 'registration-payments', false) ON CONFLICT (id) DO NOTHING;

-- 4. Pastikan tabel registrations memiliki kolom baru
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS category VARCHAR(100);
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS participant_count INT DEFAULT 1;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS unit_fee INT DEFAULT 0;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS total_fee INT DEFAULT 0;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS grades TEXT NOT NULL DEFAULT '';
