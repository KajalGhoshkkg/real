const mongoose = require("mongoose");
const validator = require("validator")
// const bcrypt = require("bcrypt")
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate:[validator.isEmail,"use valid email"]
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    require: true,
    validate:{
        validator:function(val){
            return val===this.password
        }
    }
  },
  phone: {
    type: Number,
    require: true,
    unique: true,
    minlength: 10,
  },
  cardId: {
    type: ObjectId,
    ref: "propertytables",
  },
  role: {
    type: String,
    enum: ["user", "admin", "dealer"],
    default: "user",
  },
});

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next()
    }
    // this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined
    next()
})

// userSchema.methods.check=async function(currentPassword,userPassword){
//   return await bcrypt.compare(currentPassword,userPassword)
// }

const userModel = mongoose.model("usertables", userSchema);
module.exports = userModel;
