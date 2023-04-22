import { useEffect, useState } from "react";
import styles from "./App.module.css";
import {
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import WeatherCard from "./components/WeatherCard";
import { useColorMode } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const OWM_KEY = "f2193977d3b707f549ed77442ec2b33e";

function App() {
  const [data, setData] = useState<any>(undefined);
  const [query, setQuery] = useState("Los Angeles");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (query === "") return;
    async function fetchWeatherData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=imperial&appid=f2193977d3b707f549ed77442ec2b33e`
        );
        if (!response.ok) throw new Error("Response status is not ok");
        const payload = await response.json();
        setData(payload);
      } catch (error: unknown) {
        setError(true);
        if (error instanceof Error) throw new Error(error.message);
        throw new Error("An unexpected error occurred, please try again");
      }
    }
    fetchWeatherData();
  }, [query]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setQuery(input);
    setInput("");
  };
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles["form-container"]}>
          <Button onClick={() => toggleColorMode()} size="lg">
            {colorMode === "dark" ? (
              <SunIcon color="gray.50" boxSize={6} />
            ) : (
              <MoonIcon color="gray.900" boxSize={6} />
            )}
          </Button>
          <Stack>
            <Text color="blue.600" fontSize="2xl">
              {data === undefined
                ? "Loading..."
                : data?.city.country + " " + data?.city.name}
            </Text>
          </Stack>
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                placeholder="Enter location"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <InputRightElement
                aria-label="Search weather at specified location"
                children={<SearchIcon />}
              />
            </InputGroup>
          </form>
        </div>
        <Center marginTop={32}>
          <Text fontSize="2xl">
            Something unexpected happened, please try again
          </Text>
        </Center>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        <Button onClick={() => toggleColorMode()} size="lg">
          {colorMode === "dark" ? (
            <SunIcon color="gray.50" boxSize={6} />
          ) : (
            <MoonIcon color="gray.900" boxSize={6} />
          )}
        </Button>
        <Stack>
          <Text color="blue.600" fontSize="2xl">
            {data === undefined
              ? "Loading..."
              : data?.city.country + " " + data?.city.name}
          </Text>
        </Stack>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              placeholder="Enter location"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <InputRightElement
              aria-label="Search weather at specified location"
              children={<SearchIcon />}
            />
          </InputGroup>
        </form>
      </div>
      <div className={styles["card-container"]}>
        {data !== undefined &&
          data.list.map((obj: any, index: number) => {
            const [date, time] = obj.dt_txt.split(" ");
            if (index === 0)
              return <WeatherCard obj={obj} index={index} key={obj.dt_txt} />;
            if (time === "00:00:00")
              return <WeatherCard obj={obj} index={index} key={obj.dt_txt} />;
          })}
      </div>
    </div>
  );
}

export default App;
