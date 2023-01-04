import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const URL = "https://music-service-vdzflryflq-ew.a.run.app/webApp/track"
const URL = "http://127.0.0.1:8000//webApp/track"

const initialState = {
    count: null,
    tracks: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const notify = (type, msg) => {
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async (pageNumber) => {
    const response = await axios.get(`${URL}?page=${pageNumber}`)
    return response.data
})

export const addNewTrack = createAsyncThunk('tracks/addNewTrack', async (initialTrack) => {
    const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
    const response = await axios.post(URL, initialTrack, config)
    return response.data
})

export const updateTrack = createAsyncThunk('tracks/updateTrack', async (initialTrack) => {
    const { id } = initialTrack;
    const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

    try {
        const response = await axios.patch(`${URL}/${id}`, initialTrack, config)
        return response.data
    } catch (err) {
        return err.message;
    }
})
export const deleteTrack = createAsyncThunk('tracks/deleteTrack', async (initialTrack) => {
    const { id } = initialTrack;
    try {
        const response = await axios.delete(`${URL}/${id}`)
        if (response?.status === 200) return initialTrack;
        if (response?.status === 204) return initialTrack;
        return response?.status;
    } catch (err) {
        return err.message;
    }
})

const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        trackAdded: {
            reducer(state, action) {
                const loadedTracks = action.payload
                loadedTracks.key = loadedTracks.id
                state.tracks.push(loadedTracks)
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
            .addCase(fetchTracks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTracks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedTracks = action.payload.results.map(track => {
                    track.key = track.id
                    return track
                })
                state.tracks = []
                state.tracks.push(loadedTracks)
                state.count = action.payload.count
            })
            .addCase(fetchTracks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewTrack.fulfilled, (state, action) => {
                const loadedTracks = action.payload
                loadedTracks.key = loadedTracks.id
                state.tracks[0].push(loadedTracks)
                state.count += 1
                notify("success", `Creating ${loadedTracks.track_name} succeed!`);
            })
            .addCase(addNewTrack.rejected, (state, action) => {
                notify("error", `Failed creating the track!`);
            })
            .addCase(deleteTrack.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    notify("error", `Failed deleting the track!`);
                    return;
                }
                const { id } = action.payload;
                const tracks = state.tracks[0].filter(track => track.id !== id);
                state.tracks[0] = tracks;
                notify("success", `Succeed deleting the track!`);
            })
            .addCase(updateTrack.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    notify("error", `Failed updating the track!`);
                    return;
                }
                const loadedTracks = action.payload
                const { id } = loadedTracks;
                loadedTracks.key = id
                const tracks = state.tracks[0].filter(track => track.id !== id);
                state.tracks[0] = [...tracks, loadedTracks];
                notify("success", `Succeed updating the track!`);
            })
    }
})

export const selectAllTracks = (state) => state.tracks.tracks[0]
export const getTracksCount = (state) => state.tracks.count
export const getTracksStatus = (state) => state.tracks.status
export const getTracksError = (state) => state.tracks.error
export const { trackAdded } = tracksSlice.actions
export default tracksSlice.reducer