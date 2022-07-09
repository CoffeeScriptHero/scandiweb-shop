import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../components/Header/headerSlice";

export default configureStore({
  reducer: {
    header: headerReducer,
  },
});
