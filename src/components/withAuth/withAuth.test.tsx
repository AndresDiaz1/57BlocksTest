import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import withAuth from "./withAuth";
import { isAuthenticated } from "@/utils/auth";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
jest.mock("../../utils/auth");

describe("withAuth", () => {
  const MockComponent = () => (
    <div data-testid="mock-component">Mock Component</div>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading message while checking authentication", async () => {
    (isAuthenticated as jest.Mock).mockResolvedValue(false);
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    const MockComponentWithAuth = withAuth(MockComponent);
    render(<MockComponentWithAuth />);
    expect(screen.getByText("checking authentication...")).toBeInTheDocument();
    await waitFor(() => {});
  });

  it("should render wrapped component if user is authenticated", async () => {
    (isAuthenticated as jest.Mock).mockResolvedValue(true);
    const MockComponentWithAuth = withAuth(MockComponent);
    render(<MockComponentWithAuth />);
    await waitFor(() => {});
    expect(screen.getByTestId("mock-component")).toBeInTheDocument();
  });

  it('should redirect to "/" if user is not authenticated', async () => {
    (isAuthenticated as jest.Mock).mockResolvedValue(false);
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    const MockComponentWithAuth = withAuth(MockComponent);
    render(<MockComponentWithAuth />);
    await waitFor(() => {});
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
