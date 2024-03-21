import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "../store/store";
import RegisterForm from "../../features/auth/RegisterForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("RegisterForm component", () => {
  it("submits the form with valid data", async () => {
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    const { getByLabelText, getByText, queryByText } = render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );

    fireEvent.change(getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(getByLabelText("Last name"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Display Name"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "password" },
    });

    fireEvent.click(getByText("Create account"));

    await waitFor(() => {
      expect(
        queryByText("Your account has been created successfully")
      ).toBeTruthy();
    });
  });
});
