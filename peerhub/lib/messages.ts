import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let database: any | null = null;
let collection: any | null = null;

export async function connectToDatabase() {
  if (client) return;

  client = await MongoClient.connect(process.env.MONGODB_URI!);
  database = client.db("chat-app");
  collection = database.collection("messages");

  console.log("Connected to MongoDB");
}

export async function saveMessage(message: any) {
  if (!collection) await connectToDatabase();
  await collection.insertOne(message);
}

export async function getMessages(roomId: string) {
  if (!collection) await connectToDatabase();
  return collection.find({ roomId }).sort({ timestamp: -1 }).toArray();
}
