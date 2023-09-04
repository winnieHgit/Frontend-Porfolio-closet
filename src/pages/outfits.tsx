import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import NavBar from "@/components/NavBar";

interface Closetitems {
  id: number;
  closetId: number;
  outfitId: number;
  type: string;
  name: string;
  imgUrl: string;
}

interface Outfit {
  id: number;
  userId: number;
  clothingItem: Closetitems[];
}

const OutfitPage = () => {
  const [outfits, setOutfits] = useState<Outfit[] | null>(null);

  useEffect(() => {
    const outfitFromApi = async () => {
      const response = await axios.get(
        `http://localhost:3007/outfit/recommendation"`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOutfits(response.data);
    };

    outfitFromApi();
  }, []);

  if (outfits === null) {
    return <p>Loading outfit...</p>;
  }
  return (
    <div>
      <NavBar />
      <h2 className="py-10">Your current outfits </h2>
      {outfits.map((outfit: Outfit) => {
        return (
          <div key={outfit.id} className="border flex flex-row basis-1/5">
            {/* <Link href={`/outfits/${outfit.id}`}> */}
              {outfit.clothingItem.map((item: Closetitems) => {
                return (
                  <div key={item.id} className=" flex flex-row basis-1/5">
                    <Image
                      src={item.imgUrl}
                      alt={`image of ${item.name}`}
                      width={300}
                      height={300}
                    />
                  </div>
                );
              })}
            {/* </Link> */}
          </div>
        );
      })}
    </div>
  );
};

export default OutfitPage;
