const express = require("express");
const userRouter = require("./routers/userRouter");
const cookieParser = require("cookie-parser");
const propertyRoute = require("./routers/propertyRouter");
const publishRoute = require("./routers/publishRouter");
const cors = require("cors")
const path = require("path")

const app = express();

app.use(
    cors(
        {
            origin:"http://localhost:3000",
            credentials:true
        }
    )
);
app.use(express.static(path.join(__dirname,"build")))
app.use(express.json());
app.use(cookieParser());
app.use("/admin", userRouter);
app.use("/property", propertyRoute);
app.use("/publish",publishRoute)
app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"build/index.html"))
})

module.exports = app;
