import { createSlice } from "@reduxjs/toolkit";


export const blobSlice = createSlice({
    name: "blob",
    initialState: {value: {name: "", datesAndTime: 0, images: "", blob: {}} },
    reducers: {
        sendBlobs: (state, action) => {
            state.value = action.payload
        },
    },
});

export default blobSlice.reducer;

