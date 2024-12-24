"use client";

import { useState } from "react";
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

// This would typically come from an API or database
const services = [
  {
    id: 1,
    name: "Basic Funeral Service",
    description: "A simple, dignified service for your loved one.",
    rate: "$2,500",
    availability: true,
  },
  {
    id: 2,
    name: "Memorial Service",
    description: "A beautiful ceremony celebrating the life of the deceased.",
    rate: "$3,000",
    availability: true,
  },
  {
    id: 3,
    name: "Graveside Service",
    description: "A intimate service held at the burial site.",
    rate: "$2,000",
    availability: false,
  },
  {
    id: 4,
    name: "Cremation Service",
    description: "A respectful cremation with optional viewing.",
    rate: "$1,800",
    availability: true,
  },
  {
    id: 5,
    name: "Full Traditional Funeral",
    description:
      "A comprehensive funeral service with all traditional elements.",
    rate: "$5,000",
    availability: true,
  },
];

export default function ServicesListing() {
  const [bookedServices, setBookedServices] = useState<number[]>([]);

  const handleBooking = (serviceId: number) => {
    setBookedServices((prev) => [...prev, serviceId]);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{service.rate}</p>
                <Badge
                  variant={service.availability ? "default" : "secondary"}
                  className="mt-2"
                >
                  {service.availability ? "Available" : "Currently Unavailable"}
                </Badge>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleBooking(service.id)}
                  disabled={
                    !service.availability || bookedServices.includes(service.id)
                  }
                >
                  {bookedServices.includes(service.id) ? "Booked" : "Book Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
