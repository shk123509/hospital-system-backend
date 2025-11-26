// Create a room – Add a new room to the system.

// Update room details – Change room type, bed count, etc.

// Delete a room – Remove a room when decommissioned.

// Fetch a room by ID – Get room info for a specific room.

// Check bed availability – Check how many beds are free.

// Fetch all rooms – List all rooms (useful for dashboards).

// Fetch rooms by type – Filter rooms by General, Private, ICU.

import {Apierror} from "../utils/Apierror.util.js"
import {ApiResponse} from "../utils/ApiResponse.util.js"
import {asyncHandler} from "../utils/asyhandler.util.js"
import {User} from "../models/user.models.js"
import {Room} from "../models/room.model.js";

// Create a room – Add a new room to the system.

const createRoom = asyncHandler(async(req, res) =>{
    const {room_number, type, bed_count, bed_available} = req.body

    if (!room_number) {
        throw new Apierror(400, "ROOM NUMBER IS REQUIRED FILEDS.")
    }

     if (!type) {
        throw new Apierror(400, "type IS REQUIRED FILEDS.")
    }

     if (!bed_count) {
        throw new Apierror(400, "bed_count IS REQUIRED FILEDS.")
    }

     if (!bed_available) {
        throw new Apierror(400, "bed_available IS REQUIRED FILEDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const create = await Room.create(
        {
            room_number,
            type,
            bed_available,
            bed_count
        }
    )

    if (!create) {
        throw new Apierror(400, "ROOM IS NOT CREATE.")
    }

    return res.status(200).json(new ApiResponse(200, create, "ROOM IS CREATE SUCCESSFULLY."))
})

// Update room details – Change room type, bed count, etc.
const UpdateRoom = asyncHandler(async(req, res) =>{
    const {type , bed_available, bed_count, room_number} = req.body
    const {roomId} = req.params

    if (!type) {
        throw new Apierror(400, "TYPE IS REQUIRED FIELDS.")
    }

    if (!bed_available) {
        throw new Apierror(400, "bed_available IS REQUIRED FIELDS.")
    }

    if (!bed_count) {
        throw new Apierror(400, "bed_count IS REQUIRED FIELDS.")
    }

    if (!room_number) {
        throw new Apierror(400, "room_number IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    if (!roomId) {
        throw new Apierror(400, "ROOM ID IS REQUIRED FIELDS.")
    }

    const updateDetails = await Room.findByIdAndUpdate(
        roomId,
        {
            $set : {
                type,
                bed_available,
                bed_count,
                room_number
            }
        },
        {
            new : true
        }
    )

    if (!updateDetails) {
        throw new Apierror(400, "ROOM DETAILS IS NOT UPDATE")
    }
    
    return res.status(200).json(new ApiResponse(200, updateDetails, "ROOM DETAILS IS UPDATE SUCCESSFULLY."))
})

// Delete a room – Remove a room when decommissioned.
const deleteRoom = asyncHandler(async(req, res) =>{
    const {roomId} = req.params;
    
    if (!roomId) {
        throw new Apierror(400, "ROOM IS IS REQUIRED FIELDS .")
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const checkRoom = await Room.findById(roomId);
    if (!checkRoom) {
        throw new Apierror(400, "ROOM IS NOT EXIST.")
    }

    const deleterooms = await Room.findByIdAndDelete(roomId);

    if (!deleterooms) {
        throw new Apierror(400, "ROOM IS NOT DELETE.")
    }

    return res.status(200).json(new ApiResponse(200, deleterooms, "ROOM IS DELETE SUCCESSFULLY."))


})

// Fetch a room by ID – Get room info for a specific room.

const fetchedRoom = asyncHandler(async(req, res) =>{
    const {roomId} = req.params

    if (!roomId) {
        throw new Apierror(400, "ROOM ID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const fetched = await Room.findById(roomId);

    if (!fetched) {
        throw new Apierror(400, "ROOM IS NOT FETCHED.")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "ROOM IS FETCHED SUCCESSFULLY."))

})

// Check bed availability – Check how many beds are free.
const checkbedavailable = asyncHandler(async(req, res) =>{
    const {roomId} = req.params

    if (!roomId) {
        throw new Apierror(400, "ROOM  ID IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const check = await Room.findById(roomId);

    if (!check) {
        throw new Apierror(400, "ROOM IS NOT EXIST")
    }

    if (check.bed_available === 0) {
        return res.status(200).json(new ApiResponse(200, [], "BED IS NOT AVAILABLE OF THIS ROOM"))
    }

    return res.status(200).json(new ApiResponse(200, check, "BED IS AVAILABLES."))
})

// Fetch all rooms – List all rooms (useful for dashboards).
const fetchedAllRooms  = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NO EXIST.")
    }

    const fetchedallrooms = await Room.find();

    if (fetchedallrooms.length === 0) {
        throw new Apierror(400, "ROOM IS NOT EXIST.")
    }

    return res.status(200).json(new ApiResponse(200, fetchedallrooms, "ALL ROOM IS FETCHED SUCCESSFULLY."))
})

// Fetch rooms by type – Filter rooms by General, Private, ICU.
const fetchedbyfilter = asyncHandler(async(req, res) =>{
    const {roombytype} = req.params

    if (!roombytype) {
        throw new Apierror(400, "ROOM TYPES IS REQUIRED FIELDS.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "USER DOSE NOT EXIST.")
    }

    const filter = await Room.find({
        type : roombytype
    })

    if (filter.length === 0) {
        throw new Apierror(400, "THIS PARTICULAR ROOM IS NOT EXIST.")
    }

    return res.status(200).json(new ApiResponse(200, filter, "ROOM IS FETCHED SUCCESSFULLY"))
})





export {
    createRoom,
    UpdateRoom,
    deleteRoom,
    fetchedRoom,
    checkbedavailable,
    fetchedAllRooms,
    fetchedbyfilter,
    
}


