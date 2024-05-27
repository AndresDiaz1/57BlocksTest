"use client";
import "./paginator.css";

export default function Paginator({
  currentPage,
  limit = 20,
  total,
  onPageChange,
}: {
  currentPage: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  function range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, i) => i + start);
  }

  return (
    <ul className="paginator">
      {pages.map((page) => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
          data-testid="page-link"
        >
          <span className="paginator__page-link">{page}</span>
        </li>
      ))}
    </ul>
  );
}
