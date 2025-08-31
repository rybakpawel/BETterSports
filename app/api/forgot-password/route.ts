import { NextResponse } from "next/server";
import { forgotPassword } from "@/logic/forgotPassword";

export async function POST(req: Request) {
    const email: string = await req.json();

    const response = await forgotPassword(email);

    return NextResponse.json(response);
}
