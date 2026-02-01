import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const {email , password} = await req.json();
        const user =await prisma.user.findUnique({
            where: {email},
        });
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid) {
            return NextResponse.json({message: "Invalid password"}, {status: 401});
        }

        const token = jwt.sign({userId: user.id , email: user.email}, process.env.JWT_SECRET!)

        
    }

}