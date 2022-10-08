import { ItemRepository } from "../../../application";
import {
  Category,
  Id,
  Item,
  ItemList,
  ItemNotSavedError,
} from "../../../domain";
import {
  PouchDatasource,
  PouchDBDocument,
} from "../../data-sources/pouch-db.data-source";
import { ItemNotFoundError } from "../../../domain/errors/ItemNotFoundError";

export type PouchDBItem = PouchDBDocument<Item> & {
  _conflicts?: Array<string>;
  id: string;
  category: string;
};
export type PouchDBCategory = PouchDBDocument<Category> & {
  _conflicts?: Array<string>;
  id: string;
};

export class ItemRepositoryPouchDB implements ItemRepository {
  constructor(private readonly pouch: PouchDatasource) {}

  private static mapItemToDomain(
    document: PouchDBItem,
    category: Category
  ): Item {
    return new Item({
      _id: document._id,
      _rev: document._rev,
      id: new Id(document.id),
      name: document.name,
      category,
      isRequired: document.isRequired,
      isMandatory: document.isMandatory,
    });
  }

  private static mapCategoryToDomain(document: PouchDBCategory): Category {
    return new Category({
      _id: document._id,
      _rev: document._rev,
      id: new Id(document.id),
      name: document.name,
      color: document.color,
      icon: document.icon,
    });
  }

  private static generateCategoryDictionary(
    categories: Array<PouchDBCategory>
  ): Record<string, Category> {
    return categories.reduce((dictionary, category) => {
      dictionary[category.id] =
        ItemRepositoryPouchDB.mapCategoryToDomain(category);
      return dictionary;
    }, {} as Record<string, Category>);
  }

  async findById(id: Id): Promise<Item> {
    try {
      const document = await this.pouch.db.get<PouchDBItem>(id.value);
      const category = await this.findCategory(document.category);
      return ItemRepositoryPouchDB.mapItemToDomain(document, category);
    } catch (error) {
      console.error(`Error saving item: ${error}`);
      throw new ItemNotFoundError(id);
    }
  }

  async findAll(): Promise<ItemList> {
    const documents = await this.pouch.db.allDocs<
      PouchDBItem | PouchDBCategory
    >({ include_docs: true, conflicts: true });
    if (documents.total_rows === 0) {
      return new ItemList([]);
    }
    // @ts-ignore
    const conflicts = documents.rows.filter((doc) => doc._conflicts);
    console.log("[CONFLICTS]", conflicts);
    const { categories, items } = this.groupDocumentsByType(documents);
    const categoryDictionary =
      ItemRepositoryPouchDB.generateCategoryDictionary(categories);
    return new ItemList(
      items.map((item) => {
        const category = categoryDictionary[item.category];
        return ItemRepositoryPouchDB.mapItemToDomain(item, category);
      })
    );
  }

  async save(item: Item): Promise<Item> {
    try {
      const response = await this.pouch.db.put({
        ...item,
        id: item.id.value,
        type: PouchDatasource.DocumentTypes.Item,
        category: item.category.id.value,
      });
      if (!response.ok) {
        throw new ItemNotSavedError(item);
      }
      return this.findById(item.id);
    } catch (error) {
      // @ts-ignore
      if (error.name === "conflict") {
        console.debug(`Retrying save for item ${item.name} (${item.id}).`);
        return this.save(item);
      } else {
        throw error;
      }
    }
  }

  private groupDocumentsByType(
    documents: PouchDB.Core.AllDocsResponse<PouchDBItem | PouchDBCategory>
  ) {
    return documents.rows.reduce(
      (result, { doc }) => {
        // @ts-ignore
        if (doc.type === PouchDatasource.DocumentTypes.Category) {
          // @ts-ignore
          result.categories = result.categories.concat(doc);
        }
        // @ts-ignore
        if (doc.type === PouchDatasource.DocumentTypes.Item) {
          // @ts-ignore
          result.items = result.items.concat(doc);
        }
        return result;
      },
      { categories: [] as PouchDBCategory[], items: [] as PouchDBItem[] }
    );
  }

  private async findCategory(id: string): Promise<Category> {
    const category = await this.pouch.db.get<PouchDBCategory>(id);
    return ItemRepositoryPouchDB.mapCategoryToDomain(category);
  }
}
