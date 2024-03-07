import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FilterInput from "./FilterInput";

describe("FilterInput", () => {
  it("should render without crashing", () => {
    render(<FilterInput inputText="" setInputText={() => {}} />);
    const inputElement = screen.getByTestId("filterInput");
    expect(inputElement).toBeInTheDocument();
  });

  it("should update when the input changes", async () => {
    const setInputTextMock = jest.fn();

    render(<FilterInput inputText="" setInputText={setInputTextMock} />);
    const inputElement = screen.getByTestId("filterInput");
    await userEvent.type(inputElement, "test");

    expect(setInputTextMock).toHaveBeenCalledWith("t");
    expect(setInputTextMock).toHaveBeenCalledWith("e");
    expect(setInputTextMock).toHaveBeenCalledWith("s");
    expect(setInputTextMock).toHaveBeenCalledWith("t");
  });

  it("should handle input clearing correctly", async () => {
    const setInputTextMock = jest.fn();
    render(<FilterInput inputText="initial" setInputText={setInputTextMock} />);
    const inputElement = screen.getByTestId("filterInput");

    await userEvent.clear(inputElement);

    expect(setInputTextMock).toHaveBeenCalledWith("");
  });

  it("should display the initial input text", () => {
    const initialText = "some text";
    render(<FilterInput inputText={initialText} setInputText={() => {}} />);
    const inputElement: HTMLInputElement = screen.getByTestId("filterInput");
    expect(inputElement.value).toBe(initialText);
  });
});
