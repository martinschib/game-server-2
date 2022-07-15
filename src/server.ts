import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { apiRouter } from "./api";

const app = express();

app.get("/", (request, response) => response.sendStatus(200));
app.get("/health", (request, response) => response.sendStatus(200));

app.use(morgan("short"));
app.use(express.json());

// Implement CORS
app.use(cors());

app.use(helmet());

app.use(apiRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`App started on port ${process.env.PORT || 3001}`);
});
