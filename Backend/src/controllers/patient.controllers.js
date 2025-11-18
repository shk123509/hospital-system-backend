//  Patient Module — Final 7 TODOs

// Create Patient

// Update Patient

// Delete Patient

// Get Patient by User ID

// Get Patient by Patient ID

// Get All Patients (with optional filters)

// Update Patient Status 

// Update Reports of Patient
import { Apierror } from "../utils/Apierror.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyhandler.util.js";
import { User } from "../models/user.models.js";
import { Patient } from "../models/patient.models.js";
import { uplodecloudinaryFile } from "../utils/upload.util.js"
// import { use } from "react";

// Create Patient
const createPatient = asyncHandler(async (req, res) => {
    const { userName, email, phone, gender, blood_group, address, emergency_contact, status } = req.body

    if (!userName) {
        throw new Apierror(400, "USERNAME IS REQUIRED FIELDS")
    }
    if (!email) {
        throw new Apierror(400, "email IS REQUIRED FIELDS")
    }
    if (!phone) {
        throw new Apierror(400, "PHONE NUMBER IS REQUIRED FIELDS")
    }
    if (!gender) {
        throw new Apierror(400, "gender IS REQUIRED FIELDS")
    }
    if (!blood_group) {
        throw new Apierror(400, "blood_group IS REQUIRED FIELDS")
    }
    if (!address) {
        throw new Apierror(400, "address IS REQUIRED FIELDS")
    }

    if (!emergency_contact) {
        throw new Apierror(400, "emergency_contact IS REQUIRED FIELDS")
    }
    if (!status) {
        throw new Apierror(400, "status IS REQUIRED FIELDS")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const existPatient = await Patient.findOne(
        {
            $or: [{ userName }, { email }]
        }
    )

    if (existPatient) {
        throw new Apierror(400, "USER NAME IS ALREADY EXIST.")
    }

    const reportLoclaPath = req.files?.report?.[0]?.path

    if (!reportLoclaPath) {
        throw new Apierror(400, "REPORT LOCLAPATH IS NOT EXIST.")
    }

    const report = await uplodecloudinaryFile(reportLoclaPath);

    if (!report?.url) {
        throw new Apierror(400, "URL IS NOT EXIST OF THIS REPORT.")
    }

    const PatientCreate = await Patient.create(
        {
            userName,
            user: user?._id,
            email,
            emergency_contact,
            phone,
            gender,
            blood_group,
            address,
            emergency_contact,
            status,
            report: report?.url
        }

    )

    if (!PatientCreate) {
        throw new Apierror(400, "PATIENT IS NOT CREATE.")
    }

    return res.status(200).json(new ApiResponse(200, PatientCreate, "PATIENT IS CREATE SUCCESSFULLY."))






})

// Update Patient
const UpdatePatient = asyncHandler(async (req, res) => {
    const { patientId } = req.params
    const { userName, email, phone, gender, blood_group, address, } = req.body

    if (!patientId) {
        throw new Apierror(400, "PATIENT ID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    if (!userName) {
        throw new Apierror(400, "USERNAME IS REQUIRED FIELDS")
    }
    if (!email) {
        throw new Apierror(400, "email IS REQUIRED FIELDS")
    }
    if (!phone) {
        throw new Apierror(400, "PHONE NUMBER IS REQUIRED FIELDS")
    }
    if (!gender) {
        throw new Apierror(400, "gender IS REQUIRED FIELDS")
    }
    if (!blood_group) {
        throw new Apierror(400, "blood_group IS REQUIRED FIELDS")
    }
    if (!address) {
        throw new Apierror(400, "address IS REQUIRED FIELDS")
    }

    if (!emergency_contact) {
        throw new Apierror(400, "emergency_contact IS REQUIRED FIELDS")
    }

    const PatientIdExist = await Patient.findById(patientId);

    if (!PatientIdExist) {
        throw new Apierror(400, "PATIENT DOSE NOT EXIST.")
    }

    const updatePatient = await Patient.findByIdAndUpdate(
        patientId,
        {
            $set: {
                userName,
                phone,
                email,
                emergency_contact,
                blood_group,
                address,
                gender
            }
        },
        {
            new: true
        }
    )

    if (!updatePatient) {
        throw new Apierror(400, "PATIENT PROFILES IS NOT UPDATES.")
    }

    return res.status(200).json(new ApiResponse(200, updatePatient, 'PATIENT PROFILES IS UPDATE SUCCESSFULLY.'))


})

// Delete Patient

const deleteProfiles = asyncHandler(async (req, res) => {
    const { patientId } = req.params

    if (!patientId) {
        throw new Apierror(400, "PATIENT ID IS REQUIRED FIELDS")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST")
    }

    const deleteProfiles = await Patient.findByIdAndDelete(patientId)

    if (!deleteProfiles) {
        throw new Apierror(400, "patient is not delete.")
    }

    return res.status(200).json(new ApiResponse(200, [], "PATIENT IS DELETE FOR THIS ID."))


})

// Get Patient by User ID
const getPatientByuserId = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, 'USER DOSE NOT EXIST')
    }

    const getPateint = await Patient.find({ user: userId });

    if (!getPateint) {
        throw new Apierror(400, "PATIENT IS NOT EXIST OF THIS ID.")
    }

    return res.status(200).json(new ApiResponse(400, getPateint, "PATIENT IS FETCHED SUCCESSFULLY."))


})


// Get Patient by Patient ID
const getPatientByPatientId = asyncHandler(async (req, res) => {
    const { patientId } = req.params

    if (!patientId) {
        throw new Apierror(400, "PATIENT ID REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const fetchPatient = await Patient.findById(patientId);

    if (!fetchPatient) {
        throw new Apierror(400, "Patient is not exist.")
    }

    return res.status(200).json(new ApiResponse(200, fetchPatient, "FETCHED THE PATIENT OF THIS ID."))
})
// Update Patient Status
const Updatestatus = asyncHandler(async (req, res) => {
    const { patientId } = req.params

    const { status } = req.body

    if (!status) {
        throw new Apierror(400, "STATUS IS REQUIRED FIELDS.")
    }

    if (!patientId) {
        throw new Apierror(400, "PATIENT ID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const updatePatient = await Patient.findByIdAndUpdate(
        patientId,
        {
            $set: {
                status
            }
        },
        {
            new: true
        }
    )

    console.log(updatePatient);


    if (!updatePatient) {
        throw new Apierror(400, "STATUS IS NOT UPDATES OF THIS PATIENT.")
    }

    return res.status(200).json(new ApiResponse(200, updatePatient, "STATUS IS UPDATE SUCCESSFULLY."))


})

// Update Reports of Patient
const updateReport = asyncHandler(async (req, res) => {
    const { patientId } = req.params

    if (!patientId) {
        throw new Apierror(400, "PATIENT ID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER IS NOT EXIST.")
    }

    const reportLocalpath = req.file?.path;

    if (!reportLocalpath) {
        throw new Apierror(400, "LOCAL PATH IS NOT EXIST.")
    }

    const report = await uplodecloudinaryFile(reportLocalpath);

    if (!report.url) {
        throw new Apierror(400, "REPORT OF URL IS NOT EXIST.")
    }

    const UpdatereportUrl = await Patient.findByIdAndUpdate(
        patientId,
        {
            $set: {
                report: report.url
            }
        },
        {
            new: true
        }
    )

    if (!UpdatereportUrl) {
        throw new Apierror(400, "Report is not update.")
    }

    return res.status(200).json(new ApiResponse(200, UpdatereportUrl, "REPORT IS UPDATE OF THIS PATIENT."))


})

const getPatientOfQuary = asyncHandler(async (req, res) => {
    const { status, blood_group, gender, search, page = 1, limit = 10, sortBy = "createdAt",
        sortOrder = "desc" } = req.query

    const query = {}

    if (status) {
        query.status = status
    }

    if (blood_group) {
        query.blood_group = blood_group
    }

    if (gender) {
        query.gender = gender
    }

    if (search) {
        const regex = new RegExp(search, "i")
        query.$or = [{ userName: regex },
        { email: regex },
        { phone: regex }]
    }

    const skip = (page - 1) * limit;

    const sortQuery = {};
    sortQuery[sortBy] = sortOrder === "asc" ? 1 : -1;

    const searchPatient = await Patient.find(query).sort(sortQuery).skip(skip).limit(Number(limit))

    const total = await Patient.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(200, {
            total,
            page: Number(page),
            limit: Number(limit),
            searchPatient
        }, "ALL PATIENTS FETCHED SUCCESSFULLY.")
    );


})


export {
    createPatient,
    UpdatePatient,
    deleteProfiles,
    getPatientByuserId,
    getPatientByPatientId,
    Updatestatus,
    updateReport,
    getPatientOfQuary
}


