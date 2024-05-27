import { render, screen } from "@testing-library/react";
import Description from "@/components/description/description";
import "@testing-library/jest-dom";

describe("Description Component", () => {
  const mockProps = {
    name: "Pikachu",
    weight: 60,
    height: 4,
    types: [{ type: { name: "electric" } }],
    description: "An electric Pokémon with lots of spark!",
  };

  test("should render name", () => {
    render(<Description {...mockProps} />);
    const nameElement = screen.getByText(/Pikachu/i);
    expect(nameElement).toBeInTheDocument();
  });

  test("should render description", () => {
    render(<Description {...mockProps} />);
    const descriptionElement = screen.getByText(
      /An electric Pokémon with lots of spark!/i
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  test("should render weight", () => {
    render(<Description {...mockProps} />);
    const weightElement = screen.getByText(/Weight:/i);
    expect(weightElement).toBeInTheDocument();
    const weightValueElement = screen.getByText(/60lbs./i);
    expect(weightValueElement).toBeInTheDocument();
  });

  test("should render height", () => {
    render(<Description {...mockProps} />);
    const heightElement = screen.getByText(/Height:/i);
    expect(heightElement).toBeInTheDocument();
    const heightValueElement = screen.getByText(/4'/i);
    expect(heightValueElement).toBeInTheDocument();
  });

  test("should render types", () => {
    render(<Description {...mockProps} />);
    const typeLabelElement = screen.getByText(/Type/i);
    expect(typeLabelElement).toBeInTheDocument();
  });
});
