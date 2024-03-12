import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import NavigationButton from "./NavigationButton";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

describe("NavigationButton", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    render(<NavigationButton icon={faArrowRight} onClick={() => {}} />);
    expect(screen.getByTestId("navigationBtn")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = jest.fn();
    render(<NavigationButton icon={faArrowRight} onClick={handleClick} />);
    await userEvent.click(screen.getByTestId("navigationBtn"));

    await waitFor(() => expect(handleClick).toHaveBeenCalledTimes(1));
  });

  it("applies rotation style when isRotated is true", () => {
    render(
      <NavigationButton
        icon={faArrowRight}
        onClick={() => {}}
        isRotated={true}
      />
    );
    const button = screen.getByTestId("navigationBtn");
    expect(button).toHaveStyle("transform: rotate(180deg)");
  });

  it("does not apply rotation style when isRotated is false", () => {
    const handleClick = jest.fn();
    render(<NavigationButton icon={faArrowRight} onClick={handleClick} />);
    fireEvent.click(screen.getByTestId("navigationBtn"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
