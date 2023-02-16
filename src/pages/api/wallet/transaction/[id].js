import { getServerSession } from "next-auth";
import prisma from "prisma/prisma";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (req.method) {
    case "GET":
      // Get transactions of a wallet by id
      const { id, page, size } = req.query;

      if (!id) return res.status(400).json({ message: "Missing wallet id" });

      try {
        const transactions = await prisma.transaction.findMany({
          where: {
            wallet_id: id,
            user_id: session.user.id,
          },
          skip: +page * +size,
          take: +size,
          orderBy: {
            created_at: "desc",
          },
          include: {
            category: true,
            wallet: true,
          },
        });

        const count = await prisma.transaction.count({
          where: {
            wallet_id: id,
            user_id: session.user.id,
          },
        });

        return res.status(200).json({ transactions, count });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
  }
}
