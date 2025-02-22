import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "./UserCard";

describe("UserCard", () => {
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  const user = {
    id: 1,
    name: "John Doe",
    title: "Software Engineer",
    email: "john.doe@example.com",
    catchphrase: "Code is life",
    image: "https://example.com/image.jpg",
  };

  test("renders user card with user details", () => {
    render(
      <UserCard
        user={user}
        index={0}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("ID (1)")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Code is life")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
  });
});
