import { ErrorCodes } from "./ErrorCodes";
import { Id } from "../entities";

export class ItemNotFoundError extends Error {
  static code = ErrorCodes.ItemNotFound;

  constructor(id: Id) {
    super(`Item with id ${id.value} not found.`);
    this.name = "ItemNotFoundError";
  }
}
