import { useState, useEffect } from "react";
import EventSunny from "../Images/EventPlanner.jpg"
import EventRain from "../Images/CancelledEvent.jpg"
import EventCloud from "../Images/EventCloud.jpg"
import EventSnow from "../Images/EventRain.jpg"
import FarmerSunny from "../Images/Harvest.jpg"
import FarmerCloud from "../Images/FarmerCloud.jpg"
import FarmerRain from "../Images/HeavyRain.jpg"
import FarmerSnow from "../Images/FarmerSnow.jpg"
import TravelerSunny from "../Images/Travellermsg.jpg"
import TravelerCloud from "../Images/TravelerCloud.jpg"
import TravelerRain from "../Images/TourCancelled.jpg"
import TravelerSnow from "../Images/TravellerSnow.jpg"

function UserPanel({ user, weatherDescription }) {
    const [message, setMessage] = useState("");
    const [imgUrl, setImageUrl] = useState("");

    useEffect(() => {
        if(weatherDescription) {
            renderAction(user, weatherDescription);
        }
    },[user,weatherDescription]);

    const renderAction = (user, weatherDescription) => {
        if (user === "eventPlanner") {
            setEventPlannerAction(weatherDescription);
        } else if (user === "farmer") {
            setFarmerAction(weatherDescription);
        } else if (user === "traveler") {
            setTravelerAction(weatherDescription);
        } else {
            setMessage("");
            setImageUrl("")
        }
    };

    const setEventPlannerAction = (weatherDescription) => {
        if (weatherDescription.includes("rain") || weatherDescription.includes("thunderstorm")) {
            setMessage("Be prepared for wet weather! ☔ Ensure you have contingency plans in place for outdoor events and consider indoor alternatives if necessary.")
            setImageUrl(EventRain)
        } else if (weatherDescription.includes("snow")) {
            setMessage("Plan for the cold and snow! 🥶 Check transportation routes and ensure venues are accessible. Consider additional heating and cozy setups for outdoor events.")
            setImageUrl(EventSnow);
        } else if (weatherDescription.includes("cloud")) {
            setMessage("Cloudy Weather Alert,Pack some extra layers and plan for indoor activities, just in case!")
            setImageUrl(EventCloud);
        }else {
            setMessage("Perfect weather for your event! 😊 Enjoy smooth operations and happy attendees.")
            setImageUrl(EventSunny)
        }
       
    };

    const setFarmerAction = (weatherDescription) => {
        if (weatherDescription.includes("rain") || weatherDescription.includes("thunderstorm")) {
            setMessage("Don't forget your rain gear! Make sure your crops are adequately protected. Better to postpone any outdoor work if possible.")
            setImageUrl(FarmerRain);
        } else if (weatherDescription.includes("snow")) {
            setMessage("Prepare for the cold! 🥶 Ensure livestock are sheltered and feed is stocked up. Take precautions when working in icy conditions.")
            setImageUrl(FarmerSnow);
        } else if (weatherDescription.includes("cloud")) {
            setMessage("Looks like it might be cloudy. Consider checking your crops for any signs of excess moisture or fungal growth.")
            setImageUrl(FarmerCloud);
        }else {
            setMessage("Great weather for farming! 😊 Keep up the good work and make the most of the day.")
            setImageUrl(FarmerSunny);
        }
       
    };

    const setTravelerAction = (weatherDescription) => {
        if (weatherDescription.includes("rain") || weatherDescription.includes("thunderstorm")) {
            setMessage("Pack your umbrella and raincoat! ☔ Stay indoors or find indoor activities to enjoy. It's a good time to explore museums or cozy cafes.")
            setImageUrl(TravelerRain);
        } else if (weatherDescription.includes("snow")) {
            setMessage("Bundle up for the cold! 🥶 Check road conditions and travel routes before setting out. Consider visiting winter wonderlands or enjoying hot drinks in charming cafes.")
            setImageUrl(TravelerSnow);
        } else if (weatherDescription.includes("cloud")) { 
            setMessage("Looks like it might be cloudy. If you're traveling, enjoy the scenic views of the clouds!")
           setImageUrl(TravelerCloud);
        } else {
            setMessage("Perfect weather for sightseeing! 😊 Enjoy your journey and make the most of the beautiful day.")
            setImageUrl(TravelerSunny);
        }
        
    };

    return (
        <>
         {weatherDescription && user && <div className="user-panel bg-white rounded-xl w-[40%] mx-auto my-[20px] p-4 text-center">
           <div>
                <img className="my-0 mx-auto" src={imgUrl} alt={`${user}Img`} width="200" height="200" />
                <p className="p-2">{message}</p>
            </div>
        </div>}
        </>
    );
}

export default UserPanel;
