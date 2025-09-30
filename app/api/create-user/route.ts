import { NextResponse } from "next/server";
import { createNewUser } from "@/logic/createNewUser";

export async function POST(req: Request) {
    const body = await req.json();

    const response = await createNewUser(body);

    return NextResponse.json(response);
}
