-- Business Blog - Initial Schema
-- Run this in Supabase SQL Editor or via CLI

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CATEGORIES
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_id TEXT,
  description_en TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON public.categories(slug);

-- ARTICLES
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  translation_group_id UUID NOT NULL DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('id', 'en')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  reading_time_minutes INT DEFAULT 5,
  view_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(language, slug)
);

CREATE INDEX idx_articles_language_status ON public.articles(language, status);
CREATE INDEX idx_articles_translation_group ON public.articles(translation_group_id);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);

-- ARTICLE_CATEGORIES
CREATE TABLE public.article_categories (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

-- MEDIA
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  original_name TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT,
  width INT,
  height INT,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SITE SETTINGS
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- ADVERTISING SCRIPTS
CREATE TABLE public.advertising_scripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  script_type TEXT NOT NULL DEFAULT 'html' CHECK (script_type IN ('html', 'javascript', 'script_tag')),
  script_code TEXT NOT NULL,
  placement TEXT NOT NULL,
  device_target TEXT NOT NULL DEFAULT 'all' CHECK (device_target IN ('all', 'desktop', 'mobile')),
  enabled BOOLEAN NOT NULL DEFAULT false,
  priority INT NOT NULL DEFAULT 0,
  frequency_cap INT,
  exclude_paths TEXT[] DEFAULT '{}',
  exclude_categories UUID[] DEFAULT '{}',
  adsense_publisher_id TEXT,
  adsense_ad_unit_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

CREATE INDEX idx_ads_enabled_placement ON public.advertising_scripts(enabled, placement);

-- ADS.TXT ENTRIES
CREATE TABLE public.ads_txt_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  line_content TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ANALYTICS INTEGRATIONS
CREATE TABLE public.analytics_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  name TEXT NOT NULL,
  script_code TEXT NOT NULL,
  placement TEXT NOT NULL DEFAULT 'footer' CHECK (placement IN ('head', 'body_start', 'footer')),
  enabled BOOLEAN NOT NULL DEFAULT false,
  exclude_admin BOOLEAN NOT NULL DEFAULT true,
  load_on_all_pages BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- Seed settings
INSERT INTO public.site_settings (key, value, description) VALUES
  ('ads_global_enabled', 'true', 'Master switch for all advertising scripts'),
  ('analytics_global_enabled', 'true', 'Master switch for all analytics scripts'),
  ('site_name', '"Business Insights"', 'Site display name'),
  ('site_tagline_id', '"Ide Bisnis, Tips Usaha & Monetisasi"', 'Indonesian tagline'),
  ('site_tagline_en', '"Business Ideas, Tips & Monetization"', 'English tagline'),
  ('default_language', '"id"', 'Default language'),
  ('contact_email', '""', 'Contact email'),
  ('social_links', '{}', 'Social media links JSON');

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertising_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads_txt_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_integrations ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_authenticated()
RETURNS BOOLEAN AS $$
  SELECT auth.uid() IS NOT NULL;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (public.is_admin());

CREATE POLICY "Categories are public" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL USING (public.is_admin());

CREATE POLICY "Published articles are public" ON public.articles FOR SELECT
  USING (status = 'published' AND (published_at IS NULL OR published_at <= NOW()));
CREATE POLICY "Authenticated can read all articles" ON public.articles FOR SELECT USING (public.is_authenticated());
CREATE POLICY "Admins and editors manage articles" ON public.articles FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')));

CREATE POLICY "Article categories public read" ON public.article_categories FOR SELECT USING (true);
CREATE POLICY "Editors manage article categories" ON public.article_categories FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')));

CREATE POLICY "Media is public" ON public.media FOR SELECT USING (true);
CREATE POLICY "Authenticated can upload media" ON public.media FOR INSERT WITH CHECK (public.is_authenticated());
CREATE POLICY "Owners and admins manage media" ON public.media FOR ALL USING (uploaded_by = auth.uid() OR public.is_admin());

CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage site settings" ON public.site_settings FOR ALL USING (public.is_admin());

CREATE POLICY "Only admins manage advertising" ON public.advertising_scripts FOR ALL USING (public.is_admin());
CREATE POLICY "Public can read enabled ads" ON public.advertising_scripts FOR SELECT USING (enabled = true);

CREATE POLICY "Public can read ads.txt entries" ON public.ads_txt_entries FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage ads.txt" ON public.ads_txt_entries FOR ALL USING (public.is_admin());

CREATE POLICY "Only admins manage analytics" ON public.analytics_integrations FOR ALL USING (public.is_admin());
CREATE POLICY "Public can read enabled analytics" ON public.analytics_integrations FOR SELECT USING (enabled = true);

-- Triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_categories BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_articles BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_site_settings BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_ads BEFORE UPDATE ON public.advertising_scripts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_analytics BEFORE UPDATE ON public.analytics_integrations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), COALESCE(NEW.raw_user_meta_data->>'role', 'editor'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed categories
INSERT INTO public.categories (slug, name_id, name_en, description_id, description_en, sort_order) VALUES
  ('ide-bisnis', 'Ide Bisnis', 'Business Ideas', 'Ide dan peluang usaha terbaru', 'Latest business ideas and opportunities', 1),
  ('usaha-kecil', 'Usaha Kecil', 'Small Business', 'Tips menjalankan usaha kecil dan menengah', 'Tips for running small and medium businesses', 2),
  ('bisnis-online', 'Bisnis Online', 'Online Business', 'Strategi bisnis digital dan e-commerce', 'Digital business and e-commerce strategies', 3),
  ('pemasaran-digital', 'Pemasaran Digital', 'Digital Marketing', 'SEO, social media, dan iklan online', 'SEO, social media, and online advertising', 4),
  ('pertanian-peternakan', 'Pertanian & Peternakan', 'Agriculture & Livestock', 'Bisnis di sektor pertanian dan peternakan', 'Business in agriculture and livestock sectors', 5),
  ('tips-strategi', 'Tips & Strategi', 'Tips & Strategies', 'Strategi pengembangan bisnis', 'Business development strategies', 6),
  ('startup', 'Startup', 'Startup', 'Membangun dan mengembangkan startup', 'Building and scaling startups', 7),
  ('studi-kasus', 'Studi Kasus', 'Case Studies', 'Analisis kasus bisnis nyata', 'Real business case analyses', 8),
  ('pendapatan-pasif', 'Pendapatan Pasif', 'Passive Income', 'Cara membangun penghasilan pasif', 'Ways to build passive income streams', 9);
