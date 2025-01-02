const express = require("express");
const app = express();
const userRouter = require("./routes/user.js")
const {connectMongoDb} = require("./connection");

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
const fs = require('fs');

const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(
    (req, res, next) => {
        fs.appendFile("log.txt",
            `${Date.now()} : ${req.ip} : ${req.method} : ${req.path}\n`,
            (err, data) => {
                next();
            }
        );
    }
)

// Learning Middleware

// app.use((req, res, next)=>{
//     console.log("Hello, from middware 1");
//     req.userName = "Puspalal Newar";
//     next();
// })
// app.use((req, res, next)=>{
//     console.log("Hello, from middware 2", req.userName);
//     // next();
//     // return res.send("hey");
//     next();
// })


// Routes
app.use("/user", userRouter);


app.listen(PORT, () => {
    console.log(`Server is starting on PORT ${PORT}`);
})