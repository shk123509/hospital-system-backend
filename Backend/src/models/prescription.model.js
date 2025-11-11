import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    medicines: [
      {
        medicine_name: String,
        dosage: String,
        duration: String,
      },
    ],
    remarks: String,
  },
  { timestamps: true }
);

export const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema
);
