import { render, screen, fireEvent } from "@testing-library/react";
import EditingDialog from "./EditingDialog";
describe("EditingDialog", () => {
  const mockSetIsEditing = jest.fn();
  const mockOnConfirm = jest.fn();

  const user = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    title: "Developer",
    catchphrase: "Code is life",
  };

  beforeEach(() => {
    mockSetIsEditing.mockClear();
    mockOnConfirm.mockClear();
  });

  test("renders the EditingDialog component", () => {
    render(
      <EditingDialog
        user={user}
        setIsEditing={mockSetIsEditing}
        onConfirm={mockOnConfirm}
      />
    );

    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Catchphrase:/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/)).toBeInTheDocument();
  });

  test("can type into input fields", () => {
    render(
      <EditingDialog
        user={user}
        setIsEditing={mockSetIsEditing}
        onConfirm={mockOnConfirm}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name:/i), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "janesmith@example.com" },
    });

    expect(screen.getByLabelText(/Name:/i).value).toBe("Jane Smith");
    expect(screen.getByLabelText(/Email:/i).value).toBe(
      "janesmith@example.com"
    );
  });

  test("calls onConfirm and setIsEditing when Save is clicked", () => {
    render(
      <EditingDialog
        user={user}
        setIsEditing={mockSetIsEditing}
        onConfirm={mockOnConfirm}
      />
    );

    fireEvent.click(screen.getByText(/Save/));

    expect(mockOnConfirm).toHaveBeenCalledWith(1, {
      name: "John Doe",
      email: "johndoe@example.com",
      title: "Developer",
      catchphrase: "Code is life",
    });

    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
  });

  test("calls setIsEditing when Cancel is clicked", () => {
    render(
      <EditingDialog
        user={user}
        setIsEditing={mockSetIsEditing}
        onConfirm={mockOnConfirm}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/));

    expect(mockSetIsEditing).toHaveBeenCalledWith(false);

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });
});
