import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ItemBuilder } from "../../../../tests/builders";
import { messages } from "../../../../messages";
import { List } from "./List";
import { Item } from "../../../../domain";

describe("List should", () => {
  it("show a list of items separated by categories", () => {
    const items = Array(3).map(ItemBuilder.random);
    render(<List items={items} />);

    items.forEach((item) => {
      screen.getByText(item.name);
      screen.getByText(item.category.name);
    });
  });

  it("show a message if there is no items to show", () => {
    render(<List items={[]} />);

    screen.getByText(messages.emptyList);
  });
  describe("show the amount of items passed", () => {
    it("if multiple items are passed", () => {
      const items = Array(3).map(ItemBuilder.random);
      render(<List items={items} />);

      screen.getByText(`${items.length} items`);
    });

    it("if one item is passed", () => {
      const items = Array(1).map(ItemBuilder.random);
      render(<List items={items} />);

      screen.getByText(`1 item`);
    });
  });

  it("don't show the amount of items if the given list is empty", () => {
    const items = [] as Array<Item>;
    render(<List items={items} />);

    expect(screen.queryByText(items.length)).not.toBeInTheDocument();
  });
});
