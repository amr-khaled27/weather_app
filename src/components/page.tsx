import { useState } from "react";
import Card from "./card";
import Forecast from "./forecast";

export type weatherData = {
  type: string;
  temp: number;
  city_name: string;
  humidity: number;
  wind_speed: number;
  show: boolean;
};

function Page() {
  const [weather_data, setWeatherData] = useState<weatherData>();
  return (
    <div className="bg-accent1 w-full min-h-screen flex justify-center items-center">
      <div className="min-w-96 flex flex-col">
        <Card setWeatherData={setWeatherData} />
        <Forecast weather_data={weather_data} setWeatherData={setWeatherData} />
      </div>
    </div>
  );
}

export default Page;
