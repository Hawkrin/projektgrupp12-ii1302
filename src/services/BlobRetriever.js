import * as api_client from './api_client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit';

/**
 * Retrieves data from Azure blob storage
 * 
 * @returns an array of blobs
 */

export const getBlobsAsync = createAsyncThunk("getblobs",
    async function blobData() {

        let blobs = api_client.containerClient.listBlobsFlat();

        const arrayForBlobs = [];

        let index = 1;
        let t = {};
        for await (const blob of blobs) {

            t = {
                name : blob.name,
                images: api_client.get_image_url(blob.name),
                blobType: blob.properties.blobType,
                etag: blob.properties.etag,
                accessTier: blob.properties.accessTier,
                accessTierInferred: blob.properties.accessTierInferred,
                contentType: blob.properties.contentType,
                leaseStatus: blob.properties.leaseStatus,
                leaseState: blob.properties.leaseState,
                serverEncrypted: blob.properties.serverEncrypted,
                // datesAndTime: 
                // blob.properties.createdOn.getDate() + "/" + 
                // (blob.properties.createdOn.getMonth()+1) + "-" + 
                // blob.properties.createdOn.getFullYear() + " " + 
                // blob.properties.createdOn.getHours() + ":" + 
                // blob.properties.createdOn.getMinutes() + ":" + 
                // blob.properties.createdOn.getSeconds(),
                blob,
                index
            } 

            arrayForBlobs.push(t)
            index++;
        }
        return arrayForBlobs;
    })

    export const blobSlice = createSlice({
        name: "blobs",
        initialState: [],
        reducers: {
            [getBlobsAsync.fulfilled]: (state, action) => {
                return action.payload.blobs
            }
        }
    })

    /**https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using/68509710#68509710 */
    configureStore({
        reducer: blobSlice.reducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              // Ignore these action types
              ignoredActions: ['your/action/type'],
              // Ignore these field paths in all actions
              ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
              // Ignore these paths in the state
              ignoredPaths: ['items.dates'],
            },
          }),
      })


export default blobSlice.reducer