import { ImagePlus } from "lucide-react";
// import ImgUpload from "@/components/Fileupload";
import React, { useState } from "react";
import { ComboboxForm } from "./Combobox";

export function InputFile() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 bg-yellow-500  p-4 rounded-full"
      >
        <ImagePlus className="text-white" />
      </div>
    );
  } else if (isOpen) {
    return (
      <div className="fixed bottom-10 right-10 bg-yellow-500  p-4 rounded-lg">
        <ComboboxForm />
      </div>
    );
  }
}
