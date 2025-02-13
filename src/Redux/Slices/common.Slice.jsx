import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    data: [],
    idCardData: "",
    inVoiceData: "",
    certificateData: "",
    certificateView: false,
    idCardView: false,
    inVoiceView: false,
    isLoading: false,
    error: null,
    PooupView: false,
    PooupViewTitle: "",
    pic: "",
  },
  reducers: {
    togglePopupData: (state, action) => {
      console.log("common slice received", action.payload.title);
      state.PooupViewTitle = action.payload.title;
      state.pic = action.payload.pic;
    },
    togglePopupView: (state, action) => {
      state.PooupView = !state.PooupView;
    },
    toggleIdCard: (state, action) => {
      state.idCardData = action.payload;
    },
    toggleIdCardView: (state, action) => {
      state.idCardView = !state.idCardView;
    },
    toggleInvoiceView: (state, action) => {
      state.inVoiceView = !state.inVoiceView;
    },
    toggleInvoiceData: (state, action) => {
      state.inVoiceData = action.payload;
    },
    toggleCertificateView: (state, action) => {
      state.certificateView = !state.certificateView;
    },
    toggleCertificateData: (state, action) => {
      state.certificateData = action.payload;
    },
  },
});

export const {
  togglePopupView,
  togglePopupData,
  toggleIdCard,
  toggleIdCardView,
  toggleCertificateData,
  toggleCertificateView,
  toggleInvoiceData,
  toggleInvoiceView
} = commonSlice.actions; // Export the action
export default commonSlice.reducer;
