import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { messages } from "../../../../messages";
import { Menu, MenuProps, Views } from "./Menu";

describe("Menu should", () => {
  it.each([
    { action: "go to all items list", label: messages.menu.allItemsListCTA },
    { action: "go to buy list", label: messages.menu.requiredListCTA },
    {
      action: "go to mandatory buy list",
      label: messages.menu.mandatoryListCTA,
    },
    { action: "enable search", label: messages.menu.searchCTA },
  ])("show an option for $action", ({ label }) => {
    const props = buildMenuProps();
    render(<Menu {...props} />);

    screen.getByLabelText(label);
  });
  it.each([
    {
      action: "send user to all items list",
      label: messages.menu.allItemsListCTA,
      expectedView: Views.All,
    },
    {
      action: "send user to buy list",
      label: messages.menu.requiredListCTA,
      expectedView: Views.Required,
    },
    {
      action: "send user to mandatory buy list",
      label: messages.menu.mandatoryListCTA,
      expectedView: Views.Mandatory,
    },
  ])("$action", async ({ label, expectedView }) => {
    const props = buildMenuProps();
    render(<Menu {...props} />);

    await userEvent.click(screen.getByLabelText(label));

    expect(props.setView).toHaveBeenCalledWith(expectedView);
  });

  it("not show search bar if search is not enabled", () => {
    const props = buildMenuProps();
    render(<Menu {...props} />);

    expect(screen.queryByLabelText(messages.search.searchInput)).toBeNull();
  });

  it("search items if search is enabled", async () => {
    const text = "irrelevant";
    const props = buildMenuProps();
    render(<Menu {...props} />);

    await userEvent.click(screen.getByLabelText(messages.menu.searchCTA));
    await userEvent.type(
      screen.getByLabelText(messages.search.searchInput),
      text
    );

    expect(props.onSearch).toHaveBeenCalledWith(text);
  });

  it("disable search", async () => {
    const props = buildMenuProps();
    render(<Menu {...props} />);

    await userEvent.click(screen.getByLabelText(messages.menu.searchCTA));
    screen.getByLabelText(messages.search.searchInput);
    await userEvent.click(screen.getByLabelText(messages.search.closeCTA));

    expect(
      screen.queryByLabelText(messages.search.searchInput)
    ).not.toBeInTheDocument();
  });
});

function buildMenuProps(activeView = Views.All): MenuProps {
  return {
    activeView,
    onSearch: vi.fn(),
    setView: vi.fn(),
  };
}
