import { describe, expect, it } from "vitest";

import { primaryUseCaseOptions } from "@/content/site";
import { signupSchema } from "@/lib/validation";

describe("signupSchema", () => {
  it("normalizes and sanitizes a valid signup payload", () => {
    const result = signupSchema.parse({
      firstName: "  Refiloe  ",
      email: "  REFILOE@EXAMPLE.COM ",
      primaryUseCase: " Stokvel or savings group ",
      whatsappNumber: " 082 123 4567 ",
      typicalGroupSize: " 5 ",
      biggestChallenge: " Keeping everyone aligned across chats. ",
      consent: true,
      website: "",
      sourcePage: "/",
      referrer: "https://example.com",
      utmSource: "newsletter",
      utmMedium: "email",
      utmCampaign: "beta-launch",
    });

    expect(result.firstName).toBe("Refiloe");
    expect(result.email).toBe("refiloe@example.com");
    expect(result.primaryUseCase).toBe("Stokvel or savings group");
    expect(result.biggestChallenge).toBe(
      "Keeping everyone aligned across chats.",
    );
  });

  it("rejects a submission without consent", () => {
    const result = signupSchema.safeParse({
      firstName: "Lerato",
      email: "lerato@example.com",
      primaryUseCase: "Group gift",
      whatsappNumber: "",
      typicalGroupSize: "",
      biggestChallenge: "",
      consent: false,
      website: "",
      sourcePage: "/",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a submission when the hidden honeypot has been filled", () => {
    const result = signupSchema.safeParse({
      firstName: "Lerato",
      email: "lerato@example.com",
      primaryUseCase: "Group gift",
      whatsappNumber: "",
      typicalGroupSize: "",
      biggestChallenge: "",
      consent: true,
      website: "https://spam.example",
      sourcePage: "/",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a use case outside the allowed options", () => {
    const result = signupSchema.safeParse({
      firstName: "Lerato",
      email: "lerato@example.com",
      primaryUseCase: "Investment club",
      whatsappNumber: "",
      typicalGroupSize: "",
      biggestChallenge: "",
      consent: true,
      website: "",
      sourcePage: "/",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    });

    expect(result.success).toBe(false);
    expect(primaryUseCaseOptions).toContain("Stokvel or savings group");
  });
});
