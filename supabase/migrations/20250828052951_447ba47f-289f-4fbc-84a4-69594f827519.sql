-- Create gallery table for photo management
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Fasilitas',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for gallery access
CREATE POLICY "Everyone can view gallery photos" 
ON public.gallery 
FOR SELECT 
USING (true);

CREATE POLICY "Everyone can insert gallery photos" 
ON public.gallery 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Everyone can update gallery photos" 
ON public.gallery 
FOR UPDATE 
USING (true);

CREATE POLICY "Everyone can delete gallery photos" 
ON public.gallery 
FOR DELETE 
USING (true);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true);

-- Create storage policies for gallery images
CREATE POLICY "Gallery images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery-images');

CREATE POLICY "Anyone can upload gallery images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Anyone can update gallery images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'gallery-images');

CREATE POLICY "Anyone can delete gallery images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'gallery-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on gallery
CREATE TRIGGER update_gallery_updated_at
BEFORE UPDATE ON public.gallery
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();