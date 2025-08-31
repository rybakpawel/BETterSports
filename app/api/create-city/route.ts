import { NextResponse } from "next/server";
import { createCity } from "@/logic/createCity";

export async function POST(req: Request) {
    const data = await req.json();

    const response = await createCity(data);

    return NextResponse.json(response);
}
