import path from "path";
import migrate from "migrate";
import stateStore from "../persistence/postgres-state-storage";

const migrationsDirectory = path.resolve(__dirname, "../src/migrations");

const [command] = process.argv.slice(2);

new Promise((resolve, reject) => {
  migrate.load(
    {
      stateStore,
      migrationsDirectory,
    },
    (err, set) => {
      if (err) {
        reject(err);
      }

      if (typeof set[command] !== "function") {
        reject(new Error("Command is not a function"));
      }

      set[command]((err) => {
        if (err) reject(err);
        resolve(0);
      });
    }
  );
})
  .then(() => {
    console.log(`migrations "${command}" successfully ran`);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(0);
  })
  .catch((error) => {
    console.error(error.stack);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  });
