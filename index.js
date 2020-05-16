const app = require("./server");
const db = require("./config/db");

db.connect();

const PORT = 4000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
