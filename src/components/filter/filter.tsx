"use client";
import { ChangeEvent, useState } from "react";
import "./filter.css";
export default function Filter({
  onFilterChange,
}: {
  onFilterChange: (filter: string) => void;
}) {
  const [filter, setFilter] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter(value);
    onFilterChange(value);
  };
  return (
    <div className="filter">
      <input
        value={filter}
        className="filter__form-input"
        type="text"
        placeholder="Filter by Pokemon's name"
        onChange={handleChange}
      />
    </div>
  );
}
