import { combineReducers } from "redux";
import authReducer from "./Slices/auth.Slice";
import teamReducer from "./Slices/team.Slice";
import mainSourceSlice from "./Slices/mainSource.Slice";
import courseSlice from "./Slices/course.Slice";
import branchSlice from "./Slices/branch.Slice";
import accountSlice from "./Slices/account.Slice";
import whatsappSlice from "./Slices/whatsapp.Slice";
import mailSlice from "./Slices/mail.Slice";
import admissionSlice from "./Slices/admission.Slice";
import subSourceSlice from "./Slices/subSource.Slice";
import commonSlice from "./Slices/common.Slice";

const RooteReducer=combineReducers({
   auth: authReducer,
   team: teamReducer,
   mainSourceSlice: mainSourceSlice,
   courseSlice: courseSlice,
   branchSlice: branchSlice,
   accountSlice: accountSlice,
   whatsappSlice: whatsappSlice,
   mailSlice: mailSlice,
   admissionSlice: admissionSlice,
   subSourceSlice: subSourceSlice,
   commonSlice: commonSlice
})

export default RooteReducer;