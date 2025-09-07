-- Create a storage bucket specifically for news images
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true);

-- Create storage policies for news images
CREATE POLICY "Anyone can view news images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'news-images');

CREATE POLICY "Anyone can upload news images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'news-images');

CREATE POLICY "Anyone can update news images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'news-images');

CREATE POLICY "Anyone can delete news images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'news-images');