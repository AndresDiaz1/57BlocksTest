"use client";
import "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };
  return (
    <main>
      <div className="home">
        <h1>Welcome Home</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </main>
  );
}
