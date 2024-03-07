import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import AddSetForm from "./AddSetForm";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

// Mock the useCardSetForm hook
jest.mock("./useCardSetForm", () => ({
  useCardSetForm: () => {
    const [mockTitle, setMockTitle] = useState(""); // Using React's useState for simplicity in the example

    return {
      title: mockTitle,
      setTitle: (newTitle: string) => setMockTitle(newTitle), // Simplified state management simulation
      description: "",
      setDescription: jest.fn(),
      errorMsg: "",
      isDuplicate: false,
      checkForDuplicateTitle: jest.fn(),
      submitHandler: jest.fn(),
    };
  },
}));

describe("AddSetForm with TypeScript", () => {
  it("renders correctly without crashing", () => {
    render(<AddSetForm setDisplayModal={jest.fn()} />);
  });

  it("disables SubmitButton when either title is empty or there is a duplicate", () => {
    const component = render(<AddSetForm setDisplayModal={jest.fn()} />);
    const submitButton = component.getByTestId(
      "submitButton"
    ) as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it("enables submit button when there is a title", async () => {
    const component = render(<AddSetForm setDisplayModal={jest.fn()} />);
    const titleInput = component.getByTestId("titleInput");
    await userEvent.type(titleInput, "title example");
    await waitFor(() => {
      const submitButton = component.getByTestId(
        "submitButton"
      ) as HTMLButtonElement;
      expect(submitButton.disabled).toBe(false);
    });
  });
});
