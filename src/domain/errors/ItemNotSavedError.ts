import { ErrorCodes } from "./ErrorCodes";
import { Item } from "../entities";

export class ItemNotSavedError extends Error {
  static code = ErrorCodes.ItemNotSaved;

  constructor(item: Item) {
    super(`Error saving item with id ${item.id.value}.`);
    this.name = "ItemNotSavedError";
  }
}
