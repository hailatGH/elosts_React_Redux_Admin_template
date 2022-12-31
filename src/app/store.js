import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../pages/music/stateSlice/genresSlice"

export const store = configureStore({
    reducer: {
        genres: genresReducer
    }
})