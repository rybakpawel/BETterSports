import { NextResponse, NextRequest } from "next/server";
import { getCitiesByFormInput } from "@/logic/getCitiesByInput";

export async function POST(req: NextRequest) {
    const input: string = await req.json();

    const response = await getCitiesByFormInput(input);

    return NextResponse.json(response);
}
