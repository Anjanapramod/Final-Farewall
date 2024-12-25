"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "../store/store";
import { getAllByParlorId } from "../store/slices/servicesSlice";
import { Service } from "../helpers/types/service.types";
import { BookingModal } from "../components/service-booking-model";
import { saveBooking } from "../store/slices/bookingSlice";

export default function ServicesListing() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { services } = useSelector((state: RootState) => state.services);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (params?.id) {
      dispatch(getAllByParlorId(Number(params.id)));
    }
  }, [params, dispatch]);

  const handleOpenServiceModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services &&
            services.map((service: Service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{service.rate}</p>
                  <Badge
                    variant={service.availability ? "default" : "destructive"}
                    className="mt-2"
                  >
                    {service.availability
                      ? "Available"
                      : "Currently Unavailable"}
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleOpenServiceModal(service)}
                    disabled={!service.availability}
                    className={`${
                      !service.availability
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {service.availability ? "Book Now" : "Unavailable"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      {selectedService && (
        <BookingModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={(bookingData) => {
            console.log("Booking confirmed:", bookingData);
            alert("Booking confirmed!");

            dispatch(
              saveBooking({
                ...bookingData,
                price: Number(bookingData.price),
                date: new Date(bookingData.date),
                user: null,
              })
            ).then(() => {
              dispatch(getAllByParlorId(Number(params.id)));
            });

            handleCloseModal();
          }}
        />
      )}
    </section>
  );
}
