import { render, screen, waitFor, act } from "@testing-library/react";
import Home from "./page";

test("renders homepage without errors and loading spinner", async () => {
  await act(async () => {
    render(<Home />);
  });

  expect(screen.getByText("+ Add User")).toBeInTheDocument();
});
