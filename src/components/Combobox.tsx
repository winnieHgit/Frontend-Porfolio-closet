//need to make a button to close the form//

"use client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import CloseButton from 'react-bootstrap/CloseButton'
import { InputFile } from "./Fileinput";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const closetItemName = [
  { label: "Tanks", value: "Tank" },
  { label: "T-shirts", value: "T-shirt" },
  { label: "Blouses", value: "Blouse" },
  { label: "Actives", value: "Active" },
  { label: "Hoodies", value: "Hoodie" },
  { label: "Sweatshirts", value: "Sweatshirt" },
  { label: "Sweaters", value: "Sweater" },
  { label: "Blazers", value: "Blazer" },
  { label: "Coats", value: "Coat" },
  { label: "Raincoats", value: "Raincoat" },
  { label: "Jackets", value: "Jacket" },
  { label: "Jeans", value: "Jean" },
  { label: "Shorts", value: "Shorts" },
  { label: "Sweatpants", value: "Sweatpants" },
  { label: "Leggings", value: "Legging" },
  { label: "Pants", value: "Pants" },
  { label: "Skirts", value: "Skirts" },
  { label: "Jumpsuits", value: "Jumpsuit" },
  { label: "Maxi", value: "Maxi" },
  { label: "Midi", value: "Midi" },
  { label: "Short", value: "Short" },
  { label: "Knitwear", value: "Knitwear" },
] as const;

const clothesCategory = [
  {
    value: "Tops",
    label: "Tops",
  },
  {
    value: "Bottoms",
    label: "Bottoms",
  },
  {
    value: "Jumpsuits",
    label: "Jumpsuits",
  },
  {
    value: "Dresses",
    label: "Dresses",
  },
] as const;

const FormSchema = z.object({
  itemCategory: z.string(),
  itemType: z.string({
    required_error: "Please select a item.",
  }),
  file: z.any(),
});

export function ComboboxForm() {
  const [hideform, setHideForm] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const selectedItem = data.itemType;
    const selectedCategory = data.itemCategory;

    console.log(selectedItem);
    console.log(selectedCategory);

    const response = await axios.post(
      `https://www.filestackapi.com/api/store/S3?key=${process.env["NEXT_PUBLIC_FILESTACK_API_KEY"]}`,
      data.file[0],
      {
        headers: {
          "Content-Type": "image/png",
        },
      }
    );
    const ItemUrl = response.data.url;

    // console.log(response.data);
    console.log(ItemUrl);

    // const UploadedImage = localStorage.setItem("imgUrl", ItemUrl);
    // console.log(localStorage.getItem("imgUrl"));

    try {
      const urlData = await axios.post(
        `${process.env["NEXT_PUBLIC_API_URL"]}/mycloset/newitem`,
        { imgUrl: ItemUrl, name: selectedItem, type: selectedCategory },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(urlData);
    } catch (error) {
      console.log("having error post imgUrl to the database", error);
    }

    toast({
      title: "Upload Item", //"You uploaded a new item" insted of in the description
      description: (
        <>
          <p>You uploaded a new item!</p>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        </>
      ),
    });
  }

  return (
    <>
      {!hideform ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="itemCategory"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-col">
                    <FormLabel>ClosetCategory</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? clothesCategory.find(
                                  (type) => type.value === field.value
                                )?.label
                              : "Which category is your item"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full max-h-[200px] overflow-y-auto p-0">
                        <Command>
                          <CommandInput placeholder="Search item..." />
                          <CommandEmpty>No type found.</CommandEmpty>

                          <CommandGroup>
                            {clothesCategory.map((item) => (
                              <CommandItem
                                value={item.label}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("itemCategory", item.value);
                                }}
                                // onSelect={() => setValue(item.value)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {item.label}
                              </CommandItem> //here
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />

            <FormField
              control={form.control}
              name="itemType"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-col">
                    <FormLabel>ClosetItem</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? closetItemName.find(
                                  (type) => type.value === field.value
                                )?.label
                              : "What type of clothes do you want to add?"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full max-h-[200px] overflow-y-auto p-0">
                        <Command>
                          <CommandInput placeholder="Search item..." />
                          <CommandEmpty>No type found.</CommandEmpty>

                          <CommandGroup>
                            {closetItemName.map((item) => (
                              <CommandItem
                                value={item.label}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("itemType", item.value);
                                }}
                                // onSelect={() => setValue(item.value)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {item.label}
                              </CommandItem> //here
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the closet item that will be used in the
                      dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => {
                // eslint-disable-next-line
                const [val, setVal] = useState<string>();
                return (
                  <FormItem>
                    <FormLabel>
                      <Label htmlFor="picture">Picture</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={val}
                        onChange={(e) => {
                          setVal(e.target.value);
                          field.onChange(e.target.files);
                        }}
                        id="picture"
                        type="file"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex flex-row space-x-8">
              <Button type="submit">Submit</Button>
              <Button onClick={() => setHideForm(true)}>Close</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div>
          <button onClick={() => setHideForm(!hideform)}></button>
          <InputFile />
        </div>
      )}
    </>
  );
}
