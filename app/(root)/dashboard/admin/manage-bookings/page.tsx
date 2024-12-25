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
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  getAllBookingsByParlorId,
  updateBookingStatus,
} from "@/app/store/slices/bookingSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { Booking } from "@/app/helpers/types/booking.type";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedBooking: Booking) => void;
  booking: Booking;
}

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

function UpdateBookingModal({
  isOpen,
  onClose,
  onConfirm,
  booking,
}: BookingModalProps) {
  const [status, setStatus] = useState<string>(booking.status || "PENDING");

  useEffect(() => {
    return setStatus(booking.status || "PENDING"); // Reset the status when the modal opens
  }, [booking]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Booking</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            { label: "Date", value: booking.bookedDate },
            { label: "Client", value: booking.user?.id },
            { label: "Service/Asset", value: booking.name },
            {
              label: "Quantity",
              value: booking.type === "ASSET" ? booking.assetQty : "-",
            },
            { label: "Rate", value: booking.price },
          ].map((field, index) => (
            <div key={index} className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">{field.label}</Label>
              <Input
                value={
                  field.value instanceof Date
                    ? field.value.toISOString()
                    : field.value ?? ""
                }
                readOnly
                className="col-span-3"
              />
            </div>
          ))}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <Select onValueChange={setStatus} defaultValue={status}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {["CONFIRMED", "PENDING", "CANCELLED"].map((statusOption) => (
                  <SelectItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onConfirm({ ...booking, status });
              onClose();
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenBookingModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold mb-6">Funeral Home Bookings</h2>
      <Table className="w-full shadow-md border-gray-200 rounded">
        <TableCaption>
          A list of recent bookings for your funeral home.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Client ID</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Service/Asset</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  {booking.bookedDate
                    ? new Date(booking.bookedDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>{booking.user?.id}</TableCell>
                <TableCell>{booking.user?.name}</TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>
                  {booking.type === "ASSET" ? booking.assetQty : "-"}
                </TableCell>
                <TableCell>{booking.price}</TableCell>
                <TableCell>
                  {getStatusBadge(booking.status || "PENDING")}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenBookingModal(booking)}>
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8}>No bookings found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedBooking && (
        <UpdateBookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={(booking) => {
            console.log(booking);
            if (booking.id !== undefined) {
              dispatch(
                updateBookingStatus({
                  bookingId: booking.id,
                  status: booking.status ? booking.status : "PENDING",
                })
              ).then(() => {
                alert("Booking succussfully updated!")
                const funeralParlor = localStorage.getItem("funeralParlor")
                  ? JSON.parse(localStorage.getItem("funeralParlor") as string)
                  : null;

                if (funeralParlor) {
                  dispatch(getAllBookingsByParlorId(funeralParlor.id)).then(
                    (data) => {
                      const bookingsData = data.payload as Booking[];
                      setBookings(bookingsData);
                    }
                  );
                }
              });
            }
          }}
          booking={selectedBooking}
        />
      )}
    </div>
  );
}
