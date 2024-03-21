import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../../features/auth/LoginForm";

describe("LoginForm component", () => {
  it("renders the login form correctly", () => {
    render(<LoginForm />);

    // Check if email and password inputs are rendered
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    // Check if the login button is rendered
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<LoginForm />);

    // Fill in email and password fields
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Click the login button
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Wait for the submission to complete
    await waitFor(() => {
      // Check if the form submission has been successful
      // Here you can expect actions that should occur after successful login
      // For example, navigating to a new page or closing a modal
    });

    // Add your assertions here to verify the behavior after successful login
  });

  // Add more test cases as needed
});
