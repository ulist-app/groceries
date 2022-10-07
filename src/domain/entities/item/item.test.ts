import { describe, expect, it } from "vitest";
import { Category, defaultCategory } from "../category";
import { Id } from "../id";
import { Item } from "./item";

describe("Item should", () => {
  const itemParams = {
    id: new Id(),
    name: "irrelevant-item",
    category: new Category({ name: "Default category" }),
    isRequired: true,
    isMandatory: false,
    quantity: 2,
  };

  describe("be created", () => {
    it("successfully", () => {
      const item = new Item(itemParams);

      expect(item.id).toEqual(itemParams.id);
      expect(item.name).toEqual(itemParams.name);
      expect(item.category).toEqual(itemParams.category);
      expect(item.isRequired).toEqual(itemParams.isRequired);
      expect(item.isMandatory).toEqual(itemParams.isMandatory);
      expect(item.quantity).toEqual(itemParams.quantity);
    });

    describe("with default", () => {
      const item = new Item();

      it("id as Id", () => {
        expect(item.id).toBeInstanceOf(Id);
      });

      it('name as "Untitled"', () => {
        expect(item.name).toBe("Untitled");
      });

      it("isRequired as false", () => {
        expect(item.isRequired).toBeFalsy();
      });

      it("quantity as 1", () => {
        expect(item.quantity).toBe(1);
      });

      it("category as default category", () => {
        expect(item.category).toStrictEqual(defaultCategory);
      });
    });
  });
});
