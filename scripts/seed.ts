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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      { id: 1, title: "Spanish", imageSrc: "/es.svg" },
      { id: 2, title: "French", imageSrc: "/fr.svg" },
      { id: 3, title: "Italian", imageSrc: "/it.svg" },
      { id: 4, title: "Japanese", imageSrc: "/jp.svg" },
    ]);

    await db.insert(schema.units).values([
      { id: 1, 
        courseId: 1,
        title: "Unit 1", 
        description: "Learn the basics of Spanish", 
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, 
        unitId: 1,
        title: "Nouns", 
        order: 1,
      },
      { id: 2, 
        unitId: 1,
        title: "Verbs", 
        order: 2,
      },
      { id: 3, 
        unitId: 1,
        title: "Adjectives", 
        order: 3,
      },
      { id: 4, 
        unitId: 1,
        title: "Adjectives", 
        order: 4,
      },
      { id: 5, 
        unitId: 1,
        title: "Adjectives", 
        order: 5,
      },
      { id: 6, 
        unitId: 1,
        title: "Adjectives", 
        order: 6,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        lessonId: 1, // Nouns
        type: "SELECT", 
        order: 1,
        question: 'Which one of these is "the boy"'
      },
      {
        lessonId: 1, // Nouns
        type: "ASSIST", 
        order: 2,
        question: 'The girl'
      },
      {
        lessonId: 1, // Nouns
        type: "SELECT", 
        order: 3,
        question: 'The zombie'
      },
      {
        lessonId: 2, // Nouns
        type: "SELECT", 
        order: 4,
        question: 'The zombie'
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Nouns
        imageSrc: "/boy.svg", 
        audioSrc: "/es_boy.mp3", 
        correct: true,
        text: "el chico"
      },
      {
        challengeId: 1, // Nouns
        imageSrc: "/girl.svg", 
        audioSrc: "/es_girl.mp3", 
        correct: false,
        text: "la chica"
      },
      {
        challengeId: 1, // Nouns
        imageSrc: "/zombie.svg", 
        audioSrc: "/es_zombie.mp3", 
        correct: false,
        text: "el zombi"
      },
      {
        challengeId: 2, // Nouns
        audioSrc: "/es_boy.mp3", 
        correct: false,
        text: "el chico"
      },
      {
        challengeId: 2, // Nouns
        audioSrc: "/es_girl.mp3", 
        correct: true,
        text: "la chica"
      },
      {
        challengeId: 2, // Nouns
        audioSrc: "/es_zombie.mp3", 
        correct: false,
        text: "el zombi"
      },
      {
        challengeId: 3, // Nouns
        imageSrc: "/boy.svg", 
        audioSrc: "/es_boy.mp3", 
        correct: false,
        text: "el chico"
      },
      {
        challengeId: 3, // Nouns
        imageSrc: "/girl.svg", 
        audioSrc: "/es_girl.mp3", 
        correct: false,
        text: "la chica"
      },
      {
        challengeId: 3, // Nouns
        imageSrc: "/zombie.svg", 
        audioSrc: "/es_zombie.mp3", 
        correct: true,
        text: "el zombi"
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4, // Nouns
        imageSrc: "/boy.svg", 
        audioSrc: "/es_boy.mp3", 
        correct: true,
        text: "el chico"
      },
      {
        challengeId: 4, // Nouns
        imageSrc: "/girl.svg", 
        audioSrc: "/es_girl.mp3", 
        correct: false,
        text: "la chica"
      },
      {
        challengeId: 4, // Nouns
        imageSrc: "/zombie.svg", 
        audioSrc: "/es_zombie.mp3", 
        correct: false,
        text: "el zombi"
      },
    ]);

    console.log("Seeding finished");
  } catch (error: any) {
    throw new Error("Failed to seed the database");
  }
};

main();
