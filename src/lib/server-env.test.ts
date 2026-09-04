import { describe, expect, it } from "vitest";

import { normalizeFirebasePrivateKey } from "@/lib/server-env";

describe("normalizeFirebasePrivateKey", () => {
  it("converts Firebase's escaped newline format", () => {
    expect(
      normalizeFirebasePrivateKey(
        '"-----BEGIN PRIVATE KEY-----\\nkey-data\\n-----END PRIVATE KEY-----\\n"',
      ),
    ).toBe(
      "-----BEGIN PRIVATE KEY-----\nkey-data\n-----END PRIVATE KEY-----\n",
    );
  });

  it("preserves keys supplied with real newlines", () => {
    expect(
      normalizeFirebasePrivateKey(
        "-----BEGIN PRIVATE KEY-----\nkey-data\n-----END PRIVATE KEY-----",
      ),
    ).toBe("-----BEGIN PRIVATE KEY-----\nkey-data\n-----END PRIVATE KEY-----");
  });
});
