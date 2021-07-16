const propertyModel = require("../models/propertyModel");
const publishPropertyModel = require("../models/publishProperty");

//for reviewteam & admin to publish the property requested by a perticuler user
exports.publishProperty = async (req, res) => {
  const publish = await publishPropertyModel.create({
    propertyId: req.body.id,
  });
  const updateReview = await propertyModel.findByIdAndUpdate(req.body.id,{reviewed:"Approved"},{new:true,useFindAndModify:false})
  if (!publish || !updateReview) {
    return res.status(200).json({
      msg: "Property data has been published successfully.",
      publish,
    });
  }
  res.status(200).json({
    msg: "Property data has been published successfully.",
    publish,
  });
};

exports.rejectProperty =async (req,res)=>{
  const updateReview = await propertyModel.findByIdAndUpdate(req.body.id,{reviewed:"Rejected"},{new:true,useFindAndModify:false})
   const deleteProperty = await publishPropertyModel.findOneAndDelete({propertyId:req.body.id})
  if(!updateReview){
    return res.status(400).json({
      msg:"Data Not Updated"
    })
  }
   res.status(200).json({
    msg:"Property is Rejected"
  })
}
exports.SoldoutProperty = async (req, res) => {
  const UpdateReview = await propertyModel.findByIdAndUpdate(req.body.id, {reviewed:"Sold Out"},{new:true, useFindAndModify:false})
  if(!UpdateReview){
    return res.status(400).json({
      msg:"Review Property not updated"
    })
  }
    res.status(200).json({
      msg:"Review Property is updated"
    })
  
} 

//this rejectProperty referrs to delete the property that has been submitted to the review team & admin
exports.deleteSoldProperty = async (req, res) => {
  const rejection = await publishPropertyModel.findByIdAndDelete(req.params.id);
  if (!rejection) {
    return res.status(200).json({
      msg: "error deleting property data",
    });
  }
  res.status(200).json({
    msg: "Property data has been deleted successfully.",
  });
};

// for all property to view after publish for every single user..
exports.propertyView = async (req, res) => {

  const queryObject = { ...req.query };
  const queryFields = ["fields", "page", "sort", "limit"];
  queryFields.forEach((el) => delete queryObject[el]);

  console.log(queryObject)
  let queryStr = JSON.stringify(queryObject)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}`)
  console.log(JSON.parse(queryStr))

  let querySearch = JSON.parse(queryStr);
  const regexp = new RegExp(req.query.location, "i");
  if (req.query.location) {
    querySearch = { ...querySearch, location: regexp };
  }
  
  

  const allPropertyView = await publishPropertyModel
                                .find()
                                .populate(
                                  "propertyId",
                                  "name price location img BHK",querySearch)
  if (!allPropertyView) {
    return res.status(200).json({
      msg: "error fetching property data",
    });
  }
  res.status(200).json({
    msg: "received property data successfully.",
    allPropertyView,
  });
};


exports.onePropertyView =async (req,res)=>{
  const singlePropertyView = await publishPropertyModel.findById(req.params.id).populate({ path:'propertyId',populate:{path:'userId'}})
  if (!singlePropertyView) {
    return res.status(200).json({
      msg: "Data not Found"
    });
  }
  res.status(200).json({
    msg:"received property data successfully",
    propertyData:singlePropertyView
  })
}