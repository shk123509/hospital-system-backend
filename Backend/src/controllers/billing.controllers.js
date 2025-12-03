// 1. Create Billing
// 2. Update Billing (charges, NOT payment_status)
// 3. Update Payment Status (pending → paid)
// 4. Delete Billing
// 5. Get Billing by Billing ID
// 6. Get Billings by Patient ID
// 7. Get Billings by Admission ID
// 8. Get Billings by Status (pending / paid)
// 9. Get All Billings (with filters + pagination)
// 10. Auto-calculate Total Amount
// 11. Prevent Duplicate Billing for Same Admission (optional)
// 12. Billing PDF / Print View (optional)
// 13. Dashboard Stats (total paid, pending, monthly) (optional)

import {Apierror} from "../utils/Apierror.util.js"
import {ApiResponse} from "../utils/ApiResponse.util.js"
import {asyncHandler} from "../utils/asyhandler.util.js"
import {User} from "../models/user.models.js"
import {Billing} from "../models/billing.model.js"

// 1. Create Billing
const createdBilling = asyncHandler(async(req, res) =>{
    const {admission, patient, consultation_charges, medicine_charges, room_charges, lab_charges, payment_status} = req.body;

    if (!admission) {
        throw new Apierror(400, "Admission id is required fields.")
    }

    if (!patient) {
        throw new Apierror(400, "patient id is required fields.")
    }

    if (!consultation_charges) {
        throw new Apierror(400, "consultation_charges is required fields.")
    }

    if (!medicine_charges) {
        throw new Apierror(400, "medicine_charges is required fields.")
    }

    if (!room_charges) {
        throw new Apierror(400, "room_charges is required fields.")
    }

    if (!lab_charges) {
        throw new Apierror(400, "lab_charges is required fields.")
    }

    if (!payment_status) {
        throw new Apierror(400, "payment_status is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }


    const created = await Billing.create(
        {
           admission,
           patient,
           payment_status,
           consultation_charges,
           room_charges,
           lab_charges,
           medicine_charges,
           generatedBy : user?._id,
           total_amount :consultation_charges + lab_charges + room_charges + medicine_charges

        }
    )

    if (!created) {
        throw new Apierror(400, "Models dose not created.")
    }

    return res.status(200).json(new ApiResponse(200, created, "Models is created successfully."))
})

// 2. Update Billing (charges, NOT payment_status)
const updateBilling = asyncHandler(async(req, res) =>{
    const {consultation_charges, medicine_charges, lab_charges, room_charges} = req.body;
    const {billingId} = req.params

    if (!consultation_charges) {
        throw new Apierror(400, "consultation_charges is required fields.")
    }

    if (!medicine_charges) {
        throw new Apierror(400, "medicine_charges is required fields.")
    }

    if (!lab_charges) {
        throw new Apierror(400, "lab_charges is required fields.")
    }

    if (!room_charges) {
        throw new Apierror(400, "room_charges is required fields.")
    }

    if (!billingId) {
        throw new Apierror(400, "billingId is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    // const exist = await Billing.findById(billingId);

    // if (!exist) {
    //     throw new Apierror(400, "Models dose not exist.")
    // }


    
    const updates = await Billing.findByIdAndUpdate(
        billingId,
        {
            $set : {
                consultation_charges,
                medicine_charges,
                lab_charges,
                room_charges,
                total_amount : consultation_charges + lab_charges + room_charges + medicine_charges
                
            }
        }
    ).select("-admission -patient -generatedBy -payment_status")

    if (!updates) {
        throw new Apierror(400, "Models isn not updates.")
    }

    return res.status(200).json(new ApiResponse(200, updates, "Models is updates successfully."))
})

// 3. Update Payment Status (pending → paid)
const UpdatesStatus = asyncHandler(async(req, res) =>{
    const {payment_status} = req.body;
    const {billingId} = req.params;

    if (!payment_status) {
        throw new Apierror(400, "Status is required fields.")
    }

    if (!billingId) {
        throw new Apierror(400, "billingId is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "Use dose not exist.")
    }

    const updatestatsu = await Billing.findByIdAndUpdate(
        billingId,
        {
            $set : {
                payment_status
            }
        }
    ).select("-admission -patient -generatedBy -consultation_charges -medicine_charges -room_charges -lab_charges")

    if (!updatestatsu) {
        throw new Apierror(400, "Models is not updates")
    }

    return res.status(200).json(new ApiResponse(200, updatestatsu, "Models is updates successfully."))
})
// 4. Delete Billing
const deleteBilling = asyncHandler(async(req, res) =>{
    const {billingId} = req.params;

    if (!billingId) {
        throw new Apierror(400, "billingId is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const deletebyid = await Billing.findByIdAndDelete(billingId);

    if (!deletebyid) {
        throw new Apierror(400, "Models is not delete.")
    }

    return res.status(200).json(new ApiResponse(200, [], "Models is delete successfully."))
})
// 8. Get Billings by Status (pending / paid)
const getByStatsu = asyncHandler(async(req, res) =>{
    const {payment_status_check} = req.body;

    if (!payment_status_check) {
        throw new Apierror(400, "payment_status_check is required fields")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const fetched = await Billing.find({payment_status : payment_status_check});

    if (fetched.length === 0) {
        throw new Apierror(400, "Models is not exist of the statsu.")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "Models is fetched successfully."))
})

// 5. Get Billing by Billing ID
const getbybillingid = asyncHandler(async(req, res) =>{
    const {billingId} = req.params;

    if (!billingId) {
        throw new Apierror(400, "billingId is required fields.")
    }
    
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist")
    }

    const fetched = await Billing.findById(billingId);

    if (!fetched) {
        throw new Apierror(400, "Models is not exist.")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "Models is fetched successfully."))
})

// 6. Get Billings by Patient ID
const getbypatientid = asyncHandler(async(req, res) =>{
    const {patientId} = req.params;

    if (!patientId) {
        throw new Apierror(400, "Patient id is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const fetched = await Billing.find({patient : patientId}).select("-admission -generatedBy");

    if (fetched.length === 0) {
        throw new Apierror(400, "Models is not exist.")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "Models is fetched"))

})

// 7. Get Billings by Admission ID
const getbyadmissionId = asyncHandler(async(req, res) =>{
    const {admissionId} = req.params;

    if (!admissionId) {
        throw new Apierror(400, "Admission id is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const fetched = await Billing.find({admission : admissionId}).select("-patient -generatedBy");

    if (fetched.length === 0) {
        throw new Apierror(400, "Models dose not exist.")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "Models is fetched successfully."))
})

// 9. Get All Billings (with filters + pagination)
const getbyfilter = asyncHandler(async(req, res) =>{
    const {payment_status, total_amount} = req.body;

    if (!payment_status) {
        throw new Apierror(400, "payment_status is required fields.")
    }

    if (!total_amount) {
        throw new Apierror(400, "total_amount is required fields.")
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new Apierror(400, "User dose not exist.")
    }

    const fetched = await Billing.find(
        {
            total_amount : total_amount,
            payment_status : payment_status
        }
    )

    if (fetched.length === 0) {
        throw new Apierror(400, "Models dose not exist.")
    }

    return res.status(200).json(new ApiResponse(200, fetched, "Models is fetched successgully."))
})

// 10. Auto-calculate Total Amount
const autoCalculate = asyncHandler(async(req, res) =>{
    const {consultation_charges, medicine_charges, room_charges, lab_charges} = req.body;

    if (!consultation_charges) {
        throw new Apierror(400, "consultation_charges is rquired fields.")
    }

    if (!medicine_charges) {
        throw new Apierror(400, "medicine_charges is rquired fields.")
    }

    if (!room_charges) {
        throw new Apierror(400, "room_charges is rquired fields.")
    }

    if (!lab_charges) {
        throw new Apierror(400, "lab_charges is rquired fields.")
    }

    const text = 1000;
    const discount = 500;

    const total_amount = consultation_charges+medicine_charges+lab_charges+room_charges+text-discount;

    return res.status(200).json(new ApiResponse(200, total_amount, "All amoutn claculate."))
})
// 11. Prevent Duplicate Billing for Same Admission (optional)
const prevent = asyncHandler(async(req, res) =>{
    const {billingId} = req.params;

    const exist = await Billing.findOne({billingId});

    if (exist) {
        return res.status(200).json(new ApiResponse(200,exist,"Bill already exists for this admission."))
    }

})



export {
    createdBilling,
    updateBilling,
    UpdatesStatus,
    deleteBilling,
    getByStatsu,
    getbybillingid,
    getbypatientid,
    getbyadmissionId,
    getbyfilter,
    autoCalculate,
    prevent
}