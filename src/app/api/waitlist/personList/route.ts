import { connect } from "@/dbconfig/dbconfig";
import Person from "@/models/persons.model";
import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

connect();

export async function GET() {
    try {
        const personList  = await Person.find();
        const length=personList.length;
        const response = NextResponse.json(
            { length,personList, success: true },
            { status: 200 }
        );
        return response;
    } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

        console.log("server error personList: ", error);
        return NextResponse.json(
            { error: errorMessage, success: false },
            { status: 500 }
        );
    }
}
