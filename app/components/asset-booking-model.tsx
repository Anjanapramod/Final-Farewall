"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { Booking } from "../helpers/types/booking.type";
import { saveBooking } from "../store/slices/bookingSlice";
import { Asset } from "../helpers/types/asset.type";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: {
    user: string;
    date: string;
    price: string;
    quantity: string;
    name: string;
    parlorId: number;
    type?: string;
  }) => void;
  asset: Asset;
}

export function BookingModal({
  isOpen,
  onClose,
  onConfirm,
  asset,
}: BookingModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;

    if (!user) {
      alert("User not found. Please log in.");
      return;
    }

    const quantity = parseInt(formData.get("quantity") as string, 10);

    // Ensure the quantity does not exceed the available stock
    if (quantity > asset.quantity) {
      alert("The requested quantity exceeds available stock.");
      return;
    }

    const bookingData: Booking = {
      price: parseFloat(formData.get("price") as string) * quantity, // Calculate total price
      userId: user.id,
      bookedDate: new Date(formData.get("date") as string),
      assertId: asset.id, // Use correct assetId
      assetQty: quantity,
      status: "PENDING",
      type: "SERVICE",
      name: asset.name,
      parlorId: asset.funeralParlorId ? asset.funeralParlorId : 0,
    };

    // Dispatch the booking action
    console.log("Booking Data: ", bookingData);
    dispatch(saveBooking(bookingData)).then(() => {});

    // Callback for further actions
    onConfirm({
      user: user.name,
      date: formData.get("date") as string,
      price: formData.get("price") as string,
      quantity: formData.get("quantity") as string,
      name: asset.name,
      type: "ASSET",
      parlorId: asset.funeralParlorId ? asset.funeralParlorId : 0,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase {asset?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* User Section */}
          <div className="grid gap-2">
            <Label htmlFor="user">User</Label>
            <div className="flex justify-between border border-gray-300 rounded-md p-2">
              {localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user") as string).name
                : "Guest"}
            </div>
          </div>
          {/* Date Picker Section */}
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="datetime-local" required />
          </div>
          {/* Quantity Section */}
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              max={asset.quantity}
              required
            />
          </div>
          {/* Price Section */}
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" value={asset.rate} readOnly />
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
