import {getMongoDb} from "@/mongo-db/mongo-db";


export const logUserActivity = async (email: string, action: string, details: string) => {
  const db = await getMongoDb('logs');
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
