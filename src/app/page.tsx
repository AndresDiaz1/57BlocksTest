"use client";
import { FormEvent, useState } from "react";
import "./page.css";
import { useRouter } from "next/navigation";
import useRedirectAccordingToLoginState from "@/hooks/useRedirectAccordingToLoginState";
import { db } from "@/db/db";

export default function Home() {
  useRedirectAccordingToLoginState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const isValidUser = async () => {
    const user = await db.users.get({ email });
    if (user) {
      return atob(user.password) === password;
    }

    await db.users.add({ email, password: btoa(password), favorites: [] });
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userIsValid = await isValidUser();
    if (userIsValid) {
      setIsLoggedIn(true);
      setIsErrorMessageVisible(false);
      localStorage.setItem("pokedex-user", JSON.stringify({ email }));
      router.push("/home-list");
    } else {
      setIsErrorMessageVisible(true);
    }
  };

  return (
    <div className="login">
      {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isErrorMessageVisible && (
            <span className="error-message">*Incorrect credentials</span>
          )}
          <button type="submit" disabled={!validateForm()}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}
