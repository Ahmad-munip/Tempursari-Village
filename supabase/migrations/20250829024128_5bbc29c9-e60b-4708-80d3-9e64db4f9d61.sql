-- Update existing gallery items to use proper image paths from src/assets
UPDATE public.gallery 
SET image_url = 'src/assets/village-office.jpg' 
WHERE image_url = '/assets/village-office.jpg';

UPDATE public.gallery 
SET image_url = 'src/assets/village-culture.jpg' 
WHERE image_url = '/assets/village-culture.jpg';

UPDATE public.gallery 
SET image_url = 'src/assets/village-market.jpg' 
WHERE image_url = '/assets/village-market.jpg';