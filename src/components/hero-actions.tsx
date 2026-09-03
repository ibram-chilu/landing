"use client";

import { siteContent } from "@/content/site";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <PrimaryButton href="#join-early-access">
        {siteContent.hero.primaryCta}
      </PrimaryButton>
      <SecondaryButton
        href="#watch-explainer-video"
        onClick={() => trackEvent(analyticsEvents.watchDemoClicked)}
      >
        {siteContent.hero.secondaryCta}
      </SecondaryButton>
    </div>
  );
}
