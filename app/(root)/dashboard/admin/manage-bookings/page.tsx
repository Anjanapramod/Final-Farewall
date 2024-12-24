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
  DialogFooter,
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

// This would typically come from an API or database
const bookings = [
  {
    id: 1,
    date: "2023-06-01",
    clientName: "John Doe",
    type: "service",
    name: "Basic Funeral Service",
    quantity: null,
    rate: "$2,500",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "2023-06-05",
    clientName: "Jane Smith",
    type: "asset",
    name: "Standard Casket",
    quantity: 1,
    rate: "$1,000",
    status: "Pending",
  },
  {
    id: 3,
    date: "2023-06-10",
    clientName: "Bob Johnson",
    type: "service",
    name: "Memorial Service",
    quantity: null,
    rate: "$3,000",
    status: "Confirmed",
  },
  {
    id: 4,
    date: "2023-06-15",
    clientName: "Alice Brown",
    type: "asset",
    name: "Urn",
    quantity: 2,
    rate: "$400",
    status: "Confirmed",
  },
  {
    id: 5,
    date: "2023-06-20",
    clientName: "Charlie Davis",
    type: "service",
    name: "Cremation Service",
    quantity: null,
    rate: "$1,800",
    status: "Cancelled",
  },
];

export default function Page() {
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

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    // In a real application, this would update the status in the backend
    console.log(`Updating booking ${bookingId} status to ${newStatus}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Funeral Home Bookings</h2>
      <Table>
        <TableCaption>
          A list of recent bookings for your funeral home.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
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
              <TableCell>{booking.clientName}</TableCell>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.quantity || "-"}</TableCell>
              <TableCell>{booking.rate}</TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
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
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="date"
                          value={booking.date}
                          className="col-span-3"
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="client" className="text-right">
                          Client
                        </Label>
                        <Input
                          id="client"
                          value={booking.clientName}
                          className="col-span-3"
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="service" className="text-right">
                          Service/Asset
                        </Label>
                        <Input
                          id="service"
                          value={booking.name}
                          className="col-span-3"
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                          Quantity
                        </Label>
                        <Input
                          id="quantity"
                          value={booking.quantity || "-"}
                          className="col-span-3"
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rate" className="text-right">
                          Rate
                        </Label>
                        <Input
                          id="rate"
                          value={booking.rate}
                          className="col-span-3"
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Status
                        </Label>
                        <Select
                          onValueChange={(value: string) =>
                            handleStatusChange(booking.id, value)
                          }
                          defaultValue={booking.status}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
