const express = require("express")
const cors = require("cors")

const app = express(); // app is the server with all functionality of express

app.use(express.json()); // to handel json requeist 
app.use(cors());

app.get("/adduser", (req, res) => {
    console.log(req.body);
    res.send("Response Received1: "+ req.body);
});

app.listen(4000, () => console.log("server on localhost 4000"))

