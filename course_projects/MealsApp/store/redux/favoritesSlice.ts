import {createSlice} from "@reduxjs/toolkit";

export type favoritesSliceStateType = {
    ids: string[]
}

const initialState: favoritesSliceStateType = {
    ids: []
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialState,
    reducers: {
        addFavorite: (state, action) => {
            // we can use state as if we mutate it directly - the passed
            // "state" argument is a draft that is used to update the
            // "real" state under the hood
            state.ids.push(action.payload.id);
        },
        removeFavorite: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1);
        },
    }
});

// we don't export the slice itself but its components that are generated
// by redux toolkit and added to the object
export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
