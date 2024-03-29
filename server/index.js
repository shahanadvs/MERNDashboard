import express from "express";
import bodyParser from 'body-parser';
import mangoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";
import mongoose from "mongoose";

//data importing
import User from './models/User.js'
import Products from './models/Products.js'
import ProductStat from './models/ProductStat.js'
import {dataUser, dataProduct, dataProductStat} from './data/index.js'

//configuration

dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//Routes
app.use("/clients", clientRoutes)
app.use("/general", generalRoutes)
app.use("/management", managementRoutes)
app.use("/sales", salesRoutes)

//Mongoose setup
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=>{console.log(`Server listening on port : ${PORT} `)})
    /* add only once to remove duplicates */
    // User.insertMany(dataUser);
    // ProductStat.insertMany(dataProductStat);
    // Products.insertMany(dataProduct);
}).catch((error)=>{console.log(`${error} did not connect`)})