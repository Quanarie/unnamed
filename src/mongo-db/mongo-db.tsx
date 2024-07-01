import {MongoClient} from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const mongoDbClient = new MongoClient(uri);

export const mongoDb = async () => {
  await mongoDbClient.connect();
  return mongoDbClient;
};
