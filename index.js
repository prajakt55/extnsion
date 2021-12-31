const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/user')
var connectionUrl = "mongodb://localhost:27017/usersdata"

mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology:true}, (err) => {
    if(err) throw err
    console.log("connected")
})

app.use(express.urlencoded({ extended: true }))
app.set("view engine" , "ejs")
app.get('/home' , (req,res) => {
    res.render("index")
})

app.post("/api/user" , (req,res) => {
    const SaveUser = new UserModel(req.body)
    SaveUser.save((error,savedUser) => {
        if(error) throw error
        else console.log("data save")
        res.json(savedUser)
    })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Listening...')
})