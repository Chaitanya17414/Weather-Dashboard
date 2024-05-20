import {createSlice} from "@reduxjs/toolkit";
import { fetchCityWeather, fetchLocation } from "./Actions";

const fetchWeatherByCity = createSlice ({
    name:"fetchCityWeather",
    initialState: {
    weatherData: [],
      status: 'idle',
      error: null,
      locationData:[],
      locationStatus:"idle",
      locationError:null
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCityWeather.pending, (state) => {
          state.status = 'loading';
          state.error ="";
        })
        .addCase(fetchCityWeather.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.weatherData = action.payload;
          state.error = "";
        })
        .addCase(fetchCityWeather.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(fetchLocation.pending, (state) => {
            state.locationStatus = 'loading';
          })
          .addCase(fetchLocation.fulfilled, (state, action) => {
            state.locationStatus = 'succeeded';
            state.locationData = action.payload;
          })
          .addCase(fetchLocation.rejected, (state, action) => {
            state.locationStatus = 'failed';
            state.locationError = action.error.message;
          });
    },

})

export default fetchWeatherByCity.reducer
