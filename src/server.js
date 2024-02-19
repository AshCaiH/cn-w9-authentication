require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({message:"API is healthy"});
})

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`)
    console.log(`Page accessible at http://localhost:${port}`)
});