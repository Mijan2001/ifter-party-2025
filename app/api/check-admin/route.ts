import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ isAdmin: false });
        }

        const user = await verifyToken(token);
        return NextResponse.json({ isAdmin: user?.role === 'admin' });
    } catch (error) {
        return NextResponse.json({ isAdmin: false });
    }
}
