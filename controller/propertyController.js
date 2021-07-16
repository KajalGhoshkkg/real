const propertyModel = require("../models/propertyModel");

//for card posting purpose for a single user
exports.propertydata = async (req, res) => {
  const {
    name,
    location,
    BHK,
    price,
    state_of_property,
    about,
    floor,
    latitude,
    longitude,
    launch_date,
    project_type,
    property_type,
    project_area,
    pin_code,
    full_address,
    highlight1,
    highlight2,
    highlight3,
    disclaimer,
    total_towers,
    possession_by,
    total_unit,
    occupancy_certificate,
    commencement_certicate,
    price_trends,
    near_by,
    detail,
  } = req.body;

  const propertyData = await propertyModel.create({
    userId: req.user._id,
    name: name,
    location: location,
    BHK: BHK,
    price: price,
    state_of_property: state_of_property,
    about: about,
    floor: floor,
    latitude: latitude,
    longitude: longitude,
    launch_date: launch_date,
    project_type: project_type,
    property_type: property_type,
    project_area: project_area,
    pin_code: pin_code,
    full_address: full_address,
    highlight1: highlight1,
    highlight2: highlight2,
    highlight3: highlight3,
    disclaimer: disclaimer,
    total_towers: total_towers,
    possession_by: possession_by,
    total_unit: total_unit,
    occupancy_certificate: occupancy_certificate,
    commencement_certicate: commencement_certicate,
    price_trends:price_trends,
    near_by: near_by,
    detail: detail,
  });
  res.status(200).json({
    msg: "Property data has been subitted successfully to the review team.",
    propertyData,
  });
};


//for admin & review team to see all the properties
exports.getAllPropertyDetails = async (req, res) => {
  const queryObject = { ...req.query };
  const queryFields = ["fields", "page", "sort", "limit", "name"];
  queryFields.forEach((el) => delete queryObject[el]);

  let querySearch = queryObject;
  const regexpName = new RegExp(req.query.name, "i");
  const regexpLocation = new RegExp(req.query.location, "i");
  if (req.query.name || req.query.location) {
    querySearch = { ...querySearch, name: regexpName,location: regexpLocation};
  }
  
  const detailProperty = await propertyModel.find(querySearch);
  res.status(200).json({
    msg: "Property details received from database",
    detailProperty,
  });
};

//for admin & reviewteam to delete any property if wanted
exports.deleteProperty = async (req, res) => {
  const deleteProperty = await propertyModel.findByIdAndDelete(req.params.id);
  if (!deleteProperty) {
    return res.status(200).json({
      msg: "Error deleting property && plz try again!!!!",
    });
  }
  res.status(200).json({
    msg: "Property deeted successfully",
  });
};

//for admin & reviewteam to update any property if wanted // ***confusion***
exports.updateProperty = async (req, res) => {
  const {
    name,
    location,
    BHK,
    price,
    state_of_property,
    img,
    about,
    floor,
    launch_date,
    project_type,
    property_type,
    project_area,
    pin_code,
    full_address,
    highlight,
    disclaimer,
    location_advantage,
  } = req.body;

  const editProperty = await propertyModel.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      location: location,
      BHK: BHK,
      price: price,
      state_of_property: state_of_property,
      img: img,
      about: about,
      floor: floor,
      launch_date: launch_date,
      project_type: project_type,
      property_type: property_type,
      project_area: project_area,
      pin_code: pin_code,
      full_address: full_address,
      highlight: highlight,
      disclaimer: disclaimer,
      location_advantage: location_advantage,
    },
    { new: true }
  );
  if (!editProperty) {
    return res.status(200).json({
      msg: "There ocured an error editing your property",
    });
  }
  res.status(200).json({
    msg: "Property edited successfully",
    editProperty,
  });
};

//for admin view all property of a particuler user...  purpose
exports.adminToUserAllProperty = async (req, res) => {
  const adminTOuserProperty = await propertyModel.find({ userId: req.params.id });
  if (!adminTOuserProperty) {
    return res.status(200).json({
      msg: "There ocured an error finding your property or no property available.",
    });
  }
  res.status(200).json({
    msg: "user property received successfully",
    userProperty,
  });
};

//for user veiw his own all property purpose...
exports.userAllProperty=async(req,res)=>{
  const userProperty = await propertyModel.find({ userId: req.user._id});
  if (!userProperty) {
    return res.status(200).json({
      msg: "There ocured an error finding your property or no property available.",
    });
  }
  res.status(200).json({
    msg: "user property received successfully",
    userProperty,
  });
}

// update First Img Url
exports.updateFirstImgUrl = async(req,res)=>{
  const imgUrl = await propertyModel.findByIdAndUpdate(req.params.id,{
    img:req.body.img
  },{new:true, runValidators:true})

  if(!imgUrl){
    return res.status(400).json({
      msg:"Image Url Not Updated"
    })
  }

  res.status(200).json({
    mag:"Image Url Updated"
  })
}

//Update Second Img Url
exports.updateSecondImgUrl = async(req,res)=>{
  const imgUrl = await propertyModel.findByIdAndUpdate(req.params.id,{
    img2:req.body.img2
  },{new:true, runValidators:true})

  if(!imgUrl){
    return res.status(400).json({
      msg:"Image Url Not Updated"
    })
  }

  res.status(200).json({
    mag:"Image Url Updated"
  })
}

//update Third Img Url
exports.updateThirdImgUrl = async(req,res)=>{
  const imgUrl = await propertyModel.findByIdAndUpdate(req.params.id,{
    img3:req.body.img3
  },{new:true, runValidators:true})

  if(!imgUrl){
    return res.status(400).json({
      msg:"Image Url Not Updated"
    })
  }

  res.status(200).json({
    mag:"Image Url Updated"
  })
}

//update Forth Img Url
exports.updateForthImgUrl = async(req,res)=>{
  const imgUrl = await propertyModel.findByIdAndUpdate(req.params.id,{
    img4:req.body.img4
  },{new:true, runValidators:true})

  if(!imgUrl){
    return res.status(400).json({
      msg:"Image Url Not Updated"
    })
  }

  res.status(200).json({
    mag:"Image Url Updated"
  })
}