import { NextResponse } from "next/server";
import { verifyUser } from "@/logic/verifyUser";

export async function GET(
    res: NextResponse,
    { params }: { params: { token: string } }
) {
    const { token } = params;

    const response = await verifyUser(token);

    if (response.success && response.data)
        NextResponse.redirect(response.data?.redirect);
    else console.log("wyslać na not found"); // TODO do zrobienia
}
