-- Update existing gallery items to use proper imported image paths
UPDATE public.gallery 
SET image_url = 'villageOffice' 
WHERE title = 'Balai Desa Tempursari';

UPDATE public.gallery 
SET image_url = 'villageCulture' 
WHERE title = 'Kegiatan Gotong Royong';

UPDATE public.gallery 
SET image_url = 'villageMarket' 
WHERE title = 'Pasar Desa';