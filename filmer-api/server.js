// require("dotenv").config();
// const express = require("express");
// const { MongoClient } = require("mongodb");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 4000;

// // För att kunna lägga till CRUD.
// const { ObjectId } = require("mongodb");

// // Middleware för hantering av requests.
// app.use(cors());
// app.use(express.json());

// // MongoDB, skapar klient med anslutningssträng.

// const client = new MongoClient(process.env.MONGO_URI);
// let filmerCollection;

// async function connectDB() {
//    await client.connect();
//    const db = client.db(process.env.DB_NAME);
//    filmerCollection = db.collection("filmer_collection");
//    console.log("Uppkopplingen till MongoDB fungerar!");
// }

// connectDB();

// // Testroute för att kontrollera att API:et körs.
// app.get("/", (req, res) => {
//    res.send("Filmer API is running");
// });

// app.get("/filmer", async (req, res) => {
//    try {
//       const filmer = await filmerCollection.find().toArray();
//       res.json(filmer);
//    } catch (err) {
//       res.status(500).json({ error: "Kunde inte hämta filmerna" });
//    }
// });

// app.listen(port, () => {
//    console.log(`API kör på http://localhost:${port}`);
// });

// app.delete("/filmer/:id", async (req, res) => {
//    try {
//       const id = req.params.id;

//       await filmerCollection.deleteOne({
//          _id: new ObjectId(id),
//       });

//       res.json({ message: "Film borttagen" });
//    } catch (err) {
//       res.status(500).json({ error: "Kunde inte ta bort film" });
//    }
// });

// app.post("/filmer", async (req, res) => {
//    try {
//       const film = req.body;
//       const result = await filmerCollection.insertOne(film);
//       res.json({ ...film, _id: result.insertedId });
//    } catch (err) {
//       res.status(500).json({ error: "Filmen kunde inte sparas" });
//    }
// });

// Modifierad för att passa Render.
require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Miljövariabler.
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME || "filmer_collection";

let collection;

// Kopplar till MongoDB.
async function connectDB() {
   try {
      const client = new MongoClient(MONGO_URI);
      await client.connect();
      const db = client.db(DB_NAME);
      collection = db.collection(COLLECTION_NAME);
      console.log("MongoDB ansluten!");
   } catch (err) {
      console.error("MongoDB-anslutning misslyckades:", err);
   }
}

// Kör anslutningen innan routes.
connectDB();

// Test-route.
app.get("/", (req, res) => {
   res.send("Filmer API is running!");
});

// Hämta alla filmer.
app.get("/filmer", async (req, res) => {
   try {
      const filmer = await collection.find().toArray();
      res.json(filmer);
   } catch (err) {
      res.status(500).json({ error: "Kunde inte hämta filmer" });
   }
});

// Skapa ny film.
app.post("/filmer", async (req, res) => {
   try {
      const film = req.body;
      const result = await collection.insertOne(film);
      res.json({ ...film, _id: result.insertedId });
   } catch (err) {
      res.status(500).json({ error: "Filmen kunde inte sparas" });
   }
});

// Ta bort film.
app.delete("/filmer/:id", async (req, res) => {
   try {
      const id = req.params.id;
      await collection.deleteOne({ _id: new ObjectId(id) });
      res.json({ message: "Film borttagen" });
   } catch (err) {
      res.status(500).json({ error: "Kunde inte ta bort film" });
   }
});

// Start server.
app.listen(port, () => {
   console.log(`Server kör på port ${port}`);
});
