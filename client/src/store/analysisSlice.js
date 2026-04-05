// analysisSlice.js

import { createSlice } from "@reduxjs/toolkit";

const analysisSlice = createSlice({
  name: "analysis",
  initialState: { current: null },
  reducers: {
    setAnalysis: (state, action) => { state.current = action.payload; },
    clearAnalysis: (state) => { state.current = null; }
  }
});

export const { setAnalysis, clearAnalysis } = analysisSlice.actions;
export default analysisSlice.reducer;