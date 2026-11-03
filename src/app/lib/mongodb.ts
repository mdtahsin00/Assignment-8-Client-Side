import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("frontend-user-data");

export const studiosCollection = db.collection("studios");
export const bookingsCollection = db.collection("bookings");
export { client, db };
