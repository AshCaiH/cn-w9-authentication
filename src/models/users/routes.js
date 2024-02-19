const { Router } = require("express");
const userRouter = Router();

const controllers = require("./controllers");

// Create
userRouter.post("/users/register", controllers.registerUser);

// Read
userRouter.get("/users", controllers.listUsers);

module.exports = userRouter
