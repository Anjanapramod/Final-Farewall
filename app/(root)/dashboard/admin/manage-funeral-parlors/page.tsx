"use client";

import { FuneralParlor } from "@/app/helpers/types/funeralParlor.type";
import {
    getFuneralParlor,
    postFuneralParlor,
} from "@/app/store/slices/funeralParlorSlice";
import { AppDispatch } from "@/app/store/store";
import { RootState } from "@/app/store/store";
import { PenIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ManageFuneralParlors() {
    const dispatch = useDispatch<AppDispatch>();
    const { funeralParlors } = useSelector(
        (state: RootState) => state.funeralParlors
    );
    const { error, message } = useSelector(
        (state: RootState) => state.funeralParlors
    );

    const { user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        console.log("GET FUNERAL PARLORS: useEffect()");
        dispatch(getFuneralParlor());
    }, []);

    useEffect(() => {
        if (error)
            toast.error(error);
        if (!error && message)
            toast.success(message);
       
    }, [message, error]);

    const [formData, setFormData] = useState<FuneralParlor>({
        name: "",
        description: "",
        contact: "",
        location: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Handle submit");
        console.log(formData);
        console.log(user);

        if (!user) {
            console.log("User not found");
            alert("User not found");
            return;
        }
        const data: FuneralParlor = {
            ...formData,
            userId: user?.id,
        };

        dispatch(postFuneralParlor(data)).then(() => {
            dispatch(getFuneralParlor());
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = (id: number) => {
        console.log("Delete funeral parlor with id: ", id);
    };

    return (
        <div className="mt-6 max-w-7xl max-h-fit mx-auto px-4 py-8">
            
            <h1 className="text-3xl font-bold mb-8">Manage Funeral Parlors</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Form */}
                <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Add New Funeral Parlor</h2>
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
                                placeholder="Enter parlor name"
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
                                placeholder="Enter description"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contact"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Contact
                            </label>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter contact information"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter location"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Funeral Parlor
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {funeralParlors && funeralParlors.length > 0 ? (
                                    funeralParlors.map((parlor: FuneralParlor) => (
                                        <tr key={parlor.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {parlor.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500">
                                                    {parlor.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {parlor.contact}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {parlor.location}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(parlor.id ? parlor.id : 0)
                                                    }
                                                    className="mr-3 text-red-600 hover:text-red-900 hover:bg-red-300  rounded-full p-1 focus:outline-none focus:underline"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                                <button className="text-blue-600 hover:text-blue-900 hover:bg-blue-300 rounded-full p-1 focus:outline-none focus:underline">
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
                                            No funeral parlors found
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
