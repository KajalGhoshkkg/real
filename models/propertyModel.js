const mongoose = require("mongoose");
const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types;

const propertySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    BHK:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    state_of_property:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        // required:true,
    },
    img2:{
        type:String,
        // required:true,
    },
    img3:{
        type:String,
        // required:true,
    },
    img4:{
        type:String,
        // required:true,
    },
    userId:{
        type:ObjectId,
        ref:"usertables"
    },
    about:{
        type:String,
        required:true,
    },
    floor:{
        type:String,
        required:true,
    },
    launch_date:{
        type:String,
        required:true,
    },
    property_type:{
        type:String,
        required:true,
    },
    project_area:{
        type:String,
        required:true,
    },
    pin_code:{
        type:String,
        required:true,
        // maxlength:6,
    },
    full_address:{
        type:String,
        required:true,
        // minlength:20,
    },
    highlight1:{
        type:String,
        required:true,
    },
    highlight2:{
        type:String,
        // required:true,
    },
    highlight3:{
        type:String,
        // required:true,
    },
    disclaimer:{
        type:String,
        required:true,
    },
    total_towers:{
        type:Number,
    },
    possession_by:{
        type:String,
    },
    total_unit:{
        type:Number,
    },
    occupancy_certificate:{
        type:Boolean,
        required:true,
    },
    commencement_certicate:{
        type:Boolean,
    },
    price_trends:{
        type:Number,
        // required:true,
    },
    near_by:{
        type:String,
        required:true,
        minlength:10,
    },
    detail:{
        type:String,
        required:true,
        minlength:20,
    },
    reviewed:{
        type:String,
        enum:["Rejected","Approved","Not Set","Sold Out"],
        default:"Not Set"
    },
    latitude:{
        type:Number,
        required:true,
    },
    longitude:{
        type:Number,
        required:true,
    },

})


const propertyModel = mongoose.model("propertytables", propertySchema);
module.exports = propertyModel;