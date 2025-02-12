import { NextRequest, NextResponse } from "next/server";
import connectToDataBase from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
   try {
      const { email, password } = await request.json();

      if (!email || !password) {
         return NextResponse.json({ error: "Email and password is required" }, { status: 400 })
      }
      await connectToDataBase();
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return NextResponse.json({ error: "User already exists" }, { status: 400 })
      }
      await User.create({ email, password });
      return NextResponse.json({ message: "User created successfully" }, { status: 201 })

   } catch (error) {
      return NextResponse.json({ error: "failed to register user" }, { status: 500 })

   }
}