import { ItemList } from "../../domain";
import { ItemBuilder } from "../builders";
import { UseCaseDouble } from "./use-case.double";

export class GetAllItemsCaseDouble extends UseCaseDouble {
  constructor(
    onExec = [new ItemList(Array.from({ length: 3 }).map(ItemBuilder.random))]
  ) {
    super(onExec);
  }
}
