import sql from "sql-template-strings";
import db from "./db";

export type WordnettType = {
  id: number;
  wordnett: string;
  solutions: string[];
  createdAt: string;
  maxPoints: number;
};

async function create(
  wordnett: string,
  max_points: number,
  solutions: string[]
) {
  const { rows } = await db.query(sql`
  INSERT INTO wordnetts (wordnett, max_points, solutions)
    VALUES (${wordnett}, ${max_points}, ${solutions})
    RETURNING id;
  `);
  return rows[0].id as number;
}

async function find(id: number) {
  const { rows } = await db.query(sql`
  SELECT * FROM wordnetts WHERE id = ${id};
  `);
  if (rows.length !== 1) {
    return null;
  }
  return rows[0];
}

async function remove(id: number) {
  await db.query(sql`
  DELETE FROM wordnetts WHERE id = ${id};
  `);
}

export default { create, find, remove };
