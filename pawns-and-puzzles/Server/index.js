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

            else if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "None" })
            }
        }
    );
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
                else {
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
                else {
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
            else {
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
                    try {
                        console.log('error code:', err.code)
                        console.log('error code:', JSON.stringify(err.code))
                        if (JSON.stringify(err.code) == "ER_DUP_ENTRY") {
                            res.send({ message: "duplicate entry", err: err })
                        }
                        else {
                            res.send({ message: "None", err: err })
                        }
                    }
                    catch {
                        res.send({ message: "None", err: err })
                    }
                }
                else {
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

            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "None", error: 'No result matches your query' })
            }
        }
    );
})
app.post("/AddComment", async (req, res) => {
    const comment = req.body.commentEntry;
    const userId = req.body.userId;
    db.query(
        "INSERT INTO reviews ( Comment, userId) VALUES(?,?)",
        [comment, userId],
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "None", error: 'No comment' })
            }
        }
    );
})
app.post("/DeleteComment", async (req, res) => {
    const ChatID = req.body.reviewID
    db.query(
        "DELETE FROM `reviews` WHERE ChatID = ?",
        [ChatID],
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "None", error: 'No comment' })
            }
        }
    );
})
app.post("/UpdateComment", async (req, res) => {
    const comment = req.body.comment;
    const userId = req.body.userId
    db.query(
        "UPDATE reviews SET Comment = ? WHERE ChatID = ?;",
        [comment, userId],
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            else if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "None", error: 'No comment' })
            }
        }
    );
})
app.post("/GetGames", async (req, res) => {
    const VendorID = req.body.VendorID
    db.query(
        "SELECT * FROM game WHERE VendorID = ?;",
        [VendorID],
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
app.post("/AddGame", async (req, res) => {
    const Gname = req.body.Gname;
    const descp = req.body.descp;
    const price = req.body.price;
    const vendorId = req.body.vendorID;
    const Type = req.body.Type;
    db.query(
        "INSERT INTO game ( Gname, descp, price, VendorID, Type) VALUES(?,?,?,?,?)",
        [Gname, descp, price, vendorId, Type],
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "None", error: 'No comment' })
            }
        }
    );
})
app.post("/GetVendor", async (req, res) => {
    db.query(
        "SELECT * FROM vendors;",
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
app.post("/UpdateGames", async (req, res) => {
    
    const GameID = req.body.GameId;
    const Gname = req.body.Gname;
    const descp = req.body.descp;
    const price = req.body.price;
    const Type = req.body.Type;
    db.query(
        "UPDATE reviews SET Gname = ?, descp = ?, price = ?, Type = ?  WHERE GameID = ?;",
        [Gname, descp, price, Type, GameID],
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            else if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "None", error: 'No comment' })
            }
        }
    );
})
app.post("/DeleteGame", async (req, res) => {
    const GameID = req.body.GameID;
    db.query(
        "DELETE FROM `game` WHERE GameID = ?",
        [GameID],
        async (err, result) => {
            if (err) {
                res.send({ err: err.message })
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "None", error: 'No comment' })
            }
        }
    );
})
app.listen('5000', () => {
    console.log("Connected to server")
})


