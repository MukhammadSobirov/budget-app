const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password", 10);
  await prisma.user.create({
    data: {
      email: "admin@email.com",
      name: "Admin",
      surname: "Admin",
      password,
      role: "ADMIN",
    },
  });
}

// async function main() {
//   await prisma.category.createMany({
//     data: [
//       {
//         name: "Food",
//         color: "#FFC107",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Transport",
//         color: "#FF5722",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Health",
//         color: "#4CAF50",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Entertainment",
//         color: "#9C27B0",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Salary",
//         color: "#2196F3",
//         type: "INCOME",
//         built_in: true,
//       },
//       {
//         name: "Gift",
//         color: "#673AB7",
//         type: "INCOME",
//         built_in: true,
//       },
//       {
//         name: "Other",
//         color: "#607D8B",
//         type: "INCOME",
//         built_in: true,
//       },
//       {
//         name: "Other",
//         color: "#607D8B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Education",
//         color: "#FF9800",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Shopping",
//         color: "#E91E63",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Bills",
//         color: "#00BCD4",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Investment",
//         color: "#795548",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Savings",
//         color: "#009688",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Travel",
//         color: "#3F51B5",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Tax",
//         color: "#CDDC39",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Donation",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Charity",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Rent",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Loan",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Insurance",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Pet",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Grocery",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Household",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Beauty",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },

//       {
//         name: "Clothing",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Electronics",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Gift",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },

//       {
//         name: "Sports",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//       {
//         name: "Hobbies",
//         color: "#FFEB3B",
//         type: "EXPENSE",
//         built_in: true,
//       },
//     ],
//   });
// }

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// command to run the seed: npx prisma db seed
