import axios from "axios";
import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const DeleteItemButton = () => {
  // const [deleteItem, setDeleteItem] = useState(null);

  const router = useRouter();

  const clostItemIdIdFromUrl = router.query.itemId;

  const handleDelete = async () => {
    await axios.delete(
      `${process.env["NEXT_PUBLIC_API_URL"]}/mycloset/items/${clostItemIdIdFromUrl}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // setDeleteItem(response.data);
    // console.log(response.data);
    router.push("/mycloset");
  };

  return (
    <div className="flex justify-center py-8 ">
      <Button
        onClick={handleDelete}
        className=" bg-yellow-300  border-4 hover:border-dotted text-yellow-900 inline-flex items-center justify-center rounded-md text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-yellow-500  hover:bg-yellow-500  dark:text-yellow-500  h-10 px-4 py-2 "
      >
        Delete
      </Button>
    </div>
  );
};
