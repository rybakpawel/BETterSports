import { NextResponse } from "next/server";
import { updateSettingsUserData } from "@/logic/updateUserData";

export async function POST(req: Request) {
    const data = await req.json();

    const response = await updateSettingsUserData(data);

    return NextResponse.json(response);
}
