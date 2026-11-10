import { createClient } from "@/lib/supabase/server";
import type { AnalyticsIntegration } from "@/types";

export async function getAnalyticsScripts(
  placement: "head" | "body_start" | "footer",
  isAdminRoute = false
): Promise<AnalyticsIntegration[]> {
  const supabase = await createClient();

  // Global switch
  const { data: settings } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "analytics_global_enabled")
    .single();

  if (settings?.value === false || settings?.value === "false") {
    return [];
  }

  const { data, error } = await supabase
    .from("analytics_integrations")
    .select("*")
    .eq("enabled", true)
    .eq("placement", placement);

  if (error || !data) return [];

  let scripts = data as AnalyticsIntegration[];

  if (isAdminRoute) {
    scripts = scripts.filter((s) => !s.exclude_admin);
  }

  return scripts;
}
