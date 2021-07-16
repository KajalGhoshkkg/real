const express = require("express");
const {
  signup,
  login,
  protect,
  deleteUser,
  restrictedTo,
  usergetdetails,
  authCheck,
} = require("../controller/userContoller");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
// userRouter.get("/protect", protect);
userRouter.get("/getUser", protect, restrictedTo("admin"), usergetdetails);
userRouter.get("/authCheck",protect,authCheck)
userRouter.delete(
  "/deleteUser/:id",
  protect,
  restrictedTo("admin"),
  deleteUser
);

module.exports = userRouter;
