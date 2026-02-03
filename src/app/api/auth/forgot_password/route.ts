import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';



export async function POST(req:NextRequest) {
    try {
        const email = await req.json();
        const user = await prisma.user.findOne({
            where: {email}
        });
        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        


}
    }
}