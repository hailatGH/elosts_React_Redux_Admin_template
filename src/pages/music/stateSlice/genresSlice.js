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
    const response = await axios.get(`${URL}?page=${pageNumber}`)
    return response.data
})

export const addNewGenre = createAsyncThunk('genres/addNewGenre', async (initialGenre) => {
    const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
    const response = await axios.post(URL, initialGenre, config)
    return response.data
})

export const updateGenre = createAsyncThunk('genres/updateGenre', async (initialGenre) => {
    const { id } = initialGenre;
    const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
    try {
        const response = await axios.patch(`${URL}/${id}`, initialGenre, config)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const deleteGenre = createAsyncThunk('genres/deleteGenre', async (initialGenre) => {
    const { id } = initialGenre;
    try {
        const response = await axios.delete(`${URL}/${id}`)
        if (response?.status === 200) return initialGenre;
        if (response?.status === 204) return initialGenre;
        return response?.status;
    } catch (err) {
        return err.message;
    }
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
                state.genres = []
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
                notify("error", `Failed creating the genre!`);
            })
            .addCase(deleteGenre.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    notify("error", `Failed deleting the genre!`);
                    return;
                }
                const { id } = action.payload;
                const genres = state.genres[0].filter(genre => genre.id !== id);
                state.genres[0] = genres;
                notify("success", `Succeed deleting the genre!`);
            })
            .addCase(updateGenre.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    notify("error", `Failed updating the genre!`);
                    return;
                }
                const loadedGenres = action.payload
                const { id } = loadedGenres;
                loadedGenres.key = id
                const genres = state.genres[0].filter(genre => genre.id !== id);
                state.genres[0] = [...genres, loadedGenres];
                notify("success", `Succeed updating the genre!`);
            })
    }
})

export const selectAllGenres = (state) => state.genres.genres[0]
export const getGenresCount = (state) => state.genres.count
export const getGenresStatus = (state) => state.genres.status
export const getGenresError = (state) => state.genres.error
export const { genreAdded } = genresSlice.actions
export default genresSlice.reducer