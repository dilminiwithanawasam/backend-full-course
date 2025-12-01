import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import prisma from "./DB/db.config.js";


const app = express();
const PORT = process.env.PORT || 4000;
import userRouter from "./routes/userRoutes.js"
import roleRouter from "./routes/roleRoutes.js"
import permissionRouter from "./routes/permissionRoutes.js"
import authRoutes from "./routes/auth.routes.js";


// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    return res.send("Hi Everyone.");
});
app.get('/check-db', async (req, res) => {
  try {
    // Run a simple raw query to test connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ message: 'Database connection is healthy' });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});



app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/permission", permissionRouter);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
