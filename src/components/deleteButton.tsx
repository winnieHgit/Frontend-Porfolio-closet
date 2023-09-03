import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"



export const DeleteItemButton = () => {
  const [deleteItem, setDeleteItem] = useState(null);

  const router = useRouter();

  const clostItemIdIdFromUrl = router.query.itemId;

  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:3007/mycloset/items/${clostItemIdIdFromUrl}`,
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
    <div>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};
