import React from "react";
import {
  Card,
  CardBody,
  Text,
  Stack,
  Divider,
  Button,
  ButtonGroup,
  CardFooter,
  Heading,
} from "@chakra-ui/react";
import WeatherIcon from "react-icons-weather";

interface Data {
  obj: any;
  index: number;
}

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function WeatherCard({ obj, index }: Data) {
  return (
    <Card maxW="sm" width={250}>
      <WeatherIcon name="owm" iconId={`${obj.weather[0].id}`} />
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{weekday[new Date(obj.dt_txt).getDay()]}</Heading>
          <Text color="blue.600" fontSize="2xl">
            {obj.main.temp} °F
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default WeatherCard;
