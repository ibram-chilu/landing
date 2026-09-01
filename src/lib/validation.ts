import { primaryUseCaseOptions } from "@/content/site";
import { z } from "zod";

import { sanitizeText, signupStatuses } from "@/lib/signup";

const maxLengths = {
  firstName: 80,
  email: 160,
  whatsappNumber: 32,
  primaryUseCase: 80,
  typicalGroupSize: 40,
  biggestChallenge: 500,
  sourcePage: 160,
  referrer: 400,
  utm: 120,
};

const optionalSanitizedString = (max: number) =>
  z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().max(max))
    .optional()
    .or(z.literal(""));

export const signupSchema = z.object({
  firstName: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(1).max(maxLengths.firstName)),
  email: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().email().max(maxLengths.email))
    .transform((value) => value.toLowerCase()),
  primaryUseCase: z
    .string()
    .transform(sanitizeText)
    .pipe(z.enum(primaryUseCaseOptions)),
  whatsappNumber: optionalSanitizedString(maxLengths.whatsappNumber),
  typicalGroupSize: optionalSanitizedString(maxLengths.typicalGroupSize),
  biggestChallenge: optionalSanitizedString(maxLengths.biggestChallenge),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required.",
  }),
  website: z.string().max(0).optional().or(z.literal("")),
  sourcePage: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().max(maxLengths.sourcePage))
    .default("/"),
  referrer: optionalSanitizedString(maxLengths.referrer),
  utmSource: optionalSanitizedString(maxLengths.utm),
  utmMedium: optionalSanitizedString(maxLengths.utm),
  utmCampaign: optionalSanitizedString(maxLengths.utm),
  turnstileToken: z.string().optional(),
});

export type SignupInput = z.input<typeof signupSchema>;
export type SignupData = z.output<typeof signupSchema>;

export const adminFilterSchema = z.object({
  search: z.string().optional().default(""),
  useCase: z.string().optional().default("all"),
  status: z.enum(["all", ...signupStatuses]).default("all"),
});
