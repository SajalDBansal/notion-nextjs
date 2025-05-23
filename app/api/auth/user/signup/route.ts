import { createUser } from "@/lib/prisma_functions/user/createUser";
import { signupInput } from "@/lib/schema_types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ msg: "hello" });
}

export async function POST(req: NextRequest) {
    const fecthedData = await req.json();
    const userData = fecthedData.data || fecthedData
    const { success } = signupInput.safeParse(userData);
    if (success) {
        try {
            const user = await createUser(userData);
            return NextResponse.json(user);
        } catch (error) {
            return NextResponse.json({ error: error });
        }
    } else {
        return NextResponse.json({ error: "Incorrect data entry" });
    }
}