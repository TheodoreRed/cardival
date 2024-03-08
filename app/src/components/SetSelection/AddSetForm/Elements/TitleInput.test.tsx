import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleInput from "./TitleInput";

describe("TitleInput", () => {
  test("renders with initial title and updates on change", () => {
    const setTitleMock = jest.fn();
    const checkForDuplicateTitleMock = jest.fn();
    const initialTitle = "Initial Title";

    render(
      <TitleInput
        title={initialTitle}
        setTitle={setTitleMock}
        checkForDuplicateTitle={checkForDuplicateTitleMock}
      />
    );

    const inputElement: HTMLInputElement = screen.getByTestId("titleInput");
    expect(inputElement.value).toBe(initialTitle);

    const newTitle = "New Title";
    fireEvent.change(inputElement, { target: { value: newTitle } });

    expect(setTitleMock).toHaveBeenCalledWith(newTitle);

    expect(checkForDuplicateTitleMock).toHaveBeenCalledWith(newTitle);
  });
});
