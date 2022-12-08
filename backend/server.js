import * as dotenv from 'dotenv';
import express from "express";
import path from "path";
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRouter from "./routers/userRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";

dotenv.config();

const app = express();
const MONGODB = process.env.MONGODB_URL;
mongoose.connect(MONGODB)
.then(() => {console.log('connected to Mongodb');
})
.catch((error) => {
    console.log(error.reason);
})
app.use(cors());
app.use(bodyParser.json()); 
app.use('/api/uploads', uploadRouter)

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.use('/api/orders', orderRouter);
const PAYPAL = process.env.PAYPAL_CLIENT_ID;
app.get('/api/paypal/clientId', (req, res) => {
    res.send({ clientId: PAYPAL}); 
  });


app.use('/uploads', express.static(path.join(__dirname, "../uploads")));
app.use("/static", express.static(path.resolve(__dirname, "../frontend","static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend","index.html"));
});

app.use((err, req, res, next) =>{
    const status = err.name && err.name === 'ValidationError'? 400: 500;
    res.status(status).send({message: err.message});
});

app.listen(process.env.PORT || 4000, () => console.log("Server running..."));