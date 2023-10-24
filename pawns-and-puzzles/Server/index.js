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
                else{
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None" })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "API" })
        console.log(`Your error: ${error.message}`)
    }
})
app.post("/ForgotPassword", async (req, res) => {
    const Email = req.body.Email;
    try {
        db.query(
            "SELECT * FROM users WHERE Email = ?;",
            [Email],
            (err, result) => {
                console.log(`error message: ${err}`)
                console.log(`result:`)
                console.log(JSON.stringify(result))
                if (err) {
                    res.send({ message: "None", err: err })
                }
                else{
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None" })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "API" })
        console.log(`Your error: ${error.message}`)
    }
})
app.post("/ResetPassword", async (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password
    try {
        db.query(
            "UPDATE users SET Password = ? WHERE Email = ?;",
            [Password, Email],
            (err, result) => {
                console.log(`error message: ${err}`)
                console.log(`result:`)
                console.log(JSON.stringify(result))
                if (err) {
                    res.send({ message: "None", err: err })
                }
                else{
                    res.send(result)
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
    var Gname = req.body.Gname;
    console.log('Gname ', Gname);
    Gname = '%' + Gname + '%'
    console.log('Gname pt2 ', Gname)
    db.query(
        "SELECT * FROM game WHERE Gname LIKE ? ;",
        [Gname],
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            else{
                if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No result matches your query' })
                }
            }
        }
    );
})
app.post("/Register", async (req, res) => {
    const EmailReg = req.body.EmailReg;
    const PasswordReg = req.body.PasswordReg;
    try {
        db.query(
            "INSERT INTO users (Email, Password) VALUES (?,?);",
            [EmailReg, PasswordReg],
            (err, result) => {
                console.log(`error message: ${err}`)
                console.log(`result:`)
                console.log(JSON.stringify(result))
                if (err) {
                    try{
                        console.log('error code:',err.code)
                        console.log('error code:',JSON.stringify(err.code))
                        if (JSON.stringify(err.code) == "ER_DUP_ENTRY") {
                            res.send({ message: "duplicate entry", err: err })
                        }
                        else{
                            res.send({ message: "None", err: err })
                        }
                    }
                    catch{
                        res.send({ message: "None", err: err })
                    }   
                }
                else{
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None" })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None" })
        console.log(`Your error: ${error.message}`)
    }
})
app.post("/Comment", async (req, res) => {      
    db.query(
        "SELECT X.ChatID, X.Comment, X.userID, Y.Email FROM reviews X INNER JOIN users Y ON X.userId = Y.userId",
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            try {
                if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No result matches your query' })
                }
            }
            catch (error) {
                res.send({ message: "None", error: error.message })
                console.log(`Your error: ${error.message}`)
            }
        }
    );
})
app.post("/AddComment", async (req, res) => {      
    comment = req.body.comment;
    console.log('reviews ',reviews);
    db.query(
        "INSERT INTO reviews (Comment) VALUES(?)",
        [comment],
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            try {
                if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No comment' })
                }
            }
            catch (error) {
                res.send({ message: "None", error: error.message })
                console.log(`Your error: ${error.message}`)
            }
        }
    );
})
app.post("/UpdateComment", async (req, res) => {      
    comment = req.body.comment;
    email = req.body.comment
    console.log('reviews ',reviews);
    db.query(
        "UPDATE reviews SET (Comment) = ? WHERE (Email) = ?;",
        [comment,email],
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            try {
                if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No comment' })
                }
            }
            catch (error) {
                res.send({ message: "None", error: error.message })
                console.log(`Your error: ${error.message}`)
            }
        }
    );
})
app.listen('5000', () => {
    console.log("Connected to server")
})


