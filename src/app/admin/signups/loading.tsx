import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <main className="min-h-screen bg-synq-cream py-16">
      <Container>
        <div className="rounded-[2rem] border border-synq-navy/10 bg-white p-8 shadow-card">
          <p className="text-sm text-synq-ink/72">Loading registrations…</p>
        </div>
      </Container>
    </main>
  );
}
