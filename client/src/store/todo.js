import { createSlice } from "@reduxjs/toolkit";
export const reduxSlice = createSlice({
    name: "todo",

    initialState: {
        refreshCount: 0, //^ This will be called to refresh the UI so update in real time.
        todoArray: []   //^ 
    },

    reducers: {
        refresh: (state) => {
            state.refreshCount = state.refreshCount + 1
            console.log("REDUX refresh REDUCER:", state.refreshCount)

        }
    }
})

export const { refresh } = reduxSlice.actions
export default reduxSlice.reducer