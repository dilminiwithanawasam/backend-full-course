// 1. Import the default package
import pkg from '@prisma/client';

// 2. Destructure PrismaClient from the package
const { PrismaClient } = pkg;

// 3. Create the instance
const prisma = new PrismaClient({
    log: ["query"],
});

// 4. Export it as default
export default prisma;