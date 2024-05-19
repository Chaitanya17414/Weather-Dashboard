import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserPanel from "./UserPanel"
function WeatherPanel() {
    const { weatherData, status, error } = useSelector((store) => store.weather);
    const [currentForecast, setCurrentForecast] = useState(null);
    const [extendedForecast, setExtendedForecast] = useState([]);
    const [user,setUser] = useState("")
    const WeekDays = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ];

    useEffect(() => {
        if (weatherData && weatherData.list) {
            const currentDate = new Date();
            const todayMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

            
            const currentForecastData = weatherData.list.find(forecast => {
                const forecastDate = new Date(forecast.dt * 1000);
                return forecastDate >= todayMidnight;
            });

            setCurrentForecast(currentForecastData);
       
            const next5DaysForecast = [];
            const processedDays = new Set(); 
    
            weatherData.list.forEach(forecast => {
                const forecastDate = new Date(forecast.dt * 1000);
                const forecastDay = forecastDate.getDate();
    
                if (!processedDays.has(forecastDay)) {
                    next5DaysForecast.push(forecast);
                    processedDays.add(forecastDay); 
                }
            });
    
            setExtendedForecast(next5DaysForecast);
        }
    }, [weatherData]);

    const kelvinToCelsius = (kelvin) => {
        return kelvin - 273.15;
    };

    const mphToKmph = (mph) => {
        return mph * 1.60934;
    }; 
    const toDateFunction = (Cdate) => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const currentDate = new Date(Cdate*1000);
        const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
            }`;
        return date;
    };

    const updateCurrentWeather = (forecast) => {
        setCurrentForecast(forecast)
        
    }

    return (
        <>
            <div>
                <button onClick={() => setUser("eventPlanner")} className="bg-white mr-3 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Event Planner
                </button>
                <button onClick={() => setUser("farmer")} className="bg-white mr-3 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Farmer
                </button>
                <button onClick={() => setUser("traveler")} className="bg-white mr-3 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Traveler
                </button>
            </div>
            <div className="bg-gradient-to-tl from-stone-100 to-[#e7caa1] rounded-xl p-4 mx-auto my-5 w-[40%]">
                <p className="text-left text-gray-700 text-lg font-medium">Current Weather</p>
                <div>
                    {status === "loading" ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-md p-4 text-center text-red-600 font-medium">No results Found</p>
                    ) : currentForecast ? (
                        <div className="flex p-4 justify-evenly">
                             <div className="flex">
                   
                   <div className="">
                        <p className="text-left text-[25px] font-bold text-[#b22222]">{ weatherData?.city?.name}, { weatherData?.city?.country}</p>

                        <div className="text-left text-[20px] font-bold text-black">
                            <span>{toDateFunction(currentForecast.dt)}</span>
                        </div>
                       {  currentForecast && currentForecast.weather &&  currentForecast.weather[0] &&  currentForecast.weather[0].icon && (
                           <div>
                               <img
                               className="weatherIcon" alt="myit"
                               src={`http://openweathermap.org/img/wn/${ currentForecast?.weather[0]?.icon}@2x.png`}
                               />
                               <p className="text-[#e24141e0] text-xl font-medium whitespace-nowrap">{ currentForecast?.weather[0]?.description}</p>
                           </div>)}
                       
                   </div>
                   <div className="flex items-center text-[35px]">
       
                           <p className="text-[#d69214ec] pr-4">{kelvinToCelsius( currentForecast.main?.temp).toFixed(2)}<sup>°C</sup></p>
                   </div>
               </div>
               <div className="text-left">
               <div>
                    <p className="text-[#e24141e0]">Feels like: {kelvinToCelsius( currentForecast?.main?.feels_like).toFixed(2)}<sup>°C</sup></p>
                   <p className="text-[#e24141e0] py-2 flex gap-2">
                       <span className="flex"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                       </svg>
                       {kelvinToCelsius(currentForecast.main?.temp_max).toFixed(2)}°C</span>
                       <span className="flex"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                       </svg>
                       {kelvinToCelsius( currentForecast?.main?.temp_min).toFixed(2)}°C</span>
                   </p>
                   <p className="text-gray-700">Humidity: { currentForecast?.main?.humidity}%</p>
                   <p className="text-gray-700">Wind: {mphToKmph(currentForecast.wind?.speed).toFixed(2)} km/h</p>
               </div>
               </div> 
                        </div>
                    ) : <p className="text-md p-4 text-center text-red-600 font-medium">Please Select location to view the Results</p>}
                </div>
            </div>
            <UserPanel user={user} weatherDescription={currentForecast?.weather[0]?.description}/>
           {extendedForecast.length >0 && (
           <div className="bg-gradient-to-tl from-[#ce7771] to-[#9edef3] rounded-xl p-4 mx-auto my-5 w-[40%]">
                <p className="text-left text-gray-700 text-lg font-medium">Extended Forecast</p>
                <div>
                    {status === "loading" ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-md p-4 text-center text-red-600 font-medium">No results Found</p>
                    ) : extendedForecast ? (
                        <div className="flex p-2 justify-evenly">
                            <div className="">
                                <ul className="flex gap-2 ">
                                    {extendedForecast.map((forecast, index) => (
                                        <li key={index} className="hover:bg-[#999797] transition ease-in-out delay-250 hover:-translate-y-0 duration-300 hover:rounded-md" onClick={() => updateCurrentWeather(forecast)}>
                                            <p className="text-[#b22222] font-normal text-xl">{WeekDays[new Date(forecast.dt * 1000).getDay()]}</p>
                                            <img
                                                className="weatherIcon" alt="myit"
                                                src={`http://openweathermap.org/img/wn/${forecast.weather[0]?.icon}@2x.png`}
                                                />
                                            <p className="text-[#e24141e0]">{forecast.weather[0].main}</p>
                                            <p className="text-black font-medium">{kelvinToCelsius(forecast.main.temp).toFixed(0)}<sup>°C</sup>/{kelvinToCelsius( weatherData.list[0]?.main?.feels_like).toFixed(0)}<sup>°C</sup></p>
                                            
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : <p className="text-md p-4 text-center text-red-600 font-medium">Please Select location to view the Results</p>}
                </div>
            </div>)} 
        </>
    );
}

export default WeatherPanel;
