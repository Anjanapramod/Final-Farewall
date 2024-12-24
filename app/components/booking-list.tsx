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

// This would typically come from an API or database
const bookings = [
  {
    id: 1,
    date: "2023-06-01",
    type: "service",
    name: "Basic Funeral Service",
    quantity: null,
    rate: "$2,500",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "2023-06-05",
    type: "asset",
    name: "Standard Casket",
    quantity: 1,
    rate: "$1,000",
    status: "Pending",
  },
  {
    id: 3,
    date: "2023-06-10",
    type: "service",
    name: "Memorial Service",
    quantity: null,
    rate: "$3,000",
    status: "Confirmed",
  },
  {
    id: 4,
    date: "2023-06-15",
    type: "asset",
    name: "Urn",
    quantity: 2,
    rate: "$400",
    status: "Confirmed",
  },
  {
    id: 5,
    date: "2023-06-20",
    type: "service",
    name: "Cremation Service",
    quantity: null,
    rate: "$1,800",
    status: "Cancelled",
  },
];

export default function BookingList() {
  // const [selectedBooking, setSelectedBooking] = useState(null);

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
      <Table>
        <TableCaption>A list of your recent bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Service/Asset</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.quantity || "-"}</TableCell>
              <TableCell>{booking.rate}</TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
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
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-bold">Date:</span>
                        <span>{booking.date}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-bold">Service/Asset:</span>
                        <span>{booking.name}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-bold">Quantity:</span>
                        <span>{booking.quantity || "-"}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-bold">Rate:</span>
                        <span>{booking.rate}</span>
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
    </div>
  );
}
