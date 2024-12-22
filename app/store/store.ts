import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./slices/userSlice";
import funeralParlorSlice from "./slices/funeralParlorSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        funeralParlors: funeralParlorSlice,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;