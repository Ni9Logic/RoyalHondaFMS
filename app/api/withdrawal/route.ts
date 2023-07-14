import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { amount, email } = body;
  try {
    // Perform validation and error handling
    if (!amount || !email) {
      return NextResponse.json({ error: 'Email is not provided or amount not provided' }, { status: 400 });
    }

    const user = await prisma.webUser.findUnique({
      where: { email: email },
    });

    if (!user?.Balance) {
      return NextResponse.json({ error: 'Balance Error' }, { status: 400 })
    }
    if (user.Balance < amount) {
      return NextResponse.json({ error: 'Insufficient Balance' }, { status: 400 });
    }
    if (amount <= 0) {
      return NextResponse.json({ error: 'Invalid Amount' }, { status: 400 });
    }
    // Update user's balance
    const updatedUser = await prisma.webUser.update({
      where: { email: email },
      data: { Balance: user.Balance - amount },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });

  }
}