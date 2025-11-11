import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    userName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    phone : {
        type : String,
        require : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    gender : {
        type : String,
        require : true
    },
    blood_group : {
        type : String,
        require : true,
    },
    address : {
        type : String,
        require : true
    },
    emergency_contact : {
        type : String,
        require : true
    },
    status : {
        type : String,
        enum: ["admitted", "released", "follow-up"],
        require : true
    }
}, {timestamps : true})