import axios from 'axios';
import User from '../models/userModel';

export async function saveToDB(data: any) {
  await User.findOneAndUpdate(
  { authId: data.authId },
  data,
  { upsert: true, new: true }
);
}
