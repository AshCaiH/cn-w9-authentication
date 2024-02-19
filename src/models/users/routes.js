const { Router } = require("express");
const userRouter = Router();

const controllers = require("./controllers");
const auth = require("../../middleware/auth");

// Create
userRouter.post("/users/register", auth.hashPass, controllers.registerUser);

// Read
userRouter.get("/users", controllers.listUsers);

module.exports = userRouter
