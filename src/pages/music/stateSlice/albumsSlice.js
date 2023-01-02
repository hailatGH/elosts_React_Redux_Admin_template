import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "https://music-service-vdzflryflq-ew.a.run.app/webApp/album"

const initialState = {
    count: null,
    albums: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const notify = (type, msg) => {
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async (pageNumber) => {
    const response = await axios.get(`${URL}?page=${pageNumber}`)
    return response.data
})

export const addNewAlbum = createAsyncThunk('albums/addNewAlbum', async (initialPost) => {
    const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
    const response = await axios.post(URL, initialPost, config)
    console.log(response)
    return response.data
})

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        albumAdded: {
            reducer(state, action) {
                const loadedAlbums = action.payload
                loadedAlbums.key = loadedAlbums.id
                state.albums.push(loadedAlbums)
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
            .addCase(fetchAlbums.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedAlbums = action.payload.results.map(album => {
                    album.key = album.id
                    return album
                })
                state.albums = []
                state.albums.push(loadedAlbums)
                state.count = action.payload.count
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewAlbum.fulfilled, (state, action) => {
                const loadedAlbums = action.payload
                loadedAlbums.key = loadedAlbums.id
                state.albums[0].push(loadedAlbums)
                state.count += 1
                notify("success", `Creating ${loadedAlbums.album_name} succeed!`);
            })
            .addCase(addNewAlbum.rejected, (state, action) => {
                notify("error", `Failed creating the album!`);
            })
    }
})

export const selectAllAlbums = (state) => state.albums.albums[0]
export const getAlbumsCount = (state) => state.albums.count
export const getAlbumsStatus = (state) => state.albums.status
export const getAlbumsError = (state) => state.albums.error
export const { albumAdded } = albumsSlice.actions
export default albumsSlice.reducer