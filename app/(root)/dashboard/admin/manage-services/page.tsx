"use client";

import { findFuneralParlorByUserId } from "@/app/store/slices/funeralParlorSlice";
import {
    deleteService,
    getAllByParlorId,
    saveService,
} from "@/app/store/slices/servicesSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { PenIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ManageServices() {
    const dispatch: AppDispatch = useDispatch();

    const { services } = useSelector((state: RootState) => state.services);
    const { funeralParlor } = useSelector(
        (state: RootState) => state.funeralParlors
    );
    const { user } = useSelector((state: RootState) => state.user);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        rate: "",
        availability: false,
        funeralParlorId: "",
    });

    // Load the funeral parlor and its services
    useEffect(() => {
        if (user?.id) {
            dispatch(findFuneralParlorByUserId(user.id));
        }
    }, [user?.id, dispatch]);

    useEffect(() => {
        if (funeralParlor?.id) {
            dispatch(getAllByParlorId(funeralParlor.id));
        }
    }, [funeralParlor?.id, dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(
            saveService({
                ...formData,
                rate: Number(formData.rate),
                funeralParlorId: Number(formData.funeralParlorId),
            })
        ).then(() => {
            console.log("Service added successfully");
            if (funeralParlor?.id) {
                dispatch(getAllByParlorId(funeralParlor.id));
            }
        });

        setFormData({
            name: "",
            description: "",
            rate: "",
            availability: false,
            funeralParlorId: "",
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleDelete = (id: number) => {
        console.log("Delete service with ID:", id);
        dispatch(deleteService(id)).then(() => {
            console.log("Service deleted successfully");
            if (funeralParlor?.id) {
                dispatch(getAllByParlorId(funeralParlor.id));
            }
        });
    };

    return (
        <div className="container max-w-7xl min-h-fit p-6 mx-auto">
            <h1 className="text-4xl font-bold mb-8">Manage Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Form */}
                <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter service name"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter service description"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="rate"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Rate
                            </label>
                            <input
                                type="number"
                                id="rate"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter rate"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="funeralParlorId"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Funeral Parlor ID
                            </label>
                            <input
                                type="number"
                                id="funeralParlorId"
                                name="funeralParlorId"
                                value={formData.funeralParlorId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter parlor ID"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="availability"
                                name="availability"
                                checked={formData.availability}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label
                                htmlFor="availability"
                                className="text-sm font-medium text-gray-700"
                            >
                                Available
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Add Service
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-md col-span-2">
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: "calc(100vh - 240px)" }}
                    >
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Rate
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Availability
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {services && services.length > 0 ? (
                                    services.map((service) => (
                                        <tr key={service.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">{service.name}</td>
                                            <td className="px-6 py-4">{service.description}</td>
                                            <td className="px-6 py-4">${service.rate.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                {service.availability ? "Yes" : "No"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => service.id && handleDelete(service.id)}
                                                    className="mr-3 text-red-600 hover:text-red-900"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    <PenIcon size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-4 text-sm text-gray-400"
                                        >
                                            No services found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
