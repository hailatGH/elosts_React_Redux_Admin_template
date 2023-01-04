import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const URL = "https://music-service-vdzflryflq-ew.a.run.app/webApp/genre"
const URL = "http://127.0.0.1:8000//webApp/artist"

const initialState = {
    count: null,
    artists: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const notify = (type, msg) => {
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

export const fetchArtists = createAsyncThunk('artists/fetchArtists', async (pageNumber) => {
    const response = await axios.get(`${URL}?page=${pageNumber}`)
    return response.data
})

export const addNewArtist = createAsyncThunk('artists/addNewArtist', async (initialArtist) => {
    const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
    try {
        const response = await axios.post(URL, initialArtist, config)
        return response.data
    } catch (response) {
        console.log(response.response.data)
    }
})

export const updateArtist = createAsyncThunk('artists/updateArtist', async (initialArtist) => {
    const { id } = initialArtist;
    const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

    try {
        const response = await axios.patch(`${URL}/${id}`, initialArtist, config)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const deleteArtist = createAsyncThunk('artists/deleteArtist', async (initialArtist) => {
    const { id } = initialArtist;
    try {
        const response = await axios.delete(`${URL}/${id}`)
        if (response?.status === 200) return initialArtist;
        if (response?.status === 204) return initialArtist;
        return response?.status;
    } catch (err) {
        return err.message;
    }
})

const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
        artistAdded: {
            reducer(state, action) {
                const loadedArtists = action.payload
                loadedArtists.key = loadedArtists.id
                state.artists.push(loadedArtists)
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
            .addCase(fetchArtists.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchArtists.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedArtists = action.payload.results.map(artist => {
                    artist.key = artist.id
                    return artist
                })
                state.artists = []
                state.artists.push(loadedArtists)
                state.count = action.payload.count
            })
            .addCase(fetchArtists.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewArtist.fulfilled, (state, action) => {
                const loadedArtists = action.payload
                loadedArtists.key = loadedArtists.id
                state.artists[0].push(loadedArtists)
                state.count += 1
                notify("success", `Creating ${loadedArtists.artist_name} succeed!`);
            })
            .addCase(addNewArtist.rejected, (state, action) => {
                notify("error", `Failed creating the artist!`);
            })
            .addCase(deleteArtist.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    notify("error", `Failed deleting the artist!`);
                    return;
                }
                const { id } = action.payload;
                const artists = state.artists[0].filter(artist => artist.id !== id);
                state.artists[0] = artists;
                notify("success", `Succeed deleting the artist!`);
            })
            .addCase(updateArtist.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    notify("error", `Failed updating the artist!`);
                    return;
                }
                const loadedArtists = action.payload
                const { id } = loadedArtists;
                loadedArtists.key = id
                const artists = state.artists[0].filter(artist => artist.id !== id);
                state.artists[0] = [...artists, loadedArtists];
                notify("success", `Succeed updating the artist!`);
            })
    }
})

export const selectAllArtists = (state) => state.artists.artists[0]
export const getArtistsCount = (state) => state.artists.count
export const getArtistsStatus = (state) => state.artists.status
export const getArtistsError = (state) => state.artists.error
export const { artistAdded } = artistsSlice.actions
export default artistsSlice.reducer