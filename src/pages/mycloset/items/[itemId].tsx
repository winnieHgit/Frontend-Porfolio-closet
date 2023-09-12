import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Closetitems } from "@/pages/mycloset";
import { DeleteItemButton } from "@/components/deleteButton";
import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

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
        `${process.env["NEXT_PUBLIC_API_URL"]}/mycloset/items/${clostItemIdIdFromUrl}`,
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
    <div className="overflow-x-auto">
      <NavBar />
      <div className=" py-8 flex  flex-col content-center flex-wrap">
        {/* <h2 className="flex justify-center text-yellow-900">individual Item Page</h2> */}
        <div className="flex-column flex-wrap py-8">
          <div className="flex justify-center text-yellow-900 font-bold text-xl">{item.type}</div>
          <div className="flex justify-center text-yellow-900">{item.name}</div>
        </div>
        <Image
          className="flex flex-wrap contend-center border-solid hover:border-dotted border-amber-200 border-8"
          src={item.imgUrl}
          alt={`Image of ${item.name}`}
          width={300}
          height={300}
        />
        <DeleteItemButton />
        {/* <WeatherInfo city={"Amsterdam"} country={"Netherlands"} /> */}
      </div>
      <Footer />
    </div>
  );
};

export default ClosetItemPage;
