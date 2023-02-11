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

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// command to run the seed: npx prisma db seed
