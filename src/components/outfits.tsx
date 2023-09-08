import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { mapIconsToOpenWeather } from "@/components/date-weather-outfit-v2";
import { Sparkles } from "lucide-react";

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
  }, []);

  if (outfits === null) {
    return <p>Loading outfit...</p>;
  }
  return (
    <div>
      <h2 className="flex flex-row justify-center py-10">
        <Sparkles /> Your recommended outfits <Sparkles />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 ">
        {!!outfits &&
          outfits.map((outfit: DailyRecommendation) => {
            return (
              <div className="grid grid-row justify-center justify-items-center  basis-1/2 items-start content-start	">
                <div
                  key={outfit.date}
                  className=" text-xl flex justify-items-center md:my-4 text-2xl"
                >
                  {/* <Link href={`/outfits/${outfit.id}`}> // OutfitId may be empty, there may be no outfit generated */}
                  <div className="flex flex-col items-center justify-center">
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
                        className=" flex flex-row justify-between border-double hover:border-dotted border-4  border-yellow-500  mx-auto "
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
