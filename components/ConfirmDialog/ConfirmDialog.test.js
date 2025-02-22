import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  test("Component render", () => {
    render(
      <ConfirmDialog
        userId={1}
        setActiveStatus={jest.fn()}
        onConfirm={jest.fn()}
      />
    );
    expect(screen.getByText(/ARE YOU SURE/i)).toBeInTheDocument();
  });
});
