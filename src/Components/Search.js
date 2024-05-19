import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityWeather, fetchLocation } from '../Redux/Actions';

function Search() {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { locationData} = useSelector((store) => store.weather)
    useEffect(() => {
        if (locationData) {
            setSuggestions(locationData);
        }
    }, [locationData]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 2) {
            dispatch(fetchLocation(value))
        } else {
            setSuggestions([]);
        }
    };
    const handleSelect = (location) => {
        setQuery(location.name);
        dispatch(fetchCityWeather(query))
        setSuggestions([]);
    };

    return (
        <div className="relative my-5">
        <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter a location..."
            className="w-[40%] border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border left-[30%] text-left border-gray-300 rounded-md mt-1 w-[40%]">
                {suggestions.map((location, index) => (
                    <li key={index} onClick={() => handleSelect(location)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        {location.name}, {location.country}
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
}

export default Search;
