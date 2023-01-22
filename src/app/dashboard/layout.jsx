"use client";
import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";

export default function DashboardRootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
