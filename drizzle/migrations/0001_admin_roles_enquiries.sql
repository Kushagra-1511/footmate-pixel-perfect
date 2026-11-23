CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS admin_notes text;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;
CREATE POLICY "Admins read enquiries" ON public.enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins add enquiries" ON public.enquiries FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins edit enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete enquiries" ON public.enquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER enquiries_touch BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();