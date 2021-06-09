const express = require("express")
const mongoose = require("mongoose")
const app = express();
require("dotenv/config")

const User = require("./model/user")

const customMiddleware = (req, res, next) => {
    // console.log("Welcome to my middleware")
    next();
}
app.use(customMiddleware)

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Home Request")
})

app.get("/users", (req, res) => {
    User.find({}).then(function (users) {
        res.send({ users: users })
    });
})

app.post("/create_user", async (req, res) => {
    try {
        const myUser = new User(req.body);
        await myUser.save()
        res.send(myUser)
    } catch (err) {
        res.send({ message: err })
    }
})

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.Promise = global.Promise;
mongoose.connection.on("error", error => {
    console.log('Problem connection to the database' + error);
});

app.listen(3000, () => {
    console.log('listneing tp 300')
})
