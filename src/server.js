require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const User = require("./models/users/model");
const userRouter = require("./models/users/routes");

const port = process.env.PORT || 5001;


app.use(express.json(), cors(), userRouter);

const syncTables = async () => {
    app.use(User);

    User.sync();
}

app.get("/health", (req, res) => {
    res.status(200).json({message:"API is healthy"});
})

app.listen(port, async () => {
    await syncTables();

    console.log(`Server is listening on port ${port}`)
    console.log(`Page accessible at http://localhost/${port}`)
});