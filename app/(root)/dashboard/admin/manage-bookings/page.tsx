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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAllBookingsByParlorId } from "@/app/store/slices/bookingSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { Booking } from "@/app/helpers/types/booking.type";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const funeralParlor = localStorage.getItem("funeralParlor")
      ? JSON.parse(localStorage.getItem("funeralParlor") as string)
      : null;

    if (funeralParlor) {
      dispatch(getAllBookingsByParlorId(funeralParlor.id)).then((data) => {
        const bookingsData = data.payload as Booking[];
        setBookings(bookingsData);
      });
    }
  }, [dispatch]);

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

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    console.log(`Updating booking ${bookingId} status to ${newStatus}`);
    // Add API call or dispatch action to update the status
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold mb-6">Funeral Home Bookings</h2>
      <Table className="w-full shadow-md  border-gray-200 rounded">
        <TableCaption>
          A list of recent bookings for your funeral home.
        </TableCaption>
        <TableHeader className="bg-gray-50 rounded ">
          <TableRow>
            <TableHead>Date</TableHead>

            <TableHead>Client ID </TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Service/Asset</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings ? (
            bookings.map((booking) => (
              <TableRow key={booking.id} className="hover:bg-gray-50">
                <TableCell>
                  {booking.bookedDate &&
                    new Date(booking.bookedDate).toLocaleDateString()}
                </TableCell>
                <TableCell >
                  <span className="text-gray-500 text-sm rounded-full px-2 py-1 bg-gray-100 ml-2">
                    {booking.user?.id}
                  </span>
                </TableCell>
                <TableCell>{booking.user?.name}</TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>
                  {booking.type === "SERVICE" ? "-" : booking.assetQty}
                </TableCell>
                <TableCell>{booking.price}</TableCell>
                <TableCell>
                  {getStatusBadge(booking.status || "PENDING")}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Manage Booking
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Manage Booking</DialogTitle>
                        <DialogDescription>
                          View and update details for this booking.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 ">
                        {[
                          { label: "Date", value: booking.bookedDate },
                          { label: "Client", value: booking.userId },
                          { label: "Service/Asset", value: booking.name },
                          {
                            label: "Quantity",
                            value:
                              booking.type === "ASSET" ? booking.assetQty : "-",
                          },
                          { label: "Rate", value: booking.price },
                        ].map((field, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-4 items-center gap-4"
                          >
                            <Label
                              htmlFor={field.label.toLowerCase()}
                              className="text-right"
                            >
                              {field.label}
                            </Label>
                            <Input
                              id={field.label.toLowerCase()}
                              value={
                                field.value instanceof Date
                                  ? field.value.toLocaleDateString()
                                  : field.value ?? ""
                              }
                              className="col-span-3"
                              readOnly
                            />
                          </div>
                        ))}
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">
                            Status
                          </Label>
                          <Select
                            onValueChange={(value: string) =>
                              handleStatusChange(
                                booking.id ? booking.id : 0,
                                value
                              )
                            }
                            defaultValue={booking.status}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                              {["CONFIRMED", "PENDING", "CANCELLED"].map(
                                (status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No bookings found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
