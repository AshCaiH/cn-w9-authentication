const { Router } = require("express");
const userRouter = Router();

const controllers = require("./controllers");
const auth = require("../../middleware/auth");

// Create
userRouter.post("/users/register", auth.findUser, auth.hashPass, controllers.registerUser);

userRouter.post("/users/login", auth.findUser, auth.comparePass, controllers.login);

// Read
userRouter.get("/users", auth.tokenCheck, controllers.listUsers);

userRouter.get("/users/authcheck", auth.tokenCheck, controllers.confirmToken);

// Update

userRouter.put("/users/update", auth.tokenCheck, controllers.updateUser);

// Delete

userRouter.delete("/users/delete", auth.tokenCheck, controllers.deleteUser);

module.exports = userRouter
