import { render, screen, fireEvent } from "@testing-library/react";
import ToggleSwitch from "./ToggleSwitch";

describe("ToggleSwitch", () => {
  test("renders the toggle switch", () => {
    render(
      <ToggleSwitch
        checked={false}
        onChange={jest.fn()}
        label="Enable feature"
        disabled={false}
      />
    );

    expect(screen.getByText("Enable feature")).toBeInTheDocument();
  });
});
