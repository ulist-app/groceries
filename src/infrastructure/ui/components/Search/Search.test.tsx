import { describe, expect, it, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { messages } from "../../../../messages";
import { Search } from "./Search";

describe("Search input should", () => {
  it("emit input changes", async () => {
    const text = "irrelevant";
    const props = { onChange: vi.fn(), onClose: vi.fn() };
    render(<Search {...props} />);

    const search = screen.getByLabelText(messages.search.searchInput);
    await userEvent.type(search, text);

    expect(props.onChange).toHaveBeenCalledWith(text);
  });

  it("emit input closes when input has no value and button is clicked", async () => {
    const props = { onChange: vi.fn(), onClose: vi.fn() };
    render(<Search {...props} />);

    const closeButton = screen.getByLabelText(messages.search.closeCTA);
    await userEvent.click(closeButton);

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("reset search value when input has value and button is clicked", async () => {
    const text = "irrelevant";
    const props = { onChange: vi.fn(), onClose: vi.fn() };
    render(<Search {...props} />);

    const search = screen.getByLabelText(messages.search.searchInput);
    await userEvent.type(search, text);
    expect(search.outerHTML).toContain(`value="${text}"`);
    const resetButton = screen.getByLabelText(messages.search.resetCTA);
    await userEvent.click(resetButton);

    expect(search.outerHTML).toContain('value=""');
    expect(props.onClose).not.toHaveBeenCalled();
  });
});
