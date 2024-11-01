import { connect } from "@/dbconfig/dbconfig";
import Person from "@/models/persons.model";
import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

connect();
const preCount=234;

export async function GET() {
    try {
        const count  = await Person.countDocuments();
        const totalCount=preCount+count;
        const response = NextResponse.json(
            { totalCount, success: true },
            { status: 200 }
        );
        return response;
    } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

        console.log("server error totalCount: ", error);
        return NextResponse.json(
            { error: errorMessage, success: false },
            { status: 500 }
        );
    }
}
