import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SingleCardSet from "./SingleCardSet";
import CardSet from "../../../models/Card/CardSet";

describe("SingleCardSet", () => {
  const cardSetMock: CardSet = {
    title: "Test Title",
    description: "Test Description",
    cards: [],
    quizzes: [],
  };

  it("renders without crashing", () => {
    render(<SingleCardSet cardSet={cardSetMock} />);
    expect(screen.getByTestId("cardSetTitle")).toHaveTextContent("Test Title");
  });

  it("displays the card set title", () => {
    render(<SingleCardSet cardSet={cardSetMock} />);
    expect(screen.getByTestId("cardSetTitle")).toHaveTextContent(
      cardSetMock.title
    );
  });

  it("should display card set description", () => {
    render(<SingleCardSet cardSet={cardSetMock} />);
    expect(screen.getByTestId("cardSetDescription")).toBeInTheDocument();
  });

  it("should not display card set description", () => {
    const cardSetNoDescription = { ...cardSetMock, description: "" };
    render(<SingleCardSet cardSet={cardSetNoDescription} />);
    expect(screen.queryByTestId("cardSetDescription")).not.toBeInTheDocument();
  });
});
