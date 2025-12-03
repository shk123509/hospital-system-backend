// Create

// Update

// Delete

// Fetch by prescription ID

// Fetch by doctor ID

// Fetch by patient ID

// (Optional) Fetch all (Admin)

import {Apierror} from "../utils/Apierror.util.js"
import {ApiResponse} from "../utils/ApiResponse.util.js"
import {asyncHandler} from "../utils/asyhandler.util.js"
import {User} from "../models/user.models.js"
import {Prescription} from "../models/prescription.model.js"

// Create
const create = asyncHandler(async(req, res) =>{
    const {doctor, patient, medicine_name,dosage,duration, remarks} = req.body;

    if (!doctor) {
        throw new Apierror(400, "doctor is required fields.")
    }

    if (!patient) {
        throw new Apierror(400, "patient is required fields.")
    }

    if (!medicine_name) {
        throw new Apierror(400, "medicine_name is required fields.")
    }

    if (!dosage) {
        throw new Apierror(400, "dosage is required fields.")
    }

    if (!duration) {
        throw new Apierror(400, "duration is required fields.")
    }

    if (!remarks) {
        throw new Apierror(400, "remarks is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const create = await Prescription.create(
        {
            doctor,
            patient,
            medicine_name,
            dosage,
            remarks,
            duration
        }
    )

    if (!create) {
        throw new Apierror(400, "Models dose not create.")
    }

    return res.status(200).json(new ApiResponse(200, create, "Models is create successfully."))
})

// Update
const updatePrescription = asyncHandler(async(req, res) =>{
    const {preId} = req.params;
    const {medicine_name,dosage,duration, remarks} = req.body;

    if (!medicine_name) {
        throw new Apierror(400, "medicine_name is required fields.")
    }

    if (!dosage) {
        throw new Apierror(400, "dosage is required fields.")
    }

    if (!duration) {
        throw new Apierror(400, "duration is required fields.")
    }

    if (!remarks) {
        throw new Apierror(400, "remarks is required fields.")
    }

    if (!preId) {
        throw new Apierror(400, "preId is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist")
    }

    const Updates = await Prescription.findByIdAndUpdate(
        preId,
        {
            $set : {
                medicine_name,
                remarks,
                dosage,
                duration
            }
        },
        {
            new : true
        }
    )

    if (!Updates) {
        throw new Apierror(400, "Models dose not updates")
    }

    return res.status(200).json(new ApiResponse(200, Updates, "Models is updates successfully."))

})

// Delete
const deletePre = asyncHandler(async(req, res) =>{
    const {preId} = req.params;

    if (!preId) {
        throw new Apierror(400, "preId is required fields")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const deletes =  await Prescription.findOneAndDelete(preId)

    if (!deletes) {
        throw new Apierror(400, "Models is not delete.")
    }

    return res.status(200).json(new ApiResponse(200, [], "Models is delete successfully."))
})

// Fetch by prescription ID
const get = asyncHandler(async(req, res) =>{
    const {preId} = req.params;

    if (!preId) {
        throw new Apierror(400, "Pre id is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const fetched = await Prescription.findById(preId);

    if (!fetched) {
        throw new Apierror(400, "Models is not exist.")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "Models is fetched successfully."))

})
// Fetch by doctor ID
const getbydoctor = asyncHandler(async(req, res) =>{

    const {doctorId} = req.params;

    if (!doctorId) {
        throw new Apierror(400, "Doctor is is required fields.")
    }

    const user = await User.findById(req.user?._id);
 
    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const fetched = await Prescription.find({doctor : doctorId})

    if (fetched.length === 0) {
        throw new Apierror(400, "Models dose not exist")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "Models is fetched successfully."))
})

// Fetch by patient ID
const getbypatient = asyncHandler(async(req, res) =>{
    
    const {patientId} = req.params;

    if (!patientId) {
        throw new Apierror(400, "patientId  is required fields.")
    }

    const user = await User.findById(req.user?._id);
 
    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const fetched = await Prescription.find({patient : patientId})

    if (fetched.length === 0) {
        throw new Apierror(400, "Models dose not exist")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "Models is fetched successfully."))
})

// (Optional) Fetch all (Admin)
const getbyall = asyncHandler(async(req, res) =>{

    const user = await User.findById(req.user?._id);
 
    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const fetched = await Prescription.find()

    if (fetched.length === 0) {
        throw new Apierror(400, "Models dose not exist")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "Models is fetched successfully."))
})

export {
    create,
    updatePrescription,
    deletePre,
    get,
    getbydoctor,
    getbypatient,
    getbyall
}