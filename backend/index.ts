import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Worker } from '@temporalio/worker';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));


app.use(express.json());


app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log('MongoDB Connected');
  app.listen(8080, () => console.log('Backend running on http://localhost:8080'));
});

async function runWorker() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./WorkData/userWorkData'),
    activities: require('./UserData/userData'),
    taskQueue: 'user-queue',
  });
  await worker.run();
}
runWorker();
