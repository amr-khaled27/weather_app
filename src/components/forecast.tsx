import { AnimatePresence } from "framer-motion";
import { weatherData } from "./page";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import clear from "../assets/clear.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";

type props = {
  weather_data: weatherData | undefined;
  setWeatherData: Dispatch<SetStateAction<weatherData | undefined>>;
};

function Forecast({ weather_data, setWeatherData }: props) {
  console.log(
    "http://localhost:5173/assets/" + weather_data?.type.toLowerCase() + ".png"
  );

  return (
    <AnimatePresence>
      {weather_data?.show && (
        <motion.div
          className="forecast text-txt2 font-main w-full p-2.5 bg-gradient-to-br from-accent2 to-accent3 rounded-3xl shadow-md flex justify-center items-center flex-col overflow-hidden relative"
          initial={{ opacity: 0, maxHeight: 0, padding: 0, marginTop: 0 }}
          animate={{
            opacity: 1,
            maxHeight: "1000px",
            padding: 10,
            marginTop: 10,
          }}
          exit={{ opacity: 0, maxHeight: 0, padding: 0, marginTop: 0 }}
        >
          <button
            onClick={() => {
              setWeatherData({
                ...weather_data,
                show: false,
              });
            }}
            className="absolute outline-none top-2.5 w-[46px] h-[46px] rounded-full bg-accent3 transition-[300ms] hover:bg-error flex justify-center items-center right-2.5 text-txt2 text-xl"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div>
            <img src={clear} className="w-44" alt={weather_data.type} />
          </div>

          <div className="flex flex-col *:text-center ">
            <p className="text-6xl">{weather_data?.temp}°C</p>
            <p className="text-6xl">{weather_data?.city_name}</p>
          </div>

          <div className="flex justify-evenly my-12 w-full">
            <div className="flex gap-2.5">
              <div>
                <img src={humidity} className="w-8 mt-2" alt="Humidity" />
              </div>

              <div>
                <p className="text-2xl">{weather_data?.humidity}%</p>
                <p className="font-extralight text-sm">Humidity</p>
              </div>
            </div>

            <div className="">
              <div className="flex gap-2.5">
                <div>
                  <img src={wind} className="w-8 mt-2" alt="Wind" />
                </div>

                <div>
                  <p className="text-2xl">{weather_data?.wind_speed} KM/H</p>
                  <p className="font-extralight text-sm">Windspeed</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Forecast;
