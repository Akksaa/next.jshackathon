"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/lib/client";
import { ShipmentInfo } from "@/types/ShipmentInfo";
import Link from "next/link";
import axios from "axios";
import Loading from "./Loading";
import { Loader2 } from "lucide-react";


const addShipmentInfo = async (shipmentInfo: ShipmentInfo) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/userCookie`
    );
    const userId = res.data.user_id;
    console.log("response for userId", userId);

    const result = await client.create({
      _type: "shipmentInfo", // Schema type
      userName: shipmentInfo.userName,
      userId,
      userPhone: shipmentInfo.userPhone,
      address: shipmentInfo.address,
      city: shipmentInfo.city,
      countryCode: shipmentInfo.countryCode,
      postalCode: shipmentInfo.postalCode,
    });

    console.log("Shipment Info added successfully:", result);
  } catch (error: unknown) {
    console.error("Error adding shipping info:", error);
  }
};

const shipmentInfoSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name is required" })
    .max(30, { message: "Name cannot exceed 30 characters" }),
  phone: z
    .string()
    .min(11, { message: "Phone Number must be at least 11 characters" })
    .max(11, { message: "Phone Number cannot exceed 11 characters" }),
  address: z.string().min(2, { message: "Address is required" }),
  city: z.string().min(2, { message: "City Name is required" }),
  countryCode: z.string().min(2, { message: "Country Code is required" }),
  postalCode: z.string().min(2, { message: "Postal Code is required" }),
});

const ShipmentInfoSchema = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof shipmentInfoSchema>>({
    resolver: zodResolver(shipmentInfoSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      countryCode: "",
      postalCode: "",
    },
  });
  function onSubmit(data: z.infer<typeof shipmentInfoSchema>) {
    setLoading(true);
    console.log(data);
    const shipmentInfo = {
      userName: data.name,
      userPhone: data.phone,
      address: data.address,
      city: data.city,
      countryCode: data.countryCode,
      postalCode: data.postalCode,
    };
    addShipmentInfo(shipmentInfo);
    form.reset();
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  })

  return (
    <div className="col-span-2 bg-white p-0 sm:p-8">
      {loading ? (
        <Loading />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="openSans font-normal shadow-md rounded-md grid grid-cols-1 md:grid-cols-2 gap-6 p-3 sm:p-6"
          >
            <h1 className="text-xl text-zinc-800 md:col-span-2 col-span-1 font-semibold">
              Shipping Address
            </h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., John Doe"
                      className="outline-none border border-primYellow placeholder:text-zinc-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Phone No.</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 0312 3392019"
                      className="outline-none border border-primYellow placeholder:text-zinc-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Street 1, Gulshan"
                      className="outline-none border border-primYellow placeholder:text-zinc-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Karachi"
                      className="outline-none border border-primYellow placeholder:text-zinc-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Country Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., PAK"
                      className="outline-none border border-primYellow placeholder:text-zinc-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Postal code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 7765"
                      className="outline-none border border-primYellow placeholder:text-zinc-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-1 md:col-span-2 sm:flex justify-between mt-4">
              <Link href={"../cart"}>
                <button
                  type="button"
                  className=" text-gray-700 border-gray-700 border-[1px] px-6 py-1 mb-2 sm:mb-0"
                >
                  Back to cart
                </button>
              </Link>

              <Button
                type="submit"
                disabled={loading}
                className="bg-primYellow text-white rounded-md px-4 md:px-6 py-2 hover:bg-white hover:text-primYellow hover:border-primYellow hover:border"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                  </>
                ) : (
                  "Save Shipping Info"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ShipmentInfoSchema;
