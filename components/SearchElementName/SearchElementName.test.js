import { render, screen } from "@testing-library/react";
import SearchElementName from "./SearchElementName";

describe("SearchElementName", () => {
  test("renders the search input field", () => {
    render(
      <SearchElementName
        onSelectUser={jest.fn()}
        query=""
        setQuery={jest.fn()}
        resetOtherQuery={jest.fn()}
      />
    );

    expect(
      screen.getByPlaceholderText("Search by Name...")
    ).toBeInTheDocument();
  });
});
