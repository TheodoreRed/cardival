import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DescriptionTextArea from "./DescriptionTextArea";

describe("DescriptionTextArea", () => {
  test("renders with initial description and updates on change", () => {
    const setDescriptionMock = jest.fn();
    const initialDescription = "Initial description";

    render(
      <DescriptionTextArea
        description={initialDescription}
        setDescription={setDescriptionMock}
      />
    );

    const inputElement: HTMLTextAreaElement = screen.getByTestId(
      "descriptionTextArea"
    );
    expect(inputElement.value).toBe(initialDescription);

    const newDescription = "New Description";
    fireEvent.change(inputElement, { target: { value: newDescription } });

    expect(setDescriptionMock).toHaveBeenCalledWith(newDescription);
  });
});
