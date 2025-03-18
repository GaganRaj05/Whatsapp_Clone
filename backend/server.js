require("dotenv").config()
const connectToDB = require('./config/db');
const auth = require("./routes/auth")
const express = require('express');
const cookieParser = require('cookie-parser')
const helmet = require('helmet');
const morgan = require('morgan');
const featureRoutes = require("./routes/features")


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(morgan("dev"))
app.use(helmet())
app.use("/app/auth",auth);
app.use("/app/features",featureRoutes);

connectToDB(process.env.MONGODB_URL)

app.listen(process.env.PORT, ()=>console.log("Server started port:",process.env.PORT));