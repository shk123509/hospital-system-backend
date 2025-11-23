// 1. Create doctor
// 2. Update doctor profile
// 3. Check doctor availability
// 4. Get doctor profile (by ID/User)
// 5. Get all doctors (with optional filters)
// 6. Delete doctor profile

import { Apierror } from "../utils/Apierror.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyhandler.util.js";
import { Doctor } from "../models/doctor.models.js";
import { User } from "../models/user.models.js";

// 1. Create doctor
const createDoctor = asyncHandler(async (req, res) => {
    // 1. Create doctor
    const { specialization, experience_years, availability, consultation_fee, name } = req.body

    if (!specialization) {
        throw new Apierror(400, "specializationis require")
    }
    if (!experience_years) {
        throw new Apierror(400, "experience_years is require")
    }
    if (!availability) {
        throw new Apierror(400, "availability is require")
    }
    if (!consultation_fee) {
        throw new Apierror(400, "consultation_fee is require")
    }

    if (!name) {
        throw new Apierror(400, "Name is required fields")
    }

    const userId = await User.findById(req.user?._id);

    if (!userId) {
        throw new Apierror(400, "User dose not exist")
    }

    const CreateDocotr = await Doctor.create(
        {

            specialization,
            experience_years,
            availability,
            consultation_fee,
            user: userId?._id,
            name


        }
    )


    if (!CreateDocotr) {
        throw new Apierror(400, "Doctor user is not creating.")
    }

    return res.status(200).json(new ApiResponse(200, CreateDocotr, "Doctor is creating successfully."))
})

// 2. Update doctor profile
const updateProfile = asyncHandler(async (req, res) => {
    const { doctorId } = req.params
    const { specialization, experience_years, availability, consultation_fee } = req.body

    if (!doctorId) {
        throw new Apierror(400, "DOCTOR ID IS REQUIRE FIELD")
    }

    if (!specialization) {
        throw new Apierror(400, "specialization is require field")
    }

    if (!experience_years) {
        throw new Apierror(400, "experience_years is require field")
    }

    if (!availability) {
        throw new Apierror(400, "specialization is require field")
    }

    if (!consultation_fee) {
        throw new Apierror(400, "consultation fee  is require field")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const doctor = await Doctor.findById(doctorId)

    if (!doctor) {
        throw new Apierror(400, "DOCTOR DOSE NOT EXIST.")
    }

    const UpdateDoctorProfile = await Doctor.findByIdAndUpdate(
        doctorId,
        {
            $set: {
                specialization,
                availability,
                consultation_fee,
                experience_years

            }
        },
        {
            new: true
        }
    )

    if (!UpdateDoctorProfile) {
        throw new Apierror(400, "Docotr profiles dose not update")
    }

    return res.status(200).json(new ApiResponse(200, UpdateDoctorProfile, "Doctor profiles is update sucessfully."))

})

// 6. Delete doctor profile
const deleteDoctor = asyncHandler(async (req, res) => {
    const { doctorId } = req.params

    if (!doctorId) {
        throw new Apierror(400, "DOCTOR ID IS REQUIRE FIELD")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    // const doctor = await Doctor.findById(doctorId);

    // if (!doctor) {
    //     throw new Apierror("DOCTOR DOSE NOT EXIST.")
    // }

    const deleteDoctorById = await Doctor.findByIdAndDelete(doctorId);

    if (!deleteDoctorById) {
        throw new Apierror(400, "DOCTOR IS NOT DELETE SOMTING WENT WRONG.")
    }

    return res.status(200).json(new ApiResponse(200, deleteDoctorById, "DOCTOR IS DELETE SUCCESSSFULLY."))

})

// 4. Get doctor profile (by ID/User)
const getdoctorByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        throw new Apierror(400, "USER IS IS REQUIRE FIELD")
    }

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const getDoctor = await Doctor.find({ user: userId })

    if (getDoctor.length === 0) {
        throw new Apierror(404, "No doctor profile found for this user.");
    }

    return res.status(200).json(new ApiResponse(200, getDoctor, "DOCTOR IS FETCH SUCCESSFULLY. "))
})

// 5. Get all doctors (with optional filters)
const getDoctor = asyncHandler(async (req, res) => {
    const { doctorId } = req.params

    if (!doctorId) {
        throw new Apierror(400, "DOCTOR ID IS REQUIRED FIELDS")
    }

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const getDoctorId = await Doctor.findById(doctorId);

    if (!getDoctorId) {
        throw new Apierror(404, "No doctor profile found for this doctor id.");
    }

    return res.status(200).json(new ApiResponse(200, getDoctorId, "DOCTOR IS FETCHED BY DOCTOR ID"))
})


// 3. Check doctor availability
const checkAvailable = asyncHandler(async (req, res) => {
    const { doctorId } = req.params

    if (!doctorId) {
        throw new Apierror(400, "DOCTOR IS IS REQUIRED FIELDS")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const findDoctor = await Doctor.findById(doctorId);

    if (!findDoctor) {
        throw new Apierror(400, "DOCTOR IS NOT EXIST.")
    }

    if (findDoctor.availability === true) {
        return res.status(200).json(new ApiResponse(200, [], "Doctor is Available."))
    }

    if (findDoctor.availability === false) {
        return res.status(200).json(new ApiResponse(200, [], "Doctor is not  Available."))
    }

    return res.status(200)
})





export {
    createDoctor,
    updateProfile,
    deleteDoctor,
    getdoctorByUserId,
    getDoctor,
    checkAvailable
}