import { beforeEach, describe, expect, it, vi } from "vitest";

const submitEarlyAccessSignup = vi.fn();

vi.mock("@/lib/signup-service", () => ({
  submitEarlyAccessSignup,
}));

describe("POST /api/early-access", () => {
  beforeEach(() => {
    submitEarlyAccessSignup.mockReset();
  });

  it("returns a success payload for a new signup", async () => {
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

  it("surfaces validation errors from the signup service", async () => {
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

  it("returns a generic response when signup persistence fails", async () => {
    submitEarlyAccessSignup.mockRejectedValue(
      new Error("Firestore unavailable"),
    );

    const { POST } = await import("@/app/api/early-access/route");
    const response = await POST(
      new Request("http://localhost:3000/api/early-access", {
        method: "POST",
        body: JSON.stringify({
          firstName: "Refiloe",
          email: "refiloe@example.com",
          primaryUseCase: "Group holiday",
          consent: true,
        }),
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      message: "We couldn't process your signup just now. Please try again.",
    });
  });
});
