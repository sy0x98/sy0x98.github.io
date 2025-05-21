import { generateFeed } from "../posts";

export const dynamic = "force-static"; // No author-specific info here, just keeping it clean.

export async function GET() {
  const feed = await generateFeed();
  return new Response(feed.atom1());
}
