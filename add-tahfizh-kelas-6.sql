-- Tambahkan cabang lomba baru: Lomba Tahfizh Kelas 6
INSERT INTO public.competitions (slug, name, full_name, tagline, description, icon_name, fee_amount, quota, form_config, categories)
VALUES (
  'tahfizh-kelas-6',
  'Lomba Tahfizh Kelas 6',
  'Lomba Tahfizh Kelas 6',
  'Lomba hafalan Al-Qur''an menguji kefasihan makhraj, ketepatan hukum tajwid, kelancaran adab tilawah, dan irama tartil.',
  'Lomba hafalan Al-Qur''an menguji kefasihan makhraj, ketepatan hukum tajwid, kelancaran adab tilawah, dan irama tartil.',
  'menu_book',
  35000,
  100,
  '[]'::jsonb,
  '[]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;
