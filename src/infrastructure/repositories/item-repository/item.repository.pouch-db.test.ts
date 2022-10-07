import { describe, expect, it, vi } from "vitest";
import { Item, ItemList, ItemNotSavedError } from "../../../domain";
import { CategoryBuilder, ItemBuilder } from "../../../tests/builders";
import { PouchDatasource } from "../../data-sources/pouch-db.data-source";
import { ItemRepositoryPouchDB } from "./item.repository.pouch-db";
import { PouchDBTestHelper } from "../../../tests/PouchDBTestHelper";
import { ItemNotFoundError } from "../../../domain/errors/ItemNotFoundError";
import PouchDb from "pouchdb";
import PouchDbMemoryAdapter from "pouchdb-adapter-memory";

PouchDb.plugin(PouchDbMemoryAdapter);

describe("Pouch DB implementation for item repository should", () => {
  let pouchDataSource: PouchDatasource;
  let helper: PouchDBTestHelper;

  beforeEach(() => {
    pouchDataSource = createPouchDatasource();
    helper = new PouchDBTestHelper(pouchDataSource);
  });

  afterEach(async () => {
    await helper.reset();
  });

  describe("find item by id", () => {
    it("successfully", async () => {
      const expectedItem = ItemBuilder.random();
      await helper.createItem(expectedItem);

      const item = await new ItemRepositoryPouchDB(pouchDataSource).findById(
        expectedItem.id
      );

      assertItemsAreEqual(item, expectedItem);
    });

    it("throw ItemNotFoundError if item is not found", async () => {
      const expectedItem = ItemBuilder.random();

      await expect(
        new ItemRepositoryPouchDB(pouchDataSource).findById(expectedItem.id)
      ).rejects.toThrow(new ItemNotFoundError(expectedItem.id));
    });
  });

  describe("find all items", () => {
    it("successfully", async () => {
      const expectedItems = new ItemList(Array.of(3).map(ItemBuilder.random));
      await Promise.all(
        expectedItems.getAll().map((item) => helper.createItem(item))
      );

      const items = await new ItemRepositoryPouchDB(pouchDataSource).findAll();

      for (const [index, item] of Object.entries(items.getAll())) {
        assertItemsAreEqual(item, expectedItems.getAll().at(+index)!);
      }
    });

    it("return and empty ItemList if there are no items", async () => {
      const items = await new ItemRepositoryPouchDB(pouchDataSource).findAll();

      expect(items.getAll()).toHaveLength(0);
    });
  });

  it("save an item", async () => {
    const expectedItem = ItemBuilder.random();
    await helper.createCategory(expectedItem.category);
    const itemRepositoryPouchDB = new ItemRepositoryPouchDB(pouchDataSource);

    const item = await itemRepositoryPouchDB.save(expectedItem);

    const savedItem = await itemRepositoryPouchDB.findById(expectedItem.id);
    expect(item).toStrictEqual(savedItem);
  });

  it("throw an ItemNotSavedError if item can't be saved", async () => {
    const expectedItem = ItemBuilder.random();
    const itemRepositoryPouchDB = new ItemRepositoryPouchDB({
      db: { put: vi.fn(async () => ({ ok: false })) },
    } as unknown as PouchDatasource);

    await expect(itemRepositoryPouchDB.save(expectedItem)).rejects.toThrow(
      new ItemNotSavedError(expectedItem)
    );
  });
});

function assertItemsAreEqual(item: Item, expectedItem: Item) {
  expect(item).toStrictEqual(
    ItemBuilder.clone(expectedItem)
      .withRevision(item._rev)
      .withCategory(
        CategoryBuilder.clone(item.category)
          .withRevision(item.category._rev)
          .build()
      )
      .build()
  );
}

function createPouchDatasource(): PouchDatasource {
  return PouchDatasource.createPouchDatasource(PouchDb, {
    dbName: "test",
    options: { adapter: "memory" },
  });
}
