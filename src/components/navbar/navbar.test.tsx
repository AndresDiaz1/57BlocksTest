import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "@/components/navbar/navbar";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("NavBar Component", () => {
  it("should render navigation links correctly", () => {
    render(<NavBar />);

    routes.forEach((route) => {
      const link = screen.getByText(route.label);
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("tab");
    });
  });

  it("should handle logout click correctly", () => {
    const removeItemMock = jest.spyOn(
      window.localStorage.__proto__,
      "removeItem"
    );
    const pushMock = jest.fn();

    render(<NavBar />);

    const logoutButton = screen.getByAltText("logout");

    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);

    expect(removeItemMock).toHaveBeenCalledWith("pokedex-user");
  });
});
