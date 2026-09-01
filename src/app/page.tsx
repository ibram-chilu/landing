import { access } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Script from "next/script";

import { BenefitsGrid } from "@/components/benefits-grid";
import { HeroActions } from "@/components/hero-actions";
import { PrivacySection } from "@/components/privacy-section";
import { ProblemFragment } from "@/components/problem-fragment";
import { SignupForm } from "@/components/signup-form";
import { SiteHeader } from "@/components/site-header";
import { StepMockups } from "@/components/step-mockups";
import { UseCaseCards } from "@/components/use-case-cards";
import { VideoSection } from "@/components/video-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/content/site";

async function publicFileExists(relativePath: string) {
  try {
    await access(
      path.join(process.cwd(), "public", relativePath.replace(/^\//, "")),
    );
    return true;
  } catch {
    return false;
  }
}

export default async function HomePage() {
  const [hasLocalVideo, hasPoster, hasCaptions] = await Promise.all([
    publicFileExists(siteContent.video.fallbackVideoPath),
    publicFileExists(siteContent.video.fallbackPosterPath),
    publicFileExists(siteContent.video.captionsPath),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteContent.siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteContent.description,
    url: siteContent.canonicalUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ZAR",
      availability: "https://schema.org/PreOrder",
    },
    developmentStatus: "Beta",
  };

  return (
    <main id="top" className="overflow-x-hidden">
      <Script
        id="software-application-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />

      <section className="overflow-hidden bg-[linear-gradient(180deg,rgba(221,243,239,0.98)_0%,rgba(221,243,239,0.94)_58%,rgba(255,249,238,0.82)_100%)]">
        <Container className="grid gap-10 py-16 md:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-synq-teal">
              {siteContent.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-2xl font-display text-5xl font-bold tracking-tight text-synq-navy sm:text-6xl">
              {siteContent.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-synq-ink/78">
              {siteContent.hero.body}
            </p>
            <p className="mt-4 text-lg font-medium text-synq-teal">
              {siteContent.hero.subline}
            </p>
            <HeroActions />
          </div>
          <div className="mx-auto w-full max-w-3xl lg:max-w-none">
            <div className="rounded-[2rem] bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.5),transparent_42%),linear-gradient(180deg,rgba(221,243,239,0.98)_0%,rgba(221,243,239,0.9)_100%)] px-2 py-3 sm:px-3 sm:py-4 lg:px-4 lg:py-5">
              <Image
                src="/synq-hero-device-mockup.png"
                alt="Synq group-planning dashboard displayed on a laptop and mobile phone."
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1440px) 700px, (min-width: 1024px) 52vw, (min-width: 768px) 80vw, 92vw"
                className="block h-auto w-full max-w-full object-contain"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            title={siteContent.problem.title}
            body={siteContent.problem.body}
          />
          <ProblemFragment />
        </Container>
      </section>

      <section id="watch-demo" className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Watch demo"
            title={siteContent.video.title}
            body={siteContent.video.body}
          />
          <div className="mt-8">
            <VideoSection
              hasLocalVideo={hasLocalVideo}
              hasPoster={hasPoster}
              hasCaptions={hasCaptions}
            />
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title={siteContent.howItWorks.title}
            align="center"
          />
          <div className="mt-10">
            <StepMockups />
          </div>
        </Container>
      </section>

      <section id="use-cases" className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Use cases"
            title={siteContent.useCases.title}
            body="Synq is designed around coordination problems that groups face before everything is agreed and organised."
          />
          <div className="mt-8">
            <UseCaseCards />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Why it helps"
            title="Less confusion, more follow-through."
            body="Clearer shared context makes it easier for groups to agree, contribute and keep momentum."
          />
          <div className="mt-8">
            <BenefitsGrid />
          </div>
        </Container>
      </section>

      <section id="join-early-access" className="py-14 sm:py-18">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Early access"
            title={siteContent.form.title}
            body={siteContent.form.body}
          />
          <SignupForm />
        </Container>
      </section>

      <section id="privacy" className="pb-20 pt-10">
        <Container>
          <PrivacySection />
        </Container>
      </section>
    </main>
  );
}
