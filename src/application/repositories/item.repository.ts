import { Id, Item, ItemList } from "../../domain";

export interface ItemRepository {
  findById(id: Id): Promise<Item>;
  findAll(): Promise<ItemList>;
  save(item: Item): Promise<Item>;
}
