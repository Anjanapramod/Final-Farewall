"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

import { getAllBookingsByUserId } from "../store/slices/bookingSlice";
import { Booking } from "../helpers/types/booking.type";

export default function BookingList() {
  const dispatch = useDispatch<AppDispatch>();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    dispatch(getAllBookingsByUserId(user.id)).then((data) => {
      const b = data.payload as Booking[];
      setBookings(b);
    });
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "CANCELLED":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  //ASSET,SERVICE
  const getTypeBatch = (type: string) => {
    switch (type) {
      case "ASSET":
        return <Badge className="bg-blue-500">Asset</Badge>;
      case "SERVICE":
        return <Badge className="bg-cyan-400">Service</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className=" mx-auto px-4 py-8 mb-6">
        <h2 className="text-3xl font-bold mb-1">Your Bookings</h2>
        {bookings.length === 0 && (
          <div className="flex items-center">
            <p className="text-gray-400">
              No bookings found. Please book a service or asset to view your
              bookings.
            </p>
          </div>
        )}
      </div>

      <Table>
        <TableCaption>A list of your recent bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Service/Asset</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-gray-100">
              <TableCell>
                {booking.bookedDate &&
                  new Date(booking.bookedDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{booking.name}</TableCell>
              <TableCell>
                {booking.type === "SERVICE" ? "-" : booking.assetQty}
              </TableCell>
              <TableCell>
                {getTypeBatch(booking.type ? booking.type : "SERVICE")}
              </TableCell>
              <TableCell>
                {getStatusBadge(booking.status ? booking.status : "PENDING")}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Booking Details</DialogTitle>
                      <DialogDescription>
                        Details for your {booking.type} booking.
                      </DialogDescription>
                    </DialogHeader>

                    {/* //make this correct */}
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-bold">Date:</span>
                        <span>
                          {booking.bookedDate &&
                            new Date(booking.bookedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-bold">Service/Asset:</span>
                        <span>{booking.name}</span>
                      </div>
                      {booking.type === "ASSET" && (
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span className="font-bold">Quantity:</span>
                          <span>{booking.assetQty}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-bold">Rate:</span>
                        <span>{booking.price}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-bold">Status:</span>
                        <span>
                          {getStatusBadge(
                            booking.status ? booking.status : "PENDING"
                          )}
                        </span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
