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
      // Create a transaction
      try {
        const newTransaction = await prisma.transaction.create({
          data: {
            ...req.body,
            user: {
              connect: {
                id: session.user.id,
              },
            },
            category: {
              connect: {
                id: req.body.category,
              },
            },
            wallet: {
              connect: {
                id: req.body.wallet,
              },
            },
          },
          include: {
            category: true,
            wallet: true,
          },
        });

        return res.status(201).json({ transaction: newTransaction });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    case "GET":
      const { page, size } = req.query;
      // Get all transactions
      try {
        const transactions = await prisma.transaction.findMany({
          where: { user_id: session.user.id },
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
          where: { user_id: session.user.id },
        });

        return res.status(200).json({ transactions, count });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    case "PATCH":
      // Update a transaction
      const { id, ...other } = req.body;

      if (!id) return res.status(400).json({ message: "Missing transaction id" });

      try {
        const foundTransaction = await prisma.transaction.findUnique({
          where: { id: id },
        });

        if (foundTransaction.user_id !== session.user.id) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const updatedTransaction = await prisma.transaction.update({
          where: { id: id },
          data: other,
          include: {
            category: true,
            wallet: true,
          },
        });

        return res.status(200).json({ transaction: updatedTransaction });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    case "DELETE":
      // Delete a transaction
      const { transactionId } = req.query;

      if (!transactionId) return res.status(400).json({ message: "Missing transaction id" });

      try {
        const foundTransaction = await prisma.transaction.findUnique({
          where: { id: transactionId },
        });

        if (foundTransaction.user_id !== session.user.id) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const deletedTransaction = await prisma.transaction.delete({
          where: { id: transactionId },
        });

        return res.status(200).json({ transaction: deletedTransaction });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
