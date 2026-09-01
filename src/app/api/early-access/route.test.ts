import { describe, expect, it, vi, beforeEach } from "vitest";

const verifyTurnstileToken = vi.fn();
const submitEarlyAccessSignup = vi.fn();

vi.mock("@/lib/turnstile", () => ({
  verifyTurnstileToken,
}));

vi.mock("@/lib/signup-service", () => ({
  submitEarlyAccessSignup,
}));

describe("POST /api/early-access", () => {
  beforeEach(() => {
    verifyTurnstileToken.mockReset();
    submitEarlyAccessSignup.mockReset();
  });

  it("returns a success payload for a new signup", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    submitEarlyAccessSignup.mockResolvedValue({
      ok: true,
      duplicate: false,
      id: "abc",
    });

    const { POST } = await import("@/app/api/early-access/route");
    const response = await POST(
      new Request("http://localhost:3000/api/early-access", {
        method: "POST",
        body: JSON.stringify({
          firstName: "Refiloe",
          email: "refiloe@example.com",
          primaryUseCase: "Stokvel or savings group",
          consent: true,
        }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      duplicate: false,
    });
  });

  it("returns a friendly duplicate response", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    submitEarlyAccessSignup.mockResolvedValue({
      ok: true,
      duplicate: true,
      id: "abc",
    });

    const { POST } = await import("@/app/api/early-access/route");
    const response = await POST(
      new Request("http://localhost:3000/api/early-access", {
        method: "POST",
        body: JSON.stringify({
          firstName: "Refiloe",
          email: "refiloe@example.com",
          primaryUseCase: "Stokvel or savings group",
          consent: true,
        }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      duplicate: true,
    });
  });

  it("rejects an invalid Turnstile challenge when enforcement is enabled", async () => {
    verifyTurnstileToken.mockResolvedValue(false);

    const { POST } = await import("@/app/api/early-access/route");
    const response = await POST(
      new Request("http://localhost:3000/api/early-access", {
        method: "POST",
        body: JSON.stringify({
          firstName: "Refiloe",
          email: "refiloe@example.com",
          primaryUseCase: "Stokvel or savings group",
          consent: true,
        }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      message: "Please complete the verification challenge.",
    });
  });

  it("surfaces validation errors from the signup service", async () => {
    verifyTurnstileToken.mockResolvedValue(true);
    submitEarlyAccessSignup.mockResolvedValue({
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: {
        email: ["Invalid email address"],
      },
    });

    const { POST } = await import("@/app/api/early-access/route");
    const response = await POST(
      new Request("http://localhost:3000/api/early-access", {
        method: "POST",
        body: JSON.stringify({
          firstName: "Refiloe",
          email: "not-an-email",
          primaryUseCase: "Group holiday",
          consent: true,
        }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      fieldErrors: {
        email: ["Invalid email address"],
      },
    });
  });
});
