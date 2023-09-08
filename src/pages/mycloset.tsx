import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { InputFile } from "@/components/Fileinput";
import React from "react";
import NavBar from "@/components/NavBar";
import { MousePointerClick } from "lucide-react";

interface Closet {
  id: number;
  useId: number;
  items: Closetitems[];
}

export interface Closetitems {
  id: number;
  closetId: number;
  outfitId: number;
  type: CategoryTypes;
  name: string;
  imgUrl: string;
}

type CategoryTypes = "Tops" | "Bottoms" | "Jumpsuits" | "Dresses";

const MyCloset = () => {
  const [closet, setCloset] = useState<Closet | null>(null);

  useEffect(() => {
    const getCategoryFromApi = async () => {
      try {
        const response = await axios.get(
          `${process.env["NEXT_PUBLIC_API_URL"]}/mycloset`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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

  let [tops, bottoms, jumpsuits, dresses]: Closetitems[][] =
    closet.items.reduce(
      (result: Closetitems[][], element: Closetitems) => {
        if (element.type === "Tops") result[0].push(element);
        else if (element.type === "Bottoms") result[1].push(element);
        else if (element.type === "Jumpsuits") result[2].push(element);
        else if (element.type === "Dresses") result[3].push(element);
        return result;
      },
      [[], [], [], []]
    );

  return (
    <div className="overflow-x-auto">
      <NavBar />
      <div>
        <Link
          className=" flex justify-center  pt-16 text-amber-500 font-semibold underline-offset-8 scroll-m-20 text-3xl  tracking-tight lg:text-4xl"
          href="/"
        >
          Daily Outfit Recommedation
          <MousePointerClick />
        </Link>
      </div>
      <InputFile />
      <div>
        <h3 className="mt-8 scroll-m-20 text-center mb-4 text-2xl font-semibold tracking-tight mx-2 text-yellow-500">
          Tops
        </h3>
        <ul className="flex flex-row  bg-white  p-1 overflow-y-auto space-x-4">
          {tops.map((item: Closetitems) => {
            return (
              <div
                key={item.id}
                className="flex flex-row rounded-md border border-yellow-300 shadow mb-4 mx-2"
              >
                <Link href={`/mycloset/items/${item.id}`}>
                  <div>
                    <div className="w-[100px] text-xs px-2 py-2 text-center bg-yellow-300 text-yellow-900 font-bold">
                      {item.name}
                    </div>
                    <Image
                      src={item.imgUrl}
                      className="rounded-b-md"
                      alt={`Image of ${item.name}`}
                      width={100}
                      height={100}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="mt-8 scroll-m-20 text-center mb-4 text-2xl font-semibold tracking-tight mx-2 text-yellow-500">
          Bottoms
        </h3>
        <ul className="flex flex-row  bg-white  p-1 overflow-y-auto space-x-4">
          {bottoms.map((item: Closetitems) => {
            return (
              <div
                key={item.id}
                className=" flex flex-row rounded-md border border-yellow-300 shadow mb-4 mx-2 "
              >
                <Link href={`/mycloset/items/${item.id}`}>
                  <div>
                    <p className="w-[100px] text-xs px-2 py-2 text-center bg-yellow-300 text-yellow-900 font-bold">
                      {item.name}
                    </p>
                    <Image
                      src={item.imgUrl}
                      className="rounded-b-md"
                      alt={`Image of ${item.name}`}
                      width={100}
                      height={100}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="mt-8 scroll-m-20 text-center mb-4 text-2xl font-semibold tracking-tight mx-2 text-yellow-500">
          Jumpsuits
        </h3>
        <ul className="flex flex-row  bg-white  p-1 overflow-y-auto space-x-4">
          {jumpsuits.map((item: Closetitems) => {
            return (
              <div
                key={item.id}
                className=" flex flex-row rounded-md border border-yellow-300 shadow mb-4 mx-2 "
              >
                <Link href={`/mycloset/items/${item.id}`}>
                  <div>
                    <p className="w-[100px] text-xs px-2 py-2 text-center bg-yellow-300 text-yellow-900 font-bold">
                      {item.name}
                    </p>
                    <Image
                      src={item.imgUrl}
                      className="rounded-b-md"
                      alt={`Image of ${item.name}`}
                      width={100}
                      height={100}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="mt-8 scroll-m-20 text-center mb-4 text-2xl font-semibold tracking-tight mx-2 text-yellow-500">
          Dresses
        </h3>
        <ul className="flex flex-row  bg-white  p-1 overflow-y-auto space-x-4">
          {dresses.map((item: Closetitems) => {
            return (
              <div
                key={item.id}
                className=" flex flex-row rounded-md border border-yellow-300 shadow mb-4 mx-2 "
              >
                <Link href={`/mycloset/items/${item.id}`}>
                  <div>
                    <p className="w-[100px] text-xs px-2 py-2 text-center bg-yellow-300 text-yellow-900 font-bold">
                      {item.name}
                    </p>
                    <Image
                      src={item.imgUrl}
                      className="rounded-b-md"
                      alt={`Image of ${item.name}`}
                      width={100}
                      height={100}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default MyCloset;
