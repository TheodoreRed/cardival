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
import CardSet from "../../models/Card/CardSet";
import Card from "../../models/Card/Card";
import { User } from "firebase/auth";

describe("SetSelection Component", () => {
  const mockUser = {
    uid: "user123",
    displayName: "John Doe",
    email: "john.doe@example.com",
    photoURL: "https://example.com/photo.jpg",
  } as Partial<User>;
  const mockCards: Card[] = [
    {
      id: "card1",
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces",
      attempts: 5,
      successes: 3,
      failures: 2,
    },
  ];

  const mockSetAccount = jest.fn();

  const mockCardSets: CardSet[] = [
    {
      title: "React Basics",
      description: "Introduction to React concepts",
      cards: mockCards,
      quizzes: ["quiz1"],
    },
  ];

  const mockAccount = {
    _id: "1",
    uid: "user123",
    displayName: "John Doe",
    photoURL: "https://example.com/photo.jpg",
    email: "john.doe@example.com",
    cardSets: mockCardSets,
  };

  it("should display the modal when Add is clicked", async () => {
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

    fireEvent.click(screen.getByTestId("addSetSpanBtn"));
    await waitFor(() =>
      expect(screen.getByTestId("testModal")).toBeInTheDocument()
    );
  });
});
