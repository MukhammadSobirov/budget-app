import { getServerSession } from "next-auth";
import prisma from "prisma/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  switch (req.method) {
    case "POST":
      // Create a wallet
      try {
        const newWallet = await prisma.wallet.create({
          data: {
            ...req.body,

            user: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });

        return res.status(201).json({ wallets: newWallet });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
