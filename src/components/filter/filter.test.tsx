import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "@/components/filter/filter";
import "@testing-library/jest-dom";

describe("Filter Component", () => {
  test("should render input element", () => {
    render(<Filter onFilterChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText(
      /Filter by Pokemon's name/i
    );
    expect(inputElement).toBeInTheDocument();
  });

  test("should update filter value on input change", () => {
    render(<Filter onFilterChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText(
      /Filter by Pokemon's name/i
    );
    fireEvent.change(inputElement, { target: { value: "Pikachu" } });
    expect(inputElement).toHaveValue("Pikachu");
  });

  test("should call onFilterChange with correct value on input change", () => {
    const mockOnFilterChange = jest.fn();
    render(<Filter onFilterChange={mockOnFilterChange} />);
    const inputElement = screen.getByPlaceholderText(
      /Filter by Pokemon's name/i
    );
    fireEvent.change(inputElement, { target: { value: "Pikachu" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("Pikachu");
  });
});
