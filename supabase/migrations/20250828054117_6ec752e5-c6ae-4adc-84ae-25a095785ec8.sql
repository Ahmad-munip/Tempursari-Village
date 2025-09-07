-- Update gallery RLS policies for security
DROP POLICY IF EXISTS "Everyone can insert gallery photos" ON public.gallery;
DROP POLICY IF EXISTS "Everyone can update gallery photos" ON public.gallery;
DROP POLICY IF EXISTS "Everyone can delete gallery photos" ON public.gallery;

CREATE POLICY "Admins can insert gallery photos" 
ON public.gallery 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE POLICY "Admins can update gallery photos" 
ON public.gallery 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE POLICY "Admins can delete gallery photos" 
ON public.gallery 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

-- Update organizational structure RLS policies for security
DROP POLICY IF EXISTS "Everyone can insert organizational structure" ON public.organizational_structure;
DROP POLICY IF EXISTS "Everyone can update organizational structure" ON public.organizational_structure;
DROP POLICY IF EXISTS "Everyone can delete organizational structure" ON public.organizational_structure;

CREATE POLICY "Admins can insert organizational structure" 
ON public.organizational_structure 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update organizational structure" 
ON public.organizational_structure 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete organizational structure" 
ON public.organizational_structure 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));