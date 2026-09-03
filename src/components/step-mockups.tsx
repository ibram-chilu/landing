import { siteContent } from "@/content/site";

const mockupContent = [
  [
    "December getaway for 5",
    "Target date: 12 December",
    "Need a travel plan and contribution target",
  ],
  [
    "Accommodation shortlist",
    "Transport estimate",
    "Suggested per-person contribution: R3,000",
  ],
  [
    "Lerato: Can we reduce activities?",
    "Ayanda: Keep a contingency buffer",
    "Group review in progress",
  ],
  [
    "2 milestones this week",
    "3 of 5 members updated progress",
    "Reminder load reduced",
  ],
];

export function StepMockups() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {siteContent.howItWorks.steps.map((step, index) => (
        <article
          key={step.title}
          className="rounded-[2rem] border border-synq-navy/10 bg-white p-5 shadow-card"
        >
          <div className="inline-flex rounded-full bg-synq-mint px-3 py-1 text-xs font-semibold text-synq-teal">
            Step {index + 1}
          </div>
          <h3 className="mt-4 font-display text-xl font-bold text-synq-navy">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-synq-ink/78">{step.body}</p>
          <div className="mt-5 rounded-[1.5rem] bg-synq-cream p-4">
            <div className="space-y-3">
              {mockupContent[index]?.map((line, lineIndex) => (
                <div
                  key={`${line}-${lineIndex}`}
                  className="rounded-2xl border border-synq-navy/8 bg-white px-3 py-3 text-sm text-synq-ink shadow-sm"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
