export const primaryUseCaseOptions = [
  "Group holiday",
  "Birthday or celebration",
  "Shared household costs",
  "Group gift",
  "Event or collection",
  "Stokvel or savings group",
  "Something else",
] as const;

export const siteContent = {
  siteName: "Synq",
  title: "Synq — A smarter way to plan together",
  description:
    "Synq helps groups create shared plans, generate suggested budgets, coordinate contributions and keep everyone aligned.",
  canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: "ibram@synq.co.za",
  privacyReviewNote:
    "Draft privacy wording for the beta landing site. Review before public launch.",
  navItems: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Use cases", href: "#use-cases" },
    { label: "Watch explainer video", href: "#watch-explainer-video" },
    { label: "Join early access", href: "#join-early-access" },
  ],
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  hero: {
    eyebrow: "AI-assisted group planning beta",
    headline: "Turn group plans into action.",
    body: "Synq is an AI-assisted way for groups to plan, coordinate and manage contributions together.",
    subline: "From ‘we should do this’ to ‘it’s sorted.’",
    primaryCta: "Join early access",
    secondaryCta: "Watch explainer video",
  },
  problem: {
    title: "Group plans should not be this difficult.",
    body: "Most group plans break down because the details live everywhere at once. Synq helps bring people, decisions, suggested budgets, deadlines and contribution progress into one coordinated flow.",
    channels: [
      "WhatsApp conversations",
      "Spreadsheets",
      "Banking applications",
      "Screenshots",
      "Calendars",
      "Repeated reminders",
    ],
  },
  video: {
    title: "Watch the Synq explainer video.",
    body: "Follow Refiloe and his friends as they turn a December getaway from a group-chat idea into one clear, coordinated plan.",
    fallbackVideoPath: "/synq-explainer.mp4",
    fallbackPosterPath: "/synq-video-poster.jpg",
    captionsPath: "/synq-captions.vtt",
    placeholderTitle: "Explainer video media not added yet",
    placeholderBody:
      "Add `public/synq-explainer.mp4` and `public/synq-video-poster.jpg`, or set `NEXT_PUBLIC_DEMO_VIDEO_URL` to a hosted MP4 before launch.",
  },
  howItWorks: {
    title: "One shared process from idea to action.",
    steps: [
      {
        title: "Tell Synq the plan",
        body: "Describe what your group wants to organise, who is involved and when it should happen.",
      },
      {
        title: "Get a suggested plan",
        body: "Synq helps structure the goal and produces a suggested budget, expense categories and contribution targets.",
      },
      {
        title: "Review it together",
        body: "Invite the group, discuss the suggestions and agree on a plan that works for everyone.",
      },
      {
        title: "Keep everyone aligned",
        body: "Follow deadlines, expected contributions and shared progress from one organised place.",
      },
    ],
  },
  useCases: {
    title: "Built for plans people make together.",
    items: [
      {
        title: "Group holidays",
        body: "Keep dates, shared costs, confirmations and contributions moving together instead of across endless chat messages.",
      },
      {
        title: "Birthdays and celebrations",
        body: "Coordinate who is handling the venue, food, decor, guest list and expected contributions without confusion.",
      },
      {
        title: "Shared household costs",
        body: "Make recurring responsibilities, due dates and contribution expectations visible for everyone involved.",
      },
      {
        title: "Group gifts",
        body: "Clarify the target amount, contributors, deadlines and status so the organiser does less chasing.",
      },
      {
        title: "Events and collections",
        body: "Structure planning tasks, suggested budgets and group follow-through when many people need to stay aligned.",
      },
      {
        title: "Stokvels and savings groups",
        body: "Keep contribution schedules, shared goals, member responsibilities and group progress visible, so everyone understands what is expected and when.",
      },
    ],
  },
  benefits: {
    items: [
      {
        title: "One source of truth",
        body: "Keep the plan, decisions, contribution expectations and deadlines in one shared view.",
      },
      {
        title: "Clearer responsibilities",
        body: "Make it obvious who is doing what and what still needs attention.",
      },
      {
        title: "Less chasing",
        body: "Reduce repeated reminders by giving the group a clearer process and shared progress.",
      },
      {
        title: "Better visibility",
        body: "See how the plan is progressing without digging through chats, screenshots and separate tools.",
      },
    ],
  },
  form: {
    title: "Help shape a smarter way to plan together.",
    body: "We’re inviting early users to test the beta version of Synq and share how they currently organise group plans and contributions.",
    success:
      "You’re on the list. We’ll be in touch when the Synq beta is ready for you.",
    cta: "Join early access",
    duplicate:
      "That email is already on the list. We’ll use your existing signup and stay in touch.",
    failure:
      "We couldn’t save your signup just now. Please try again in a moment.",
    consentLabel:
      "I agree to receive Synq beta and research updates and I’ve read the privacy section.",
    useCaseOptions: primaryUseCaseOptions,
  },
  privacy: {
    title: "Privacy",
    points: [
      "We collect the details you submit in this form, including your name, email address, use case and any optional research context you provide.",
      "We use this information to contact you about early access to the beta version and to learn how people currently coordinate group plans and contributions.",
      "We will not sell your personal information.",
      "You can request deletion by emailing the address below.",
    ],
  },
} as const;

export type SiteContent = typeof siteContent;
export type PrimaryUseCaseOption = (typeof primaryUseCaseOptions)[number];
