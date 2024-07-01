import {MongoClient} from "mongodb";

declare global {
  var mongoClientPromise: Promise<MongoClient>;
  var clientPromise: Promise<MongoClient>;
}