import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../pages/music/stateSlice/genresSlice"
import albumsReducer from "../pages/music/stateSlice/albumsSlice"

export const store = configureStore({
    reducer: {
        genres: genresReducer,
        albums: albumsReducer
    }
})