import { describe, expect, it } from "vitest";
import { LocalStorage } from "./local-storage";

describe("Local storage abstraction should", () => {
  const collection = "test";
  const ls = new LocalStorage<any>(collection);

  beforeEach(() => {
    window.localStorage.clear();
  });

  describe("retrieve item and parse it to", () => {
    it("string", () => {
      const expectedText = "irrelevant";
      window.localStorage.setItem(collection, expectedText);

      const text = ls.get();

      expect(text).toBe(expectedText);
      expect(typeof text).toBe("string");
    });

    it("number", () => {
      const expectedNumber = 2;
      window.localStorage.setItem(collection, expectedNumber.toString());

      const num = ls.get();

      expect(num).toBe(expectedNumber);
      expect(typeof num).toBe("number");
    });

    it.each([[true], [false]])("boolean", (expectedBoolean) => {
      window.localStorage.setItem(collection, expectedBoolean.toString());

      const bool = ls.get();

      expect(bool).toBe(expectedBoolean);
      expect(typeof bool).toBe("boolean");
    });

    it("object", () => {
      const expectedObject = { a: null, b: 42, c: "irrelevant" };
      window.localStorage.setItem(collection, JSON.stringify(expectedObject));

      const obj = ls.get();

      expect(obj).toStrictEqual(expectedObject);
      expect(typeof obj).toBe("object");
    });

    it("array", () => {
      const expectedArray = [1, 2, "meh"];
      window.localStorage.setItem(collection, JSON.stringify(expectedArray));

      const array = ls.get();

      expect(array).toStrictEqual(expectedArray);
      expect(typeof array).toBe("object");
    });
  });
  it("retrieve null if there is no item", () => {
    const result = ls.get();

    expect(result).toBeNull();
  });
  it("save a primitive", () => {
    ls.set(42);

    const result = ls.get();
    expect(result).toBe(42);
  });
  it("save an object", () => {
    const obj = { a: null, b: 42 };

    ls.set(obj);

    const result = ls.get();
    expect(result).toStrictEqual(obj);
  });
});
