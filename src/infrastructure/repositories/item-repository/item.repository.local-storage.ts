import { ItemRepository } from "../../../application";
import { Category, Id, Item, ItemList } from "../../../domain";
import { categories, items, RawCategory, RawItem } from "../../data";
import { LocalStorageDataSource } from "../../data-sources";

export type LocalStorageItem = Omit<RawItem, "category"> & {
  category: RawCategory;
};
export type LocalStorageItemRecord = Record<string, LocalStorageItem>;

export class ItemRepositoryLocalStorage implements ItemRepository {
  constructor(
    private readonly localStorage: LocalStorageDataSource<LocalStorageItemRecord>
  ) {}

  private static mapRawToDomain(item: RawItem, category: RawCategory) {
    return new Item({
      ...item,
      id: new Id(item.id),
      category: new Category({ ...category, id: new Id(category.id) }),
    });
  }

  private static mapToDomain(item: LocalStorageItem) {
    return new Item({
      ...item,
      id: new Id(item.id),
      category: new Category({
        ...item.category,
        id: new Id(item.category.id),
      }),
    });
  }

  private static mapToInfrastructure(item: Item): LocalStorageItem {
    return {
      ...item,
      id: item.id.value,
      category: {
        id: item.category!.id.value,
        _id: item.category!._id,
        _rev: item.category!._rev,
        name: item.category!.name,
        color: item.category!.color,
      },
    };
  }

  async findById(id: Id): Promise<Item> {
    return this.getItems()[id.value];
  }

  async findAll() {
    const items = this.getItems();
    return new ItemList(Object.values(items));
  }

  async save(item: Item) {
    const items = this.getItems();
    items[item.id.value] = item;
    this.localStorage.set(
      Object.values(items).reduce((dictionary, item) => {
        dictionary[item.id.value] =
          ItemRepositoryLocalStorage.mapToInfrastructure(item);
        return dictionary;
      }, {} as Record<string, LocalStorageItem>)
    );
    return item;
  }

  private getItems(): Record<string, Item> {
    const items = this.localStorage.get();
    return items ? this.enrichItems(items) : this.enrichDefaultItems();
  }

  private enrichDefaultItems(): Record<string, Item> {
    return Object.values(items).reduce((dictionary, item) => {
      const category = categories[item.category];
      dictionary[item.id] = ItemRepositoryLocalStorage.mapRawToDomain(
        item,
        category
      );
      return dictionary;
    }, {} as Record<string, Item>);
  }

  private enrichItems(
    items: Record<string, LocalStorageItem>
  ): Record<string, Item> {
    return Object.values(items).reduce((dictionary, item) => {
      dictionary[item.id] = ItemRepositoryLocalStorage.mapToDomain(item);
      return dictionary;
    }, {} as Record<string, Item>);
  }
}
