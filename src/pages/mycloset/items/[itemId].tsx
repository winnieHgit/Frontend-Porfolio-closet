import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Closetitems } from "@/pages/mycloset";
import { DeleteItemButton } from "@/components/deleteButton";

const ClosetItemPage = () => {
  const [item, setItem] = useState<null | Closetitems>(null);
  

  const router = useRouter();

  const clostItemIdIdFromUrl = router.query.itemId;

  useEffect(() => {
    if (clostItemIdIdFromUrl === undefined) {
      return;
    }
    const getItemFromApi = async () => {
      const response = await axios.get(
        `http://localhost:3007/mycloset/items/${clostItemIdIdFromUrl}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setItem(response.data);
      console.log(response.data);
    };

    
    getItemFromApi();
  }, [clostItemIdIdFromUrl]);


  if (item === null) {
    return <p>Loading Item...</p>;
  }



  
  
  

  return (
    <div className=" flex  flex-col content-center flex-wrap">
      <h2>Closet Item Detail Page</h2>
      <div className="flex flex-wrap">
        <span>{item.type}</span>
        <span>{item.name}</span>
      </div>
      <Image className="flex flex-wrap border-solid hover:border-dotted border-amber-200 border-8"
        src={item.imgUrl}
        alt={`Image of ${item.name}`}
        width={300}
        height={300}
      />
      <DeleteItemButton />
    </div>
  );
};

export default ClosetItemPage;
