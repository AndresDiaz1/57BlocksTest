import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Home from "./page";
import { db } from "@/db/db";
import "@testing-library/jest-dom";

jest.mock("../hooks/useRedirectAccordingToLoginState");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../db/db", () => ({
  db: {
    users: {
      get: jest.fn(),
      add: jest.fn(),
    },
  },
}));

const mockDb = db as jest.Mocked<typeof db>;

describe("Home Component", () => {
  const mockRouterPush = jest.fn();
  const mockUserEmail = "test@example.com";
  const mockUserPassword = "password";

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("renders Home component correctly", () => {
    render(<Home />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("validates the form", () => {
    render(<Home />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(loginButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(loginButton).not.toBeDisabled();
  });

  it("authenticates the user and redirects to /home-list", async () => {
    const getSpy = jest.spyOn(mockDb.users, "get").mockResolvedValue({
      email: mockUserEmail,
      password: btoa(mockUserPassword),
      favorites: [],
    });

    render(<Home />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: mockUserEmail } });
    fireEvent.change(passwordInput, { target: { value: mockUserPassword } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalledWith({ email: mockUserEmail });
      expect(mockRouterPush).toHaveBeenCalledWith("/home-list");
    });
  });

  it("shows error message for incorrect credentials", async () => {
    (db.users.get as jest.Mock).mockResolvedValueOnce({
      email: mockUserEmail,
      password: btoa("wrongpassword"),
      favorites: [],
    });

    render(<Home />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: mockUserEmail } });
    fireEvent.change(passwordInput, { target: { value: mockUserPassword } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(db.users.get).toHaveBeenCalledWith({ email: mockUserEmail });
      expect(screen.getByText("*Incorrect credentials")).toBeInTheDocument();
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });

  it("creates a new user if it does not exist", async () => {
    const getSpy = jest.spyOn(mockDb.users, "get").mockResolvedValue(undefined);
    const addSpy = jest.spyOn(mockDb.users, "add").mockResolvedValue(undefined);

    render(<Home />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: mockUserEmail } });
    fireEvent.change(passwordInput, { target: { value: mockUserPassword } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getSpy).toHaveBeenCalledWith({ email: mockUserEmail });
      expect(addSpy).toHaveBeenCalledWith({
        email: mockUserEmail,
        password: btoa(mockUserPassword),
        favorites: [],
      });
      expect(mockRouterPush).toHaveBeenCalledWith("/home-list");
    });
  });
});
