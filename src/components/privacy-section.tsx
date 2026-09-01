import { siteContent } from "@/content/site";

export function PrivacySection() {
  return (
    <div className="rounded-[2rem] border border-synq-navy/10 bg-white p-6 shadow-card">
      <div className="flex flex-col gap-3 border-b border-synq-navy/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-display text-2xl font-bold text-synq-navy">
          {siteContent.privacy.title}
        </h3>
        <span className="rounded-full bg-synq-mustard/18 px-3 py-1 text-xs font-semibold text-synq-navy">
          Review before public launch
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {siteContent.privacy.points.map((point) => (
          <p key={point} className="text-sm leading-7 text-synq-ink/78">
            {point}
          </p>
        ))}
        <p className="text-sm font-medium text-synq-teal">
          {siteContent.contactEmail}
        </p>
      </div>
    </div>
  );
}
