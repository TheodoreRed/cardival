import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewSet from "./ViewSet";
import userEvent from "@testing-library/user-event";

jest.mock("../../../hooks/useCardSet", () => ({
  useCardSet: jest.fn(() => ({
    activeSet: {
      title: "Test Card Set",
      cards: [
        { question: "Test Question 1", answer: "Test Answer 1" },
        { question: "Test Question 2", answer: "Test Answer 2" },
      ],
    },
    setActiveSet: jest.fn(),
  })),
}));

describe("ViewSet component", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    render(<ViewSet />);
    expect(screen.getByTestId("viewSetTest")).toBeInTheDocument();
  });

  it("displays the question and not the answer when not flipped", () => {
    render(<ViewSet />);
    expect(screen.getByTestId("cardText")).toHaveTextContent("Test Question 1");
    expect(screen.getByTestId("cardText")).not.toHaveTextContent(
      "Test Answer 1"
    );
  });

  it("displays the answer and not the question when flipped", async () => {
    render(<ViewSet />);

    const navigationButtons = await screen.findAllByTestId("navigationBtn");
    const flipButton = navigationButtons[1];
    await userEvent.click(flipButton);

    expect(screen.getByTestId("cardText")).toHaveTextContent("Test Answer 1");
    expect(screen.getByTestId("cardText")).not.toHaveTextContent(
      "Test Question 1"
    );
  });
});
