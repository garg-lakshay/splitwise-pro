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


        await prisma.passwordReset.create({
            data: {
                email: user.email,
                otpHash: otp,
                expiresAt: expiresAt,
                used: false
            }
        });

        try{
            await sendPasswordResetEmail(user.email, otp);
        } catch (error) {
            return NextResponse.json({message: "Failed to send password reset email"}, {status: 500});  
        }
        return NextResponse.json({message: "Password reset email sent", otp}, {status: 200});


} catch (error) {
    return NextResponse.json({message: "Internal server error"}, {status: 500});
}
}



        

