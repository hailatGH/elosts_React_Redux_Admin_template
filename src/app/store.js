import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import artistsReducer from "../pages/music/stateSlice/artistsSlice"
import albumsReducer from "../pages/music/stateSlice/albumsSlice"
import genresReducer from "../pages/music/stateSlice/genresSlice"
import tracksReducer from "../pages/music/stateSlice/tracksSlice"

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumsReducer,
        genres: genresReducer,
        tracks: tracksReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
})