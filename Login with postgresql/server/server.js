const express = require("express")
const cors = require("cors")
const pool = require("./database")

const app = express(); // app is the server with all functionality of express

app.use(express.json()); // to handel json requeist 
app.use(cors());

app.post("/adduser", (req, res) => { // pahel it was get then post 
    const username = req.body["username"]
    const password =req.body["password"]

    console.log("username:" + username);
    console.log("password:", + password);

    const insert = `INSERT INTO accounts ( username, password) VALUES ( '${username}', '${password}' );`
    
    pool.query(insert).then((response) => {
        console.log("Data saved");
        console.log(response);
        
    })
    .catch((err) =>{
        console.log(err);
    })

    console.log(req.body);
    res.send("Response Received1: "+ req.body);
});

app.listen(4000, () => console.log("server on localhost 4000"))

