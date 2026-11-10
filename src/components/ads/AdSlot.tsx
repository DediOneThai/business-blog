import { getAdsForPlacement, renderAdHtml } from "@/lib/ads";
import type { AdPlacement, DeviceTarget } from "@/types";

interface AdSlotProps {
  placement: AdPlacement;
  device?: DeviceTarget;
  path?: string;
  categoryIds?: string[];
  className?: string;
}

/**
 * Server Component that fetches and renders enabled ads for a placement.
 * Never used inside /admin routes.
 */
export default async function AdSlot({
  placement,
  device = "all",
  path,
  categoryIds,
  className = "",
}: AdSlotProps) {
  const ads = await getAdsForPlacement(placement, {
    device,
    path,
    categoryIds,
  });

  if (!ads.length) return null;

  return (
    <div className={`ad-slot ad-slot--${placement} ${className}`} data-ad-placement={placement}>
      {ads.map((ad) => (
        <div
          key={ad.id}
          className="ad-unit"
          data-ad-id={ad.id}
          data-ad-provider={ad.provider}
          dangerouslySetInnerHTML={{ __html: renderAdHtml(ad.script_code) }}
        />
      ))}
    </div>
  );
}
