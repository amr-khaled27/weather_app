import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Error from "./error";
import { weatherData } from "./page";

const api_key = "a67490cc9a235310074109d4096eb9ce";

let coolDown = false;

const parentVariants = {
  hidden: {
    opacity: 0,
  },
  play: {
    opacity: 1,
    transition: { delay: 0.5, when: "beforeChildren", staggerChildren: 0.2 },
  },
};

type props = {
  setWeatherData: Dispatch<SetStateAction<weatherData | undefined>>;
};

function Card({ setWeatherData }: props) {
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const getWeather = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const city = (
        (e.target as HTMLFormElement).elements[0] as HTMLInputElement
      ).value;
      if (city === "") {
        setErrorMsg("Search query can't be empty!");
        showError();
        return;
      }

      const api = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );
      const data = await api.json();

      if (data.message == "city not found") {
        setErrorMsg("Cannot Find City!");
        showError();
        return;
      }

      setWeatherData({
        type: data.weather[0].main,
        temp: data.main.temp,
        city_name: city,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        show: true,
      });
    } catch (e) {
      console.log((e as DOMException).message);
      setErrorMsg("Connection Error!");
      showError();
    }
  };

  const dismissError = () => {
    setError(false);
  };

  const showError = () => {
    if (!coolDown) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      coolDown = true;
      setTimeout(() => {
        coolDown = false;
      }, 3000);
    }
  };

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate="play"
      className="text-white bg-accent2 rounded-full p-2.5 shadow-md"
    >
      <Error show={error} dismissError={dismissError} message={errorMsg} />
      <form action="" onSubmit={getWeather}>
        <div className="flex gap-2.5 *:py-2 font-main">
          <motion.input
            autoComplete="off"
            placeholder="Search City"
            className="placeholder:text-txt1 placeholder:text-lg text-txt2 focus:placeholder:text-txt2 text-lg placeholder:transition-[300ms] bg-accent2 flex-grow border px-4 border-border1 rounded-full focus:border-border2 duration-300 focus:outline-0"
            type="text"
            name="city"
            id="city"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            name="country"
            className="bg-accent3 text-txt2 hover:bg-accent3hover transition-[300ms] w-[46px] rounded-full outline-none"
          >
            <FontAwesomeIcon icon={faSearch} />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default Card;
