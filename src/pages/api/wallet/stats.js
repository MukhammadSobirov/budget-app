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
      const wallets = await prisma.wallet.findMany({
        where: {
          user_id: session.user.id,
        },
        include: {
          Transaction: {
            include: {
              category: true,
            },
          },
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

        // Bar chart data
        const barChartData = {
          labels: [],
          expenses: [],
          incomes: [],
        };

        const expenseDates = expenses.map((e) => e.date);
        const incomeDates = income.map((e) => e.date);

        const dates = [...new Set([...expenseDates, ...incomeDates])].sort();

        dates.forEach((date) => {
          barChartData.labels.push(date);
          barChartData.expenses.push(
            expenses.filter((e) => e.date === date).reduce((acc, curr) => acc + curr.amount, 0)
          );
          barChartData.incomes.push(income.filter((e) => e.date === date).reduce((acc, curr) => acc + curr.amount, 0));
        });
        // End bar chart data

        // Pie chart data
        const pieChartData = {
          expenseLabels: [],
          expenseHexColors: [],
          expenses: [],
          incomeLabels: [],
          incomeHexColors: [],
          incomes: [],
        };

        const expenseCategories = expenses.map((e) => e.category.name);
        const uniqueExpenseCategories = [...new Set(expenseCategories)];

        const incomeCategories = income.map((e) => e.category.name);
        const uniqueIncomeCategories = [...new Set(incomeCategories)];

        uniqueExpenseCategories.forEach((category) => {
          pieChartData.expenseLabels.push(category);
          pieChartData.expenses.push(
            expenses.filter((e) => e.category.name === category).reduce((acc, curr) => acc + curr.amount, 0)
          );
          const randomHexColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
          pieChartData.expenseHexColors.push(randomHexColor);
        });

        uniqueIncomeCategories.forEach((category) => {
          pieChartData.incomeLabels.push(category);
          pieChartData.incomes.push(
            income.filter((e) => e.category.name === category).reduce((acc, curr) => acc + curr.amount, 0)
          );
          const randomHexColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
          pieChartData.incomeHexColors.push(randomHexColor);
        });

        // End pie chart data

        return {
          id: wallet.id,
          name: wallet.name,
          currency: wallet.currency,
          balance: Math.round(balance * 100) / 100, // round to 2 decimal places
          totalExpense: Math.round(totalExpense * 100) / 100,
          totalIncome: Math.round(totalIncome * 100) / 100,
          averageExpense: Math.round(averageExpense * 100) / 100,
          savingsRate: Math.round(((totalIncome - totalExpense) / totalIncome) * 100) / 100,
          barChartData,
          pieChartData,
        };
      });

      return res.status(200).json({ stats });

    default:
      return res.status(404).json({ message: "not found" });
  }
}
