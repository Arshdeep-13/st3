const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbname = "aaaaaaaaaaaaaaaaaaaaaaaaa";
const client = new MongoClient(url);

let db;

const connection = async () => {
  try {
    await client.connect();
    console.log("db connected");
    db = client.db(dbname);
    console.log("database created");
  } catch (err) {
    console.error(err);
  }
};

connection();

module.exports = () => db;
