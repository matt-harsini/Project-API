import { Key, useEffect, useState } from "react";
import styles from "./App.module.css";
import { Input, IconButton, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import WeatherCard from "./components/WeatherCard";

const OWM_KEY = "f2193977d3b707f549ed77442ec2b33e";

function getLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation?.getCurrentPosition(resolve, reject);
  });
}

function App() {
  const [data, setData] = useState<any>(undefined);
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const {
          coords: { latitude: lat, longitude: lon },
        } = await getLocation();
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${OWM_KEY}`
        );
        const payload = await response.json();
        setData(payload);
      } catch (error: unknown) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error("An unexpected error occurred, please try again");
      }
    }
    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (query === "") return;
    async function fetchWeatherData() {
      try {
        const response = await fetch(
          `api.openweathermap.org/data/2.5/forecast?q=${query}&units=imperial&appid=${OWM_KEY}`
        );
        const payload = await response.json();
        setData(payload);
      } catch (error: unknown) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error("An unexpected error occurred, please try again");
      }
    }
    fetchWeatherData();
  }, [query]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={() => setQuery(input)}>
        <Input
          placeholder="Enter location"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <IconButton
          aria-label="Search weather at specified location"
          icon={<SearchIcon />}
        />
      </form>
      <Flex gap={12} paddingX={32} maxW="100%">
        {data !== undefined &&
          data.list.map((obj: any, index: number) => {
            const [date, time] = obj.dt_txt.split(" ");
            if (index === 0)
              return <WeatherCard obj={obj} index={index} key={obj.dt_txt} />;
            if (time === "12:00:00")
              return <WeatherCard obj={obj} index={index} key={obj.dt_txt} />;
          })}
      </Flex>
    </div>
  );
}

export default App;
