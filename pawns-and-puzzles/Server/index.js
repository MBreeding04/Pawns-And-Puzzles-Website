import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express();

app.use(cors())

app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2801",
    database: "puzzle-pawns"
})

app.post("/SignIn", async (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    console.log(`email being sent: ${req.body.Email}`)
    console.log(`password being sent: ${req.body.Password}`)
    db.query(
        "SELECT * FROM WHERE Email = ? AND Password = ?"
        [Email, Password],
        (err, result) => {
            console.log(`result of query: ${result}`)
            console.log(`error of query: ${err}`)
            if (err) {
                res.send({ err: err })
            }
            /*/if (result.length > 0) {
                res.send(result)
            }line of code causing the issue/*/
            else {
                res.send({ message: "No email or password found" });
            }
        }

    );
})

app.listen(5000, () => {
    console.log("Connected to server")
})


