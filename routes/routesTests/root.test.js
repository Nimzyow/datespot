const db = require("../../config/db");
const app = require("../../server");

const PORT = 4777;
let server;

before(async () => {
  await db.connect();
  server = app.listen(PORT);
});

beforeEach(async () => {
  await db.cleanDatabase();
});

after(async () => {
  server.close();

  db.disconnect();
});
