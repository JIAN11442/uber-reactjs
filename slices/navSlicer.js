import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
      setOrigin: (state, action) => {
        state.origin = action.payload;
      },
      setDestination: (state, action) => {
        state.destination = action.payload;
      },
      setTravelTImeInformation: (state, action) => {
        state.travelTimeInformation = action.payload;
      },
    },
});

export const { setOrigin, setDestination, setTravelTImeInformation } = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

//一個js檔案只能有一個預設export，且之後其他檔案要import這js檔案時，不強制要與export中的named一樣名
//https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/export
export default navSlice.reducer;