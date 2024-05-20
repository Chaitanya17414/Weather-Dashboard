import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {geoUrl, rootUrl} from "../Api/openweatherapi"
const ApiKey = "7810085724be96e3698ee1d56a515920"

export const fetchCityWeather = createAsyncThunk(
    'weather/fetchCityWeather',
    async (city,{rejectWithValue}) => {
        try {
          const response = await axios.get(`${rootUrl}/forecast?q=${city}&appid=${ApiKey}`);
          return response.data;
         
        }  catch (err) {
            throw rejectWithValue(err.response.data)
        }
      }
  );
  export const fetchLocation = createAsyncThunk(
    'weather/fetchLocation',
    async (value,{rejectWithValue}) => {
        try {
          const response = await axios.get(`${geoUrl}/direct?q=${value}&limit=15&appid=${ApiKey}`);
          return response.data;
         
        }  catch (err) {
            throw rejectWithValue(err.response.data)
        }
      }
  );