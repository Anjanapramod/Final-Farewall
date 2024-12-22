"use client";

import { PenIcon, Trash } from "lucide-react";
import { useState } from "react";

interface Asset {
    id: number;
    name: string;
    description?: string;
    rate?: number;
    quantity?: number;
    funeralParlorId: number;
}

export default function ManageAssets() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        rate: "",
        quantity: "",
        funeralParlorId: "",
    });

    const [assets, setAssets] = useState<Asset[]>([
        {
            id: 1,
            name: "Casket A",
            description: "High-quality wooden casket",
            rate: 500.0,
            quantity: 10,
            funeralParlorId: 1,
        },
        {
            id: 2,
            name: "Flower Arrangement",
            description: "White lilies and roses",
            rate: 200.0,
            quantity: 5,
            funeralParlorId: 2,
        },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAsset: Asset = {
            id: Date.now(),
            name: formData.name,
            description: formData.description || undefined,
            rate: formData.rate ? parseFloat(formData.rate) : undefined,
            quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
            funeralParlorId: parseInt(formData.funeralParlorId),
        };
        setAssets([...assets, newAsset]);
        setFormData({
            name: "",
            description: "",
            rate: "",
            quantity: "",
            funeralParlorId: "",
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = (id: number) => {
        setAssets(assets.filter((asset) => asset.id !== id));
    };

    return (
        <div className="mt-6 max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Manage Assets</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Form */}
                <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Add New Asset</h2>
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
                                placeholder="Enter asset name"
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
                                placeholder="Enter asset description"
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
                                placeholder="Enter asset rate"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter quantity"
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

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Asset
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
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {assets.length > 0 ? assets.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{asset.name}</td>
                                        <td className="px-6 py-4">{asset.description || "-"}</td>
                                        <td className="px-6 py-4">{asset.rate?.toFixed(2) || "-"}</td>
                                        <td className="px-6 py-4">{asset.quantity || "-"}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(asset.id)}
                                                className="mr-3 text-red-600 hover:text-red-900"
                                            >
                                                <Trash size={16} />
                                            </button>
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <PenIcon size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-sm text-gray-400">
                                            No assets found
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
