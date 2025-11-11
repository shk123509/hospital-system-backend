import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    admission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin / receptionist
    },
    consultation_charges: Number,
    medicine_charges: Number,
    room_charges: Number,
    lab_charges: Number,
    total_amount: Number,
    payment_status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Billing = mongoose.model("Billing", billingSchema);
