-- Create news table for proper data persistence
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  author TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Pengumuman',
  image_url TEXT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policies for news access
CREATE POLICY "Everyone can view news" 
ON public.news 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert news" 
ON public.news 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update news" 
ON public.news 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete news" 
ON public.news 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default news items
INSERT INTO public.news (title, excerpt, content, author, category, featured) VALUES 
(
  'Program Bantuan Sosial Tahun 2024',
  'Pemerintah Desa Tempursari mengumumkan program bantuan sosial untuk keluarga kurang mampu tahun 2024.',
  'Pemerintah Desa Tempursari dengan bangga mengumumkan program bantuan sosial komprehensif untuk tahun 2024. Program ini dirancang khusus untuk membantu keluarga kurang mampu di desa kami...',
  'Admin Desa',
  'Pengumuman',
  true
),
(
  'Gotong Royong Pembersihan Lingkungan',
  'Kegiatan gotong royong rutin setiap hari Minggu untuk menjaga kebersihan lingkungan desa.',
  'Setiap hari Minggu, warga Desa Tempursari mengadakan kegiatan gotong royong untuk membersihkan lingkungan...',
  'Ketua RT 01',
  'Kegiatan',
  false
);