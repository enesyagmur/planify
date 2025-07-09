"use client";
import { Provider } from "react-redux";
import { store } from "../../store";
import AuthListener from "./AuthListener";

export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <AuthListener />
      {children}
    </Provider>
  );
}
