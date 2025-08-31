import { NextResponse } from "next/server";
import { verifyResetPassword } from "@/logic/verifyResetPassword";

export async function GET(
    res: NextResponse,
    { params }: { params: { token: string } }
) {
    const { token } = params;

    const response = await verifyResetPassword(token);

    if (response.success && response.data) {
        return NextResponse.redirect(response.data.redirect);
    } else {
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_URL}/sign-in?error=invalidtoken`
        );
    }
}
