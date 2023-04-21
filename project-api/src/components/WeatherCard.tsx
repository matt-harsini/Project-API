import { Card, CardBody, Text, Stack, Heading } from "@chakra-ui/react";
// @ts-ignore
import WeatherIcon from "react-icons-weather";
import { motion } from "framer-motion";

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
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -100,
        },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.05,
          },
        }),
      }}
      initial="hidden"
      whileInView="visible"
      custom={index}
    >
      <Card maxW="sm" width={250} id="card">
        <WeatherIcon name="owm" iconId={`${obj.weather[0].id}`} />
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">
              {weekday[new Date(obj.dt_txt).getDay()]}
            </Heading>
            <Text color="blue.600" fontSize="2xl">
              {obj.main.temp} °F
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </motion.div>
  );
}

export default WeatherCard;
