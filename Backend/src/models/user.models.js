import mongoose from "mongoose"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Userschema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ["admin", "doctor", "receptionist"],
    require: true
  },
  phoneNUM: {
    type: Number,
    require: true,
    unique : true
  },
  address: {
    type: String,
    require: true
  },
  gender: {
    type: String,
    require: true
  },
  refreshtoken: {
    type: String
  },
}, { timestamps: true })

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next()
})

Userschema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

Userschema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    address: this.address,
    phoneNUM: this.phoneNUM
  },

    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
},
  Userschema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id
      },

      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    )
  }

export const User = mongoose.model("User", Userschema)