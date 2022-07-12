const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const api = require('./src/api');

app.get('/', (request, response) => response.sendStatus(200));
app.get('/health', (request, response) => response.sendStatus(200));

app.use(morgan('short'));
app.use(express.json());

// Implement CORS
app.use(cors());
app.options('*', cors());

app.use(helmet());

app.use(api);

let server;
module.exports = {
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
