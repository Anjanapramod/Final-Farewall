"use client";
import { findFuneralParlorByUserId } from "@/app/store/slices/funeralParlorSlice";
import { RootState } from "@/app/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (user?.id) {
            dispatch(findFuneralParlorByUserId(user.id));
        }
    }, [user?.id, dispatch]);

    return (
        <div className="grid grid-cols-12 min-h-full border gap-4">
            Dashboard
        </div >
    );
};

export default Page;
