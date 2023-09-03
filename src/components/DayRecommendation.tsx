import { WeatherForecastDay } from "./date-weather-outfit-v2";
import { outfitGeneration } from "./weatherToCategories";
import { useState,useEffect } from "react";
import axios from "axios";



interface Closet {
    items: Closetitems[];
  }
  
interface Closetitems {
   
    id: number;
    closetId: number;
    outfitId: number;
    type: string;
    name: string;
    imgUrl: string;
  }
interface DayRecommendationProps {
  forecast: WeatherForecastDay;
  
}

const DayRecommendation = (props: DayRecommendationProps) => {
  const itemCategories = outfitGeneration(
    props.forecast.temp,
    props.forecast.conditions
  );


//change from here

    
    // const [closet, setCloset] = useState<Closet | null>(null);
  
    // useEffect(() => {
    //   const getCategoryFromApi = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:3007/mycloset`, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       });
    //       setCloset(response.data);
    //     } catch (error) {
    //       console.log("Something went wrong with request:", error);
    //     }
    //   };
    //   getCategoryFromApi();
    // }, []);
  
    // if (closet === null) {
    //   return <p>Loading closet...</p>;
    // }

//   const UserClosetItems=closet.items.map((userClosetItem:Closetitems)=>userClosetItem.name);
//   const filterItems=itemCategories.filter((item)=>UserClosetItems.includes(item));



//   };

  
//till here

  const getDate = (timestamp: number) => {
    const theDate = new Date(timestamp);
    return theDate.toDateString();
  };

  return (
    <div>
      <h2>{getDate(props.forecast.datetime)}</h2>
      <p>Suitable Items:</p>
      <p>{itemCategories}</p>
      {/* <p>{filterItems.map}</p> */}
    </div>
  );

};

export default DayRecommendation;
