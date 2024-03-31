import mongoose from 'mongoose';

export const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log('database is connected');
  } catch (error) {
    console.log('db is not connected '+error);
  }
};