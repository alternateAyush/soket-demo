import { connect } from "@/dbconfig/dbconfig";
import Person from "@/models/persons.model";
import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

connect();

const preCount = 234;

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, website } = reqBody;
        // console.log(reqBody);
        const person_01 = await Person.findOne({ email });
        const person_02 = await Person.findOne({ website });
        if (person_01 || person_02) {
            return NextResponse.json(
                { error: "Already joined waitlist.", success: false },
                { status: 400 }
            );
        }
        const newUser = await new Person({ name, email, website });
        const savedUser = await newUser.save();
        const count = await Person.countDocuments();
        const totalCount = preCount + count;
        // console.log(savedUser);
        return NextResponse.json(
            {
                message: "Thanks for joining waitlist.",
                totalCount,
                success: true,
                savedUser,
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";

        return NextResponse.json(
            { error: errorMessage, success: false },
            { status: 500 }
        );
    }
}
