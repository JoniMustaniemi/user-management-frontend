import { render } from "@testing-library/react";
import Paginator from "./Paginator";

describe("Paginator", () => {
  test("renders without crashing", () => {
    render(
      <Paginator currentPage={1} totalPages={5} onPageChange={jest.fn()} />
    );
  });
});
