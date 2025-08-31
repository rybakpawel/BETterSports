import { NextRequest, NextResponse } from "next/server";
import { changePassword } from "@/logic/changePassword";

export async function POST(req: NextRequest, res: NextResponse) {
    let { oldPassword, newPassword, confirmPassword } = await req.json();

    const response = await changePassword(
        oldPassword,
        newPassword,
        confirmPassword
    );

    return NextResponse.json(response);
}
