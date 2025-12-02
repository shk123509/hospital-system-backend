import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    createdAtUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin / receptionist
      required: true,
    },
    date_admitted: Date,
    discharge_date: Date,
    status: {
      type: String,
      enum: ["active", "discharged"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Admission = mongoose.model("Admission", admissionSchema);
