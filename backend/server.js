require("dotenv").config()
const cors = require('cors');
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
const generateRoomId = require("./config/generateRoomId");

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))
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

    socket.on("join chat",({user1_id, user2_id})=>{
        const room_id = generateRoomId(user1_id,user2_id);
        socket.join(room_id);
        socket.broadcast.emit("room id",`${socket.id} has joined the room ${room_id}`)
    }) 

    socket.on("send message",async ({room_id, sender,message}) => {
        try {   
            console.log("Message recieved iin room",room_id," from ",sender);
            const messageData = JSON.stringify({sender,message})
            await redisClient.rPush(`chat_messages:${room_id}`,messageData);
            socket.to(room_id).emit("message",{sender,message});   
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
    socket.on("disconnect",async ()=> {
        const cachedMessages = await redisClient.lRange("chat_messages",0,-1);
        
        console.log("A user disconnected",socket.id);
    })
})

connectToDB(process.env.MONGODB_URL)

server.listen(process.env.PORT, ()=>console.log("Server started port:",process.env.PORT));