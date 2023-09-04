//need to make a button to close the form//

"use client";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import CloseButton from 'react-bootstrap/CloseButton'
import { ImagePlus } from "lucide-react";
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
  { label: "Tanks", value: "tank" },
  { label: "T-shirts", value: "t-shirt" },
  { label: "Blouses", value: "blouse" },
  { label: "Actives", value: "active" },
  { label: "Hoodies", value: "hoodie" },
  { label: "Sweatshirts", value: "sweatshirt" },
  { label: "Sweaters", value: "sweater" },
  { label: "Blazers", value: "blazer" },
  { label: "Coats", value: "coat" },
  { label: "Raincoats", value: "raincoat" },
  { label: "Jackets", value: "jacket" },
  { label: "Jeans", value: "jean" },
  { label: "Shorts", value: "shorts" },
  { label: "Sweatpants", value: "sweatpants" },
  { label: "Leggings", value: "legging" },
  { label: "Pants", value: "pants" },
  { label: "Skirts", value: "skirts" },
  { label: "Jumpsuits", value: "jumpsuit" },
  { label: "Maxi", value: "maxi" },
  { label: "Midi", value: "midi" },
  { label: "Short", value: "short" },
  { label: "Knitwear", value: "knitwear" },
] as const;

const FormSchema = z.object({
  itemType: z.string({
    required_error: "Please select a item.",
  }),
  file: z.string(),
});

export function ComboboxForm() {
  const [hideform, setHideForm] = useState(false);
  const handleHide = () => {
    setHideForm(true);
    console.log("close here!");
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    toast({
      title: "Upload Item", //"You uploaded a new item" insted of in the description
      description: (
        <>
          <p>"You uploaded a new item!"</p> 
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
                              : "Select your closet item name"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full max-h-[200px] overflow-y-auto p-0">
                        <Command>
                          <CommandInput placeholder="Search type..." />
                          <CommandEmpty>No type found.</CommandEmpty>

                          <CommandGroup>
                            {closetItemName.map((item) => (
                              <CommandItem
                                value={item.label}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("itemType", item.value);
                                }}
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
                              </CommandItem>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label htmlFor="picture">Picture</Label>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} id="picture" type="file" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
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
