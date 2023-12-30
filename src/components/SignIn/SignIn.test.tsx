import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import SignIn from "./SignIn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Page", () => {
  const queryClient = new QueryClient();

  it("renders a heading", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignIn />
      </QueryClientProvider>
    );

    const heading = screen.getAllByText(/sign in/i);

    expect(heading[0]).toBeInTheDocument();
  });
});
