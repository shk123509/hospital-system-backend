import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    specialization : {
        type : String,
        require : true
    },
    experience_years : {
        type : Number,
        require : true
    },
    availability : {
        type : Boolean,
        default : false
    },
    name : {
        type : String,
        require : true
    },
    consultation_fee : {
        type : Number,
        require : true
    }
}, {timestamps : true}) 

export const Doctor = mongoose.model("Doctor", doctorSchema)