import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { mapIconsToOpenWeather } from "@/components/date-weather-outfit-v2";
import { Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "../../public/animation_lmi6wy9u.json";
import animationlocationPin from "../../public/animation_lmjhs52m.json";
import animationNotfound from "../../public/animation_lmjogx5t.json";
import animationLoading from "../../public/animation_lmkmonzu.json";
import Link from "next/link";

interface DailyRecommendation {
  day: number;
  date: number;
  temp: number;
  weatherCondition: string;
  outfitId?: number;
  closetItems: DailyClosetItemsSelected[];
}

interface DailyClosetItemsSelected {
  id: number;
  imgUrl: string;
  name: string;
  type: string;
}

interface GeolocationPosition {
  coords: { longitude: number; latitude: number };
}

const getDate = (timestamp: number) => {
  const theDate = new Date(timestamp);
  return theDate.toDateString();
};

const OutfitPage = () => {
  const [outfits, setOutfits] = useState<DailyRecommendation[] | null>(null);
  const [coordinates, setCoordinates] = useState<GeolocationPosition>({
    coords: { latitude: 52.36, longitude: 4.9 },
  }); //Amsterdam
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCoordinates);
    }
  };

  useEffect(() => {
    const outfitFromApi = async () => {
      try {
        const response = await axios.get(
          `${process.env["NEXT_PUBLIC_API_URL"]}/outfit/recommendation?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOutfits(response.data.outfits);
      } catch (error) {
        console.log("Failed to retrieve outfits", error);
      }
    };

    outfitFromApi();
  }, [coordinates]);

  if (outfits === null) {
    return (
      <Lottie
        className="h-40, w-40 flex justify-center items-center"
        animationData={animationLoading}
      />
    );
  }
  if (outfits.length === 0) {
    //display animation
    return (
      <div className="text-yellow-900 font-bold flex flex-col justify-center items-center my-10">
        <p>Not enough clothes in your closet to generate outfit</p>
        <Link href="/mycloset">
          <Lottie
            className="h-40, w-40 flex justify-center items-center"
            animationData={animationNotfound}
          />
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div>
        <p className="text-base pt-4 pl-4 text-yellow-900 font-semibold">
          Set Current Location
        </p>

        <button className="pl-16" onClick={getLocation}>
          <Lottie className="h-10, w-10" animationData={animationlocationPin} />
        </button>
      </div>
      <div className="flex justify-center justify-items-center md:pt-6">
        <Lottie className="h-40, w-40" animationData={animationData} />
      </div>
      <h2 className="flex flex-row justify-center pb-10 font-semibold underline-offset-8 scroll-m-20 text-2xl text-yellow-900 md:text-3xl">
        <Sparkles /> Your recommended outfits <Sparkles />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16  mx-2">
        {outfits &&
          outfits.map((outfit: DailyRecommendation, i: number) => {
            return (
              <div
                key={i}
                className="grid grid-row justify-center justify-items-center  basis-1/2 items-start content-start border-double hover:border-dotted border-8  border-yellow-500 py-8"
              >
                <div
                  key={outfit.date}
                  className="text-yellow-900  text-base flex justify-items-center py-6 md:my-text-2xl font-bold"
                >
                  {/* <Link href={`/outfits/${outfit.id}`}> // OutfitId may be empty, there may be no outfit generated */}
                  <div className="flex flex-col items-center justify-center  mx-auto">
                    <span>{getDate(outfit.date)}</span>
                    <Image
                      className="flex "
                      src={`https://openweathermap.org/img/wn/${
                        mapIconsToOpenWeather[outfit.weatherCondition]
                      }@2x.png`}
                      alt="weather icon"
                      width={100}
                      height={100}
                    />
                    <p className="">{outfit.temp}°C</p>
                  </div>
                  {/* <div>Description: {outfit.weatherCondition}</div> */}
                </div>
                <div>
                  {outfit.closetItems.map((item: DailyClosetItemsSelected) => {
                    return (
                      <div
                        key={item.id}
                        className=" flex flex-row justify-between   mx-auto "
                      >
                        {/* Id: {item.id} */}

                        <Image
                          src={item.imgUrl}
                          alt={`image of ${item.name}`}
                          width={350}
                          height={350}
                        />
                      </div>
                    );
                  })}
                  {/* </Link> */}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OutfitPage;
