import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./slices/userSlice";
import funeralParlorSlice from "./slices/funeralParlorSlice";
import serviceSlice from "./slices/servicesSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        funeralParlors: funeralParlorSlice,
        services: serviceSlice,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;