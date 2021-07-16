const express = require("express");
const {
  publishProperty,
  propertyView,
  deleteSoldProperty,
  rejectProperty,
  SoldoutProperty,
  onePropertyView,
} = require("../controller/publishController");
const { protect, restrictedTo } = require("../controller/userContoller");

const publishRoute = express.Router();

publishRoute.post(
  "/publishProperty",
  protect,
  restrictedTo("admin","reviewteam"),
  publishProperty
);
publishRoute.post(
  "/rejectProperty",
  protect,
  restrictedTo("admin","reviewteam"),
  rejectProperty
);

publishRoute.delete(
  "/deletePublishProperty/:id",
  protect,
  restrictedTo("admin","reviewteam"),
  deleteSoldProperty
);
publishRoute.get("/propertyView", propertyView);
publishRoute.get("/singleProperty/:id", onePropertyView)

publishRoute.post(
  "/soldoutProperty",
  protect,
  restrictedTo("admin","reviewteam"),
  SoldoutProperty
)


module.exports = publishRoute;
