import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Test Modal component", () => {
  it("should not render the modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    );
    expect(screen.queryByTestId("testModal")).not.toBeInTheDocument();
  });

  it("should render the modal with children and close button when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Test Content</div>
      </Modal>
    );
    expect(screen.getByTestId("testModal")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByTestId("modalCloseBtn")).toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", async () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </Modal>
    );
    await userEvent.click(screen.getByTestId("modalCloseBtn"));
    expect(onClose).toHaveBeenCalled();
  });
});
