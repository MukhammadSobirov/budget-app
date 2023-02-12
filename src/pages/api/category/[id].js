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
      // Delete a category
      try {
        const foundCategory = await prisma.category.findUnique({
          where: { id: req.query.id },
        });

        if (foundCategory.built_in) return res.status(400).json({ message: "Cannot delete built-in category" });

        if (foundCategory.user_id !== session.user.id) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const transactions = await prisma.transaction.count({
          where: { category_id: req.query.id },
        });

        if (transactions > 0) return res.status(400).json({ message: "Cannot delete category with transactions" });

        const deletedCategory = await prisma.category.delete({
          where: { id: req.query.id },
        });

        return res.status(200).json({ category: deletedCategory });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
