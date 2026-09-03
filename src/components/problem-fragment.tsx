import { siteContent } from "@/content/site";

export function ProblemFragment() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {siteContent.problem.channels.map((channel) => (
        <div
          key={channel}
          className="rounded-[1.6rem] border border-synq-teal/15 bg-white/85 px-4 py-4 text-sm font-medium text-synq-ink shadow-card"
        >
          {channel}
        </div>
      ))}
    </div>
  );
}
