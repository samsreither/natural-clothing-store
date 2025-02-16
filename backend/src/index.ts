import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { userRouter } from './routes/user';
import { productRouter } from './routes/product';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/products", productRouter);

mongoose.connect(
    process.env.MONGO_URI
).then(() => console.log("Connected to Mongo DB!"))

app.listen(3001,() => console.log("Server Started"));