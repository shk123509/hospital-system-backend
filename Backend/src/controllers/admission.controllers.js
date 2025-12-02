// 1. Create Admission


// 2. Update Admission (excluding status)


// 3. Delete Admission (by admissionId)


// 4. Get Admission By ID


// 5. Update Admission Status


// 6. Get Admissions By Patient


// 7. Get Admissions By Doctor

// Fetch all admissions handled by a specific doctor.

// 8. Get Admissions By Room

// Fetch all admissions assigned to a specific room.

// 🔥 Optional (Recommended) Extra Controllers
// 9. Check Room Availability

// Check if a room is currently free or already assigned to an active admission.

// 10. Get All Active Admissions

// List all admissions where status = "active".

// 11. Get All Discharged Admissions

// List all admissions where status = "discharged".

// 12. Filter Admissions by Date Range

// Filter admissions by date_admitted or discharge_date (e.g., monthly report).

import {Admission} from "../models/admission.model.js"
import {Apierror} from "../utils/Apierror.util.js"
import {ApiResponse} from "../utils/ApiResponse.util.js"
import {asyncHandler} from "../utils/asyhandler.util.js"
import {User} from "../models/user.models.js"

// 1. Create Admission
const createAdmission = asyncHandler(async(req, res) =>{
    const {patient, doctor, room,  date_admitted, discharge_date, status} = req.body

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    if (!patient) {
        throw new Apierror(400, "patient id is required fields.")
    }

    if (!doctor) {
        throw new Apierror(400, "doctor id is required fields.")
    }
    if (!room) {
        throw new Apierror(400, "patient id is required fields.")
    }
    if (!date_admitted) {
        throw new Apierror(400, "date_admitted is required fields.")
    }
    if (!discharge_date) {
        throw new Apierror(400, "discharge_date is required fields.")
    }
    if (!status) {
        throw new Apierror(400, "status is required fields.")
    }

    const create = await Admission.create(
        {
            patient,
            room,
            doctor,
            createdAtUser : user?._id,
            discharge_date,
            status,
            date_admitted

        }
    )

    if (!create) {
        throw new Apierror(400, "Admission models is not create")
    }

    return res.status(200).json(new ApiResponse(200, create, "Admission models is created successfully."))
})

// 2. Update Admission (excluding status)
const updateAdmission = asyncHandler(async(req, res) =>{
    const {date_admitted, discharge_date} = req.body
    const {admissionId} = req.params

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    if (!date_admitted) {
        throw new Apierror(400, "date_admitted is required fields.")
    }

     if (!discharge_date) {
        throw new Apierror(400, "discharge_date is required fields.")
    }

     if (!admissionId) {
        throw new Apierror(400, "admissionId is required fields.")
    }

    const chkadmission = await Admission.findById(admissionId)

    if (!chkadmission) {
        throw new Apierror(400, "Admission models is not exist.")
    }

    const updates = await Admission.findByIdAndUpdate(
        admissionId,
        {
            $set : { 
                date_admitted,
                discharge_date
            }
        }
    ).select("-patient -doctor -room -createdAtUser -status")

    if (!updates) {
        throw new Apierror(400, "Admission is not Updates.")
    }

    return res.status(200).json(new ApiResponse(200, updates, "Admission is updates successfully."))


})

// 3. Delete Admission (by admissionId)
const deleteAdmission = asyncHandler(async(req, res) =>{
    const {admissionId} = req.params

    if (!admissionId) {
        throw new Apierror(400, "Admission is is required fields")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const chkAdmission = await Admission.findById(admissionId);

    if (!chkAdmission) {
        throw new Apierror(400, "Admission is not exist.")
    }

    const deleteAdmission = await Admission.findByIdAndDelete(
        admissionId
    )

    if (!deleteAdmission) {
        throw new Apierror(400, "Admission id is delete successfully.")
    }

    return res.status(200).json(new ApiResponse(200, [], "Admission models is delete successfully"))
})

// 4. Get Admission By ID

const getAdmission = asyncHandler(async(req, res) =>{
    const {admissionId} = req.params;

    if (!admissionId) {
        throw new Apierror(400, "Admission id is required fields")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const chkAdmission = await Admission.findById(admissionId);

    if (!chkAdmission) {
        throw new Apierror(400, "Admission models is not exist")
    }

    return res.status(200).json(new ApiResponse(200, chkAdmission, "Admission models is fetched successsfully."))
})

// 5. Update Admission Status
const Updatestatus = asyncHandler(async(req, res) =>{
    const {status} = req.body
    const {admissionId} = req.params

    if (!status) {
        throw new Apierror(400, "Status is required fields.")
    }
    
    if (!admissionId) {
        throw new Apierror(400, "Admission id is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist")
    }

    const chkAdmission = await Admission.findById(admissionId);

    if (!chkAdmission) {
        throw new Apierror(400, "Admission models dose not exist")
    }

    const updateStatus = await Admission.findByIdAndUpdate(
        admissionId,
        {
            $set: {
                status
            }
        }
    ).select("-patient -doctor -room -createdAtUser -date_admitted -discharge_date")

    if (!updateStatus) {
        throw new Apierror(400, "Satus is not update.")
    }

    return res.status(200).json(new ApiResponse(200, updateStatus, "Status is updates successfully."))
})

// 6. Get Admissions By Patient
const getbypatient = asyncHandler(async(req, res) =>{
    const {patientId} = req.params;

    if (!patientId) {
        throw new Apierror(400, "Patient id is required fields.")
    }
    
     const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist")
    }

    const getbyid = await Admission.find({patient : patientId}).select("-doctor -room -createdAtUser")

    if (getbyid.length === 0) {
        throw new Apierror(400, "Patient id is required fields")
    }

    return res.status(200).json(new ApiResponse(200, getbyid, "Patient is fetched successfully."))


    
})


// 7. Get Admissions By Doctor
const getbydoctor = asyncHandler(async(req, res) =>{
    const {doctorId} = req.params

    if (!doctorId) {
        throw new Apierror(400, "Doctor id is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const getbyiddoctor = await Admission.find({doctor : doctorId}).select("-patient -room -createdAtUser")

    if (getbyiddoctor.length === 0) {
        throw new Apierror(400, "Models is not exist.")
    }

    return res.status(200).json(new ApiResponse(200, getbyiddoctor, "Doctor is fetched succesfully."))


})

// 8. Get Admissions By Room
const getbyroom = asyncHandler(async(req, res) =>{
    const {roomId} = req.params;

    if (!roomId) {
        throw new Apierror(400, "Room id is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const getbyroomid = await Admission.find({room : roomId}).select("-patient -room -createdAtUser -doctor")

    if (getbyroomid.length === 0) {
        throw new Apierror(400, "Get the Admission by room id.")
    }
    
    return res.status(200).json(new ApiResponse(200, getbyroomid, "Admission is get successfully."))
    
})

// 10. Get All Active Admissions
const getbyfilter = asyncHandler(async(req, res) =>{
    // const {admissionId} = req.params;

    // if (!admissionId) {
    //     throw new Apierror(400, "Admission id is required fields.")
    // }
   
     const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const fetchedfiletr = await Admission.find({
        // _id : admissionId,
        status : "active"
    })

    if (fetchedfiletr.length === 0) {
        throw new Apierror(400, "Admission models is not exist")
    }

    return res.status(200).json(new ApiResponse(200, fetchedfiletr, "Successfully"))

})

// 11. Get All Discharged Admissions
const  get_All_Discharged = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not found.")
    }

    const findDischarge  = await Admission.find({status : "discharged"})

    if (!findDischarge) {
        throw new Apierror(400, "Status is not found.")
    }

    return res.status(200).json(new ApiResponse(200, findDischarge, "Succcessfully."))
})

// 12. Filter Admissions by Date Range
const filter_Admissions = asyncHandler(async(req, res) =>{
    const {date_admitted,discharge_date} = req.body;

    if (!date_admitted) {
        throw new Apierror(400, "date_admitted is required fields")
    }

     if (!discharge_date) {
        throw new Apierror(400, "discharge_date is required fields")
    }

   

    const getbyyy = await Admission.find({
        date_admitted,
        discharge_date
    })

    if (getbyyy.length === 0) {
        throw new Apierror(400, "Models is not exist.")
    }

    return res.status(200).json(new ApiResponse(200, getbyyy, "Successfully."))
})

export {
    createAdmission,
    updateAdmission,
    deleteAdmission,
    getAdmission,
    Updatestatus,
    getbypatient,
    getbydoctor,
    getbyroom,
    getbyfilter,
    get_All_Discharged,
    filter_Admissions
}

