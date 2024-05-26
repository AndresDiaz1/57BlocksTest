"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import "./navbar.css";
import { routes } from "@/routes";
import Image from "next/image";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoutClick = () => {
    localStorage.removeItem("pokedex-user");
    router.push("/");
  };

  return (
    <>
      {pathname !== "/" && (
        <nav className="tab-bar">
          <div className="nav-container">
            {routes.map((route) => (
              <Link href={route.path} key={route.path}>
                <span
                  className={`tab ${
                    pathname === route.path ? "active-tab" : ""
                  }`}
                >
                  {route.label}
                </span>
              </Link>
            ))}
          </div>
          <Image
            className="logout"
            alt="logout"
            src={"/img/log-out.svg"}
            width={20}
            height={20}
            onClick={handleLogoutClick}
          />
        </nav>
      )}
    </>
  );
}
