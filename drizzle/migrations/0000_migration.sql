CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  enquiry_type text NOT NULL,
  enquiry_category text,
  name text NOT NULL,
  company text,
  role text,
  email text NOT NULL,
  phone text,
  state text,
  business_type text,
  customer_type text,
  products text[] NOT NULL DEFAULT '{}',
  estimated_requirement text,
  sample_requested boolean NOT NULL DEFAULT false,
  delivery_suburb text,
  delivery_postcode text,
  intended_application text,
  message text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new'
);
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE INDEX enquiries_email_created_idx ON public.enquiries (email, created_at DESC);