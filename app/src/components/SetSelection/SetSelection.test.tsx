import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
jest.mock("../../config/config", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));
import { BrowserRouter as Router } from "react-router-dom";
import SetSelection from "./SetSelection";
import AuthContext from "../../context/AuthContext";
import { User } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { mockAccount, mockSetAccount, mockUser } from "../../test/testData";

describe("SetSelection Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <AuthContext.Provider
          value={{
            account: mockAccount,
            setAccount: mockSetAccount,
            user: mockUser as User,
          }}
        >
          <SetSelection />
        </AuthContext.Provider>
      </Router>
    );
  });

  it("should filter card sets based on input text", async () => {
    const filterInput = screen.getByTestId("filterInput");

    await userEvent.type(filterInput, "React");

    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.queryByText("Vue Basics")).not.toBeInTheDocument();
  });

  it("should display the modal when Add is clicked", async () => {
    fireEvent.click(screen.getByTestId("addSetSpanBtn"));

    await waitFor(() =>
      expect(screen.getByTestId("testModal")).toBeInTheDocument()
    );
  });

  it("should display the modal when plus(+) is clicked", async () => {
    fireEvent.click(screen.getByTestId("addSetBtn"));

    await waitFor(() =>
      expect(screen.getByTestId("testModal")).toBeInTheDocument()
    );
  });
});
