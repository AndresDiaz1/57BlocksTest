import { render, screen, fireEvent } from "@testing-library/react";
import Paginator from "@/components/paginator/paginator";

describe("Paginator Component", () => {
  test("should render pagination correctly", () => {
    const onPageChange = jest.fn();

    render(
      <Paginator
        currentPage={3}
        limit={20}
        total={100}
        onPageChange={onPageChange}
      />
    );

    const pageLinks = screen.getAllByTestId("page-link");
    expect(pageLinks).toHaveLength(4);
  });

  test("should call onPageChange when clicking on a page link", () => {
    const onPageChange = jest.fn();

    render(
      <Paginator
        currentPage={3}
        limit={20}
        total={100}
        onPageChange={onPageChange}
      />
    );

    const pageLink = screen.getByText("4");
    fireEvent.click(pageLink);

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
