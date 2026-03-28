import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("REGISTER BODY:", body);

    const {
      fullName,
      email,
      phone,
      password,
      referralCode,
      agreedTerms,
      agreedKYC,
    } = body;

    if (!fullName?.trim()) {
      return NextResponse.json({ message: "Full name is required." }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
    }

    if (phone && !/^\+?[\d\s\-()]{7,15}$/.test(phone)) {
      return NextResponse.json({ message: "Enter a valid phone number." }, { status: 400 });
    }

    if (!password || password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 });
    }

    if (!/[A-Z]/.test(password)) {
      return NextResponse.json({ message: "Password must contain an uppercase letter." }, { status: 400 });
    }

    if (!/\d/.test(password)) {
      return NextResponse.json({ message: "Password must contain a number." }, { status: 400 });
    }

    if (!agreedTerms) {
      return NextResponse.json({ message: "Please agree to the Terms of Service." }, { status: 400 });
    }

    if (!agreedKYC) {
      return NextResponse.json({ message: "Please acknowledge the KYC requirement." }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      phone: phone || "",
      password: hashedPassword,
      referralCode: referralCode || "",
      agreedTerms,
      agreedKYC,
    });

    return NextResponse.json(
      { message: "Account created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong while creating the account." },
      { status: 500 }
    );
  }
}
