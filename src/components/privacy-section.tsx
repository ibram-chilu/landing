import { siteContent } from "@/content/site";

export function PrivacySection() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-synq-navy/10 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-col gap-2 border-b border-synq-navy/8 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-display text-xl font-bold text-synq-navy">
          {siteContent.privacy.title}
        </h3>
      </div>
      <div className="mt-4 space-y-2">
        {siteContent.privacy.points.map((point) => (
          <p key={point} className="text-sm leading-6 text-synq-ink/78">
            {point}
          </p>
        ))}
        <p className="pt-1 text-sm font-medium text-synq-teal">
          {siteContent.contactEmail}
        </p>
      </div>
    </div>
  );
}
