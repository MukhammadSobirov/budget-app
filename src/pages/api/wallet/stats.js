import { getServerSession } from "next-auth";
import prisma from "prisma/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (req.method) {
    case "GET":
      // step 1: get all wallets for the user
      // step 2: group user transactions by category
      // step 3: get the balance for each wallet
      // step 4: get total expense for each wallet
      // step 5: get total income for each wallet
      // step 6: get average expense for each wallet
      // step 7: get average income for each wallet

      const wallets = await prisma.wallet.findMany({
        where: {
          user_id: session.user.id,
        },
        include: {
          Transaction: true,
        },
      });

      const stats = wallets.map((wallet) => {
        const transactions = wallet.Transaction;
        const balance = transactions.reduce((acc, curr) => {
          if (curr.transaction_type === "EXPENSE") {
            return acc - curr.amount;
          } else {
            return acc + curr.amount;
          }
        }, 0);

        const expenses = transactions.filter((t) => t.transaction_type === "EXPENSE");
        const income = transactions.filter((t) => t.transaction_type === "INCOME");

        const totalExpense = expenses.reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0);

        const totalIncome = income.reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0);

        const averageExpense = totalExpense / expenses.length;

        return {
          id: wallet.id,
          name: wallet.name,
          currency: wallet.currency,
          balance: Math.round(balance * 100) / 100, // round to 2 decimal places
          totalExpense: Math.round(totalExpense * 100) / 100,
          totalIncome: Math.round(totalIncome * 100) / 100,
          averageExpense: Math.round(averageExpense * 100) / 100,
          savingsRate: Math.round(((totalIncome - totalExpense) / totalIncome) * 100) / 100,
        };
      });

      return res.status(200).json({ stats });

    default:
      return res.status(404).json({ message: "not found" });
  }
}
