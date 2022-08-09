import React from "react";
import Header from "./components/header";

export default function Skeleton({ children }) {
  return (
    <div className="ml-auto mb-6">
      <Header />

      <div className="px-6 pt-6">{children}</div>
    </div>
  );
}
