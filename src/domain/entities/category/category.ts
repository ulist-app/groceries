import { Id } from "../id";
import { palette } from "../../constants";

export interface CategoryParams {
  _id?: string;
  _rev?: string;
  id?: Id;
  name?: string;
  color?: string;
}

export class Category {
  readonly _id: string;
  readonly _rev?: string;
  readonly id: Id;
  readonly name: string;
  readonly color: string;

  constructor({ _id, _rev, id, name, color }: CategoryParams = {}) {
    this.id = id || new Id();
    this._id = _id || this.id.value;
    this._rev = _rev;
    this.name = name || "No Category";
    this.color = color || palette.gray;
  }
}

export const defaultCategory = new Category({ id: new Id("default-category") });
