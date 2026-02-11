require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// För att kunna lägga till CRUD.
const { ObjectId } = require("mongodb");

// Middleware för hantering av requests.
app.use(cors());
app.use(express.json());

// MongoDB, skapar klient med anslutningssträng.

const client = new MongoClient(process.env.MONGO_URI);
let filmerCollection;

async function connectDB() {
   await client.connect();
   const db = client.db(process.env.DB_NAME);
   filmerCollection = db.collection("filmer_collection");
   console.log("Uppkopplingen till MongoDB fungerar!");
}

connectDB();

// Testroute för att kontrollera att API:et körs.
app.get("/", (req, res) => {
   res.send("Filmer API is running");
});

app.get("/filmer", async (req, res) => {
   try {
      const filmer = await filmerCollection.find().toArray();
      res.json(filmer);
   } catch (err) {
      res.status(500).json({ error: "Kunde inte hämta filmerna" });
   }
});

app.listen(port, () => {
   console.log(`API kör på http://localhost:${port}`);
});

app.delete("/filmer/:id", async (req, res) => {
   try {
      const id = req.params.id;

      await filmerCollection.deleteOne({
         _id: new ObjectId(id),
      });

      res.json({ message: "Film borttagen" });
   } catch (err) {
      res.status(500).json({ error: "Kunde inte ta bort film" });
   }
});

app.post("/filmer", async (req, res) => {
   try {
      const film = req.body;
      const result = await filmerCollection.insertOne(film);
      res.json({ ...film, _id: result.insertedId });
   } catch (err) {
      res.status(500).json({ error: "Filmen kunde inte sparas" });
   }
});
