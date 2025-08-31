import { NextRequest, NextResponse } from "next/server";
import { resendVerificationEmail } from "@/logic/resendVerificationEmail";

export async function POST(req: NextRequest) {
    const id = await req.json();
    const userId = Number(id);

    const response = await resendVerificationEmail(userId);

    return NextResponse.json(response);
}
