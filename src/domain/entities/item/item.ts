import { Id } from "../id";
import { Category, defaultCategory } from "../category";

export interface ItemParams {
  _id?: string;
  _rev?: string;
  id?: Id;
  name?: string;
  category?: Category;
  isRequired?: boolean;
  isMandatory?: boolean;
  quantity?: number;
}

export class Item {
  readonly _id: string;
  readonly _rev?: string;
  readonly id: Id;
  readonly category: Category;
  readonly name: string;
  readonly isRequired: boolean;
  readonly isMandatory: boolean;
  readonly quantity: number;

  constructor({
    _id,
    _rev,
    id,
    name,
    category,
    isRequired,
    isMandatory,
    quantity,
  }: ItemParams = {}) {
    this.id = id || new Id();
    this._id = _id || this.id.value;
    this._rev = _rev;
    this.name = name || "Untitled";
    this.category = category || defaultCategory;
    this.isRequired = isRequired ?? false;
    this.isMandatory = isMandatory ?? false;
    this.quantity = quantity ?? 1;
  }
}
