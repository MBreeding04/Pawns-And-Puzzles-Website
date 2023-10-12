import express from "express"
import mysql from "mysql"
const app = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2801",
    database:"puzzle-pawns"
  })
  
  app.get("/", (req, res)=>
  res.json("This is the Puzzle and Pawn's backend connection"))
  
app.listen(5000, ()=> {
console.log("Connected to server")
}) 

