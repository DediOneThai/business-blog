export type Language = "id" | "en";

export type ArticleStatus = "draft" | "scheduled" | "published" | "archived";

export type AdPlacement =
  | "head"
  | "before_nav"
  | "below_nav"
  | "homepage_top"
  | "homepage_between"
  | "homepage_bottom"
  | "before_content"
  | "inside_content_1"
  | "inside_content_2"
  | "inside_content_3"
  | "after_content"
  | "article_sidebar"
  | "between_related"
  | "footer"
  | "custom";

export type DeviceTarget = "all" | "desktop" | "mobile";

export type AnalyticsProvider = "histats" | "ga4" | "gtm" | "other";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: "admin" | "editor";
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name_id: string;
  name_en: string;
  description_id: string | null;
  description_en: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  translation_group_id: string;
  language: Language;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  author_id: string | null;
  status: ArticleStatus;
  published_at: string | null;
  scheduled_at: string | null;
  reading_time_minutes: number;
  view_count: number;
  is_featured: boolean;
  is_popular: boolean;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  created_at: string;
  updated_at: string;
  author?: Profile | null;
  categories?: Category[];
}

export interface AdvertisingScript {
  id: string;
  name: string;
  provider: string;
  script_type: "html" | "javascript" | "script_tag";
  script_code: string;
  placement: AdPlacement;
  device_target: DeviceTarget;
  enabled: boolean;
  priority: number;
  frequency_cap: number | null;
  exclude_paths: string[];
  exclude_categories: string[];
  adsense_publisher_id: string | null;
  adsense_ad_unit_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsIntegration {
  id: string;
  provider: AnalyticsProvider;
  name: string;
  script_code: string;
  placement: "head" | "body_start" | "footer";
  enabled: boolean;
  exclude_admin: boolean;
  load_on_all_pages: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdsTxtEntry {
  id: string;
  line_content: string;
  sort_order: number;
  is_active: boolean;
}

export const AD_PLACEMENTS: { value: AdPlacement; label: string }[] = [
  { value: "head", label: "Head section" },
  { value: "before_nav", label: "Before navigation" },
  { value: "below_nav", label: "Below navigation" },
  { value: "homepage_top", label: "Homepage top" },
  { value: "homepage_between", label: "Homepage between articles" },
  { value: "homepage_bottom", label: "Homepage bottom" },
  { value: "before_content", label: "Before article content" },
  { value: "inside_content_1", label: "After 1st paragraph" },
  { value: "inside_content_2", label: "After 2nd paragraph" },
  { value: "inside_content_3", label: "After 3rd paragraph" },
  { value: "after_content", label: "After article content" },
  { value: "article_sidebar", label: "Article sidebar" },
  { value: "between_related", label: "Between related articles" },
  { value: "footer", label: "Footer" },
  { value: "custom", label: "Custom placement" },
];
