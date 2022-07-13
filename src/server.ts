import express from "express";
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import api from "./api"

const app = express();

app.get('/', (request, response) => response.sendStatus(200));
app.get('/health', (request, response) => response.sendStatus(200));

app.use(morgan('short'));
app.use(express.json());

// Implement CORS
app.use(cors());

app.use(helmet());

app.use(api);

let server;
export default {
  start(port) {
    server = app.listen(port, () => {
      console.log(`App started on port ${port}`);
    });
    return app;
  },
  stop() {
    server.close();
  }
};
