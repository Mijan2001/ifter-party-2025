import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Registration from '@/models/Registration';

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { name, targetName, moneyAmmount, txnNumber, mobileNumber } =
            body;

        // Check if mobile number already exists
        const existingRegistration = await Registration.findOne({
            mobileNumber
        });
        if (existingRegistration) {
            return NextResponse.json(
                { message: 'Mobile number already registered' },
                { status: 400 }
            );
        }

        const registration = await Registration.create({
            name,
            targetName,
            moneyAmmount,
            txnNumber,
            mobileNumber
        });

        return NextResponse.json(registration, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || 'Something went wrong' },
            { status: 500 }
        );
    }
}
