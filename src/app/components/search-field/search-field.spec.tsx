import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { SearchField } from "./search-field";

describe("Given the component SearchField", () => {
  const mockUpdateInputValue = jest.fn();
  describe("When typing in the input and waiting 300ms", () => {
    test("Then it should call updateInputValue", async () => {
      render(<SearchField updateInputValue={mockUpdateInputValue} />);
      const input = screen.getByPlaceholderText("search book");
      userEvent.type(input, "test");

      expect(screen.getByDisplayValue("test")).toBeInTheDocument();

      expect(mockUpdateInputValue).not.toHaveBeenCalledWith("test");

      await act(async () => {
        await new Promise((r) => setTimeout(r, 350));
      });

      expect(mockUpdateInputValue).toHaveBeenCalledWith("test");
    });
  });
});
