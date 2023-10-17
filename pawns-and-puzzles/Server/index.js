import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createConnection({
    host: "sql9.freemysqlhosting.net",
    user: "sql9653263",
    password: "nsbriSDRqP", //make these enviormental variables so they are secret and cant be accessed
    database: "sql9653263",
    port: '3306'
})
app.get("/", (_req, res) => {
    res.json({ message: "Connected" });
});
app.post("/SignIn", async (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    try {
        db.query(
            "SELECT * FROM users WHERE Email = ? AND Password = ?;",
            [Email, Password],
            (err, result) => {
                console.log(`error message: ${err}`)
                console.log(`result:`)
                console.log(JSON.stringify(result))
                if (err) {
                    res.send({ message: "None", err: err })
                }
                try {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None" })
                    }
                }
                catch (error) {
                    res.send({ message: "API" })
                    console.log(`Your error: ${error.message}`)
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "API" })
        console.log(`Your error: ${error.message}`)
    }
})
app.post("/Games", async (req, res) => {
    const Gname = req.body.Gname;
    db.query(
        "SELECT * FROM game WHERE Gname = ?;"
        [Gname],
        async (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            try {
                if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None" })
                }
            }
            catch (error) {
                res.send({ message: "None" })
                console.log(`Your error: ${error.message}`)
            }
        }
    );
})

app.listen('5000', () => {
    console.log("Connected to server")
})


