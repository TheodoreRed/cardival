import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import AddSetForm from "./AddSetForm";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

const mockSubmitHandler = jest.fn();

// Mock the useCardSetForm hook
jest.mock("./useCardSetForm", () => ({
  useCardSetForm: () => {
    const [mockTitle, setMockTitle] = useState("");
    const [isDuplicate, setIsDuplicate] = useState(false);

    const setTitle = (newTitle: string) => {
      if (newTitle === "duplicate title example") {
        setIsDuplicate(true);
      } else {
        setIsDuplicate(false);
      }
      setMockTitle(newTitle);
    };

    return {
      title: mockTitle,
      setTitle,
      description: "",
      setDescription: jest.fn(),
      errorMsg: isDuplicate ? "Name already in use: Please choose another" : "",
      isDuplicate,
      checkForDuplicateTitle: jest.fn(),
      submitHandler: mockSubmitHandler,
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

  it("displays an error and disables the submit button when the title is a duplicate", async () => {
    const mockDisplayModal = jest.fn();
    const component = render(<AddSetForm setDisplayModal={mockDisplayModal} />);

    const titleInput = component.getByTestId("titleInput");
    await userEvent.type(titleInput, "duplicate title example");

    const submitButton = component.getByTestId(
      "submitButton"
    ) as HTMLButtonElement;

    await waitFor(() => {
      expect(component.getByTestId("errorElement")).toBeInTheDocument();
      expect(submitButton.disabled).toBe(true);
    });
  });

  it("calls submitHandler when the submit button is clicked with a valid title", async () => {
    const mockDisplayModal = jest.fn();
    const component = render(<AddSetForm setDisplayModal={mockDisplayModal} />);

    // Fill in the title input
    const titleInput = component.getByTestId("titleInput");
    await userEvent.type(titleInput, "valid title");

    // Select the form using its test ID and submit it
    const form = component.getByTestId("formElement");
    fireEvent.submit(form); // This directly triggers form submission

    // Alternatively, if userEvent.submit is not available or you prefer fireEvent:
    // fireEvent.submit(form);

    // Wait for expectations to ensure async actions have completed
    await waitFor(() => {
      // Verify that the submitHandler mock function was called
      expect(mockSubmitHandler).toHaveBeenCalled();
    });
  });
});
