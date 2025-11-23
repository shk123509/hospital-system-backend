// Create Appointment


// Update Appointment (general)

// Update Status

// Get Appointment by Appointment ID

// Get Appointments by Patient ID

// Get Appointments by Doctor ID

// Delete Appointment

// Get All Appointments (admin/receptionist)

// Check Doctor Slot Availability

// Patient Self Appointments
// return 
// Field	Source
// _id	Appointment
// doctorName	Doctor Model (populate)
// date	Appointment
// time_slot	Appointment
// status	Appointment
// reason	Appointment

// Doctor Self Appointments

// return
// Field	Source
// _id	Appointment
// patientName	Patient Model (populate)
// patientPhone	Patient Model (populate)
// date	Appointment
// time_slot	Appointment
// status	Appointment
// reason	Appointment

// Cancel Appointment by Patient/Admin

// Filters + Pagination (optional but useful)

import {Appointment} from "../models/appointment.model.js";
import {Apierror} from "../utils/Apierror.util.js"
import {ApiResponse} from "../utils/ApiResponse.util.js"
// import {Apierror} from "../utils/Apierror.util.js";
import {asyncHandler} from "../utils/asyhandler.util.js"
import {User} from "../models/user.models.js"
// import { use } from "react";
// import {Doctor} from "../models/doctor.models.js"
// import {Patient} from "../models/patient.models.js"


// 1. Create Appointment

const createAppointment = asyncHandler(async(req, res) =>{

    const {doctor, patient, date, time_slot, status, reason} = req.body

    if (!doctor) {
        throw new Apierror(400, "DOCTOR ID IS REQUIRED FIELDS.")
    }
    if (!patient) {
        throw new Apierror(400, "patient ID IS REQUIRED FIELDS.")
    }
    if (!date) {
        throw new Apierror(400, "date IS REQUIRED FIELDS.")
    }
    if (!time_slot) {
        throw new Apierror(400, "time_slotIS REQUIRED FIELDS.")
    }
    if (!status) {
        throw new Apierror(400, "status IS REQUIRED FIELDS.")
    }
    if (!reason) {
        throw new Apierror(400, "reason IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const createAppointment = await Appointment.create(
        {
            date,
            time_slot,
            reason,
            status,
            doctor,
            patient,
            bookedBy : user?._id

        }
    )

    if (!createAppointment) {
        throw new Apierror(400, "MODELS DOSE NOT CREATE SOMTING WENT WRONG.")
    }

    return res.status(200).json(new ApiResponse(200, createAppointment, "USER APPOINTMENT IS CREATE SUCCCESSFULLY."))

})
// Update Appointment (general)
const UpdateAppointment = asyncHandler(async(req, res) =>{
    const {appointmentId} = req.params
    const {date, reason, time_slot} = req.body;

    if (!date) {
        throw new Apierror(400, "DATE IS REQUIRED FIELDS.")
    }
    if (!reason) {
        throw new Apierror(400, "reason IS REQUIRED FIELDS.")
    }
    if (!time_slot) {
        throw new Apierror(400, "time_slot IS REQUIRED FIELDS.")
    }

    if (!appointmentId) {
        throw new Apierror(400, "APPOINTMENT ID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const UpdateProfiles = await Appointment.findByIdAndUpdate(
        appointmentId,
        {
            $set : {
                date, 
                time_slot,
                reason
            }
        },
        {
            new : true
        }
    )

    if (!UpdateProfiles) {
        throw new Apierror(400, "APPOINTMENT IS NOT UPDATES")
    }

    return res.status(200).json(new ApiResponse(200, UpdateProfiles, "APPOINTMENT IS UPDATE SUCCESSFULLY."))

})

// Update Status
const UpdateStatus = asyncHandler(async(req, res)=>{
    const {appointmentId} = req.params

    const {status} = req.body;

    if (!appointmentId) {
        throw new Apierror(400, "APPOINTMENT ID IS REQUIRED FIELDS")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER IS NOT EXIST.")
    }

    if (!status) {
        throw new Apierror(400, "STATUS IS REQUIRED FIELDS.")
    }

    const UpdateStatus = await Appointment.findByIdAndUpdate(
        appointmentId,
        {
            $set : {
                status
            }
        }, 
        {
            new : true
        }
    ).select("-doctor -patient -bookedBy -date -time_slot -reason")

    if (!UpdateStatus) {
        throw new Apierror(400, "STATUS IS NOT UPDATE")
    }

    return res.status(200).json(new ApiResponse(200, UpdateStatus, "Status is update successfully."))


})

// Get Appointment by Appointment ID
const getAppointment = asyncHandler(async(req, res) =>{
    const {appointmentId} = req.params

    if (!appointmentId) {
        throw new Apierror(400, "APPOINTMENT ID IS REQUIRED FIELDS")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400,"USER DOSE NOT EXIST.")
    }

    const fetched = await Appointment.findById(appointmentId);

    if (!fetched) {
        throw new Apierror(400, "Appointment is not fetch.")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "APPOINTMENT IS FETCHED SUCCESSFULLY."))
})

// Get Appointments by Patient ID
const getAppointmentPatientId = asyncHandler(async(req, res) =>{
    const {patientID} = req.params

    if (!patientID) {
        throw new Apierror(200, "APPOINTMENT ID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const fetchedPatientId = await Appointment.find({patient : patientID});
    
    if (fetchedPatientId.length === 0) {
        throw new Apierror(404, "PATIENT IS NOT FETCHED.")
    }

    return res.status(200).json(new ApiResponse(200, fetchedPatientId, "APPOINTMENT IS FETCHED BY PATIENT ID."))


})

// Get Appointments by Doctor ID
const getApointmentDoctorId = asyncHandler(async(req, res) =>{
    const {doctorId} = req.params;

    if (!doctorId) {
        throw new Apierror(400, "DOCTOR ID IS REQUIRD FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const fetchedDoctorId = await Appointment.find({doctor : doctorId});

    if (fetchedDoctorId.length === 0) {
        throw new Apierror(404, "DOCTOR APPOINTMENT IS NOT FETCHED.")
    }

    return res.status(200).json(new ApiResponse(200, fetchedDoctorId, "APPOINTMENT ID FETCHED BY DOCTOR ID."))
})

// Check Doctor Slot Availability
const availabilityofAppointment = asyncHandler(async(req, res) =>{
    const {time_slot, date, doctorID} = req.body

    if (!time_slot) {
        throw new Apierror(400, "TIME SLOT IS REQUIRED FIELDS.")
    }
    if (!date) {
        throw new Apierror(400, "date IS REQUIRED FIELDS.")
    }
    if (!doctorID) {
        throw new Apierror(400, "doctorID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const checkAvaliability = await Appointment.findOne(
        {
            doctor : doctorID,
            time_slot : time_slot,
            date : date
        }
    )

     if (checkAvaliability) {
        throw new Apierror(404, "DOCTOR IS NOT AVAILABLE FOR THIS TIME SLOT.");
    }

    return res.status(200).json(new ApiResponse(200, [],  "DOCTOR IS AVAILABLE FOR THIS TIME SLOT."))
})

// Delete Appointment
const deleteAppointment = asyncHandler(async(req, res) =>{
    const {appointmentId} = req.params

    if (!appointmentId) {
        throw new Apierror(400, "APPOINTMENT ID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const deleteById = await Appointment.findByIdAndDelete(appointmentId);

    if (!deleteById) {
        throw new Apierror(400, "APPOINTMENT IS NOT DELETING")
    }

    return res.status(200).json(new ApiResponse(200, [], "APPOINTMENT IS DELETE SUCCCESSFULLY."))
})


// Patient Self Appointments
const getselfbypatientid = asyncHandler(async(req, res) =>{
  const {appointmentId} = req.params
  
  if (!appointmentId) {
    throw new Apierror(400, "appointmentId ID IS REQUIRED FIELDS.")
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new Apierror(400, "USER DOSE NOT EXIST.")
  }

  const fetchedSelf = await Appointment.findById(appointmentId).populate("doctor", "name specialization").select("-doctor -patient -bookedBy -createdAt")

  if (!fetchedSelf) {
    throw new Apierror(400, "PATIENT IS NOT FETCHED OF THIS USER.")
  }

  return res.status(200).json(new ApiResponse(200, fetchedSelf, "PATIENT IS FETCHED SUCCESSFUULLY."))

  
})

// Doctor Self Appointments
const getslefbydoctor = asyncHandler(async(req, res) =>{
    const {appointmentId} = req.params;

    if (!appointmentId) {
        throw new Apierror(400, "APPOINTMENT ID REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const fetchedSelf = await Appointment.findById(appointmentId).populate("patient", "userName phone emergency_contact").select("-doctor -patient -bookedBy -createdAt -updatedAt")

    if (!fetchedSelf) {
        throw new Apierror(400, "Self doctor is not fetched.")
    }

    return res.status(200).json(new ApiResponse(200, fetchedSelf, "DOCTOR SELF IS FETCHED SUCCESSFULLY."))


})

// Cancel Appointment by Patient/Admin
const CancelAppointment = asyncHandler(async(req, res) =>{
    const {appointmentId} = req.params;

    if (!appointmentId) {
        throw new Apierror(200, "APPOINTMENT ID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const cancel = await Appointment.findById(appointmentId, {status : "cancelled"});

    if (!cancel) {
        throw new Apierror(400, "APPOINTMENT IS NOT DELETE.")
    }

    return res.status(200).json(new ApiResponse(200, cancel, "APPOINTMENT IS DELETING SUCCESSFULLY."))
})



export {
    createAppointment,
    UpdateAppointment,
    UpdateStatus,
    getAppointment,
    getAppointmentPatientId,
    getApointmentDoctorId,
    availabilityofAppointment,
    deleteAppointment,
    getselfbypatientid,
    getslefbydoctor,
    CancelAppointment

}
