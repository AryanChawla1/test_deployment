const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create mongo client
const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);
const database = client.db("club");
const collection = database.collection("events");

const app = express();
const port = 3001;

console.log(process.env.MONGODB_URL);

app.use(cors());
app.use(bodyParser.json());

app.get("/events", async (request, response) => {
  // Get all events
  const events = await collection.find({}).toArray();
  console.log("events", events);

  return response.send(events);
});

app.put("/events", async (request, response) => {
  console.log(request.body);
  const filter = { _id: ObjectId(request.body.id) };
  const update = { $set: { registered: request.body.registered } };

  const result = await collection.updateOne(filter, update);
  console.log(
    `${result.matchedCount} matched the filter, and we updated ${result.modifiedCount} documents`
  );

  response.send(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
