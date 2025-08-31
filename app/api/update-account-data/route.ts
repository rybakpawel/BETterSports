import { NextResponse, NextRequest } from "next/server";
import { updateAccountData } from "@/logic/updateAccountData";

export async function POST(req: NextRequest) {
    const {
        username,
        profileImage,
        backgroundImage,
        favouriteSport,
        favouriteTeam,
        primaryColor,
        secondaryColor,
    } = await req.json();

    const accountData = {
        username,
        favouriteSport,
        favouriteTeam,
        primaryColor,
        secondaryColor,
    };

    const result = await updateAccountData(
        accountData,
        profileImage,
        backgroundImage
    );

    return NextResponse.json(result);
}
