-- Create organizational structure table
CREATE TABLE public.organizational_structure (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  position_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  dusun TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.organizational_structure ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is village information)
CREATE POLICY "Everyone can view organizational structure" 
ON public.organizational_structure 
FOR SELECT 
USING (true);

CREATE POLICY "Everyone can insert organizational structure" 
ON public.organizational_structure 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Everyone can update organizational structure" 
ON public.organizational_structure 
FOR UPDATE 
USING (true);

CREATE POLICY "Everyone can delete organizational structure" 
ON public.organizational_structure 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_organizational_structure_updated_at
BEFORE UPDATE ON public.organizational_structure
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-photos', 'profile-photos', true);

-- Create storage policies for profile photos
CREATE POLICY "Profile photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'profile-photos');

CREATE POLICY "Anyone can upload profile photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'profile-photos');

CREATE POLICY "Anyone can update profile photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'profile-photos');

CREATE POLICY "Anyone can delete profile photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'profile-photos');