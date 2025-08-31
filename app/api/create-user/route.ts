import { NextResponse } from "next/server";
import { IUser } from "@/core/User";
import { createNewUser } from "@/logic/createNewUser";

export async function POST(req: Request) {
    const body: IUser = await req.json();

    const response = await createNewUser(body);

    return NextResponse.json(response);
}
