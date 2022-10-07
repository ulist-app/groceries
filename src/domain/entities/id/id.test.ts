import { describe, expect, it } from "vitest";
import { Id } from "./id";

describe("Id should", () => {
  it("be created successfully", () => {
    expect(new Id("irrelevant").value).toBe("irrelevant");
  });
  it("be created with default value as uuid", () => {
    const id = new Id();

    expect(id.value).toMatch(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
  });
  it("parse value to text", () => {
    expect(new Id("irrelevant").toString()).toBe("irrelevant");
  });
});
