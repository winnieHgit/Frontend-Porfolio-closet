import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import React from "react";





interface Closet {
  id: number;
  useId: number;
  items: Closetitems[];
}

export interface Closetitems {
 
  id: number;
  closetId: number;
  outfitId: number;
  type: string;
  name: string;
  imgUrl: string;
}



const MyCloset = () => {
  const [closet, setCloset] = useState<Closet | null>(null);

  useEffect(() => {
    const getCategoryFromApi = async () => {
      try {
        const response = await axios.get(`http://localhost:3007/mycloset`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCloset(response.data);
      } catch (error) {
        console.log("Something went wrong with request:", error);
      }
    };
    getCategoryFromApi();
  }, []);

  if (closet === null) {
    return <p>Loading closet...</p>;
  }

  return (
    <div>
      <h2 className="py-10">My Closet Page</h2>
    
      
      {closet.items.map((props: Closetitems) => {
        return (
          <div key={props.id}>
            <Link href={`/mycloset/${props.id}`}>
              <span>{props.type}</span>
              <span>{props.name}</span>

              <Image
                src={props.imgUrl}
                alt={`Image of ${props.name}`}
                width={100}
                height={100}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default MyCloset;
