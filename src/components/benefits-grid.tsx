import { siteContent } from "@/content/site";

export function BenefitsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {siteContent.benefits.items.map((item) => (
        <article
          key={item.title}
          className="rounded-[2rem] border border-synq-teal/15 bg-[#e9f6f1] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card"
        >
          <h3 className="font-display text-xl font-bold text-synq-navy">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-synq-ink/78">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
