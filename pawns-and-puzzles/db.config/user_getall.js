

app.get("/users", (req, res)=>{
    const q = "Select * FROM users"
    db.query(q,(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
    })
  })