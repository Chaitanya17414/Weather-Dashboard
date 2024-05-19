import { configureStore } from "@reduxjs/toolkit";
import fetchWeatherByCity from "./weatherSlice";

const store = configureStore({
    reducer: {
        weather: fetchWeatherByCity
    }
})
export default store