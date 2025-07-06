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
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db
      .insert(schema.courses)
      .values([
        { id: 1, title: "Spanish", imageSrc: "/es.svg" },
        { id: 2, title: "French", imageSrc: "/fr.svg" },
        { id: 3, title: "Italian", imageSrc: "/it.svg" },
        { id: 4, title: "Japanese", imageSrc: "/jp.svg" },

      ]);

    console.log("Seeding finished");
  } catch (error: any) {
    toast.error(error.message);
    throw new Error("Failed to seed the database");
  }
};

main();
