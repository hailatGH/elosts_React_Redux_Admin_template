import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const URL = "https://music-service-vdzflryflq-ew.a.run.app/webApp/album"
const URL = "http://127.0.0.1:8000/webApp/album"

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

export const addNewAlbum = createAsyncThunk('albums/addNewAlbum', async (initialAlbum) => {
    // console.log("Before");
    // console.log(initialAlbum);
    // const initialAlbum = {...initialAlbum, artist_id: [1,]}
    const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
    try {
        const response = await axios.post(URL, initialAlbum, config)
        return response.data
    } catch (response) {
        // console.log("After");
        // console.log(initialAlbum)
        console.log(response)
        return response
    }
    // return response.data
})

export const updateAlbum = createAsyncThunk('albums/updateAlbum', async (initialAlbum) => {
    const { id } = initialAlbum;
    const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

    try {
        const response = await axios.patch(`${URL}/${id}`, initialAlbum, config)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const deleteAlbum = createAsyncThunk('albums/deleteAlbum', async (initialAlbum) => {
    const { id } = initialAlbum;
    try {
        const response = await axios.delete(`${URL}/${id}`)
        if (response?.status === 200) return initialAlbum;
        if (response?.status === 204) return initialAlbum;
        return response?.status;
    } catch (err) {
        return err.message;
    }
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
                // console.log(action.payload);
                const loadedAlbums = action.payload
                loadedAlbums.key = loadedAlbums.id
                state.albums[0].push(loadedAlbums)
                state.count += 1
                notify("success", `Creating ${loadedAlbums.album_name} succeed!`);
            })
            .addCase(addNewAlbum.rejected, (state, action) => {
                // console.log(action)
                // console.log(state)
                notify("error", `Failed creating the album!`);
            })
            .addCase(deleteAlbum.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    notify("error", `Failed deleting the album!`);
                    return;
                }
                const { id } = action.payload;
                const albums = state.albums[0].filter(album => album.id !== id);
                state.albums[0] = albums;
                notify("success", `Succeed deleting the album!`);
            })
            .addCase(updateAlbum.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    notify("error", `Failed updating the album!`);
                    return;
                }
                const loadedAlbums = action.payload
                const { id } = loadedAlbums;
                loadedAlbums.key = id
                const albums = state.albums[0].filter(album => album.id !== id);
                state.albums[0] = [...albums, loadedAlbums];
                notify("success", `Succeed updating the album!`);
            })
    }
})

export const selectAllAlbums = (state) => state.albums.albums[0]
export const getAlbumsCount = (state) => state.albums.count
export const getAlbumsStatus = (state) => state.albums.status
export const getAlbumsError = (state) => state.albums.error
export const { albumAdded } = albumsSlice.actions
export default albumsSlice.reducer