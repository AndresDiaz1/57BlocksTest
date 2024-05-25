"use client";
import { FormEvent, useEffect, useState } from "react";
import "./page.css";
import { useRouter } from "next/navigation";
import useRedirectAccordingToLoginState from "@/hooks/useRedirectAccordingToLoginState";

export default function Home() {
  useRedirectAccordingToLoginState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      // Simulate a login (normally you would have API calls here)
      localStorage.setItem("user", JSON.stringify({ email }));
      setIsLoggedIn(true);
      router.push("/home-list");
    }
  };

  return (
    <div className="login">
      {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={!validateForm()}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}
