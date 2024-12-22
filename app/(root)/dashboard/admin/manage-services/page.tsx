"use client";

import { PenIcon, Trash } from "lucide-react";
import { useState } from "react";

interface Service {
    id: number;
    name: string;
    description: string;
    rate: number;
    availability: boolean;
    funeralParlorId: number;
}

export default function ManageServices() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        rate: "",
        availability: false,
        funeralParlorId: "",
    });

    const [services, setServices] = useState<Service[]>([
        {
            id: 1,
            name: "Basic Funeral Service",
            description: "Includes basic care and transport of the deceased",
            rate: 500.0,
            availability: true,
            funeralParlorId: 1,
        },
        {
            id: 2,
            name: "Premium Funeral Package",
            description: "Comprehensive funeral arrangement services",
            rate: 1200.0,
            availability: true,
            funeralParlorId: 2,
        },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newService: Service = {
            id: Date.now(),
            name: formData.name,
            description: formData.description,
            rate: parseFloat(formData.rate),
            availability: formData.availability,
            funeralParlorId: parseInt(formData.funeralParlorId),
        };
        setServices([...services, newService]);
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
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "availability" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleDelete = (id: number) => {
        setServices(services.filter((service) => service.id !== id));
    };

    return (
        <div className="mt-6 max-w-7xl max-h-fit mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Manage Services</h1>
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Service
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-md col-span-2">
                    <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rate
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Availability
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {services.length > 0 ? services.map((service) => (
                                    <tr key={service.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {service.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            ${service.rate.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.availability ? "Yes" : "No"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(service.id)}
                                                className="mr-3 text-red-600 hover:text-red-900"
                                            >
                                                <Trash size={16} />
                                            </button>
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <PenIcon size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan={5} className="text-center py-4 text-sm text-gray-400">No services found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
