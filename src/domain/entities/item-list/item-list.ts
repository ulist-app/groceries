import { Item } from "../item";
import { Id } from "../id";

type CategoryName = string;

export class ItemList {
  private readonly _items: Item[];
  constructor(items: Item[]) {
    this._items = [...items].sort(ItemList.sortByName);
  }

  private get items() {
    return [...this._items];
  }

  static groupItemsByCategory(
    items: Item[]
  ): Array<[CategoryName, Array<Item>]> {
    return Object.entries(
      items.reduce((dictionary, item) => {
        if (dictionary[item.category.name]) {
          dictionary[item.category.name] =
            dictionary[item.category.name].concat(item);
        } else {
          dictionary[item.category.name] = [item];
        }
        return dictionary;
      }, {} as Record<CategoryName, Item[]>)
    ).sort(([a], [b]) => ItemList.sortAsc(a, b));
  }

  private static sortByName<T extends { name: string }>(a: T, b: T) {
    return ItemList.sortAsc(a.name, b.name);
  }

  private static sortAsc<T = number | string>(a: T, b: T) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  getAll() {
    return this.items;
  }

  getAllRequired() {
    return this.items.filter((i) => i.isRequired);
  }

  getAllMandatory() {
    return this.items.filter((i) => i.isMandatory && i.isRequired);
  }

  search(search: string): ItemList {
    return new ItemList(
      this.items.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  findById(id: Id): Item | undefined {
    return this._items.find((item) => id.equals(item.id));
  }
}
