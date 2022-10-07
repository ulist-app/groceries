import { describe, expect, it } from "vitest";
import { palette } from "../../constants";
import { Id } from "../id";
import { Category } from "./category";

describe("Category should", () => {
  describe("be created", () => {
    it("successfully", () => {
      const id = new Id();
      const name = "irrelevant-name";
      const color = "tomato";

      const category = new Category({ id, name, color });

      expect(category.id).toEqual(id);
      expect(category.name).toBe(name);
      expect(category.color).toBe(color);
    });
    describe("with default", () => {
      const category = new Category();
      it("id as Id", () => {
        expect(category.id).toBeInstanceOf(Id);
      });
      it('name as "No Category"', () => {
        expect(category.name).toBe("No Category");
      });
      it("color as gray", () => {
        expect(category.color).toBe(palette.gray);
      });
    });
  });
});
