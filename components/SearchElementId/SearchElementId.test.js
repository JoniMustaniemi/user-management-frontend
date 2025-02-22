import { render, screen } from "@testing-library/react";
import SearchElementId from "./SearchElementId";

describe("SearchElementId", () => {
  test("renders the search input field", () => {
    render(
      <SearchElementId
        query=""
        setQuery={jest.fn()}
        onSelectUser={jest.fn()}
        resetOtherQuery={jest.fn()}
      />
    );

    expect(
      screen.getByPlaceholderText("Search by User ID...")
    ).toBeInTheDocument();
  });
});
