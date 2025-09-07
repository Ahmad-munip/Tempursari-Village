-- Remove authentication requirements and make everything public

-- Update gallery policies to allow public access
DROP POLICY IF EXISTS "Admins can insert gallery photos" ON public.gallery;
DROP POLICY IF EXISTS "Admins can update gallery photos" ON public.gallery;
DROP POLICY IF EXISTS "Admins can delete gallery photos" ON public.gallery;

-- Create new public policies for gallery
CREATE POLICY "Anyone can insert gallery photos" 
ON public.gallery 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update gallery photos" 
ON public.gallery 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete gallery photos" 
ON public.gallery 
FOR DELETE 
USING (true);

-- Update organizational structure policies to allow public access  
DROP POLICY IF EXISTS "Admins can insert organizational structure" ON public.organizational_structure;
DROP POLICY IF EXISTS "Admins can update organizational structure" ON public.organizational_structure;
DROP POLICY IF EXISTS "Admins can delete organizational structure" ON public.organizational_structure;

-- Create new public policies for organizational structure
CREATE POLICY "Anyone can insert organizational structure" 
ON public.organizational_structure 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update organizational structure" 
ON public.organizational_structure 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete organizational structure" 
ON public.organizational_structure 
FOR DELETE 
USING (true);