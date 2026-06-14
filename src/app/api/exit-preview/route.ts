import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const redirectTo = request.nextUrl.searchParams.get("redirect") ?? "/";
  redirect(redirectTo);
}
