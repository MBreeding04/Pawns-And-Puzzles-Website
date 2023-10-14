import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express();

const corsOption = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOption))

app.use(express.json());

const db = mysql.createConnection({
    host: "sql9.freemysqlhosting.net",
    user: "sql9653263",
    password: "nsbriSDRqP",
    database: "sql9653263",
    port:'3306'
})
app.get("/", (_req, res) => {
    res.json({message:"Connected"});
});
app.post("/SignIn", async (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    db.query(
        "SELECT * FROM users WHERE Email = ? AND Password = ?;",
        [Email, Password],
        async (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "None" })
            }
        }

    );
})

app.listen('5000', () => {
    console.log("Connected to server")
})


