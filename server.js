import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv, { config } from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

const PORT = 7430;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.json({ message: "this is root route" });
});
