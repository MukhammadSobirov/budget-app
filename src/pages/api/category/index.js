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
      // Create a category
      try {
        const newCategory = await prisma.category.create({
          data: {
            ...req.body,

            user: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });

        return res.status(201).json({ category: newCategory });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    case "GET":
      // Get all category
      try {
        const category = await prisma.category.findMany({
          where: {
            user_id: session.user.id,
          },
        });

        const count = await prisma.category.count({
          where: {
            user_id: session.user.id,
          },
        });

        return res.status(200).json({ category, count });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    case "PATCH":
      // Update a category
      const { id, ...other } = req.body;

      if (!id) return res.status(400).json({ message: "Missing category id" });

      try {
        const updatedCategory = await prisma.category.update({
          where: {
            id: id,
          },
          data: {
            ...other,
          },
        });

        return res.status(200).json({ category: updatedCategory });
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
