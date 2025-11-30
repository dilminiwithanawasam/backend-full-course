import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import prisma from "./DB/db.config.js";


const app = express();
const PORT = process.env.PORT || 4000;
async function main() {
  try {
    // Attempt to connect to the database
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  }catch (error) {
    console.log( "database not connected");
  }
}

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

// * routes file
import userRouter from "./routes/userRoutes.js"


app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
