import { NextResponse } from "next/server";
import { updateUserPreferencesLogic } from "@/logic/updateUserPreferences";

export async function POST(req: Request) {
    const body = await req.json();

    const response = await updateUserPreferencesLogic(body);

    return NextResponse.json(response);
}
