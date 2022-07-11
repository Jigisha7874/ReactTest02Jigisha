import { createSlice } from '@reduxjs/toolkit';

const whiteList = createSlice({
    name: 'whiteList',
    initialState: {
        user: null,
        uid: '',
    },
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
        },
        logOutUser: (state, action) => {
            state.user = null;
        }
    }
});

export const { saveUser, logOutUser } = whiteList.actions;
export default whiteList.reducer;