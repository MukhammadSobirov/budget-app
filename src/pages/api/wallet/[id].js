import { getServerSession } from "next-auth";
import prisma from "prisma/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  switch (req.method) {
    case "DELETE":
      // Delete a wallet
      try {
        const foundWallet = await prisma.wallet.findUnique({
          where: {
            id: req.query.id,
          },
        });

        if (foundWallet.user_id !== session.user.id) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const transactions = await prisma.transaction.count({
          where: {
            wallet_id: req.query.id,
          },
        });

        if (transactions > 0) return res.status(400).json({ message: "Cannot delete wallet with transactions" });

        const deletedWallet = await prisma.wallet.delete({
          where: {
            id: req.query.id,
          },
        });

        return res.status(200).json({ wallet: deletedWallet });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
