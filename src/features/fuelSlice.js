import { createSlice } from '@reduxjs/toolkit';

const fuelSlice = createSlice({
    name: 'fuelSlice',
    initialState: {
        fuelList: [],
        fuelTypes: [],
        fuelListArray: [],
        userMaxAllowance: 0,
    },
    reducers: {
        setFuelTypes: (state, action) => {
            state.fuelTypes = action.payload
        },
        setFuelListArray: (state, action) => {
            state.fuelListArray = action.payload
        },
        createFuelList: (state, action) => {
            let data = [...state.fuelList]
            data.push(action.payload)
            state.fuelList = data
        },
        removeFuelList: (state,action)=>{
state.fuelList = []
        },
        removeFuelItem: (state, { payload: index }) => {
            state.fuelList.splice(index, 1)
        },
        setUserMaxAllowance: (state, action) => {
            state.userMaxAllowance = action.payload
        }
    }
});

export const { setFuelListArray, setFuelTypes, createFuelList, setUserMaxAllowance, removeFuelItem ,removeFuelList} = fuelSlice.actions;
export default fuelSlice.reducer;