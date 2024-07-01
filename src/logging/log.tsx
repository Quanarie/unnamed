import {mongoDb} from "@/mongo-db/mongo-db";

export const logUserActivity = async (email: string, action: string, details: string) => {
  const client = await mongoDb();
  const db = client.db('logs');
  const logsCollection = db.collection('activity-logs');

  const logEntry = {
    email,
    action,
    details,
    timestamp: new Date(),
  };

  try {
    await logsCollection.insertOne(logEntry);
  } catch (error) {
    console.error('Error logging user activity:', error);
  }
};
