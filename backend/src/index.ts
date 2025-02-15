import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://samsreither:natural-clothing-store@natural-clothing-store.dnvt3.mongodb.net/"
).then(() => console.log("Connected to Mongo DB!"))

app.listen(3001,() => console.log("Server Started"));