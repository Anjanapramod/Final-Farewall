"use client";

import { PenIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import {
  getAssetByFuneralParlorId,
  postAsset,
  deleteById,
  updateAsset,
} from "@/app/store/slices/assetSlice";
import { Asset } from "@/app/helpers/types/asset.type";
import { FuneralParlor } from "@/app/helpers/types/funeralParlor.type";

export default function ManageAssets() {
  const [formData, setFormData] = useState<Asset>({
    id: 0,
    name: "",
    description: "",
    rate: 0,
    quantity: 0,
    funeralParlorId: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [editMode, setEditMode] = useState(false);
  const [currentAssetId, setCurrentAssetId] = useState<number | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { assets } = useSelector((state: RootState) => state.assets);

  useEffect(() => {
    const funeralParlor = localStorage.getItem("funeralParlor")
      ? JSON.parse(localStorage.getItem("funeralParlor") as string)
      : null;
    if (funeralParlor?.id) {
      setFormData((prev) => ({ ...prev, funeralParlorId: funeralParlor.id }));
      if (funeralParlor && funeralParlor.id) {
        dispatch(getAssetByFuneralParlorId(funeralParlor.id));
      }
    }
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rate" || name === "quantity" ? Number(value) : value,
    }));

    // Clear errors for valid inputs
    if ((name === "rate" || name === "quantity") && Number(value) > 0) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }

    if (formData.rate <= 0) {
      newErrors.rate = "Rate must be a positive number.";
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    const funeralParlor: FuneralParlor | null = localStorage.getItem(
      "funeralParlor"
    )
      ? JSON.parse(localStorage.getItem("funeralParlor") as string)
      : null;
    try {
      console.log("FuneralParlor:", funeralParlor);
      if (editMode && currentAssetId !== null) {
        console.log("Edit mode is enabled");
        dispatch(
          updateAsset({
            ...formData,
            id: currentAssetId,
            funeralParlorId: funeralParlor?.id,
          })
        ).then(() => {
          dispatch(getAssetByFuneralParlorId(funeralParlor?.id || 0));
          alert("Asset updated successfully");
        });
      } else {
        if (funeralParlor && funeralParlor.id) {
          await dispatch(
            postAsset({ ...formData, funeralParlorId: funeralParlor.id })
          ).unwrap();
          dispatch(getAssetByFuneralParlorId(funeralParlor?.id || 0));
        }
      }

      resetForm();
    } catch (error) {
      console.error("Failed to save asset:", error);
    }
  };

  const handleEdit = (asset: Asset) => {
    setFormData({
      id: asset.id || 0,
      name: asset.name,
      description: asset.description || "",
      rate: asset.rate || 0,
      quantity: asset.quantity || 0,
    });
    setEditMode(true);
    setCurrentAssetId(asset.id || null);
  };

  const handleDelete = (id: number) => {
    console.log("DELETE API CALL");
    dispatch(deleteById(id))
      .unwrap()
      .then(() => {
        console.log("DELETE ASSET SUCCESS");
        refreashAssets();
      })
      .catch((error) => {
        console.error("Error deleting asset:", error);
      });
  };

  const refreashAssets = () => {
    // Retrieve funeralParlor from localStorage
    const funeralParlor: FuneralParlor | null = localStorage.getItem(
      "funeralParlor"
    )
      ? JSON.parse(localStorage.getItem("funeralParlor") as string)
      : null;

    if (funeralParlor && funeralParlor.id) {
      dispatch(getAssetByFuneralParlorId(funeralParlor.id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      rate: 0,
      quantity: 0,
    });
    setErrors({});
    setEditMode(false);
    setCurrentAssetId(null);
  };

  return (
    <div className="container max-w-7xl min-h-fit p-6 mx-auto">
      <h1 className="text-4xl font-bold mb-8">Manage Assets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? "Edit Asset" : "Add New Asset"}
          </h2>
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
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
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
              {errors.rate && (
                <p className="text-red-500 text-sm">{errors.rate}</p>
              )}
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
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {editMode ? "Update Asset" : "Add Asset"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="border w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Cancel Edit
              </button>
            )}
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
                {assets && assets.length > 0 ? (
                  assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{asset.name}</td>
                      <td className="px-6 py-4">{asset.description || "-"}</td>
                      <td className="px-6 py-4">
                        {asset.rate?.toFixed(2) || "-"}
                      </td>
                      <td className="px-6 py-4">{asset.quantity || "-"}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="mr-3 text-red-600 hover:text-red-900">
                          <Trash
                            onClick={() => {
                              handleDelete(asset.id ? asset.id : 0);
                            }}
                            size={16}
                          />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <PenIcon
                            onClick={() => handleEdit(asset)}
                            size={16}
                          />
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
