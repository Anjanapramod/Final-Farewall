import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./slices/userSlice";
import funeralParlorSlice from "./slices/funeralParlorSlice";
import serviceSlice from "./slices/servicesSlice";
import assetSlice from "./slices/assetSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        funeralParlors: funeralParlorSlice,
        services: serviceSlice,
        assets: assetSlice,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;