import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/logic/resetPassword";

export async function POST(req: NextRequest, res: NextResponse) {
    let { oldPassword, newPassword, confirmPassword, userId, token } =
        await req.json();

    const response = await resetPassword(
        oldPassword,
        newPassword,
        confirmPassword,
        userId,
        token
    );

    return NextResponse.json(response);
}
