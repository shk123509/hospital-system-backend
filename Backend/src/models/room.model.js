import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    room_number: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["General", "Private", "ICU"],
    },
    bed_count : Number,
    bed_available : Number,
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
