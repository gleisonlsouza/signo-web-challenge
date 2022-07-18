import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import pollsReducer from "./slices/pollsSlice";

export const store = configureStore({
  reducer: {
    polls: pollsReducer,
    auth: authReducer,
    user: userReducer,
  },
});
