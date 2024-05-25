"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navbar.css";
import { routes } from "@/routes";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/" && (
        <nav className="tab-bar">
          {routes.map((route) => (
            <Link href={route.path} key={route.path}>
              <span
                className={`tab ${pathname === route.path ? "active-tab" : ""}`}
              >
                {route.label}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
