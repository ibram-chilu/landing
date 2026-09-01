import { NextResponse } from "next/server";

import { listSignups } from "@/lib/admin-service";
import { getVerifiedAdminSession } from "@/lib/auth";
import { serverEnv } from "@/lib/server-env";
import { adminFilterSchema } from "@/lib/validation";

export async function GET(request: Request) {
  const user = await getVerifiedAdminSession(serverEnv.adminEmails).catch(
    () => null,
  );
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const filters = adminFilterSchema.parse({
    search: url.searchParams.get("search") || "",
    useCase: url.searchParams.get("useCase") || "all",
    status: url.searchParams.get("status") || "all",
  });
  const result = await listSignups(filters);
  return NextResponse.json(result);
}
