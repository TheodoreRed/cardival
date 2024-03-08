import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubmitButton from "./SubmitButton";

describe("SubmitButton", () => {
  it("is disabled when isDisabled is true", () => {
    render(<SubmitButton isDisabled={true} />);
    const button = screen.getByTestId("submitButton");
    expect(button).toBeDisabled();
  });

  it("is enabled when isDisabled is false", () => {
    render(<SubmitButton isDisabled={false} />);
    const button = screen.getByTestId("submitButton");
    expect(button).toBeEnabled();
  });
});
