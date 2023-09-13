import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { mapIconsToOpenWeather } from "@/components/date-weather-outfit-v2";
import { Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "../../public/animation_lmi6wy9u.json";

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

export interface OutfitPageProps {
  city: string;
  country: string;
}

const getDate = (timestamp: number) => {
  const theDate = new Date(timestamp);
  return theDate.toDateString();
};

const OutfitPage = (props: OutfitPageProps) => {
  const [outfits, setOutfits] = useState<DailyRecommendation[] | null>(null);

  useEffect(() => {
    console.log("Running effect!");
    const outfitFromApi = async () => {
      try {
        const response = await axios.get(
          `${process.env["NEXT_PUBLIC_API_URL"]}/outfit/recommendation?city=${props.city}&country=${props.country}`,
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
  }, [props]);

  if (outfits === null) {
    return <p>Loading outfit...</p>;
  }
  return (
    <div>
      <div className="flex justify-center justify-items-center pt-6">
      <Lottie  className="h-40, w-40" animationData={animationData} />
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
