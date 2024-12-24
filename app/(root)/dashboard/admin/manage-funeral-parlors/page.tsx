"use client";

import { FuneralParlor } from "@/app/helpers/types/funeralParlor.type";
import { Building2, Calendar, MapPin, Phone, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import {
    findFuneralParlorByUserId,
    postFuneralParlor,
    updateFuneralParlor,
} from "@/app/store/slices/funeralParlorSlice";

export default function Page() {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const { funeralParlor } = useSelector(
        (state: RootState) => state.funeralParlors
    );

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState<FuneralParlor>({
        name: "",
        description: "",
        location: "",
        contact: "",
    });

    // Fetch funeral parlor on component mount or when user changes
    useEffect(() => {
        console.log("Fetching funeral parlor: useEffect()");
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
        if (user?.id) {
            dispatch(findFuneralParlorByUserId(user.id));
        }
    }, [user?.id, dispatch]);

    // Sync formData with fetched funeralParlor
    useEffect(() => {
        if (funeralParlor) {
            setFormData({
                name: funeralParlor.name || "",
                description: funeralParlor.description || "",
                location: funeralParlor.location || "",
                contact: funeralParlor.contact || "",
            });
            setIsEditing(false);
        }
    }, [funeralParlor]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (funeralParlor?.id) {
            // Update funeral parlor
            dispatch(
                updateFuneralParlor({ ...formData, userId: user?.id, id: funeralParlor.id })
            )
                .unwrap()
                .then(() => {
                    console.log("Funeral parlor updated successfully");
                    setIsEditing(false);
                })
                .catch((error) => {
                    console.error("Error updating funeral parlor:", error);
                });
        } else {
            dispatch(postFuneralParlor({ ...formData, userId: user?.id })).then(() => {
                if (user?.id) {
                    dispatch(findFuneralParlorByUserId(user.id));
                }
            });
            setIsEditing(false);
        }
    };

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const renderForm = () => (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Business Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter business name"
                />
            </div>
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                />
            </div>
            <div>
                <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                >
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                />
            </div>
            <div>
                <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-gray-700"
                >
                    Contact
                </label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter contact information"
                />
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );

    const renderDetails = () => (
        <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
                {[
                    {
                        label: "Business Name",
                        value: funeralParlor?.name,
                        icon: <Building2 />,
                    },
                    {
                        label: "Location",
                        value: funeralParlor?.location,
                        icon: <MapPin />,
                    },
                    { label: "Contact", value: funeralParlor?.contact, icon: <Phone /> },
                    {
                        label: "Added Date",
                        value: funeralParlor?.createdAt || "Not available",
                        icon: <Calendar />,
                    },
                ].map(({ label, value, icon }, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{label}</p>
                            <p className="mt-1">{value instanceof Date ? value.toLocaleDateString() : value}</p>
                        </div>
                    </div>
                ))}
            </div>
            {funeralParlor?.description && (
                <div>
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="text-gray-600">{funeralParlor.description}</p>
                </div>
            )}
            <div className="flex justify-end">
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <PencilIcon className="w-5 h-5 inline-block mr-2" />
                    Update Details
                </button>
            </div>
        </div>
    );

    return (
        <div className="container max-w-7xl min-h-fit p-6 mx-auto">
            <h1 className="text-4xl font-bold">
                {funeralParlor ? "Edit Funeral Parlor" : "Add Funeral Parlor"}
            </h1>
            <p className="text-gray-500">
                {funeralParlor
                    ? "Update the details below."
                    : "Add details of the funeral parlor."}
            </p>
            <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
                {isEditing || !funeralParlor ? renderForm() : renderDetails()}
            </div>
        </div>
    );
}
