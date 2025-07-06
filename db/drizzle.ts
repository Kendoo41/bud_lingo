import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg";

import * as schema from "./schema";

// Create a PostgreSQL client pool (adjust connection string as needed)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Make sure to set this environment variable
});

export const db = drizzle(pool, { schema });
