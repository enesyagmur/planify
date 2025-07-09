"use client";
import { Provider } from "react-redux";
import { store } from "../../store";

export default function ClientLayout({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
