import prisma from "../../../../prisma/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  // implement sign up
  try {
    const { email, password, name, surname } = req.body;
    if (!email || !password || !name || !surname) {
      return res.status(400).json({ message: "Missing email or password or name or surname" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        surname,
        role: "USER",
      },
    });

    res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
