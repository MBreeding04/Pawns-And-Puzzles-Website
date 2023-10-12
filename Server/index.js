import express from "express"
import mysql from "mysql"
const app = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2801",
    database:"puzzle-pawns"
  })
  
  app.post("/src/Components/Sign in Page/SignIn.js", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query( 
      "SELECT * FROM WHERE Email = ? AND Password = ?"
      [Email, Password],
      (err, result) => {
        if (err)
        {
          res.send({err: err})
        } 
        if (result.length > 0)
          {
            res.send(result)
          }
        else {
            res.send({message: "No email or password found"});
          }
        }
      
    );
  })
  
app.listen(5000, ()=> {
console.log("Connected to server")
}) 

