import { faker } from "@faker-js/faker";
import { Category, CategoryParams, Id } from "../../domain";

export class CategoryBuilder {
  private id: Id;
  private _rev?: string;
  private name: string;
  private color: string;

  private constructor({ id, _rev, name, color }: CategoryParams = {}) {
    this.id = id || new Id();
    this._rev = _rev;
    this.name = name || faker.random.word();
    this.color = color || faker.color.rgb({ prefix: "#", casing: "lower" });
  }

  static init(): CategoryBuilder {
    return new CategoryBuilder();
  }

  static clone(category: Category): CategoryBuilder {
    return new CategoryBuilder({ ...category });
  }

  static random(): Category {
    return new CategoryBuilder().build();
  }

  witName(name: string): CategoryBuilder {
    this.name = name;
    return this;
  }

  withRevision(_rev?: string): CategoryBuilder {
    this._rev = _rev;
    return this;
  }

  build(): Category {
    return new Category({
      id: this.id,
      _rev: this._rev,
      name: this.name,
      color: this.color,
    });
  }
}
