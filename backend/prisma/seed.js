// prisma/seed.js
import prisma from "../src/DB/db.config.js";
import bcrypt from "bcrypt";

async function main() {

  // Create roles
  const roles = ["ADMIN", "SALESPERSON", "MANAGER", "FACTORY_DISTRIBUTOR"];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: { name: role }
    });
  }

  // Create default admin user
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@company.com" },
    update: {},
    create: {
      first_name: "System",
      email: "admin@company.com",
      password: hashedPassword,
      role: {
        connect: { name: "ADMIN" }
      }
    }
  });

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
