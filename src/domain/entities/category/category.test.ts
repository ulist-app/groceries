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
      const icon = "⚙️";

      const category = new Category({ id, name, color, icon });

      expect(category.id).toEqual(id);
      expect(category.name).toBe(name);
      expect(category.color).toBe(color);
      expect(category.icon).toBe(icon);
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
      it("icon as 💩", () => {
        expect(category.icon).toBe("💩");
      });
    });
  });

  it("has title property based on name and icon", () => {
    const name = "irrelevant-name";
    const icon = "⚙️";

    const category = new Category({ name, icon });

    expect(category.title).toBe(`${icon} ${name}`);
  });
});
