import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { mockAccount, mockSetAccount, mockUser } from "../../test/testData";
import { User } from "firebase/auth";
import { signInWithGoogle } from "../../firebaseConfig";
import { navigateToCardSets } from "../../utils/navigateUtils";

jest.mock("../../config/config", () => ({
  config: {
    apiKey: "mockFirebaseKey",
  },
}));

jest.mock("../../firebaseConfig", () => ({
  signInWithGoogle: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../utils/navigateUtils", () => ({
  navigateToCardSets: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const accountExists = (hasAccount: boolean) => {
    if (hasAccount) {
      render(
        <Router>
          <AuthContext.Provider
            value={{
              account: mockAccount,
              setAccount: mockSetAccount,
              user: mockUser as User,
            }}
          >
            <Home />
          </AuthContext.Provider>
        </Router>
      );
    } else {
      render(
        <Router>
          <AuthContext.Provider
            value={{
              account: null,
              setAccount: mockSetAccount,
              user: mockUser as User,
            }}
          >
            <Home />
          </AuthContext.Provider>
        </Router>
      );
    }
  };

  it("renders without crashing", () => {
    accountExists(false);
    expect(screen.getByTestId("testHome")).toBeInTheDocument();
  });

  it("calls signInWithGoogle on click", async () => {
    accountExists(false);

    fireEvent.click(screen.getByTestId("googleSignInButton"));
    await waitFor(() => expect(signInWithGoogle).toHaveBeenCalled());
  });

  it("navigates to card-sets when account is present", async () => {
    accountExists(true);
    expect(navigateToCardSets).toHaveBeenCalled();
  });

  it("does not navigate when account is null", async () => {
    accountExists(false);
    expect(navigateToCardSets).not.toHaveBeenCalled();
  });
});
