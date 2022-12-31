import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "https://music-service-vdzflryflq-ew.a.run.app/webApp/genre"

const initialState = {
    count: null,
    genres: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const notify = (type, msg) => {
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async (pageNumber) => {
    const page = pageNumber ? pageNumber : 1;
    const response = await axios.get(`${URL}?page=${page}`)
    return response.data
})

export const addNewGenre = createAsyncThunk('genres/addNewGenre', async (initialPost) => {
    const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
    const response = await axios.post(URL, initialPost, config)
    return response.data
})

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        genreAdded: {
            reducer(state, action) {
                const loadedGenres = action.payload
                loadedGenres.key = loadedGenres.id
                state.genres.push(loadedGenres)
            },
            prepare(inputData) {
                const formData = new FormData();
                for (let [key, value] of Object.entries(inputData)) {
                    formData.append(key, value);
                }
                return formData
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchGenres.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedGenres = action.payload.results.map(genre => {
                    genre.key = genre.id
                    return genre
                })
                state.genres.push(loadedGenres)
                state.count = action.payload.count
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewGenre.fulfilled, (state, action) => {
                const loadedGenres = action.payload
                loadedGenres.key = loadedGenres.id
                state.genres[0].push(loadedGenres)
                state.count += 1
                notify("success", `Creating ${loadedGenres.genre_name} succeed!`);
            })
            .addCase(addNewGenre.rejected, (state, action) => {
                const loadedGenres = action.payload
                notify("error", `Failed creating the genre!`);
            })
    }
})

export const selectAllGenres = (state) => state.genres.genres[0]
export const getGenresCount = (state) => state.genres.count
export const getGenresStatus = (state) => state.genres.status
export const getGenresError = (state) => state.genres.error
export const { genreAdded } = genresSlice.actions
export default genresSlice.reducer