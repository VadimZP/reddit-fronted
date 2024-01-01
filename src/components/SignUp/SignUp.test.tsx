import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SignUp from "./SignUp";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  };
}

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Sign Up component", () => {
  const queryClient = new QueryClient();

  it("renders it self", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>
    );

    const heading = screen.getAllByText(/sign up/i);

    expect(heading[0]).toBeInTheDocument();
  });

  it("renders email input", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>
    );

    const emailInput = screen.getByRole("textbox", { name: /email/i });

    expect(emailInput).toBeInTheDocument();
  });

  it("renders password input", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>
    );

    const passwordInput = screen.getByLabelText(/password/i);

    expect(passwordInput).toBeInTheDocument();
  });

  test("allows a user to enter a valid email", async () => {
    const { user } = setup(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>
    );

    const emailInput = screen.getByRole("textbox", { name: /email/i });

    await user.type(emailInput, "test@gmail.com");

    expect(emailInput).toHaveValue("test@gmail.com");
  });

  test("shows an error message for an invalid email", async () => {
    const { user } = setup(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>
    );

    const emailInput = screen.getByRole("textbox", { name: /email/i });

    await user.type(emailInput, "invalidemail.invalid");

    await userEvent.tab();

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  test("calls sign up button API request", async () => {
    const { user } = setup(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>
    );

    const emailInput = screen.getByRole("textbox", { name: /email/i });

    await user.type(emailInput, "test@gmail.com");

    const usernameInput = screen.getByLabelText(/username/i);

    await user.type(usernameInput, "testUserName");

    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(passwordInput, "testTest");

    const signUpBtn = screen.getByRole("button", { name: /sign up/i });

    await user.click(signUpBtn);

    await screen.findByRole("progressbar");
  });
});
