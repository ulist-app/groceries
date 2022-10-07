import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ItemBuilder } from "../../../../tests/builders";
import { messages } from "../../../../messages";
import { List } from "./List";

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
});
