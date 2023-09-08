import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export interface WeatherForecastV2 {
  location: WeatherForecastV2Location;
}

export interface WeatherForecastV2Location {
  name: string; //Name of location, e.g. Utrecht
  values: [WeatherForecastDay]; //today's and next days forecast
  currentCondition: {
    //currently (now) the temperature and icon's condition
    temp: number;
    icon: string;
  };
}

export interface WeatherForecastDay {
  datetimeStr: string; // string of date e.g. "2023-09-02T00:00:00+02:00"
  datetime: number; //milliseconds since epoch
  icon: string; //name of icon, e.g. partly-cloudy-day More info: https://www.visualcrossing.com/resources/documentation/weather-api/defining-icon-set-in-the-weather-api/
  temp: number; //mean or avg temp
  mint: number; //min temp
  maxt: number; //max temp
  conditions: "rain" | "snow" | string; //Description of weather
  pop: number; //Chance Precipitation/rain (%)
}
//Think of this as a table, where key on the left, and value on the right
export const mapIconsToOpenWeather: Record<string, string> = {
  snow: "13d",
  rain: "09d",
  fog: "50d",
  wind: "03d",
  cloudy: "04d",
  "partly-cloudy-day": "02d",
  "partly-cloudy-night": "02n",
  "clear-day": "01d",
  "clear-night": "01n",
};

interface CalendarV2Props {
  city: string;
  country: string;
}

const CalendarV2 = (props: CalendarV2Props) => {
  const [calendar, setCalendar] = useState<WeatherForecastV2 | null>(null);

  useEffect(() => {
    const fetchWeatherCalendar = async () => {
      try {
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locationMode=single&locations=${props.city},${props.country}&aggregateHours=24&unitGroup=metric&shortColumnNames=true&forecastDays=7&iconSet=icons1&contentType=json&key=${process.env["NEXT_PUBLIC_WEATHERICON_API_KEY"]}`
        );
        setCalendar(response.data);
      } catch (error) {
        console.log("Something went wrong!");
      }
    };

    fetchWeatherCalendar();
  }, [props]);

  const getDate = (timestamp: number) => {
    const theDate = new Date(timestamp);
    return theDate.toDateString();
  };

  if (!calendar) {
    return;
  } else {
    return (
      <div className="grid justify-center basis-1/2">
        {calendar.location.values.map((forecastDay: WeatherForecastDay) => (
          //   <DayRecommendation forecast={forecastDay} key={i} />

          <div
            key={forecastDay.datetime}
            className="flex flex-wrap border border-dashed border-r-indigo-500 border-l-indigo-500 border-b-indigo-500 py-8"
          >
            <p>{getDate(forecastDay.datetime)}</p>
            {/* <Link href={`/outfit/${outfit.id}`}> */}
            <Image
              src={`https://openweathermap.org/img/wn/${
                mapIconsToOpenWeather[forecastDay.icon]
              }@2x.png`}
              alt="weather icon"
              width={50}
              height={50}
            />
            <span>{forecastDay.temp}</span>
            <p>Description: {forecastDay.conditions}</p>
            {/* </Link> */}
          </div>
        ))}
      </div>
    );
  }
};

export default CalendarV2;

//after ...key={i} />

// <div key={forecastDay.datetime} className="flex flex-wrap border border-dashed border-r-indigo-500 border-l-indigo-500 border-b-indigo-500 py-8">

//   <p>{getDate(forecastDay.datetime)}</p>
//   {/* <Link href={`/outfit/${outfit.id}`}> */}
//   <Image
//     src={`https://openweathermap.org/img/wn/${
//       mapIconsToOpenWeather[forecastDay.icon]
//     }@2x.png`}
//     alt="weather icon"
//     width={50}
//     height={50}
//   />
//   <span>{forecastDay.temp}</span>
//   <p>Description: {forecastDay.conditions}</p>
//   {/* </Link> */}
// </div>
