import { v4 } from "uuid";

export class Id {
  readonly value: string;

  constructor(id: string = v4()) {
    this.value = id;
  }

  equals(id: Id): boolean {
    return this.value === id.value;
  }

  toString() {
    return this.value;
  }
}
