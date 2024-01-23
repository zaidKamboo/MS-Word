// server.js
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const cors = require("cors");
// 7CecDRlnRFzbY2KC

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Use cors middleware to handle CORS headers
app.use(cors());
app.use(bodyParser.json());
//Connecting to the DB
// 7CecDRlnRFzbY2KC
mongoose
  .connect(
    "mongodb+srv://zaidkamboo100:7CecDRlnRFzbY2KC@cluster0.b9kcwlw.mongodb.net/"
  )
  .then(() => {
    console.log("Mongo db connected");
  })
  .catch((err) => console.log(err));

// USER ROUTES
app.use("/users", require("./routes/userRoutes.js"));
app.use("/document", require("./routes/documentRoutes.js"));

io.on("connection", (socket) => {
  console.log("A client connected", socket.id);

  // Handle incoming messages from the client
  socket.on("message", (data) => {
    socket.broadcast.emit("recieved_message", data);
    console.log(`Received ${data} from client`);

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello ");
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
