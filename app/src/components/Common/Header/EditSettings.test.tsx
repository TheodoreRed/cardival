import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditSettings from "./EditSettings";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../../config/config", () => ({
  config: {
    apiKey: "mockFirebaseKey",
  },
}));

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

describe("Tests for EditSettings", () => {
  it("should render without crashing", () => {
    render(
      <Router>
        <EditSettings setDisplayModal={jest.fn()} />
      </Router>
    );
    expect(screen.getByText("Set Title:")).toBeInTheDocument();
  });

  it("updates title and description on input change", async () => {
    render(
      <Router>
        <EditSettings setDisplayModal={jest.fn()} />
      </Router>
    );

    const titleInput: HTMLInputElement =
      screen.getByTestId("editSetTitleInput");
    const descriptionTextarea: HTMLTextAreaElement = screen.getByTestId(
      "editSetDescriptionInput"
    );
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "New Title");
    await userEvent.type(descriptionTextarea, "New Description");

    expect(titleInput.value).toBe("New Title");
    expect(descriptionTextarea.value).toBe("New Description");
  });

  it("returns a loading element when activeSet is null", () => {
    require("../../../hooks/useCardSet").useCardSet.mockImplementation(() => ({
      activeSet: null,
      setActiveSet: jest.fn(),
    }));
    render(
      <Router>
        <EditSettings setDisplayModal={jest.fn()} />
      </Router>
    );

    expect(screen.getByTestId("editSettingsLoading")).toBeInTheDocument();
  });
});
