const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const token = (id) => {
  return jwt.sign({ id }, process.env.key, { expiresIn: process.env.exp });
};

//for sign-up purpose
exports.signup = async (req, res) => {
  const { name, phone, email, password, confirmPassword } = req.body;
  const signupData = await userModel.create({
    name: name,
    phone: phone,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });
  res.status(200).json({
    msg: "signup data subitted successfully",
    signupData,
  });
};
//for log-in purpose
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).json({
      msg: "email and password are required fields",
    });
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(200).json({ msg: "user not found" });
  }
  // const checkPassword = await user.check(password, user.password);
  if (password !== user.password) {
    return res.status(200).json({
      msg: "password mismatch",
    });
  }
  const newToken = await token(user._id);

  res
    .status(200)
    .cookie("yummy_cookies", newToken, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
      httpOnly: true,
    })
    .json({
      msg: "successfully logged-in",
      userInfo:user
    });
};
//for protecting user only mode purpose
exports.protect = async (req, res, next) => {
  const { yummy_cookies } = req.cookies;
  if (!yummy_cookies) {
    return res.status(200).json({
      msg: "need to login first",
    });
  }
  const decodeToken = await jwt.verify(yummy_cookies, process.env.key);
  if (!decodeToken.id) {
    return res.status(200).json({
      msg: "not valid user",
    });
  }
  const user = await userModel.findById(decodeToken.id).select("-__v");
  if (!user) {
    return res.status(200).json({
      msg: "user not found",
    });
  }
  req.user = user;
  next();
  // res.status(200).json({
  //   msg: "protection is working",
  // });
};

//for deleting a user by a admin purpose
exports.deleteUser = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(200).json({
      msg: "user not found",
    });
  }
  res.status(200).json({
    msg: "user removed successfully",
  });
};

//for restricting a perticuler user mode only
exports.restrictedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(200).json({
        msg: "must be a admin to delete or post anything",
      });
    }
    next();
  };
};

//for admin to view how many users available in data-base
exports.usergetdetails = async (req, res) => {

  const queryObject = { ...req.query };
  const queryFields = ["fields", "page", "sort", "limit", "name", "email"];
  queryFields.forEach((el) => delete queryObject[el]);

  let querySearch = queryObject;
  const regexpName = new RegExp(req.query.name, "i");
  const regexpEmail = new RegExp(req.query.email, "i");
  if (req.query.name || req.query.email) {
    querySearch = { ...querySearch, name: regexpName, email: regexpEmail};
  }

  const getUser = await userModel.find(querySearch);
  if (!getUser) {
    return res.status(200).json({
      msg: "no user found",
    });
  }
  res.status(200).json({
    msg: "user details received successfully",
    getUser,
  });
};

exports.authCheck = async (req, res) =>{
  res.status(200).json({
    msg:"logged in",
    userInfo: req.user
  })
}