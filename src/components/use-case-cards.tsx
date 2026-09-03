import { siteContent } from "@/content/site";

export function UseCaseCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {siteContent.useCases.items.map((item) => (
        <article
          key={item.title}
          className="rounded-[2rem] border border-synq-teal/15 bg-white/90 p-6 shadow-card transition hover:-translate-y-1 hover:border-synq-teal/40 hover:shadow-soft"
        >
          <h3 className="font-display text-2xl font-bold text-synq-navy">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-synq-ink/78">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
