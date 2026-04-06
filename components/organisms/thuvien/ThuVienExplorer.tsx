"use client";

import { useState } from "react";

import ThuVienBento from "./ThuVienBento";
import ThuVienHeader from "./ThuVienHeader";

export default function ThuVienExplorer() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <ThuVienHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ThuVienBento searchTerm={searchTerm} />
    </>
  );
}
