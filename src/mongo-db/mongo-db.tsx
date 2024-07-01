import {MongoClient} from "mongodb";

export async function getMongoClient() {
  if (!global.mongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    global.mongoClientPromise = client.connect();
  }
  return global.mongoClientPromise;
}

export async function getMongoDb(name: string) {
  const mongoClient = await getMongoClient();
  return mongoClient.db(name);
}