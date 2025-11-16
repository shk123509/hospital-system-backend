const option = {
    httpOnly: true,
    secure: true
}
import { User } from "../models/user.models.js"
import { asyncHandler } from "../utils/asyhandler.util.js"
import { ApiResponse } from "../utils/ApiResponse.util.js"
import { Apierror } from "../utils/Apierror.util.js"
import jwt from "jsonwebtoken"


const generateAccessandRefreshtoken = async (userid) => {
    try {
        const user = await User.findById(userid);
        const accesstoken = user.generateAccessToken();
        const refreshtoken = user.generateRefreshToken();
        user.refreshtoken = refreshtoken;
        await user.save({ validatedBeforeSave: false })
        return { accesstoken, refreshtoken }


    } catch (error) {
        console.log(error);

    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, phoneNUM, address, gender } = req.body

    if (!name) {
        throw new Apierror(400, "Name is require")
    }
    if (!email) {
        throw new Apierror(400, "Email is require")
    }
    if (!password) {
        throw new Apierror(400, "Password is require")
    }
    if (!role) {
        throw new Apierror(400, "Role is require")
    }
    if (!phoneNUM) {
        throw new Apierror(400, "Phone number is require")
    }
    if (!address) {
        throw new Apierror(400, "Address is require")
    }
    if (!gender) {
        throw new Apierror(400, "Gender is require")
    }

    const existUser = await User.findOne(
        {
            $or: [{ email }, { name }]
        }
    )

    if (existUser) {
        throw new Apierror(400, "User already exist")
    }

    // console.log("FILES:", req.files);


    const user = await User.create(
        {
            name,
            email,
            phoneNUM,
            address,
            gender,
            role,
            password,

        }
    )

    const createUser = await User.findById(user?._id).select("-passwod -refreshToken")

    if (!createUser) {
        throw new Apierror(400, "User is not created")
    }

    res.status(200).json(new ApiResponse(200, createUser, "User ceated successfully"))


})

const loginUser = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNUM } = req.body

    if (!name || !email || !phoneNUM) {
        throw new Apierror(400, "User or email or phone number  is require")
    }

    const user = await User.findOne(
        {
            $or: [{ email }, { name }, { phoneNUM }]
        }
    )

    if (!user) {
        throw new Apierror(400, "User dose not exist of this email")
    }

    const isPassword = await user.isPasswordCorrect(password);

    if (!isPassword) {
        throw new Apierror(400, "Password is not correct")
    }

    const { accesstoken, refreshtoken } = await generateAccessandRefreshtoken(user?._id);

    const loginUser = await User.findById(user?._id).select("-password -refreshtoken")

    return res.status(200).cookie("refreshtoken", refreshtoken, option).cookie("accesstoken", accesstoken, option).json(new ApiResponse(200, loginUser, "User is login successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshtoken: undefined
            }
        },
        {
            new: true
        }
    )

    return res.status(200).clearCookie("refreshtoken", option)
        .clearCookie("accesstoken", option).json(new ApiResponse(200, [], "User logout successfully."))
})

const refreshToken = asyncHandler(async (req, res) => {
    const IncomingRefreshtoken = req.cookies?.refreshToken || req.body?.refreshToken

    if (!IncomingRefreshtoken) {
        throw new Apierror(400, "Unauthorized User")
    }

    try {
        const decodeToken = jwt.verify(
            IncomingRefreshtoken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodeToken?._id);

        if (!user) {
            throw new Apierror(400, "Invilid refresh token")
        }

        if (IncomingRefreshtoken !== user?.refreshtoken) {
            throw new Apierror(400, "Invilid Refresh Token")
        }
        const { accesstoken, refreshtoken } = await generateAccessandRefreshtoken(user?._id);

        return res.status(200).cookie("refreshtoken", refreshtoken, option).cookie("accesstoken", accesstoken, option).json(new ApiResponse(400, "Refresh Token generate successfully"))
    } catch (error) {
        console.log("REFRESH TOKEN ERROR:", error);
        throw new Apierror(401, "Invalid or expired refresh token");

    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user?._d;

    return res.status(200).json(new ApiResponse(200, user, "Current user Fetch successfully"))
})

const UpdateProfile = asyncHandler(async (req, res) => {
    const { name, email, role, address, gender, phoneNUM } = req.body

    if (!name) {
        throw new Apierror(400, "Name is require")
    }
    if (!email) {
        throw new Apierror(400, "Email is require")
    }
    if (!role) {
        throw new Apierror(400, "Role is require")
    }
    if (!address) {
        throw new Apierror(400, "Address is require")
    }
    if (!gender) {
        throw new Apierror(400, "Gender is require")
    }
    if (!phoneNUM) {
        throw new Apierror(400, "Phone number is require")
    }

    const userId = req.user?._id;

    if (!userId) {
        throw new Apierror(400, "User dose not exist.")
    }

    const UpdateProfile = await User.findOneAndUpdate(
        userId,
        {
            $set: {
                name,
                email,
                phoneNUM,
                role,
                gender,
                address
            }
        },
        {
            new: true
        }
    ).select("-password -refreshtoken")

    if (!UpdateProfile) {
        throw new Apierror(400, "Somthing went wrong When user is not update profile ")
    }

    return res.status(200).json(new ApiResponse(200, UpdateProfile, "User Profile Update successfully"))


})

const PasswordChanged = asyncHandler(async(req, res) =>{
    const {oldpassword, Newpassword} = req.body

    if (!oldpassword) {
        throw new Apierror(400, "Password is require")
    }

    if (!Newpassword) {
        throw new Apierror(400, "New password is require")
    }

    const userId = await User.findById(req.user?._id);

    if (!userId) {
        throw new Apierror(400, "User dose not exist")
    }

    const isPassword = await userId.isPasswordCorrect(oldpassword)

    if (!isPassword) {
        throw new Apierror(400, "Password is not correct")
    }

    const UpdatePassword = await User.findByIdAndUpdate(
        userId,
        {
            $set : {
                Newpassword
            }
        },
        {
            new : true
        }
    ).select("-password  -refreshtoken")

    if (!UpdatePassword) {
        throw new Apierror(400, "PASSWORD IS NOT CHANGED.")
    }

    return res.status(200).json(new ApiResponse(200, UpdatePassword, "PASSWORD IS CHANGED SUCCESSFULLY"))
})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    getCurrentUser,
    UpdateProfile,
    PasswordChanged
}