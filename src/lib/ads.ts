import { createClient } from "@/lib/supabase/server";
import type { AdvertisingScript, AdPlacement, DeviceTarget } from "@/types";

/**
 * Fetch enabled ad scripts for a given placement.
 * Only called from Server Components / Route Handlers.
 * Scripts are NEVER executed in the admin dashboard.
 */
export async function getAdsForPlacement(
  placement: AdPlacement,
  options?: {
    device?: DeviceTarget;
    path?: string;
    categoryIds?: string[];
  }
): Promise<AdvertisingScript[]> {
  // Global emergency switch
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "ads_global_enabled")
    .single();

  if (settings?.value === false || settings?.value === "false") {
    return [];
  }

  const { data, error } = await supabase
    .from("advertising_scripts")
    .select("*")
    .eq("enabled", true)
    .eq("placement", placement)
    .order("priority", { ascending: false });

  if (error || !data) return [];

  let ads = data as AdvertisingScript[];

  // Device targeting
  if (options?.device && options.device !== "all") {
    ads = ads.filter(
      (ad) => ad.device_target === "all" || ad.device_target === options.device
    );
  }

  // Path exclusion
  if (options?.path) {
    ads = ads.filter((ad) => {
      if (!ad.exclude_paths?.length) return true;
      return !ad.exclude_paths.some((p) => options.path!.startsWith(p));
    });
  }

  // Category exclusion
  if (options?.categoryIds?.length) {
    ads = ads.filter((ad) => {
      if (!ad.exclude_categories?.length) return true;
      return !ad.exclude_categories.some((c) =>
        options.categoryIds!.includes(c)
      );
    });
  }

  return ads;
}

/**
 * Component helper: render ad scripts safely via dangerouslySetInnerHTML
 * only on the public site after admin has enabled them.
 * Never use this inside /admin routes.
 */
export function renderAdHtml(scriptCode: string): string {
  // Basic sanitization note: we trust admin input only.
  // In production consider additional CSP and sanitization layers.
  return scriptCode;
}
