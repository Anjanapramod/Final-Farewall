"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Info } from "lucide-react";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getFuneralParlor } from "../store/slices/funeralParlorSlice";
import Link from "next/link";

export default function FuneralParlorListing() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredParlors, setFilteredParlors] = useState(funeralParlors)

  const dispatch = useDispatch<AppDispatch>();
  const { funeralParlors } = useSelector(
    (state: RootState) => state.funeralParlors
  );
  useEffect(() => {
    console.log("GET FUNERAL PARLORS: useEffect()");
    dispatch(getFuneralParlor());
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = funeralParlors?.filter((parlor) =>
      parlor.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch({
      type: "funeralParlors/setFilteredParlors",
      payload: filtered,
    });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Find a Funeral Home
        </h2>
        <form onSubmit={handleSearch} className="mb-8 flex justify-center">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search by location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </div>
        </form>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funeralParlors?.map((parlor) => (
            <Card key={parlor.id}>
              <CardHeader>
                <CardTitle>{parlor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{parlor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{parlor.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <Info className="w-5 h-5 mr-2 text-gray-500" />

                    {parlor.description}
                  </div>
                  <div className="flex justify-end">
                    <Link
                      href={`/dashboard/user/booking/${parlor.id}`}
                      passHref
                    >
                      <Button>Book Now</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
