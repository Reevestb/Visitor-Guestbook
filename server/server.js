import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

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

app.get("/user", async (request, response) => {
  const result = await db.query(
    `
    SELECT * FROM visitors 
  `
  );
  response.json(result.rows);
});

app.post("/user", async (request, response) => {
  const { name, location, date, message } = request.body;
  try {
    await db.query(
      `INSERT into visitors (name, location, date, message) VALUES ($1, $2, $3, $4)`,
      [name, location, date, message]
    );
    response.status(200).json({ success: true });
  } catch (error) {
    console.error("No data is getting inserted", error);
    response.status(500).json({ success: false });
  }
});
