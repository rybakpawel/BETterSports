import { NextResponse, NextRequest } from "next/server";
import { getTeamsByFormInput } from "@/logic/getTeamsByInput";

export async function POST(req: NextRequest) {
    const input: string = await req.json();

    const response = await getTeamsByFormInput(input);

    return NextResponse.json(response);
}
