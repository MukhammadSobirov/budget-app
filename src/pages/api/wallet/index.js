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

    case "GET":
      // Get all wallets
      try {
        const wallets = await prisma.wallet.findMany({
          where: {
            user_id: session.user.id,
          },
        });

        const count = await prisma.wallet.count({
          where: {
            user_id: session.user.id,
          },
        });

        return res.status(200).json({ wallets, count });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    case "PATCH":
      // Update a wallet
      const { id, ...other } = req.body;

      if (!id) return res.status(400).json({ message: "Missing wallet id" });

      try {
        const updatedWallet = await prisma.wallet.update({
          where: {
            id: id,
          },
          data: {
            ...other,
          },
        });

        return res.status(200).json({ wallet: updatedWallet });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
