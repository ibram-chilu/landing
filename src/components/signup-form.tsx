"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { siteContent } from "@/content/site";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { signupSchema, type SignupInput } from "@/lib/validation";

type FormState =
  | { status: "idle" }
  | { status: "success"; duplicate: boolean; message: string }
  | { status: "error"; message: string };

export function SignupForm() {
  const [submissionState, setSubmissionState] = useState<FormState>({
    status: "idle",
  });
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      email: "",
      primaryUseCase: "",
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
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionState({ status: "idle" });
    const params = new URLSearchParams(window.location.search);

    const response = await fetch("/api/early-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        sourcePage: window.location.pathname,
        referrer: document.referrer || "",
        utmSource: params.get("utm_source") || "",
        utmMedium: params.get("utm_medium") || "",
        utmCampaign: params.get("utm_campaign") || "",
      }),
    });

    const data = (await response.json()) as {
      ok?: boolean;
      duplicate?: boolean;
      message?: string;
      fieldErrors?: Record<string, string[]>;
    };

    if (!response.ok || !data.ok) {
      Object.entries(data.fieldErrors || {}).forEach(([field, messages]) => {
        setError(field as keyof SignupInput, {
          message: messages?.[0] || "Invalid value",
        });
      });
      setSubmissionState({
        status: "error",
        message: data.message || siteContent.form.failure,
      });
      return;
    }

    trackEvent(analyticsEvents.earlyAccessCompleted);
    setSubmissionState({
      status: "success",
      duplicate: Boolean(data.duplicate),
      message: data.duplicate
        ? siteContent.form.duplicate
        : siteContent.form.success,
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={() => {
        if (!hasTrackedStart) {
          setHasTrackedStart(true);
          trackEvent(analyticsEvents.earlyAccessStarted);
        }
      }}
      className="rounded-[2rem] border border-synq-navy/10 bg-white p-6 shadow-soft"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="First name" error={errors.firstName?.message} required>
          <input
            {...register("firstName")}
            className={inputClasses}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Email address" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            className={inputClasses}
            autoComplete="email"
          />
        </Field>
        <Field
          label="Primary use case"
          error={errors.primaryUseCase?.message}
          required
        >
          <select
            {...register("primaryUseCase")}
            className={inputClasses}
            defaultValue=""
          >
            <option value="" disabled>
              Select one
            </option>
            {siteContent.form.useCaseOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="WhatsApp number" error={errors.whatsappNumber?.message}>
          <input
            {...register("whatsappNumber")}
            className={inputClasses}
            autoComplete="tel"
          />
        </Field>
        <Field
          label="Typical group size"
          error={errors.typicalGroupSize?.message}
        >
          <input {...register("typicalGroupSize")} className={inputClasses} />
        </Field>
        <Field
          label="Biggest challenge"
          error={errors.biggestChallenge?.message}
          className="md:col-span-2"
        >
          <textarea
            {...register("biggestChallenge")}
            className={`${inputClasses} min-h-24 resize-y`}
          />
        </Field>
      </div>

      <div className="sr-only">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <input type="hidden" {...register("sourcePage")} />
      <input type="hidden" {...register("referrer")} />
      <input type="hidden" {...register("utmSource")} />
      <input type="hidden" {...register("utmMedium")} />
      <input type="hidden" {...register("utmCampaign")} />

      <label className="mt-6 flex gap-3 rounded-2xl border border-synq-navy/8 bg-synq-cream p-4 text-sm text-synq-ink">
        <input
          {...register("consent")}
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-synq-navy/25 text-synq-teal focus:ring-synq-coral"
        />
        <span>
          {siteContent.form.consentLabel}{" "}
          <a
            href="#privacy"
            className="font-semibold text-synq-teal underline underline-offset-4"
          >
            Privacy
          </a>
        </span>
      </label>
      {errors.consent?.message ? (
        <p className="mt-2 text-sm text-red-600">{errors.consent.message}</p>
      ) : null}

      {submissionState.status === "success" ? (
        <p className="mt-5 rounded-2xl bg-synq-mint px-4 py-3 text-sm font-medium text-synq-teal">
          {submissionState.message}
        </p>
      ) : null}
      {submissionState.status === "error" ? (
        <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {submissionState.message}
        </p>
      ) : null}

      <button
        type="submit"
        onClick={() => {
          setValue("sourcePage", window.location.pathname);
          setValue("referrer", document.referrer || "");
          const params = new URLSearchParams(window.location.search);
          setValue("utmSource", params.get("utm_source") || "");
          setValue("utmMedium", params.get("utm_medium") || "");
          setValue("utmCampaign", params.get("utm_campaign") || "");
        }}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-synq-coral px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-[#dc5d5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-synq-coral disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Joining..." : siteContent.form.cta}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
  className,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-synq-navy">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
      {error ? (
        <span className="mt-2 block text-sm text-red-600">{error}</span>
      ) : null}
    </label>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-synq-navy/12 bg-white px-4 py-3 text-sm text-synq-ink shadow-sm outline-none transition placeholder:text-synq-ink/40 focus:border-synq-teal focus:ring-2 focus:ring-synq-teal/20";
