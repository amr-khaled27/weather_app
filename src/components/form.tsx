import { useState } from "react";
import { FormEvent } from "react";
import { motion } from "framer-motion";
import Error from "./error";

const api_key = "a67490cc9a235310074109d4096eb9ce";

let coolDown = false;

const Form = () => {
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const getWeather = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const city = (
        (e.target as HTMLFormElement).elements[0] as HTMLInputElement
      ).value;
      const country = (
        (e.target as HTMLFormElement).elements[1] as HTMLInputElement
      ).value;
      if (city === "" || country === "") {
        setErrorMsg("Please Fill All Input Fields!");
        showError();
        return;
      }
      const api = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${api_key}`
      );
      const data = await api.json();

      console.log(`${city} ${country}`);
      console.log(data);

      if (data.message == "city not found") {
        setErrorMsg("Cannot Find City!");
        showError();
      }
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
    <>
      <Error show={error} dismissError={dismissError} message={errorMsg} />
      <form action="" onSubmit={getWeather}>
        <div className="grid grid-cols-2 gap-4 *:py-2">
          <motion.input
            autoComplete="off"
            placeholder="City"
            className="placeholder:text-stone-500 focus:placeholder:text-stone-400 col-span-2 bg-transparent w-full h-full border-b border-stone-500 focus:border-stone-400 duration-300 focus:outline-0"
            type="text"
            name="city"
            id="city"
          />
          <motion.input
            autoComplete="off"
            placeholder="Country"
            className="placeholder:text-stone-500 focus:placeholder:text-stone-400 col-span-2 bg-transparent w-full h-full border-b border-stone-500 focus:border-stone-400 duration-300 focus:outline-0"
            type="text"
            id="country"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            name="country"
            className="bg-stone-500 rounded-xl col-span-2 outline-none"
          >
            Get Weather
          </motion.button>
        </div>
      </form>
    </>
  );
};

export default Form;
