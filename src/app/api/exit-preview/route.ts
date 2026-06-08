import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * プレビューを終了するAPIルート
 */
export async function GET() {
  const draft = await draftMode();
  draft.disable();
  redirect("/");
}
