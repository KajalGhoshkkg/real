const express = require("express");
const {
  propertydata,
  getAllPropertyDetails,
  deleteProperty,
  updateProperty,
  adminToUserAllProperty,
  userAllProperty,
  updateFirstImgUrl,
  updateSecondImgUrl,
  updateThirdImgUrl,
  updateForthImgUrl
} = require("../controller/propertyController");
const { protect, restrictedTo } = require("../controller/userContoller");

const propertyRoute = express.Router();


propertyRoute.post("/post", protect, propertydata);
propertyRoute.get("/get",protect,restrictedTo("admin", "reviewteam"),getAllPropertyDetails);
propertyRoute.delete("/delete/:id",protect,restrictedTo("admin", "reviewteam"),deleteProperty);
propertyRoute.patch("/update/:id", protect, updateProperty);
propertyRoute.get("/getuserproperty/:id", protect, adminToUserAllProperty);
propertyRoute.get("/userallproperty", protect, userAllProperty);
propertyRoute.post("/firstImgUrlUpdate/:id",protect,updateFirstImgUrl)
propertyRoute.post("/secondImgUrlUpdate/:id",protect,updateSecondImgUrl)
propertyRoute.post("/thirdImgUrlUpdate/:id",protect,updateThirdImgUrl)
propertyRoute.post("/forthImgUrlUpdate/:id",protect,updateForthImgUrl)


module.exports = propertyRoute;
