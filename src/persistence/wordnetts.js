const sql = require("sql-template-strings");
const db = require("./db");

module.exports = {
  async create(wordnett, max_points, solutions) {
    const { rows } = await db.query(sql`
    INSERT INTO wordnetts (wordnett, max_points, solutions)
      VALUES (${wordnett}, ${max_points}, ${solutions})
      RETURNING id;
    `);
    return rows[0].id;
  },
  async find(id) {
    const { rows } = await db.query(sql`
    SELECT * FROM wordnetts WHERE id = ${id} LIMIT 1;
    `);
    if (rows.length !== 1) {
      return null;
    }
    return rows[0];
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM wordnetts WHERE id = ${id};
    `);
  },
};
