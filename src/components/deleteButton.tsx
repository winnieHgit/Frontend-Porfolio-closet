import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const DeleteItemButton = () => {
  const [deleteItem, setDeleteItem] = useState(null);

  const router = useRouter();

  const clostItemIdIdFromUrl = router.query.itemId;

  const handleDelete = async () => {
    const response = await axios.delete(
      `${process.env["NEXT_PUBLIC_API_URL"]}/mycloset/items/${clostItemIdIdFromUrl}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setDeleteItem(response.data);
    console.log(response.data);
    router.push("/mycloset");
  };

  return (
    <div className="flex justify-center py-8 ">
      <Button
        onClick={handleDelete}
        className=" bg-yellow-500 border-double border-4 border-indigo-300"
      >
        Delete
      </Button>
    </div>
  );
};
