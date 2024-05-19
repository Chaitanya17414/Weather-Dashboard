import WeatherPanel from "./WeatherPanel"
import Search from "./Search";

function Home() {
    return (
        <>
            <div className="text-center">
                <Search />
                <div className="">
                    <WeatherPanel />
                </div>
                
            </div>
        </>
      );
}

export default Home;