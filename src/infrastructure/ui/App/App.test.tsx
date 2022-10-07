import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Groceries list App should", () => {
  it("renders app name", () => {
    render(<App />);

    screen.getByText(/Groceries list/);
  });
});
