const mongoose = require("mongoose");
const config = require("config");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    process.exit(1);
  }
};

const connect = () => {
  if (process.env.NODE_ENV === "test") {
    return connectDB(config.get("testURI")).then(() => {
      // eslint-disable-next-line no-console
      console.log(`Connected to ${process.env.NODE_ENV} db`);
      // eslint-disable-next-line no-console
    }).catch((err) => console.log(err.message));
  }
  if (process.env.NODE_ENV === "production") {
    return connectDB(config.get("productionURI")).then(() => {
      // eslint-disable-next-line no-console
      console.log(`Connected to ${process.env.NODE_ENV} db`);
      // eslint-disable-next-line no-console
    }).catch((err) => console.log(err.message));
  }
  // eslint-disable-next-line no-console
  console.error(`
  Couldn't connect:
  
  env: ${process.env.NODE_ENV}`);
  return null;
};

const disconnect = () => {
  try {
    mongoose.connection.close(() => {
      // eslint-disable-next-line no-console
      console.log(`Disconnected from ${process.env.NODE_ENV} db`);
      process.exit(0);
    });
  } catch (err) {
    console.error(err);
  }
};

const cleanDatabase = () => {
  try {
    mongoose.connection.db.dropDatabase();
  } catch (err) {
    console.error(err);
  }
};

const db = {
  connect,
  disconnect,
  cleanDatabase,
};

module.exports = db;
