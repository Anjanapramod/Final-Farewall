'use client';

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
import { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { User } from "../helpers/types/user.type";
import { getAllBookings } from "../store/slices/bookingSlice";
import { Booking } from "../helpers/types/booking.type";

export default function BookingList() {

  const { bookings } = useSelector((state: RootState) => state.bookings);
  const { asset } = useSelector((state: RootState) => state.assets);
  const { services } = useSelector((state: RootState) => state.services);

  const [userBookings, setUserBookings] = useState<Booking[] | null>([]);

//   useEffect(() => {
//     const filteredBookings:Booking[] = bookings?.filter((booking) => booking.userId === user?.id);
// if(!filteredBookings) return;

//     const userBookings = filteredBookings.reduce((result, booking) => {
//       let name = "";
//       let quantity = "";

      
//       if ((booking?.serviceId ?? 0) > 0) {
//         // Fetch service name using serviceId
//         const service = services.find(s => s.id === booking.serviceId);
//         name = service ? service.name : "Unknown Service";
//         quantity = "-"; // No quantity for services
//       } else if (booking.assetId > 0) {
//         // Fetch asset name using assetId
//         const asset = assets.find(a => a.id === booking.assetId);
//         name = asset ? asset.name : "Unknown Asset";
//         quantity = booking.assetQty; // Add quantity for assets
//       }
    
//       // Push the transformed booking into the result array
//       result.push({
//         date: booking.date,
//         name,
//         quantity: quantity || "-",
//         status: booking.status,
//         rate: booking.rate
//       });
    
//       return result;
//     }, []);
    

//   }, []);




  const [user] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Your Bookings</h2>
      {userBookings && userBookings.length > 0 ? (
        <Table>
          <TableCaption>A list of your recent bookings.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Service/Asset</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userBookings && userBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.bookedDate?.toLocaleDateString()}</TableCell>
                <TableCell>{booking.}</TableCell>
                <TableCell>{
                  booking.assertId == 0 ? 1 : booking.assetQty
                }</TableCell>
                <TableCell>
                  {booking.price}
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
                          Details for your {booking.assertId == 0 ? " Service " : " Asset "} booking.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span className="font-bold">Date:</span>
                          <span>{booking && booking.bookedDate?.toLocaleDateString()}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span className="font-bold">Service/Asset:</span>
                          <span>{booking.name}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span className="font-bold">Quantity:</span>
                          <span>{booking.assetQty || "-"}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span className="font-bold">Rate:</span>
                          <span>{booking.price}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span className="font-bold">Status:</span>
                          <span>{getStatusBadge(booking.status)}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}
