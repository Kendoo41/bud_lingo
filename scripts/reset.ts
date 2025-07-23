import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "../db/schema";
import { toast } from "sonner";

// Create a PostgreSQL client pool (adjust connection string as needed)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Make sure to set this environment variable
});

const db = drizzle(pool, { schema });

const main = async () => {
  try {
    console.log("Resetting database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    console.log("Resetting finished");
  } catch (error: any) {
    throw new Error("Failed to seed the database");
  }
};

main();
