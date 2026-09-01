import { NextResponse } from "next/server";
import { z } from "zod";

import { getVerifiedAdminSession } from "@/lib/auth";
import { updateSignupStatus } from "@/lib/admin-service";
import { serverEnv } from "@/lib/server-env";
import { signupStatuses } from "@/lib/signup";

const bodySchema = z.object({
  signupStatus: z.enum(signupStatuses),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ signupId: string }> },
) {
  const user = await getVerifiedAdminSession(serverEnv.adminEmails).catch(
    () => null,
  );
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const parsed = bodySchema.parse(await request.json());
    const { signupId } = await context.params;
    await updateSignupStatus(signupId, parsed.signupStatus);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Could not update signup status.",
      },
      { status: 400 },
    );
  }
}
