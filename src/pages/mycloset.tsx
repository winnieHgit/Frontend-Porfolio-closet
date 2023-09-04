import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";
import { InputFile } from "@/components/Fileinput";
import React from "react";
import NavBar from "@/components/NavBar";
import apiKeys from "../../secrets/APIKEYs.json";

export const ImgUpload = () => {
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files !== null) {
      const response = await axios.post(
        `https://www.filestackapi.com/api/store/S3?key=${apiKeys.filestack}`,
        event.target.files[0],
        {
          headers: {
            "Content-Type": "image/png",
          },
        }
      );
      console.log("hello");
      console.log(response.data.url); // Here is your new Image URL!

      const ItemUrl = response.data.url;

      try{
      const urlData = await axios.post(
        `http://localhost:3007/mycloset/add-closet-item`,
        {imgUrl:ItemUrl,},
        {headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        }}
      );
      console.log(urlData);
      }catch(error){
        console.log("having error post imgUrl to the database",error)
      }
    }
  };
  return (
    <>
      <h1>Upload an image</h1>
      return (
      <div className="fixed bottom-10 right-10 bg-yellow-500  p-4 rounded-full">
        <label htmlFor="picture">
          <ImagePlus className="text-white" />
        </label>
        <Input
          onChange={handleFileUpload}
          className="hidden"
          id="picture"
          type="file"
        />
      </div>
      );
    </>
  );
};

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
    <div>
      <NavBar />
      <h2 className="py-10">My Closet Page</h2>

      <InputFile />
      <div>
        <h3 className="py-6">Tops</h3>
        <ul className="border-double border-4 border-indigo-300 flex flex-row basis-1/5  bg-yellow-100  p-1  ">
          {tops.map((item: Closetitems) => {
            return (
              <div key={item.id} className=" flex flex-row basis-1/5">
                <Link href={`/mycloset/items/${item.id}`}>
                  <div>
                    <p>{item.name}</p>
                    <Image
                      src={item.imgUrl}
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
        <h3 className="py-6">Bottoms</h3>
        <ul className="border-double border-4 border-indigo-300 flex flex-row basis-1/5  bg-yellow-100  p-1 ">
          {bottoms.map((item: Closetitems) => {
            return (
              <div key={item.id} className=" flex flex-row basis-1/5">
                <Link href={`/mycloset/items/${item.id}`}>
                  <div>
                    <p>{item.name}</p>
                    <Image
                      src={item.imgUrl}
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
        <h3 className="py-6">Jumpsuits</h3>
        <ul className="border-double border-4 border-indigo-300 flex flex-row basis-1/5  bg-yellow-100  p-1 ">
          {jumpsuits.map((item: Closetitems) => {
            return (
              <div key={item.id} className=" flex flex-row basis-1/5">
                <Link href={`/mycloset/items/${item.id}`}>
                  <div>
                    <p>{item.name}</p>
                    <Image
                      src={item.imgUrl}
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
        <h3 className="py-6">Dresses</h3>
        <ul className="border-double border-4 border-indigo-300 flex flex-row basis-1/5  bg-yellow-100  p-1 ">
          {dresses.map((item: Closetitems) => {
            return (
              <div key={item.id} className=" flex flex-row basis-1/5">
                <Link href={`/mycloset/items/${item.id}`}>
                  <div>
                    <p>{item.name}</p>
                    <Image
                      src={item.imgUrl}
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
      {/* {closet.items.map((props: Closetitems) => {
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
      })} */}
    </div>
  );
};
export default MyCloset;
