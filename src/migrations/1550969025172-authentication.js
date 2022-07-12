const db = require("../persistence/db");

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS wordnetts (
    id SERIAL PRIMARY KEY,
    created_at timestamp default now(),
    wordnett text,
    solutions text[],
    max_points INT NOT NULL
  );
  `);

  await client.query(`
  CREATE INDEX wordnetts_id on wordnetts (id);
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE wordnetts;
  `);

  await client.release(true);
  next();
};
