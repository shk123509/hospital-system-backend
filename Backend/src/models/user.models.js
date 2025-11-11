import mongoose from "mongoose"

const Userschema = new mongoose.Schema({
  name : {
    type : String,
    require : true
  },
  email:{
    type : String,
    require : true,
    unique : true
  },
  password : {
    type : String,
    require : true
  },
  role : {
    type : String,
    enum: ["admin", "doctor", "receptionist"],
    require : true
  },
  phoneNUM : {
    type : Number,
    require : true
  }, 
  address : {
    type : String,
    require : true
  },
  gender : {
    type : String,
    require : true
  },
  avtar : {
    type : String,
    require : true
  }
}, {timestamps : true})

export const User = mongoose.model("User", Userschema)