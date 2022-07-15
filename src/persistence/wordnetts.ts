import sql from "sql-template-strings";
import db from "./db";

export type WordnettType = {
  id: number;
  wordnett: string;
  solutions: string[];
  createdAt: string;
  maxScore: number;
};

export async function createWordnett(
  wordnett: string,
  maxScore: number,
  solutions: string[]
) {
  const { rows } = await db.query(sql`
  INSERT INTO wordnetts (wordnett, max_points, solutions)
    VALUES (${wordnett}, ${maxScore}, ${solutions})
    RETURNING id;
  `);
  return rows[0].id as number;
}

export async function findWordnett(id: number) {
  const { rows } = await db.query(sql`
  SELECT * FROM wordnetts WHERE id = ${id};
  `);
  if (rows.length !== 1) {
    return null;
  }
  return rows[0];
}

export async function removeWordnett(id: number) {
  await db.query(sql`
  DELETE FROM wordnetts WHERE id = ${id};
  `);
}

