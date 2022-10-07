import { Id, Settings } from "../../../domain";
import { generateUseCases, UseCases } from "../../../application";
import { ItemRepositoryPouchDB } from "../../repositories/item-repository/item.repository.pouch-db";
import { PouchDatasource } from "../../data-sources/pouch-db.data-source";
import { SettingsRepositoryLocalStorage } from "../../repositories";
import { LocalStorage, LocalStorageCollection } from "../../data-sources";
import { initStore, Store, StoreActions } from "./useStore";

export function generateUseCasesWithRemoteDb(settings: Settings, cb: Function) {
  return generateUseCases({
    itemRepository: new ItemRepositoryPouchDB(
      PouchDatasource.createPouchDbBrowser({
        dbName: PouchDatasource.dbName,
        dbUrl: settings.syncUrl,
        cb,
      })
    ),
    settingsRepository: new SettingsRepositoryLocalStorage(
      new LocalStorage<Settings>(LocalStorageCollection.Settings)
    ),
  });
}

export function generateUseCasesWithLocalDb() {
  const itemRepository = new ItemRepositoryPouchDB(
    PouchDatasource.createPouchDbBrowser({
      dbName: PouchDatasource.dbName,
    })
  );
  const settingsRepository = new SettingsRepositoryLocalStorage(
    new LocalStorage<Settings>(LocalStorageCollection.Settings)
  );
  return generateUseCases({
    itemRepository,
    settingsRepository,
  });
}

export function generateActions(
  store: Store,
  useCases: UseCases
): StoreActions {
  return {
    getAllItems() {
      useCases.getAllItems.exec().then((items) => {
        store.items = items;
      });
    },
    getSettings() {
      useCases.getSettings.exec().then((settings) => {
        store.settings = settings;
      });
    },
    setItemAsRequired(id: Id) {
      useCases.setItemAsRequired.exec(id).then(() => {
        return store.actions.getAllItems();
      });
    },
    setItemAsNotRequired(id: Id) {
      useCases.setItemAsNotRequired.exec(id).then(() => {
        return store.actions.getAllItems();
      });
    },
    setItemAsMandatory(id: Id) {
      useCases.setItemAsMandatory.exec(id).then(() => {
        return store.actions.getAllItems();
      });
    },
    setItemAsNotMandatory(id: Id) {
      useCases.setItemAsNotMandatory.exec(id).then(() => {
        return store.actions.getAllItems();
      });
    },
    setSettings(settings: Settings) {
      useCases.setSettings.exec(settings).then((savedSettings) => {
        store.settings = savedSettings;
        initStore();
      });
    },
  };
}
