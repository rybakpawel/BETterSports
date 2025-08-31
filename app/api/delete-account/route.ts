import { NextResponse } from "next/server";
import { deleteAccount } from "@/logic/deleteAccount";

export async function POST() {
    const result = await deleteAccount();

    return NextResponse.json(result);
}
