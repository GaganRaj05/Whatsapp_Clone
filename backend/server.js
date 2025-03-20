require("dotenv").config()
const connectToDB = require('./config/db');
const auth = require("./routes/auth")
const express = require('express');
const cookieParser = require('cookie-parser')
const helmet = require('helmet');
const morgan = require('morgan');
const featureRoutes = require("./routes/features")
const http = require("http");
const {Server} = require("socket.io");
const redisClient = require("./config/redis");


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(morgan("dev"))
app.use(helmet())
app.use("/app/auth",auth);
app.use("/app/features",featureRoutes);

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=> {
    console.log("New user connected",socket.id);

    socket.on("send message",async (message) => {
        try {
            console.log("Message recieved",message);
            await redisClient.rPush("chat_messages",message);
            socket.broadcast.emit("chat message", message);

            io.emit(message);
        }
        catch(err) {
            console.log(err)
            console.error("Error saving message to Redis")
        }
    }) 
    socket.on("get messages",async ()=> {
        const cachedMessages = await redisClient.lRange("chat_messages",0,-1);
        socket.emit("load messages",cachedMessages);
    })
    socket.on("disconnect",()=> {
        console.log("A user disconnected",socket.id);
    })
})

connectToDB(process.env.MONGODB_URL)

server.listen(process.env.PORT, ()=>console.log("Server started port:",process.env.PORT));