import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Stack Auth Webhook Handler
 * Handles user.created and user.updated events from Stack Auth.
 * Register this endpoint in the Stack Auth dashboard as the webhook target.
 */
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the webhook payload
    const event = await req.json();

    // TODO: Add signature verification for Stack Auth webhooks if available

    if (!event || !event.type || !event.data) {
      return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
    }

    // Handle user.created and user.updated events
    if (event.type === "user.created" || event.type === "user.updated") {
      const { id, email, name, avatarUrl, role } = event.data;

      if (!id || !email) {
        return NextResponse.json({ error: "Missing required user fields." }, { status: 400 });
      }

      // Upsert user in the database
      await prisma.user.upsert({
        where: { id },
        update: {
          email,
          name,
          avatarUrl,
          role: role || "CLIENT",
          isActive: true,
        },
        create: {
          id,
          email,
          name,
          avatarUrl,
          role: role || "CLIENT",
          isActive: true,
        },
      });

      return NextResponse.json({ success: true });
    }

    // Ignore other event types
    return NextResponse.json({ ignored: true });
  } catch (error) {
    console.error("Stack Auth webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }
}